"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _home = require("../services/home.js");

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'home',
  state: {
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  },
  effects: {
    query: /*#__PURE__*/regeneratorRuntime.mark(function query(_ref, _ref2) {
      var payload = _ref.payload,
          onSuccess = _ref.onSuccess;
      var select = _ref2.select,
          call = _ref2.call,
          put = _ref2.put;

      var _ref3, _ref3$pagination, current, pageSize, response;

      return regeneratorRuntime.wrap(function query$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _index2.default.showLoading({ title: '加载中...', mask: true });
              _context.next = 3;
              return select(function (state) {
                return state.home;
              });

            case 3:
              _ref3 = _context.sent;
              _ref3$pagination = _ref3.pagination;
              current = _ref3$pagination.current;
              pageSize = _ref3$pagination.pageSize;
              _context.next = 9;
              return call(_home2.default.indexPage, _extends({ pageNum: 1, pageSize: pageSize }, payload));

            case 9:
              response = _context.sent;

              console.log(response);

              if (!response) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return put({
                type: 'save',
                payload: {
                  list: response.data.banner
                  // pagination: {
                  //   current: response.data.pageNum,
                  //   pageSize: response.data.pageSize,
                  //   total: response.data.total,
                  // },
                }
              });

            case 14:
              _context.next = 16;
              return _index2.default.hideLoading();

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, query, this);
    }),
    service: /*#__PURE__*/regeneratorRuntime.mark(function service(_ref4, _ref5) {
      var payload = _ref4.payload,
          onSuccess = _ref4.onSuccess,
          onComplete = _ref4.onComplete;
      var select = _ref5.select,
          call = _ref5.call,
          put = _ref5.put;
      var service, params, data, response;
      return regeneratorRuntime.wrap(function service$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              service = payload.service, params = payload.params, data = payload.data;
              _context2.next = 3;
              return call(_home2.default[service], params, data);

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
    save: function save(state, _ref6) {
      var payload = _ref6.payload;

      return _extends({}, state, payload);
    }
  }
};