/**
 * Created by Administrator on 2014/12/1.
 */
function startMove(obj,attr,iTarget)
{
    clearInterval(obj.timer);
    var iSpeed=0;
    var iCur = parseInt(getStyle(obj, attr));
    obj.timer=setInterval(function()
    {

        iSpeed+=(iTarget-iCur)/50;
        iSpeed*=0.95;
        if(Math.abs(iSpeed)<=1&&Math.abs(iTarget-iCur)<=1)
        {
            clearInterval(obj.timer);//清除定时器
            obj.style[attr]=iTarget+"px";//修正误差
            iSpeed=0;
        }
        obj.style[attr]=iCur+iSpeed+"px";
    },30)
}
function getStyle(obj, attr)
{
    if (obj.currentStyle) {
        return  obj.currentStyle[attr];
    }
    else {
        return   getComputedStyle(obj, false)[attr];
    }
}