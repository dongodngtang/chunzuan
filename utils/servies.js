import api from './api.js'
import * as http from './http.js'


export function getLoginInfo(cb){
  wx.login({
    success: function (loginCode) {
      console.log(loginCode)
      wx.getUserInfo({
        success: function (res) {
          const { userInfo } = res;
          const { city, country, province, avatarUrl, nickName } = userInfo;
          let adr = country + ' ' + province + ' ' + city;
          let params = {
            wxImg: avatarUrl,
            wxNickname: nickName,
            address: adr,
            userCode: loginCode.code,
            channelId:1
          }
          typeof cb == "function" && cb(params)
        }
      })
    }
  })
}