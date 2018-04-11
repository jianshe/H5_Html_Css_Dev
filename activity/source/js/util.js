(function() {

    var util = window.Util || {};

    util.scaleElem = function(selector, callback) {
        var scaleElem = document.querySelector(selector);
        var n = scaleElem.childNodes[1];
        var ew = n.clientWidth;
        var eh = n.clientHeight;
        var scale = ew / scaleElem.clientWidth;
        if (scale > 1) {
            scale = 1 / scale;
            scaleElem.style.webkitTransform = 'scale(' + scale + ')';
            scaleElem.style.width = ew * scale + 'px';
            scaleElem.style.height = eh * scale + 'px';
        }
        setTimeout(function() {
            callback && callback(scaleElem);
        }, 0);
    };

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
            timer,
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
        s.timeout = parseInt(s.timeout) || _defaults.timeout;
        for (var i = 0, l = urlset.length, img; i < l; i++) {
            img = new Image();
            img.loaded = false;
            imgset[imgset.length] = img;
        }
        for (i = 0, l = imgset.length; i < l; i++) {
            imgset[i].onload = function() {
                _imageHandle.call(this, 'load', i);
            };
            imgset[i].onerror = function() {
                _imageHandle.call(this, 'error', i);
            };
            imgset[i].onabort = function() {
                _imageHandle.call(this, 'abort', i);
            };
            imgset[i].src = '' + urlset[i];
        }

        if (_isFn(s.ready)) {
            s.ready.call({}, imgset, r);
        }

        function _imageHandle(handle, index) {
            r.currentIndex = index;
            switch (handle) {
                case 'load':
                    this.onload = null;
                    this.loaded = true;
                    r.load++;
                    if (_isFn(s.onload)) {
                        s.onload.call(this, r);
                    }
                    break;
                case 'error':
                    r.error++;
                    if (_isFn(s.onerror)) {
                        s.onerror.call(this, r);
                    }
                    break;
                case 'abort':
                    r.abort++;
                    break;
            }
            r.complete++;
            // oncomplete 事件回调
            if (_isFn(s.oncomplete)) {
                s.oncomplete.call(this, r);
            }
            // 判断全局加载
            if (r.complete === imgset.length) {
                _callback();
            }
        }

        function _callback() {
            clearTimeout(timer);
            if (_isFn(s.complete)) {
                s.complete.call({}, imgset, r);
            }
        }

        function _isFn(fn) {
            return toString.apply(fn) === '[object Function]';
        }
        return true;
    }
    window.Util = util;

}());