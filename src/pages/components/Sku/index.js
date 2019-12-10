import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './index.less'


export default class Sku extends PureComponent {

  state = {
    list: [{ key: '规格', value: [{ name: '大' }, { name: '中' }, { name: '小' }] }, { key: '颜色', value: [{ name: '红' }, { name: '黄' }, { name: '嘿' }] }],
    showList: true
  }

  handleTagClick(index,childIndex){
    let { list } = this.state;
    // console.log(index, childIndex)
    list[index].value.forEach(item => item.isSelected = false)
    list[index].value[childIndex].isSelected = true
    this.setState({ list: [ ...list ] })
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
    const { list, showList } = this.state;
    if (!showList) {
      this.setState({ showList: true })
      return
    }
    if (action == 'joinShopCar') {

    } else if (action == 'exchange') {
      Taro.navigateTo({ url: '/pages/shop/confirmOrder' })
    }
  }

  handleModalWrapClick() {
    this.setState({ showList: false })
  }
  render() {
    const { countNum = 0, list, showList } = this.state;
    return (
      <View>
        {showList ?
          <View onClick={() => this.handleModalWrapClick()} className={styles.shopCarWrap}>
            <View onClick={e => e && e.stopPropagation()} className={styles.skuWrap}>
              <View className={styles.skuHeader}>
                <View className={styles.goodsImg}>
                  <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                </View>
                <View className={styles.goodsRightPanel}>
                  <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                  <View className={styles.priceWrap}>
                    <View className={styles.price}>1200积分</View>
                    <View className={styles.sales}>库存260件</View>
                  </View>
                </View>
              </View>
              <View className={styles.skuListWrap}>
                {
                  list.map((item, index) => (
                    <View key={item.key} className={styles.specItem}>
                      <View className={styles.specName}>{item.key}</View>
                      <View className={styles.tagWrap}>
                        {
                          item.value.map((childItem,childIndex) => (
                            <View onClick={() => this.handleTagClick(index,childIndex)} key={childItem} className={`${styles.tag} ${childItem.isSelected ? styles.selected : ''}`}>{childItem.name}</View>
                          ))
                        }
                      </View>
                    </View>
                  ))
                }
              </View>
              <View className={styles.skuFooter}>
                <View className={styles.label}>数量</View>
                <View className={styles.operate}>
                  {countNum > 0 ? <Image onClick={this.handleOperateClick.bind(this, 'reduce')} className={styles.operateBtn} src={require('@/assets/images/icon_reduce@2x.png')} /> : null}
                  {countNum > 0 ? <View className={styles.countNum}>{countNum}</View> : null}
                  <Image onClick={this.handleOperateClick.bind(this, 'add')} className={styles.operateBtn} src={require('@/assets/images/btn_add@2x.png')} />
                </View>
              </View>
            </View>
          </View> : null}

        <View className={styles.btnWrap}>
          <View onClick={() => this.handleButtonClick('joinShopCar')} className={styles.joinShopCar}>加入购物车</View>
          <View onClick={() => this.handleButtonClick('exchange')} className={styles.exchange}>立即兑换</View>
        </View>

      </View>
    )
  }
}

