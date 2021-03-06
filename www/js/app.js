// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var serverAddress = 'http://localhost:1337';
var LIMITE_KEYWORDS = 30;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.service', 'starter.directives'])
    .run(function($ionicPlatform, User, $state) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            $ionicPlatform.on("resume", function() {
                User.checkSession().then(function(hasSession) {
                    if (!hasSession) {
                        $state.go('app.connexion');
                    } else {
                        $state.go('app.recommendations');
                    }
                });
            })


            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })

    .state('app.recommendations', {
        url: '/recommendations',
        views: {
            'menuContent': {
                templateUrl: 'templates/recommendations.html',
                controller: 'RecommendationsCtrl'
            }
        }
    })

    .state('app.account', {
            url: '/account',
            views: {
                'menuContent': {
                    templateUrl: 'templates/account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('app.description', {
            url: '/recommendations/:progId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/description.html',
                    controller: 'DescriptionCtrl'
                }
            }
        })

    .state('app.connexion', {
        url: '/connexion',
        views: {
            'menuContent': {
                templateUrl: 'templates/connexion.html',
                controller: 'ConnexionCtrl'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            }
        }
    })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/recommendations');
});
