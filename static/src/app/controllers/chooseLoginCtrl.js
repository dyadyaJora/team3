pepo.controller('chooseLoginCtrl', function($scope, $auth){
  console.log('chooseLoginCtrl');

  $scope.authenticate = function(provider) {
      console.log('auth');
      console.log($auth.authenticate(provider));
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout();
  }
});
