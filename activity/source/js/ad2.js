/**
 * Created by ChenChao on 2017/4/26.
 */

$(function() {
    //6.9变化适配
    transform69();

    var mobileSafari = navigator.userAgent.indexOf('eastmoney_ios') > -1;
    var audio = document.getElementById('Jaudio');
    var Laba = document.getElementById('Laba');
    var isPlay = false;
    audio.play();

    document.addEventListener("WeixinJSBridgeReady", function() {
        audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        audio.play();
    }, false);

    Laba.onclick = function() {
        isPlay = !isPlay;
        if (isPlay) {
            audio.pause();
            Laba.className = 'laba pause';
        } else {
            audio.play();
            Laba.className = 'laba';
        }
    };


    var $pages = $('.swiper-slide');
    var total = $pages.size();
    var $pager = $('#arrowDown');
    $pages.eq(0).addClass('page-active');
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onTouchStart: function() {
            if (mobileSafari && !isPlay) {
                audio.play();
            }
        },
        onTouchEnd: function(swiper) {
            $pager[swiper.activeIndex === total - 1 ? 'hide' : 'show']();
            $pages.removeClass('page-active').eq(swiper.activeIndex).addClass('page-active');
        },
        onSlideChangeEnd: function(swiper) {
            $pager[swiper.activeIndex === total - 1 ? 'hide' : 'show']();
            $pages.removeClass('page-active').eq(swiper.activeIndex).addClass('page-active');
        }
    });

    var $btn = $('#coreBtn');
    var rw = $btn.width();
    var rh = $btn.height();
    /*$btn.on('tap', function () {
	location.href = btnLink;
    });*/
    Raphael("coreBtn", rw, rh, function() {
        var dd = 10;
        var x = 3 * dd / 2,
            y = dd / 4,
            w = rw - 3 * dd,
            h = rh - 4 * dd;
        var path = 'M' + [x, y + dd].join(',');
        path += 'h' + w;
        path += 'q' + [dd, 0, dd, dd].join(' ');
        path += 'v' + h;
        path += 'q' + [0, dd, -dd, dd].join(' ');
        path += 'h-' + w;
        path += 'q' + [-dd, 0, -dd, -dd].join(' ');
        path += 'v-' + h;
        path += 'q' + [0, -dd, dd, -dd].join(' ');
        path += 'z';
        var r = this,
            set = r.set(),
            p = r.path(path).attr({ stroke: "#45bbf8", opacity: 1, "stroke-width": 1 }),
            len = p.getTotalLength(),
            e = r.image('../resource/img/ad2/lightPoint.png', -10, -10, 20, 20),
            t = r.text(x + w / 2, y + h / 2 + 20, btnText).attr({
                'fill': '#45bbf8',
                'font-size': 20
            });
        set.push(p);
        set.push(e);
        set.push(t);
        set.click(function() {
            location.href = btnLink;
        });
        r.customAttributes.along = function(v) {
            var point = p.getPointAtLength(v * len);
            return {
                transform: "t" + [point.x, point.y] + "r" + point.alpha
            };
        };
        e.attr({ along: 0 });

        function run() {
            e.animate({ along: 1 }, 5000, function() {
                e.attr({ along: 0 });
                setTimeout(run);
            });
        }
        run();
    });

    function transform69() {
        var $img69 = $('#img69');
        var $img69Start = $('#img69Start');
        var sw = $img69Start.width();
        var sh = $img69Start.height();
        var scale = sh / sw;
        var winWidth = $('body').width();
        var rw = winWidth * 0.8;
        var rh = scale * rw;
        $img69.css('height', rh);
        $img69Start.css({
            'transform': 'scale(' + (rw / sw + 0.1) + ')'
        });
    }
});