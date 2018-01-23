// pages/channel.js

import * as http from '../../utils/http.js'
import api from '../../utils/api.js'
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    infos: [1, 2, 4]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: function (res) {
        wx.login({
          success: function (loginCode) {

            console.log('登录code',loginCode)
            const {userInfo} = res;
            const { city, country, province, avatarUrl, nickName} = userInfo;
            let adr = country+' '+province+' '+city;
            let params = {
              wxImg: avatarUrl,
              wxNickname: nickName,
              address:adr,
              userCode: loginCode.code,
              channelId: 1
            }

            http.get(api.channel_bind_user, data => {
              console.log(data)
            }, err => {
              console.log(err)
            },params)
          }
        })
      }
    })




  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/pages/channel/cannel',
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