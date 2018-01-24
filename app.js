//app.js
import { getLoginInfo} from './utils/servies.js'

App({
  onLaunch: function () {
    this.getUserInfo(user => {
      console.log('用户信息：' + JSON.stringify(user))
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      getLoginInfo(data=>{
        console.log(data)
        that.globalData.userInfo = data;
      })
    }
  },
  globalData: {
    userInfo: null
  }
})