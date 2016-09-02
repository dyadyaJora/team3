pepo.controller('feedCtrl', function($rootScope, $q, $location, $auth, $scope, userApi, feedApi, pepsApi, $document) {
  $scope.newPepText = '';
  currentLocation = [];
  totalPeps = 0;
  navigator.geolocation.getCurrentPosition(show_map);

  // Get coordinates.
  function show_map(position) {
    currentLocation.push(position.coords.latitude);
    currentLocation.push(position.coords.longitude);
  }

  function checkLoadMore() {
    console.log($scope.tweets.length);
    console.log(totalPeps);
    console.log('---------------')
    if ($scope.tweets.length >= totalPeps) {
      $scope.allPepsLoaded = true;
    }
  }

  feedApi.getFeed().$promise.then(function(data){
    console.log(data);
    $scope.tweets = data.statuses;
    totalPeps = data.totalCount;
    checkLoadMore();
  });

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
  }

  $scope.editPepStart = function(index, id, text){
    $scope.editId = id;
    $scope.editPepText = text;
    $scope.editIndex = index;
    $scope.varEdit1 = [];
    $scope.varEdit1[index] = true;
    $scope.emojiOpen = false;
  }

  $scope.editAnim = [];
  $scope.editPep = function(){
    $scope.emojiOpen = false;
    if ($scope.tweets[$scope.editIndex].text == $scope.editPepText) {
      $scope.varEdit1 = [];
      return;
    }
    $scope.editAnim[$scope.editIndex] = true;
    pepEdit = {text: $scope.editPepText };
    pepsApi.editPep({id: $scope.editId}, pepEdit).$promise.then(function(data){
      $scope.tweets.find(function(pep) {
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
    //document.getElementsByTagName('body')[0].scrollTop = document.getElementsByClassName('tweets_item')[$scope.editIndex].offsetTop - $scope.varHeightheader ;
     $document.scrollTop(document.getElementsByClassName('tweets_item')[$scope.editIndex].offsetTop - $scope.varHeightheader, 300);
  }

  // Server latency mock.
  function sleep (milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  var localPepsOffset = 0;
  $scope.loadMorePeps = function() {
    $scope.pepsLoading = true;
    localPepsOffset += 5;
    var res = feedApi.getFeed({offset:localPepsOffset, count:5}).$promise.then(function(data){
      $scope.tweets = $scope.tweets.concat(data);
      checkLoadMore();
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
    });
  }
  $scope.addEmojiEdit = function(emoji) {
     $scope.editPepText += emoji;
  }/*
  $scope.hasLink = function(id){
    var elem = angular.element(document.querySelector( '#a'+id));
    var isLink = elem.find('a').length==0;
    if(isLink){
      $scope.linkImg = "";
    } else {
      $scope.linkImg = "http://mini.s-shot.ru/1024x768/240/PNG/?"+elem.find('a')[0].href;
      console.log("hi", $scope.linkImg);
    }
    return isLink;
  }
  */
  $scope.hasLink = function(text){
    var hlink = /(HTTP:\/\/|HTTPS:\/\/)([a-zA-Z0-9.\/&?_=!*,\(\)+-]+)/i;
    text.replace(hlink, function(url){
      $scope.linkImg = "http://mini.s-shot.ru/1024x768/240/PNG/?" + url;
    })
  }
});
