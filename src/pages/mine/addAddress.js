import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text, Textarea } from '@tarojs/components'
import styles from './addAddress.less';
import { AtIcon, AtDivider, AtButton } from 'taro-ui';

export default class AddAddress extends PureComponent {
  config = {
    navigationBarTitleText: '收货地址',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };


  componentDidMount() {
    console.log('didMount', this.$router)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handleAddressClick = record => {
    console.log(record)
  }

  handleButtonClick = () => {
    Taro.navigateBack()
  }

  handleChooseAddress = () => {
    Taro.chooseLocation({
      success: res => {
        console.log(res)
      }
    })
  }

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.page}>
        <View className={styles.panelListWrap}>
          <View className={styles.panelList}>
            <View className={styles.label}>收货人姓名</View>
            <View className={styles.rightPanel}>
              <Input maxLength={20}  className={styles.textInput} placeholder='请填写收货人姓名' />
            </View>
          </View>
          <View className={styles.panelList}>
            <View className={styles.label}>手机号</View>
            <View className={styles.rightPanel}>
              <Input type='number' maxLength={11} className={styles.textInput} placeholder='请输入手机号' />
            </View>
          </View>
          <View onClick={() => this.handleChooseAddress()} className={styles.panelList}>
            <View className={styles.label}>所在地区</View>
            <View className={styles.rightPanel}>
              <View className={styles.textGrey}>点击选择所在地区</View>
            </View>
          </View>
          <View className={styles.panelList}>
            <View className={styles.label}>详细地址</View>
            <View className={styles.rightPanel}>
              <Textarea autoHeight maxLength={500} className={styles.textArea} placeholder='请填写详细地址' />
            </View>
          </View>
        </View>

        <AtButton onClick={this.handleButtonClick} className={styles.submitBtn}>保存</AtButton>
      </View>
    )
  }
}

