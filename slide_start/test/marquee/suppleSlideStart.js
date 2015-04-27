/**
 * Created by Administrator on 2015/2/27.
 * 
 */
(function($){
    $.fn.xmPlus=function(options)
    {
        $.fn.xmPlus.defaults={
            effect:"fade",
            titCeil:".hd",
            mainCeil:".bd",
            prevCeil:".prev",
            nextCeil:".next",
            interTime:2500,
            defaultIndex:0


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
            var interTimer;
            var defaultDirt=1;
            init();
            function init()//初始化
            {
                div();
                toPlay();
                prevNext();
                evenTarget();

            }
            function div()//布局
            {
                switch(effect)
                {
                    case "leftMarquee":
                        mainCeil.children().clone(true).addClass("clone").appendTo(mainCeil);
                        mainCeil.width(mainCeil.children().outerWidth(true)*mainCeil.children().length);
                        break;
                }
            }
            function evenTarget()  // 切换列表操作
            {
                titCeil.children().click(function()
                {
                    defaultIndex=titCeil.children().index(this);
                    toPlay();
                });
            }
            function prevNext()//prev  Next  按钮操作
            {
                switch (effect)
                {
                    case "leftMarquee":
                        prevCeil.click(function()
                        {
                            defaultDirt=1;
                        });
                        nextCeil.click(function()
                        {
                            defaultDirt=-1;
                        });
                    break;
                }
            }
            function autoPlay()//自动播放
            {

            }
            //运行效果
            function toPlay()
            {
              switch (effect)
              {
                  case "fade":
                      mainCeil.children().css("display","none");
                      mainCeil.children().eq(defaultIndex).css("display","block");
                      titCeil.children().eq(defaultIndex).addClass("active").siblings().removeClass("active");
                      break;
                  case "leftMarquee":
                  interTimer=setInterval(doMarquee,50);
                  function doMarquee()
                  {

                      if(mainCeil.position().left<-(mainCeil.outerWidth()/2))//如果大于一半 就拉回到0[不要使用等于]
                      {
                          mainCeil.css({"left":0});
                      }
                      else if(mainCeil.position().left>0)//如果大于0，就拉回一半[不要使用等于]
                      {
                          mainCeil.css({"left":-(mainCeil.outerWidth()/2)});
                      }
                      else
                      {
                          mainCeil.css({"left":mainCeil.position().left-=defaultDirt});
                      }

                  }
                      mainCeil.mouseover(function()
                      {
                          clearInterval(interTimer)
                      });
                      mainCeil.mouseout(function()
                      {
                          interTimer=setInterval(doMarquee,50);
                      });
                      break;
              }
            }

        })
    }
})(jQuery);

