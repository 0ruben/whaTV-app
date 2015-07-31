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
.controller('RecommendationsCtrl', function($scope, Programmes, $stateParams,$state, $window, $ionicModal, User) {
  $scope.programmes = Programmes.getAll();
  $scope.programmeClicked=-1; //variable qui stocke l'indice du dernier programme clické par l'utilisateur

//Pour tester l'interface :
  $scope.programmes = [{
    id :0,
    chaine:'TF1',
    chaineImg: '../img/TF1.jpg', 
    heure:'20h50', 
    duree:"2h10", 
    titre:"The Voice",
    sousTitre: 'Saison 3, épisode 11',
    programmeImg:'http://static1.purebreak.com/articles/5/53/77/5/@/179511-the-voice-2-promet-quelques-surprises-diapo-2.jpg',
    description: 'Cette émission de musique sur la première chaine est toujours un succès. Le melomane et genie de la musique DJ Jabz vient nous faire découvrir ses derniers sons.',
    casting : 'Jennifer, Mika, DJ Attia, Le Krull',
    liked : false
  },{
    id:1,
    chaine:'M6', 
    chaineImg: '../img/M6.jpg',
    heure:'21h30', 
    duree:"1h40", 
    titre:"Capital",
    sousTitre: 'Saison 2, épisode 1',
    programmeImg:'http://cdn.im6.fr/02B5011D07766409-c1-photo-photo-capital-146821-1.jpg',
    description: 'Cette émission exceptionnelle raconte ce soir une incroyable histoire, celle de Alexandre - Le Tigre - Attia, devenu milliardaire à seulement 14 ans, à la suite de son invention géniale. Il obtint ensuite consécutivement 4 Meuf d\'or lors des 4 années suivantes',
    casting : 'Benjamin Castaldi, Katsuni, Madison Ivy, Le Krull',
    liked: false
  },{
    chaine:'TF1',
    chaineImg: '../img/TF1.jpg', 
    heure:'20h50', 
    duree:"2h10", 
    titre:"The Voice",
    sousTitre: 'Saison 3, épisode 11',
    programmeImg:'http://static1.purebreak.com/articles/5/53/77/5/@/179511-the-voice-2-promet-quelques-surprises-diapo-2.jpg',
    description: 'Cette émission de musique sur la première chaine est toujours un succès. Le melomane et genie de la musique DJ Jabz vient nous faire découvrir ses derniers sons.',
    casting : 'Jennifer, Mika, DJ Attia, Le Krull',
    liked : false
  },{
    chaine:'M6', 
    chaineImg: '../img/M6.jpg',
    heure:'21h30', 
    duree:"1h40", 
    titre:"Capital",
    sousTitre: 'Saison 2, épisode 1',
    programmeImg:'http://cdn.im6.fr/02B5011D07766409-c1-photo-photo-capital-146821-1.jpg',
    description: 'Cette émission exceptionnelle raconte ce soir une incroyable histoire, celle de Alexandre - Le Tigre - Attia, devenu milliardaire à seulement 14 ans, à la suite de son invention géniale. Il obtint ensuite consécutivement 4 Meuf d\'or lors des 4 années suivantes',
    casting : 'Benjamin Castaldi, Katsuni, Madison Ivy, Le Krull',
    liked: false
  },{
    chaine:'TF1',
    chaineImg: '../img/TF1.jpg', 
    heure:'20h50', 
    duree:"2h10", 
    titre:"The Voice",
    sousTitre: 'Saison 3, épisode 11',
    programmeImg:'http://static1.purebreak.com/articles/5/53/77/5/@/179511-the-voice-2-promet-quelques-surprises-diapo-2.jpg',
    description: 'Cette émission de musique sur la première chaine est toujours un succès. Le melomane et genie de la musique DJ Jabz vient nous faire découvrir ses derniers sons.',
    casting : 'Jennifer, Mika, DJ Attia, Le Krull',
    liked : false
  }];

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

  $scope.toDisplay={titre:'', chaine:'', chaineImg:'', sousTitre:'', duree:'', heure:'', description:'', casting:'', programmeImg:'', liked:''}; //objet à afficher dans la TV du bas

  $scope.clickProgramme=function(index){ //fonction appelée lors du clic sur un programme recommandé
    if ($scope.programmeClicked!=index){
    $scope.programmeClicked=index;
    $scope.toDisplay=$scope.programmes[index];
    }
    else{
      $scope.programmeClicked=-1;
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
$ionicModal.fromTemplateUrl('templates/description.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal
  })  

  $scope.openModal2 = function() {
    $scope.modal2.show();
  }
  $scope.closeModal2 = function() {
    $scope.modal2.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.sendLikeFeedback = function (index) {
    if($scope.programmes[index].liked==false){
      $scope.programmes[index].liked=true;
    }
    else{
       $scope.programmes[index].liked= false;
    }
   
  }
})

.controller('ConnexionCtrl', function($scope, $stateParams, fbConnect) {
  $scope.facebookConnect=function(){
    fbConnect.connect();
  }
})
.controller('DescriptionCtrl', function() {

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
