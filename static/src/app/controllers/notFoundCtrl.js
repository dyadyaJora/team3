pepo.controller('notFoundCtrl', function($location, $scope) {
  var type = $location.path().slice(11);
  switch(type){
  case 'pep':
    $scope.errorText = 'К сожалению данный пеп не найден =(';
    break;
  case 'user':
    $scope.errorText = 'Искомый пользователь в системе не обнаружен =(';
    break;
  default:
    $scope.errorText = '';
  }
});