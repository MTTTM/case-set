
var DianJiang = function(){

	var Common = window["Common"];

	var _init = false;

	var _MainType = "hero";

	var _HeroType = "job";

	var _ThirdType = "xiaojiang";

	var _StarLevel = 4;

	var _CgiHost = 'http://s.webcgi.163.com/zgmhdb/';

	var _JobHashMap = {
		"xiaojiang":"\u9a81\u5c06",
		"feiyu":"\u98de\u7fbd",
		"xuanjia":"\u7384\u5bb6",
		"ceshi":"\u7b56\u58eb"
	};
	var _CountryHashMap = {
		"shu":"\u8700\u56fd",
		"wu":"\u5434\u56fd",
		"qun":"\u7fa4\u96c4",
		"wei":"\u9b4f\u56fd"
	};
	var _SkillHashMap = {
		"zhudong":"\u4e3b\u52a8",
		"beidong":"\u88ab\u52a8"
	}

	var _SkillColorStarMap = {
		1: '\u7eff\u8272',
		2: '\u84dd\u8272',
		3: '\u7d2b\u8272',
		4: '\u6a59\u8272'
	}

	var _HeroList = [];

	var _NowHeroList = [];

	var _NowHeroIndex = 0;

	var _NowHeroPageIndex = 1;
	var _NowHeroPageSize = 3;

	var _SkillList = [];

	var _NowSkillList = [];
	var _SkillPageSize = 5;
	var _NowSkillPageIndex = 1;

	function init(){

		if(_init)return false;
		_init = true;

		bindEvent();

		initCardList();
	}

	function bindEvent(){

		//左侧英雄与技能选项
		$("#js_dianjiang_herotype").click(function(e){

			changeMainType("hero");
		});
		$("#js_dianjiang_skilltype").click(function(e){

			changeMainType("skill");
		});

		//左侧英雄二级分类
		$("#js_dianjiang_jobtype").click(function(e){
			changeHeroType("job");
		});
		$("#js_dianjiang_countrytype").click(function(e){
			changeHeroType("country");
		});

		//左侧三级分类
		$("#js_dianjiang_type_list li").click(function(e){

			changeThirdType(this);
		});

		//左侧星星级别
		$("#js_dianjiang_star_list a").click(function(e){

			var level = parseInt($(this).data("level"),10);

			changeStarLevel(level);
		});


		//右侧翻页按钮
		$("#js_dianjiang_list_page_pre").click(function(e){

			if(_MainType == "skill")showSkillListPage(_NowSkillPageIndex-1);
			else showCardListPage(_NowHeroPageIndex-1);
		});
		$("#js_dianjiang_list_page_next").click(function(e){

			if(_MainType == "skill")showSkillListPage(_NowSkillPageIndex+1);
			else showCardListPage(_NowHeroPageIndex+1);
		});
	}

	//切换主类
	function changeMainType(type){

		if(type == _MainType)return false;

		_MainType = type;

		//切换1级分类样式
		$("#js_dianjiang_"+type+"type").addClass("check");
		$("#js_dianjiang_"+(type=="hero"?"skill":"hero")+"type").removeClass("check");

		if(type == "skill"){
			
			//显示技能分类
			$("#js_dianjiang_type_list ul").hide();
			$("#js_dianjiang_skilltype_list").show();

			//隐藏英雄分类
			$("#js_dianjiang_jobtype").hide();
			$("#js_dianjiang_countrytype").hide();

			_HeroType = "";

			//默认选中该分类第一个
			changeThirdType($("#js_dianjiang_skilltype_list li").get(0));

			//显示右侧技能列表
			showSkillList();
		}
		else{

			//默认选中英雄类型第一个
			changeHeroType("job");

			//显示英雄分类
			$("#js_dianjiang_jobtype").show();
			$("#js_dianjiang_countrytype").show();
		}
	}

	//切换显示右侧内容
	function changeRightPage(type){

		switch(type){

			case "card-list":
				$("#js_dianjiang_carddesc").hide();
				$("#js_dianjiang_cardlist").parent().show();
				$("#js_dianjiang_skill_list").parent().hide();
				break;
			case "card-desc":
				$("#js_dianjiang_carddesc").show();
				$("#js_dianjiang_cardlist").parent().hide();
				$("#js_dianjiang_skill_list").parent().hide();
				break;
				break;
			case "skill-list":
				$("#js_dianjiang_carddesc").hide();
				$("#js_dianjiang_cardlist").parent().hide();
				$("#js_dianjiang_skill_list").parent().show();
				break;
			default:break;
		}
	}

	//切换英雄类型
	function changeHeroType(type){

		if(type == _HeroType)return false;
		_HeroType = type;

		//显示对应分类列表
		$("#js_dianjiang_type_list ul").hide();
		$("#js_dianjiang_"+type+"type_list").show();

		//设置分类选中态
		$("#js_dianjiang_"+type+"type").addClass("check");
		$("#js_dianjiang_"+(type=="job"?"country":"job")+"type").removeClass("check");

		//默认选中该分类第一个
		changeThirdType($("#js_dianjiang_"+type+"type_list li").get(0));
	}

	//切换三级分类
	function changeThirdType(target){

		var type = target.firstChild.className.replace("font ","");

		if(_ThirdType == type)return false;
		_ThirdType = type;

		//设置选中态
		$(target.parentNode).find(".select").removeClass("select");
		$(target).addClass("select");

		//显示最终分类
		$("#js_dianjiang_type_big")[0].className = "font d_"+type;

		//显示右侧列表
		if(_MainType == "hero")showHeroCardList();
		else showSkillList();
	}

	//切换星星
	function changeStarLevel(level){

		if(_StarLevel == level && $("#js_dianjiang_carddesc").is(":hidden"))return false;
		_StarLevel = level;

		$("#js_dianjiang_star_list .select").removeClass("select");
		$($("#js_dianjiang_star_list a").get(Math.abs(level-4))).addClass("select");

		//显示右侧列表
		if(_MainType == "hero")showHeroCardList();
		else showSkillList();
	}


	function initCardList(){

		$.ajax({
             url:_CgiHost+'hero_list',
             dataType:"jsonp",
             success:function(data){

             	_HeroList = data;

                showHeroCardList();
            }
        });
	}

	function showHeroCardList(){

		var html = '';

		var result = [];

		//筛选出适合条件的
		for(var i=0;i<_HeroList.length;i++){

			var item = _HeroList[i];

			if(_HeroType == "job"){

				if(item.job != _JobHashMap[_ThirdType])continue;
			}
			else{
				if(item.country != _CountryHashMap[_ThirdType])continue;
			}

			if(item.color == _SkillColorStarMap[_StarLevel])result.push(item);
		}

		var pages = Math.ceil(result.length / 3);
		var count = 18;

		if(pages > 6){
			count = pages * 3;

			$("#js_dianjiang_list_page").show();
			$("#js_dianjiang_list_page_pre").addClass("dis");
			$("#js_dianjiang_list_page_next").removeClass("dis");
		}
		else {

			$("#js_dianjiang_list_page").hide();
		}

		var result_data =  jQuery.extend(true, {}, result);;
		result_data.length = count;

		$("#js_dianjiang_cardlist").html('').css("width",(pages>6?pages*160:960)+"px").css("margin-left","0px");
		$("#js_tmpl_herolist").tmpl({list:result_data}).appendTo("#js_dianjiang_cardlist");

		changeRightPage("card-list");

		_NowHeroList = result;
		bindCardEvent();
	}

	function bindCardEvent(){

		$("#js_dianjiang_cardlist li").mouseenter(function(e){

			if(this.className == "no")return false;

			$("#js_dianjiang_cardlist li .cover-img").css("top","-160px");


			$(this).find(".cover-img").stop().animate({top:0}, 300);

		}).mouseleave(function(e){

			//$(this).find(".cover-img").slideUp('fast');.
			$(this).find(".cover-img").stop().animate({top:-160}, 300);

		}).click(function(e){

			var id = $(this).data("id");

			if(!id)return false;

			//计算位置
			for(var i=0;i<_NowHeroList.length;i++){

				if(id == _NowHeroList[i].id){
					_NowHeroIndex = i+1;
					break;
				}
			}

			//切到详情
			showHeroCard(id);
		});
	}

	//切换英雄列表分页
	function showCardListPage(page){

		var $list = $("#js_dianjiang_cardlist");

		var totalPage = Math.ceil((_NowHeroList.length - 18) / 3);

		if(page < 1 || page > totalPage)return false;
		
		_NowHeroPageIndex = page;

		//切换翻页按钮选中态
		if(page > 1){
			$("#js_dianjiang_list_page_pre").removeClass("dis");
		}
		else{
			$("#js_dianjiang_list_page_pre").addClass("dis");
		}
		if(page < totalPage){
			$("#js_dianjiang_list_page_next").removeClass("dis");
		}
		else{
			$("#js_dianjiang_list_page_next").addClass("dis");
		}

		$list.animate({marginLeft:(page*160*-1)+"px"},"normal","easeInOutQuad");
	}

	//显示英雄具体详情
	function showHeroCard(id){

		$.ajax({
             url:_CgiHost+'hero_info/'+id+'/',
             dataType:"jsonp",
             success:function(data){

             	//_HeroList = data;

                showHeroCardCb(data);
            }
        });
	}

	//显示英雄具体详情外部回调接口
	function showHeroCardCb(data){

		var nowList = [];

		var l = _NowHeroList.length;

		if(_NowHeroList <= 9)nowList = _NowHeroList;
		else{

			if(_NowHeroIndex <= 5){
				nowList = _NowHeroList.slice(0,9);
			}
			else if(_NowHeroIndex >= l - 5){
				nowList = _NowHeroList.slice(l-8,l+1);
			}
			else{
				nowList = _NowHeroList.slice(_NowHeroIndex-5,_NowHeroIndex+4);
			}
		}

		//分组技能列表
		var skill = [];
		for(var i=0;i<data.special_skill.length;i++){

			var item = data.special_skill[i];

			var pos = item.indexOf(":");

			skill.push({name:item.substr(0,pos),desc:item.substr(pos+1)});
		}

		//分组推荐属性
		var attri = [];
		var attri_str = data.recommended_skill.replace(/\u3002/gi,"").split(/\uff1b/);

		for(i=0;i<attri_str.length;i++){

			var item = attri_str[i];

			var pos = item.indexOf("\uff1a");

			attri.push({name:item.substr(0,pos),desc:item.substr(pos+1)});
		}

		//计算位置
		for(i=0;i<_NowHeroList.length;i++){

			if(_NowHeroList[i].id == data.id){

				_NowHeroIndex = i+1;
				break;
			}
		}
		
		data.index = _NowHeroIndex;
		data.list = nowList;
		data.skill = skill;
		data.attri = attri;

		//切换显示
		changeRightPage("card-desc");

		//隐藏右上角分页
		$("#js_dianjiang_list_page").hide();

		$("#js_dianjiang_carddesc").html('');

		$('#js_tmpl_carddesc').tmpl(data).appendTo('#js_dianjiang_carddesc');

		//画上6维图
		buildChart([
				data.leadership,
				data.attack,
				data.durability,
				data.attack_speed == 2?40:80,
				data.health,
				data.intelligence,
			]);

		//使右侧翻页导航居中
		$("#js_dianjiang_desc_right_page").css("margin-top",((560-$("#js_dianjiang_desc_right_page")[0].offsetHeight)/2)+"px");

		bindDescEvent();
	}

	function buildChart(value) {
        require.config({
            paths: {
                'echarts': './js/echarts',
                'echarts/chart/radar': './js/echarts'
            }
        });
        require(
        ['echarts', 'echarts/chart/radar'], 
        function(ec) {
            var myChart = ec.init(document.getElementById("js_dianjiang_desc_chart"));
            var option = {
                polar: [{
                        indicator: [
                            {text: '统帅',max: 100}, 
                            {text: '武力',max: 100}, 
                            {text: '耐力',max: 100}, 
                            {text: '速度',max: 100}, 
                            {text: '体力',max: 100}, 
                            {text: '智力',max: 100}
                        ],
                        name: {show: true,textStyle: {color: '#566068'}},
                        radius: 60,
                        splitArea: {
                            areaStyle: {
                                color: ['#f6f6f6', '#d6d8da']
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#52575e',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#52575e',
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }],
                series: [{
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default',
                                    color: "rgba(7,172,125, 0.5)"
                                },
                                lineStyle: {
                                    width: 0
                                },
                                color: '#07ac7d'
                            }
                        },
                        data: [
                            {value: [parseInt(value[0]), parseInt(value[1]), parseInt(value[2]), parseInt(value[3]), parseInt(value[4]), parseInt(value[5])]}
                        ]
                    }]
            };
            myChart.setOption(option);
        }
        );
    }

	//绑定英雄详情的事件
	function bindDescEvent(){

		//左侧切换显示特性与属性
		$("#js_dianjiang_desc_plus a").mouseenter(function(e){

			var isFirst = $(this).hasClass("skill");

			//切换样式
			$(this).parent().find(".select").removeClass("select");
			$(this).addClass("select");

			//显示对应的内容
			$("#js_dianjiang_desc_plus .info-type-desc").hide();
			$($("#js_dianjiang_desc_plus .info-type-desc").get(isFirst?0:1)).show();
		});

		//中间切换按钮
		$("#js_dianjiang_desc_pre").click(function(e){

			showNextHeroCard(_NowHeroIndex-1);
		});
		$("#js_dianjiang_desc_next").click(function(e){
			showNextHeroCard(_NowHeroIndex+1);
		});

		//右侧列表点击
		$("#js_dianjiang_desc_right_page a").click(function(e){

			var index = parseInt($(this).data("index"),10);

			showHeroCard(index);

		});
	}

	//展示指定的英雄
	function showNextHeroCard(index){

		if(index < 1)index = _NowHeroList.length;
		if(index > _NowHeroList.length)index = 1;

		if(index == _NowHeroIndex)return false;
		_NowHeroIndex = index;

		showHeroCard(_NowHeroList[index-1].id);
	}

	//展示技能列表
	function showSkillList(){

		if(!_SkillList.length)return getSkillList();

		var result = [];

		//筛选出适合条件的技能
		for(var i=0;i<_SkillList.length;i++){

			var item = _SkillList[i];

			if(item.tag == _SkillHashMap[_ThirdType] && item.color == _SkillColorStarMap[_StarLevel])result.push(item);
		}

		_NowSkillList = result;

		showSkillListPage(1);

		changeRightPage("skill-list");
	}

	//按分页展示技能列表
	function showSkillListPage(page){

		//计算总页数
		var totalPage = Math.ceil(_NowSkillList.length / _SkillPageSize);

		totalPage = totalPage || 1;

		if(page <= 0 || page > totalPage)return false;

		_NowSkillPageIndex = page;

		//展示分页数据
		var data = _NowSkillList.slice((page-1)*_SkillPageSize,page*_SkillPageSize);
		data.length = _SkillPageSize;

		$("#js_dianjiang_skill_list").html('');

		$('#js_tmpl_skill_list').tmpl({list:data}).appendTo('#js_dianjiang_skill_list');

		//重新计算双行问题
		refixEffectLine();

		//切换分页按钮状态
		if(totalPage>1){
			$("#js_dianjiang_list_page").show();
		}
		else {
			$("#js_dianjiang_list_page").hide();
		}

		if(page == 1){
			$("#js_dianjiang_list_page_pre").addClass("dis");
		}
		else{
			$("#js_dianjiang_list_page_pre").removeClass("dis");
		}
		if(page >= totalPage){
			$("#js_dianjiang_list_page_next").addClass("dis");
		}
		else{
			$("#js_dianjiang_list_page_next").removeClass("dis");
		}
	}

	//计算效果栏是否需要添加双行显示
	function refixEffectLine(){

		$("#js_dianjiang_skill_list .xiaoguo").each(function(index,item){

			if(item.scrollHeight > item.offsetHeight){
				$(item).addClass("double");
			}
		});
	}

	//调用jsonp拉取数据
	function getSkillList(){

		$.ajax({
             url:_CgiHost+'skill_list',
             dataType:"jsonp",
             success:function(data){

             	_SkillList = data;

                showSkillList();
            }
        });
	}

	//拉取技能数据回调
	function showSkillListCb(data){

		_SkillList = data;

		showSkillList();
	}

	return {
		init : init,
		showHeroCardList : showHeroCardList,
		showHeroCardCb : showHeroCardCb,
		showSkillListCb : showSkillListCb
	}
}();

DianJiang.init();