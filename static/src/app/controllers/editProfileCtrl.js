pepo.controller('editProfileCtrl', function ($location, $scope, userApi,  MOCKUSERS, multipartForm) {

    userApi.getUser().$promise.then(function(data) {
      $scope.user = data;
    });

    $scope.varOpenEditPhoto = false;
    $scope.userEdit = {};

    $scope.updateUser = function () {
      $scope.userEdit.username = $scope.user.username;
      $scope.userEdit.description = $scope.user.description;
      var uploadUrl = '/api/user';
      multipartForm.patch(uploadUrl, $scope.userEdit);
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
