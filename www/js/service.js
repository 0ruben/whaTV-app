angular.module('starter.service', [])

.factory('fbConnect', ['$http', '$localStorage', '$rootScope', '$ionicLoading', '$ionicPlatform', '$location','Keywords','$q', function($http, $localStorage, $rootScope, $ionicLoading, $ionicPlatform, $location, Keywords, $q, $connection) {

    //FACEBOOK CONNECT BEGINS

    var FACEBOOK_APP_ID = 1619367301653829;
    var fbLogged = $q.defer();


    var obj = {};

    //This is the success callback from the login method
    obj.fbLoginSuccess = function(response) {


        if (!response.authResponse) {
            fbLoginError("Cannot find the authResponse");
            return;
        }
        var expDate = new Date(
            new Date().getTime() + response.authResponse.expiresIn * 1000
        ).toISOString();

        var authData = {
            id: String(response.authResponse.userID),
            access_token: response.authResponse.accessToken,
            expiration_date: expDate
        }
        fbLogged.resolve(authData);
    };

    //This is the fail callback from the login method
    obj.fbLoginError = function(error) {
        fbLogged.reject(error);
        alert(error);
        $ionicLoading.hide();
    };

    //this method is to get the user profile info from the facebook api
    obj.getFacebookProfileInfo = function() {
        var info = $q.defer();
        facebookConnectPlugin.api('/me', "",
            function(response) {
                info.resolve(response);
            },
            function(response) {
                info.reject(response);
            });
        return info.promise;
    }


    //This method is executed when the user press the "Login with facebook" button
    obj.connect = function() {
        if (!window.cordova) {
            //this is for browser only
            facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
        }

        //check if we have user's data stored
        //var user = UserService.getUser();

        facebookConnectPlugin.getLoginStatus(function(success) {
            // alert(success.status);

            //TO DO : SI STATUS = CONNECTED MAIS QU'ON TROUVE PAS LE TOKEN IL FAUT VIRER LE MEC DE LA BD
            // if(success.status === 'connected'){
            //   // the user is logged in and has authenticated your app, and response.authResponse supplies
            //   // the user's ID, a valid access token, a signed request, and the time the access token
            //   // and signed request each expire
            //   $location.path('/user/profil');

            // } else {
            //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
            //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.

            $ionicLoading.show({
                content: 'Loading Data',
                animation: 'fade-out',
                showBackdrop: false,
                hideOnStateChange: false
            });

            $rootScope.toShow = false;
            //ask the permissions you need
            //you can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.2
            facebookConnectPlugin.login(['email',
                'public_profile', 'user_friends'
            ], obj.fbLoginSuccess, obj.fbLoginError);

            fbLogged.promise.then(function(authData) {
                var fb_uid = authData.id,
                    fb_access_token = authData.access_token;

                //get user info from FB
                obj.getFacebookProfileInfo().then(function(data) {
                    var user = data;

                    // user.picture = "http://graph.facebook.com/"+fb_uid+"/picture?width=400&height=400";
                    // user.access_token = fb_access_token;

                    //save the user data
                    //for the purpose of this example I will store it on ionic local storage but you should save it on a database

                    $http.post(serverAddress + '/user/facebookConnect', {
                        email: user.email,
                        username: user.name,
                        facebook_id: fb_uid
                    }).success(function(response) {
                        $localStorage.setObject('user', response);
                        Keywords.getAll(LIMITE_KEYWORDS).success(function(keywords) {
                            $localStorage.setObject('keywords', keywords);
                        });    
                        $ionicLoading.hide();
                        $location.path('/');


                    }).error(function(err) {
                        console.log(err);
                    });
                });
            });
            // }
        });


    }

    obj.getFacebookFriends = function() {
        var friends = $q.defer();
        facebookConnectPlugin.api('/me/friends?fields=picture,name', ["basic_info", "user_friends"],
            function(result) {
                console.log('friends');
                console.log(result);
                friends.resolve(result);
            },
            function(error) {
                alert("Failed: " + error);
                friends.reject(error);
            });
        return friends.promise;
    }

    return obj;

}])

//Creating local Storage Function
.factory('$localStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            clearAll: function() {
                $window.localStorage.clear();
            },
            setAttribute: function(key, property, attribute) {
                var object = JSON.parse($window.localStorage[key] || '{}');
                object[property] = attribute;
                $window.localStorage[key] = JSON.stringify(object);
            },
            addElement: function(key, element) {
                var object = JSON.parse($window.localStorage[key] || '[]');
                object.push(element);
                $window.localStorage[key] = JSON.stringify(object);
            },
            removeElement: function(key, element) {
                var object = JSON.parse($window.localStorage[key] || '[]');
                object.splice(key, 1);
                $window.localStorage[key] = JSON.stringify(object);
            },
            getArray: function(key) {
                return JSON.parse($window.localStorage[key] || '[]');
            }
        }
    }])
    .factory('User', ['$http', '$localStorage', '$rootScope', '$ionicLoading', '$ionicPlatform', '$location', '$q', function($http, $localStorage, $rootScope, $ionicLoading, $ionicPlatform, $location, $q, $connection) {

        var obj = {};
        obj.getUser = function() {
            return $localStorage.getObject('user');
        }

        obj.setNotifPref = function(attr, pref) {
            $localStorage.setAttribute('user', attr, pref);
            console.log($localStorage.getObject('user'));
        }
        obj.destroySession = function() {
            $localStorage.clearAll();
        }

        obj.checkSession = function() {
            $q.defer = defer;

            if ($localStorage.getObject('user') && $localStorage.getObject('user').id) {
                defer.resolve(true);
            } else {
                defer.resolve(false);

                return defer.promise;
            }
        }
        obj.register = function(user) {

            return $http.post(serverAddress + '/user/create/', {
                username: user.username,
                password: user.password
            });

        }

        obj.login = function(user) {

            return $http.post(serverAddress + '/user/login/', {
                username: user.username,
                password: user.password
            });


        }

        return obj;
    }])


.factory('Keywords', ['$localStorage', '$http', 'User', function($localStorage, $http, User) {
    var obj = {};

    obj.getAll = function() {
        return $http.get(serverAddress + '/user/getKeywords?user=' + User.getUser().id );
    }

    obj.addElement = function(elem, event) {
        keywords = $localStorage.addElement("keywords", elem);
        if (!$(event.target).hasClass('keyword-element'))
            target = $(event.target).parent('.keyword-element');
        else
            target = event.target;
        $(target).addClass('animated zoomOutLeft');

        $http.post(serverAddress + 'keywordProgramme/addKeyword', {
            user: User.getUser().id,
            kw: elem.id
        });
    }

    obj.search = function(word){
        return $http.post(serverAddress + '/keyword/search', {keywords: $localStorage.getObject('keywords'), keyword: word});
    }

    return obj;
}])

.factory('Programmes', ['$localStorage', '$http', function($localStorage, $http) {
    var array = [];

    array.getAll = function() {
        // return $http.get(serverAddress+'/getKeywords/?user='+User.getUser().id+"&keyword="+word+"&limit="+limit);
        return array;
    }

    return array;
}])
