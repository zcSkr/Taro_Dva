"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../npm/dva-core/dist/index.js");

var _index2 = require("../npm/dva-loading/dist/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = void 0;
// import {createLogger} from 'redux-logger';

var store = void 0;
var dispatch = void 0;

function createApp(opt) {
  // redux日志
  // opt.onAction = [createLogger()];
  app = (0, _index.create)(opt);
  app.use((0, _index3.default)({}));

  if (!global.registered) opt.models.forEach(function (model) {
    return app.model(model);
  });
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = function () {
    return store;
  };

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

exports.default = {
  createApp: createApp,
  getDispatch: function getDispatch() {
    return app.dispatch;
  }
};