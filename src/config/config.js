import Taro from '@tarojs/taro';
const requestUrl = 'http://192.168.2.86:8088' //https://wap.scttlg.com  http://47.107.65.90:8080  192.168.2.168:9001
const projectName = 'steak'

module.exports = {
  rootUrl: requestUrl + '/' + projectName,
  fileUrl: requestUrl + '/' + projectName + '/',
  uploadUrl: requestUrl + '/' + projectName + '/file/uploadFile',
  getToken: function () {
    try {
      return Taro.getStorageSync('token')
    } catch (e) { }
    return null;
  },
  setToken: function (token) {
    try {
      return Taro.setStorageSync('token', token)
    } catch (e) { }
    return null;
  },
  getUnionuser: function () {
    try {
      return Taro.getStorageSync('unionuser')
    } catch (e) { }
    return null;
  },
  setUnionuser: function (unionuser) {
    try {
      return Taro.setStorageSync('unionuser', unionuser)
    } catch (e) { }
    return null;
  }
}
