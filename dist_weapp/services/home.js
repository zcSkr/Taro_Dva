'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  getGoodsList: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var params = _ref.params,
          data = _ref.data,
          success = _ref.success,
          complete = _ref.complete;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', (0, _request2.default)({ url: '/goodsApi/findListApp', params: params, data: data, methods: 'POST', success: success, complete: complete }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getGoodsList(_x) {
      return _ref2.apply(this, arguments);
    }

    return getGoodsList;
  }(),
  indexPage: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
      var params = _ref3.params,
          data = _ref3.data,
          success = _ref3.success,
          complete = _ref3.complete;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', (0, _request2.default)({ url: '/indexApi/getIndexPageData', params: params, data: data, success: success, complete: complete }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function indexPage(_x2) {
      return _ref4.apply(this, arguments);
    }

    return indexPage;
  }()
};