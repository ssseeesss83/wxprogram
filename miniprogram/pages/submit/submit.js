// pages/submit/submit.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:"",
    localimg:"",
    inputvalue:""
  },

  addimg(){
    var that = this
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      itemColor: '#ef8383',
      success: function (res) {
        var choseType = res.tapIndex == 0 ? "album" : res.tapIndex == 1 ? "camera":"";
        if (choseType != "") {
          wx.chooseImage({
            sizeType: ['original'],//原图
            sourceType: [choseType],
            count: 1,//每次添加一张
            success: function (res) {
              var info = {
                pic: res.tempFilePaths[0],//存储本地地址
                temp: true,//标记是否是临时图片
              }
              that.setData({
                localimg:info.pic,
              })
              console.log(that.data.localimg)
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  deleteimg(){
    this.setData({
      localimg:''
    })
  },

  formSubmit(e){
    var that = this
    console.log(e)
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var time = year+"-"+month+"-"+day+"-"+hour+"时";
    var random = Math.floor(Math.random()*899999+100000)
    var nickname
    var text = e.detail.value.textarea;
    var id
    var hasimg = false
    var imgsrc
    if(this.data.localimg!=''){
      hasimg = true
    }
    console.log(hasimg)
    if(hasimg){
      let path = 'userimg/' + random + '.jpg'
      wx.cloud.uploadFile({
        cloudPath:path,
        filePath:that.data.localimg,
      }).then(res => {
        imgsrc = res.fileID
        console.log(res.fileID)
      }).then(result =>{
        wx.cloud.callFunction({
          name:'getUser',
          success: res =>{
            id = res.result.openid
            console.log(id)
            db.collection("User").where({
              _openid:id,
            }).get({
              success: res2=>{
                nickname = res2.data[0].name
                console.log(res2.data[0].name)
                console.log(nickname)
    
                db.collection("AllMessage").add({
                  data:{
                    name:nickname,
                    random:random,
                    time:time,
                    content:text,
                    hasimg:hasimg,
                    imgid:imgsrc,
                    comment:[],
                    commentcount:0,
                  }
                })
                wx.showToast({
                  title: 'Send Success',
                  icon:"success"
                });
              },
              fail: res2=>{
                console.log(res2)
              }
            })
          }
        })
      })
    }else{


    wx.cloud.callFunction({
      name:'getUser',
      success: res =>{
        id = res.result.openid
        console.log(id)
        db.collection("User").where({
          _openid:id,
        }).get({
          success: res2=>{
            nickname = res2.data[0].name
            console.log(res2.data[0].name)
            console.log(nickname)

            db.collection("AllMessage").add({
              data:{
                name:nickname,
                random:random,
                time:time,
                content:text,
                hasimg:hasimg,
                comment:[],
                commentcount:0,
              }
            })
            wx.showToast({
              title: 'Send Success',
              icon:"success"
            });
          },
          fail: res2=>{
            console.log(res2)
          }
        })
      }
    })
  }

  this.setData({
    inputvalue:"",
    localimg:""
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