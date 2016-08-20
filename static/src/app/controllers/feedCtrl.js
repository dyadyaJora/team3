pepo.controller('feedCtrl', function($location, $auth, $scope, MOCKTWEETS) {
  console.log('feedCtrl');
  $scope.tweets = MOCKTWEETS;

  $scope.logout = function() {
    $auth.logout();
    $location.path('/');
  };

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
  }

  $scope.varAnswer = false;
  $scope.varDel = false;
  $scope.openModalAnswer = function(id) {
    $scope.varAnswer = true;
  	$scope.pep = MOCKTWEETS[id];
    
  }

  $scope.openModalDel = function(id) {
    $scope.varDel = true;
  	$scope.pep = MOCKTWEETS[id];
    $scope.delId = id;
  }

  $scope.closeModalAnswer = function($event){
	var click = angular.element($event.target).parent();
	if(click.hasClass("modal")){
		$scope.varAnswer=false;
		$scope.varDel=false;
	}
  }



  $scope.deletePep = function(){
    $scope.tweets.splice($scope.delId, 1);
    $scope.varDel=false;

  }

});
