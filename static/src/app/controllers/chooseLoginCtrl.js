pepo.controller('chooseLoginCtrl', function($q, $scope, $auth, userApi){
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

  $q.when(userApi.getUser().$promise).then(function(data){
    console.log('get user');
    console.log(data);
  });
});
