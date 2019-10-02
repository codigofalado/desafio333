"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssSelectorParser = _interopRequireDefault(require("postcss-selector-parser"));

var _generateVariantFunction = _interopRequireDefault(require("../util/generateVariantFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generatePseudoClassVariant(pseudoClass, selectorPrefix = pseudoClass) {
  return (0, _generateVariantFunction.default)(({
    modifySelectors,
    separator
  }) => {
    return modifySelectors(({
      selector
    }) => {
      return (0, _postcssSelectorParser.default)(selectors => {
        selectors.walkClasses(sel => {
          sel.value = `${selectorPrefix}${separator}${sel.value}`;
          sel.parent.insertAfter(sel, _postcssSelectorParser.default.pseudo({
            value: `:${pseudoClass}`
          }));
        });
      }).processSync(selector);
    });
  });
}

function ensureIncludesDefault(variants) {
  return variants.includes('default') ? variants : ['default', ...variants];
}

const defaultVariantGenerators = {
  default: (0, _generateVariantFunction.default)(() => {}),
  'group-hover': (0, _generateVariantFunction.default)(({
    modifySelectors,
    separator
  }) => {
    return modifySelectors(({
      selector
    }) => {
      return (0, _postcssSelectorParser.default)(selectors => {
        selectors.walkClasses(sel => {
          sel.value = `group-hover${separator}${sel.value}`;
          sel.parent.insertBefore(sel, (0, _postcssSelectorParser.default)().astSync('.group:hover '));
        });
      }).processSync(selector);
    });
  }),
  hover: generatePseudoClassVariant('hover'),
  'focus-within': generatePseudoClassVariant('focus-within'),
  focus: generatePseudoClassVariant('focus'),
  active: generatePseudoClassVariant('active'),
  visited: generatePseudoClassVariant('visited'),
  disabled: generatePseudoClassVariant('disabled'),
  first: generatePseudoClassVariant('first-child', 'first'),
  last: generatePseudoClassVariant('last-child', 'last'),
  odd: generatePseudoClassVariant('nth-child(odd)', 'odd'),
  even: generatePseudoClassVariant('nth-child(even)', 'even')
};

function _default(config, {
  variantGenerators: pluginVariantGenerators
}) {
  return function (css) {
    const variantGenerators = { ...defaultVariantGenerators,
      ...pluginVariantGenerators
    };
    css.walkAtRules('variants', atRule => {
      const variants = _postcss.default.list.comma(atRule.params).filter(variant => variant !== '');

      if (variants.includes('responsive')) {
        const responsiveParent = _postcss.default.atRule({
          name: 'responsive'
        });

        atRule.before(responsiveParent);
        responsiveParent.append(atRule);
      }

      _lodash.default.forEach(_lodash.default.without(ensureIncludesDefault(variants), 'responsive'), variant => {
        variantGenerators[variant](atRule, config);
      });

      atRule.remove();
    });
  };
}