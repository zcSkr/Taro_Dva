import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import './index.less'

@connect(({ mine, loading }) => ({
  mine,
  loading: loading.effects["mine/load"],
}))
export default class Mine extends Component {
  config = {
    navigationBarTitleText: '个人中心',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  };
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
  };

  onReachBottom() {
    console.log('onReachBottom')
  };
  handleCropper = () => {
    let src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571905395386&di=174289b59745239d4048d9118eab6989&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F6b0018f329217b50b48d9478776a24c9825cbef7cd86-IrED2R_fw658'
    this.$preload('src', src)
    Taro.navigateTo({
      url: '/pages/mine/cropper',
    })
  }

  render() {
    const { mine: { list = [] }, loading } = this.props;
    return (
      <View>
        个人中心
        <Button onClick={this.handleCropper}>点击去裁剪头像</Button>
      </View>
    )
  }
}

