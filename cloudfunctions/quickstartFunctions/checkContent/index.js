const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  let{userInfo, text}=event
  var check = (text.length<=50)
  var errCode = 0
  if(!check){
    errCode = 1
  }
  return {
    errCode:errCode
  };
};