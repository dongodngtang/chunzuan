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
          http.get(api.channel_bind_user, data => {
            console.log(data.data)
            if (data.data.code === 0) {
              let channleInfo = data.data.data;
              console.log(channleInfo)
              typeof cb == "function" && cb(channleInfo)
            }

          }, err => {
            console.log(err)
          }, params)
         
        }
      })
    }
  })
}