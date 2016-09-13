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