////變數與程式指令模組區////

// 定義一組模組的點擊指令 click_count(引數為count_number)：功能為找到.num，並把他的 text 改寫為被程式修改過的變數 number
var number=0; 
function click_count(count_number)
{
  number=number+count_number;
  if (number>=0)
  {
   $(".num").text(number);
  }
  else
  {
    number=0
  }    
};

// 主程式區
$(".add").click(
  function()
  {    
    click_count(+1);
    if (number<=5)
    {
      $(".contact").addClass("contact_show");
      $(".text").css("border-color","red");
      $(".text").css("color","red");      
    }
    else if (number<10)
    {
      $(".contact").removeClass("contact_show");
      $(".text").css("border-color","white");
      $(".text").css("color","white");   
      $(".text").text("哇!快沒有了歐!");
    }
    else if (number<20)
    {
      $(".text").text("賣得不錯歐!");
    }
    else if (number>=20)
    {
      $(".text").text("存貨還夠歐!");
    }     
  });
$(".minus").click(
function()
  {
    click_count(-1);
    if (number<=5)
    {
      $(".contact").addClass("contact_show");
      $(".text").css("border-color","red");
      $(".text").css("color","red");      
    }
    else if (number<10)
    {
      $(".contact").removeClass("contact_show");
      $(".text").css("border-color","white");
      $(".text").css("color","white");   
      $(".text").text("哇!快沒有了歐!");
    }
    else if (number<20)
    {
      $(".text").text("賣得不錯歐!");
    }
    else if (number>=20)
    {
      $(".text").text("存貨還夠歐!");
    }  
  });

// else if 的邏輯是甚麼意思?為什麼不用if或者是else就好?我發現，如果沒有加上else說明"其餘"的意思，就會發生與上段的邏輯衝突。
var time=0;
$(".contact").click(
function()
  {
    $(".contact").text("聯絡中....");
    setInterval(
      function()
      {
       time=time+1;
       $(".contact").text("聯絡中.... "+time+" 秒");
      }
      ,1000);
  }
);
// 為什麼不能選擇.contact_show作為觸發的元件？