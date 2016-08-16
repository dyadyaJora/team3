pepo.controller('editProfileCtrl', function($location, $scope, MOCKUSERS){
    console.log('Edit profile');
    $scope.user = MOCKUSERS[1];

    $scope.updateUser = function() {
      $location.path('/feed');
    }
});
