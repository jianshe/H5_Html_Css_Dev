var path = require('path');
var fs = require('fs');
var config = require('../config');
var combined = config.combined;
var isDebugFile = false;
var PROJECT_NAME = '';

module.exports = function(projectName, isDebug) {
    if (!projectName) {
        console.log('未指定发布的项目！');
        return false;
    }
    PROJECT_NAME = projectName;
    isDebugFile = isDebug;
    var pubDir = path.join(config.root, config.publishDir, projectName);
    pubDir = path.join(pubDir, 'html');
    if (!fs.existsSync(pubDir)) {
        fs.mkdirSync(pubDir);
    }
    var sourceDir = path.join(config.root, projectName, 'html');
    readDir(sourceDir, pubDir);
};

function readDir(sourceDir, pubDir) {
    var files = fs.readdirSync(sourceDir);
    files.forEach(function(file) {
        var filePath = path.join(sourceDir, file);
        var st = fs.statSync(filePath);
        if (!st.isDirectory()) {
            renderFile(file, filePath, pubDir);
        } else {
            readDir(filePath, pubDir);
        }
    });
}

function renderFile(fileName, filePath, publishDir) {
    fs.readFile(filePath, 'utf-8', function(err, content) {
        if (err) {
            console.log('Error: can not read file ' + filePath);
        } else {
            //替换include
            var includes;
            while ((includes = config.includeRegExp.exec(content)) !== null) {
                var file = includes[1];
                var fileContent = fs.readFileSync(path.join(path.resolve(filePath, '../'), file), 'utf-8');
                content = content.replace(config.includeRegExp, fileContent);
            }
            var version = config.version ? createVersion() : '';

            //替换原始js
            content = content.replace(config.jsPubRegExp, (isDebugFile ? '../source/' : '../resource/') + 'js/$1.js' + version);

            //替换public下单独引用js
            content = content.replace(config.jsPublicRegExp, '../public/$1.js');

            //替换public下单独引用css
            content = content.replace(config.cssPublicRegExp, '../public/$1.css');

            //替换{{{css}}},{{{js}}},版本号
            content = content.replace(config.cssRegExp, '../resource/css/$1.css' + version);
            content = content.replace(config.jsRegExp, '../resource/js/$1.js' + version);

            //替换合并js
            var combinedJs = config.combinedRegExp.exec(content);
            var scripts = [];
            if (combinedJs) {
                combinedJs = combinedJs[1];
                var combinedJsConf = combined[combinedJs];
                if (combinedJsConf) {
                    if (!isDebugFile) {
                        content = content.replace(config.combinedRegExp, '<script src="../public/resource/dist/' + combinedJs + version + '"></script>');
                    } else {
                        for (var i = 0; i < combinedJsConf.src.length; i++) {
                            if (combinedJsConf.src[i].indexOf('./' + PROJECT_NAME) > -1) {
                                combinedJsConf.src[i] = combinedJsConf.src[i].replace('/' + PROJECT_NAME, '');
                            }
                            scripts[i] = '<script src="' + combinedJsConf.src[i].replace(/^./ig, '..') + version + '"></script>';
                        }
                        content = content.replace(config.combinedRegExp, scripts.join('\r\n'));
                    }
                } else {
                    console.log(combinedJs + '未找到相应的配置，请先在config.js中配置!');
                }
            }


            var writeFilePath = path.join(publishDir, fileName);
            fs.writeFile(writeFilePath, content, function(err) {
                if (err) {
                    throw err;
                } else {
                    console.log(writeFilePath + ':已创建！');
                }
            });
        }
    });
}

function createVersion() {
    return '?v=' + +new Date();
}