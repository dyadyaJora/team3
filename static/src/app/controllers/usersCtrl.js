pepo.controller('usersCtrl', function($location, $scope, usersApi, userApi, debounce, MOCKUSERS) {
  $scope.searchValue = '';
  $scope.subscribed = [];

  $scope.fn = debounce(function () {
      console.log($scope.searchValue);
      usersApi.getUsers({q: $scope.searchValue}).$promise.then(function(data){
        $scope.users = data;
      });
    }, 2000);
  

  $scope.$on('currentUserLoaded', function() {
     getUsers();
  });

  function getUsers() {
    usersApi.getUsers().$promise.then(function(data) {
      $scope.users = data;
        console.log($scope.users);
    }).catch(function(eror){
      console.log(eror);
    });
  }

  $scope.isSubscribe = function(userId) {
    console.log('init');
    $scope.currentUser.following.some(function(followingUser) {
      if(followingUser === userId) {
        $scope.subscribed[userId] = true;
      }
    });
  }

  $scope.subscribe = function(username, userId) {
    usersApi.followUser({username: username}).$promise.then(function(){
       $scope.subscribed[userId] = true;
    })
  }

  $scope.unsubscribe = function(username, userId) {
    usersApi.unfollowUser({username: username}).$promise.then(function(){
       $scope.subscribed[userId] = false;
    })
  }

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }
});
