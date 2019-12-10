import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './confirmOrder.less'

import { AtIcon, AtDivider, AtModal, AtModalContent } from 'taro-ui';
import numeral from 'numeral';
import moment from 'moment';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class ConfirmOrder extends PureComponent {
  config = {
    navigationBarTitleText: '确认订单',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = { 
      dateArray: [
        ['今天', '明天'],
        []
      ],
      dateIndex: [0, 0],
      appointment: '', //预约时间
    }
  }

  componentWillMount(){
    this.calculateDate()
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

  handleSubmitOrder(){
    this.setState({ confirmVisible: true })
  }

  handleModalConfirm() {
    this.setState({ confirmVisible: false })
  }

  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let { dateIndex, dateArray } = this.state;
    dateIndex = e.detail.value
    let appointment = ''
    if (e.detail.value[0] == 0) {
      appointment = moment().format('YYYY-MM-DD') + ' ' + dateArray[1][e.detail.value[0]]
    } else if (e.detail.value[0] == 1) {
      appointment = moment().add(1, 'days').format('YYYY-MM-DD') + ' ' + dateArray[1][e.detail.value[0]]
    }
    this.setState({ dateIndex, appointment })
  }
  bindMultiPickerColumnChange(e) {
    console.log('picker列改变，携带值为', e.detail)
    let { dateIndex, dateArray } = this.state;
    dateIndex[e.detail.column] = e.detail.value
    if (e.detail.column == 0) this.calculateDate()
  }

  calculateDate() {
    let { dateIndex, dateArray } = this.state;
    const today = moment().format('YYYY-MM-DD')
    const startTime = '8:00';
    const endTime = '23:00';
    let startDay = moment(today + ' ' + startTime)
    let endDay = moment(today + ' ' + endTime)
    if (moment().isAfter(endDay)) { //如果是下班之后
      startDay = startDay.add(1, 'days')
      endDay = endDay.add(1, 'days')
    }
    // console.log(startDay, endDay)
    let timeArr = [startDay]
    let time = startDay.format('YYYY-MM-DD HH:mm')
    while (moment(time).isBefore(endDay)) {
      let timeObj = moment(time).add(30, 'minutes')
      time = timeObj.format('YYYY-MM-DD HH:mm')
      timeArr.push(timeObj)
    }
    // console.log(timeArr)
    if (dateIndex[0] == 0) {
      timeArr = timeArr.filter(item => moment().add(30, 'minutes').isBefore(item.format('YYYY-MM-DD HH:mm')))
    }
    let arr = []
    for (let i = 0; i < timeArr.length - 1; i++) {
      arr.push(timeArr[i].format('HH:mm') + '-' + timeArr[i + 1].format('HH:mm'))
    }
    // console.log(arr)
    if (moment().isAfter(moment(today + ' ' + endTime))) { //如果时间在下班之后
      dateArray[0] = ['明天']
    } else {
      dateArray[0] = ['今天', '明天']
    }

    console.log(arr)
    dateArray[1] = arr
    dateIndex[1] = 0
    let appointment = ''
    if (dateIndex[0] == 0) {
      appointment = moment().format('YYYY-MM-DD') + ' ' + arr[0]
    } else if (dateIndex[0] == 1) {
      appointment = moment().add(1, 'days').format('YYYY-MM-DD') + ' ' + arr[0]
    }
    this.setState({ dateArray, dateIndex, appointment })
  }

  render() {
    const { loading } = this.props;
    const { dateArray, dateIndex, confirmVisible } = this.state;
    return (
      <View className={styles.page}>
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
          <Textarea className={styles.textArea} autoHeight placeholderStyle="color: #999999" maxlength={500} placeholder="选填，填写内容已和卖家协商确认" />
        </View>

        <View className={styles.subscribeTime}>
          <Picker style={{ width: '100%' }} mode="multiSelector" onChange={this.bindMultiPickerChange} onColumnchange={this.bindMultiPickerColumnChange} value={dateIndex} range={dateArray}>
            <View className={styles.listItem}>
              <View className={styles.leftPanel}>预约时间</View>
              <View className={styles.rightPanel}>
                <View>{dateArray[0][dateIndex[0]]} {dateArray[1][dateIndex[1]]}</View>
                <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
              </View>
            </View>
          </Picker>
        </View>

        <View className={styles.operate}>
          <View className={styles.totalMoney}>
            共计：
            <Text className={styles.symbol}>¥ </Text>
            <Text className={styles.price}>{numeral(98).format('0.00')}</Text>
          </View>
          <View onClick={this.handleSubmitOrder} className={styles.submitBtn}>提交订单</View>
        </View>

        <AtModal isOpened={confirmVisible} onClose={() => this.setState({ confirmVisible: false })}>
          <AtModalContent>
            <Image className={styles.successIcon} src={require('@/assets/images/icon_succeed@2x.png')}></Image>
            <View className={styles.modalContent}>下单成功！</View>
            <View className={styles.modalAction}>
              <View onClick={() => this.handleModalConfirm()} className={styles.confirmBtn}>确认</View>
            </View>
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}

