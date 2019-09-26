import request from '@/utils/request'

export async function getGoodsList(params, data) {
  return request({ url: '/goodsApi/findListApp', params, data, methods: 'POST', })
}
export async function indexPage(params,data) {
  return request({ url: '/indexApi/getIndexPageData', params, data })
}