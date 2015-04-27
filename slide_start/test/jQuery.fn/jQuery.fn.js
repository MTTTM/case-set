/**
 * Created by Administrator on 2015/3/4.
 */
$.fn.extend({
    tt:function(i,tt)
    {
      $(this).find(tt).eq(i).addClass("on").siblings().removeClass("on");
    },
    bd:function(i,bd)
    {
        $(this).find(bd).eq(i).fadeIn().siblings().fadeOut();
    }
});