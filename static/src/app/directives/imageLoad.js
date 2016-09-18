pepo.directive('imageLoad', ['$parse', function ($parse) {
  return {
    link: function (scope, element, attrs) {
      var model = $parse(attrs.imageLoad);
      var modelSetter = model.assign;

      element.bind("change", function (changeEvent) {
        scope.$apply(function () {
          var reader = new FileReader();
          reader.readAsDataURL(changeEvent.target.files[0]);
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  }
}]);
