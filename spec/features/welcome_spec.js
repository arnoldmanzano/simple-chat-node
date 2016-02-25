var chai = require('chai');
var expect = chai.expect;

describe('Welcome page', function() {
  it('displays a welcome message', function(done){
    browser
      .url('/')
      .getText('body', function(err, text) {
        expect(text).to.include('Welcome to SimpleChat');
      })
      .call(done);

  });
});