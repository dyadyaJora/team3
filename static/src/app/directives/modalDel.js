angular.module('pepo').directive('modalDel', function($rootScope, $auth, $location, pepsApi) {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: '../build/templates/modules/modalDel.html',
    link: function($scope) {
      var body = angular.element(document).find('body');
      var singlePep = false;
      $scope.openModalDel = function(index, id) {
        $scope.varEdit1 = [];
        $scope.varDel = true;
        $scope.pep = $scope.tweets[index];
        $scope.delIndex = index;
        $scope.delId = id;
        body.addClass('no-scroll');
      };
      $scope.openModalD = function (tweet, isMainPep){
        $scope.varAnswer = false;
        body.addClass('no-scroll');
        $scope.varEdit1 = [];
        $scope.varDel = true;
        $scope.pep = tweet;
        $scope.delId = tweet._id;
        singlePep = isMainPep;
      };
      $scope.deletePep = function(){
        pepsApi.deletePep({id: $scope.delId}).$promise.then(function(){
          if($scope.tweets!=undefined){
            $scope.tweets.splice($scope.delIndex, 1);
          } else{
            if (singlePep) {
              $location.path('/feed');
            } else{
              $scope.currentTweet.children.splice($scope.delIndex, 1);
            }
          }
          $scope.varDel=false;
        }).catch(function(){
          $scope.varDel=false;
        });
        body.removeClass('no-scroll');
        if($scope.totalPeps != undefined) $scope.totalPeps--;
        if($location.path()[1] && $scope.currentPageUser.username == $scope.currentUser.username) $scope.currentPageUser.statusesCount--;
      };

    }
  };
});