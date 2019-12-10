import request from '@/utils/request'

export async function queryHome(params, data) {
  return request({ url: '/homeApi/findHome', params, data, method: 'POST', })
}

// 查询商铺
export async function queryShop(params) {
  return request({ url: '/shopApi/findNearbyShopList', params })
}
