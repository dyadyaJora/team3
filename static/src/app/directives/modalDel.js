angular.module('pepo').directive('modalDel', function($rootScope, $auth, $location, pepsApi, userApi) {
	return {
		restrict: "E",
		replace: false,
		templateUrl: '../build/templates/modules/modalDel.html',
		link: function($scope , $element, $attrs) {
			$scope.openModalDel = function(index, id) {
				$scope.varEdit1 = [];
				 $scope.varDel = true;
				$scope.pep = $scope.tweets[index];
				$scope.delIndex = index;
				$scope.delId = id;
			 }

		}
	}
});