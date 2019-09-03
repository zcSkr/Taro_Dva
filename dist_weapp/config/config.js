'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestUrl = 'https://wap.scttlg.com'; //https://wap.scttlg.com  http://47.107.65.90:8080  192.168.2.168:9001
var projectName = 'supermarket';

exports.default = {
  rootUrl: "https://wap.scttlg.com/supermarket",
  fileUrl: "https://wap.scttlg.com/supermarket/",
  uploadUrl: "https://wap.scttlg.com/supermarket/sys/file/uploadFile", // /app/commonApi/updateFile.app
  getToken: function getToken() {
    try {
      return _index2.default.getStorageSync('token');
    } catch (e) {}
    return null;
  },
  setToken: function setToken(token) {
    try {
      return _index2.default.setStorageSync('token', token);
    } catch (e) {}
    return null;
  },
  getUnionuser: function getUnionuser() {
    try {
      return _index2.default.getStorageSync('unionuser');
    } catch (e) {}
    return null;
  },
  setUnionuser: function setUnionuser(unionuser) {
    try {
      return _index2.default.setStorageSync('unionuser', unionuser);
    } catch (e) {}
    return null;
  }
};