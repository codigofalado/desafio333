"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapWithVariants;

var _postcss = _interopRequireDefault(require("postcss"));

var _cloneNodes = _interopRequireDefault(require("./cloneNodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapWithVariants(rules, variants) {
  return _postcss.default.atRule({
    name: 'variants',
    params: variants.join(', ')
  }).append((0, _cloneNodes.default)(Array.isArray(rules) ? rules : [rules]));
}