var hash = require('string-hash');
function makeTagName(options) {
  options = Object.assign({}, {
      tagName: undefined,
      commitHash: undefined,
      absolutePath: undefined,
      relativePath: undefined,
    },
    options
  );
  const path = options.absolutePath || options.relativePath;
  const unique = '' + options.commitHash + '-' + path;
  return `${options.tagName}-${hash(unique)}`;
};
function ensureCommitHashDefined() {
  if (typeof COMMITHASH === "undefined" || new String(COMMITHASH).length === 0 || COMMITHASH === undefined) {
    throw new Error('register-unique-tagname expects COMMITHASH to be defined as the hash for HEAD of your current repository. git-revision-webpack-plugin works well for this if webpack and git are used for this project.');
  }
};
module.exports = {
  buildMakeTagName: function (options) {
    return function (_options) {
      return makeTagName(Object.assign({}, _options, options));
    };
  },
  makeTagName: makeTagName,
  registerElement: function (tagName, constructor, filePath) {
    ensureCommitHashDefined();
    var globalTagName = makeTagName({tagName: tagName, absolutePath: filePath})
    constructor.tagName = globalTagName;
    return document.registerElement(globalTagName, constructor);
  },
  define: function (tagName, constructor, filePath) {
    ensureCommitHashDefined();
    var globalTagName = makeTagName({tagName: tagName, absolutePath: filePath})
    constructor.tagName = globalTagName;
    return customElements.define(globalTagName, constructor);
  },
};
