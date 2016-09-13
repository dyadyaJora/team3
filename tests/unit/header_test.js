describe("Unit: Testing Directives Header", function() {

  var $compile, $rootScope;
  beforeEach(function(){
   angular.module('pepo.config',[])
   .constant('CONFIG', {"facebook":{"clientID":"601376040048633"},"vkontakte":{"clientID":"5589421"}});
  });
  beforeEach(module('pepo'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it("should display 'Pepo' in title", function() {
    var element = $compile('<pepo-header></pepo-header>')($rootScope);
    console.log(element.html());
    expect(element.html()).toMatch(/Pepo/i);
  });
});