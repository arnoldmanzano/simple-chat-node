var chai = require('chai');
var expect = chai.expect;

var WebdriverIO = require('webdriverio');
var matrix = WebdriverIO.multiremote({
  browserA: { desiredCapabilities: { browserName: 'chrome' } },
  browserB: { desiredCapabilities: { browserName: 'chrome' } }
});

var browserA = matrix.select('browserA');
var browserB = matrix.select('browserB');

describe('Chatting', function() {

  it('should post something in browserA and read in browserB', function(done) {
    browserA
      .init().url('http://localhost:3000')
      .pause(100)
      .setValue('#m', 'My name is Arnold').keys('Enter');

      browserB
        .init().url('http://localhost:3000')
        .pause(100)
        .waitForExist('.ind_msg', 5000)
        .getText('body', function(err, text) {
          expect(text).to.include('My name is Hello');
        });

      matrix.sync().call(done).end();
  });
});
