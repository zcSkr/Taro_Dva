import Taro from '@tarojs/taro'
import * as service_home from '@/services/home';
export default {
  namespace: 'shop',
  state: {
    list: [],
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }
  },
  effects: {
    *query({ payload, onSuccess }, { select, call, put }) {
      yield Taro.showLoading({ title: '加载中...', mask: true });
      let { pagination, list, lon, lat } = yield select(state => state.shop);
      let { pageNum, pageSize } = pagination;
      const response = yield call(service_home.queryShop, { pageNum, pageSize, lon, lat, ...payload });
      console.log(response)
      if (response) {
        yield put({
          type: 'save',
          payload: {
            list: payload.pageNum > 1 ? list.concat(response.data.list) : response.data.list,
            pagination: {
              pageNum: response.data.pageNum,
              pageSize: response.data.pageSize,
              total: response.data.total,
            },
            lon: payload.lon || lon,
            lat: payload.lat || lat
          },
        });
        if (onSuccess) onSuccess(response)
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
