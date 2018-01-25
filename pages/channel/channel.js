// pages/channel.js

var appInstance = getApp()
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let that = this;
    appInstance.getUserInfo(data=>{
     
      that.setData({
        channelInfo: data
      })
    })
 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: that.data.channelInfo.channelName,
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
  },
  tabCall:function(e){
    wx.makePhoneCall({
      'phoneNumber': channelInfo.tel
    })
  }
})