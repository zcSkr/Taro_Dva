import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text, Radio, RadioGroup } from '@tarojs/components'
import styles from './address.less';
import { AtButton } from 'taro-ui';

export default class Address extends PureComponent {
  config = {
    navigationBarTitleText: '收货地址',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };


  componentDidMount() {
    console.log('didMount', this.$router)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handleAddressClick = record => {
    console.log(record)
  }

  handleOperateClick = (action,record) => {
    console.log(action)
    if (action == ' edit') {
      Taro.navigateTo({ url: '/pages/mine/addAddress' })
    } else if (action == 'delete') {

    }
  }

  handleButtonClick = () => {
    Taro.navigateTo({ url: '/pages/mine/addAddress' })
  }

  handleRadioChange = (e) => {
    console.log(e.detail.value)
  }

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.page}>
        <View className={styles.addressWrap}>
          <RadioGroup onChange={this.handleRadioChange}>
            {
              [1, 2].map((item, index) => (
                <View key={item} className={styles.addressItem}>
                  <Image className={styles.locationIcon} src={require('@/assets/images/icon_dw_two@2x.png')}></Image>
                  <View className={styles.rightPanel}>
                    <View onClick={() => this.handleAddressClick(item)} className={styles.header}>
                      <View><Text className={styles.label}>收货人：</Text>邓鹤林</View>
                      <View>18181814567</View>
                    </View>
                    <View onClick={() => this.handleAddressClick(item)} className={styles.content}>
                      <View className={styles.label}>收货地址：</View>
                      <View>四川省成都市高新区环球中心N2区 1109室</View>
                    </View>
                    <View className={styles.footer}>
                      {
                        item == 2 ?
                          <Radio value={item} checked={true} style={{ transform: 'scale(0.7)' }} className={styles.radioChecked} color="#F9994D">默认地址</Radio> :
                          <Radio value={item} style={{ transform: 'scale(0.7)' }} className={styles.radio} color="#F9994D">设为默认</Radio>
                      }
                      <View className={styles.operate}>
                        <View onClick={() => this.handleOperateClick('edit',record)} className={styles.btnWrap}>
                          <Image className={styles.btnIcon} src={require('@/assets/images/icon_edit@2x.png')}></Image>
                          <View>编辑</View>
                        </View>
                        <View onClick={() => this.handleOperateClick('delete',record)} className={styles.btnWrap}>
                          <Image className={styles.btnIcon} src={require('@/assets/images/icon_delete@2x.png')}></Image>
                          <View>删除</View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            }
          </RadioGroup>
        </View>

        <AtButton onClick={this.handleButtonClick} className={styles.submitBtn}>新增收货地址</AtButton>
      </View>
    )
  }
}

