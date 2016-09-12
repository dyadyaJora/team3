describe("Unit: Testing Controllers", function() {

  beforeEach(module('pepo'));

  it('should have a feedCtrl controller', function() {
    expect(pepo.feedCtrl).not.toBe(null);
  });
  it('should have a editProfileCtrl controller', function() {
    expect(pepo.editProfileCtrl).not.toBe(null);
  });
  it('should have a loginCtrl controller', function() {
    expect(pepo.loginCtrl).not.toBe(null);
  });
  it('should have a myProfileCtrl controller', function() {
    expect(pepo.myProfileCtrl).not.toBe(null);
  });
  it('should have a singlePepCtrl controller', function() {
    expect(pepo.singlePepCtrl).not.toBe(null);
  });
  it('should have a usersCtrl controller', function() {
    expect(pepo.usersCtrl).not.toBe(null);
  });

  it('should have a modalDel directive', function() {
    expect(pepo.modalDel).not.toBe(null);
  });
 });

describe('editProfileCtrl', function() {
  var scope, $location, createController;
  beforeEach(function(){
   angular.module('pepo.config',[])
   .constant('CONFIG', {"facebook":{"clientID":"601376040048633"},"vkontakte":{"clientID":"5589421"}});
  });
  beforeEach(module('pepo'));

  var $_controller;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $_controller = $controller;
    }));


    it('editPrifile units', function() {
      var controller =  $_controller('editProfileCtrl', { '$scope': scope });
      scope.closeModalEditPhoto();
      expect(scope.varOpenEditPhoto).toEqual(false);
      scope.openModalEditPhoto();
      expect(scope.varOpenEditPhoto).toEqual(true);
    });
    it('feedCtrl units', function() {
      var controller =  $_controller('feedCtrl', { '$scope': scope });
      scope.editPepStart(0, 0, "Hello World!!!");
      expect(scope.varEdit1[0]).toEqual(true);
      expect(scope.editPepText).toEqual("Hello World!!!");
      //scope.editPep();
      //expect(scope.emojiOpen).toEqual(false);

    });
});