pepo.controller('editProfileCtrl', function ($rootScope, $q, $route, $location, $scope, userApi,  MOCKUSERS, multipartForm) {
    userApi.getUser().$promise.then(function(data) {
      $scope.user = data;
      $scope.user.avatarUrl = $scope.user.avatarUrl || '../img/lisa.jpg';
      console.log($scope.user);

    });

    $scope.formPristine = true;
    $scope.varOpenEditPhoto = false;
    $scope.userEdit = {};

    $scope.$watch(function() {

      if ($scope.editProfileForm.$dirty) {
        $scope.formPristine = false;
      }

      if ($scope.userEdit.avatar) {
        $scope.formPristine = false;
        $scope.newAvatarName = $scope.userEdit.avatar.name;
        $scope.varOpenEditPhoto = false;
      }
    });


    $scope.updateUser = function () {
      if ($scope.formPristine) {return}
      $scope.userEdit.username = $scope.user.username;
      $scope.userEdit.description = $scope.user.description;
      var uploadUrl = '/api/user';
      multipartForm.patch(uploadUrl, $scope.userEdit).then(function(data){
        $route.reload();
      })
      .catch(function(err) {
        throw new Error('updateUser: editProfileCtrl.js');
      })
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
