pepo.controller('feedCtrl', function($q, $location, $auth, $scope, userApi, pepsApi, MOCKTWEETS) {
  $scope.newPepText = '';
  pepsApi.getPeps().$promise.then(function(data){
    $scope.tweets = data;
  });
  userApi.getUser().$promise.then(function(data) {
    $scope.currentUser = data;
  });

  $scope.sendPep = function() {
    newPep = {
      parent: $scope.pep.owner._id,
      owner: {
        name: $scope.currentUser.name,
        username: $scope.currentUser.username
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

  // Server latency mock.
  function sleep (milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  var localPepsOffset = 0;
  $scope.loadMorePeps = function() {
    $scope.pepsLoading = true;
    localPepsOffset += 5;
    var res = pepsApi.getPeps({offset:localPepsOffset, count:5}).$promise.then(function(data){
      $scope.tweets = $scope.tweets.concat(data);
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
    });
  }

});
