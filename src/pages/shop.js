import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtButton } from 'taro-ui'
import styles from './shop.less';
import numeral from 'numeral';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class Shop extends PureComponent {
  config = {
    navigationBarTitleText: '积分商城',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  state = {
    countNum: 0
  }

  handleOperateClick(action, e) {
    console.log(action)
    e && e.stopPropagation()
    let { countNum } = this.state;
    if (action == 'add') {
      countNum += 1
    } else if (action == 'reduce') {
      countNum -= 1
    }
    this.setState({ countNum })
  }

  handleGoodsClick(record) {
    console.log(record)
    Taro.navigateTo({ url: `/pages/index/integralGoodsInfo?id=123` })
  }

  handleShopCarClick(){
    Taro.navigateTo({ url: '/pages/shop/shopCar' })
  }

  render() {
    const { countNum } = this.state;
    return (
      <View className={styles.page}>
        <View className={styles.bannerWrap}>
          <Image className={styles.banner} mode='widthFix' src={'http://www.cy8.com.cn/UpLoad/Companys/5625/aefe7aee-3d99-40f3-a2e0-6ce02f89ac39.jpg'}></Image>
        </View>
        <View className={styles.integralWrap}>
          <View className={styles.integralView}>
            <Image className={styles.diamondIcon} src={require('@/assets/images/icon_Diamond@2x.png')}></Image>
            <View className={styles.integral}>我的积分 1246</View>
          </View>
        </View>
        <View className={styles.goodsWrap}>
          {
            [1,2,3,4].map((item,index) => (
              <View key={item} className={styles.goodsItem} onClick={() => this.handleGoodsClick(item)}>
                <View className={styles.goodsImg}>
                  <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                </View>
                <View className={styles.bottomPanel}>
                  <View className={styles.goodsName}>澳洲进口原切牛排 {item == 2 ? '椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排' : ''}</View>
                  <View className={styles.priceWrap}>
                    <View className={styles.price}>1200积分</View>
                    <View className={styles.operate}>
                      {countNum > 0 ? <Image onClick={this.handleOperateClick.bind(this, 'reduce')} className={styles.operateBtn} src={require('@/assets/images/icon_reduce@2x.png')} /> : null}
                      {countNum > 0 ? <View className={styles.countNum}>{countNum}</View> : null}
                      <Image onClick={this.handleOperateClick.bind(this, 'add')} className={styles.operateBtn} src={require('@/assets/images/btn_add@2x.png')} />
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>

        <Image onClick={this.handleShopCarClick} src={require('@/assets/images/icon_gwc_bright@2x.png')} className={styles.shopCarIcon}>
          <View className={styles.badge}>1</View>
        </Image>
      </View>
    )
  }
}

