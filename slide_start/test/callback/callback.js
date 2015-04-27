/**
 * Created by Administrator on 2015/3/3.
 */
$.fn.xmPlus=function(options)
{
    $.fn.xmPlus.defaults={
        type:"slide",//可选menu和slide
        effect:"fade",
        titCeil:".hd ul",
        mainCeil:".bd ul",
        prevCeil:".prev",
        nextCeil:".next",
        pageState:".pageState",
        titOnClassName:"active",
        interTimer:null,//自动播放定时器，调用时候无需操作
        interTime:4500,//定时器间隔时间
        triggerTime:500,//鼠标经过延时执行时间
        delayTime:350,//动画执行时间
        autoPage:false,//是否自动添加头部可点击的列表，默认true
        defaultIndex:0,//默认第一个激活的索引，同时可通过修改了切换
        returnDefault:false,//是否返回默认被激活的元素,nav专用
        targetCeil:"",//nav||slideMen鼠标经过显示的下拉
        autoPlay:false,//是否自动播放，默认否
        trigger:"click",//默认事件
        defaultML:0,//永远不要操作，loop系列未执行复制前的main child 的长度
        vis:1,//可显示的个数,专用Loop系列
        scroll:1,//每次滚动的个数
        endFun:null,//回调函数
        starFun:null//同时出发函数
    };
    return $(this).each(function()
    {
        var opts= $.extend({}, $.fn.xmPlus.defaults,options);
        var plus=$(this);
        var effect=opts.effect;
        var  defaultIndex=opts.defaultIndex;
        var mainCeil=plus.find(opts.mainCeil);
        var titCeil=plus.find(opts.titCeil);
        var prevCeil=plus.find(opts.prevCeil);
        var nextCeil=plus.find(opts.nextCeil);
        var targetCeil=plus.find(opts.targetCeil);
        var autoPlay=opts.autoPlay;
        var interTimer=opts.interTimer;
        var interTime=opts.interTime;
        var trigger=opts.trigger;
        var triggerTime=opts.triggerTime;
        var delayTime=opts.delayTime;
        var defaultDirt=1;
        var  defaultML=opts.defaultML;
        var vis=opts.vis;
        var type=opts.type;
        var returnDefault=opts.returnDefault;
        var returnIndex=opts.defaultIndex;
        var pageState=plus.find(opts.pageState);
        var scroll=opts.scroll;
        var autoPage=opts.autoPage;
        var titOnClassName=opts.titOnClassName;
        var endFun=function(){if($.isFunction( opts.endFun )){opts.endFun(defaultIndex)}};
        var starFun=function(){if($.isFunction( opts. starFun )){opts. starFun()}};
        init();
        function init()
        {

          toPlay();
            tabEvent();
            tabClass();
          autoAdd();
        }
        function tabClass()
        {
         titCeil.children().eq(defaultIndex).addClass("active").siblings().removeClass("active");
        }
        function tabEvent()
        {

            titCeil.children().click(function()
            {
                defaultIndex=titCeil.children().index(this);
                tabClass();
                toPlay();
            })
        }
        function autoAdd()
        {
            interTimer=setInterval(autos,interTime);
            plus.mouseenter(function(){
                clearInterval(interTimer);
            });
            plus.mouseleave(function(){
                clearInterval( interTimer=setInterval(autos,interTime));
            });
            function autos()
            {

                if(defaultIndex>mainCeil.length)
                {
                    defaultIndex=0;
                }
                else
                {
                    defaultIndex++;
                }
                toPlay();
                tabClass();
            }
        }
        function toPlay()
        {
            mainCeil.animate({"top":-defaultIndex*mainCeil.children().outerHeight(true)},delayTime,endFun);
        }

    })
};
