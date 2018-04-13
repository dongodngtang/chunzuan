import api from './api.js'
import * as http from './http.js'


export function getLoginInfo(cb,channelId){
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
            userCode: loginCode.code
          }
          if (strNotNull(channelId)){
            params.channelId = channelId;
          }
          
          http.get(api.channel_bind_user, data => {
            console.log(data.data)
            if (data.data.code === 0) {
              let channleInfo = data.data.data;
          
              typeof cb == "function" && cb(channleInfo)
            }

          }, err => {
            wx.showToast("加载失败")
          }, params)
         
        }
      })
    }
  })
}

export function strNotNull(str) {
  if (str == undefined || str == null || str.length == 0)
    return false;
  else
    return true;
}