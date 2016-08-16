pepo.controller('loginCtrl', function($q, $scope, $auth, userApi){
  console.log('loginCtrl');

  $scope.authenticate = function(provider) {
      console.log('auth');
      $auth.authenticate(provider).then(function(response) {
        console.log(response);
      });
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout();
  };
});
