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


  $scope.editPepStart = function(index, id, text){
    $scope.editId = id;
    console.log(id);
    $scope.editPepText = text;
    $scope.editIndex = index;
    $scope.varEdit1 = [];
    $scope.varEdit1[index] = true;
    $scope.emojiOpen = false;
  }

  $scope.editAnim = [];
  $scope.editMainPep = function(){
    $scope.emojiOpen = false;
    if ($scope.currentTweet.text == $scope.editPepText) {
      $scope.varEdit1 = [];
      return;
    } 
    /*
    if ($scope.tweets[$scope.editIndex].text == $scope.editPepText) {
      $scope.varEdit1 = [];
      return;
    } */
    $scope.editAnim[$scope.editIndex] = true;
    pepEdit = {text: $scope.editPepText };
    pepsApi.editPep({id: $scope.editId}, pepEdit).$promise.then(function(data){
      currentPep = $scope.currentTweet;
      currentPep.text = data.text;
      $scope.varEdit1 = [];
  }).catch(function(eror){
    $scope.varEdit1 = [];
  });
  setTimeout(function(){ $scope.editAnim = [];}, 2000);
  }

  $scope.editPep = function(){
    $scope.emojiOpen = false;
    if ($scope.currentTweet.children[$scope.editIndex].text == $scope.editPepText) {
      $scope.varEdit1 = [];
      console.log($scope.currentTweet.children[$scope.editIndex].text, $scope.editPepText);
      return;
    } 
    $scope.editAnim[$scope.editIndex] = true;
    pepEdit = {text: $scope.editPepText };
    pepsApi.editPep({id: $scope.editId}, pepEdit).$promise.then(function(data){
      $scope.currentTweet.children.find(function(pep) {
        if (pep._id === data._id) {
          currentPep = pep;
        }
      });
      currentPep.text = data.text;
      $scope.varEdit1 = [];
  }).catch(function(eror){
    $scope.varEdit1 = [];
  });
  setTimeout(function(){ $scope.editAnim = [];}, 2000);
  }
  $scope.addEmojiEdit = function(emoji) {
     $scope.editPepText += emoji;
  }
});
