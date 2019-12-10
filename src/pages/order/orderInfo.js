import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './orderInfo.less'

import { AtIcon, AtDivider, AtModal, AtModalContent } from 'taro-ui';
import numeral from 'numeral';
import moment from 'moment';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class OrderInfo extends PureComponent {
  config = {
    navigationBarTitleText: '订单详情',
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
    console.log('didMount')
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }
  handleGoodsClick(record) {
    console.log(record)
    Taro.navigateTo({ url: `/pages/index/goodsInfo?id=123` })
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
    return (
      <View className={styles.page}>

        <View className={styles.statusWrap}>
          {/* <Image src={require('@/assets/images/icon_dzf@2x.png')} className={styles.statusIcon}></Image> */}
          {/* <Image src={require('@/assets/images/icon_dsh@2x.png')} className={styles.statusIcon}></Image> */}
          {/* <Image src={require('@/assets/images/icon_yqx@2x.png')} className={styles.statusIcon}></Image> */}
          {/* <Image src={require('@/assets/images/icon_ywc@2x.png')} className={styles.statusIcon}></Image> */}
          {/* <Image src={require('@/assets/images/icon_dsh@2x.png')} className={styles.statusIcon}></Image> */}
          {/* <Image src={require('@/assets/images/icon_tkz@2x.png')} className={styles.statusIcon}></Image> */}
          {/* <Image src={require('@/assets/images/icon_ywc@2x.png')} className={styles.statusIcon}></Image> */}
          <Image src={require('@/assets/images/icon_tksb@2x.png')} className={styles.statusIcon}></Image>
          {/* <Image src={require('@/assets/images/icon_ywc@2x.png')} className={styles.statusIcon}></Image> */}
          <View className={styles.statusContent}>
            {/* <View className={styles.statusText}>待支付</View> */}
            {/* <View className={styles.statusText}>待收货</View> */}
            {/* <View className={styles.statusText}>已取消</View> */}
            {/* <View className={styles.statusText}>已评价</View> */}
            {/* <View className={styles.statusText}>待发货</View> */}
            {/* <View className={styles.statusText}>退款中</View> */}
            {/* <View className={styles.statusText}>退款成功</View> */}
            <View className={styles.statusText}>退款失败</View>
            {/* <View className={styles.statusText}>已完成</View> */}
            <View className={styles.statusRemarks}>这是退款失败的理由这是退款失败的理由这是退款失败的理由这是退款失败的理由</View>
          </View>
        </View>

        <View className={styles.addressWrap}>
          {/* <Image className={styles.addIcon} src={require('@/assets/images/icon_tjshdz@2x.png')}></Image> */}
          <View className={styles.addressInfo}>
            <Image className={styles.locationIcon} src={require('@/assets/images/icon_dw_two@2x.png')}></Image>
            <View style={{ width: '100%' }}>
              <View className={styles.header}>
                <View className={styles.name}>收货人：胖胖张</View>
                <View className={styles.phone}>1777395436</View>
              </View>
              <View className={styles.address}>四川省成都市高新区环球中心N2-1109</View>
            </View>
          </View>
        </View>

        <View className={styles.goodsWrap}>
          {
            [1, 2].map((item, index) => (
              <View key={item} onClick={() => this.handleGoodsClick(item)} className={styles.goodsItem}>
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

        <View className={styles.leaveMsg}>
          <View className={styles.label}>买家留言：</View>
          <View className={styles.textArea}>
            这里是卖家留言这里是卖家留言这里是卖 家留言，这里是卖家留言这里是卖家留言 这里是卖家留言...
          </View>
        </View>
        <View className={styles.orderFooter}>
          <View className={styles.timeView}>订单编号: NO1657984923</View>
          <View className={styles.timeView}>下单时间: 2019-09-03 15:45:36</View>
          <View className={styles.timeView}>配送时间: 2019-09-03 16:10:25</View>
        </View>


        <View className={styles.operateWrap}>
          <View className={styles.totalMoney}>
            <View className={styles.label}>实付金额：</View>
            <View className={styles.money}>
              <Text className={styles.symbol}>¥ </Text>
              <Text className={styles.price}>{numeral(98).format('0.00')}</Text>
            </View>
          </View>
          <View className={styles.operate}>
            <View onClick={() => this.handleButtonClick('cancel')} className={styles.greyBtn}>取消订单</View>
            <View onClick={() => this.handleButtonClick('pay')} className={styles.normalBtn}>去支付</View>
            <View onClick={() => this.handleButtonClick('applyReturn')} className={styles.normalBtn}>申请退款</View>
            <View onClick={() => this.handleButtonClick('comment')} className={styles.specialBtn}>去评价</View>
          </View>
        </View>

      </View>
    )
  }
}

