angular.module('pepo').directive('modalForm', function($rootScope, $auth, $location, pepsApi, userApi) {
	return {
		restrict: "E",
		replace: false,
		templateUrl: '../build/templates/modules/modalAnswer.html',
		link: function($scope , $element, $attrs) {
		}
	}
});