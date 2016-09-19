window.pepo = angular.module('pepo', ['ngRoute', 'ngResource', 'satellizer', 'ymaps', 'pepo.config', 'duScroll', 'ngEmoticons', 'angularMoment', 'btford.socket-io'])
  .config(function($routeProvider, $authProvider, CONFIG) {
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
      .when('/pep:pepId', {
        templateUrl: './build/templates/single-pep.html',
        controller: 'singlePepCtrl'
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
      .when('/not-found-:page', {
          templateUrl: './build/templates/not-found.html',
          controller: 'notFoundCtrl'
      })
      .otherwise({redirectTo: '/'});

    $authProvider.facebook({
      clientId: CONFIG.facebook.clientID,
      redirectUri: window.location.origin + '/api/auth/facebook',
      url: '/api/auth/facebook'
    });

    $authProvider.oauth2({
      name: 'vkontakte',
      url: '/api/auth/vkontakte',
      clientId: CONFIG.vkontakte.clientID,
      redirectUri: window.location.origin + '/api/auth/vkontakte',
      authorizationEndpoint: 'https://oauth.vk.com/authorize',
      optionalUrlParams: ['display'],
      display: 'mobile'
    });

    moment.locale('ru');
  });
