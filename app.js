//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  goPlayer: () => {
    wx.navigateTo({
      url: '../player/player'
    })
  },

  // 请求mp3信息，并存入globalData，调用restartmusic开始播放
  playSong:function( songid ){
    var that = this
    wx.stopBackgroundAudio()

    //network
    wx.request({
      url: `https://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${songid}`,
      success:( res )=>{
        var result = JSON.parse( res.data.substring(18, res.data.length-1) ) 

        that.globalData.curplay = {
          cover: result.imgSrc,
          title: result.msong,
          author: result.msinger,
          mp3Url: result.mp3Url,
          songid,
        } 
        that.restartmusic()
      }
    })
  },
  
  playShuffle( type, cb ){
    let { listIndex, songList } = this.globalData

    if( type == 1 ){// forward
      listIndex = ( listIndex == songList.length-1 ) ? 0 : listIndex+1
    } else if ( type==-1 ){
      listIndex = ( listIndex == 0 ) ? songList.length-1 : listIndex-1
    }
    cb && cb({
      globalStop: false,
      curplay: songList[listIndex]
    })
    // 升级并返回
    this.globalData.listIndex = listIndex
    this.globalData.globalStop = false
    this.globalData.curplay = songList[listIndex]

    this.playSong( this.globalData.curplay.songid )
  },

  restartmusic: function ( cb ) {
    var that            = this;
    var m               = this.globalData.curplay;
    var currentPosition = m.currentPosition || 0;

    wx.playBackgroundAudio({
      dataUrl     : m.mp3Url,
      title       : m.title,
      coverImgUrl : m.cover,
      success     : function (res) {
        // wx.seekBackgroundAudio({ position: currentPosition });
        that.globalData.globalStop = false;
        cb && cb(that.globalData);
        console.log( "play background audio success")
      },
      fail: function () {
        console.warn( "play failed" )
      }
    })
  },

  pause(cb){
    let that = this
    this.globalData.globalStop = true
  
    wx.pauseBackgroundAudio();

    // this.getSongInfo((res)=>{
    //   console.log( "set currentPosition", res.currentPosition );
    //   this.globalData.curplay['currentPosition'] = res.currentPosition
    //   this.globalData.globalStop = true;
    //   cb && cb(that.globalData)
    // })
  },

  // 考虑效率 去掉getSongInfo的功能

  // getSongInfo(cb){
  //   var that = this
  //   wx.getBackgroundAudioPlayerState({
  //     success: function (res) {
  //       // duration 总时长
  //       // currentPosition 当前播放位置
  //       // status 播放状态
  //       // downloadPercent 下载状况 100 即为100%
  //       // dataUrl 当前播放音乐地址
  //       cb(res)
  //     },
  //     fail: function (res) {
  //         console.log('fail', res)
  //     }
  //   })
  // },
  getInfo(){
    let { globalStop, curplay, listIndex, songList } = this.globalData
    return {
      globalStop,
      curplay,
      listIndex,
      songList
    }
  },
  setList({list, index}){
    this.globalData.songList  = list
    this.globalData.listIndex = parseInt(index)
    this.globalData.curplay   = list[parseInt(index)]
  },
  whenPlayerIn(id){
    this.globalData.listIndex = id
    this.globalData.curplay = this.globalData.songList[id]
  },
  globalData:{
    songList : [
      {
        cover: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        title: '此时此刻',
        author: '许巍',
        mp3Url: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      },
      {
        "cover": "http://imgcache.wechat.com/music/photo/mid_album_300/4/x/000taB7T4aOf4x.jpg",
        "title": "Love You On Christmas",
        "author": "Yerin Baek",
        "songid": "F1WlfO0DNv33Tn5htnAiSw=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/6/5/bbe5d101779c6c65.jpg",
        "title": "It's You",
        "author": "申勇在",
        "songid": "rTp6N2NNJS2lZAxWL1VGTQ=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/8/6/9b9d2ab7ecb52a86.jpg",
        "title": "Just Because",
        "author": "白雅言",
        "songid": "toIb+V89Tnm_y_UDKL04gg=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo_hk/mid_album_300/5/0/be490879c3828850.jpg",
        "title": "It's Christmas Day",
        "author": "Roy Kim",
        "songid": "jCqHQsJ9xjnkmLJJ6QjQyw=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/0/a/7223bd0d5c89cf0a.jpg",
        "title": "Wish Tree - Winter Garden",
        "author": "Red Velvet",
        "songid": "BZt0tXYCaVNMGUbMBMXR5A=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo_hk/mid_album_300/6/e/dc7576c367d5ba6e.jpg",
        "title": "The Winter's Tale",
        "author": "BTOB",
        "songid": "OP5gvXEqMLaU+7xXUw+DiQ=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/1/3/7913289862f43413.jpg",
        "title": "First Christmas",
        "author": "Standing Egg",
        "songid": "HoOFGedMMck9qdZKaNYMgA=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/6/a/a8861fa309edd26a.jpg",
        "title": "On The Snow",
        "author": "EXO",
        "songid": "mrAP3lhunNoeMc0gtRNjnA=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/f/e/23cd9cb6929a64fe.jpg",
        "title": "Confession Song",
        "author": "GOT7",
        "songid": "nwgrO+LlqOD0NQnpqSPSJw=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/a/7/b9220d205ca130a7.jpg",
        "title": "Love Falls",
        "author": "李宗泫",
        "songid": "1u7E5mUqWnw2FpWIbXsODg=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/7/4/e1cf8e02a77da874.jpg",
        "title": "Dear Santa",
        "author": "Taetiseo",
        "songid": "N1cjRZLTSw98fewdaZyyHQ=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/c/b/2c8ed74de61c9ecb.jpg",
        "title": "Snowy Day (feat. Rex.D)",
        "author": "Romantic City",
        "songid": "1trU+Qf5fwy6e_OvMUYaUQ=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/9/e/a206a5314a126e9e.jpg",
        "title": "Love In The Air",
        "author": "徐仁國",
        "songid": "4PMrAhSNsGzi6NAyK3n22w=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo_hk/mid_album_300/6/e/dc7576c367d5ba6e.jpg",
        "title": "Because It's Christmas",
        "author": "BTOB",
        "songid": "xUYA5hgP8kRMLD12HZvfwg=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo_hk/mid_album_300/0/d/df73ea7084a1ab0d.jpg",
        "title": "Still You",
        "author": "銀赫&東海",
        "songid": "FlHMUQNO1GnJqK02rAh9Xw=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/7/4/e1cf8e02a77da874.jpg",
        "title": "Merry Christmas",
        "author": "Taetiseo",
        "songid": "4wxXXpqoxmXPayZdbJ1rAg=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/5/2/fd8d9d55e68ae752.jpg",
        "title": "Christmas Is Here",
        "author": "ATBOs",
        "songid": "bJekSgbfHVAyOCqiURLunA=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/6/b/afd066917ecad36b.jpg",
        "title": "The Day",
        "author": "K.will",
        "songid": "Mb6hopIx__d8KX5jPq4rYQ=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/a/2/68ef1c8955b9c9a2.jpg",
        "title": "Stronger",
        "author": "EXO",
        "songid": "9BOB0qyefO2i4c70HboMRw=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/f/4/3c076de76a3a44f4.jpg",
        "title": "Winter Tears",
        "author": "柳俊相",
        "songid": "NAmxGrGv7ACfhc_BN69A7w=="
      },
      {
        "cover": "http://imgcache.wechat.com/music/joox/photo/mid_album_265/f/f/7e3caaf2a9426cff.jpg",
        "title": "Christmas Day",
        "author": "Tourist",
        "songid": "VtVc8Hr3fO2sCrkrEdV+PQ=="
      }
    ],
    listIndex:0,
    globalStop: true,
    curplay:{
      cover: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      title: '此时此刻',
      author: '许巍',
      mp3Url: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    editor_pick:[
      {
        id: 1,
        img: "http://imgcache.wechat.com/music/joox/photo_my_zh_cn/toplist_300/c/e/69324303fce88fce.jpg",
        wording:"蓝色大海的传说",
      },
      {
        id:2,
        img: "http://imgcache.wechat.com/music/joox/photo_my_zh_cn/toplist_300/e/d/5d9f686d9e43e9ed.jpg",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"最迷离走心的旋律"
      },
      {
        img: "http://imgcache.wechat.com/music/joox/photo_my_zh_cn/toplist_300/2/4/2ae85048885e4924.jpg",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"胜女的白日梦"
      },
      {
        img: "http://imgcache.wechat.com/music/joox/photo_my_zh_cn/toplist_300/8/6/4bbec7a6339cfa86.jpg",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"2016 Mnet"
      },
      {
        img: "http://imgcache.wechat.com/music/joox/photo_my_zh_cn/toplist_300/3/2/a55e82e5863cd232.jpg",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"EDM流行音乐精选"
      },
      {
        img: "http://imgcache.wechat.com/music/joox/photo_my_zh_cn/toplist_300/c/7/36509f4908e3e7c7.jpg",
        href: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        wording:"那些属于男人的歌"
      },
    ],
  }
})