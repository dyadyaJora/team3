pepo.controller('usersCtrl', function($scope, MOCKUSERS) {
  $scope.users = MOCKUSERS;
  $scope.searchValue = '';
});
