/**
 * @Author: jianshe
 * @Date:   2018-03-23 09:00:30
 * @Last modified by:   jianshe
 */
var util = require('util');
var http = require('http');
var fs = require('fs');
var PATH = require('path');
var url = require('url');
var events = require('events');
var os = require('os');
var proxy = require('./core/proxy');
var mockHandle = require('./core/mockHandle');
var config = require('./config');
var combined = config.combined;
var staticVersion = createVersion();

var indexFilenamePattern = /index0\.html/;
var IPv4;
var ni = os.networkInterfaces(); //获取网络接口列表
var address = ni['en0'] || ni['本地连接'] || ni['本地连接 2'] || ni['以太网'] || ni['无线网络连接 2'];
//console.log("address: "+address);
if (config.weinre) {
    for (var i = 0; i < address.length; i++) {
        if (address[i].family == 'IPv4') {
            IPv4 = address[i].address;
        }
    }
} else {
    IPv4 = 'localhost';
}

// 是否启用mock
if (process.argv[2] === '-m') {
    config.useMock = true;
}

function main(argv) {
    new HttpServer({
        'GET': createServlet(StaticServlet),
        'POST': createServlet(StaticServlet),
        'HEAD': createServlet(StaticServlet)
    }).start(config.port);
}

function escapeHtml(value) {
    return value.toString().
    replace('<', '&lt;').
    replace('>', '&gt;').
    replace('"', '&quot;');
}

function createServlet(Class) {
    var servlet = new Class();
    return servlet.handleRequest.bind(servlet);
}

/**
 * An Http server implementation that uses a map of methods to decide
 * action routing.
 *
 * @param {Object} Map of method => Handler function
 */

function HttpServer(handlers) {
    //console.log("handlersGET: "+handlers.GET);
    //console.log("handlersPOST: "+handlers.POST);
    //console.log("handlersHEAD: "+handlers.HEAD);
    this.handlers = handlers;
    this.server = http.createServer(this.handleRequest_.bind(this));
}

HttpServer.prototype.start = function(port) {
    this.port = port;
    this.server.listen(port);
    console.log('Http Server running at http://localhost:' + port + '/');
};

HttpServer.prototype.parseUrl_ = function(urlString) {
    var parsed = url.parse(urlString);
    parsed.pathname = url.resolve('/', parsed.pathname);
    return url.parse(url.format(parsed), true);
};

HttpServer.prototype.handleRequest_ = function(req, res) {
    //console.log("handleRequest_： "+ req);
    var logEntry = req.method + ' ' + req.url;
    if (req.headers['user-agent']) {
        logEntry += ' ' + req.headers['user-agent'];
    }
    //util.puts(logEntry);
    req.url = this.parseUrl_(req.url);
    var handler = this.handlers[req.method];
    if (!handler) {
        res.writeHead(501);
        res.end();
    } else {
        handler.call(this, req, res);
    }
};
/**
 * Handles static content.
 */
function StaticServlet() {}

function createVersion() {
    var date = new Date();
    return '?v=' + date.getFullYear() + "" + (date.getMonth() > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "" + (date.getDate()) + "" + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + "" + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
}

StaticServlet.MimeMap = {
    'txt': 'text/plain',
    'log': 'text/plain',
    'md': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'manifest': 'text/cache-manifest'
};

StaticServlet.prototype.handleRequest = function(req, res) {
    var self = this;
    var path = ('./' + req.url.pathname).replace('//', '/').replace(/%(..)/g, function(match, hex) {
        return String.fromCharCode(parseInt(hex, 16));
    });
    var parts = path.split('/');
    if (parts[parts.length - 1].charAt(0) === '.') {
        return self.sendForbidden_(req, res, path);
    }
    //如果是调用 mock api
    if (config.mockApiPath.test(path) && config.useMock) {
        return self.apiHandle_(req, res, path);
    }

    if (config.useAPI.pathRegExp.test(path)) {
        return proxy.proxy(req, res, function() {});
    }
    fs.stat(path, function(err, stat) {
        if (err)
            return self.sendMissing_(req, res, path);
        if (stat.isDirectory())
            return self.sendDirectory_(req, res, path);
        return self.sendFile_(req, res, path);
    });
};

StaticServlet.prototype.apiHandle_ = function(req, res, path) {
    var apiName = config.mockApiPath.exec(path);
    apiName = apiName[1];
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Server", 'Node V8');
    res.setHeader("X-Powered-By", 'EastMoney: Front-end');
    if (apiName) {
        mockHandle.parseApi(req, res, path, apiName);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end('未指定 api 名称！');
    }
};

StaticServlet.prototype.sendError_ = function(req, res, error) {
    res.writeHead(500, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.write('<!doctype html>\n');
    res.write('<title>Internal Server Error</title>\n');
    res.write('<h1>Internal Server Error</h1>');
    res.write('<pre>' + escapeHtml(util.inspect(error)) + '</pre>');
    util.puts('500 Internal Server Error');
    util.puts(util.inspect(error));
    console.log("util.inspect(error): " + util.inspect(error));
};

StaticServlet.prototype.sendMissing_ = function(req, res, path) {
    path = path.substring(1);
    res.writeHead(404, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.write('<!doctype html>\n');
    res.write('<title>404 Not Found</title>\n');
    res.write('<h1>Not Found</h1>');
    res.write(
        '<p>The requested URL ' +
        escapeHtml(path) +
        ' was not found on this server.</p>'
    );
    res.end();
    util.puts('404 Not Found: ' + path);
};

StaticServlet.prototype.sendForbidden_ = function(req, res, path) {
    path = path.substring(1);
    res.writeHead(403, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.write('<!doctype html>\n');
    res.write('<title>403 Forbidden</title>\n');
    res.write('<h1>Forbidden</h1>');
    res.write(
        '<p>You do not have permission to access ' +
        escapeHtml(path) + ' on this server.</p>'
    );
    res.end();
    util.puts('403 Forbidden: ' + path);
};

StaticServlet.prototype.sendRedirect_ = function(req, res, redirectUrl) {
    res.writeHead(301, {
        'Content-Type': 'text/html;charset=utf-8',
        'Location': redirectUrl
    });
    res.write('<!doctype html>\n');
    res.write('<title>301 Moved Permanently</title>\n');
    res.write('<h1>Moved Permanently</h1>');
    res.write(
        '<p>The document has moved <a href="' +
        redirectUrl +
        '">here</a>.</p>'
    );
    res.end();
    util.puts('301 Moved Permanently: ' + redirectUrl);
};

StaticServlet.prototype.sendFile_ = function(req, res, path) {
    var fileType = path.split('.').pop();
    //console.log("fileType: " + fileType);
    var self = this;
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Server", 'Node V8');
    res.setHeader("X-Powered-By", 'xxxxxx: Front-end');
    if (fileType === 'html') {
        fs.readFile(path, 'utf-8', function(err, content) {
            if (err) {
                res.end('Error: can not read file ' + path);
            } else {
                //禁缓存
                if (config.debug) {
                    res.setHeader("Expires", 0);
                    res.setHeader("Cache-Control", "no-cache");
                    res.setHeader("Cache-Control", "no-store");
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf-8'
                });

                //替换include
                var includes;
                while ((includes = config.includeRegExp.exec(content)) !== null) {
                    var file = includes[1];
                    var fileContent = fs.readFileSync(PATH.join(PATH.resolve(path, '../'), file), 'utf-8');
                    content = content.replace(config.includeRegExp, fileContent);
                }
                //console.log("includes: " + includes);
                //替换css,js,版本号
                var version = config.version ? staticVersion : '';
                content = content.replace(config.cssRegExp, (config.destDir) + 'css/$1.css' + version);
                content = content.replace(config.jsRegExp, (config.debug ? config.srcDir : config.destDir) + 'js/$1.js' + version);

                //替换合并js
                var combinedJs = config.combinedRegExp.exec(content);
                var scripts = [];
                if (combinedJs) {
                    combinedJs = combinedJs[1];
                    var combinedJsConf = combined[combinedJs];
                    if (combinedJsConf) {
                        if (!config.debug) {
                            content = content.replace(config.combinedRegExp, '<script src="' + config.combinedDest.replace(/^./ig, '') + combinedJs + version + '"></script>');
                        } else {
                            for (var i = 0; i < combinedJsConf.src.length; i++) {
                                scripts[i] = '<script src="' + combinedJsConf.src[i].replace(/^./ig, '') + version + '"></script>';
                            }
                            content = content.replace(config.combinedRegExp, scripts.join('\r\n'));
                        }
                    } else {
                        console.log(combinedJs + '未找到相应的配置，请先在config.js中配置!');
                    }
                }
                //console.log("combinedJs: " + combinedJs);
                //替换手机调试脚本
                if (config.weinre) {
                    content = content.replace(/<\/body>/ig, '<script src="http://' + IPv4 + ':8081' + '/target/target-script-min.js#anonymous"></script></body>');
                }
                res.end(content);
            }
        });
    } else {
        var file = fs.createReadStream(path);
        //允许跨域访问
        /*if(fileType === 'js'){
         res.setHeader("Access-Control-Allow-Origin", '*');
         }*/
        res.writeHead(200, {
            'Content-Type': StaticServlet.
            MimeMap[fileType] + ';charset=utf-8' || 'text/plain;charset=utf-8'
        });
        if (req.method === 'HEAD') {
            res.end();
        } else {
            file.on('data', res.write.bind(res));
            file.on('close', function(data) {
                res.end();
            });
            file.on('error', function(error) {
                self.sendError_(req, res, error);
            });
        }
    }
};

StaticServlet.prototype.sendDirectory_ = function(req, res, path) {
    var self = this;
    var isHtmlDir = path.split('/');
    isHtmlDir = isHtmlDir[isHtmlDir.length - 2] === 'html';
    if (path.match(/[^\/]$/)) {
        req.url.pathname += '/';
        var redirectUrl = url.format(url.parse(url.format(req.url)));
        return self.sendRedirect_(req, res, redirectUrl);
    }
    fs.readdir(path, function(err, files) {
        if (err)
            return self.sendError_(req, res, error);

        if (!files.length)
            return self.writeDirectoryIndex_(req, res, path, []);

        var remaining = files.length;
        files.forEach(function(fileName, index) {
            if (fileName.match(indexFilenamePattern)) {
                self.sendFile_(req, res, path + fileName);
            } else {
                fs.stat(path + '/' + fileName, function(err, stat) {
                    if (err)
                        return self.sendError_(req, res, err);
                    if (stat.isDirectory()) {
                        files[index] = fileName + '/';
                    }
                    if (!(--remaining))
                        return self.writeDirectoryIndex_(req, res, path, files, isHtmlDir);
                });
            }
        });
        console.log("remaining: " + remaining);
    });
};

StaticServlet.prototype.writeDirectoryIndex_ = function(req, res, path, files, isHtmlDir) {
    var wapMeta = [
        '<meta name="applicable-device" content="mobile">',
        '<meta name="apple-mobile-web-app-capable" content="yes">',
        '<meta content="telephone=no" name="format-detection">',
        '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">'
    ];
    console.log("wapMeta: " + wapMeta);
    path = path.substring(1);
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    if (req.method === 'HEAD') {
        res.end();
        return;
    }
    res.write('<!doctype html>\n');
    config.isWap && res.write(wapMeta.join('\n'));
    res.write('<title>' + escapeHtml(path) + '</title>\n');
    res.write('<style>\n');
    res.write('  ol { list-style-type: none; font-size: 1.2em; }\n');
    res.write('</style>\n');
    res.write('<h1>Directory: ' + escapeHtml(path) + '</h1>');
    res.write('<ol>');
    var pageData = [];
    files.forEach(function(fileName) {
        if (fileName.charAt(0) !== '.') {
            var filePath = PATH.join(__dirname, path, fileName);
            var st = fs.statSync(filePath);
            var fileTitle = '';
            var fileLabel = '';
            if (!st.isDirectory()) {
                var fileContent = fs.readFileSync(filePath, 'utf8');
                fileTitle = config.titleRegExp.exec(fileContent);
                fileLabel = fileTitle ? fileTitle[1] : '未命名页面';
                fileTitle = fileTitle ? '<span>(' + fileTitle[1] + ')</span>' : '';
            }
            res.write('<li><a href="' +
                escapeHtml(fileName) + '">' +
                escapeHtml(fileName) + fileTitle + '</a></li>');
            pageData.push({ label: fileLabel, url: fileName })
        }
    });
    res.write('</ol>');
    res.write('<div style="display: none">' + JSON.stringify(pageData) + '</div>')
    res.end();
};

main(process.argv);