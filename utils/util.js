function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}



function getListInfo(){
  $$(".hq-row").map(item=>{
      let song   = item.getElementsByClassName("songname-text")[0].getElementsByTagName("a")[0]
      let artist = item.getElementsByClassName("artistname")[0]
      let songid = (!!song.href ) ? song.href.split("#")[1].split("?id=")[1] : song.getAttribute("u").split("?id=")[1]
      return {
          title: song.innerText,
          author : artist.innerText.trim(),
          songid,
      }
  })
}

function getCover(){

  a = [
    {
      "title": "Just Because",
      "author": "白雅言 ; JB",
      "songid": "toIb+V89Tnm_y_UDKL04gg=="
    },
    {
      "title": "It's You",
      "author": "申勇在 ; Luna f(x)",
      "songid": "rTp6N2NNJS2lZAxWL1VGTQ=="
    },
    {
      "title": "Love You On Christmas",
      "author": "Yerin Baek",
      "songid": "F1WlfO0DNv33Tn5htnAiSw=="
    },
    {
      "title": "The Winter's Tale",
      "author": "BTOB",
      "songid": "OP5gvXEqMLaU+7xXUw+DiQ=="
    },
    {
      "title": "It's Christmas Day",
      "author": "Roy Kim",
      "songid": "jCqHQsJ9xjnkmLJJ6QjQyw=="
    },
    {
      "title": "Wish Tree - Winter Garden",
      "author": "Red Velvet",
      "songid": "BZt0tXYCaVNMGUbMBMXR5A=="
    },
    {
      "title": "First Christmas",
      "author": "Standing Egg",
      "songid": "HoOFGedMMck9qdZKaNYMgA=="
    },
    {
      "title": "On The Snow",
      "author": "EXO",
      "songid": "mrAP3lhunNoeMc0gtRNjnA=="
    },
    {
      "title": "Confession Song",
      "author": "GOT7",
      "songid": "nwgrO+LlqOD0NQnpqSPSJw=="
    },
    {
      "title": "Love Falls",
      "author": "李宗泫 ; JUNIEL",
      "songid": "1u7E5mUqWnw2FpWIbXsODg=="
    },
    {
      "title": "Dear Santa",
      "author": "Taetiseo",
      "songid": "N1cjRZLTSw98fewdaZyyHQ=="
    },
    {
      "title": "Snowy Day (feat. Rex.D)",
      "author": "Romantic City ; Rex.D",
      "songid": "1trU+Qf5fwy6e_OvMUYaUQ=="
    },
    {
      "title": "Love In The Air",
      "author": "徐仁國 ; VIXX ; 樸正雅 ; 박윤하",
      "songid": "4PMrAhSNsGzi6NAyK3n22w=="
    },
    {
      "title": "Still You",
      "author": "銀赫&東海",
      "songid": "FlHMUQNO1GnJqK02rAh9Xw=="
    },
    {
      "title": "Because It's Christmas",
      "author": "BTOB",
      "songid": "xUYA5hgP8kRMLD12HZvfwg=="
    },
    {
      "title": "Merry Christmas",
      "author": "Taetiseo",
      "songid": "4wxXXpqoxmXPayZdbJ1rAg=="
    },
    {
      "title": "The Day",
      "author": "K.will ; Baekhyun",
      "songid": "Mb6hopIx__d8KX5jPq4rYQ=="
    },
    {
      "title": "Christmas Is Here",
      "author": "ATBOs ; 홍의석 ; 이기현 ; 이민석",
      "songid": "bJekSgbfHVAyOCqiURLunA=="
    },
    {
      "title": "Stronger",
      "author": "EXO",
      "songid": "9BOB0qyefO2i4c70HboMRw=="
    },
    {
      "title": "Be The Light (YVES & ADAMS Winter Remix)",
      "author": "Block B",
      "songid": "tAVJBuoKf4ZHsUpEUWRejw=="
    },
    {
      "title": "Winter Tears",
      "author": "柳俊相",
      "songid": "NAmxGrGv7ACfhc_BN69A7w=="
    },
    {
      "title": "Christmas Day",
      "author": "Tourist",
      "songid": "VtVc8Hr3fO2sCrkrEdV+PQ=="
    }
  ]
  var arrs = []
  a.forEach(item=>{
      let songid =item.songid
      // fetch(`http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${songid}`,{
      var xhr = new XMLHttpRequest()
      xhr.open('GET', `http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${songid}`)
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200){
          var result = JSON.parse( xhr.responseText.substring(18,  xhr.responseText.length-1) ) 
          console.log( result )
          arrs.push({
            cover: result.imgSrc,
            title: result.msong,
            author: result.msinger,
            mp3Url: result.mp3Url,
            songid, 
          })
        }
      }
      xhr.send()
  })
  console.log( arrs )
}