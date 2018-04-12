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

    document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.call('hideOptionMenu');
        //toggleMusic();
        audio.play();
        paiDui.play();
        paiDui.pause();
        jianPan.play();
        jianPan.pause();
        wxFirstLoad = false;
    }, false);

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
        var $stage = $('#stage'); //动画显示父级类
        var $loading = $('#loading'); //loading父级类
        var $percent = $('#percent'); //初始化页面加载百分比
        var $music = $('#music'); //右上角音乐图标
        var $nextBtn = $('[data-next]'); //翻开相册

        var $syjPlay = $('#syjPlay'); //播放按钮
        var $lineDjbf = $('#lineDjbf'); //点击播放

        var $slideUp = $('#slideUp'); //swiper滑动方向指示
        var $tg = $('#tg'); //点击跳过


        var $p8Texts = $('#p8-text').find('.item'); //手机页面切换元素

        var $np2PopStock = $('#np2PopStock'); //股票点击放大元素
        var $sayStory = $('#sayStory'); //说说你的股市

        var $wyly = $('#wyly'); //获奖名单
        var $lyCloseBtn = $('#lyCloseBtn'); //弹出的获奖名单页面，关闭操作

        var $lyListBack = $('#lyListBack'); //返回上页

        var $goTop = $('#goTop'); //鼠标滚动时，右侧悬浮窗始终位于页面中间
        var $scrollWrap = $('[data-list-scroll]'); //股友回忆录父容器


        var $lyCount = $('#lyCount'); //获取用户输入内容总字数
        var $lyTextarea = $('#lyTextarea'); //指向文本输入框
        var $submitBtn = $('#submitBtn'); //确认提交股事


        //感恩回馈
        var $toGnShare = $('#toGnShare');
        var $gnBackBtn = $('#gnBackBtn');
        var $gnShareBtn = $('#gnShareBtn');
        var $shareMask = $('#shareMask');


        var _lbSprite = null; //创建精灵图标类的实例
        var _Swiper = null; //整个页面切换swiper类
        var _SwiperP7 = null; //手机屏幕功能页面切换
        var _p7Timer = null; //设置一个定时器，阻止_SwiperP7自动滚动
        var startTimer = null; //设置一个定时器，延时切换到第一页
        var pdTimer = null; //设置一个器，延时播放排队背景音乐
	var jpTimer = null;//设置一个定时器，延时播放敲键盘背景音乐播放
        var startTime = new Date().getTime();

        $scrollWrap.on('scroll', function(e) {
            $goTop[0].style.top = (this.scrollTop + 400) + 'px';
        });
        $goTop.on('click', function(e) {
            $scrollWrap[0].scrollTop = 0;
        });

        shouYin.addEventListener('ended', stopShouYin, false);

        $music.on('click', toggleMusic);
        $tg.on('click', function() {
            _Swiper.unlockSwipes();
            _Swiper.slideTo(8, 0, true);
            clearTimeout(startTimer);
        });
        $nextBtn.on('click', function() {
            $('.page1').find('.white-mask').show().addClass('mask-on');
            setTimeout(function() {
                _Swiper.slideTo(2, 0, true);
            }, 800);
        });
        $np2PopStock.on('click', function() {
            $(this).toggleClass('showBig');
        });
        $syjPlay.on('click', function() {
            var $this = $(this);
            if ($this.attr('data-init') != 1) {
                _lbSprite = new Sprite(document.getElementById('lb'), [
                    '../resource/img/gbyx1.png',
                    '../resource/img/gbyx2.png'
                ], 1200);
                $this.attr('data-init', 1);
                $lineDjbf.hide();
                _lbSprite.play();
                audio.volume = 0.1;
                btnPlay.play();
                setTimeout(function() {
                    shouYin.play();
                }, 1000);
            } else {
                if (_lbSprite.isPlay) {
                    _lbSprite.stop(true);
                    $lineDjbf.show();
                    btnPlay.pause && btnPlay.pause();
                    shouYin.pause && shouYin.pause();
                    audio.volume = volume;
                } else {
                    audio.volume = 0.1;
                    _lbSprite.play();
                    btnPlay.play();
                    $lineDjbf.hide();
                    setTimeout(function() {
                        shouYin.play();
                    }, 1000);
                }
            }
            $this.toggleClass('bf-btn-on');
        });
        $sayStory.on('click', function() {
            _Swiper.slideTo(10, 0, true);
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
        $toGnShare.on('click', function() {
            _Swiper.slideTo(11, 0, true);
        });

        $gnBackBtn.on('click', turnBack);
        $lyListBack.on('click', turnBack);
        $lyCloseBtn.on('click', turnBack);

        $wyly.on('click', function() {
            _Swiper.unlockSwipes();
            _Swiper.slideTo(10, 0, true);
        });

        $gnShareBtn.on('click', function() {
            $shareMask.show();
        });
        $shareMask.on('click', function() {
            $shareMask.hide();
        });

        $lyTextarea.on('keydown', function(e) {
            var content = $.trim(this.value);
            if (content.length > 1000) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                $lyCount.text(content.length);
            }
        });
        $('.ly-content').on('click', '.ly-page-input-1', function() {
            $(this).removeClass('ly-page-input-1').prev().val('');
        }).find('input').on('keyup', function() {
            $(this).next()[!!$.trim(this.value) ? 'addClass' : 'removeClass']('ly-page-input-1');
        });
        $submitBtn.on('click', function() {
            alert('提交留言')
        });

        function turnBack() {
            _Swiper.unlockSwipes();
            _Swiper.slideTo(8, 0, true);
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
                        if (index !== 2) {
                            //如果不是第二页，停止排除背景音乐播放，同时将股票显示为小图标
                            $np2PopStock.removeClass('showBig');
                            paiDui && paiDui.pause();
                            clearTimeout(pdTimer);
                        }
                        //如果不是第三页，停止收音机背景音乐播放，同时还原初始化进入页面的设置
                        if (index !== 3 && _lbSprite && _lbSprite.isPlay) {
                            stopShouYin();
                            $lineDjbf.show();
                        }
                        pageSprite(swiper.activeIndex, swiper);
                        //var slideUpShowDelays = [0, 5, 5.5, 6.5, 4.5, 5.5, 4.5, 4.3, 0];
                        var slideUpShowDelays = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                        if (index > 1 && index < 9) {
                            // console.log(slideUpShowDelays[index], '秒后才能滑动');
                            setTimeout(function() {
                                $slideUp.show();
                                _Swiper.unlockSwipes();
                            }, slideUpShowDelays[index] * 1000);
                        }
                        if (index !== 5) {
                            jianPan && jianPan.pause();
                            clearTimeout(jpTimer);
                        }
                        if (index > 7) {
                            $tg.hide();
                        } else {
                            $tg.show();
                        }
                        if (index === 10) {
                            $music.hide();
                        } else {
                            $music.show();
                        }
                    }
                });
                window._Swiper = _Swiper;
                _SwiperP7 = new Swiper('#p8-swiper', {
                    pagination: '.p8-swiper-nav',
                    autoplay: 1500,
                    autoplayDisableOnInteraction: false,
                    onSlideChangeStart: function(swiper) {
                        $p8Texts.removeClass('text-active').eq(swiper.activeIndex).addClass('text-active');
                    }
                });

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

        function stopShouYin() {
            _lbSprite.stop(true);
            $syjPlay.removeClass('bf-btn-on');
            btnPlay.pause && btnPlay.pause();
            shouYin.pause && shouYin.pause();
            audio.volume = volume;
            $lineDjbf.show();
        }
        //页面动画精灵
        function pageSprite(index, swiper) {
            $('.stage').find('[data-sprite]').removeClass('sprite-on');
            _SwiperP7 && _SwiperP7.stopAutoplay();
            _SwiperP7.slideTo(0, 20, true);
            clearTimeout(_p7Timer);
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
                'page7': function() {
                    _p7Timer = setTimeout(function() {
                        _SwiperP7 && _SwiperP7.startAutoplay();
                    }, 2000);
                },
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
                //var loading = new Sprite(document.getElementById('loadingSprite'), [preImg[0], preImg[1]], 800);
                //loading.play();
                //适配
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

    //精灵图类
    function Sprite(el, src, duration) {
        this.el = el;
        this.src = src;
        this.duration = duration;
        this.frameIndex = 0;
        this.timer = null;
        this.isPlay = false;
        this.render();
    }

    Sprite.prototype.render = function() {
        this.el.style.background = 'url("' + this.src[this.frameIndex] + '") no-repeat center';
        this.frameIndex = this.frameIndex >= this.src.length - 1 ? 0 : this.frameIndex + 1;
    };
    Sprite.prototype.play = function() {
        var that = this;
        this.isPlay = true;
        this.timer = setInterval(function() {
            that.render();
        }, this.duration / this.src.length);
    };
    Sprite.prototype.stop = function(isDestroy) {
        this.isPlay = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (isDestroy) {
            this.el.style.background = 'none';
            this.frameIndex = 0;
        }
    };
}());