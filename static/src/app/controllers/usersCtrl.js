pepo.controller('usersCtrl', function($location, $scope, usersApi, userApi, MOCKUSERS) {
  //$scope.users = MOCKUSERS;
  $scope.searchValue = '';
  console.log(userApi);

  usersApi.getUsers().$promise.then(function(data) {
    $scope.users = data;
    console.log(data);
  }); 

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }
});
