var app = getApp()
var gd = app.globalData
Page({
  data: {
    disc_offset : "-30rpx",
    editor_pick:gd.editor_pick,
    imgUrls: [
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/9/b/3cc3ffef4c96259b.jpg',
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/7/e/ea23b19e06d15f7e.jpg',
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/9/4/9b7d5717bd89e494.jpg',
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/f/3/7ca8c8b134229cf3.jpg',
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/f/c/f00c3283f19a86fc.jpg',
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/3/1/7c3f1a6bcb760d31.jpg',
      'http://imgcache.wechat.com/music/joox/photo_my_zh_cn/focus_1000/3/8/44414e886a2b6a38.jpg',
    ],
  },
  homeBtn: function(){
      if( this.data.globalStop ){
          this.play()
      }
      else {
          this.goPlayer()
      }
  }, 
  pause: function(){
      var that = this
      that.setData({ 
          globalStop : true,
      })
      app.pause();
  },
  play: function(){
      var that = this
      app.restartmusic((gb)=>{
          that.setData({
              globalStop : gb.globalStop,
              curplay    : gb.curplay
          })
      });
  }, 
  goPlayer: app.goPlayer,
  
  touchstart: function(e){
    let clientX = e.touches[0].clientX
    this.setData({
      initClientX : clientX,
    })
  },

  touchend: function(e){
    // if( disc_offset.splite("rpx")[0] )
    var offset = Number(this.data.disc_offset.split("rpx")[0])
    if( offset > 100){
      this.playNext()
    }
    this.setData({
      initClientX :0,
      disc_offset : "-30rpx"
    })
  },

  playShuffle: function(e){
    if( !this.state.globalStop ){
       let { clientX, disc_offset } = this.data
        var offset = e.touches[0].clientX - this.data.initClientX
        if( offset < 0 ){
          offset = 0
        } else if( offset > 120) {
          offset = 120
        }
        
        this.setData({
          disc_offset: offset + "rpx" 
        })
    }
  },

  goVideo: function (e) {
    let videoInd = e.currentTarget.id.split('-')[1];
    let url = '../video/video?id=' + videoInd
    wx.navigateTo({ url })
    
    // var that = this
    // //进来之前先关闭其他在播放的视频
    // if( that.videoContext ){
    //   that.videoContext.pause();
    //   var curData = that.data.video;
    //   for( var i=0; i<curData.length; i++){
    //     curData[i]['display'] = 'none';
    //     curData[i]['imgDisplay'] = 'block';
    //   }
    //   that.setData({
    //     video: curData
    //   })
    // }

    // // 获得视频索引
    // var videoInd = e.currentTarget.id.split('-')[1];
    // //获取data中的video数据
    // var curData = that.data.video;
    // curData[videoInd]['display'] = 'block';
    // curData[videoInd]['imgDisplay'] = 'none';
    // that.setData({
    //   video: curData
    // })

    // //获取对应视频上下文
    // that.videoContext = wx.createVideoContext('video-' + videoInd);
    // //播放视频
    // that.videoContext.play();
  },
  playNext: function(){
    let that = this
    app.playShuffle(1, (gb)=>{
      that.setData({
        globalStop: gb.globalStop,
        curplay: gb.curplay,
      })
    })
  },
  onLoad: function () {
    var that  = this
    let video = [
      {
        img: "http://image.joox.com/JOOXcover/0/8e44e68be75cf6cc/300",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"夢妮妲音樂治癒：跳出真實的自己"
      },
      {
        img: "http://image.joox.com/JOOXcover/0/b70ba8b8e4f8692a/300",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"咩事姐娛樂快訊：強勢賀台劇 絕密曝光"
      },
      {
        img: "http://image.joox.com/JOOXcover/0/af4865cfe459803e/300",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"鐵樹蘭：發出怒吼去自白"
      },
      {
        img: "http://image.joox.com/JOOXcover/0/7a76236dce620ecd/300",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"Bruno Mars 24K金曲王者"
      },
    ]
    video = video.map( item =>{
      let result = item
      return result
    })
    this.setData({video})
    this.getSongInfo()
  },

  getSongInfo: function(){
    let that = this
    let result = app.getInfo();
    let { globalStop, curplay } = result

    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
        globalStop,
        curplay,
      })
    })
  },
  onShow: function(){
    this.getSongInfo()
  },
  goAlbum: (e) => {
    let url = '../album/album?id=' + e.currentTarget.id
    wx.navigateTo({ url })
  },
  goPerson: (e)=>{
    let url = '../person/person'
    wx.navigateTo({ url })
  },
})