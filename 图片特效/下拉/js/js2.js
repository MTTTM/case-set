/**
 * Created by Administrator on 2014/11/10.
 */
$(document).ready(function()
{
    //获取节点
    var oUl=$("ul").eq(0);
    var oLi=oUl.find("li");
    var oOl=$("ol").eq(0);
    var ooLi=oOl.find("li");
    var oDiv=oLi.find("div");
    var box=$("#box");
    var oImg=oDiv.find("img");
    var timer=null;
    var iNow=0;
    //鼠标移入移出
    oUl.mouseenter(function(){
    clearInterval(timer);
    });
    oUl.mouseleave(function(){
        timer=setInterval(aDD,4000);
    });
    ooLi.mouseenter(function(){
        iNow=$(this).index();
        doTab();
    });
    //初始化所有
    box.width(oLi.length*oLi.eq(0).width());
    ooLi.eq(iNow).addClass("active");
    timer=setInterval(aDD,4000);
    //自动运行
   function aDD()
   {
        if(iNow>=2)
        {
            iNow=0;
        }
        else
        {
            iNow++;
        }
       doTab();
       }
//执行动作
    function doTab()
    {
        oDiv.stop(true,false).animate({left:-iNow*60+"px"},300);
        ooLi.eq(iNow).addClass("active").siblings().removeClass("active");
    }
});
