import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './mine.less';
import { AtIcon, AtButton, AtModal } from 'taro-ui';
import { setToken, setUnionuser, getToken, getUnionuser, fileUrl } from '@/config/config';

@connect(({ mine, loading }) => ({
  mine,
}))
export default class Mine extends PureComponent {
  config = {
    navigationBarTitleText: '我的',
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
  handleOrderClick = (current) => {
    Taro.switchTab({ url: `/pages/order` })
  }
  handlePanelListClick = (action) => {
    console.log(action)
    switch (action) {
      case 'address':
        Taro.navigateTo({ url: '/pages/mine/address' });
        break;
      case 'feedback':
        Taro.navigateTo({ url: '/pages/mine/feedback' });
        break;
      case 'business': Taro.navigateTo({ url: '/pages/mine/business' });
        break;
      default: break;
    }
  }
  handleLogin = () => {
    console.log(1234)
  }

  handlePersonClick = (action) => {
    console.log(action);
    if (action == 'person') {
      Taro.navigateTo({ url: '/pages/mine/person' })
    } else if (action == 'integral') {
      Taro.navigateTo({ url: '/pages/mine/integral' })
    }
  }

  getUserInfo = (e) => {
    // console.log(e.detail)
    if (e.detail.userInfo) {
      this.setState({ authVisible: true, userInfo: e.detail.userInfo })
    }
  }
  getPhoneNumber = (e) => {
    console.log(e.detail)
    const { dispatch } = this.props;
    if (e.detail.encryptedData && e.detail.iv) {
      Taro.login().then(res => {
        const code = res.code
        dispatch({
          type: 'mine/service',
          payload: {
            service: 'getPhoneNumber',
            params: {
              encryptedData: e.detail.encryptedData,
              ivdata: e.detail.iv,
              code,
            }
          },
          onSuccess: res => {
            console.log(res)
            if (res.resultState == '1') {
              this.handleLogin({ openId: res.data.openid, account: res.data.phone })
            } else {
              
            }
          }
        })
      })
    }
  }
  handleLogin = ({ openId, account }) => {
    const { userInfo } = this.state;
    const { dispatch } = this.props;
    // console.log(userInfo)
    // return
    dispatch({ 
      type: 'mine/login', 
      payload: { 
        openId, 
        account,
        headImg: userInfo.avatarUrl,
        sex: userInfo.gender,
        nickname: userInfo.nickName
      },
      onSuccess: res => {
        console.log(res)
        if(res.resultState == '1') {
          Taro.showToast({ title: '授权成功！', icon: 'success', mask: true })
          setUnionuser(res.data)
          setToken(res.data.token)
          this.setState({ authVisible: false })
        } else {
          Taro.showToast({ title: res.msg, icon: 'none', mask: true })
        }
      }
    })
  }
  render() {
    const { authVisible } = this.state;
    const unionuser = getUnionuser()
    return (
      <View className={styles.page}>
        <View className={styles.personWrap}>
          <View onClick={() => this.handlePersonClick('person')} className={styles.headImg}>
            {getToken() ? <Image mode="aspectFill" src={fileUrl + unionuser.headImg} /> : null}
            {!getToken() ? <Image mode="aspectFill" src={require('@/assets/images/icon_mrtx@2x.png')} /> : null}
          </View>
          {getToken() ? <View className={styles.rightPanel}>
            <View onClick={() => this.handlePersonClick('person')} className={styles.name}>{unionuser.nickname}</View>
            <View onClick={() => this.handlePersonClick('integral')} className={styles.integral}>积分：{unionuser.integral}</View>
          </View> : 
          <View className={styles.rightPanel}>
            未登录
          </View>}
          {getToken() ? <AtIcon value='chevron-right' size='22' color='#FFF'></AtIcon> : 
          <AtButton openType='getUserInfo' onGetUserInfo={this.getUserInfo} lang='zh_CN' className={styles.loginBtn}>点击登录</AtButton>}
        </View>
        <View className={styles.panelTitle}>我的订单</View>
        <View className={styles.panelOrder}>
          <View onClick={() => this.handleOrderClick(1)} className={styles.orderWrap}>
            <Image className={styles.orderIcon} src={require('@/assets/images/icon_all@2x.png')}></Image>
            <View className={styles.orderText}>全部</View>
          </View>
          <View onClick={() => this.handleOrderClick(2)} className={styles.orderWrap}>
            <Image className={styles.orderIcon} src={require('@/assets/images/icon_dfk@2x.png')}>
              <View className={styles.badge}>1</View>
            </Image>
            <View className={styles.orderText}>待支付</View>
          </View>
          <View onClick={() => this.handleOrderClick(3)} className={styles.orderWrap}>
            <Image className={styles.orderIcon} src={require('@/assets/images/icon_dsh1@2x.png')}>
              <View className={styles.badge}>1</View>
            </Image>
            <View className={styles.orderText}>待收货</View>
          </View>
          <View onClick={() => this.handleOrderClick(4)} className={styles.orderWrap}>
            <Image className={styles.orderIcon} src={require('@/assets/images/icon_ywc1@2x.png')}>
              <View className={styles.badge}>1</View>
            </Image>
            <View className={styles.orderText}>已完成</View>
          </View>
          <View onClick={() => this.handleOrderClick(5)} className={styles.orderWrap}>
            <Image className={styles.orderIcon} src={require('@/assets/images/icon_tk@2x.png')}>
              <View className={styles.badge}>1</View>
            </Image>
            <View className={styles.orderText}>退款</View>
          </View>
        </View>

        <View className={styles.panelListWrap}>
          <View onClick={() => this.handlePanelListClick('address')} className={styles.panelList}>
            <View className={styles.label}>收货地址</View>
            <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
          </View>
          <View onClick={() => this.handlePanelListClick('feedback')} className={styles.panelList}>
            <View className={styles.label}>意见反馈</View>
            <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
          </View>
          <View onClick={() => this.handlePanelListClick('business')} className={styles.panelList}>
            <View className={styles.label}>商务合作</View>
            <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
          </View>
        </View>


        <AtModal isOpened={authVisible} onClose={() => this.setState({ authVisible: false })}>
          <View className={styles.modalContent}>
            <Image className={styles.authBg} src={require('@/assets/images/img_tk@2x.png')}></Image>
            <AtButton openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber} className={styles.submitBtn}>确认授权</AtButton>
          </View>
        </AtModal>
      </View>
    )
  }
}

