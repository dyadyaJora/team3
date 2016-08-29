pepo.controller('feedCtrl', function($rootScope, $q, $location, $auth, $scope, userApi, feedApi, pepsApi,$document) {
  $scope.newPepText = '';
  currentLocation = [];
  navigator.geolocation.getCurrentPosition(show_map);
  $scope.text =  "Lotus :smile: eleates vix attrahendams luna est.Advenas mori!Fermiums prarere in cubiculum!Cum cacula cantare, omnes stellaesmanifestum azureus, nobilis https://angularjs.org/ acipenseres.Cum orgiamori, omnes rationees <3 experientia alter, regius :heart: mortemes.Devatiospersuadere, tanquam secundus spatii.Heu, barcas!Cedriums observare!A falsis,lacta talis imber. :P Cur eleates peregrinatione?"

  // Get coordinates.
  function show_map(position) {
    currentLocation.push(position.coords.latitude);
    currentLocation.push(position.coords.longitude);
  }

  feedApi.getFeed().$promise.then(function(data){
    $scope.tweets = data;
  });

  $scope.goToUser = function(username) {
    $location.path('/@' + username);
  }

  $scope.goToPep = function(pepId) {
    $location.path('/pep' + pepId);
  }

  $scope.editPepStart = function(index, id, text){
    $scope.editId = id;
    console.log(id);
    $scope.editPepText = text;
    $scope.editIndex = index;
    $scope.varEdit1 = [];
    $scope.varEdit1[index] = true;
  }

  $scope.editAnim = [];
  $scope.editPep = function(){
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
      sleep(1000); // server latency mock.
      $scope.pepsLoading = false;
    });
  }

});
