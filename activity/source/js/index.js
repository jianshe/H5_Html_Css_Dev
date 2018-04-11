(function() {
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    }

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var mobileSafari = navigator.userAgent.indexOf('eastmoney_ios') > -1;
    var audio = document.getElementById('bgm');
    var btnPlay = document.getElementById('btn-play');
    var shouYin = document.getElementById('shou-yin');
    var jianPan = document.getElementById('jian-pan');
    var paiDui = document.getElementById('pai-dui');
    var isPlay = false;
    var volume = 0.6;
    shouYin.volume = 0.3;
    paiDui.volume = 0.3;
    jianPan.volume = 0.3;
    var wxFirstLoad = true;
    var deviceData = {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
    var scale = deviceData.w / deviceData.h;

    // document.addEventListener("WeixinJSBridgeReady", function() {
    //     WeixinJSBridge.call('hideOptionMenu');
    //     //toggleMusic();
    //     audio.play();
    //     paiDui.play();
    //     paiDui.pause();
    //     wxFirstLoad = false;
    // }, false);

    var preImg = [
        '../resource/img/niu1.png',
        '../resource/img/niu2.png',
        '../resource/img/bg.jpg'
    ];
    var imgResource = [
        //page0
        '../resource/img/np0-text-desc1.png',
        '../resource/img/np0-text-desc2.png',
        '../resource/img/tg.png',

        //page1
        '../resource/img/bg-fkxc.png',
        '../resource/img/cloud1.png',
        '../resource/img/cloud2.png',
        '../resource/img/cloud3.png',
        '../resource/img/line-dw.png',
        '../resource/img/text-dw.png',
        '../resource/img/music-off.png',
        '../resource/img/music-on.png',
        '../resource/img/qiqiu.png',
        '../resource/img/text-dw.png',
        '../resource/img/text-fkxc.png',
        '../resource/img/yanjing.png',
        '../resource/img/qianbi.png',
        '../resource/img/photos.png',
        '../resource/img/text-desc1.png',
        '../resource/img/slideUp.png',

        //page2
        '../resource/img/np2-bg.png',
        '../resource/img/np2-10z.png',
        '../resource/img/np2-20z.png',
        '../resource/img/np2-30z.png',
        '../resource/img/np2-50z.png',
        '../resource/img/np2-100z.png',
        '../resource/img/np2-cloud.png',
        '../resource/img/np2-dayan1.png',
        '../resource/img/np2-dayan2.png',
        '../resource/img/np2-man.png',
        '../resource/img/np2-man-mask.png',
        '../resource/img/np2-pop-pop.png',
        '../resource/img/np2-stock.png',
        '../resource/img/np2-text-desc.png',

        //page3
        '../resource/img/text-desc2.png',
        '../resource/img/bbj1.png',
        '../resource/img/bbj2.png',
        '../resource/img/bf-btn-off.png',
        '../resource/img/bf-btn-on.png',
        '../resource/img/gbyx1.png',
        '../resource/img/gbyx2.png',
        '../resource/img/line-djbf.png',
        '../resource/img/text-djbf.png',
        '../resource/img/shouyinji.png',

        //page5
        '../resource/img/np5-people.png',
        '../resource/img/np5-people-mask.png',
        '../resource/img/np5-text-desc.png',
        '../resource/img/np5-screen1.png',
        '../resource/img/np5-screen2.png',

        //page6
        '../resource/img/p6-bg.png',
        '../resource/img/p6-hand1.png',
        '../resource/img/p6-hand2.png',
        '../resource/img/p6-light.png',
        '../resource/img/p6-stock1.png',
        '../resource/img/p6-stock2.png',
        '../resource/img/p6-stock3.png',
        '../resource/img/p6-stock4.png',
        '../resource/img/p6-stock5.png',
        '../resource/img/p6-text-desc.png',
        '../resource/img/p6-wuqi.png',

        //page7
        '../resource/img/np7-bg.png',
        '../resource/img/np7-text-desc.png',
        '../resource/img/np7-video.png',
        '../resource/img/ssdh.gif',
        '../resource/img/np7-phone-screen1.png',
        '../resource/img/np7-phone-screen2.png',

        //page8
        '../resource/img/p8-body.png',
        '../resource/img/p8-hand-right.png',
        '../resource/img/p8-text-pop-1.png',
        '../resource/img/p8-swiper-box.png',
        '../resource/img/p8-cloud.png',
        '../resource/img/p8-hand.png',
        '../resource/img/p8-swiper-img1.jpg',
        '../resource/img/p8-swiper-img2.jpg',
        '../resource/img/p8-swiper-img3.jpg',
        '../resource/img/p8-swiper-img4.jpg',
        '../resource/img/p8-swiper-img5.jpg',
        '../resource/img/p8-text-desc.png',
        '../resource/img/p8-text-pop.png',

        //page9
        '../resource/img/np8-dadi.png',
        '../resource/img/np8-dayan1.png',
        '../resource/img/np8-dayan2.png',
        '../resource/img/np8-download-btn.png',
        '../resource/img/np8-gsc.png',
        '../resource/img/np8-gsc-gd.png',
        '../resource/img/np8-house-left.png',
        '../resource/img/np8-house-right.png',
        '../resource/img/np8-logo.png',
        '../resource/img/np8-sun.png',
        '../resource/img/np8-tree-left.png',
        '../resource/img/np8-tree-right.png',
        '../resource/img/np8-text-desc.png',
        '../resource/img/np8-text-desc2.png',
        '../resource/img/np8-view-more.png',
        '../resource/img/download-btn.png',
        '../resource/img/download-btn2.png',
        '../resource/img/story-btn.png',
        '../resource/img/feedback-btn.png',

        //留言
        '../resource/img/ly-page-close.png',
        '../resource/img/ly-page-input-0.png',
        '../resource/img/ly-page-input-1.png',
        '../resource/img/ly-page-submit-btn.png',
        '../resource/img/ly-page-text-desc.png',
        '../resource/img/ly-list-face.png',
        '../resource/img/ly-list-item-bg.png',
        '../resource/img/ly-list-loading-text.png',
        '../resource/img/ly-list-text-desc.png',
        '../resource/img/ly-list-text-desc2.png',
        '../resource/img/ly-list-title.png',
        '../resource/img/ly-list-up-arrow.png',
        '../resource/img/ly-list-back.png',
        '../resource/img/ly-list-wyly.png',
        '../resource/img/ly-act-text.png',

        //感恩留言
        '../resource/img/gn-back-btn.png',
        '../resource/img/gn-lwbg.png',
        '../resource/img/gn-qrcode-text.png',
        '../resource/img/gn-share-btn.png',
        '../resource/img/gn-share-mask.png',
        '../resource/img/gn-text-title.png',
        '../resource/img/gn-title.png'
    ];
    $(function() {
        var $stage = $('#stage');
        var $loading = $('#loading');
        var $percent = $('#percent');
        var $music = $('#music');
        var $nextBtn = $('[data-next]'); //翻开相册
        var $slideUp = $('#slideUp'); //
        var $tg = $('#tg'); //点击跳过
        var $np2PopStock = $('#np2PopStock'); //股票点击放大元素

        var _Swiper = null;
        var startTimer = null;


        var startTime = new Date().getTime();

        $music.on('click', toggleMusic);
        $nextBtn.on('click', function() {
            $('.page1').find('.white-mask').show().addClass('mask-on');
            setTimeout(function() {
                _Swiper.slideTo(2, 0, true);
            }, 800);
        });

        $np2PopStock.on('click', function() {
            $(this).toggleClass('showBig');
        });


        //背景音乐切换
        function toggleMusic() {
            audio.volume = volume;
            if (!isAndroid && isWeiXin() && wxFirstLoad) {
                return;
            }
            if (isPlay) {
                audio.pause();
            } else {
                audio.play();
            }
            isPlay = !isPlay;
            if ($music.hasClass('music-on')) {
                $music.removeClass('music-on').addClass('music-off');
                return;
            }
            if ($music.hasClass('music-off')) {
                $music.removeClass('music-off').addClass('music-on');
            } else {
                $music.show().addClass('music-on');
            }
        }

        function enter() {
            toggleMusic();
            $loading.addClass('hide');
            setTimeout(function() {
                $loading.remove();
                _Swiper = new Swiper('#stage-swiper', {
                    direction: 'vertical',
                    noSwiping: true,
                    noSwipingClass: 'stop-swiping',
                    onTouchStart: function() {
                        //在翻开相册前先隐藏蒙版
                        $('.page1, .page2').find('.white-mask').hide().removeClass('mask-on');
                    },
                    onSlideChangeStart: function(_Swiper) {
                        _Swiper.lockSwipes(); //锁定_Swiper，阻止其滑动。可以使用 mySwiper.unlockSwipes() 解锁。
                        $slideUp.hide();
                    },
                    onSlideChangeEnd: function(swiper) {
                        var index = swiper.activeIndex;
                        _Swiper.lockSwipes();
                        if (index === 0 || index === 1) {
                            $slideUp.hide();
                            $('.page2').find('.white-mask').show().removeClass('mask-on');
                            _Swiper.unlockSwipes();
                        }
                        pageSprite(swiper.activeIndex, swiper);
                        //var slideUpShowDelays = [0, 5, 5.5, 6.5, 4.5, 5.5, 4.5, 4.3, 0];
                        var slideUpShowDelays = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                        if (index > 1 && index < 9) {
                            console.log(slideUpShowDelays[index], '秒后才能滑动');
                            setTimeout(function() {
                                $slideUp.show();
                                _Swiper.unlockSwipes();
                            }, slideUpShowDelays[index] * 1000);
                        }
                    }
                });
                window._Swiper = _Swiper;

                startTimer = setTimeout(function() {
                    _Swiper.slideTo(1, 0, true);
                }, 5800);

                setTimeout(function() {
                    $tg.show(500);
                }, 10);
            }, 100);
        }
        init(preImg, imgResource, function(s) {
            console.log('正在加载...' + s.complete + '/' + s.total);
            $percent.html((s.complete / s.total * 100).toFixed(0) + '%');
        }, function(imgs, s) {
            //console.log('图片资源已加载完成，计划加载:' + s.total + ', 加载成功:' + s.load + '错误:' + s.error);
            var loadingTimeDelay = new Date().getTime() - startTime;
            if (loadingTimeDelay < 2000) {
                setTimeout(function() {
                    enter();
                }, 2000 - loadingTimeDelay);
            } else {
                enter();
            }
        });

        //页面动画精灵
        function pageSprite(index, swiper) {
            $('.stage').find('[data-sprite]').removeClass('sprite-on');
            var pageSpriteMap = {
                'page0': function() {},
                'page1': function() {},
                'page2': function() {
                    initPageSprite(index);
                    pdTimer = setTimeout(function() {
                        paiDui && paiDui.play();
                    }, 1500);
                },
                'page3': function() {
                    initPageSprite(index);
                },
                'page4': function() {
                    initPageSprite(index);
                },
                'page5': function() {
                    initPageSprite(index);
                    jpTimer = setTimeout(function() {
                        jianPan && jianPan.play();
                    }, 2500);
                },
                'page6': function() {
                    initPageSprite(index);
                },
                'page7': function() {},
                'page8': function() {
                    initPageSprite(index);
                }
            };
            if (pageSpriteMap['page' + index]) {
                pageSpriteMap['page' + index](swiper);
            }

            function initPageSprite(index) {
                $('.page' + index).find('[data-sprite]').each(function(index, el) {
                    setTimeout(function() {
                        $(el).addClass('sprite-on');
                    }, el.getAttribute('data-delay') * 1000);
                });
            }
        }


    });

    //页面初始化、图片资源加载
    function init(preImg, sourceImg, onImgComplete, callback) {
        Util.imageLoad({
            url: preImg,
            complete: function() {
                $('[data-scale]').show();
                Util.scaleElem('[data-scale]', function(el) {
                    $(el).addClass('fadeIn');
                    Util.imageLoad({
                        url: sourceImg,
                        oncomplete: onImgComplete,
                        complete: callback
                    });
                });
            }
        });
    }
}());