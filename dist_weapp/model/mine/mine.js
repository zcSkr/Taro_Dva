"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _mine = require("../../services/mine.js");

var service_mine = _interopRequireWildcard(_mine);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'mine',
  state: {
    list: []
  },
  effects: {
    login: /*#__PURE__*/regeneratorRuntime.mark(function login(_ref, _ref2) {
      var payload = _ref.payload,
          onSuccess = _ref.onSuccess,
          onComplete = _ref.onComplete;
      var select = _ref2.select,
          call = _ref2.call,
          put = _ref2.put;
      var response;
      return regeneratorRuntime.wrap(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(service_mine.login, {}, _extends({}, payload));

            case 2:
              response = _context.sent;

              if (!response) {
                _context.next = 7;
                break;
              }

              if (!onSuccess) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return onSuccess(response);

            case 7:
              if (!onComplete) {
                _context.next = 10;
                break;
              }

              _context.next = 10;
              return onComplete();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, login, this);
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
              return call(service_mine[service], params, data);

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