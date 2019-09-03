'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('../../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'mine',
  state: {
    list: []
  },
  effects: {
    search: /*#__PURE__*/regeneratorRuntime.mark(function search(_, _ref) {
      var all = _ref.all,
          call = _ref.call,
          put = _ref.put;
      var loadPro;
      return regeneratorRuntime.wrap(function search$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _index2.default.showLoading({
                title: '搜索中...'
              });
              _context.prev = 1;
              _context.next = 4;
              return put(action("load"));

            case 4:
              loadPro = _context.sent;
              _context.next = 7;
              return call(function () {
                return loadPro;
              });

            case 7:
              _context.prev = 7;

              _index2.default.hideLoading();
              return _context.finish(7);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, search, this, [[1,, 7, 10]]);
    }),
    load: /*#__PURE__*/regeneratorRuntime.mark(function load(_ref2, _ref3) {
      var payload = _ref2.payload;
      var all = _ref3.all,
          call = _ref3.call,
          put = _ref3.put;

      var _ref4, data;

      return regeneratorRuntime.wrap(function load$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(request, {
                url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
              });

            case 2:
              _ref4 = _context2.sent;
              data = _ref4.data;
              _context2.next = 6;
              return call(delay, 2000);

            case 6:
              _context2.next = 8;
              return put(action("save", { list: data }));

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, load, this);
    }),
    loadMore: /*#__PURE__*/regeneratorRuntime.mark(function loadMore(_ref5, _ref6) {
      var payload = _ref5.payload;
      var all = _ref6.all,
          call = _ref6.call,
          put = _ref6.put;

      var _ref7, data;

      return regeneratorRuntime.wrap(function loadMore$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(request, {
                url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
              });

            case 2:
              _ref7 = _context3.sent;
              data = _ref7.data;
              _context3.next = 6;
              return call(delay, 2000);

            case 6:
              _context3.next = 8;
              return put(action("saveMore", data));

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, loadMore, this);
    })
  },
  reducers: {
    save: function save(state, _ref8) {
      var payload = _ref8.payload;

      return _extends({}, state, payload);
    }
  }
};