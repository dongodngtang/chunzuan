// main.js
// const weights = [0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00,
//   1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50, 1.55, 1.60, 1.65, 1.70, 1.75, 1.80, 1.85, 1.90, 1.95, 2.00,
//   2.05, 2.10, 2.15, 2.20, 2.25, 2.30, 2.35, 2.40, 2.45, 2.50, 2.55, 2.60, 2.65, 2.70, 2.75, 2.80, 2.85, 2.90, 2.95, 3.00,
//   3.05, 3.10, 3.15, 3.20, 3.25, 3.30, 3.35, 3.40, 3.45, 3.50, 3.55, 3.60, 3.65, 3.70, 3.75, 3.80, 3.85, 3.90, 3.95, 4.00];
//
// const weightStr = ['0.50', '0.55', '0.60', '0.65', '0.70', '0.75', '0.80', '0.85', '0.90', '0.95', '1.00',
//   '1.05', '1.10', '1.15', '1.20', '1.25', '1.30', '1.35', '1.40', '1.45', '1.50', '1.55', '1.60', '1.65', '1.70', '1.75', '1.80', '1.85', '1.90', '1.95', '2.00',
//   '2.05', '2.10', '2.15', '2.20', '2.25', '2.30', '2.35', '2.40', '2.45', '2.50', '2.55', '2.60', '2.65', '2.70', '2.75', '2.80', '2.85', '2.90', '2.95', '3.00',
//   '3.05', '3.10', '3.15', '3.20', '3.25', '3.30', '3.35', '3.40', '3.45', '3.50', '3.55', '3.60', '3.65', '3.70', '3.75', '3.80', '3.85', '3.90', '3.95', '4.00'];


const weights = [0.5, 0.8, 1, 1.5, 2, 3, 4];

const weightStr = ['0.5', '0.8', '1', '1.5', '2', '3', '4'];

const colors = ['D', 'E', 'F', 'G', 'H', 'I'];
const claritys = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2'];
const cuts = ['3EX'];
var appInstance = getApp();
import { strNotNull } from '../../utils/servies.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weights: weightStr,
    colors: colors,
    claritys: claritys,
    cuts: cuts,
    value: [2, 1, 2, 0],
    hidden: false,
    price: '',
    channelId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.postPrice(this.data.value);

    const {channelId} = options;
    appInstance.getUserInfo(ret => { }, channelId)
    this.setData({
      channelId
    })
   
  },

  bindHidden: function () {
    var that = this;
    that.setData({
      hidden: !that.data.hidden
    })
  },
  btnRelease: function () {

    let toChannel = appInstance.globalData.userInfo != null;
    let channelId = this.data.channelId;
    if (strNotNull(channelId) || toChannel){
      wx.showLoading({
        title: '加载中...',
      })
      appInstance.getUserInfo(ret => {
        console.log('渠道商：', ret)
        wx.navigateTo({
          url:  `../channel/channel?channelId=${channelId}`
        })
        wx.hideLoading()
      }, channelId)
    }else{
      wx.navigateTo({
        url: "../contact/contact"
      })
    }
      
  },
  bindChange: function (e) {
    console.log(e.detail.value);
    var arr = e.detail.value;
    this.postPrice(arr);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  postPrice: function (arr) {


    var that = this;
    var weight = weights[arr[0]];
    var color = colors[arr[1]];
    var clarity = claritys[arr[2]];
    var cut = cuts[arr[3]];

    wx.request({
      url: 'https://www.ggehk.com/touziPass/getReportPrice.html', //仅为示例，并非真实的接口地址
      data: {
        'cut': cut,
        'weight': weight,
        'color': color,
        'clarity': clarity
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200)
          that.setData({
            price: that.formatMoney('' + res.data.data)
          })
      }
    })
  },
  formatMoney: function (s) {
    if (/[^0 - 9\.] /.test(s)) return "invalid value";
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
      s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return "￥" + s.replace(/^\./, "0.")
  }
})