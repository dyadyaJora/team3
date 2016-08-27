angular.module('pepo').directive('modalAnswer', function($rootScope, $auth, $location, pepsApi, userApi) {
	return {
		restrict: "E",
		replace: false,
		templateUrl: '../build/templates/modules/modalAnswer.html',
		link: function($scope , $element, $attrs) {
			$scope.varAnswer = false;
			$scope.openModalAnswer = function(id) {
				$scope.varDel = false;

				$scope.varEdit1 = [];
				 $scope.varAnswer = true;
				$scope.pep = $scope.tweets[id];
			 }
			$scope.closeModalAnswer = function($event){
				var click = angular.element($event.target).parent();
				if(click.hasClass("modal")){
					$scope.varAnswer=false;
					$scope.varDel=false;
				}
			}

		}
	}
});