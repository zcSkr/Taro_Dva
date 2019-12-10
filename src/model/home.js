import Taro from '@tarojs/taro'
import * as service_home from '@/services/home';
export default {
  namespace: 'home',
  state: {
    carList: [],
    goodsList: [],
    shopBannerList: [],
    shopGoodsTypeList: [],
    shopInfo: {},
  },
  effects: {
    *query({ payload, onSuccess }, { select, call, put }) {
      yield Taro.showLoading({ title: '加载中...', mask: true });
      const response = yield call(service_home.queryHome, {}, { ...payload });
      console.log(response)
      if (response) {
        yield put({
          type: 'save',
          payload: {
            carList: response.data.carList,
            goodsList: response.data.goodsList,
            shopBannerList: response.data.shopBannerList,
            shopGoodsTypeList: response.data.shopGoodsTypeList,
            shopInfo: response.data.shopVO,
          },
        });
        if (onSuccess) onSuccess(response)
        yield Taro.setStorageSync('shopInfo', response.data.shopVO)
        yield Taro.hideLoading();
      }
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_home[service], params, data);
      if (response) {
        if (onSuccess) yield onSuccess(response);
      }
      if (onComplete) yield onComplete();
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
};
