var rut = require('..');
var global = require('global');
var assert = require('assert');
global.document = {
  registerElement: function () {}
};
global.customElements = {
  define: function () {}
};
function MyConstructor() {};
describe('buildMakeTagName', function () {
  it('sets the commit hash', function () {
    var buildMakeTagName1 = rut.buildMakeTagName({commitHash: 'abc123'});
    var buildMakeTagName2 = rut.buildMakeTagName({commitHash: 'def456'});
    assert.notEqual(
      buildMakeTagName1({tagName: 'my-tag-name'}),
      buildMakeTagName2({tagName: 'my-tag-name'})
    );
  });
});
describe('register-unique-tagname', function () {
  beforeEach(function () {
    global.COMMITHASH = 'abc123';
  });
  afterEach(function () {
    delete global.COMMITHASH;
  });
  describe('registerElement', function () {
    it('should create a unique tagname', function () {
      rut.registerElement('my-tag', MyConstructor, 'abc-123');
      assert.equal(MyConstructor.tagName, 'my-tag-798404335');
    });
    it('should throw if COMMITHASH is not set', function () {
      delete global.COMMITHASH;
      assert.throws(function () {
        rut.registerElement('my-tag', MyConstructor, 'abc-123');
      });
    });
  });
  describe('define', function () {
    it('should create a unique tagname', function () {
      rut.define('my-tag', MyConstructor, 'def-456');
      assert.equal(MyConstructor.tagName, 'my-tag-1414631151');
    });
    it('should throw if COMMITHASH is not set', function () {
      delete global.COMMITHASH;
      assert.throws(function () {
        rut.define('my-tag', MyConstructor, 'abc-123');
      });
    });
    it('should throw if COMMITHASH is undefined', function () {
      global.COMMITHASH = undefined;
      assert.throws(function () {
        rut.define('my-tag', MyConstructor, 'abc-123');
      });
    });
  });
});
