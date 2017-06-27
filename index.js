var hash = require('string-hash');
function makeTagName(tagPrefix, unique) {
  return `${tagPrefix}-${hash(unique)}`;
};
module.exports = {
  makeTagName: makeTagName,
  registerElement: function (tagPrefix, constructor, unique) {
    var tagName = makeTagName(tagPrefix, unique)
    constructor.tagName = tagName;
    return document.registerElement(tagName, constructor);
  },
  define: function (tagPrefix, constructor, unique) {
    var tagName = makeTagName(tagPrefix, unique)
    constructor.tagName = tagName;
    return customElements.define(tagName, constructor);
  } 
};
