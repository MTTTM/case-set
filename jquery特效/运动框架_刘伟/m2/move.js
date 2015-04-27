/**
 * Created by Administrator on 2014/11/25.
 */
function startMove(obj,json,fn)
{
    clearInterval(obj.iTimer);
    var iCur=0;
    obj.iTimer=setInterval(function()
    {
        //定时器每走一次 就把所有属性都执行一次
        var iBtn=true;
        var iSpeed=0;//初始化速度，添加缓冲修改处1
        for(var attr in json)
        {
            var itarget=json[attr];//得到每个目标点
            if(attr=="opacity")
            {
                iCur=Math.round(css(obj,"opacity")*100);
            }
            else
            {
                iCur=parseInt(css(obj,attr));
            }
            iSpeed=(itarget-iCur)/8;//缓冲，添加缓冲修改处2，缓冲运动搞定
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            if(iCur!=itarget)//判断是否所有的值都达到目标
            {
                iBtn=false;
                if(attr=="opacity")
                {
                    obj.style.opacity=(iCur+iSpeed)/100;
                    obj.style.filter="alpha(opacity="+(iCur+iSpeed)+")"
                }
                else
                {
                    obj.style[attr]=iCur+iSpeed+"px";
                }
            }
        }
        if(iBtn)
        {
            clearInterval(obj.iTimer);
            fn&&fn.call(obj); //回调

        }

    },30)

}
function css(obj, attr)
{
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}


