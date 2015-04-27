
var Common = function(){

	var _nowPage = 1;
	var MAX_PAGE = 4;

	//�Ƿ����ƶ�
	var _nowMoveing = false;

	var _isScroll = false;

	function initPageSlider(){

		//���÷�ҳ�߶�
		var height = $(".content")[0].offsetHeight;

		$("#js_page > .page").css("height",height+"px");

		bindKeyNum();
		bindClickEvent();
		bindScroll();
	}

	//�󶨼����¼�
	function bindKeyNum(){

		$(document.body).keydown(function(e){

			//down
			if(e.keyCode == 40){

				changePage(_nowPage + 1);

				e.preventDefault();
			}
			//up
			else if(e.keyCode == 38){

				changePage(_nowPage - 1);

				e.preventDefault();
			}
		});
	}

	//�󶨹����¼�
	function bindScroll(){

		$(window).scroll(function(){

			_isScroll = true;
		});

		document.body.onmousewheel = checkChangePage;
		if(document.body.addEventListener)document.body.addEventListener("DOMMouseScroll", checkChangePage,false);
	}

	function checkChangePage(event){

		if(_nowMoveing)return false;

		if(_isScroll){
			_isScroll = false;
			return true;
		}

		event = event || window.event;

		var wheel = event.wheelDelta || (event.detail * -1);

		//���Ϸ�ҳ
		if(checkIsSide() == "top" && wheel > 0)changePage(_nowPage - 1);
		if(checkIsSide() == "bottom" && wheel < 0)changePage(_nowPage + 1);

		return true;
	}

	//�󶨶���������ť�¼�
	function bindClickEvent(){

		$("#js_nav a").click(function(e){

			var index = parseInt($(this).data("index"),10);

			if(!index)return true;

			changePage(index);
		});
	}

	//����Ƿ������������ײ�
	function checkIsSide(){

		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		if(!scrollTop)return "top";

		if(scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight){
			return "bottom";
		}
		return false;
	}

	function changePage(pageNum){

		if(_nowMoveing)return false;
		if(pageNum == _nowPage || pageNum > MAX_PAGE || pageNum < 1)return false;

		//�л�header��ѡ��̬
		$("#js_nav .select").removeClass("select");
		$($("#js_nav a").get(pageNum-1)).addClass("select");

		_nowMoveing = true;

		var height = $(".content")[0].offsetHeight;

		var startHeight = 0;

		var moveTop = (pageNum == 1?startHeight:(1-pageNum)*height);

		// $("#js_page").animate({marginTop:moveTop+"px"},1000,"easeInOutQuad",function(){

		// 	_nowMoveing = false;

		// 	pageAnimate(2,"next");
		// });

		var temp_now = _nowPage;
		_nowPage = pageNum;

		pageAnimate(temp_now,"pre",function(){

			$("#js_page > .page-"+temp_now).hide();
			$("#js_page > .page-"+pageNum).show();

			pageAnimate(pageNum,"next",function(){

				_nowMoveing = false;
			},temp_now);
		});
	}

	//ÿ��ҳ��Ĺ��������������п��ٸ�
	function pageAnimate(pageNum,type,cb,preNum){

		switch(pageNum){
			case 1:
				if(type == "next"){

					$(".page-1 .intro").animate({marginTop:"0px"},500,"easeInQuad");
					$(".page-1-bg").delay(300).animate({marginTop:"0px"},500,"easeInQuad");
					$(".page-1 .left-content").delay(500).animate({marginTop:"0px"},500,"easeInQuad");
					$(".page-1 .right-content").delay(700).animate({marginTop:"0px"},500,"easeInQuad",cb);
					
				}
				else{

					$(".page-1-bg").animate({marginTop:"-656px"},500,"easeInQuad");
					$(".page-1 .left-content").delay(300).animate({marginTop:"-520px"},500,"easeInQuad");
					$(".page-1 .right-content").delay(500).animate({marginTop:"-578px"},500,"easeInQuad");
					$(".page-1 .intro").delay(700).animate({marginTop:"-767px"},500,"easeInQuad",cb);
				}
				break;
			case 2:
				if(type == "next"){

					if(pageNum > preNum){

						$(".page-2 .right-top-btn").css("margin-top","812px").animate({marginTop:"0"},500,"easeInQuad");
						$(".page-2 .carousel-part").css("top","760px").delay(200).animate({top:"0"},500,"easeInQuad");
						$(".page-2 #prev-btn,.page-2 #next-btn").css("margin-top","581px").delay(400).animate({marginTop:"0"},500,"easeInQuad");
						$(".page-2 .carousel-nav").css("margin-top","200px").delay(600).animate({marginTop:"0"},300,"easeInQuad",cb);
					}
					else{

						$(".page-2 .right-top-btn").css("margin-top","-60px").animate({marginTop:"0"},500,"easeInQuad");
						$(".page-2 .carousel-part").css("top","-545px").delay(200).animate({top:"0"},500,"easeInQuad");
						$(".page-2 #prev-btn,.page-2 #next-btn").css("margin-top","-455px").delay(400).animate({marginTop:"0"},500,"easeInQuad");
						$(".page-2 .carousel-nav").css("margin-top","-720px").delay(600).animate({marginTop:"0"},500,"easeInQuad",cb);
					}
				}
				else{

					if(pageNum > _nowPage){

						$(".page-2 .right-top-btn").animate({marginTop:"812px"},500,"easeInQuad");
						$(".page-2 .carousel-part").delay(200).animate({top:"760px"},500,"easeInQuad");
						$(".page-2 #prev-btn,.page-2 #next-btn").delay(400).animate({marginTop:"581px"},500,"easeInQuad");
						$(".page-2 .carousel-nav").delay(600).animate({marginTop:"200px"},300,"easeInQuad",cb);
					}
					else{
						$(".page-2 .right-top-btn").animate({marginTop:"-60px"},500,"easeInQuad");
						$(".page-2 .carousel-part").delay(200).animate({top:"-545px"},500,"easeInQuad");
						$(".page-2 #prev-btn,.page-2 #next-btn").delay(400).animate({marginTop:"-455px"},500,"easeInQuad");
						$(".page-2 .carousel-nav").delay(600).animate({marginTop:"-720px"},500,"easeInQuad",cb);
					}
				}
				break;
			case 3:
				if(type == "next"){

					if(pageNum > preNum){

						$(".page-3 .right-top-btn").css("margin-top","812px").animate({marginTop:"0"},500,"easeInQuad");
						$(".page-3 .hero-type-option").css("top","710px").delay(200).animate({top:"0"},500,"easeInQuad");
						$(".page-3 .left-side").css("top","650px").delay(400).animate({top:"0"},500,"easeInQuad");

						if(!$("#js_dianjiang_carddesc").is(":hidden")){
							$(".page-3 .left-intro").css("top","740px").delay(600).animate({top:"0"},500,"easeInQuad");
							$(".page-3 .center-intro").css("top","740px").delay(700).animate({top:"0"},500,"easeInQuad");
							$(".page-3 .right-nav").css("top","740px").delay(800).animate({top:"0"},500,"easeInQuad",cb);
						}
						else{
							$(".page-3 .card-list").css("margin-top","650px").delay(600).animate({marginTop:"0"},500,"easeInQuad",cb);
							$(".page-3 .skill-list").css("margin-top","650px").delay(600).animate({marginTop:"0"},500,"easeInQuad",cb);
						}
					}
					else{

						$(".page-3 .right-top-btn").css("margin-top","-60px").animate({marginTop:"0"},500,"easeInQuad");
						$(".page-3 .hero-type-option").css("top","-182px").delay(200).animate({top:"0"},500,"easeInQuad");
						

						if(!$("#js_dianjiang_carddesc").is(":hidden")){

							$(".page-3 .left-side").css("top","-676px").delay(400).animate({top:"0"},500,"easeInQuad");

							$(".page-3 .left-intro").css("top","-667px").delay(600).animate({top:"0"},500,"easeInQuad");
							$(".page-3 .center-intro").css("top","-763px").delay(700).animate({top:"0"},500,"easeInQuad");
							$(".page-3 .right-nav").css("top","-667px").delay(800).animate({top:"0"},500,"easeInQuad",cb);
						}
						else{

							$(".page-3 .left-side").css("top","-676px").delay(600).animate({top:"0"},500,"easeInQuad",cb);

							$(".page-3 .card-list").css("margin-top","-676px").delay(400).animate({marginTop:"0"},500,"easeInQuad");
							$(".page-3 .skill-list").css("margin-top","-676px").delay(400).animate({marginTop:"0"},500,"easeInQuad");
						}
					}

				}
				else{

					if(pageNum > _nowPage){

						$(".page-3 .right-top-btn").animate({marginTop:"812px"},500,"easeInQuad");
						$(".page-3 .hero-type-option").delay(200).animate({top:"710px"},500,"easeInQuad");
						$(".page-3 .left-side").delay(400).animate({top:"650px"},500,"easeInQuad");

						if(!$("#js_dianjiang_carddesc").is(":hidden")){
							$(".page-3 .left-intro").delay(600).animate({top:"740px"},500,"easeInQuad");
							$(".page-3 .center-intro").delay(700).animate({top:"740px"},500,"easeInQuad");
							$(".page-3 .right-nav").delay(800).animate({top:"740px"},500,"easeInQuad",cb);
						}
						else{
							$(".page-3 .card-list").delay(600).animate({marginTop:"650px"},500,"easeInQuad",cb);
							$(".page-3 .skill-list").delay(600).animate({marginTop:"650px"},500,"easeInQuad",cb);
						}
					}
					else{
						$(".page-3 .right-top-btn").animate({marginTop:"-60px"},500,"easeInQuad");
						$(".page-3 .hero-type-option").delay(200).animate({top:"-182px"},500,"easeInQuad");
						$(".page-3 .left-side").delay(400).animate({top:"-676px"},500,"easeInQuad");

						if(!$("#js_dianjiang_carddesc").is(":hidden")){
							$(".page-3 .left-intro").delay(600).animate({top:"-667px"},500,"easeInQuad");
							$(".page-3 .center-intro").delay(700).animate({top:"-763px"},500,"easeInQuad");
							$(".page-3 .right-nav").delay(800).animate({top:"-667px"},500,"easeInQuad",cb);
						}
						else{
							$(".page-3 .card-list").delay(600).animate({marginTop:"-676px"},500,"easeInQuad",cb);
							$(".page-3 .skill-list").delay(600).animate({marginTop:"-676px"},500,"easeInQuad",cb);
						}
					}
				}
				break;
			case 4:
				if(type == "next"){

					$(".page-4 .right-top-btn").css("margin-top","812px").animate({marginTop:"0"},500,"easeInQuad");
					$(".page-4 .page-4-bg").css("margin-top","925px").delay(200).animate({marginTop:"0"},500,"easeInQuad");
					$(".page-4 .left-content").css("top","720px").delay(400).animate({top:"0"},500,"easeInQuad");
					$(".page-4 .intro").css("top","425px").delay(600).animate({top:"0"},500,"easeInQuad",cb);
				}
				else{

					$(".page-4 .right-top-btn").animate({marginTop:"812px"},500,"easeInQuad");
					$(".page-4 .page-4-bg").delay(200).animate({marginTop:"925px"},500,"easeInQuad");
					$(".page-4 .left-content").delay(400).animate({top:"720px"},500,"easeInQuad");
					$(".page-4 .intro").delay(600).animate({top:"425px"},500,"easeInQuad",cb);
				}
				break;
		}
	}

	return {
		initPageSlider : initPageSlider,
		changePage : changePage
	};
}();


var YuyuePop = function(){

	var _mask,
		_pop;

	var _tmpl = '<div class="ctn">\
			<a class="close-btn" href="javascript:void(0)"></a>\
			<div class="center">\
				<div class="top"></div>\
				<div class="order">\
				</div>\
			</div>\
		</div>';

	var _orderTmpl = '<div class="phone-ctn">\
						<h4 class="title"></h4>\
						<input type="text" maxlength="11" placeholder="�����������ֻ�����" />\
					</div>\
					<div class="type-ctn">\
						<h4 class="title"></h4>\
						<a class="select-btn" href="javascript:void(0)">iOS</a>\
						<ul style="display:none;">\
							<li><a href="javascript:void(0)">iOS</a></li>\
							<li><a href="javascript:void(0)">Android</a></li>\
							<li><a href="javascript:void(0)">����</a></li>\
						</ul>\
					</div>\
					<a class="action-btn" href="javascript:void(0)">����ԤԼ</a>';

	function show(){

		if(!_pop)init();

		_pop.show();
		_mask.show();
	}

	function init(){

		var pop,mask;

		pop = $('<div class="yuyue-pop" id="js_yuyue_pop"></div>');
		mask = $('<div class="mask" id="js_mask"></div>');

		pop.html(_tmpl);

		$(document.body).append(mask);
		$(document.body).append(pop);

		_pop = pop;
		_mask = mask;

		initOrder(_pop.find(".order"));
		bindEvent();
	}

	function initOrder(parentNode){

		parentNode.html(_orderTmpl);

		bindOrderEvent(parentNode);
	}

	function bindEvent(){

		_pop.find(".close-btn").click(function(e){

			hide();
		});

		//bindOrderEvent(_pop);
	}

	function bindOrderEvent(parentNode){

		var order = parentNode;

		//������ť
		order.find(".select-btn").click(function(e){

			order.find("ul").toggle();
		});
		//����ѡ�����¼�
		order.find(".type-ctn ul a").click(function(e){

			order.find("ul").hide();

			order.find(".select-btn").html($(this).html());
		});

		//���Ͱ�ť
		order.find(".action-btn").click(function(e){

			//У���ֻ��Ƿ�Ϸ�
			var phoneValue = order.find("input").val();

			if(!phoneValue)return alert("�������ֻ�����");

			var phonereg = /^\d{11}$/;
	        if(!phonereg.test(phoneValue))
	        {
	            alert('��������Ч���ֻ����룡');
	            return false;
	        }

	        var phoneType = order.find(".select-btn").html();

	        sendActionRequest(phoneValue,phoneType);
		});
	}

	function sendActionRequest(phone,type){

		type = (type == "����"?"other":type);

		$.ajax({
             url:'http://mobile-game-appoint.webapp.163.com/appoint/zgmh/'+phone+'/'+type+'/?src=mobile_web',
             dataType:"jsonp",
             success:function(data){

             	var msg = (data.status == "ok"?"�������Ѿ�ԤԼ�ɹ���Ŷ�������ڼ����������iPhone6������":data.status);

             	alert(msg);
            },
            error : function(){

            	alert("��������ֻ�����������߷�������æ");
            }
        });
	}

	function hide(){

		_pop.hide();
		_mask.hide();
	}

	return {
		show : show,
		hide : hide,
		initOrder : initOrder
	};
}();