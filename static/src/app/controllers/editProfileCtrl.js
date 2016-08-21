pepo.controller('editProfileCtrl', function ($location, $scope, MOCKUSERS, multipartForm) {
    console.log('Edit profile');
    $scope.user = MOCKUSERS[1];
    $scope.varOpenEditPhoto = false;
    $scope.userEdit = {};
    $scope.updateUser = function () {
      console.log($scope.userEdit);
      var uploadUrl = '/api/user';
      multipartForm.patch(uploadUrl, $scope.userEdit);


        // $location.path('/feed');
    };

    $scope.editCancel = function () {
        $location.path('/feed');
    };
    $scope.openModalEditPhoto = function () {
        $scope.varOpenEditPhoto = true;
    };
    $scope.closeModalEditPhoto = function () {
        $scope.varOpenEditPhoto = false;
    }
});
