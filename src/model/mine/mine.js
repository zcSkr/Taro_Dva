import Taro from '@tarojs/taro'

export default {
  namespace: 'mine',
  state: {
    list: []
  },
  effects: {
    * search(_, { all, call, put }) {
      Taro.showLoading({
        title: '搜索中...',
      });
      try {
        let loadPro = yield put(action("load"));
        yield call(() => loadPro);
      } finally {
        Taro.hideLoading();
      }
    },
    * load({ payload }, { all, call, put }) {
      let { data } = yield call(request, {
        url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", { list: data }))
    },
    * loadMore({ payload }, { all, call, put }) {
      let { data } = yield call(request, {
        url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
};
