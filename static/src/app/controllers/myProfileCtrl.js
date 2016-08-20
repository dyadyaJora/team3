pepo.controller('myProfileCtrl', function($location, $auth, $scope, MOCKTWEETS){
    console.log('myProfileCtrl');
    $scope.tweets = MOCKTWEETS;

    $scope.logout = function() {
        $auth.logout();
        $location.path('/');
    };

    $scope.goToPep = function(pepId) {
        $location.path('/pep' + pepId);
    }
});