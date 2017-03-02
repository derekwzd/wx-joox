// pages/video/video.js
var app = getApp()
Page({
  
  data:{
    tab: 0,
    videos: [
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
    ],
    comments: [
      {
        name:"User1",
        comment: "评论内容1",
      },
      {
        name:"User2",
        comment: "评论内容2",
      },
      {
        name:"User3",
        comment: "评论内容3",
      },
      {
        name:"User4",
        comment: "评论内容4",
      },
      {
        name:"User5",
        comment: "评论内容5",
      },
      {
        name:"User6",
        comment: "评论内容6",
      },
      {
        name:"User7",
        comment: "评论内容7",
      },
      {
        name:"User8",
        comment: "评论内容8",
      },
    ],
    src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
    // 初始化视频播放状态
    let { id=0 } = options
    this.setData({ index: id })
    let that = this

    app.getUserInfo(function (userInfo) {
      that.setData({
        nickName: userInfo.nickName,
      })
    })
  },

  switchTab: function(e){
    var that = this
    let { tab } = e.currentTarget.dataset
    this.setData({ tab })
  },


  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  submit:function(){
    let{ comments, inputValue, nickName } = this.data
    comments.push({
      name : nickName,
      comment: inputValue,
    })
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      comments,
      newIndex: comments.length-1,
    })
  },

  onShareAppMessage: function () { 
    let { index, videos } = this.data

    return {
      title: "JOOX Video",
      desc: this.data.videos[parseInt(index)].wording,
      path: '/pages/video/video?id=' + index
    }
  }
})