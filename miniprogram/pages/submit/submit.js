// pages/submit/submit.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:""
  },

  formSubmit(e){
    console.log(e)
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var time = year+"-"+month+"-"+day+"-"+hour+"时";
    var random = Math.floor(Math.random()*89999+10000)
    var text = e.detail.value.textarea;
    wx.cloud.callFunction({
      name:'contentCheck',
      data:{
        text:text
      },
      success(res){
        if(res.result.errCode!=1){
          db.collection("AllMessage").add({
            data:{
              random:random,
              time:time,
              content:text
            }
          })
          wx.showToast({
            title: 'Send Success',
            icon:"success"
          });
        }else{

        }
      },
      fail(err){
        console.log(err);
        wx.showToast({
          title: 'Error',
          icon:'error'
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})