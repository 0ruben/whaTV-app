angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AccountCtrl', function($scope, User, $stateParams) {
  User.push=$scope.notifications;

  $scope.clientSideList = [
    { text: "Quotidien", value: "q" },
    { text: "Hebdomadaire", value: "h" },
    { text: "Mensuel", value: "m" }
  ];
 $scope.chgmtFreq =function(attribute, value){
  User.setNotifPref(attribute, value);
 }
})

.controller('RegisterCtrl', function($scope, User, $stateParams, $localStorage,$location) {
   $scope.regularConnect=function(user){
    console.log(user);
      User.register(user).success(function(user){
             $localStorage.setObject('user',user);               
                 // $ionicLoading.hide();
                 console.log("here");
                  $location.path('/');


              }).error(function(err){
                console.log(err);
                $scope.err = "Problème lors de l'inscription";
              });

}
})
.controller('LoginCtrl', function($scope, $stateParams,$localStorage, $location, User) {
 $scope.connect=function(user){
  User.login(user).success(function(user){
             $localStorage.setObject('user',user);               
                  //$ionicLoading.hide();
                  $location.path('/');


              }).error(function(err){
                console.log(err);
                $scope.err = "Problème lors de la connexion";
              });
 }
})
.controller('RecommendationsCtrl', function($scope, $stateParams,$state, $window, $ionicModal, User) {
  $scope.programmeClicked=false;
  $scope.account=function(){
    $state.go('app.account');
  }
  $scope.logout=function(){
    User.destroySession();
     $scope.modal.hide();
    $state.go('app.connexion');
  }
 $scope.clientSideList = [
    { text: "Quotidien", value: "q" },
    { text: "Hebdomadaire", value: "h" },
    { text: "Mensuel", value: "m" }
  ];
 $scope.chgmtFreq =function(attribute, value){
  User.setNotifPref(attribute, value);
 }
  $ionicModal.fromTemplateUrl('templates/account.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.clickProgramm=function(){
    if ($scope.programmeClicked==false){
    $scope.programmeClicked=true;
    }
    else{
      $scope.programmeClicked=false;
    }
    
  }
  $ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal
  })  

  $scope.openModal1 = function() {
    $scope.modal1.show()
  }

  $scope.closeModal1 = function() {
    $scope.modal1.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('ConnexionCtrl', function($scope, $stateParams, fbConnect) {
  $scope.facebookConnect=function(){
    fbConnect.connect();
  }
})
.controller('SearchCtrl', function($scope, Keywords) {
 Keywords.getAll().success(function(keywords){
  $scope.keywords = keywords;
 }).error(function(err){
console.log(err);
 })

  $scope.addElem = function(elem,event){
    Keywords.addElement(elem,event);
  }

  $scope.swing = function(e){
    if(!$(e.target).hasClass('keyword-element'))
      elem = $(e.target).parent('.keyword-element');
    else
      elem = e.target;
      $(elem).addClass('animated swing');
  }
});
