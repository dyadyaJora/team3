pepo.controller('singlePepCtrl', function($location, $scope, MOCKTWEETS) {
  $scope.currentTweet = MOCKTWEETS[0];

  $scope.parent = $scope.currentTweet.parent;

  $scope.isOwner = function(user, tweetOwner) {
     return user === tweetOwner;
  }

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }
});
