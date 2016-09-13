describe('Testing each Ctrl', function() {
  var scope, $location, createController, totalPeps;
  beforeEach(function(){
   angular.module('pepo.config',[])
   .constant('CONFIG', {"facebook":{"clientID":"601376040048633"},"vkontakte":{"clientID":"5589421"}});
  });
  beforeEach(module('pepo'));

  var $_controller, $document;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $_controller = $controller;
    }));


    it('editProfile units', function() {
      var controller =  $_controller('editProfileCtrl', { '$scope': scope });
      scope.closeModalEditPhoto();
      expect(scope.varOpenEditPhoto).toEqual(false);
      scope.openModalEditPhoto();
      expect(scope.varOpenEditPhoto).toEqual(true);
      scope.editCancel();
/*
      scope.user = MOCKUSERS[0];
      scope.userEdit = {};
      scope.updateUser();
      expect(scope.user).toEqual("bartolomew");*/
    });

    it('feedCtrl units', function() {
      var controller =  $_controller('feedCtrl', { '$scope': scope , 'totalPeps' : totalPeps });
      scope.editPepStart(0, 0, "Hello World!!!");
      expect(scope.varEdit1[0]).toEqual(true);
      expect(scope.editPepText).toEqual("Hello World!!!");
      scope.tweets = MOCKTWEETS;


      scope.editPep();
      expect(scope.emojiOpen).toEqual(false);
      scope.addEmojiEdit(":smile:");
      expect(scope.editPepText).toEqual("Hello World!!!:smile:");
      scope.goToUser("@username");
      scope.goToPep("@pepId");

      scope.loadMorePeps();
      expect(scope.pepsLoading).toEqual(true);
      
    });
});