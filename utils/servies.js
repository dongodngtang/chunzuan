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
          console.log(userInfo)

          let nick = nickName.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
          let params = {
            wxImg: avatarUrl,
            wxNickname: nick,
            address: adr,
            userCode: loginCode.code
          }
          if (channelId != undefined){
            params.channelId = channelId;
          }
          
          http.get(api.channel_bind_user, data => {
            console.log(data.data)
            if (data.data.code === 0) {
              let channleInfo = data.data.data;
          
              typeof cb == "function" && cb(channleInfo)
            }

          }, err => {
            wx.hideLoading()
            wx.showToast({
              title: "加载失败",
              icon:"none"
            })
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