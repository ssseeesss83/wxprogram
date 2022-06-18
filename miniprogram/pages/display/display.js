// pages/display/display.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:""
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
    db.collection("AllMessage").get({
      success:res=>{
        this.setData({
          dataObj:res.data.reverse().slice(0,20)
        })
        console.log(res)
      }
    })
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
    db.collection("AllMessage").get({
      success:res=>{
        this.setData({
          dataObj:res.data.reverse().slice(0,20)
        })
        console.log(res)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    db.collection("AllMessage").get({
      success:res=>{
        this.setData({
          dataObj:res.data.reverse().slice(0,20)
        })
        console.log(res)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})