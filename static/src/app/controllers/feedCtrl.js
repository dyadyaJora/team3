pepo.controller('feedCtrl', function($location, $auth, $scope, MOCKTWEETS) {
  console.log('feedCtrl');
  $scope.tweets = MOCKTWEETS;

  $scope.logout = function() {
    $auth.logout();
    $location.path('/');
  };

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
  }
  $scope.myVar = false;
  $scope.openModal = function(id) {
    $scope.myVar = true;
   	$scope.pep = MOCKTWEETS[id];
  }
});
