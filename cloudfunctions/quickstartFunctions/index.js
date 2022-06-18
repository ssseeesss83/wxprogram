const getOpenId = require('./getOpenId/index');
const checkContent = require('./checkContent/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'checkContent':
      return await checkContent.main(event,context);
  }
};
