import api from './api.js'

export function get(url,resolve,reject,params={}){
  console.log('http_url:'+url,'params:'+JSON.stringify(params))
  wx.request({
    url: api.base_url+url,
    data:params,
    header:{
      'content-type': 'application/json'
    },
    success:function(res){
      resolve(res)
    },
    fail:function(err){
      reject(err)
    }
  })
}