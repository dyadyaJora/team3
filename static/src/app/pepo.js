window.pepo = angular.module('pepo', ['ngRoute', 'ngResource', 'satellizer'])
  .config(function($routeProvider, $authProvider) {

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

    $authProvider.facebook({
      clientId: '100397853745218',
      redirectUri: window.location.origin + '/api/auth/facebook',
      url: '/api/auth/facebook'
    });
  });
