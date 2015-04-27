/**
 * Created by Administrator on 2015/3/30.
 */
$.fn.extend({
    imgLoop:function(speed,auto,loopDir,time,hd,bd)//无缝滚动  //imgLoop:function(切换速度,是否自动,自动切换方向,自动切换间隔,小图标ul的父级，滚动ul的父级)
    {
        $(this).each(function() {
            var oBox = $(this);
            var oUl = oBox.find(bd).find("ul");
            var aUlLi = oUl.find("li");
            var aLilen=aUlLi.length;
            var Prev = oBox.find(".prev");
            var Next = oBox.find(".next");
            var oneWidth = aUlLi.width();
            var btn;
            var btnLi;
            var timer;
            var iNow = 0;//控制滚动
            oUl.width(oneWidth*aLilen)
            if(oBox.find(hd).find("ul")){ //如果有发现.hd的话，就产生小图标
                btn=oBox.find(hd).find("ul");
                for(var i=0;i<aUlLi.length;i++)
                {
                    $("<li>"+parseInt(i+1)+"</li>").appendTo(btn);
                }
                btnLi=btn.find("li");
                btnLi.eq(iNow).addClass("on").siblings(btnLi).removeClass("on");
                btnLi.click(function()
                {
                    iNow=$(this).index();
                    move(iNow);
                });
            }
            function animateNext()
            {
                if( !oUl.is(":animated") )
                {
                    if(iNow==aLilen-1)
                    {

                        aUlLi.eq(0).css({"position":"relative","top":"0","left":aLilen*oneWidth});
                        oUl.animate({"left":-oneWidth*aLilen},500,function(){
                            aUlLi.eq(0).removeAttr("style");
                            oUl.css({"left":0})
                        });
                        iNow=0;
                    }
                    else
                    {

                        oUl.stop(false,true).animate({"left":'-='+oneWidth+"px"},500);
                        iNow++;
                    }
                }

                btnLi.eq(iNow).addClass("on").siblings(btnLi).removeClass("on");
            }
            function animatePrev()
            {
                if( !oUl.is(":animated") )
                {
                    if( !oUl.is(":animated") )
                    {
                        if(iNow==0)
                        {
                            aUlLi.eq(aLilen-1).css({"position":"relative","top":"0","left":-oneWidth*aLilen});
                            oUl.animate({"left":oneWidth},500,function(){
                                aUlLi.eq(aLilen-1).removeAttr("style");
                                oUl.css({"left":-oneWidth*(aLilen-1)})
                            });
                            iNow=aLilen-1;
                        }
                        else
                        {

                            oUl.stop(false,true).animate({"left":'+='+oneWidth+"px"},500);
                            iNow--;
                        }
                    }

                    btnLi.eq(iNow).addClass("on").siblings(btnLi).removeClass("on");
                }
            }
            Next.click(function(){
                animateNext();
            });
            Prev.click(function(){
                animatePrev();
            });

            timer=setInterval(animateNext,time);
            oBox.timer=timer;
            oUl.add(btnLi).add(Prev).add(Next).mouseenter(function(){
                clearInterval(oBox.timer);
            });
            oUl.add(btnLi).add(Prev).add(Next).mouseleave(function(){
                oBox.timer=setInterval(animateNext,time);
            });
            function move() {
                btnLi.eq(iNow).addClass("on").siblings(btnLi).removeClass("on");
                oUl.animate({left: -oneWidth * iNow}, speed)
            }
        });

    }
});