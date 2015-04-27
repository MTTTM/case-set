/**
 * Created by Administrator on 2015/2/19.
 */
function Marquee(box,dect,inter)
{
    var wraps=$(box);
    var wrap=wraps.find("ul");
    var wrapLi=wrap.find("li");
    var Next=wraps.find(".next");
    var Prev=wraps.find(".prev");
    wraps.timer=null;
    var speed;//用来控制方向
    wrap.find("li").clone(true).appendTo(wrap);
    wrapLi=wrap.find("li");
    var wrapW=wrapLi.outerWidth(true)*wrapLi.length;
    if(dect=="top" ||dect=="left")
    {
        speed=1;
    }
    else if(dect=="bottom"||dect=="right")
    {
        speed=-1;
    }
    Next.click(function(){speed=-1});//往上走
    Prev.click(function(){speed=1});//往下走
    function marquee()
    {
      switch (dect)
      {
          case "top":case "bottom":
          if(speed==1)//往top方向走1，也就是top-1
          {
              if (wrap.position().top <= parseInt(-wrap.height() / 2)) {
                  wrap.css("top", "0");
              }
              // else  {
              //   wrap.css("top", wrap.position().top -= speed);
              // }
          }
          else if(speed==-1)//往top方向走-1，也就是top+1
          {
              if (wrap.position().top > 0) {
                  wrap.css("top", parseInt(-wrap.height() / 2));
              }
              //else {
              //    wrap.css("top", wrap.position().top -= speed);
              // }
          }
          wrap.css("top", wrap.position().top -= speed);
              break;
          case "left"://文字不推荐使用leftMarquee
          case "right"://文字不推荐使用rightMarquee
              wrap.width(wrapW);
            if(speed==1)//往left方向走1，也就是left-1
             {
                if (wrap.position().left<=-parseInt(wrap.width()/2))
                {
                   wrap.css("left","0");
                }
              // else  {
              //   wrap.css("top", wrap.position().top -= speed);
              // }
             }
             else if(speed==-1)//往left方向走-1，也就是left+1
             {
                 if (wrap.position().left>=0)
                 {
                     wrap.css("left", -wrap.outerWidth()/2);
                  }
              //else {
              //    wrap.css("top", wrap.position().top -= speed);
              // }
             }
              console.log(speed);
              wrap.css("left",wrap.position().left-=speed);
              wrap.css("left",wrap.position().left-=speed);
              wrap.css("left",wrap.position().left-=speed);
          break;
      }

    }
    wraps.timer=setInterval(marquee,inter);
    wraps.mouseover(function(){clearInterval(wraps.timer)});
    wraps.mouseout(function(){wraps.timer=setInterval(marquee,inter);});
}

