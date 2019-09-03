import request from '@/utils/request'

export default {
  async getGoodsList({ params, data, success, complete }) {
    return request({ url: '/goodsApi/findListApp', params, data, methods: 'POST', success, complete })
  },
  async indexPage({ params, data, success, complete }) {
    return request({ url: '/indexApi/getIndexPageData', params, data, success, complete })
  }
}