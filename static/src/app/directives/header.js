angular.module('pepo').directive('pepoHeader', function($rootScope, $auth, $location, pepsApi, userApi) {
	return {
		restrict: "E",
		replace: false,
		templateUrl: '../build/templates/modules/header.html',
		link: function($scope , $element, $attrs) {

      var body = angular.element(document).find('body');

      userApi.getUser().$promise.then(function(data) {
        $scope.currentUser = data;
      });

			 $scope.logout = function() {
			    $auth.logout();
			    $location.path('/');
			};
			$scope.closeSlideMenu = function($event) {
				var click = angular.element($event.target);
				if(click.hasClass('slide-effect_bg') || click.hasClass('cancel-menu_btn')) {
					$scope.menuOpened = false;
          body.removeClass('no-scroll')
				}
			}

			$scope.menuOpened = false;
			$scope.toggleMenu = function( ) {
				$scope.menuOpened = !$scope.menuOpened;
        body.addClass('no-scroll');
			};

			$scope.varNewpep = false;
			$scope.varDel = false;
			$scope.openNewpep = function(id) {
			    $scope.varEdit1 = [];
			    $scope.varNewpep = true;
			  	$scope.pep = $scope.tweets[id];
		        }

			$scope.openNewpepDel = function(index, id) {
				    $scope.varEdit1 = [];
				    $scope.varDel = true;
				  	$scope.pep = $scope.tweets[index];
				    $scope.delIndex = index;
				    $scope.delId = id;
				}

			$scope.closeNewpepAnswer = function($event){
				var click = angular.element($event.target).parent();
				if(click.hasClass("modal")){
					$scope.varNewpep=false;
					$scope.varDel=false;
				}
			}
			$scope.publishNewpep = function() {
				newPep = {
				    text: $scope.newPepText,
				    owner: {
				        name: $scope.currentUser.name,
				        username: $scope.currentUser.username
    				}
				}
			    pepsApi.sendPep(newPep).$promise.then(function(data){
			      newPep._id = data._id
			      $scope.tweets.unshift(newPep);
			    })
			    .catch(function(err) {
			      console.log(err);
			    })
			    $scope.varNewpep = false;
			    $scope.newPepText = '';
			}
		}
	}
}) ;
