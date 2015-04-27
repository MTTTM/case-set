
var Index = function(){

	var Common = window["Common"];

	function init(){

		bindEvent();
	}

	function bindEvent(){

		//新闻、banner分页
		var num = $(".page-1 .pic-list a").length;
		for(i=0;i<num;i++){
			$(".page-1 #page").append('<a href="javascript:void(0)" class="'+(i==0?'current':'')+'"></a>');
		}
		nie.use(["ui.Switch"], function () {
		//tab
		    //$.tab(".page-1 .news-list .news-nav li", ".page-1 .news-list .list-item");
		    $.Switch(".page-1 #page a",".page-1 .pic-list a");
		});
		
		//绑定页面翻页事件
		Common.initPageSlider();

		//底部四大按钮切页
		$("#js_home_intro a").click(function(e){

			var index = parseInt($(this).data("index"),10);

			if(!index)return true;

			Common.changePage(index);
		});

		//左侧预约事件绑定
		YuyuePop.initOrder($("#js_home_order"));

		//右侧易信交互
		$("#js_home_focus a").mouseenter(function(e){

			$(this).find('label').show();

			var type = $(this).hasClass("yixin") ? "yixin" : "weixin";

			$("#js_tmpl_focus").tmpl({type:type}).appendTo("#js_home_focus_content");

			$("#js_home_focus_content").show();

		}).mouseleave(function(e){

			$(this).find('label').hide();

			$("#js_home_focus_content").html('').hide();
		});

		//绑定所有页面的中的返回官网与预定按钮事件
		$(".js_home").click(function(e){

			Common.changePage(1);			
		});
		$(".js_order").click(function(e){

			YuyuePop.show();
		});
	}

	return {
		init : init
	};
}();

Index.init();