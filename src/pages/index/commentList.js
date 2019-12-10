import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './commentList.less'

import { AtIcon, AtDivider, AtRate } from 'taro-ui';
import numeral from 'numeral';
import moment from 'moment';

import ShopCar from '@/pages/components/ShopCar';
import Star from '@/pages/components/Star';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class CommentList extends PureComponent {
  config = {
    navigationBarTitleText: '商品评价',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    console.log('didMount', this.$router)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handlePreviewImg(current, urls) {
    Taro.previewImage({
      current: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572328037950&di=2fbe52ed616ca59449cf1f7b44353841&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212183638_BYeeT.jpeg',
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572328037950&di=2fbe52ed616ca59449cf1f7b44353841&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212183638_BYeeT.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572328037950&di=2fbe52ed616ca59449cf1f7b44353841&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212183638_BYeeT.jpeg']
    })
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    Taro.stopPullDownRefresh()
  }

  onPullDownRefresh(){
    console.log(123)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }
  onReachBottom(){
    console.log('onReachBottom')
  }

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.page}>
        <View className={styles.commentWrap}>
          {
            [[1,2], [1,2,3,4],[1,2,3],[1]].map((item, index) => (
              <View key={item} className={styles.commentItem}>
                <View className={styles.header}>
                  <View className={styles.person}>
                    <View className={styles.headImg}><Image src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572328037950&di=2fbe52ed616ca59449cf1f7b44353841&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212183638_BYeeT.jpeg' mode='aspectFill' /></View>
                    <View>
                      <View className={styles.name}>邓鹤林</View>
                      <View className={styles.time}>{moment().format('YYYY-MM-DD')}</View>
                    </View>
                  </View>
                  <AtRate size={16} value={4} />
                </View>
                <View className={styles.content}>
                  为了圣诞party买了牛排，口感不错。下次还会再买的，很满意的一次购物。
                  </View>
                <View className={styles.footer}>
                  {
                    item.map((childItem, index) => (
                      <View key={childItem} onClick={() => this.handlePreviewImg(childItem)} className={styles.imgWrap}><Image src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572328037950&di=2fbe52ed616ca59449cf1f7b44353841&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212183638_BYeeT.jpeg' mode='aspectFill' /></View>
                    ))
                  }
                </View>
              </View>
            ))
          }
          {/* <View style={{background: '#fff'}}> */}
            <AtDivider content={loading ? '加载中' : '没有更多了'} fontColor="#cccccc" fontSize={25} height={80} />
          {/* </View> */}
        </View>

      </View>
    )
  }
}

