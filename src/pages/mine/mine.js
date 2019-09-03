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
    // console.log(this)
  };
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
  };

  onReachBottom() {
    console.log('onReachBottom')
  };

  render() {
    const { mine: { list = [] }, loading } = this.props;
    return (
      <View>
        个人中心
      </View>
    )
  }
}

