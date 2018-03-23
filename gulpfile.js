/**
 * @Author: jianshe
 * @Date:   2018-03-23 09:00:30
 * @Last modified by:   jianshe
 */

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat'); //合并js文件
var uglify = require('gulp-uglify'); //压缩js代码
var imagemin = require('gulp-imagemin'); //压缩图片
var sh = require('shelljs');
var child_process = require('child_process');
var config = require('./config');
var functions = require('./core/functions');
var publish = require('./core/publish');

//启动 compass 任务
//gulp compass -n xxx 指定项目任务
gulp.task('compass', function() {
    var projectName = gulp.env.n;
    //console.log("gulp.env.n:"+gulp.env.n);
    var isForce = gulp.env.f;
    //console.log("gulp.env.f:"+gulp.env.f);
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        compassTask(projectName, isForce);
    }
});

//sass watch
gulp.task('watch', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
        return;
    }
    // 监听文件变化
    gulp.watch(['./' + projectName + '/source/sass/**/*.scss'], function() {
        console.log(projectName);
        sh.exec('gulp compass -n ' + projectName);
    });
});

//压缩图片
gulp.task('img', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        gulp.src('./' + projectName + '/source/img/**/*.{png,jpg,gif,ico}')
            .pipe(imagemin({
                optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            }))
            .pipe(gulp.dest('./' + projectName + '/resource/img/'));
    }
});

//运行 compass
function compassTask(projectName, force) {
    var conf = config[projectName] || {};
    //console.log("conf:"+[projectName]);
    var cwdDir = path.join(config.root, projectName, 'source');
    var sassFiles = fs.readdirSync(path.join(cwdDir, 'sass'));
    var compileFiles = [];

    for (var i = 0; i < sassFiles.length; i++) {
        //使用同步方式查看文件信息时，可以使用fs模块中的statSync方法或lstatSync方法：
        var st = fs.statSync(path.join(path.join(cwdDir, 'sass'), sassFiles[i]));
        //isDirectory:用于判断被查看的对象是否为一个目录，如果是的话则返回true,如果不是的话则返回false。
        if (!st.isDirectory() && sassFiles[i].indexOf('_') !== 0) {
            compileFiles.push('sass/' + sassFiles[i]);
        }
    }
    // console.log("compileFiles:"+compileFiles);
    //var cssName = conf['css'] || 'style';
    var command = ['compass', 'compile', compileFiles.join(' '), force ? '--force' : ''].join(' ');
    //console.log("command: "+command);
    child_process.exec(command, {
        cwd: cwdDir
    }, function(error, stdout, stderr) {
        if (error !== null) {
            console.log(error, 'error');
        } else {
            console.log(command + ' 任务完成！');
            //fs.exists(path.join(config.root, projectName, 'source', 'css', cssName + '.css'), function (exists) {
            //if(exists){
            functions.copy(path.join(config.root, projectName, 'source', 'css'), path.join(config.root, projectName, 'resource', 'css'));
            //}
            //});
        }
    });
}

//js合并
gulp.task('concat', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        var combinedJs = projectName + '.lib.min.js';
        //console.log("combinedJs: "+combinedJs);
        var combinedJsConf = config.combined[combinedJs];
        //console.log("combinedJsConf: "+combinedJsConf['src']);
        combinedJsConf && gulp.src(combinedJsConf['src'])
            .pipe(concat(combinedJs))
            .pipe(gulp.dest(config.combinedTemp));
    }
});

//js压缩
gulp.task('uglify', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        var combinedJs = projectName + '.lib.min.js';
        gulp.src(config.combinedTemp + combinedJs)
            .pipe(uglify({
                mangle: true
            }))
            .pipe(gulp.dest(config.combinedDest));
    }
});

//js 任务合并
gulp.task('concat-step2', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        return sh.exec('gulp concat -n ' + projectName);
    }
});
gulp.task('js', ['concat-step2'], function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        return sh.exec('gulp uglify -n ' + projectName);
    }
});

//public js
gulp.task('public-js', function() {
    return gulp.src(['public/source/js/*.js', 'public/source/js/plugs/*.js', '!public/source/js/lib/**/*.js'])
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest('public/resource/js/'));
});

//发布单个项目
gulp.task('release', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        sh.exec('gulp compass -n ' + projectName + ' -f');
        sh.exec('gulp js -n ' + projectName);
        sh.exec('gulp public-js');
    }
});

//创建项目
gulp.task('create', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        var dirs = functions.getDir(__dirname);
        //console.log("dirs: ")+dirs;
        if (dirs.indexOf(projectName) > 0) {
            console.log('已存在该项目或者目录！');
        } else {
            console.log('开始创建项目目录和文件...');
            fs.mkdir(path.join(config.root, projectName), function(err) {
                if (err) {
                    console.log('创建项目失败！');
                } else {
                    functions.copy(path.join(config.root, 'demo'), path.join(config.root, projectName));
                    console.log(projectName + ' 项目创建成功！');
                }
            });
        }
    }
});

//启动手机调试
gulp.task('debug', function() {
    sh.exec('weinre -httpPort 8081 -boundHost -all-');
});

//启动本地 web 服务
gulp.task('local', function() {
    var child, args = [];
    var useMock = gulp.env.m;
    if (useMock) {
        args.push('-m');
    }
    var child = child_process.fork('localhost.js', args);
    //child_process.exec("start http://localhost:" + config.port);

    gulp.watch('core/*.js', function() {
        child.kill();
        child = child_process.fork('localhost.js', args);
    })
});

//启动页面分辨率测试
gulp.task('page-view', function() {
    var argv = process.argv;
    if (argv.length < 5) {
        console.log('参数错误！');
        return;
    }
    var scriptPath = path.join(__dirname, 'test', 'phantom', 'task-page-view.js');
    if (argv[3] === '-url') {
        var url = argv[4];
        sh.exec(['phantomjs', scriptPath, '-url', url].join(' '));
    } else if (argv[3] === '-n') {
        var projectName = argv[4];
        sh.exec(['phantomjs', scriptPath, '-n', projectName].join(' '));
    } else {
        console.log('参数类型错误！');
    }
});

gulp.task('publish-project-js', function() {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        return gulp.src('./' + projectName + '/source/js/**/*.js')
            .pipe(uglify({
                mangle: true
            }))
            .pipe(gulp.dest('./' + projectName + '/resource/js/'));
    }
});

//静态项目发布 -> www
gulp.task('publish', ['js', 'publish-project-js'], function() {
    var projectName = gulp.env.n;
    var isDebug = gulp.env.d;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        var publishDir = path.join(config.root, config.publishDir);
        var projectDir = path.join(config.root, projectName);
        var publishProjectDir = path.join(publishDir, projectName);
        fs.mkdir(publishDir, function() {
            fs.mkdir(publishProjectDir, function(err) {
                publish(projectName, isDebug);
                functions.copy(
                    path.join(config.root, 'public'),
                    path.join(publishProjectDir, 'public'), ['.build', 'html']
                );
                console.log("copy: " + "public");
                fs.mkdir(path.join(publishProjectDir, 'source'), function() {
                    functions.copy(
                        path.join(projectDir, 'source'),
                        path.join(publishProjectDir, 'source'), ['.sass-cache', 'css', 'img', 'sass', 'config.rb']
                    );
                });
                fs.mkdir(path.join(publishProjectDir, 'resource'), function() {
                    functions.copy(
                        path.join(projectDir, 'resource'),
                        path.join(publishProjectDir, 'resource')
                    );
                });
            });
        });
    }
});

gulp.task('default', function() {
    console.log('Nothing happened!');
    console.log('Done!');
});