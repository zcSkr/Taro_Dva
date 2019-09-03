import Taro from '@tarojs/taro';
const requestUrl = 'https://wap.scttlg.com' //https://wap.scttlg.com  http://47.107.65.90:8080  192.168.2.168:9001
const projectName = 'supermarket'

export default {
  rootUrl: requestUrl + '/' + projectName,
  fileUrl: 'https://wap.scttlg.com' + '/' + projectName + '/',
  uploadUrl: 'https://wap.scttlg.com' + '/' + projectName + '/sys/file/uploadFile',  // /app/commonApi/updateFile.app
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
