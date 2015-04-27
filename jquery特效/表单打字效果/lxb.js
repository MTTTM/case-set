window.onload=function()
{
    var sxTxtInput=document.getElementById("txt");
    lxbCallTxt(sxTxtInput,"请输入您的电话号码");//����򣬰�ť
    function lxbCallTxt(txt,message) {
        var timer = null;
        var tel_num = message;
        var num_m = "";
        var i = 0;
        timer = setInterval(autoAd, 300);
        function autoAd() {
            txt.value = "";
            if (i > tel_num.length) {
                i = 0;
                num_m = "";
            }
            else
            {
                num_m += tel_num.charAt(i);
                txt.value = num_m;
                i++;
            }

        }

        txt.onfocus = function () {
            var tvalue = txt.value;
            var pdw = tvalue.substring(0, 1);
            if (pdw == "请") {
                clearInterval(timer);
                txt.value = "";
            }
        };
        txt.onblur = function () {
            var tvalue = txt.value;
            var pdw = tvalue.substring(0, 1);
            if (pdw == "请" || pdw == "") {
                num_m = "";
                txt.value = num_m;
                i = 0;
                timer = setInterval(autoAd, 300);
            }
        };
    }
};