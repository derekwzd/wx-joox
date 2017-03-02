var app = getApp()
var gd  = app.globalData

Page({
  data: {
    list : [],
    info : {},
    
    // globalStop,
    // curplay,
  },

  // 初始化数据
  onLoad: function(options){
    let { id="0" } = options
    this.setData({
      list        : gd.songList,
      info        : gd.editor_pick[parseInt(id)],
      globalStop  : gd.globalStop,
      curplay     : gd.curplay,
      disc_offset : "-30rpx",
      id          : id,
    })
  },
  onShow: function(){
    this.setData({
      globalStop  : gd.globalStop,
      curplay     : gd.curplay,
      disc_offset : "-30rpx"
    })
  },

  // bar-player 组件的三个操作
  homeBtn: function(){
      if( this.data.globalStop ){
          this.play()
      }
      else {
          this.goPlayer()
      }
  },
  play: function(){
      var that = this
      app.restartmusic((gb)=>{
          that.setData({
              globalStop : gb.globalStop,
              curplay    : gb.curplay,
          })
      });
  },
  pause: function(){
      var that = this
      that.setData({ 
          globalStop : true,
      })
      app.pause();
  },

  // 选择歌曲播放
  playSong:function(e){
    var that = this
    let { id, index } = e.currentTarget.dataset
    index = parseInt(index)
    
    // app.setList({
    //   list: gd.songList,
    //   index: index,
    // })

    this.setData({
      globalStop : false,
      curplay: gd.songList[index]
    })
    app.playSong(id)
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

  playPreview: function(){
    let that = this
    app.playShuffle(0, (gb)=>{
      that.setData({
        globalStop: gb.globalStop,
        curplay: gb.curplay,
      })
    })
  },


  //用于模拟右拉下一首 效果不佳 
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
  },
  // end


  goPlayer: app.goPlayer,
  detail: function(e){
    var that = this
    wx.showActionSheet({
      itemList: ['Share the Song'],
      success: function(res) {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:{
              that.share();
              break;
            }
          
            default:
              break;
          }
        }
      }
    })
  },

  share: function(){
    wx.showActionSheet({
      itemList: ['WeChat Friends', 'Facebook'],
      success: function(res) {
        if( !res.cancel ){
          var content = (res.tapIndex == 1)? "成功分享至Facebook":"成功分享至Wechat"
          wx.showModal({
            content: content,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  },
  
  onShareAppMessage: function () { 
    return {
      title: "JOOX 歌单",
      desc: this.data.info.wording,
      path: '/pages/album/album?id=' + this.data.id
    }
  }
})