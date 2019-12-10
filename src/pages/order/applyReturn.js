import Taro, { PureComponent } from '@tarojs/taro'
import { View, Input, Image, Text, Textarea, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './applyReturn.less'

import { AtIcon, AtImagePicker, AtButton } from 'taro-ui';
import numeral from 'numeral';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class ApplyReturn extends PureComponent {
  config = {
    navigationBarTitleText: '申请退款',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [{
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572514400408&di=585a42a2c488eac624c6461a18f6ad75&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F11%2F20180711132927_QLhNh.thumb.700_0.jpeg',
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572514400408&di=585a42a2c488eac624c6461a18f6ad75&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F11%2F20180711132927_QLhNh.thumb.700_0.jpeg',
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572514400408&di=585a42a2c488eac624c6461a18f6ad75&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F11%2F20180711132927_QLhNh.thumb.700_0.jpeg',
      }, {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572514400408&di=585a42a2c488eac624c6461a18f6ad75&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F11%2F20180711132927_QLhNh.thumb.700_0.jpeg',
      }, {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572514400408&di=585a42a2c488eac624c6461a18f6ad75&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F11%2F20180711132927_QLhNh.thumb.700_0.jpeg',
      }],
      reasonArr: ['菜品问题','口味不符合','商品与页面描述不符','食品卫生问题','卖家发错货','无理由退货','其他']
    }
  }


  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handleButtonClick() {
  }

  handleUploadChange = (files) => {
    this.setState({ files })
  }
  handleUploadFail = (mes) => {
    console.log(mes)
  }
  handlePreviewImage = (index, file) => {
    const { files } = this.state;
    console.log(index, file)
    Taro.previewImage({
      current: file.url,
      urls: files.map(item => item.url)
    })
  }

  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setState({ reasonIndex: e.detail.value })
  }

  render() {
    const { loading } = this.props;
    const { reasonArr, reasonIndex } = this.state;
    return (
      <View className={styles.page}>
        <View className={styles.goodsWrap}>
          {
            [1, 2].map((item, index) => (
              <View key={item} className={styles.goodsItem}>
                <View className={styles.goodsImg}>
                  <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                </View>
                <View className={styles.goodsRightPanel}>
                  <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                  <View className={styles.priceWrap}>
                    <View className={styles.price}><Text className={styles.symbol}>¥</Text>{numeral(49).format('0.00')}</View>
                    <View className={styles.sales}>x1</View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>

        <View className={styles.applyWrap}>
          <View className={styles.applyTime}>
            <Picker range={reasonArr} style={{ width: '100%' }} mode='selector' onChange={this.bindMultiPickerChange}>
              <View className={styles.listItem}>
                <View className={styles.leftPanel}>申请原因</View>
                <View className={styles.rightPanel}>
                  {reasonArr[reasonIndex] ? <View>{reasonArr[reasonIndex]}</View> : <View style={{ color: '#999999'}}>请选择</View> }
                  <AtIcon value='chevron-right' size='22' color='#CCCCCC'></AtIcon>
                </View>
              </View>
            </Picker>
          </View>
          <View className={styles.applyTitle}>问题描述</View>
          <Textarea className={styles.textArea} autoHeight placeholderStyle="color: #aaaaaa" maxlength={500} placeholder="请具体描述问题..." />
          <AtImagePicker
            multiple
            mode='aspectFill'
            showAddBtn={true}
            count={6}
            files={this.state.files}
            onChange={this.handleUploadChange}
            onFail={this.handleUploadFail}
            onImageClick={this.handlePreviewImage}
          />
        </View>

        <AtButton onClick={this.handleButtonClick} className={styles.submitBtn}>提交审核</AtButton>

      </View>
    )
  }
}

