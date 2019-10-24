"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = request;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _config = require("../config/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// url转码
function urlEncode(params, key, encode) {
  if (params == null) return '';
  var paramsStr = '';
  var t = typeof params === "undefined" ? "undefined" : _typeof(params);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramsStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(params) : params);
  } else {
    for (var i in params) {
      var k = key == null ? i : key + (params instanceof Array ? '[' + i + ']' : '.' + i);
      paramsStr += urlEncode(params[i], k, encode);
    }
  }
  return paramsStr;
}

// 拦截器
var interceptor = function interceptor(chain) {
  var requestParams = chain.requestParams;
  var method = requestParams.method,
      data = requestParams.data,
      url = requestParams.url;

  console.log("http " + (method || 'GET') + " --> " + url + " data: ", data);
  return chain.proceed(requestParams).then(function (res) {
    console.log("http <-- " + url + " result:", res);
    return res;
  });
};

// Taro.addInterceptor(interceptor) //自定义拦截器
// Taro.addInterceptor(Taro.interceptors.logInterceptor) //内置打印请求的相关信息
_index2.default.addInterceptor(_index2.default.interceptors.timeoutInterceptor); //内置请求超时时抛出错误。

function request(_ref) {
  var url = _ref.url,
      params = _ref.params,
      data = _ref.data,
      method = _ref.method,
      success = _ref.success,
      complete = _ref.complete;


  if (url.substr(0, 4) != 'http') url = _config.rootUrl + url;
  url = url + '?' + urlEncode(params).slice(1);

  console.log(url, data);

  return _index2.default.request({
    url: url,
    data: data,
    method: method ? method.toUpperCase() : 'GET',
    header: {
      'Content-Type': 'application/json',
      'token': (0, _config.getToken)() || ''
    }
  }).then(function (result) {
    // console.log(result)
    if (result.statusCode == 401) {
      _index2.default.clearStorageSync();
      _index2.default.hideLoading();
      _index2.default.hideToast();
      // Taro.navigateTo({ url: '/pages/sys/authorization' })
      _index2.default.showModal({
        title: '注意',
        content: '您的账号已在其他设备登录/已被冻结！',
        showCancel: false,
        success: function success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // Taro.reLaunch({ url: '/pages/index?back=1' })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    } else if (result.statusCode == 200) {
      return result.data;
    } else {
      _index2.default.showModal({
        content: data.errmsg,
        showCancel: false,
        confirmText: '知道了'
      });
    }
  });
};