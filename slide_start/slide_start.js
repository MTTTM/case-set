/**
 * Created by XM on 2015/2/9.
 * 所有的效果ul的css都必须使用zoom已经：after来做触发清除浮动
 */
function XmSlide()
{
    this.defaults={//默认参数
        type:"slide",//可选slide和menu可选
        effect:"fade",//效果
        Interval:null,//定时器
        interTime:2500,//定时器时间
        delayTime:200,//效果执行时间
        triggerTime:150, //menu鼠标延迟触发时间（默认150）
        iNow:0,//index
        defaultIndex:0,//nav鼠标移开所有li后恢复默认的激活状态的节点
        defaultPlay:true,//默认defaultIndex对应的节点执行效果（默认true）,
        autoPlay:false,//自动播放
        box:"",//cell的最外层
        titCell:".hd li",//切换按钮
        mainCell:".bd",//需要切换的内容的最外面的盒子,不能操作到ul
        mainLen:"0",//默认，永远不要操作,leftLoop需要使用
        trigger:"mouseover",//事件
        prevCell:"",//上一个
        nextCell:"",//下一个
        speed:1,//marquee专用，控制控制滚动方向
        pnLoop:true,//循环
        endFun:null,//回调,
        pageState:".pageState",//分页计算,如1/16
        vis:"1"//无缝滚动暴露的个数，默认是1个
    }
}
XmSlide.prototype.init=function(opt)//初始化
{
    var This=this;
    $.extend(This.defaults,opt);
    This.defaults.mainLen=$(This.defaults.mainCell).children().length;//给未进行复制或其他操作的节点的长度进行保存
    if(This.defaults.type=="slide")//如果是slide效果，需要对vis进行判断
    {
        console.log($(This.defaults.mainCell))
        if(This.defaults.vis<=$(This.defaults.mainCell).children().length)//可见的li的个数少于li的长度的时候才会执行,这里是没有执行复制前的个数
        {

            This.bdBox();//布局
            This.trigger();//事件
           This.nextPrev();//上下切换
           This.pageState();//分页
            This.startMove(This.defaults.effect);//执行效果
        }
        else
        {
            alert("可见的节点个数[vis]不能超出节点的个数")
        }
    }
    else if(This.defaults.type=="menu")
    {
        if(This.defaults.effect=="navSlideDown"||This.defaults.effect=="fade")
        {
            This.bdBox();//布局
            This.trigger();//事件
            This.defaults.defaultIndex=This.defaults.iNow;
            This.nextPrev();//上下切换
           This.pageState();//分页
        }
        else
        {
            This.bdBox();//布局
            This.trigger();//事件
            This.startMove(This.defaults.effect);//执行效果
            This.nextPrev();//上下切换
           This.pageState();//分页
        }

       if(This.defaults.defaultPlay==true)
        {
            This.startMove(This.defaults.effect);//执行效果
        }

    }

    if(This.defaults.autoPlay==true)//判断是否需要自动运行
    {
        This.autoplay();
    }
    /*if ( $.isFunction( This.defaults.endFun ) )//判断是否需要回调，有错误
    {
        This.defaults.endFun()
    }
    else
    {
        return  function(){return false}
    }*/
};
XmSlide.prototype.trigger=function()//事件触发
{
    var This=this;
    $(This.defaults.titCell).eq(This.defaults.iNow).addClass("active");
    $(This.defaults.titCell).on(This.defaults.trigger,function()
    {
        if(This.defaults.trigger=="mouseover" ||This.defaults.trigger=="mouseenter")
        {
             if(!$(This.defaults.mainCell).is(":animated") && !$(This.defaults.mainCell).children().is(":animated"))//这里有问题
             {
                 This.defaults.iNow = $(This.defaults.titCell).index(this);//这一段不能放到定时器里面

                 var timer = setTimeout(function ()
                 {
                     This.hdTabClass();
                     This.startMove(This.defaults.effect);
                     This.pageState();
                     console.log(This.defaults.iNow)
                 }, This.defaults.triggerTime);
                 $(This.defaults.titCell).on("mouseout mouseleave", function () {
                     clearTimeout(timer);
                     if (This.defaults.type == "menu" && This.defaults.effect == "navSlideDown")
                     {
                         $(This.defaults.titCell).eq(This.defaults.iNow).find(This.defaults.targetCell).stop().slideUp(This.defaults.delayTime);
                     }
                     else if (This.defaults.type == "menu" && This.defaults.effect == "navFade")
                     {
                         $(This.defaults.titCell).eq(This.defaults.iNow).find(This.defaults.targetCell).stop().fadeOut(This.defaults.delayTime)
                     }
                 });
             };
              if(This.defaults.type=="menu"&&This.defaults.effect=="navFade"&&This.defaults.returnDefault||This.defaults.type=="menu"&&This.defaults.effect=="navSlideDown"&&This.defaults.returnDefault)
               {
                  $(This.defaults.box).mouseleave(function()
                  {
                      $(This.defaults.titCell).eq(This.defaults.defaultIndex).addClass("active").siblings(This.defaults.titCell).removeClass("active")
                  })
               }

        }
        else
        {
            This.defaults.iNow=$(This.defaults.titCell).index(this);//获取当前对应的index
         console.log($(This.defaults.mainCell).children());
         This.hdTabClass();
            This.startMove(This.defaults.effect);
          This.pageState();
        }
    })
};
XmSlide.prototype.hdTabClass=function()//切换class
{
    var This=this;
    $(This.defaults.titCell).eq(This.defaults.iNow).addClass("active").siblings().removeClass("active");
    if(This.defaults.type=="menu")
    {
        $(This.defaults.titCell).eq(This.defaults.iNow).addClass("active").siblings().removeClass("active");
    }
};

XmSlide.prototype.bdBox=function()//布局
{
    var This=this;
    switch(This.defaults.effect)
    {
        case "fade":case "show":

        break;
        case "left":
            var len=$(This.defaults.mainCell).children().length;
            $(This.defaults.mainCell).width($(This.defaults.mainCell).children().eq(0).outerWidth(true)*len);
            break;
        case "leftMarquee":
            $(This.defaults.mainCell).children().clone(true).addClass("clone").appendTo( $(This.defaults.mainCell));
            var len=$(This.defaults.mainCell).children().length;
            console.log(len);
            console.log($(This.defaults.mainCell).children().eq(0).html())
            $(This.defaults.mainCell).width($(This.defaults.mainCell).children().outerWidth(true)*len);
            break;
        case "topMarquee":
            $(This.defaults.mainCell).find("li").clone(true).addClass("clone").appendTo( $(This.defaults.mainCell));
        break;
        case "leftLoop":
           // This.defaults.mainLen=$(This.defaults.mainCell).children().length;//给未进行复制操作的节点的长度进行保存
            console.log($(This.defaults.mainCell).children().length);
            $(This.defaults.mainCell).children().each(function(e)
            {

               if($(This.defaults.mainCell).children().eq(e).index()<This.defaults.mainLen-1)//获取除最后一个丢到列表尾部
                {

                    $(This.defaults.mainCell).children().eq(e).clone(true).addClass("clone").appendTo($(This.defaults.mainCell));
                }
                if($(This.defaults.mainCell).children().eq(e).index()==This.defaults.mainLen-1)//获取最后一个放到列表头部
                {
                    $(This.defaults.mainCell).children().eq(e).clone(true).addClass("clone").prependTo($(This.defaults.mainCell));
                }
            });
            $(This.defaults.mainCell).width($(This.defaults.mainCell).children().length*$(This.defaults.mainCell).children().outerWidth(true));
          //  console.log($(This.defaults.mainCell).width());
          //  console.log($(This.defaults.mainCell).children().outerWidth(true));
            $(This.defaults.mainCell).css("left",-$(This.defaults.mainCell).children().outerWidth(true));
            break;
        case "topLoop":
            This.defaults.mainLen=$(This.defaults.mainCell).children().length;//给未进行复制操作的节点的长度进行保存
            console.log($(This.defaults.mainCell).children());
            $(This.defaults.mainCell).children().each(function(e)
            {
                console.log( $(This.defaults.mainCell).children());
                if($(This.defaults.mainCell).children().eq(e).index()<This.defaults.mainLen-1)//
                {
                    $(This.defaults.mainCell).children().eq(e).clone(true).addClass("clone").appendTo($(This.defaults.mainCell));

                }
                if($(This.defaults.mainCell).children().eq(e).index()==This.defaults.mainLen-1)//获取最后一个放到列表头部
                {
                    $(This.defaults.mainCell).children().eq(e).clone(true).addClass("clone").prependTo($(This.defaults.mainCell));
                }
            });
            $(This.defaults.mainCell).height($(This.defaults.mainCell).children().length*$(This.defaults.mainCell).children().outerHeight(true));
            console.log($(This.defaults.mainCell).height())
            $(This.defaults.mainCell).css("top",-$(This.defaults.mainCell).children().outerHeight(true));
            break;

    }

};
XmSlide.prototype.pageState=function()//分页
{
    var This=this;
    if($(This.defaults.pageState))
    {
        $(This.defaults.pageState).html((This.defaults.iNow+1)+"/"+This.defaults.mainLen);//这里在leftLoop的时候有bug,This.defaults.iNow 有依据This.defaults.titCell和This.defaults.mainCell俩中情况了
    }
};

XmSlide.prototype.nextPrev=function()//左右切换按钮
{
    var This=this;

    if(This.defaults.effect=="topMarquee" ||This.defaults.effect=="leftMarquee")
    {
        $(This.defaults.prevCell).click(function(){This.defaults.speed=1});
        $(This.defaults.nextCell).click(function(){This.defaults.speed=-1});
    }
    else
    {
        $(This.defaults.prevCell).click(function(){
            if(!$(This.defaults.mainCell +" li").is(":animated") && !$(This.defaults.mainCell).is(":animated"))
            {
                This.defaults.iNow++;
                This.startMove(This.defaults.effect);
                This.hdTabClass();
                This.pageState();
            }
        });
        $(This.defaults.nextCell).click(function(){
            if(!$(This.defaults.mainCell +" li").is(":animated") && !$(This.defaults.mainCell).is(":animated"))
            {
                This.defaults.iNow--;
                This.startMove(This.defaults.effect);
                This.hdTabClass();
                This.pageState();
            }

        });
    }

};
XmSlide.prototype.autoplay=function()//自动播放
{
    var This=this;
    This.defaults.Interval=setInterval(function(){
        This.defaults.iNow++;
        This.hdTabClass();
        This.startMove(This.defaults.effect);
        This.pageState( This.defaults.iNow);
        console.log(This.defaults.iNow)
    },This.defaults.interTime);
    $(This.defaults.mainCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
    $(This.defaults.mainCell).mouseleave(function(){This.defaults.Interval=setInterval(function(){This.defaults.iNow++;This.startMove(This.defaults.effect);This.hdTabClass();},This.defaults.interTime);});
    $(This.defaults.prevCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
    $(This.defaults.prevCell).mouseleave(function(){This.defaults.Interval=setInterval(function(){This.defaults.iNow++;This.startMove(This.defaults.effect);This.hdTabClass();},This.defaults.interTime);});
    $(This.defaults.nextCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
    $(This.defaults.nextCell).mouseleave(function(){This.defaults.Interval=setInterval(function(){This.defaults.iNow++;This.startMove(This.defaults.effect);This.hdTabClass();},This.defaults.interTime);});
    $(This.defaults.titCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
    $(This.defaults.titCell).mouseleave(function(){This.defaults.Interval=setInterval(function(){This.defaults.iNow++;This.startMove(This.defaults.effect);This.hdTabClass();},This.defaults.interTime);})
};
XmSlide.prototype.startMove=function(effects)//执行运动
{
    var This=this;
    switch(This.defaults.effect)
    {
        case "fade":
            if(This.defaults.iNow>$(This.defaults.mainCell).children().length-1)//有疑问
            {
                This.defaults.iNow=0;
                This.hdTabClass();
                $(This.defaults.mainCell).children().eq(This.defaults.iNow).fadeIn().siblings().fadeOut();

            }
            else if(This.defaults.iNow<0)
            {
                This.defaults.iNow=$(This.defaults.mainCell).children().length-1;
                This.hdTabClass();
                $(This.defaults.mainCell).children().eq(This.defaults.iNow).fadeIn().siblings().fadeOut();
            }
            else
            {
                $(This.defaults.mainCell).children().eq(This.defaults.iNow).fadeIn().siblings().fadeOut();
            }

            break;
        case "show":
            if(This.defaults.iNow>$(This.defaults.titCell).length-1)//有疑问
            {
               // console.log( $(This.defaults.mainCell).children().eq(This.defaults.iNow).css("display"));
                This.defaults.iNow=0;
                $(This.defaults.mainCell).children().eq(This.defaults.iNow).show().siblings().hide();
            }
            else if(This.defaults.iNow<0)
            {
                //console.log( $(This.defaults.mainCell).children().eq(This.defaults.iNow).css("display"));
                This.defaults.iNow=$(This.defaults.titCell).length-1;
                $(This.defaults.mainCell).children().eq(This.defaults.iNow).show().siblings().hide();
            }
            else
            {
                //console.log( $(This.defaults.mainCell).children().eq(This.defaults.iNow).css("display"));
                console.log(This.defaults.iNow)
                $(This.defaults.mainCell).children().eq(This.defaults.iNow).show().siblings().hide();
            }
            break;
        case "left":
            if(This.defaults.iNow>$(This.defaults.titCell).length-1)//有疑问
            {
                This.defaults.iNow=0;
                This.hdTabClass();
                $(This.defaults.mainCell).animate({"left":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerWidth(true)},300);
            }
            else if(This.defaults.iNow<0)
            {
                This.defaults.iNow=$(This.defaults.titCell).length-1;
                This.hdTabClass();
                $(This.defaults.mainCell).animate({"left":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerWidth(true)},300);
            }
            else
            {
                $(This.defaults.mainCell).animate({"left":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerWidth(true)},300);
            }
            $(This.defaults.mainCell).animate({"left":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerWidth(true)},300);
            break;
        case "top":
            if(This.defaults.iNow>$(This.defaults.titCell).length-1)//有疑问
            {
                This.defaults.iNow=0;
                This.hdTabClass();
                console.log(This.defaults.iNow);
                $(This.defaults.mainCell).animate({"top":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerHeight(true)},300);
            }
            else if(This.defaults.iNow<0)
            {
                This.defaults.iNow=$(This.defaults.titCell).length-1;
                This.hdTabClass();
                console.log(This.defaults.iNow)
                $(This.defaults.mainCell).animate({"top":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerHeight(true)},300);
            }
            else
            {
                This.hdTabClass();
                console.log(This.defaults.iNow)
                $(This.defaults.mainCell).animate({"top":-(This.defaults.iNow)*$(This.defaults.mainCell).children().outerHeight(true)},300);
            }

            break;
        case "leftLoop":

            $(This.defaults.mainCell).stop().animate({"left":-(This.defaults.iNow+1)*$(This.defaults.mainCell).children().outerWidth(true)},400,function()//运动的This.defaults.iNow会比按钮的+1，所有效果的This.defaults.iNow控制一致
            {

                if(This.defaults.iNow<=-1)
                {
                    This.defaults.iNow=$(This.defaults.mainCell +" li").length/2-1;
                    $(This.defaults.mainCell).css("left",(-This.defaults.mainLen)*$(This.defaults.mainCell).children().outerWidth(true));
                    This.hdTabClass();
                }
                else if(This.defaults.iNow>=($(This.defaults.mainCell +" li").length/2-1))
                {
                    This.defaults.iNow=-1;
                    $(This.defaults.mainCell).css("left","0");
                    This.hdTabClass();
                }
            });
            break;
        case "topLoop":
            $(This.defaults.mainCell).animate({"top":-(This.defaults.iNow+1)*$(This.defaults.mainCell).children().outerHeight(true)},400,function()//运动的This.defaults.iNow会比按钮的+1，所有效果的This.defaults.iNow控制一致
            {

                if(This.defaults.iNow<=-1)
                {
                    console.log(This.defaults.iNow)
                    $(This.defaults.mainCell).css("top",-$(This.defaults.mainCell +" li").length/2*$(This.defaults.mainCell).children().outerHeight(true));
                    This.defaults.iNow=$(This.defaults.mainCell +" li").length/2-1;

                    This.hdTabClass();
                }
                else if(This.defaults.iNow>=$(This.defaults.mainCell +" li").length/2-1)
                {
                    This.defaults.iNow=-1;
                    $(This.defaults.mainCell).css("top","0px");
                    This.hdTabClass();
                }
            });
            break;
        case "topMarquee":
            This.defaults.Interval=setInterval(topMar,This.defaults.interTime);
            function topMar()
            {
                if(This.defaults.speed==1)
                {
                    if($(This.defaults.mainCell).position().top<=-parseInt($(This.defaults.mainCell).height())/2)
                    {
                        $(This.defaults.mainCell).css("top","0");
                    }
                }
                else if(This.defaults.speed==-1)
                {
                    if($(This.defaults.mainCell).position().top>0)
                    {
                        $(This.defaults.mainCell).css("top",-$(This.defaults.mainCell).height()/2);
                    }
                }
                 $(This.defaults.mainCell).css("top",$(This.defaults.mainCell).position().top-=This.defaults.speed);
            }
                $(This.defaults.mainCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
                $(This.defaults.mainCell).mouseleave(function(){This.defaults.Interval=setInterval(topMar,This.defaults.interTime)});
                $(This.defaults.prevCell).mouseenter(function(){clearInterval(This.defaults.Interval); });
                $(This.defaults.prevCell).mouseleave(function(){This.defaults.Interval=setInterval(topMar,This.defaults.interTime)});
                $(This.defaults.nextCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
                $(This.defaults.nextCell).mouseleave(function(){This.defaults.Interval=setInterval(topMar,This.defaults.interTime)});
                $(This.defaults.titCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
                $(This.defaults.titCell).mouseleave(function(){This.defaults.Interval=setInterval(topMar,This.defaults.interTime)});
            break;
        case "leftMarquee":
            This.defaults.Interval=setInterval(leftMar,This.defaults.interTime);
        function leftMar()
        {
            if(This.defaults.speed==1)
            {
                if($(This.defaults.mainCell).position().left<=-parseInt($(This.defaults.mainCell).width())/2)
                {
                    $(This.defaults.mainCell).css("left","0");
                }
            }
            else if(This.defaults.speed==-1)
            {
                if($(This.defaults.mainCell).position().left>0)
                {
                    $(This.defaults.mainCell).css("left",-$(This.defaults.mainCell).width()/2);
                }
            }
            $(This.defaults.mainCell).css("left",$(This.defaults.mainCell).position().left-=This.defaults.speed);
        }
            $(This.defaults.mainCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
            $(This.defaults.mainCell).mouseleave(function(){This.defaults.Interval=setInterval(leftMar,This.defaults.interTime)});
            $(This.defaults.prevCell).mouseenter(function(){clearInterval(This.defaults.Interval); });
            $(This.defaults.prevCell).mouseleave(function(){This.defaults.Interval=setInterval(leftMar,This.defaults.interTime)});
            $(This.defaults.nextCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
            $(This.defaults.nextCell).mouseleave(function(){This.defaults.Interval=setInterval(leftMar,This.defaults.interTime)});
            $(This.defaults.titCell).mouseenter(function() {clearInterval(This.defaults.Interval); });
            $(This.defaults.titCell).mouseleave(function(){This.defaults.Interval=setInterval(leftMar,This.defaults.interTime)});
            break;
        case "navSlideDown":
            $(This.defaults.titCell).eq(This.defaults.iNow).find(This.defaults.targetCell).stop().slideDown(This.defaults.delayTime);
            break;
        case "navFade":
            $(This.defaults.titCell).eq(This.defaults.iNow).find(This.defaults.targetCell).stop().fadeIn(This.defaults.delayTime);
            break;
        case "slideMenu-SlideDown":
            $(This.defaults.targetCell).stop().slideUp(This.defaults.delayTime);
            $(This.defaults.targetCell).eq(This.defaults.iNow).stop().slideDown(This.defaults.delayTime);
            break;
    }
};

