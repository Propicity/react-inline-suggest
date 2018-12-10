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
var React = require("react");
var KeyEnum_1 = require("./KeyEnum");
var omit_1 = require("./util/omit");
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
//# sourceMappingURL=InlineSuggest.js.map