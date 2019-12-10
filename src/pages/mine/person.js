import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './person.less';
import { AtIcon } from 'taro-ui';

@connect(({ mine, loading }) => ({
  mine,
  loading: loading.effects["mine/load"],
}))
export default class Person extends PureComponent {
  config = {
    navigationBarTitleText: '基本信息',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      sexArr: ['未知', '男', '女']
    }
  }

  componentDidMount() {
  };
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
  };

  onReachBottom() {
    console.log('onReachBottom')
  };
  
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setState({ sexIndex: e.detail.value })
  }

  render() {
    const { loading } = this.props;
    const { sexIndex = 0, sexArr } = this.state;
    return (
      <View className={styles.page}>

        <View className={styles.panelListWrap}>
          <View onClick={() => this.handlePanelListClick('address')} className={styles.panelList}>
            <View className={styles.label}>头像</View>
            <View className={styles.rightPanel}>
              <View onClick={() => this.handlePersonClick('person')} className={styles.headImg}>
                {/* <Image mode="aspectFill" src={require('@/assets/images/icon_mrtx@2x.png')} /> */}
                <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
              </View>
              <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
            </View>
          </View>
          <View onClick={() => this.handlePanelListClick('feedback')} className={styles.panelList}>
            <View className={styles.label}>昵称</View>
            <View className={styles.rightPanel}>
              <Input maxLength={20} value={'郑小超'} className={styles.nickName}  placeholder='请输入昵称' />
              <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
            </View>
          </View>
          <Picker range={sexArr} style={{ width: '100%' }} mode='selector' onChange={this.bindMultiPickerChange}>
          <View onClick={() => this.handlePanelListClick('business')} className={styles.panelList}>
            <View className={styles.label}>性别</View>
            <View className={styles.rightPanel}>
              <View className={styles.text}>{sexArr[sexIndex]}</View>
              <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
            </View>
          </View>
          </Picker>
        </View>
      </View>
    )
  }
}

