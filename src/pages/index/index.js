import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './index.less'
import app from '@/config/config';
import { AtButton } from 'taro-ui'


import img from '@/assets/images/24213.jpg'

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      richText: '<h3>这是富文本</h3>'
    }
  }
  componentWillMount() {
    console.log('willMount')
  }

  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    dispatch({ type: 'home/query' })
  }

  componentDidShow() {
    console.log('didShow')
  }

  componentDidHide() {
    console.log('didHide')
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // console.log(nextProps, prevState)
    return null
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState,'willUpdate')
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState, 'didUpdate')
  }



  handleButtonClick() {
    // console.log('click')
    this.setState({ richText: this.state.richText + '1' })
  }

  onPullDownRefresh() {
    console.log('onPullDownRefresh')
  };

  onReachBottom() {
    console.log('onReachBottom')
  };

  render() {
    // console.log(process.env.TARO_ENV)

    const {
      home: { list = [] },
      loading
    } = this.props;
    console.log(list)
    const { richText } = this.state;
    return (
      <View className={styles.page}>
        <Swiper
          style={{ height: '480rpx' }}
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {list.map(item => (
            <SwiperItem key={item.id}>
              <Image style={{ width: '100%', height: '100%' }} mode="aspectFill" src={app.fileUrl + item.img}></Image>
            </SwiperItem>
          ))}
        </Swiper>
        首页
        <Image src={img}></Image>
        {/* 测试全局样式 app.global.less */}
        <View className="page">456</View>
        {/* 富文本示例 */}
        {process.env.TARO_ENV == 'h5' && <View ref={ref => this.refView = ref} dangerouslySetInnerHTML={{ __html: richText }}></View>}
        {process.env.TARO_ENV == 'weapp' && <rich-text nodes={richText} space='nbsp'></rich-text>}
        <Button onClick={this.handleButtonClick}>点击更新富文本</Button>
        taroUi测试
        <AtButton>按钮文案</AtButton>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtButton type='secondary'>按钮文案</AtButton>
        <AtButton loading type='primary'>按钮文案</AtButton>
      </View>
    )
  }
}

