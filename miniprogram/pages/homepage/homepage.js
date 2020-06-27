const db = wx.cloud.database()
const photos = db.collection('photos')

Page({
  data: {
  },

  onLoad: function (options) {
    let openid = options.id
    wx.showLoading({
      title: '数据加载中',
    })
    photos.orderBy('addDate','desc').where({
      _openid:openid
    }).get({
      success:res=>{
        this.setData({
          photoList:res.data
        })
        wx.hideLoading()
      }
    })
  },

  onReady: function () {
  },

  onShow: function () {
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