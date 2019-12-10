import Taro, { PureComponent } from '@tarojs/taro'
import { View, Input, Image, Text, Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './comment.less'

import { AtRate, AtImagePicker } from 'taro-ui';
import numeral from 'numeral';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class Comment extends PureComponent {
  config = {
    navigationBarTitleText: '评价',
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
        }]
    }
  }


  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handleButtonClick() {
  }

  handleRateChange(val,record){
    // console.log(val, record)
    this.setState({ rate: val })
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

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.page}>

        {
          [1,2].map((item,index) => (
            <View key={item} className={styles.commentWrap}>
              <View className={styles.goodsItem}>
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
              <View className={styles.commentStar}>
                <View className={styles.label}>星级评价</View>
                <AtRate onChange={val => this.handleRateChange(val, 1)} margin={20} size={25} value={this.state.rate || 5} />
              </View>
              <View className={styles.commentContent}>
                <View className={styles.title}>更多感受</View>
                <Textarea className={styles.textArea} autoHeight placeholderStyle="color: #aaaaaa" maxlength={500} placeholder="期待您真诚的评价......." />
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
            </View>
          ))
        }

        <View onClick={this.handleButtonClick} className={styles.submitBtn}>提交</View>

      </View>
    )
  }
}

