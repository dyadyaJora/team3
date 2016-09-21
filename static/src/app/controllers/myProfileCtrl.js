pepo.controller('myProfileCtrl', function($location, $auth, $scope, userApi, usersApi, pepsApi){
  $scope.subscribed = [];
  var currentLocation = [], currentPep;
  navigator.geolocation.getCurrentPosition(show_map);

  // Get coordinates.
  function show_map(position) {
    currentLocation.push(position.coords.latitude);
    currentLocation.push(position.coords.longitude);
  }

  var currentUserId = $location.path().slice(2);
  function getUser(){
    usersApi.getUser({username: currentUserId}).$promise.then(function(data) {
      $scope.currentPageUser = data;
      checkFollow();
    }).catch(function(){
      $location.path('/not-found-user');
    });
  }
  getUser();

  usersApi.getUserStatuses({username: currentUserId}).$promise.then(function(data){
    $scope.tweets = data.statuses;
  });

  function getInfoItems() {
    usersApi.getFollowers({username: currentUserId}).$promise.then(function(data){
      $scope.followers = data.users;
    });

    usersApi.getFollowings({username: currentUserId}).$promise.then(function(data){
      $scope.following = data.users;
    });
  }

  getInfoItems();

  function checkFollow() {
    $scope.$on('currentUserLoaded', function() {
      $scope.currentUser.following.some(function(followingUser) {
        if (followingUser === $scope.currentPageUser._id) {
          $scope.subscribed[$scope.currentPageUser._id] = true;
        }
      });
    });
  }

  $scope.isSubscribe = function(userId) {
    $scope.$on('currentUserLoaded', function() {
      $scope.currentUser.following.some(function(followingUser) {
        if(followingUser === userId) {
          $scope.subscribed[userId] = true;
        }
      });
    });
  };

  $scope.subscribe = function(username, userId) {
    usersApi.followUser({username: username}).$promise.then(function(){
      $scope.subscribed[userId] = true;
      getInfoItems();
      getUser();
    });
  };

  $scope.unsubscribe = function(username, userId) {
    usersApi.unfollowUser({username: username}).$promise.then(function(){
      $scope.subscribed[userId] = false;
      getInfoItems();
      getUser();
    });
  };

  $scope.logout = function() {
    $auth.logout();
    $location.path('/');
  };

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
  };


  $scope.editPepStart = function(index, id, text){
    $scope.emojiOpen = false;
    $scope.editId = id;
    $scope.editPepText = text;
    $scope.editIndex = index;
    $scope.varEdit1 = [];
    $scope.varEdit1[index] = true;
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
    var pepEdit = {text: $scope.editPepText };
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
    usersApi.getUserStatuses({username: currentUserId, offset:localPepsOffset, count:5}).$promise.then(function(data){
      $scope.tweets = $scope.tweets.concat(data.statuses);
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
    });
  };

  var localFollowersOffset = 0;
  $scope.loadMoreFollowers = function() {
    $scope.followersLoading = true;
    localFollowersOffset += 5;
    usersApi.getFollowers({username: currentUserId, offset:localFollowersOffset, count:5}).$promise.then(function(data){
      $scope.followers = $scope.followers.concat(data.users);
      sleep(1000); // server latency mock.
      $scope.followersLoading = false;
    });
  };

  var localFollowingOffset = 0;
  $scope.loadMoreFollowing = function() {
    $scope.followingLoading = true;
    localFollowingOffset += 5;
    usersApi.getFollowings({username: currentUserId, offset:localFollowingOffset, count:5}).$promise.then(function(data){
      $scope.following = $scope.following.concat(data.users);
      sleep(1000); // server latency mock.
      $scope.followingLoading = false;
    });
  };

  $scope.varInfo = 0;
  $scope.varInfoArr = [true, false, false];
  $scope.itemInfo = function(index){
    if( ((index==1) && ($scope.following.length!=0)) || ((index==2) && ($scope.followers.length!=0)) || (index==0 && 1 /*pepsCount!=0 */) ) {
      $scope.varInfoArr=[false, false, false];
      $scope.varInfoArr[index] = true;
    }
  };
  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  };
  $scope.addEmojiEdit = function(emoji) {
    $scope.editPepText += emoji;
  };
});