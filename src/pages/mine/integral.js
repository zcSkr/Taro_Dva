import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './integral.less';
import { AtIcon, AtDivider } from 'taro-ui';
import moment from 'moment';

@connect(({ mine, loading }) => ({
  mine,
  loading: loading.effects["mine/load"],
}))
export default class Integral extends PureComponent {
  config = {
    navigationBarTitleText: '我的积分',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  };
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
  };

  onReachBottom() {
    console.log('onReachBottom')
  }

  handleRulesClick = () => {
    Taro.navigateTo({ url: '/pages/richText' })
  }

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.page}>
        <View className={styles.integralWrap}>
          <Image className={styles.integralBg} src={require('@/assets/images/img_banner_three@2x.png')}></Image>
          <View className={styles.content}>
            <View className={styles.title}>我的积分</View>
            <View className={styles.integral}>4066</View>
          </View>
          <View onClick={() => this.handleRulesClick()} className={styles.integralRules}>积分规则</View>
        </View>
        <View className={styles.panelTitle}>积分明细</View>
        {
          [1,2,3,4,5,6,7,8,9,0].map((item,index) => (
            <View key={item} className={styles.integralList}>
              <View className={styles.typeName}>购买商品获得</View>
              <View className={styles.timeWrap}>
                <View className={styles.time}>{moment().format('YYYY-MM-DD HH:mm:ss')}</View>
                {/* <View className={styles.addIntegral}>+200</View> */}
                <View className={styles.reduiceIntegral}>-10</View>
              </View>
            </View>
          ))
        }
        <AtDivider content={loading ? '加载中' : '没有更多了'} fontColor="#cccccc" fontSize={25} height={60} />
      </View>
    )
  }
}

