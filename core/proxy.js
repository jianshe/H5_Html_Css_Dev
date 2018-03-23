var http = require('http');
var https = require('https');
var url = require('url');
var httpProxy = require('http-proxy');
var querystring = require('querystring');
var config = require('../config');

var proxy = httpProxy.createProxyServer({});
var apiConfig = config.useAPI.hosts;
var useProtocol = {
    "http": http,
    "https": https
};

module.exports = {

    proxy: function(req, res, callback) {
        proxy.web(req, res, {
            target: apiConfig.protocol + '://' + apiConfig.host + ':' + apiConfig.port
        });
    },

    request: function(req, res, callback) {
        var contents = querystring.stringify(req.body);
        //console.log(req);
        var urlParse = url.parse(req.url);
        var options = {
            host: apiConfig.host,
            path: urlParse.path,
            port: apiConfig.port,
            method: req.method,
            headers: req.headers
        };
        options['headers']['Content-Length'] = contents.length;
        options['headers']['accept-encoding'] = 'utf-8';
        var body = '';
        var request = useProtocol[apiConfig.protocol].request(options, function(response) {
            response.setEncoding('utf8');
            response.on('data', function(d) {
                body += d;
            }).on('end', function() {
                callback(response, null, body);
            }).on('error', function(err) {
                callback(response, err, {
                    error: err
                });
            });
        });
        request.write(contents);
        request.end();
    }

};