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
			  $scope.sendPep = function() {
    newPep = {
      location: currentLocation,
      parent: $scope.pep._id,
      owner: {
        name: $scope.currentUser.name,
        username: $scope.currentUser.username,
        thumbUrl: $scope.currentUser.thumbUrl
      },
      text: $scope.newPepText
    }
    pepsApi.sendPep(newPep).$promise.then(function(data){
      newPep._id = data._id
      $scope.tweets.unshift(newPep);
    })
    .catch(function(err) {
      console.log(err);
    })
    $scope.varAnswer = false;
    $scope.newPepText = '';
  }

		}
	}
});
