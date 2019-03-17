$(window).scroll(function()
{
  if($(window).scrollTop()>0)
  {
    $("nav").addClass("navbar_background_color");
    $(".nav-link").addClass("text_change");
  }   
  else
  {
    $("nav").removeClass("navbar_background_color");
    $(".nav-link").removeClass("text_change");
  }
})

var s = skrollr.init()