// pages/channel.js
import * as http from '../../utils/http.js'
import api from '../../utils/api.js'
var appInstance = getApp()
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channleInfo:{},
    json:'sdf'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let params = appInstance.globalData.userInfo;
    http.get(api.channel_bind_user, data => {
      console.log(data.data)
      if(data.data.code === 0){
        let channleInfo = data.data.data;
        console.log(channleInfo)
        this.setData({ channleInfo: channleInfo})
      }
     


    }, err => {
      console.log(err)
    }, params)


  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/pages/channel/channel?channelId=1',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  btnShare: function (e) {
    this.onShareAppMessage(e);
  }
})