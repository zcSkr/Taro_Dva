"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './index.less'

var Mine = (_dec = (0, _index3.connect)(function (_ref) {
  var mine = _ref.mine,
      loading = _ref.loading;
  return {
    mine: mine,
    loading: loading.effects["mine/load"]
  };
}), _dec(_class = (_temp2 = _class2 = function (_BaseComponent) {
  _inherits(Mine, _BaseComponent);

  function Mine() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Mine);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["mine", "loading"], _this.config = {
      navigationBarTitleText: '个人中心',
      navigationBarTextStyle: "black",
      navigationBarBackgroundColor: "#fff",
      enablePullDownRefresh: false
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mine, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Mine.prototype.__proto__ || Object.getPrototypeOf(Mine.prototype), "_constructor", this).call(this, props);
      this.state = {};
      this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // console.log(this)
    }
  }, {
    key: "onPullDownRefresh",
    value: function onPullDownRefresh() {
      console.log('onPullDownRefresh');
    }
  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      console.log('onReachBottom');
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _props = this.__props,
          _props$mine$list = _props.mine.list,
          list = _props$mine$list === undefined ? [] : _props$mine$list,
          loading = _props.loading;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Mine;
}(_index.Component), _class2.$$events = [], _class2.$$componentPath = "pages/mine/mine", _temp2)) || _class);
exports.default = Mine;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Mine, true));