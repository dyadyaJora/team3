
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
        if($rootScope.firstLogin){
          $location.path('/welcome');
        } else{
          $route.reload();
          $rootScope.success = 1;
        }
      })
      .catch(function(err) {
        $rootScope.success = -1;
        throw new Error('updateUser: editProfileCtrl.js');
      })
    };

    $scope.editCancel = function () {
      if($rootScope.firstLogin){
          $location.path('/welcome');
        } else {
          $location.path('/feed');
        }
    };

    $scope.openModalEditPhoto = function () {
        $scope.varOpenEditPhoto = true;
        body.addClass('no-scroll')
    };

    $scope.closeModalEditPhoto = function () {
        $scope.varOpenEditPhoto = false;
        body.removeClass('no-scroll')
    }

    $scope.isVisible = function () {
      if($rootScope.success){
        body.addClass('no-scroll');
      }
      return $rootScope.success;
    }

    $scope.closeMesModal = function () {
      body.removeClass('no-scroll');
      $rootScope.success = undefined;
    }

    $scope.closeMesModal_bg = function($event){
      var click = angular.element($event.target).parent();
      if(click.hasClass("modal-fade-screen")){
        $scope.closeMesModal();
      }
    }
});
