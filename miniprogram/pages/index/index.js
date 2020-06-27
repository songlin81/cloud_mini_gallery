var app = getApp()

const db = wx.cloud.database()
const photos = db.collection('photos')

Page({
  data: {
  },

  clickGetUserInfo: function (e) {
    //console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo

    if (app.globalData.openid==null){
      wx.cloud.callFunction({
        name:'getOpenId',
        complete:res=>{
          //console.log(res.result.openid)
          app.globalData.openid = res.result.openid
        }
      })
    }
  },

  goToAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  onLoad: function (options) {
  },

  onReady: function () {
  },

  onShow: function () {
    photos.orderBy('addDate','desc').get({
      success:res=>{
        this.setData({
          photoList:res.data
        })
      }
    })
  },

  onHide: function () {
  },

  onUnload: function () {
  },

  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
  },

  onShareAppMessage: function () {
  }
})