var path = require('path');
var root = path.resolve(__dirname, './');

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
    port: 9997,

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
                },
                'port': {
                    protocol: 'http',
                    host: '10.100.71.73',
                    port: 9401
                }
            }[env];
        })('port')
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
    combined: {
        'activity.lib.min.js': {
            src: [
                './public/source/js/lib/zepto.min_v1.js',
                './public/source/js/lib/Swiper-master/js/swiper.min.js',
                '../../source/js/util.js'
            ]
        }
    }

};