pepo.controller('usersCtrl', function($location, $scope, usersApi, userApi, debounce) {
  $scope.searchValue = '';
  $scope.subscribed = [];

  $scope.fn = debounce(function () {
    usersApi.getUsers({q: $scope.searchValue}).$promise.then(function(data){
      $scope.users = data;
    });
  }, 2000);


  $scope.$on('currentUserLoaded', function() {
    $scope.curUser = $scope.currentUser;
    getUsers();
  });

  function getUsers() {
    usersApi.getUsers().$promise.then(function(data) {
      $scope.users = data.users;
      $scope.totalUsers = data.totalCount;
    }).catch(function(eror){
      console.log(eror);
    });
  }

  $scope.isSubscribe = function(user) {
    $scope.currentUser.following.some(function(followingUser) {
      if(followingUser === user._id) {
        $scope.subscribed[user._id] = true;
      }
    });
  };

  $scope.subscribe = function(user) {
    usersApi.followUser({username: user.username}).$promise.then(function(){
      $scope.subscribed[user._id] = true;
      user.followersCount++;
      $scope.curUser.followingCount++;
    });
  };

  $scope.unsubscribe = function(user) {
    usersApi.unfollowUser({username: user.username}).$promise.then(function(){
      $scope.subscribed[user._id] = false;
      user.followersCount--;
      $scope.curUser.followingCount--;
    });
  };

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  };

  // Server latency mock.
  function sleep (milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  var localUsersOffset = 0;
  $scope.loadMoreUsers = function() {
    $scope.usersLoading = true;
    localUsersOffset += 5;
    var res = usersApi.getUsers({offset:localUsersOffset, count:5}).$promise.then(function(data){
      $scope.users = $scope.users.concat(data.users);
      sleep(1000); // server latency mock.
      $scope.usersLoading = false;
    });
  };
});