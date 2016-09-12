var nock = require('nock');
 
var couchdb = nock('http://localhost:3000/#/users')
                .get('/user')
                .reply(200, {
                  _id: '123ABC',
                  _rev: '946B7D1C',
                  username: 'pgte',
                  email: 'pedro.teixeira@gmail.com'
                 });

describe('angularjs homepage title', function() {

  beforeEach(function(){
    browser.get('http://localhost:3000/#/');   
  });

  it('should greet the named user', function() {
    expect(element(by.css('.header_logo-img')).getText()).toEqual('PEPO');
    expect(browser.getTitle()).toEqual('Pepo');
  });

  it('should test header title', function() {
    element(by.css('.pepo_btn__facebook')).click();
    expect(element(by.css('.pepo-title')).getText()).toEqual('Вас еще нет в Pepo?\nЗарегестрируйтесь что бы быть в курсе происходящего и в числе первых узнавать главные новости по интересующим вас темам.');
  });
});

describe('angularjs homepage title', function() {

  beforeEach(function(){
    browser.get('http://localhost:3000/#/');   
  });

  it('should greet the named user', function() {
    expect(element(by.css('.header_logo-img')).getText()).toEqual('PEPO');
    expect(browser.getTitle()).toEqual('Pepo');
  });
});


/*
describe('Protractor Demo App', function() {
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
        toEqual('3');
  });
}); */