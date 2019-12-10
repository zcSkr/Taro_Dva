import request from '@/utils/request'

export async function login(params, data) {
  return request({ url: '/userApi/login', params, data, method: 'POST' })
}
// 获取手机号
export async function getPhoneNumber(params,) {
  return request({ url: '/weiXinApi/getWechatPhone', params })
}
//意见反馈
export async function feedback(params, data) {
  return request({ url: '/auth/feedbackApi/saveFeedback', params, data, method: 'POST' })
}
