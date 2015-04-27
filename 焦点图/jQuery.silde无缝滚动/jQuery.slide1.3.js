$.fn.extend({
    //常用：鼠标经过||点击切换图片,
    // 调用方式,$("对象").changeImg("事件")
    changeImg: function(event)
    {
        var index=0;
        $(this).eq(index).find("img").eq(0).hide();
        $(this).bind(event,function ()
        {
            index = $(this).index(this);
            $(this).eq(index).find("img").eq(0).hide();
            $(this).eq(index).siblings(this).find("img").show();
        });
        return this;
    },
    //常用：鼠标经过||点击的时候切换class,这里默认的切换class为on
    //调用方式：$("对象").tabClassName("事件")
    tabClassName:function(event)
    {
        var index=0;
        $(this).bind(event,function ()
        {
            index = $(this).index(this);
            $(this).eq(index).addClass("on").siblings(this).removeClass("on");
        });
        return this;
    },
    //常用：鼠标点击||经过时候切换menu下内容
    //调用方式 $("事件目标").changeCnt("内容目标","事件");
    changeCnt:function(cnt,event)
    {
        var index = 0;
        $(cnt).eq(0).show();
        $(this).bind(event,function ()
        {
            index = $(this).index();
            $(cnt).eq(index).show().siblings(cnt).hide();
        });
        return this;
    },
    //常用：鼠标经过某区域的时候，当前div的下级往上滑动
    //调用方式： $("事件目标").changeCnt("当前目标下级","下级的原来的top");
    //如果需要初始化的话，可以再html里面给第一个元素添加on，这里的默认class为on
    innerScroll:function(insertBox,top)
    {
        $(this).hover(function()
        {
            $(this).find(insertBox).stop(true,false).animate({top:0},200);
            $(this).addClass("on");
        },function()
        {
            $(this).find(insertBox).stop(true,false).animate({top:top},200);
            $(this).removeClass("on");
        });
        return this;
    },
    //固定顶部菜单
    fixedMen:function(hd)
    {
        var _this=$(this);
        $(window).scroll(function()
        {
            var hh=$(hd).outerHeight();
            if ($(window).scrollTop()>hh)
            {
                _this.addClass("fixedMenu");
            }else
            {
                _this.removeClass("fixedMenu");
            }
        });
        return _this;
    },

    //点击滚动到指定地区
    fixedMenScroll:function(offTop)
    {
        $(this).click(function()
        {
            var index=$(this).index()+1;
            var To=$("#MenScroll"+index).offset().top-offTop+"px";
          //  console.log($("#MenScroll"+index).offset().top);
           // console.log($("#MenScroll"+index).offset().top-offTop+"px");
            $("body,html").animate({scrollTop:To},500);
        });
        return this;
    },
    //返回顶部
    toTop:function(height)
    {
        var _this = this;
        _this.click(function ()
        {
            $('body,html').animate({scrollTop: 0}, 300);
            return false;
        });
        winTH();
        $(window).scroll(function ()
        {
            winTH();
        });
        function winTH()
        {
            $(window).scroll(function ()
            {
                if ($(window).scrollTop() > height)
                {
                    _this.fadeIn();
                }
                else
                {
                    _this.fadeOut();
                }
            });
        }
      },
    imgLoop:function(speed)//无缝滚动
    {
        var oBox=$(this);
        var oUl=oBox.find(".bd");
        var aUlLi=oUl.children("li");
        var btn=null;
        var btnLi=null;
        var Prev=oBox.children(".prev");
        var Next=oBox.children(".next");
        var oneWidth=aUlLi.outerWidth();
        var iNow=0;//控制列表
        var iNow2=0;//控制小图片
        var timer=null;
        if(oBox.children(".hd").find("ul")){ //如果有发现.hd的话，就产生小图标
            btn=oBox.children(".hd").find("ul");
            for(var i=0;i<aUlLi.length;i++)
            {
                $("<li>"+parseInt(i+1)+"</li>").appendTo(btn);
            }
            btnLi=btn.children("li");
            btn.width((btnLi.length+1)*btnLi.width());
            tagName(iNow2);
            btnLi.click(function(){
                iNow=iNow2=$(this).index();
                tagName(iNow2);
                move(iNow);
            });
        }
        oUl.width(oneWidth*aUlLi.length);
         timer=setInterval(function(){
             if(iNow>=aUlLi.length)
             {
                 iNow=0;
                 aUlLi.eq(0).css({"position":"status","left":0});
                 oUl.css({"left":0});
             }
             if(iNow>=aUlLi.length-1)//临界点
             {
                 aUlLi.eq(0).css({"position":"relative","left":aUlLi.length*oneWidth});

             }
             iNow++;
             if(iNow>1)//恢复列表的最后一个元素的伪装
             {
                 aUlLi.eq(aUlLi.length-1).css({"position":"static","left":0});
             }
             if(oBox.children(".hd").find("ul").length)//如果.hd存在的话，就执行切换
             {
                 iNow2++;
                 if (iNow2 > aUlLi.length - 1) {
                     iNow2 = 0;
                 }
                 console.log(iNow2);
                 tagName(iNow2);
             }
             move();
         },600);
        oUl.add(Prev).add(Next).add(btnLi).mouseenter(function(){
            clearInterval(timer);
        });
        oUl.add(Prev).add(Next).add(btnLi).mouseleave(function(){
            timer=setInterval(function(){
                if(iNow>=aUlLi.length)
                {
                    iNow=0;
                    aUlLi.eq(0).css({"position":"status","left":0});
                    oUl.css({"left":0});
                }
                if(iNow>=aUlLi.length-1)//临界点
                {
                    aUlLi.eq(0).css({"position":"relative","left":aUlLi.length*oneWidth});

                }
                iNow++;
                if(iNow>1)//恢复列表的最后一个元素的伪装
                {
                    aUlLi.eq(aUlLi.length-1).css({"position":"static","left":0});
                }
                if(oBox.children(".hd").find("ul").length)//如果.hd存在的话，就执行切换
                {
                    iNow2++;
                    if (iNow2 > aUlLi.length - 1) {
                        iNow2 = 0;
                    }
                    console.log(iNow2);
                    tagName(iNow2);
                }
                move();
            },600);
        });
        Next.click(function(){
            if(!oUl.is(":animated"))
            {
                if(iNow>=aUlLi.length)
                {
                    iNow=0;
                    aUlLi.eq(0).css({"position":"status","left":0});
                    oUl.css({"left":0});
                }
                if(iNow>=aUlLi.length-1)//临界点
                {
                    aUlLi.eq(0).css({"position":"relative","left":aUlLi.length*oneWidth});

                }
                iNow++;
                if(iNow>1)//恢复列表的最后一个元素的伪装
                {
                    aUlLi.eq(aUlLi.length-1).css({"position":"static","left":0});
                }
                if(oBox.children(".hd").find("ul").length)//如果.hd存在的话，就执行切换
                {
                    iNow2++;
                    if (iNow2 > aUlLi.length - 1) {
                        iNow2 = 0;
                    }
                    console.log(iNow2);
                    tagName(iNow2);
                }
                move();
            }
        });
        Prev.click(function()
        {

            if(!oUl.is(":animated"))//判断是否在运动
            {

                if(iNow<=-1)
                {
                    iNow=aUlLi.length-1;
                    aUlLi.eq(aUlLi.length-1).css({"position":"static","left":0});
                    oUl.css({"left":-(aUlLi.length-1)*aUlLi.eq(0).outerWidth()})
                }
                if(iNow<=0)//临界点
                {
                    aUlLi.eq(aUlLi.length-1).css({"position":"relative","left":-(aUlLi.length)*aUlLi.outerWidth()})
                }
                iNow--;

                console.log(iNow);
                if(iNow<aUlLi.length-1)//恢复列表得一个元素的伪装
                {
                    aUlLi.eq(0).css({"position":"status","left":0});
                }
                if(oBox.children(".hd").find("ul").length)//如果.hd存在的话，就执行切换
                {
                    iNow2--;
                    if(iNow2<0)
                    {
                        iNow2=aUlLi.length-1;
                    }
                    tagName(iNow2);
                }
                move();
            }

        });
        function move()
        {
            oUl.stop(false,true).animate({left:-oneWidth*iNow},speed)
        }
        function tagName(iNow2){
            btnLi.eq(iNow2).addClass("on").siblings(btnLi).removeClass("on");
        }

    }
});