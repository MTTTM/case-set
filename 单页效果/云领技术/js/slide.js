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
            console.log($("#MenScroll"+index).offset().top);
            console.log($("#MenScroll"+index).offset().top-offTop+"px");
            $("body,html").animate({scrollTop:To},500);
        });
        return this;
    }
});