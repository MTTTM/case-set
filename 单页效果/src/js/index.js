
var Index = function(){

	var Common = window["Common"];

	function init(){

		bindEvent();
	}

	function bindEvent(){

		//���š�banner��ҳ
		var num = $(".page-1 .pic-list a").length;
		for(i=0;i<num;i++){
			$(".page-1 #page").append('<a href="javascript:void(0)" class="'+(i==0?'current':'')+'"></a>');
		}
		nie.use(["ui.Switch"], function () {
		//tab
		    //$.tab(".page-1 .news-list .news-nav li", ".page-1 .news-list .list-item");
		    $.Switch(".page-1 #page a",".page-1 .pic-list a");
		});
		
		//��ҳ�淭ҳ�¼�
		Common.initPageSlider();

		//�ײ��Ĵ�ť��ҳ
		$("#js_home_intro a").click(function(e){

			var index = parseInt($(this).data("index"),10);

			if(!index)return true;

			Common.changePage(index);
		});

		//���ԤԼ�¼���
		YuyuePop.initOrder($("#js_home_order"));

		//�Ҳ����Ž���
		$("#js_home_focus a").mouseenter(function(e){

			$(this).find('label').show();

			var type = $(this).hasClass("yixin") ? "yixin" : "weixin";

			$("#js_tmpl_focus").tmpl({type:type}).appendTo("#js_home_focus_content");

			$("#js_home_focus_content").show();

		}).mouseleave(function(e){

			$(this).find('label').hide();

			$("#js_home_focus_content").html('').hide();
		});

		//������ҳ����еķ��ع�����Ԥ����ť�¼�
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