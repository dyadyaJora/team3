pepo.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            scope.limit = parseInt(attrs.limitTo);

            scope.lengthWithoutLink = function(text){
                scope.hLinkLenght  = text.length;
                var hasLink = /(HTTP:\/\/|HTTPS:\/\/)([a-zA-Z0-9.\/&?_=!*,\(\)+-]+)/ig;
                var result = text.match(hasLink);
                if(result){
                result.forEach(function(item, i, result){
                    scope.hLinkLenght -= item.length;
                });
                }
                return scope.hLinkLenght;
            }
        }
         
    }

}]);
