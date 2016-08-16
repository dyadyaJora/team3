pepo.controller('feedCtrl', function($location, $auth, $scope, MOCKTWEETS) {
  console.log('feedCtrl');
  $scope.tweets = MOCKTWEETS;

  $scope.logout = function() {
    $auth.logout();
    $location.path('/');
  };
});
