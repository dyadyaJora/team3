pepo.controller('feedCtrl', function($q, $location, $auth, $scope, pepsApi, MOCKTWEETS) {
  console.log('feedCtrl');
  $scope.newPepText = '';
  pepsApi.getPeps().$promise.then(function(data){
    $scope.tweets = data;
  });

  $scope.sendPep = function() {
    newPep = {
      text: $scope.newPepText
    }
    pepsApi.sendPep(newPep).$promise.then(function(data){
      $scope.tweets.push(newPep);
    })
    .catch(function(err) {
      console.log(err);
    })
    $scope.varAnswer = false;
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
  	$scope.pep = $scope.tweets[id];

  }

  $scope.openModalDel = function(index, id) {
    $scope.varDel = true;
  	$scope.pep = $scope.tweets[index];
    $scope.delIndex = index;
    $scope.delId = id;
    console.log(id);
  }

  $scope.closeModalAnswer = function($event){
	var click = angular.element($event.target).parent();
	if(click.hasClass("modal")){
		$scope.varAnswer=false;
		$scope.varDel=false;
	}
  }



  $scope.deletePep = function(){
    pepsApi.deletePep({id: $scope.delId}).$promise.then(function(data){
      $scope.tweets.splice($scope.delIndex, 1);
      $scope.varDel=false;
  }).catch(function(eror){
    $scope.varDel=false;
  });   

  }

});
