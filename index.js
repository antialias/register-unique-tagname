var hash = require('string-hash');
function makeTagName(options) {
  options = Object.assign({}, {
      tagName: undefined,
      commitHash: undefined,
      relativeFilePath: undefined,
    },
    options
  );
  const unique = '' + options.commitHash + '-' + options.relativeFilePath;
  return `${options.tagName}-${hash(unique)}`;
};
function ensureCommitHashDefined() {
  if (typeof COMMITHASH === undefined || new String(COMMITHASH).length === 0 || COMMITHASH === undefined) {
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
  registerElement: function (tagName, constructor, relativeFilePath) {
    ensureCommitHashDefined();
    var globalTagName = makeTagName({tagName: tagName, relativeFilePath: relativeFilePath})
    constructor.tagName = globalTagName;
    return document.registerElement(globalTagName, constructor);
  },
  define: function (tagName, constructor, relativeFilePath) {
    ensureCommitHashDefined();
    var globalTagName = makeTagName({tagName: tagName, relativeFilePath: relativeFilePath})
    constructor.tagName = globalTagName;
    return customElements.define(globalTagName, constructor);
  },
};
