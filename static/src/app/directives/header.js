angular.module('pepo').directive('pepoHeader', function($rootScope, $auth, $location, pepsApi, userApi,feedApi, $document) {
	return {
		restrict: "E",
		replace: true,
		templateUrl: '../build/templates/modules/header.html',
		link: function($scope , $element, $attrs) {
			$scope.varHeightheader = document.getElementsByClassName('header')[0].clientHeight;

      var body = angular.element(document).find('body');
			body.removeClass('no-scroll');
      userApi.getUser().$promise.then(function(data) {
        $scope.currentUser = data;
        $scope.$broadcast('currentUserLoaded');
      })
		  .catch (function () {
			  $location.path('/');
		  })

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
			     	$document.scrollTop(0, 300);
				    
				    
			      	
			    })
			    .catch(function(err) {
			      console.log(err);
			    })
			    $scope.varNewpep = false;
			    $scope.newPepText = '';
			}
			$scope.varInf = false;
			$scope.openInfNewPeps = function() {
				$scope.varInf = !$scope.varInf;
			}

			$scope.goToMyProfile = function() {
				$location.path('/@' + $scope.currentUser.username);
			}
		}
	}
}) ;
