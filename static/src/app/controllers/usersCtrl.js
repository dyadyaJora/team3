pepo.controller('usersCtrl', function($location, $scope, usersApi, userApi, MOCKUSERS) {
  //$scope.users = MOCKUSERS;
  $scope.searchValue = '';

  usersApi.getUsers().$promise.then(function(data) {
    $scope.users = data;
  }).catch(function(eror){
  	console.log(eror);
  }); 

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }
});
