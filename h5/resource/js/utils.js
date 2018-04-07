/**
 * Created by Administrator on 2017/7/12.
 */
var timer = null;
var utils = {
    //切换tab
    tab: function (nav, ele, className) { //nav->string，切换栏；ele->切换对应的内容。className为导航栏激活的状态。
        $("body").on("click", nav, function () {
            $(this).siblings().removeClass(className);
            $(this).addClass(className);
            $(ele).hide();
            $(ele).eq($(this).index()).show();
        });
    },
    //关注按钮点击切换
    careTab: function (ele, className) {
        $("body").on("click", ele, function () {
            if ($(this).hasClass(className)) {
                $(this).removeClass(className).html("关注");
            } else {
                $(this).addClass(className).html("已关注");
            }
        });
    },
    //向左跑马灯
    scrollLeft: function ($obj) {
        var $child = $obj.children().clone();
        $obj.append($child);
        var initLeft = 0;
        clearInterval(timer);
        timer = setInterval(function () {
            initLeft = $obj.scrollLeft();
            initLeft++;
            if (initLeft >= $child.width()) {
                initLeft -= $child.width();
            }
            $obj.scrollLeft(initLeft);
        }, 30);
    },
    //向上跑马灯
    scrollTop: function ($obj) {
        var $child = $obj.children().clone();
        $obj.append($child);
        var initTop = 0;
        clearInterval(timer);
        timer = setInterval(function () {
            initTop = $obj.scrollTop();
            initTop++;
            if (initTop >= $child.height()) {
                initTop -= $child.height();
            }
            $obj.scrollTop(initTop);
        }, 30);
    },
    popBoxShow: function ($pop) {
        scrollTop = $("body").scrollTop();
        $("body").addClass("popShow");
        $(".mask").show();
        $pop.show();
    },
    popBoxHide: function ($pop) {
        $(".mask").hide();
        $pop.hide();
        $("body").removeClass("popShow").scrollTop(scrollTop);
    },
    startMove(element, iTarget) {
        clearInterval(timer);
        timer = setInterval(function () {
            //因为速度要动态改变，所以必须放在定时器中
            var iSpeed = (iTarget - element.offsetTop) / 8; //(目标值-当前值)/缩放系数=速度
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //速度取整
            if (element.offsetTop === iTarget) { //结束运动
                clearInterval(timer);
            } else {
                element.style.top = element.offsetTop + iSpeed + "px";
            }
        }, 30);
    }
};