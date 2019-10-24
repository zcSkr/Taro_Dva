import Taro, { Component } from '@tarojs/taro'
import { View, Canvas, Button } from '@tarojs/components'
import WeCropper from 'we-cropper';

import {
  rootUrl,
  getToken,
  setToken,
  setUnionuser,
  getUnionuser,
  uploadUrl
} from "@/config/config";

export default class Cropper extends Component {
  config = {
    navigationBarTitleText: '',
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    enablePullDownRefresh: false,
  };

  state = {
    cropper: null,
  }

  componentDidMount() {
    const { params, preload } = this.$router
    const device = wx.getSystemInfoSync() // 获取设备信息
    const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
    const height = device.windowHeight - 50

    let cropperOpt = {
      id: 'cropper',
      disable: true,
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 200) / 2, // 裁剪框x轴起点
        y: (height - 200) / 2, // 裁剪框y轴期起点
        width: 200, // 裁剪框宽度
        height: 200 // 裁剪框高度
      },
      src: preload ? preload.src || 'http://www.dugoogle.com/uploads/allimg/171024/4_171024162407_1.jpg' : '',
    }
    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (...args) => {
        // console.log('ready', ...args)
      })
      .on('beforeImageLoad', (...args) => {
        // console.log('beforeImageLoad', ...args)
      })
      .on('imageLoad', (...args) => {
        // console.log('imageLoad', ...args)
      })
      .on('beforeDraw', (...args) => {
        // console.log('beforeDraw', ...args)
      })
      .updateCanvas()
  }

  ts(e) {
    this.cropper.touchStart(e)
  }
  tm(e) {
    this.cropper.touchMove(e)
  }
  te(e) {
    this.cropper.touchEnd(e)
  }
  canvasError(e) {
    console.error(e.detail.errMsg)
  }

  pushOrigin(src) {
    this.cropper.pushOrign(src)
  }
  updateCanvas() {
    this.cropper.updateCanvas()
  }
  getCropperImage(fn, ev) {
    this.cropper.getCropperImage(fn)
  }

  handleButtonClick() {
    this.showActionSheet()
  }

  showActionSheet() {
    wx.showActionSheet({
      itemList: ["相机", "相册", "上传头像"],
      itemColor: "#AE1424",
      success: res => {
        console.log(res.tapIndex);
        if (res.tapIndex == 0 || res.tapIndex == 1) {
          let tapIndex = res.tapIndex;
          wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: tapIndex == 0 ? ["camera"] : ["album"],
            success: res => {
              const src = res.tempFilePaths[0];
              this.pushOrigin(src)
            }
          });
        } else if (res.tapIndex == 2) {
          this.getCropperImage(src => {
            if (src) {
              wx.showLoading({ title: "图片上传中", mask: true });
              wx.uploadFile({
                url: uploadUrl,
                filePath: src,
                name: "file",
                header: {
                  token: getToken()
                },
                formData: {
                  type: "headImg"
                },
                success: res => {
                  console.log(res);
                  if (res.statusCode == 200) {
                    let response = JSON.parse(res.data);
                    console.log(response);
                    // 走接口做处理
                    wx.hideLoading();
                    wx.showToast({
                      title: "上传成功",
                      icon: "none"
                    });

                  } else {
                    wx.hideLoading();
                    wx.showToast({
                      title: "上传失败",
                      icon: "none"
                    });
                  }
                }
              });
            } else {
              console.log("获取图片地址失败，请稍后重试");
            }
          })
        }
      }
    });
  }

  render() {
    const device = wx.getSystemInfoSync()
    const width = device.windowWidth
    const height = device.windowHeight - 50
    return (
      <View>
        <Canvas
          disable-scroll={true}
          ontouchstart={this.ts}
          ontouchmove={this.tm}
          ontouchend={this.te}
          style={{ width: `${width}PX`, height: `${height}PX`, backgroundColor: 'rgb(0,0,0,0.8)' }}
          onerror={this.canvasError}
          canvas-id="cropper">
        </Canvas>
        <Button style={{
          width: '100%',
          height: '50PX',
          background: '#f50',
          background: '#ae1424',
          color: 'white',
          textAlign: 'center',
          lineHeight: '50PX',
          borderRadius: 0,
        }} onClick={this.handleButtonClick}>选择操作</Button>
      </View>
    )
  }
}

