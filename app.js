//app.js
import { getLoginInfo} from './utils/servies.js'

App({
  onLaunch: function () {
   
  },
  getUserInfo: function (cb, channelId) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      getLoginInfo(data=>{
        typeof cb == "function" && cb(data)
        that.globalData.userInfo = data;
      }, channelId)
    }
  },
  globalData: {
    userInfo: null
  }
})