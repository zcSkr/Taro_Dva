import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import dva from './utils/dva'
import models from './model'
import { Provider } from '@tarojs/redux'
import './app.global.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    // dispatch(action("sys/error", e));
    console.log(e)
  },
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/mine/cropper',
      'pages/mine/mine'
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
      backgroundColor: "#3f3f3f"
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#2A8CE5",
      backgroundColor: "#FBFBFB",
      borderStyle: "black",
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/images/index.png",
        selectedIconPath: "./assets/images/index_focus.png"
      }, {
        pagePath: "pages/mine/mine",
        text: "我的",
        iconPath: "./assets/images/index.png",
        selectedIconPath: "./assets/images/index_focus.png"
      }]
    }
  }

  componentDidMount() {
    console.log("程序启动");
    const updateManager = Taro.getUpdateManager();
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
