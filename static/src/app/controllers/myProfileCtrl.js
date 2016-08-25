pepo.controller('myProfileCtrl', function($location, $auth, $scope, userApi, usersApi, pepsApi, MOCKTWEETS){

  currentUserId = $location.path().slice(2);

  usersApi.getUser({username: currentUserId}).$promise.then(function(data) {
    $scope.currentPageUser = data;
  });

  usersApi.getUserStatuses({username: currentUserId}).$promise.then(function(data){
   	$scope.tweets = data;
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
    $scope.varEdit1 = [];
    $scope.varAnswer = true;
  	$scope.pep = $scope.tweets[id];
  }

  $scope.openModalDel = function(index, id) {
    $scope.varEdit1 = [];
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

  $scope.editPepStart = function(index, id, text){
    $scope.editId = id;
    console.log(id);
    $scope.editPepText = text;
    $scope.editIndex = index;
    $scope.varEdit1 = [];
    $scope.varEdit1[index] = true;
  }

  $scope.editAnim = [];
  $scope.editPep = function(){
    if ($scope.tweets[$scope.editIndex].text == $scope.editPepText) {
      $scope.varEdit1 = [];
      return;
    }
    $scope.editAnim[$scope.editIndex] = true;
    pepEdit = {text: $scope.editPepText };
    pepsApi.editPep({id: $scope.editId}, pepEdit).$promise.then(function(data){
      $scope.tweets.find(function(pep) {
        if (pep._id === data._id) {
          currentPep = pep;
        }
      });
      currentPep.text = data.text;
      $scope.varEdit1 = [];
  }).catch(function(eror){
    $scope.varEdit1 = [];
  });
  setTimeout(function(){ $scope.editAnim = [];}, 2000);
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
    var res = usersApi.getUserStatuses({username: currentUserId}, {offset:localPepsOffset, count:5}).$promise.then(function(data){
      $scope.tweets = $scope.tweets.concat(data);
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
    });
  }
});
