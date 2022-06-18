// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let{userInfo, text}=event
  var check = (text.length<=50)&&(text.length>0)
  var errCode = 0
  if(!check){
    errCode = 1
  }
  return {
    errCode:errCode
  }
}