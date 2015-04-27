// JavaScript Document
(function ($) {		
	$.fn.trunsBox= function(options){
		$(this).each(function() {
			
			
			var _box=$(this);
			var _wrap=_box.find('ul');
			var box_li=_box.find('li');
			var box_li_width=box_li.outerWidth(true);
			var size=box_li.size();
			var time=3000;
			var page=0;
			
			
			//遍历分页
			var pager="";
			for(var i=0; i<size; i++){
				pager+="<span></span>";
			}
			$("<div class='s-page'>"+pager+"</div>").appendTo(_box);
			var box_pager=_box.find(".s-page").find("span");
			box_pager.eq(0).addClass('curr');
			
			
			function animateNext(){
				if( !_wrap.is(":animated") ){
				  if( page==size-1 ){                 
					   box_li.eq(0).css({"position":"relative","top":0,"left":box_li_width*size+'px'});
						_wrap.animate({"left":-box_li_width*size+"px"},500,function(){
							box_li.eq(0).removeAttr("style");
							$(this).css({"left":"0"});
						});
						page=0;
				  }else{
						_wrap.stop(false,true).animate({"left":'-='+box_li_width+"px"},500);
						page++;
				 }
				}
				box_pager.eq(page).addClass("curr").siblings().removeClass("curr");
			};
			
			function animatePrev(){
				if( !_wrap.is(":animated") ){
				  if( page==0 ){           
						box_li.filter(":last-child").css({"position":"relative","top":0,"left":-box_li_width*size+'px'});            
						_wrap.animate({"left":box_li_width+"px"},500,function(){
							box_li.filter(":last-child").removeAttr("style");
							$(this).css({"left":-box_li_width*(size-1)+"px"});
						});
						page=size-1;
				  }else{
						_wrap.stop(false,true).animate({"left":'+='+box_li_width+"px"},500);
						page--;
					
				  }
				}
				box_pager.eq(page).addClass("curr").siblings().removeClass("curr");
			};
			
			box_pager.on("click",function(){
				$(this).addClass("curr").siblings().removeClass("curr");
				var index=$(this).index();	
				page=index;
				_wrap.stop(false,true).animate({"left":-box_li_width*index+"px"},500);
			});
			
			timer=setInterval(animateNext,time);	
			_box.timer=timer;		//重点
			
			//清除当前计时器
			_box.mouseenter( function(){
				clearInterval(_box.timer);	
			}).mouseleave( function(){
				_box.timer=setInterval(animateNext,time); 
			});
			
			_box.find(".prev").bind("click",animatePrev);
			_box.find(".next").bind("click",animateNext);
		});
	};
})(jQuery);	