// main.js
const weights = [0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00,
    1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50, 1.55, 1.60, 1.65, 1.70, 1.75, 1.80, 1.85, 1.90, 1.95, 2.00,
    2.05, 2.10, 2.15, 2.20, 2.25, 2.30, 2.35, 2.40, 2.45, 2.50, 2.55, 2.60, 2.65, 2.70, 2.75, 2.80, 2.85, 2.90, 2.95, 3.00,
    3.05, 3.10, 3.15, 3.20, 3.25, 3.30, 3.35, 3.40, 3.45, 3.50, 3.55, 3.60, 3.65, 3.70, 3.75, 3.80, 3.85, 3.90, 3.95, 4.00];

const weightStr = ['0.50', '0.55', '0.60', '0.65', '0.70', '0.75', '0.80', '0.85', '0.90', '0.95', '1.00',
    '1.05', '1.10', '1.15', '1.20', '1.25', '1.30', '1.35', '1.40', '1.45', '1.50', '1.55', '1.60', '1.65', '1.70', '1.75', '1.80', '1.85', '1.90', '1.95', '2.00',
    '2.05', '2.10', '2.15', '2.20', '2.25', '2.30', '2.35', '2.40', '2.45', '2.50', '2.55', '2.60', '2.65', '2.70', '2.75', '2.80', '2.85', '2.90', '2.95', '3.00',
    '3.05', '3.10', '3.15', '3.20', '3.25', '3.30', '3.35', '3.40', '3.45', '3.50', '3.55', '3.60', '3.65', '3.70', '3.75', '3.80', '3.85', '3.90', '3.95', '4.00'];

const colors = ['D', 'E', 'F', 'G', 'H', 'I'];
const claritys = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2'];
const cuts = ['3EX'];


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
        price:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.postPrice(this.data.value);
    },

    bindHidden: function () {
        var that = this;
        that.setData({
            hidden: !that.data.hidden
        })
    },

    bindChange: function (e) {
      console.log(e.detail.value)
      let arr = e.detail.value;
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
    postPrice:function(arr){

    
      var that = this;
      let weight = weights[arr[0]]
      let color = colors[arr[1]]
      let clarity = claritys[arr[2]]
      let cut = cuts[arr[3]]

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
          if (res.data.code === 200)
          that.setData({
            price: res.data.data
          })
        }
      })
    }
})