(function() {

    var util = window.Util || {};

    util.imageLoad = imageLoad;

    //图片预加载
    function imageLoad(s) {
        var urlset = [],
            undefined, toString = Object.prototype.toString;
        switch (toString.apply(s.url)) {
            case '[object String]':
                urlset[urlset.length] = s.url;
                break;
            case '[object Array]':
                if (!s.url.length) {
                    return false;
                }
                urlset = s.url;
                break;
            case '[object Function]':
                s.url = s.url();
                return imageLoad(s);
            default:
                return false;
        }
        var imgset = [],
            r = { total: urlset.length, load: 0, error: 0, abort: 0, complete: 0, currentIndex: 0 },
            _defaults = {
                url: '',
                onload: 'function',
                onerror: 'function',
                oncomplete: 'function',
                ready: 'function',
                complete: 'function',
                timeout: 30
            };
        for (var v in _defaults) {
            s[v] = s[v] === undefined ? _defaults[v] : s[v];
        }
        for (var i = 0, l = urlset.length, img; i < l; i++) {
            img = new Image();
            img.loaded = false;
            imgset[imgset.length] = img;
        }
        for (i = 0, l = imgset.length; i < l; i++) {
            imgset[i].onload = function() {};
            imgset[i].onerror = function() {};
            imgset[i].onabort = function() {};
            imgset[i].src = '' + urlset[i];
        }

        function _isFn(fn) {
            return toString.apply(fn) === '[object Function]';
        }
    }
    window.Util = util;

}());