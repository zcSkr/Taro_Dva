import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './index.less'

import { AtIcon, AtDivider } from 'taro-ui';
import numeral from 'numeral';
import { fileUrl } from '@/config/config';

import ShopCar from '@/pages/components/ShopCar';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class Index extends PureComponent {
  config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      countNum: 0
    }
  }

  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        // console.log(res)
        const lat = String(res.latitude)
        const lon = String(res.longitude)
        dispatch({ type: 'home/query', payload: { lon, lat } })
      }
    })
  }
  handleShopClick() {
    Taro.navigateTo({ url: `/pages/index/shopInfo?id=123` })
  }
  handleGoodsClick(record) {
    console.log(record)
    Taro.navigateTo({ url: `/pages/index/goodsInfo?id=123` })
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

  handleScrollLower(e) {
    console.log('lower')
  }

  handleNavClick(record) {
    this.setState({ typeId: record })
  }

  handleChooseShopClick() {
    Taro.navigateTo({ url: '/pages/index/chooseShop' })
  }
  handleSearchClick({ detail }) {
    // console.log(detail)
    Taro.navigateTo({ url: `/pages/index/searchList?searchStr=${detail.value}` })
  }

  onPullDownRefresh() {
    const { dispatch } = this.props;
    // Taro.getLocation({
    //   type: 'gcj02',
    //   success: (res) => {
    //     console.log(res)
    //     const lat = String(res.latitude)
    //     const lon = String(res.longitude)
    //     dispatch({
    //       type: 'home/query',
    //       payload: { lon, lat },
    //       onSuccess: res => {
    //         Taro.stopPullDownRefresh()
    //       }
    //     })
    //   }
    // })
  }

  render() {
    const { 
      loading, 
      home: { carList, goodsList, shopBannerList, shopGoodsTypeList, shopInfo },
    } = this.props;
    const { countNum, typeId } = this.state
    console.li
    return (
      <View className={styles.page}>
        <View className={styles.location} onClick={this.handleChooseShopClick}>
          {shopInfo.address}
          <AtIcon value='chevron-down' size='20' color='#CCCCCC'></AtIcon>
        </View>

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
          <View className={styles.searchWrap}>
            <Image className={styles.searchBg} src={require('@/assets/images/btn_ssk@2x.png')}></Image>
            <View className={styles.searchView}>
              <AtIcon value='search' size='20' color='#CCCCCC'></AtIcon>
              <Input onConfirm={this.handleSearchClick} confirm-type='search' placeholderStyle='color: #cccccc' className={styles.searchInput} placeholder="请输入商品名称搜索商品" />
            </View>
          </View>
        </View>

        {/* 店铺信息 */}
        <View className={styles.shopInfo} onClick={() => this.handleShopClick()}>
          <View className={styles.borderWrap}>
            <View className={styles.shopLogo}>
              <Image mode="aspectFit" src={fileUrl + shopInfo.headImg} />
            </View>
            <View className={styles.shopBrief}>
              <View className={styles.shopName}>{shopInfo.nickname}</View>
              <View className={styles.shopAddress}>地址：{shopInfo.address}</View>
              <View>营业时间：{shopInfo.businessStartTime}-{shopInfo.businessEndTime}</View>
            </View>
            <AtIcon value='chevron-right' size='26' color='#CCCCCC'></AtIcon>
          </View>
        </View>
        {/* 分类列表 */}
        <View className={styles.scrollWrap}>
          <View className={styles.scrollNav}>
            <ScrollView scroll-y className={styles.scrollView}>
              {
                [undefined, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                  <View key={item} onClick={() => this.handleNavClick(item)} className={`${styles.navItem} ${typeId == item ? styles.selected : ''}`}>
                    {item == 2 ? <Image className={styles.hotIcon} src={require('@/assets/images/icon_hot@2x.png')} /> : null}
                    牛排
                  </View>
                ))
              }
            </ScrollView>
          </View>
          <View className={styles.rightPanel}>
            <ScrollView onScrollToLower={this.handleScrollLower} scroll-y style="width: 100%;height: 100%">
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => (
                  <View onClick={() => this.handleGoodsClick(item)} key={item} className={styles.goodsItem}>
                    <View className={styles.goodsImg}>
                      <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                    </View>
                    <View className={styles.goodsRightPanel}>
                      <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                      <View className={styles.priceWrap}>
                        <View>
                          <View className={styles.price}><Text className={styles.symbol}>¥</Text>{numeral(49).format('0.00')}</View>
                          <View className={styles.originalPrice}><Text className={styles.symbol}>¥</Text>{numeral(219).format('0.00')}</View>
                        </View>

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
              <AtDivider content={loading ? '加载中' : '没有更多了'} fontColor="#cccccc" fontSize={25} height={60} />
            </ScrollView>
          </View>
        </View>
        <ShopCar />
      </View>
    )
  }
}

