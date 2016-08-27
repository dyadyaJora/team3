
pepo.controller('editProfileCtrl', function ($rootScope, $q, $route, $location, $scope, userApi,  MOCKUSERS, multipartForm) {
    var body = angular.element(document).find('body');

    userApi.getUser().$promise.then(function(data) {
      $scope.user = data;
      $scope.user.avatarUrl = $scope.user.avatarUrl || '../build/img/lisa.jpg';

    });
        $scope.$on('localAvatarChange', function ( event, img ) {
            $scope.$apply(function () {
                $scope.user.avatarUrl = img;
                $scope.varOpenEditPhoto = false;
            })
        })
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

          body.removeClass('no-scroll');
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
        body.addClass('no-scroll')
    };

    $scope.closeModalEditPhoto = function () {
        $scope.varOpenEditPhoto = false;
        body.removeClass('no-scroll')
    }
});
