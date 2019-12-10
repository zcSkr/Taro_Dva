"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _home = require("../services/home.js");

var service_home = _interopRequireWildcard(_home);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'home',
  state: {
    carList: [],
    goodsList: [],
    shopBannerList: [],
    shopGoodsTypeList: [],
    shopInfo: {}
  },
  effects: {
    query: /*#__PURE__*/regeneratorRuntime.mark(function query(_ref, _ref2) {
      var payload = _ref.payload,
          onSuccess = _ref.onSuccess;
      var select = _ref2.select,
          call = _ref2.call,
          put = _ref2.put;
      var response;
      return regeneratorRuntime.wrap(function query$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index2.default.showLoading({ title: '加载中...', mask: true });

            case 2:
              _context.next = 4;
              return call(service_home.queryHome, {}, _extends({}, payload));

            case 4:
              response = _context.sent;

              console.log(response);

              if (!response) {
                _context.next = 14;
                break;
              }

              _context.next = 9;
              return put({
                type: 'save',
                payload: {
                  carList: response.data.carList,
                  goodsList: response.data.goodsList,
                  shopBannerList: response.data.shopBannerList,
                  shopGoodsTypeList: response.data.shopGoodsTypeList,
                  shopInfo: response.data.shopVO
                }
              });

            case 9:
              if (onSuccess) onSuccess(response);
              _context.next = 12;
              return _index2.default.setStorageSync('shopInfo', response.data.shopVO);

            case 12:
              _context.next = 14;
              return _index2.default.hideLoading();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, query, this);
    }),
    service: /*#__PURE__*/regeneratorRuntime.mark(function service(_ref3, _ref4) {
      var payload = _ref3.payload,
          onSuccess = _ref3.onSuccess,
          onComplete = _ref3.onComplete;
      var select = _ref4.select,
          call = _ref4.call,
          put = _ref4.put;
      var service, params, data, response;
      return regeneratorRuntime.wrap(function service$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              service = payload.service, params = payload.params, data = payload.data;
              _context2.next = 3;
              return call(service_home[service], params, data);

            case 3:
              response = _context2.sent;

              if (!response) {
                _context2.next = 8;
                break;
              }

              if (!onSuccess) {
                _context2.next = 8;
                break;
              }

              _context2.next = 8;
              return onSuccess(response);

            case 8:
              if (!onComplete) {
                _context2.next = 11;
                break;
              }

              _context2.next = 11;
              return onComplete();

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, service, this);
    })
  },
  reducers: {
    save: function save(state, _ref5) {
      var payload = _ref5.payload;

      return _extends({}, state, payload);
    }
  }
};