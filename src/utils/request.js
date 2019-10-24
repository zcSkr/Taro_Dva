import Taro from '@tarojs/taro';
import { rootUrl, getToken } from '@/config/config';

// url转码
function urlEncode(params, key, encode) {
  if (params == null) return ''
  var paramsStr = ''
  var t = typeof (params)
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramsStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(params) : params)
  } else {
    for (var i in params) {
      var k = key == null ? i : key + (params instanceof Array ? '[' + i + ']' : '.' + i)
      paramsStr += urlEncode(params[i], k, encode)
    }
  }
  return paramsStr
}

// 拦截器
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      return res
    })
}

// Taro.addInterceptor(interceptor) //自定义拦截器
// Taro.addInterceptor(Taro.interceptors.logInterceptor) //内置打印请求的相关信息
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor) //内置请求超时时抛出错误。

export default function request({ url, params, data, method, success, complete }) {

  if (url.substr(0, 4) != 'http')
    url = rootUrl + url
  url = url + '?' + urlEncode(params).slice(1)

  console.log(url, data)
  
  return Taro.request({
    url,
    data,
    method: method ? method.toUpperCase() : 'GET',
    header: {
      'Content-Type': 'application/json',
      'token': getToken() || '',
    },
  }).then(result => {
    // console.log(result)
    if (result.statusCode == 401) {
      Taro.clearStorageSync();
      Taro.hideLoading()
      Taro.hideToast()
      // Taro.navigateTo({ url: '/pages/sys/authorization' })
      Taro.showModal({
        title: '注意',
        content: '您的账号已在其他设备登录/已被冻结！',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
            // Taro.reLaunch({ url: '/pages/index?back=1' })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (result.statusCode == 200) {
      return result.data
    } else {
      Taro.showModal({
        content: data.errmsg,
        showCancel: false,
        confirmText: '知道了'
      })
    }
  });
};
