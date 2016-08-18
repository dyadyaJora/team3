pepo.controller('singlePepCtrl', function($scope, MOCKTWEETS) {
  $scope.currentTweet = MOCKTWEETS[0];

  $scope.isOwner = function(user, tweetOwner) {
     return user === tweetOwner;
  }
});
