pepo.controller('feedCtrl', function($scope, MOCKTWEETS) {
  console.log('feedCtrl');
  $scope.tweets = MOCKTWEETS;
});
