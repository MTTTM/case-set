function startMove(obj,json,fn) {  //传递3个参数
    //所有设置多物体运动的时候不能共用
    clearInterval(obj.timer);//关闭this的timer
    obj.timer = setInterval(function () {
      for(var attr in json)  //使用json来传入多个值，需要遍历
      {
          var iCur = 0;
          if (attr == "opacity")  //对传人值进行判断
          {
              iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);  //任何时候后都尽量避免使用浮动数字
          }
          else {
              iCur = parseFloat(getStyle(obj, attr));
          }
          var Speed = (json[attr]- iCur) / 8;//使用缓冲运动
          Speed = Speed > 0 ? Math.ceil(Speed) : Math.floor(Speed);//缓冲运动必须取整
          if (iCur ==json[attr]) {
              clearInterval(obj.timer);
              if(fn) //进行判断，如果没有做回调函数就不会执行它
              {
                  fn();
              }

          } else {
              if (attr == "opacity") {
                  obj.style.filter = "alpha:apha(opacity:" + (iCur + Speed) + ")";
                  obj.style.opacity = (iCur + Speed) / 100;
                  document.title = obj.style.opacity;
              }
              else {
                  obj.style[attr] = iCur + Speed + "px";   //设置宽高
              }

          }
      }
    }, 30);

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return  obj.currentStyle[attr];
        }
        else {
            return   getComputedStyle(obj, false)[attr];
        }
    }
}
