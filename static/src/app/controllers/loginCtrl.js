pepo.controller('loginCtrl', function($location, $q, $scope, $auth, userApi, $rootScope){
  console.log('loginCtrl');

  if ($auth.isAuthenticated()) {$location.path('/feed')}

  $scope.authenticate = function(provider) {
      console.log('auth');
      $auth.authenticate(provider).then(function(response) {
        switch (response.status) {
          case 200:
            $location.path('/feed');
            break;

          case 201:
            $rootScope.firstLogin = true;
            $location.path('/edit-profile');
            break;

          default:
            throw new Error('Error. Unexpected value response.status: ' + response.status);
        }
      });
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout();
  };
});
