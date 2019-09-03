// var time = 5
// function countDown_test(){
//   console.clear()
//   console.log("倒數 "+time+" 秒")
//   time = time-1
//   var timer = setTimeout(countDown_test,1000)
//   if(time<=0){
//     clearTimeout(timer)
//     console.clear()
//     console.log("倒數結束！")
//   }
// }
// // 這樣寫的問題在，當 time = 1 的時候且要被顯示出來的時候，因為程式跑的速度很快，所以就會將 time-1 = 0 遞交給條件式把計時器關掉。因此就看不到 1 之後的結果了。

var percent = 0

function loadingbar(){
  $(".bar").css("width",percent+"%")
  $(".text").html("載入進度："+percent+" %")
  percent+=1
  if(percent>100){
    clearInterval(timer)
    $(".text").html("載入好惹！")
    $(".start").removeClass("hide")
  }
}

var timer = setInterval(loadingbar,10)

$(".start").click(function(){
  $(".loadingpage").addClass("remove")
  $(".loading").addClass("hide")
})