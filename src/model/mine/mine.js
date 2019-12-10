import Taro from '@tarojs/taro'
import * as service_mine from '@/services/mine';

export default {
  namespace: 'mine',
  state: {
    list: []
  },
  effects: {
    *login({ payload, onSuccess, onComplete }, { select, call, put }) {
      const response = yield call(service_mine.login, {}, { ...payload });
      if (response) {
        if (onSuccess) yield onSuccess(response);
      }
      if (onComplete) yield onComplete();
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_mine[service], params, data);
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
