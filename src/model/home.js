import Taro from '@tarojs/taro'
import * as service_home from '@/services/home';
export default {
  namespace: 'home',
  state: {
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },
  },
  effects: {
    * query({ payload, onSuccess }, { select, call, put }) {
      Taro.showLoading({ title: '加载中...', mask: true });
      let { pagination: { current, pageSize } } = yield select(state => state.home);
      const response = yield call(service_home.indexPage, { pageNum: 1, pageSize: pageSize, ...payload });
      console.log(response)
      if (response) {
        yield put({
          type: 'save',
          payload: {
            list: response.data.banner,
            // pagination: {
            //   current: response.data.pageNum,
            //   pageSize: response.data.pageSize,
            //   total: response.data.total,
            // },
          },
        });
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
