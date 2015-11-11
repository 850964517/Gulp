// add by zhengwencai 2015-3-18
var Tip = require('libs/arale/tip/1.2.2/tip.js');
var about=(function(){
    //用户图像鼠标经过事件
    var userHover=function(){
        //添加事件代理
        $(".content_team,.manager").on("mouseover","img",function(){
            var dataUrl=$(this).attr("dataId");
            var fileURL=$("#fileUrl").attr("value");
            //获取提示的内容
            var tipContent=$(this).parent().siblings("dd").html();
            //创建tip提示框
            var t = new Tip({
                trigger: $("dt img[dataid='"+dataUrl+"']") ,
                triggerType: 'mouseover',
                content: '<dd class="managerInfo">'+tipContent+'</dd>',
                effect: 'slide',
                theme: 'white',
                arrowPosition: 11
            });
            //显示tip提示
            t.show();
            if(dataUrl==null || dataUrl.indexOf("manager")>=0){
                return false;
            }else{
               var imgsrc=fileURL+"/platform/images/about/action/"+dataUrl+".png";
               $(this).attr("src",imgsrc);
            }
        });
    };
    //鼠标离开事件
    var userHoverout=function(){
        $(".content_team").on("mouseout","img",function(){
          var defaultId=$(this).attr("defauId");
            var fileURL=$("#fileUrl").attr("value");
            if(defaultId==null){
                return false;
            }else{
                var imgurl=fileURL+"/platform/images/about/user/"+defaultId+".png";
                $(this).attr("src",imgurl);
            }
        });
    };
    return {
        userHover:userHover,
        userHoverout:userHoverout
    }
})(window);

   //用户图像鼠标经过事件
  about.userHover();
  //用户头衔鼠标离开事件
  about.userHoverout();
