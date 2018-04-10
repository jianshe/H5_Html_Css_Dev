(function() {
    var preImg = [
        '../resource/img/niu1.png',
        '../resource/img/niu2.png',
        '../resource/img/bg.jpg'
    ];

    $(function() {
        var $stage = $('#stage');
        var $loading = $('#loading');
        var $percent = $('#percent');
        init(preImg);
    });

    //页面初始化、图片资源加载
    function init(preImg) {
        Util.imageLoad({
            url: preImg
        });
    }
}());