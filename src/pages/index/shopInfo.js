import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './shopInfo.less'

import { AtIcon, AtDivider } from 'taro-ui';
import numeral from 'numeral';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class ShopInfo extends PureComponent {
  config = {
    navigationBarTitleText: '店铺详情',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    console.log('didMount', this.$router)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }
  handleAddressClick() {
    Taro.openLocation({
      latitude: 30,
      longitude: 120
    })
  }
  handleGoodsClick(record) {
    console.log(record)
    Taro.navigateTo({ url: `/pages/index/goodsInfo?id=123` })
  }

  handleServeClick() {
    this.setState({ confirmVisible: true })
  }

  handleModalConfirm(flag) {
    if (flag) {
      Taro.makePhoneCall({ 
        phoneNumber: '10086',
        success: res => {
          this.setState({ confirmVisible: false })
        }
      })
    } else {
      this.setState({ confirmVisible: false })
    }
  }

  render() {
    const { loading } = this.props;
    const { confirmVisible } = this.state;
    return (
      <View className={styles.page}>
        <View className={styles.swiper}>
          <Swiper
            style={{ height: '100%' }}
            interval={3000}
            circular
            // indicatorColor='#999'
            // indicatorActiveColor='#333'
            // indicatorDots
            autoplay>
            {
              [1, 2, 3].map((item, index) => (
                <SwiperItem key={item} className={styles.swiperItem}>
                  <Image className={styles.img} src={'http://uploads.qj.com.cn/image2017/20171017/1508220539969059200.jpg'} mode="aspectFill"></Image>
                </SwiperItem>
              ))
            }
          </Swiper>
        </View>

        <View className={styles.shopWrap}>
          {/* 店铺信息 */}
          <View onClick={() => this.handleAddressClick()} className={styles.shopInfo}>
            <View className={styles.borderWrap}>
              <View className={styles.shopLogo}>
                <Image mode="aspectFit" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571977043464&di=d37fb62c28b93c921253bec23b8c2766&imgtype=0&src=http%3A%2F%2Fwww.hnxdf.com%2Fxdf_rd%2F20140607092928.jpg" />
              </View>
              <View className={styles.shopBrief}>
                <View className={styles.shopName}>店铺名称</View>
                <View className={styles.shopAddressWrap}>
                  <View className={styles.shopAddress}>地址：四川省成都市环球中心E5区B1-20</View>
                  <AtIcon value='chevron-down' size='22' color='#CCCCCC'></AtIcon>
                </View>
                <View>营业时间：8:00-22:00</View>
              </View>
            </View>
          </View>
          {/* 推荐菜品 */}
          <View className={styles.title}>推荐菜品</View>
          <View className={styles.goodsWrap}>
            {
              [1, 2, 3, 4, 5].map((item, index) => (
                <View key={item} onClick={() => this.handleGoodsClick(item)} className={styles.goodsItem}>
                  <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                </View>
              ))
            }
          </View>
        </View>

        {!confirmVisible ?
          <Image onClick={() => this.handleServeClick()} className={styles.serveBtn} src={require('@/assets/images/btn_lxkf@2x.png')}></Image> :
          <View className={styles.confirmView}>
            <View className={styles.modalContent}>是否拨打028-84955176？</View>
            <View className={styles.modalAction}>
              <View onClick={() => this.handleModalConfirm(false)} className={styles.cancelBtn}>取消</View>
              <View onClick={() => this.handleModalConfirm(true)} className={styles.confirmBtn}>确认</View>
            </View>
          </View>}
      </View>
    )
  }
}

