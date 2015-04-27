var tabselect = function(){
	$(".carousel-nav").children(".car-btn").eq(0).addClass('active');
	$(".carousel-part").children().eq(0).show();	

	$(".carousel").delegate("a#next-btn", "click", function(){
		node = $(".carousel-nav").children(".active").next();
		if(!node.hasClass("car-btn")){
			node = $(".carousel-nav").children(".car-btn").eq(0);
		}
		nextnod(node);
	});
	$(".carousel").delegate("a#prev-btn", "click", function(){		
		var node = $(".carousel-nav").children(".active").prev();
		if(!node.hasClass("car-btn")){
			node = $(".carousel-nav").children(".car-btn").eq(-1);
		}
		prevnod(node);
	});
	$(".carousel-nav").delegate("a.car-btn", "hover", function() {
		if($(this).hasClass('active')){
			return;
		}else{
			var act = $(".carousel-nav").children(".active");
			var leng = Math.floor($(".carousel-nav").length/2);
			if($(this).attr("name")<(act.attr("name")+leng))
			{
				nextnod($(this));
			}else{
				prevnod($(this));
			}
		}
	});
	function nextnod(nod){
		act = $(".carousel-nav").children(".active");
		actDev = $(".carousel-part").children().eq(act.attr("name"));
		nodDev = $(".carousel-part").children().eq(nod.attr("name"));
		act.removeClass('active');
		nod.addClass('active');
		nodDev.css({"display":"block","left":"100%"}).stop().animate({left:"0"},"fast");
		actDev.stop().animate({left:"-100%"},"fast",function(){
			actDev.css("display","none");
		});

	}
	function prevnod(nod){
		act = $(".carousel-nav").children(".active");
		actDev = $(".carousel-part").children().eq(act.attr("name"));
		nodDev = $(".carousel-part").children().eq(nod.attr("name"));
		act.removeClass('active');
		nod.addClass('active');
		nodDev.css({"display":"block","left":"-100%"}).stop().animate({left:"0"},"fast");
		actDev.stop().animate({left:"100%"},"fast",function(){
			actDev.css("display","none");
		});
	}
};

$(".intro-libao").mouseover(function(event) {
			/* Act on the event */
	$(this).find('.intro-neiceng').stop().animate({top:0}, 300);
}).mouseout(function(event) {
	/* Act on the event */
	$(this).find('.intro-neiceng').stop().animate({top:-200}, 300);
});
/*$(".huodong-page .pre-btn,.huodong-page .next-btn").click(function(event) {
	
	huodongPageMove();
});*/
var aleft=0;
$(".next-btn").click(
function (){
	return num(-130)
	
	}
	)
$(".pre-btn").click(
	function (){
	//aleft=parseInt($('.huodong-intro-div').position().left+(-130));
//	alert($('.huodong-intro-div').offset().left)
	//$('.huodong-intro-div').animate({left:aleft }, 300)
	//alert(typeof(aleft));
	
		
	
//	alert('1');
if(aleft>=-120){
	$('.huodong-intro-div').css("left",-1300);
	$('.huodong-intro-div').animate({left:aleft }, 300)
	aleft=parseInt($('.huodong-intro-div').position().left+(130));
			
			
	}else{
	aleft=parseInt($('.huodong-intro-div').position().left+(130));
			
			$('.huodong-intro-div').animate({left:aleft }, 300)
				
	}
	aleft=parseInt($('.huodong-intro-div').position().left+(130));
			
			$('.huodong-intro-div').animate({left:aleft }, 300)
	
		//alert($('.huodong-intro-div').css("left","0");
	//	alert('1');
		//$('.huodong-intro-div').position().left=0
		/*else{
			//alert('1');
			$('.huodong-intro-div').css("left","0");
			aleft=parseInt($('.huodong-intro-div').position().left+(130));
			
$('.huodong-intro-div').animate({left:aleft }, 300)
			}*/

	}
	)
		
	function num(obj){
	//aleft=parseInt($('.huodong-intro-div').position().left+(-130));
//	alert($('.huodong-intro-div').offset().left)
	//$('.huodong-intro-div').animate({left:aleft }, 300)
	//alert(typeof(aleft));
	if(aleft<=(obj*9))
	{
		$('.huodong-intro-div').css("left","0");
		aleft=0
		
			
			$('.huodong-intro-div').animate({left:aleft }, 300)
			aleft=parseInt($('.huodong-intro-div').position().left+(obj));
		//alert($('.huodong-intro-div').css("left","0");
	//	alert('1');
		//$('.huodong-intro-div').position().left=0
		}else{
			aleft=parseInt($('.huodong-intro-div').position().left+(obj));
			
			$('.huodong-intro-div').animate({left:aleft }, 300)
			}
		
	}
	
	
/*function huodongPageMove(){
	var leftMove =parseInt($('.huodong-intro-div').css("left"));
	//alert(leftMove)
	var $aa=0;
	if(leftMove >=0){
		
		// $aa+=(leftMove+(-260));
		$('.huodong-intro-div').animate({left:-520 }, 300);
	}else if(leftMove==-1170){
		
		$('.huodong-intro-div').animate({left: 0}, 300);
		}
}*/

function autoPageMove(){

	//setInterval(huodongPageMove,3000);
}

autoPageMove();
tabselect();
