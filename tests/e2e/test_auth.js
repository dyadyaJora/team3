var nock = require('nock');
 
var couchdb = nock('http://localhost:3000/#/@fb852454324889707')
                .get('/user')
                .reply(200, {
                  _id: '123ABC',
                  _rev: '946B7D1C',
                  username: 'pgte',
                  email: 'pedro.teixeira@gmail.com'
                 });

describe('angularjs homepage title', function() {
  it('should greet the named user', function() {
    browser.get('http://localhost:3000/#/');

    expect(browser.getTitle()).toEqual('Pepo');
  });
  it('should test header title', function() {
    browser.get('http://localhost:3000/#/');
    expect(element(by.css('.header_logo-img')).getText()).toEqual('PEPO');
  });
  it('should test header title', function() {
    browser.get('http://localhost:3000/#/');
    expect(element(by.css('.pepo-title')).getText()).toEqual('Вас еще нет в Pepo?\nЗарегестрируйтесь что бы быть в курсе происходящего и в числе первых узнавать главные новости по интересующим вас темам.');
  });

});