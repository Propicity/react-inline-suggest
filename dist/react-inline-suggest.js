(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["react-inline-suggest"] = factory(require("React"));
	else
		root["react-inline-suggest"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InlineSuggest_1 = __webpack_require__(2);
exports.InlineSuggest = InlineSuggest_1.InlineSuggest;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(3);
var KeyEnum_1 = __webpack_require__(4);
var omit_1 = __webpack_require__(5);
var propsToOmit = [
    'haystack',
    'getFn',
    'onMatch',
    'ignoreCase',
    'className',
    'shouldRenderSuggestion',
    'switchBetweenSuggestions'
];
var InlineSuggest = (function (_super) {
    __extends(InlineSuggest, _super);
    function InlineSuggest(props) {
        var _this = _super.call(this, props) || this;
        _this.fireOnChange = function (e) {
            if (_this.props.onChange) {
                _this.props.onChange(e);
            }
        };
        _this.handleOnChange = function (e) {
            var currentTarget = e.currentTarget;
            var value = currentTarget.value;
            _this.proposeOption(value);
            _this.fireOnChange(e);
        };
        _this.handleOnBlur = function (e) {
            _this.setState({
                needle: ''
            });
            if (_this.props.onBlur) {
                _this.props.onBlur(e);
            }
        };
        _this.handleOnKeyDown = function (e) {
            var keyCode = e.keyCode;
            var needle = _this.state.needle;
            var switchBetweenSuggestions = _this.props.switchBetweenSuggestions;
            if (needle !== '' &&
                (keyCode === KeyEnum_1.KeyEnum.TAB || keyCode === KeyEnum_1.KeyEnum.ENTER)) {
                e.preventDefault();
            }
            var _a = _this.state, activeIndex = _a.activeIndex, matchedArray = _a.matchedArray;
            if (switchBetweenSuggestions && keyCode === KeyEnum_1.KeyEnum.UP_ARROW) {
                e.preventDefault();
                _this.setNewActiveIndex(activeIndex + 1 > matchedArray.length - 1 ? 0 : activeIndex + 1);
            }
            if (switchBetweenSuggestions && keyCode === KeyEnum_1.KeyEnum.DOWN_ARROW) {
                e.preventDefault();
                _this.setNewActiveIndex(activeIndex - 1 < 0 ? matchedArray.length - 1 : activeIndex - 1);
            }
        };
        _this.handleOnKeyUp = function (e) {
            var keyCode = e.keyCode;
            var needle = _this.state.needle;
            if (needle !== '' &&
                (keyCode === KeyEnum_1.KeyEnum.TAB ||
                    keyCode === KeyEnum_1.KeyEnum.ENTER ||
                    keyCode === KeyEnum_1.KeyEnum.RIGHT_ARROW)) {
                var newValue = "" + _this.props.value + _this.state.needle;
                var newEvent = __assign({}, e, { currentTarget: __assign({}, e.currentTarget, { value: newValue }) });
                _this.setState({
                    needle: ''
                });
                _this.fireOnChange(newEvent);
                if (_this.props.onMatch) {
                    _this.props.onMatch(_this.state.matchedArray[_this.state.activeIndex]);
                }
            }
        };
        _this.setNewActiveIndex = function (index) {
            var matchedArray = _this.state.matchedArray;
            var _a = _this.props, getFn = _a.getFn, value = _a.value;
            var matchedStr = getFn === undefined ? matchedArray[index] : getFn(matchedArray[index]);
            var originalValue = matchedStr.substr(0, value.length);
            var needle = matchedStr.replace(originalValue, '');
            _this.setState({
                activeIndex: index,
                needle: needle
            });
        };
        _this.state = {
            needle: '',
            matchedArray: [],
            activeIndex: 0
        };
        return _this;
    }
    InlineSuggest.prototype.render = function () {
        return (React.createElement("div", { className: "inline-suggest " + this.props.className },
            React.createElement("input", __assign({}, omit_1.omit(this.props, propsToOmit), { style: { background: 'transparent' }, value: this.props.value, onChange: this.handleOnChange, onBlur: this.handleOnBlur, onKeyDown: this.handleOnKeyDown, onKeyUp: this.handleOnKeyUp })),
            this.renderSuggestion()));
    };
    InlineSuggest.prototype.renderSuggestion = function () {
        var _a = this.props, shouldRenderSuggestion = _a.shouldRenderSuggestion, value = _a.value;
        if (shouldRenderSuggestion !== undefined &&
            !shouldRenderSuggestion(value)) {
            return null;
        }
        return (React.createElement("div", null, "" + this.props.value + this.state.needle));
    };
    InlineSuggest.prototype.proposeOption = function (value) {
        var _a = this.props, getFn = _a.getFn, haystack = _a.haystack, ignoreCase = _a.ignoreCase;
        if (value.length === 0) {
            this.setState({
                needle: ''
            });
            return false;
        }
        var rx = RegExp("^" + value, ignoreCase ? 'i' : undefined);
        var matchedArray = haystack.filter(function (v) { return (getFn === undefined ? rx.test(v) : rx.test(getFn(v))); });
        if (matchedArray.length > 0) {
            var matchedStr = getFn === undefined ? matchedArray[0] : getFn(matchedArray[0]);
            var originalValue = matchedStr.substr(0, value.length);
            var needle = matchedStr.replace(originalValue, '');
            this.setState({
                matchedArray: matchedArray,
                needle: needle,
                activeIndex: 0
            });
            if (needle === '' && this.props.onMatch) {
                this.props.onMatch(matchedArray[0]);
            }
        }
        else {
            this.setState({
                needle: '',
                activeIndex: 0,
                matchedArray: []
            });
        }
    };
    InlineSuggest.defaultProps = {
        ignoreCase: true,
        switchBetweenSuggestions: false,
        value: '',
        haystack: []
    };
    return InlineSuggest;
}(React.Component));
exports.InlineSuggest = InlineSuggest;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyEnum;
(function (KeyEnum) {
    KeyEnum[KeyEnum["TAB"] = 9] = "TAB";
    KeyEnum[KeyEnum["ENTER"] = 13] = "ENTER";
    KeyEnum[KeyEnum["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyEnum[KeyEnum["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    KeyEnum[KeyEnum["UP_ARROW"] = 38] = "UP_ARROW";
})(KeyEnum = exports.KeyEnum || (exports.KeyEnum = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function omit(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) {
            continue;
        }
        if (!obj.hasOwnProperty(i)) {
            continue;
        }
        target[i] = obj[i];
    }
    return target;
}
exports.omit = omit;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-inline-suggest.js.map