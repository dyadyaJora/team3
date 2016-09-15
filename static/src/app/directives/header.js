pepo.directive('pepoHeader', function($rootScope, $auth, $location, pepsApi, userApi,feedApi, $document) {
	return {
		restrict: "E",
		replace: false,
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
        		body.addClass('no-scroll');
			    $scope.varEdit1 = [];
			    $scope.varNewpep = true;
			   	$scope.newPepText = "";
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
          			body.removeClass('no-scroll')
				}
			}
			$scope.closeModalSend = function(){
				$scope.varNewpep='';
				$scope.closeEmoji();
          		body.removeClass('no-scroll')
			}
			$scope.publishNewpep = function() {
				newPep = {
				    text: $scope.newPepText,
					location: currentLocation,
				    owner: {
				        name: $scope.currentUser.name,
				        username: $scope.currentUser.username,
						thumbUrl: $scope.currentUser.thumbUrl
    				}
				}
			    pepsApi.sendPep(newPep).$promise.then(function(data){
			      	newPep._id = data._id;
					newPep.createdAt = data.createdAt;
					if($location.url().slice(2) ==  $scope.currentUser.username || $location.url()=="/feed"){
			     		$scope.tweets.unshift(newPep);
			     	}
			     	$document.scrollTop(0, 300);
			    })
			    .catch(function(err) {
			      console.log(err);
			    })
			    $scope.varNewpep = false;
			    $scope.closeModalSend();
			}
			$scope.varInf = false;
			$scope.openInfNewPeps = function() {
        $rootScope.$broadcast('morePeapsLoaded', $scope.newPeps);
				$scope.varInf = !$scope.varInf;
			}

      $rootScope.$on('recieveBySocket', function(ev, data){
        $scope.newPeps = 0;
        $scope.currentUser.following.forEach(function(id) {
          data.forEach(function(pepOwnerId) {
            if(pepOwnerId === id) {
              $scope.newPeps++;
              if(!$scope.varInf) {
                $scope.varInf = true;
              }
            }
          })
        });
      });

			$scope.goToMyProfile = function() {
				$location.path('/@' + $scope.currentUser.username);
			}
			
			$scope.closeEmoji = function () {
				$scope.emojiOpen = false
			}
		}
	}
}) ;
