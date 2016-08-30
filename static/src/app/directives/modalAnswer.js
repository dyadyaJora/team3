angular.module('pepo').directive('modalAnswer', function($rootScope, $auth, $location, pepsApi, userApi) {
	return {
		restrict: "E",
		replace: false,
		templateUrl: '../build/templates/modules/modalAnswer.html',
		link: function($scope , $element, $attrs) {
      $scope.emojiPack = [':bowtie:', ':smile:', ':laughing:', ':blush:', ':smiley:', ':relaxed:', ':smirk:', ':heart_eyes:', ':kissing_heart:', ':kissing_closed_eyes:', ':flushed:', ':relieved:', ':satisfied:', ':grin:', ':wink:', ':stuck_out_tongue_winking_eye:', ':stuck_out_tongue_closed_eyes:', ':grinning:', ':kissing:', ':winky_face:', ':kissing_smiling_eyes:', ':stuck_out_tongue:', ':sleeping:', ':worried:', ':frowning:', ':smiley_cat:', ':smile_cat:', ':heart_eyes_cat:', ':kissing_cat:', ':smirk_cat:', ':scream_cat:', ':crying_cat_face:', ':joy_cat:', ':pouting_cat:'];
			$scope.varAnswer = false;
      $scope.emojiOpen = false;
      var body = angular.element(document).find('body');
			$scope.openModalAnswer = function(id) {
				$scope.varDel = false;
        body.addClass('no-scroll');
				$scope.varEdit1 = [];
				 $scope.varAnswer = true;
				$scope.pep = $scope.tweets[id];
			 }
			$scope.closeModalAnswer = function($event){
				var click = angular.element($event.target).parent();
				if(click.hasClass("modal")){
					$scope.varAnswer=false;
					$scope.varDel=false;
          body.removeClass('no-scroll')
				}
			}
		  $scope.sendPep = function() {
        newPep = {
          location: currentLocation,
          parent: $scope.pep._id,
          owner: {
            name: $scope.currentUser.name,
            username: $scope.currentUser.username,
            thumbUrl: $scope.currentUser.thumbUrl
          },
          text: $scope.newPepText
        }
        pepsApi.sendPep(newPep).$promise.then(function(data){
          newPep._id = data._id
          $scope.tweets.unshift(newPep);
        })
        .catch(function(err) {
          console.log(err);
        })
        $scope.varAnswer = false;
        $scope.newPepText = '';
      }
      $scope.toggleEmoji = function(emoji) {
        $scope.emojiOpen = !$scope.emojiOpen;
      }
      $scope.addEmoji = function(emoji) {
        $scope.newPepText += emoji;
      }

		}
	}
});
