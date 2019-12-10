import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './integralGoodsInfo.less'

import { AtIcon, AtDivider, AtRate } from 'taro-ui';
import numeral from 'numeral';
import moment from 'moment';

import Sku from '@/pages/components/Sku';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class IntegralGoodsInfo extends PureComponent {
  config = {
    navigationBarTitleText: '商品详情',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };

  state = {
    richText: '<p><img alt="伊赛 儿童牛排套餐5片装 送番茄酱包 手工静腌-京东" class= "" src="https://img20.360buyimg.com/vc/jfs/t17590/289/2397060813/827497/d1713b86/5af3b678N77043503.jpg" /></p><p><br /><br /></p><p><strong style="margin: 0px; padding: 8px 0px 3px; display: inline-block;">1、生鲜“优鲜赔”绿色通道</strong><br /></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;">生鲜自营商品的破损或腐坏等问题，请在商品签收后48小时内提交“<strong style="margin: 0px; padding: 8px 0px 3px; display: inline-block;">优鲜赔</strong>”申请，100分钟内审核通过后即享补偿，无需返回商品；非鲜活易腐类商品需上门取件。<br /></p><p><strong style="margin: 0px; padding: 8px 0px 3px; display: inline-block;">2、专业生鲜客服团队—让您售后无忧</strong><br /></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;">微信在线客服：JD-fresh<br />京东生鲜客服电话：400-606-3311<br />服务时间：09:00-24:00<br /></p><p><strong style="margin: 0px; padding: 8px 0px 3px; display: inline-block;"><a href="https://help.jd.com/user/issue/325-931.html" target="_blank" style="margin: 0px; padding: 0px; color: rgb(102, 102, 102); text-decoration-line: none;"><span style="color:red">生鲜商品售后政策</span></a></strong><br /></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;">注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，京东生鲜不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若京东生鲜没有及时更新，请大家谅解！</p><p><strong style="margin: 0px; padding: 8px 0px 3px; display: inline-block; color: rgb(228, 57, 60);">权利声明：</strong><br />京东上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是京东重要的经营资源，未经许可，禁止非法转载使用。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">注：</strong>本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</p><p><br /><strong style="margin: 0px; padding: 8px 0px 3px; display: inline-block; color: rgb(228, 57, 60);">价格说明：</strong><br /></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">京东价：</strong>京东价为商品的销售价，是您最终决定是否购买商品的依据。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">划线价：</strong>商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">折扣：</strong>如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">异常问题：</strong>商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。</p><p><br /></p>'
  }

  componentDidMount() {
    console.log('didMount', this.$router)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
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

  handleButtonClick(action) {
    console.log(action)
    if(action == 'joinShopCar') {

    } else if (action == 'exchange'){
      Taro.navigateTo({ url: '/pages/shop/confirmOrder' })
    }
  }

  render() {
    const { loading } = this.props;
    const { countNum = 0, richText } = this.state;
    return (
      <View className={styles.page}>
        <View className={styles.swiper}>
          <Swiper
            style={{ height: '100%' }}
            interval={3000}
            circular
            indicatorColor='rgba(255, 255, 255, .5)'
            indicatorActiveColor='#F9994D'
            indicatorDots
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
        <View className={styles.goodsBreif}>
          <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑椒牛扒牛肉眼后切牛 排新鲜非腌制澳洲进口原切牛排套餐新鲜黑椒牛扒牛肉眼后切牛</View>
          <View className={styles.priceWrap}>
            <View className={styles.priceBox}>
              <View className={styles.price}>1200积分</View>
            </View>
            <View className={styles.operate}>
              {countNum > 0 ? <Image onClick={this.handleOperateClick.bind(this, 'reduce')} className={styles.operateBtn} src={require('@/assets/images/icon_reduce@2x.png')} /> : null}
              {countNum > 0 ? <View className={styles.countNum}>{countNum}</View> : null}
              <Image onClick={this.handleOperateClick.bind(this, 'add')} className={styles.operateBtn} src={require('@/assets/images/btn_add@2x.png')} />
            </View>
          </View>
        </View>

        
        <View className={styles.goodsDetail}>
          <View className={styles.titleWrap}>
            <View className={styles.title}>商品详情</View>
          </View>
          {process.env.TARO_ENV == 'weapp' && <rich-text nodes={richText.replace(/<img/g, "<img style='max-width: 100%;display:block;'")} space='nbsp'></rich-text>}
        </View>

        {/* <View className={styles.btnWrap}>
          <View onClick={() => this.handleButtonClick('joinShopCar')} className={styles.joinShopCar}>加入购物车</View>
          <View onClick={() => this.handleButtonClick('exchange')} className={styles.exchange}>立即兑换</View>
        </View> */}

        <Sku />

      </View>
    )
  }
}

