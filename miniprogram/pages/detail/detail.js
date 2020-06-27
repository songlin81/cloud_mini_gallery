const db = wx.cloud.database()
const photos = db.collection('photos')

Page({
  data: {
  },

  onLoad: function (options) {
    photos.doc(options.id).get({
      success:res=>{
        this.setData({
          photo:res.data
        })
      }
    })
  },

  downloadPhoto: function () {
    wx.cloud.downloadFile({
      fileID:this.data.photo.photoUrl,
      success:res=>{
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:res=>{
            wx.showToast({
              title: '保存成功！',
            })
          },
          fail:err=>{
            wx.showToast({
              title: '保存失败！',
              icon:'none'
            })  
          }
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  }, 

  previewPhoto: function () {
    var urls = [this.data.photo.photoUrl]
    wx.previewImage({
      urls: urls,
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
    return {
      title:'给你分享一张好看的图片',
      path:'pages/detail/detail?id='+this.data.photo._id
    }
  }
})