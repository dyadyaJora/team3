pepo.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
            	scope.t = limit - this.value.length;
                if (this.value.length - 1 == limit) e.preventDefault();
            });
        }
         
    }

}]);
