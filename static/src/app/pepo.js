window.pepo = angular.module('pepo', ['ngRoute'])
    .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './build/templates/login.html',
        controller: 'loginCtrl'
      })
      .when('/choose-login', {
        templateUrl: './build/templates/choose-login.html',
        controller: 'chooseLoginCtrl'
      })
      .when('/my-profile', {
          templateUrl: './build/templates/my-profile.html',
          controller: 'myProfile'
      })
      .when('/feed', {
          templateUrl: './build/templates/feed.html',
          controller: 'feedCtrl'
      })
      .otherwise({redirectTo: '/'});
  });

