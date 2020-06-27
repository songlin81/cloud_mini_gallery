var app = getApp()

const db = wx.cloud.database()
const photos = db.collection('photos')

function formatDate() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return year + '-' + month + '-' + day
}

Page({
  data: {
  },

  upload: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        const cloudPath = Math.floor(Math.random() * 1000000) + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            wx.showToast({
              title: '上传成功',
              duration: 3000
            })

            let userInfo = app.globalData.userInfo
            let today = formatDate()

            photos.add({
              data: {
                photoUrl: res.fileID,
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName,
                country: userInfo.country,
                province: userInfo.province,
                addDate: today
              },
              success: res => {
                this.getHistoryPhotos()
                console.log('uploaded')
              },
              fail: e => {
                console.log(e)
              }
            })
          },
          fail: e => {
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
          }
        })
      },
      fail: e => {
        console.log(e)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  getHistoryPhotos: function() {
    let openid = app.globalData.openid
    photos.where({
      _openid: openid
    }).get({
      success: res => {
        this.setData({
          historyPhotos: res.data
        })
      }
    })
  },

  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    console.log(app.globalData.openid)
    this.getHistoryPhotos()
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