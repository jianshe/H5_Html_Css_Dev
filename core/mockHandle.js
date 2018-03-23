var mockApi = require('./mockApiConfig');
var functions = require('./functions');
var config = require('../config');
var url = require('url');

module.exports = {
    parseApi: function(req, res, path, apiPath) {
        var subPaths = apiPath.split('/');
        var api;
        subPaths.forEach(function(item) {
            if (!api) {
                api = mockApi[item];
            } else {
                api = api[item];
            }
        })
        var data = cloneJson();
        data.Mock.api = apiPath;
        if (api) {
            data = functions.mix(data, api(url.parse(req.url, true).query));
            statueCode = 200;
        } else {
            data.Status = -1;
            data.Message = '请求的接口不存在，请检查 mockApiConfig 里是否有定义！';
            statueCode = 404;
        }
        res.writeHead(statueCode, { 'Content-Type': 'application/json;charset=utf-8' });
        setTimeout(function() {
            res.end(JSON.stringify(data));
        }, config.mockResDelay);
    }
};

function cloneJson() {
    var jsonData = {
        Status: 0,
        Message: '',
        Result: '',
        OtherInfo: {}
    };
    return JSON.parse(JSON.stringify({
        Mock: {
            api: '',
            info: ''
        },
        Status: 0,
        Message: '',
        Result: null,
        OtherInfo: {}
    }));
}