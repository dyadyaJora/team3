pepo.controller('feedCtrl', function($rootScope, $q, $location, $auth, $scope, userApi, feedApi, pepsApi, $document, pepoSocket) {
  $scope.newPepText = '';
  var pepEdit, currentPep;
  $scope.totalPeps = -1;

  pepoSocket.on('feed', function (data) {
    $rootScope.$broadcast('recieveBySocket', data);
  });

  // Get coordinates.

  function checkLoadMore() {
    if ($scope.tweets.length >= $scope.totalPeps) {
      $scope.allPepsLoaded = true;
    }
  }

  feedApi.getFeed().$promise.then(function(data){
    $scope.tweets = data.statuses;
    $scope.totalPeps = data.totalCount;
    checkLoadMore();

  });

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  };

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
  };

  $scope.editPepStart = function(index, id, text){
    $scope.editId = id;
    $scope.editPepText = text;
    $scope.editIndex = index;
    $scope.varEdit1 = [];
    $scope.varEdit1[index] = true;
    $scope.emojiOpen = false;
  };

  $scope.editAnim = [];
  $scope.editPep = function(){
    if($scope.hLinkLenght > $scope.limit || $scope.hLinkLenght == 0) return;
    $scope.emojiOpen = false;
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
    }).catch(function(){
      $scope.varEdit1 = [];
    });
    setTimeout(function(){ $scope.editAnim = [];}, 2000);
    $document.scrollTop(document.getElementsByClassName('tweets_item')[$scope.editIndex].offsetTop - $scope.varHeightheader, 300);
  };

  // Server latency mock.
  function sleep (milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  var localPepsOffset = 0;
  $scope.loadMorePeps = function() {
    $scope.pepsLoading = true;
    localPepsOffset += 5;
    feedApi.getFeed({offset:localPepsOffset, count:5}).$promise.then(function(data){
      $scope.tweets = $scope.tweets.concat(data.statuses);
      checkLoadMore();
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
    });
  };

  $rootScope.$on('morePeapsLoaded', function(ev, data) {
    feedApi.getFeed({offset:0, count:data}).$promise.then(function(data){
      for (var i = 0; i < data.statuses.length; i++) {
        $scope.tweets.unshift(data.statuses[i]);
      }
      checkLoadMore();
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
      $scope.totalPeps+=data.statuses.length;
    });
  });

  $scope.addEmojiEdit = function(emoji) {
    $scope.editPepText += emoji;
  };
});
