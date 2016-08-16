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
      .when('/@:username', {
        templateUrl: './build/templates/my-profile.html',
        controller: 'myProfileCtrl'
      })
        .when('/edit-profile', {
            templateUrl: './build/templates/edit-profile.html',
            controller: 'editProfileCtrl'
        })
      .when('/feed', {
          templateUrl: './build/templates/feed.html',
          controller: 'feedCtrl'
      })
      .when('/users', {
          templateUrl: './build/templates/users.html',
          controller: 'usersCtrl'
      })
      .otherwise({redirectTo: '/'});

    $authProvider.facebook({
      clientId: '100397853745218',
      redirectUri: window.location.origin + '/api/auth/facebook',
      url: '/api/auth/facebook'
    });

    $authProvider.oauth2({
      name: 'vkontakte',
      url: '/api/auth/vkontakte',
      clientId: '5589421',
      redirectUri: window.location.origin + '/api/auth/vkontakte',
      authorizationEndpoint: 'https://oauth.vk.com/authorize',
      optionalUrlParams: ['display'],
      display: 'mobile'
    });
  });

