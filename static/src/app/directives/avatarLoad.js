pepo.directive('avatarLoad', function($rootScope, $parse) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      var model = $parse($attrs.avatarLoad)
      var modelSetter = model.assign;

      $element.bind('change', function() {
        $scope.$apply(function() {
          modelSetter($scope, $element[0].files[0]);
          $rootScope.ava = URL.createObjectURL($element[0].files[0]);

        });
      });
    }
  }
});
