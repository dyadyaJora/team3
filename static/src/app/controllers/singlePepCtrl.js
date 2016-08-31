pepo.controller('singlePepCtrl', function($location, $scope, pepsApi, userApi, usersApi, MOCKTWEETS) {

  currentLocation = [];
  navigator.geolocation.getCurrentPosition(show_map);

  // Get coordinates.
  function show_map(position) {
    currentLocation.push(position.coords.latitude);
    currentLocation.push(position.coords.longitude);
  }

  $scope.$on('currentUserLoaded', function() {
    $scope.curUser = $scope.currentUser;
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

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
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

  $scope.subscribe = function(username) {
    usersApi.followUser({username: username}).$promise.then(function(){
      $scope.followed = true;
    });
  }

  $scope.unsubscribe = function(username) {
    usersApi.unfollowUser({username: username}).$promise.then(function(){
      $scope.followed = false;
    });
  }

});
