import Taro, { PureComponent } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Radio, RadioGroup, Textarea } from '@tarojs/components'
import styles from './feedback.less';
import { AtIcon, AtDivider, AtButton, AtImagePicker } from 'taro-ui';
import { uploadUrl, getToken, fileUrl } from '@/config/config';

@connect(({ mine, loading }) => ({
  mine,
  submiting: loading.effects['mine/service']
}))
export default class Feedback extends PureComponent {
  config = {
    navigationBarTitleText: '意见反馈',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      entity: {
        type: null,
        content: '',
        files: []
      },
    }
  }

  handleButtonClick = () => {
    const { dispatch } = this.props;
    const { entity } = this.state;
    console.log(entity)
    console.log(this.textArea)
    return
    this.handleCheckForm(entity, ({ err }) => {
      if(err) return
      dispatch({
        type: 'mine/service',
        payload: {
          service: 'feedback',
          data: {
            type: entity.type,
            content: entity.content,
            path: entity.files.map(item => item.url).join(','),
          }
        },
        onSuccess: res => {
          if(res.resultState == '1') {
            this.setState({ type: null, content: '', files: [] })
            Taro.showToast({ title: '反馈成功', icon: 'none', mask: true })
          } else {
            Taro.showToast({ title: res.msg, icon: 'none', mask: true })
          }
        }
      })
    })
  }

  handleCheckForm = (fields,callback) => {
    if (!fields.type) {
      Taro.showToast({ title: '请选择反馈类型!', icon: 'none' })
      callback({ err: true })
      return
    }
    if (!fields.content) {
      Taro.showToast({ title: '请输入反馈内容!', icon: 'none' })
      callback({ err: true })
      return
    }
  }

  handleChangeEntity = (action, e) => {
    console.log(action,e)
    let { entity } = this.state;
    entity[action] = e.detail.value
    this.setState({ entity })
  }

  handleUploadChange = (files, operationType, index) => {
    // console.log(files, operationType, index)
    let { entity } = this.state;
    // return
    if (operationType == 'add') {
      if (files.length >= 6) {
        Taro.showToast({
          title: '最多上传6张图片',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        return
      }
      Taro.showLoading({ title: '图片上传中' })
      let count = 0
      let uploadFiles = files.filter(item => item.file)
      uploadFiles.forEach(item => {
        Taro.uploadFile({
          url: uploadUrl,
          filePath: item.file.path,
          name: "file",
          header: {
            token: getToken()
          },
          formData: {
            type: "feedback"
          },
          success: res => {
            if (res.statusCode == 200) {
              const response = JSON.parse(res.data);
              // console.log(response);
              entity.files.push({ url: response.data })
              count++
              this.setState({ entity: { ...entity } })
              if (count >= uploadFiles.length) {
                Taro.hideLoading();
              }
            } else {
              Taro.hideLoading();
              Taro.showToast({
                title: "上传失败",
                icon: "none",
                mask: true
              });
            }
          }
        });
      })
    } else if (operationType == 'remove') {
      entity.files.splice(index,1)
      this.setState({ entity })
    }
    
    // this.setState({ files })
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
    const { submiting } = this.props;
    const { entity } = this.state;
    // console.log(entity.files.map(item => ({ ...item, url: fileUrl + item.url })),123)
    return (
      <View className={styles.page}>
        <RadioGroup value={entity.type} onChange={this.handleChangeEntity.bind(this, 'type')}>
          <View className={styles.radioWrap}>
            <Radio value='1' color="#F9994D">功能建议</Radio>
            <Radio value='2' color="#F9994D">购买遇到问题</Radio>
            <Radio value='3' color="#F9994D">性能建议</Radio>
            <Radio value='4' color="#F9994D">其他</Radio>
          </View>
        </RadioGroup>
        <Textarea onChange={e => console.log(e,123)} onInput={e => console.log(e)} onBlur={this.handleChangeEntity.bind(this, 'content')} onConfirm={this.handleChangeEntity.bind(this, 'content')} className={styles.textArea} placeholderStyle='color: #BBBBBB' maxLength={500} placeholder='请输入您的建议' />

        <View className={styles.uploadWrap}>
          <AtImagePicker
            multiple
            mode='aspectFill'
            showAddBtn={true}
            count={6}
            length={3}
            files={entity.files.map(item => ({ ...item, url: fileUrl + item.url }))}
            onChange={this.handleUploadChange}
            onFail={this.handleUploadFail}
            onImageClick={this.handlePreviewImage}
          />
        </View>



        <AtButton loading={submiting} onClick={this.handleButtonClick} className={styles.submitBtn}>提交</AtButton>
      </View>
    )
  }
}

