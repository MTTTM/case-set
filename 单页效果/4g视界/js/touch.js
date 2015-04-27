//图片滑动
function mmTab()
{
    var mm=document.getElementsByClassName("mm")[0];
    var menu=document.getElementsByTagName("menu")[0];
    mm.addEventListener("touchstart",homeStart,false);
    var downX=0;
    var endX=0;
    function homeStart(eve)
    {
        var ev=eve.changedTouches[0];
        downX=ev.clientX;
        document.addEventListener("touchend",homeEnd,false);
        eve.preventDefault();
    }
    function homeEnd(ev)
    {

        var ev=ev.changedTouches[0];
        endX=ev.clientX;
        if(downX>endX)
        {
            mm.style.left="-85%";
            mm.style.opacity=0;
            menu.style.left=0;
            menu.style.opacity="1";
        }
    }
}


//nav切换
function menuTab()
{
    var  navTab=document.getElementsByTagName("header")[0].getElementsByClassName("menu")[0];
    var  nav=document.getElementsByTagName("nav")[0];
    var navToggle=true;
    navTab.onclick=function()
    {
        if(navToggle)
        {
            nav.style.top="40px";
            navToggle=false;
        }
        else
        {
            nav.style.top="-40%";
            navToggle=true;
        }
    };
}
/*无缝循环*/

function Loop(Wrap,oul,oli)
{
    var banWrap=Wrap;
    var oUl=oul;
    var oLi=oli;
    var disX=0;
    var downX;
    Wrap.iNow=1;
    for(var i=0;i<oLi.length;i++)
    {
        oLi[i].style.width=document.body.scrollWidth+"px";
    }
    var w=parseInt(document.body.scrollWidth);
    var len=oLi.length;
    oUl.style.width=w*len+"px";
    oUl.style.left=-w+"px";
    oUl.addEventListener("touchstart",start,false);
    function start(ev)
    {
        var ev=ev.changedTouches[0];
        downX=ev.clientX;
        disX= ev.pageX-oUl.offsetLeft;
        oUl.addEventListener("touchmove",move,false);
        oUl.addEventListener("touchend",end,false);
        ev.preventDefault ;
       return false;

    }
    function move(ev)
    {
        var ev=ev.changedTouches[0];
        var pageX=ev.clientX-disX;
        oUl.style.left=pageX+"px";
    }
    function end(ev) {
        oUl.removeEventListener("touchmove");
        oUl.removeEventListener("touchend");
        var ev = ev.changedTouches[0];
        var endX = ev.clientX;
        if (endX< downX)
        {
            if (downX - endX > w/4 && Wrap.iNow<=oLi.length-2)
            //至少滑动1/4的宽度才能切换同时Wrap.iNow没有超过最大的范围
            {
                Wrap.iNow++;

            }
            console.log(Wrap);
            console.log(Wrap.iNow);

            startMove(oUl,{left:-Wrap.iNow*oLi[0].offsetWidth},function()
            {
                // alert(Wrap.iNow)

                if(Wrap.iNow==5)
                {
                    Wrap.iNow=1;
                    oUl.style.left=-w+"px";

                   // console.log(oUl.style.left);
                }
            });
        }
        else
        {
            if (downX - endX< w/4 && Wrap.iNow!=-1)

            //至少滑动一半的宽度或者滑动间隔毫秒少于300毫秒同时滑动距离大于30才能切换
            {
                Wrap.iNow--;
            }
            startMove(oUl,{left:-Wrap.iNow*w},function()
            {
                if(Wrap.iNow==0)
                {
                    Wrap.iNow=oLi.length - 2;
                    oUl.style.left=-(Wrap.iNow*w)+"px";//-1416
                }

            });
        }
    }
}

