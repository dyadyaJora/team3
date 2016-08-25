pepo.controller('singlePepCtrl', function($location, $scope, pepsApi, userApi, MOCKTWEETS) {

  currentPepId = $location.path().slice(4);

  pepsApi.getSinglePep({id: currentPepId}).$promise.then(function(data) {
    $scope.currentTweet = data;
    $scope.parent = $scope.currentTweet.parent;
  });

  $scope.isOwner = function(user, tweetOwner) {
     return user === tweetOwner;
  }

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }
});
