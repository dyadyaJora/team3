pepo.controller('singlePepCtrl', function($location, $scope, pepsApi, userApi, MOCKTWEETS) {


  $scope.$on('currentUserLoaded', function() {
    $scope.curUser = $scope.currentUser;
    console.log($scope.currentUser);
  });

  currentPepId = $location.path().slice(4);
  pepsApi.getSinglePep({id: currentPepId}).$promise.then(function(data) {
    $scope.currentTweet = data;
    $scope.parent = $scope.currentTweet.parent;
    checkFollow();
  });

  $scope.isOwner = function(user, tweetOwner) {
     return user === tweetOwner;
  }

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }

  function checkFollow() {
     $scope.$on('currentUserLoaded', function() {
       $scope.currentUser.following.some(function(followingUser) {
         if (followingUser === $scope.currentTweet.owner._id) {
          $scope.followed = true;
         }
       });
     });
   }
});
