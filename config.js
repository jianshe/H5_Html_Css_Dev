/**
 * @Author: jianshe
 * @Date:   2018-03-23 09:00:30
 */

var path = require('path');
var root = path.resolve(__dirname, './');
//console.log("root:"+root);
//__dirname变量获取当前模块文件所在目录的完整绝对路径。
//resolve方法以应用程序根目录为起点，根据所有的参数值字符串解析出一个绝对路径。该方法使用方式如下：
//path.resolve(path1,[path2],[……])
/**
 * config
 * @module config
 */
module.exports = {
    /**
     * 本地web服务的端口号
     * @type {number}
     * @default 8080
     */
    port: 9998,

    /**
     * 是否开启手机调试
     * @type {boolean}
     * @default false
     */
    weinre: false,

    /**
     * 是否为wap页，开启后会自动给页面添加对应的meta
     * @type {boolean}
     * @default true
     */
    isWap: true,

    /**
     * 是否为开发环境，开启后js文件将读取源文件，否则将读取合并压缩的的文件
     * @type {boolean}
     * @default true
     */
    debug: true,

    /**
     * 是否开启正式接口调试
     */
    useAPI: {
        pathRegExp: /^\.\/api\/(.*?)$/,
        hosts: (function(env) {
            return {
                'test': {
                    protocol: 'http',
                    host: '10.10.82.85',
                    port: 80
                }
            }[env];
        })('jianshe')
    },

    /**
     * 是否启用mock，开启后可调用mock定义的api
     * @type {boolean}
     * @default true
     */
    useMock: false,

    /**
     * 指定mock请求响应的延迟时间
     * @type {Number}
     * @default 1000
     */
    mockResDelay: 1000,

    /**
     * 是否开启静态文件的版本号
     * @type {boolean}
     * @default true
     */
    version: true,

    /**
     * 站点根目录
     */
    root: root,

    /**
     * 独立站点发布目录，所有的独立项目将由 gulp publish -n [项目名称] 发布生成
     */
    publishDir: 'www',

    /**
     * mui项目发布目录，由 gulp mui -n [项目名称] 发布生成
     */
    muiDir: 'mui',

    notProjectDir: ['node_modules'],

    /**
     * 源码目录（相对 .html 文件）
     */
    srcDir: '../source/',

    /**
     * 生产目录（相对 .html 文件）
     */
    destDir: '../resource/',

    /**
     * mock api接口路径规则
     */
    mockApiPath: /^\.\/api\/(.*?)$/,

    /**
     * css 替换规则
     */
    cssRegExp: /\{\{\{(.*?)\.css\}\}\}/ig,

    /**
     * js 替换规则
     */
    jsRegExp: /\{\{\{(.*?)\.js\}\}\}/ig,

    /**
     * 独立项目js替换规则
     */
    jsPubRegExp: /\.\.\/source\/js\/(.*?)\.js/ig,

    /**
     * 独立项目public文件替换规则
     */
    jsPublicRegExp: /\/public\/(.*?)\.js/ig,

    /**
     * 独立项目css文件替换规则
     */
    cssPublicRegExp: /\/public\/(.*?)\.css/ig,

    /**
     * js合并文件替换规则
     */
    combinedRegExp: /<combined\s+src=\"(.*?)\"><\/combined>/ig,

    /**
     * include模板语法替换规则
     */
    includeRegExp: /<include\s+file=\"(.*?)\"><\/include>/,

    /**
     * 标题显示替换规则
     */
    titleRegExp: /<title>(.*?)<\/title>/i,

    /**
     * 合并库文件临时目录
     */
    combinedTemp: './public/resource/.build/',

    /**
     * 合并库文件发布目录
     */
    combinedDest: './public/resource/dist/',

    /**
     * 合并库文件名称
     * <br>格式：[项目名称].lib.min.js
     * @example
//经纪人合并库文件指定
'freeAgent.lib.min.js': {
    //src 表示合并的单个文件数组，合并时将按数组顺序合并
    src: [
        './public/source/js/lib/zepto.min_v1.js',
        './public/source/js/plugs/pop.js',
        './public/source/js/plugs/tips.js',
        './public/source/js/plugs/action-sheet.js',
        './public/source/js/apiSet.js',
        './public/source/js/util.js',
        './public/source/js/lib/vue.js',
        './public/source/js/vueDirective.js',
        './public/source/js/vueComponent.js',
        './freeAgent/source/js/app.js'
    ]
}
     */
    combined: {
        //demo
        'demo.lib.min.js': {
            src: [
                './public/source/js/lib/zepto.min_v1.js',
                './public/source/js/plugs/pop.js',
                './public/source/js/plugs/action-sheet.js',
                './public/source/js/plugs/action-sheet2.js',
                './public/source/js/plugs/tips.js',
                './public/source/js/plugs/tooltips.js'
            ]
        },
        //炒股大赛
        'APP.lib.min.js': {
            src: [
                './public/source/js/fade.js',
                './public/source/js/fx.js',
                './public/source/js/pop.js',
                './public/source/js/swiper.min.js',
                './public/source/js/zepto.min.js'
            ]
        }
    }

};