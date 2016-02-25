var chai = require('chai');
var expect = chai.expect;
var WebdriverIO = require('webdriverio');


describe('Welcome page', function() {
  // WebdriverIO.timeout = 99999999;

  it('displays a welcome message', function(done){
    browser
      .pause(100)
      .url('/')
      .getText('body', function(err, text) {
        expect(text).to.include('Welcome to SimpleChat');
      })
      .call(done);
  });
});
