define('ace/theme/vg', ['require', 'exports', 'module', 'ace/lib/dom'], function (
  require,
  exports,
  module,
) {
  exports.isDark = true;
  exports.cssClass = 'ace-vg';
  exports.cssText = `/*@see ace.scss*/`;

  var dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
(function () {
  window.require(['ace/theme/vg'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
