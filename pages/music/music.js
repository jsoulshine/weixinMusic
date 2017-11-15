// pages/music/music.js
Page({
  onReady: function (e) {
    wx.showLoading({
      title:"正在努力加载中！",
      mask:true
    })
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
    var self = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        type:self.data.type,
        size:self.data.size,
        offset:self.data.offset
      },
      success: function (res) { 
        let list = res.data.song_list;
        self.setData({
          musicData:list
        })
        wx.hideLoading()
        console.log(self.data.musicData);
      }
    })
  },
  data: {
    type:1,
    size:5,
    offset:1,
    musicData:[],
    nowPlay:{
      poster:'',
      name:'暂无',
      author:'暂无',
      src:''
    }
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  chooseMusic:function(ev){
    let musicId = ev.currentTarget.dataset.id;
    let self = this;
    wx.request({
      url: `http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=${musicId}`,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let {songinfo,bitrate} = res.data;
        self.setData({
          nowPlay:{
            poster: songinfo.pic_small,
            name:songinfo.title,
            author:songinfo.author,
            src: bitrate.show_link
          }
        })
        self.audioCtx.seek(0)  //立即播放
      }
    })
  },
  lookDetail:function(ev){
    wx.showActionSheet({
      itemList: ['分享到', '下载到本地', '别点'],
      success: function (res) {
        switch(res.tapIndex){
          case 0:{
            wx.showToast({
              title: '分享成功',
              icon: 'success',
              duration: 2000
            });
          };break;
          case 1:{
            wx.showToast({
              title: '下载成功',
              icon: 'success',
              duration: 2000
            });
          };break;
          case 2:{
            wx.showToast({
              title: '让你别点你还点！',
              icon: 'loading',
              duration: 2000
            });
            wx.vibrateLong()
          };break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})











// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })