/**
 * Created by Administrator on 2014/11/10.
 */
$(document).ready(function()
{
    var oUl=$("ul")[0];
    var oLi=$("li");
    var oDiv=$("div");
    var timer=null;
    var iNow=0;
    timer=setInterval(function(){

        if(iNow>=2)
        {
            iNow=0;
        }
        else
        {
            iNow++;
        }
           doTab();
       },4000);

    function doTab()
    {
      oDiv.animate({top:-iNow*55+"px"},300)
    }
});
