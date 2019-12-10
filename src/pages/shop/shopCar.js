import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text, Radio } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './shopCar.less'

import { AtIcon, AtDivider, AtSwipeAction } from 'taro-ui';
import numeral from 'numeral';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class ShopCar extends PureComponent {
  config = {
    navigationBarTitleText: '积分购物车',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [{ id: 1 }, { id: 2 }],
      countNum: 0,
    }
  }

  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }
  handleGoodsClick(record) {
    console.log(record, '12')
    Taro.navigateTo({ url: `/pages/index/goodsInfo?id=123` })
  }
  handleRadioClick(record) {
    const { list } = this.state;
    list.forEach(item => {
      if(item.id == record.id){
        item.isChecked = !item.isChecked
      }
    })
    this.setState({ list: [...list], checkedAll: list.every(item => item.isChecked) })
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

  handleDeleteRecord(record) {
    console.log(record)
  }

  handleChangeStatus(flag) {
    this.setState({ isEdit: flag })
  }
  handeButtonClick(action){
    if (action == 'exchange') {
      Taro.navigateTo({ url: '/pages/shop/confirmOrder' })
    } else if (action == 'deleteAll') {

    } 
  }

  handleRadioAll(){
    const { checkedAll, list } = this.state;
    list.forEach(item => item.isChecked = !checkedAll)
    this.setState({ checkedAll: !checkedAll, list })
  }

  render() {
    const { loading } = this.props;
    const { countNum, list, isEdit, checkedAll } = this.state;

    return (
      <View className={styles.page}>
        <View className={styles.scrollWrap}>
          <ScrollView onScrollToLower={this.handleScrollLower} scroll-y style="width: 100%;height: 100%">
            {
              list.map((item, index) => (
                <AtSwipeAction onClick={() => this.handleDeleteRecord(item)} key={item} options={[
                  {
                    text: '删除',
                    style: {
                      backgroundColor: '#FF4949'
                    }
                  }
                ]}>
                  <View onClick={() => this.handleGoodsClick(item)} className={styles.goodsItem}>
                    <View onClick={e => e && e.stopPropagation()} className={styles.radioWrap}>
                      <Radio checked={item.isChecked} onClick={() => this.handleRadioClick(item)} className={styles.radio} color="#F9994D"></Radio>
                    </View>
                    <View className={styles.goodsImg}>
                      <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                    </View>
                    <View className={styles.goodsRightPanel}>
                      <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                      <View className={styles.spec}>颜色-白色/尺寸-小</View>
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
                </AtSwipeAction>
              ))
            }
          </ScrollView>
        </View>

        <View className={styles.operateWrap}>
          {
            !isEdit ?
              <View onClick={() => this.handleChangeStatus(true)} className={styles.operateHeader}>编辑</View> :
              <View onClick={() => this.handleChangeStatus(false)} className={styles.operateHeader}>完成</View>
          }
          <View className={styles.operateFooter}>
            <Radio onClick={this.handleRadioAll} checked={checkedAll} className={styles.radio} color="#F9994D">全选</Radio>
            {
              !isEdit ?
                <View className={styles.rightPanel}>
                  <View className={styles.total}>合计：<Text style={{ color: '#FF6F1C' }}>1200积分</Text></View>
                  <View onClick={() => this.handeButtonClick('exchange')} className={styles.btn}>去兑换(0)</View>
                </View> :
                <View className={styles.rightPanel}>
                  <View onClick={() => this.handeButtonClick('deleteAll')} className={styles.btn}>删除</View>
                </View>
            }
          </View>
        </View>
      </View>
    )
  }
}

