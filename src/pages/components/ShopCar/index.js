import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './index.less'

import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import numeral from 'numeral';

import shopCarFull from '@/assets/images/icon_gwc_bright@2x.png';
import shopCarEmpty from '@/assets/images/icon_gwc_gray@2x.png';
import reduceIcon from '@/assets/images/icon_reduce@2x.png';
import addIcon from '@/assets/images/btn_add@2x.png';

export default class ShopCar extends PureComponent {

  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    showList: false
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
    const { list } = this.state;
    if (action == 'settlement') {
      Taro.navigateTo({ url: `/pages/shop/confirmorder?id=456` })
    } else if (action == 'clear') {
      this.setState({ confirmVisible: true })
    }
  }
  handleModalConfirm(flag) {
    if(flag) {
      this.setState({ list: [], confirmVisible: false, showList: false })
    } else {
      this.setState({ confirmVisible: false })
    }
  }
  handleModalVisible() {
    const { showList } = this.state;
    this.setState({ showList: !showList })
  }
  handleModalWrapClick() {
    this.setState({ showList: false })
  }
  render() {
    const { countNum = 0, list, showList, confirmVisible } = this.state;
    return (
      <View>
        {showList ?
          <View onClick={() => this.handleModalWrapClick()} className={styles.shopCarWrap}>
            <View onClick={e => e && e.stopPropagation()} className={styles.shopCar}>
              <View className={styles.shopCarTitle}>
                <View>已选商品</View>
                <View onClick={() => this.handleButtonClick('clear')}>清空</View>
              </View>
              <View className={styles.goodsListWrap}>
                {
                  list.map((item, index) => (
                    <View key={item} className={styles.goodsItem}>
                      <View className={styles.goodsImg}>
                        <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                      </View>
                      <View className={styles.goodsRightPanel}>
                        <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                        <View className={styles.priceWrap}>
                          <View className={styles.price}><Text className={styles.symbol}>¥</Text>{numeral(49).format('0.00')}</View>

                          <View className={styles.operate}>
                            {countNum > 0 ? <Image onClick={this.handleOperateClick.bind(this, 'reduce')} className={styles.operateBtn} src={reduceIcon} /> : null}
                            {countNum > 0 ? <View className={styles.countNum}>{countNum}</View> : null}
                            <Image onClick={this.handleOperateClick.bind(this, 'add')} className={styles.operateBtn} src={addIcon} />
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                }
              </View>
            </View>
          </View> : null}

        <View className={`${styles.shopCarOperate} ${showList ? '' : styles.showBoxShadow}`}>
          <View className={styles.priceWrap}>
            {list.length > 0 ?
              <Image onClick={() => this.handleModalVisible()} className={styles.shopCarImg} src={shopCarFull}>
                <View className={styles.badge}>1</View>
              </Image> :
              <Image onClick={() => this.handleModalVisible()} className={styles.shopCarImg} src={shopCarEmpty}></Image>}
            <View className={list.length > 0 ? styles.price : styles.greyPrice}><Text className={styles.symbol}>¥</Text>{numeral(49).format('0.00')}</View>
            {list.length == 0 ?<View className={styles.description}>购物车还是空的，快去添加商品吧~</View> : null}
          </View>
          {list.length > 0 ? <View className={styles.button} onClick={() => this.handleButtonClick('settlement')}>去结算</View> : null}
        </View>

        <AtModal isOpened={confirmVisible} onClose={() => this.setState({ confirmVisible: false })}>
          <AtModalContent>
            <View className={styles.modalContent}>是否清空商品？</View>
            <View className={styles.modalAction}>
              <View onClick={() => this.handleModalConfirm(false)} className={styles.cancelBtn}>取消</View> 
              <View onClick={() => this.handleModalConfirm(true)} className={styles.confirmBtn}>确认</View>
            </View>  
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}

