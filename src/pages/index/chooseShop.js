import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './chooseShop.less'

import { AtIcon, AtDivider } from 'taro-ui';
import numeral from 'numeral';
import { fileUrl } from '@/config/config';

@connect(({ shop, loading }) => ({
  shop,
  loading: loading.effects["shop/query"],
  submiting: loading.effects["shop/service"],
}))
export default class ChooseShop extends PureComponent {
  config = {
    navigationBarTitleText: '店铺列表',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        // console.log(res)
        const lat = String(res.latitude)
        const lon = String(res.longitude)
        dispatch({ type: 'shop/query', payload: { lat, lon } })
      }
    })
    
  }
  handleShopClick = (record) => {
    // console.log(record)
    Taro.setStorageSync('shopInfo', record)
    Taro.navigateBack()
  }

  onPullDownRefresh(){
    const { dispatch } = this.props;
    dispatch({ 
      type: 'shop/query', 
      payload: { pageNum: 1 },
      onSuccess: res => {
        Taro.stopPullDownRefresh()
      }
    })
  }
  onReachBottom(){
    const { dispatch, shop: { pagination: { pageNum, total, pageSize } } } = this.props;
    if (pageNum * pageSize < total) {
      dispatch({ type: 'shop/query', payload: { pageNum: pageNum + 1 } })
    }
  }

  render() {
    const { loading, shop: { list } } = this.props;
    const shopInfo = Taro.getStorageSync('shopInfo')
    // console.log(shopInfo)
    return (
      <View className={styles.page}>
        <View className={styles.title}>当前店铺</View>
        <View className={styles.shopInfo} onClick={() => this.handleShopClick(shopInfo)}>
          <View className={styles.borderWrap}>
            <View className={styles.shopLogo}>
              <Image mode="aspectFit" src={fileUrl + shopInfo.headImg} />
            </View>
            <View className={styles.shopBrief}>
              <View className={styles.shopName}>{shopInfo.nickname}</View>
              <View className={styles.shopAddress}>地址：{shopInfo.address}</View>
              <View>营业时间：{shopInfo.businessStartTime}-{shopInfo.businessEndTime}</View>
            </View>
            <View className={styles.distance}>{Number(shopInfo.distance) > 1000 ? (Number(shopInfo.distance) / 10000).toFixed(2) + 'km' : shopInfo.distance + 'm'}</View>
          </View>
        </View>
        <View className={styles.stock}></View>
        <View className={styles.title} style={{ color: '#999999' }}>更多店铺</View>
        {
          list.map(item => (
            <View key={item.id} className={styles.shopInfoMore} onClick={() => this.handleShopClick(item)}>
              <View className={styles.borderWrap}>
                <View className={styles.shopLogo}>
                  <Image mode="aspectFit" src={fileUrl + item.headImg} />
                </View>
                <View className={styles.shopBrief}>
                  <View className={styles.shopName}>{item.nickname}</View>
                  <View className={styles.shopAddress}>地址：{item.address}</View>
                  <View>营业时间：{item.businessStartTime}-{item.businessEndTime}</View>
                </View>
                <View className={styles.distance}>{Number(item.distance) > 1000 ? (Number(item.distance) / 10000).toFixed(2) + 'km' : item.distance + 'm'}</View>
              </View>
            </View>
          ))
        }
        <AtDivider content={loading ? '加载中' : '没有更多了'} fontColor="#cccccc" fontSize={25} height={80} />
        
      </View>
    )
  }
}

