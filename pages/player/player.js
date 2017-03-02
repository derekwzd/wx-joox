var app = getApp() 
Page({
    data: {
    //    globalStop,
    //    currentPosition  
    },

    // 播放器按钮
    homeBtn: function(){
        if( this.data.globalStop ){
            this.play()
        }
        else {
            this.pause()
        }
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
    pause: function(){
        var that = this
        that.setData({ 
            globalStop : true,
        })
        app.pause();
    },
    playNext: function(){
        let that = this
        app.playShuffle(1, (gb)=>{
            let { globalStop, curplay } = gb
            that.setData({
                globalStop,
                curplay,
                animate: "bounceInLeft"
            })
        })
    },
    playPreview:function(){
        let that = this
        app.playShuffle(-1, (gb)=>{
            that.setData({
                globalStop: gb.globalStop,
                curplay: gb.curplay,
                animate: "bounceInRight"
            })
        })
    },

    getInfo : function(){
        let result = app.getInfo()
        let { globalStop, curplay, listIndex, songList } = result
        this.setData({ globalStop, curplay, listIndex, songList })
    },

    onLoad: function (options) { 
        let { id="-1" } = options
        if( id != "-1"){
            app.whenPlayerIn( parseInt(id) )
        }
        this.getInfo()
    },
    onShow: function() {
        this.getInfo()
    },
    onShareAppMessage: function () {
        let result = app.getInfo()
        let { listIndex } = result
        
        return {
            title: this.data.curplay.title,
            desc: this.data.curplay.author,
            path: '/pages/player/player?id=' + listIndex
        }
    }
})