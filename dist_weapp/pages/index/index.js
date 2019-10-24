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

var _indexLessMap = require("./index.less.map.js");

var _indexLessMap2 = _interopRequireDefault(_indexLessMap);

var _config = require("../../config/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var img = "/assets/images/24213.jpg";

var Index = (_dec = (0, _index3.connect)(function (_ref) {
  var home = _ref.home,
      loading = _ref.loading;
  return {
    home: home,
    loading: loading.effects["home/query"],
    submiting: loading.effects["home/service"]
  };
}), _dec(_class = (_temp2 = _class2 = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "loopArray12", "$compid__37", "$compid__38", "$compid__39", "styles", "list", "app", "img", "richText", "dispatch", "home", "loading"], _this.config = {
      navigationBarTitleText: '首页',
      navigationBarTextStyle: "black",
      navigationBarBackgroundColor: "#fff",
      enablePullDownRefresh: false
    }, _this.customComponents = ["AtButton"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {
        richText: '<h3>这是富文本</h3>'
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('willMount');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('didMount');
      var dispatch = this.props.dispatch;

      dispatch({ type: 'home/query' });
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      console.log('didShow');
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      console.log('didHide');
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      // console.log(nextProps, nextState,'willUpdate')
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // console.log(prevProps, prevState, 'didUpdate')
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick() {
      // console.log('click')
      this.setState({ richText: this.state.richText + '1' });
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
      var $compid__37 = (0, _index.genCompid)(__prefix + "$compid__37");
      var $compid__38 = (0, _index.genCompid)(__prefix + "$compid__38");
      var $compid__39 = (0, _index.genCompid)(__prefix + "$compid__39");

      // console.log(process.env.TARO_ENV)

      var _props = this.__props,
          _props$home$list = _props.home.list,
          list = _props$home$list === undefined ? [] : _props$home$list,
          loading = _props.loading;

      console.log(list);
      var richText = this.__state.richText;

      var anonymousState__temp = (0, _index.internal_inline_style)({ height: '480rpx' });
      var loopArray12 = list.map(function (item, _anonIdx) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp3 = (0, _index.internal_inline_style)({ width: '100%', height: '100%' });
        return {
          $loopState__temp3: $loopState__temp3,
          $original: item.$original
        };
      });
      _index.propsManager.set({
        "type": "primary"
      }, $compid__37);
      _index.propsManager.set({
        "type": "secondary"
      }, $compid__38);
      _index.propsManager.set({
        "loading": true,
        "type": "primary"
      }, $compid__39);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray12: loopArray12,
        $compid__37: $compid__37,
        $compid__38: $compid__38,
        $compid__39: $compid__39,
        styles: _indexLessMap2.default,
        list: list,
        app: _config2.default,
        img: img
      });
      return this.__state;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // console.log(nextProps, prevState)
      return null;
    }
  }]);

  return Index;
}(_index.Component), _class2.$$events = ["handleButtonClick"], _class2.$$componentPath = "pages/index/index", _temp2)) || _class);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));