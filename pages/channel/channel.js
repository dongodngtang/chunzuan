// pages/channel.js

var appInstance = getApp()
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { channelId } = options;
    this.setData({ channelInfo: appInstance.globalData.userInfo})

    console.log('qudaopage', appInstance.globalData.userInfo)
    

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    const { channelName,id } = appInstance.globalData.userInfo;
    return {
      title: channelName,
      path: `/pages/index/index?channelId=${id}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      },
      imageUrl: "/asserts/home.jpg"
    }

  },
  btnShare: function (e) {
    this.onShareAppMessage(e);
  },
  tabCall:function(e){
    wx.makePhoneCall({
      'phoneNumber': this.data.channelInfo.tel
    })
  }
})