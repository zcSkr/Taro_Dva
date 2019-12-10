import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Button, Swiper, SwiperItem, Text, Textarea } from '@tarojs/components'
import styles from './business.less';
import { AtIcon, AtDivider, AtButton } from 'taro-ui';

export default class AddAddress extends PureComponent {
  config = {
    navigationBarTitleText: '商务合作',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };


  componentDidMount() {
    console.log('didMount', this.$router)
    const { dispatch } = this.props;
    // dispatch({ type: 'home/query' })
  }

  handleButtonClick = () => {

  }

  render() {
    const { loading } = this.props;
    return (
      <View className={styles.page}>
        <View className={styles.panelListWrap}>
          <View className={styles.panelList}>
            <View className={styles.label}>姓名</View>
            <View className={styles.rightPanel}>
              <Input maxLength={20} className={styles.textInput} placeholder='请填写姓名' />
            </View>
          </View>
          <View className={styles.panelList}>
            <View className={styles.label}>电话</View>
            <View className={styles.rightPanel}>
              <Input type='number' maxLength={11} className={styles.textInput} placeholder='请输入电话' />
            </View>
          </View>
        </View>
        <Textarea className={styles.textArea} placeholderStyle='color: #BBBBBB' maxLength={500} placeholder='请输入您的建议' />

        <AtButton onClick={this.handleButtonClick} className={styles.submitBtn}>提交</AtButton>
      </View>
    )
  }
}

