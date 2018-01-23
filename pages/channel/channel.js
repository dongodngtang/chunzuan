// pages/channel.js

//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_info: {},
        infos:[1,2,4]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      wx.login({
        success: function (loginCode) {
          var appid = 'wx33013d83315f3550'; //填写微信小程序appid  
          var secret = '4a8991030ecb5d08c37637647fe718c3'; //填写微信小程序secret  

          //调用request请求api转换登录凭证  
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data) //获取openid  
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
    btnShare:function(e){
      this.onShareAppMessage(e);
    }
})