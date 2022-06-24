// pages/display/display.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:"",
    username:"s",
    backTop:false,
  },

  postcomment(e){
    var messageid = e.currentTarget.dataset.messageid
    var commenttext = e.detail.value.comment
    var commentname = this.data.username
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var time = year+"-"+month+"-"+day+"-"+hour+"时";

    console.log(messageid)
    const _ = db.command
    db.collection("AllMessage").doc(messageid).update({
      data:{
        comment:_.push({
          commentname:commentname,
          commenttext:commenttext,
          commenttime:time
        }),
        commentcount:_.inc(1)
      },
      success: res=>{
          console.log(res)
          wx.showToast({
            title: 'Send Success',
            icon:"success"
          })
      },
      fail: err=>{
        console.log(err)
      }
    })

  },

  refresh(){
    this.onLoad()
    this.goTop()
  },

  getMessage(){
    db.collection("AllMessage").get({
      success:res=>{
        this.setData({
          dataObj:res.data.reverse()
        })
      }
    })
    console.log(this.data.dataObj)
  },

  getUsername(){
    var that = this
    var id
    wx.cloud.callFunction({
      name:'getUser',
    }).then(res =>{
      id = res.result.openid
    }).then(res =>{
      db.collection("User").where({
        _openid:id
      }).get({
        success: res2 =>{
          that.setData({
            username:res2.data[0].name
          })
        }
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUsername()
    this.getMessage()
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
    this.getMessage()
    this.getUsername()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getMessage()
    this.getUsername()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onPageScroll(e){
    if(e.scrollTop>10){
      this.setData({
        backTop:true
      })
    }else{
      this.setData({
        backTop:false
      })
    }
  },
  //返回顶部事件
  goTop(){
    wx.pageScrollTo({
      scrollTop:0,
      duration: 500,
    })
  },
})