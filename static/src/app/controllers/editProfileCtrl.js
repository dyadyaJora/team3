pepo.controller('editProfileCtrl', function($scope, MOCKUSERS){
    console.log('Edit profile');
    $scope.user = MOCKUSERS[1];
});
