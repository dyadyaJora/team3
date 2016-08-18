pepo.controller('usersCtrl', function($location, $scope, MOCKUSERS) {
  $scope.users = MOCKUSERS;
  $scope.searchValue = '';

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }
});
