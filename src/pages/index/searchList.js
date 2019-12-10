import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import styles from './searchList.less'

import { AtIcon, AtDivider } from 'taro-ui';
import numeral from 'numeral';

import ShopCar from '@/pages/components/ShopCar';

import reduceIcon from '@/assets/images/icon_reduce@2x.png';
import addIcon from '@/assets/images/btn_add@2x.png';


@connect(({ home, loading }) => ({
  home,
  loading: loading.effects["home/query"],
  submiting: loading.effects["home/service"],
}))
export default class SearchList extends PureComponent {
  config = {
    navigationBarTitleText: '搜索',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      countNum: 0
    }
  }

  componentWillMount(){
    const { searchStr } = this.$router.params
    this.setState({ searchStr })
  }
  componentDidMount() {
    console.log('didMount')
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }
  handleGoodsClick(record) {
    console.log(record)
    // Taro.navigateTo({ url: `/pages/index/goodsInfo?id=123` })
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

  handleScrollLower(e) {
    console.log('lower')
  }

  handleSearchClick({ detail }) {
    console.log(detail)
    
  }


  render() {
    const { loading } = this.props;
    const { countNum, searchStr } = this.state;
    return (
      <View className={styles.page}>
        <View className={styles.searchWrap}>
          <Input onConfirm={this.handleSearchClick} confirm-type='search' placeholderStyle='color: #cccccc' className={styles.searchInput} placeholder="请输入商品名称搜索商品" />
          <View className={styles.cancelBtn}>取消</View>
        </View>

      
        {/* 分类列表 */}
        <View className={styles.scrollWrap}>
          <ScrollView onScrollToLower={this.handleScrollLower} scroll-y style="width: 100%;height: 100%">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => (
                <View onClick={() => this.handleGoodsClick(item)} key={item} className={styles.goodsItem}>
                  <View className={styles.goodsImg}>
                    <Image mode="aspectFill" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571984647092&di=21dddc4cd448aefff57a415949291429&imgtype=jpg&src=http%3A%2F%2Fchuzhou.ah777.com%2Fupload%2Fimage%2F20170214%2F20170214114046_73105.jpg' />
                  </View>
                  <View className={styles.goodsRightPanel}>
                    <View className={styles.goodsName}>澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排澳洲进口原切牛排套餐新鲜黑 椒牛扒牛肉眼后切牛排</View>
                    <View className={styles.priceWrap}>
                      <View>
                        <View className={styles.price}>
                          <Text className={styles.symbol}>¥</Text>{numeral(49).format('0.00')}
                          <Text className={styles.originalPrice}><Text className={styles.symbol}>¥</Text>{numeral(219).format('0.00')}</Text>
                        </View>
                        
                        <View className={styles.sales}>销量 1246</View>
                      </View>

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
            <AtDivider content={loading ? '加载中' : '没有更多了'} fontColor="#cccccc" fontSize={25} height={60} />
          </ScrollView>
        </View>
        <ShopCar />
      </View>
    )
  }
}

