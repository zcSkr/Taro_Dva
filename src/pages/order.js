import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './order.less'

import { AtIcon, AtDivider, AtModal, AtModalContent, AtTabs, AtTabsPane } from 'taro-ui';
import numeral from 'numeral';
import moment from 'moment';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class ConfirmOrder extends PureComponent {
  config = {
    navigationBarTitleText: '订单',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    }
  }

  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handleOrderClick(record) {
    console.log(record)
    Taro.navigateTo({ url: `/pages/order/orderInfo?id=123` })
  }

  handleTabsChange(current) {
    this.setState({ current })
  }

  handleScrollLower(e) {
    console.log('lower')
  }

  handleButtonClick(action) {
    console.log(action)
    switch (action) {
      case 'cancel': break;
      case 'pay': break;
      case 'comment':
        Taro.navigateTo({ url: `/pages/order/comment` });
        break;
      case 'applyReturn':
        Taro.navigateTo({ url: `/pages/order/applyReturn` });
        break;
      default: break;
    }
  }

  render() {
    const { loading } = this.props;
    const tabList = [{ title: '全部' }, { title: '待支付' }, { title: '待收货' }, { title: '已完成' }, { title: '退款' }]
    let list = [[1, 2], [1]]
    // let list = []
    return (
      <View className={styles.page}>
        <AtTabs height='80' current={this.state.current} tabList={tabList} onClick={this.handleTabsChange.bind(this)}>
          {
            tabList.map((tab, tabIndex) => (
              <AtTabsPane key={tab.title} current={this.state.current} index={tabIndex} >
                <ScrollView onScrollToLower={this.handleScrollLower} scroll-y className={styles.scrollView}>
                  {
                    list.length > 0 && list.map((item, index) => (
                      <View onClick={() => this.handleOrderClick(item)} key={item} className={styles.orderWrap}>
                        <View className={styles.orderHeader}>
                          <View>订单号：63463543540011</View>
                          <View className={styles.status}>待收货</View>
                          {/* <View className={styles.statusSpecial}>待支付</View> */}
                        </View>
                        <View className={styles.goodsWrap}>
                          {
                            item.map((childItem, childIndex) => (
                              <View key={childItem} className={styles.goodsItem}>
                                <View className={styles.goodsImg}>
                                  <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                                </View>
                                <View className={styles.goodsRightPanel}>
                                  <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                                  <View className={styles.spec}>颜色-白色/尺寸-小</View>
                                  <View className={styles.priceWrap}>
                                    <View className={styles.price}><Text className={styles.symbol}>¥</Text>{numeral(49).format('0.00')}</View>
                                    <View className={styles.sales}>x1</View>
                                  </View>
                                </View>
                              </View>
                            ))
                          }
                          <View className={styles.subTotal}>
                            <View className={styles.subNum}>共2件商品</View>
                            <View className={styles.total}>合计：
                        <Text className={styles.symbol}>¥ </Text>
                              <Text className={styles.price}>{numeral(98).format('0.00')}</Text>
                            </View>
                          </View>
                        </View>
                        <View onClick={e => e && e.stopPropagation()} className={styles.orderFooter}>
                          <View onClick={() => this.handleButtonClick('cancel')} className={styles.greyBtn}>取消订单</View>
                          <View onClick={() => this.handleButtonClick('pay')} className={styles.normalBtn}>去支付</View>
                          <View onClick={() => this.handleButtonClick('applyReturn')} className={styles.normalBtn}>申请退款</View>
                          <View onClick={() => this.handleButtonClick('comment')} className={styles.specialBtn}>去评价</View>
                        </View>
                      </View>
                    ))
                  }
                  {
                    list.length == 0 ?
                      <View className={styles.emptyWrap}>
                        <Image className={styles.emptyIcon} src={require('@/assets/images/img_zwdd@2x.png')} />
                        <View className={styles.emptyText}>暂无订单哦~</View>
                      </View>
                      :
                      null
                  }
                </ScrollView>
              </AtTabsPane>
            ))
          }
        </AtTabs>

      </View>
    )
  }
}

