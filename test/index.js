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
describe('register-unique-tagname', function () {
  describe('registerElement', function () {
    it('should create a unique tagname', function () {
      rut.registerElement('my-tag', MyConstructor, 'abc-123');
      assert.equal(MyConstructor.tagName, 'my-tag-2694742392');
    });
  });
  describe('define', function () {
    it('should create a unique tagname', function () {
      rut.define('my-tag', MyConstructor, 'def-456');
      assert.equal(MyConstructor.tagName, 'my-tag-876700024');
    });
  });
});
