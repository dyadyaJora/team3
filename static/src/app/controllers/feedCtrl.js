pepo.controller('feedCtrl', function($q, $location, $auth, $scope, pepsApi, MOCKTWEETS) {
  console.log('feedCtrl');
  $scope.newPepText = '';
  $q.when(pepsApi.getPeps().$promise).then(function(data){
    $scope.tweets = data;
  });

  $scope.sendPep = function() {
    console.log($scope.newPepText);
    newPep = {
      text: $scope.newPepText
    }
    pepsApi.sendPep(newPep);
    $scope.tweets.push(newPep);
  }


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
