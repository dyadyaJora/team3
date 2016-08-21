angular.module('pepo').directive('pepoHeader', function($auth, $location) {
	return {
		restrict: "E",
		replace: false,
		templateUrl: '../build/templates/modules/header.html',
		link: function($scope , $element, $attrs) {
			 $scope.logout = function() {
			    $auth.logout();
			    $location.path('/');
			};
			$scope.closeSlideMenu = function($event) {
				var click = angular.element($event.target);
				if(click.hasClass("slide-effect_bg")) {
					$scope.menuOpened = false;
				}
			}
			$scope.menuOpened = false;
			$scope.toggleMenu = function( ) {
				$scope.menuOpened = !$scope.menuOpened;
			};
		}
	}
}) ;