/**
 * Created by miracle on 2017/4/18.
 */
/**
 * gulp clean-css         删除 dist/css 目录下的文件
 * gulp clean-js          删除 dist/js 目录下的文件
 * gulp clean-custom      删除 custom 目录下的文件
 * gulp version           输出当前版本号
 * gulp build-css         打包 CSS 文件
 * gulp build-js          打包 JS 文件
 * gulp build             打包所有文件
 * gulp test-js-gulpfile  检查 gulpfile.js 文件的代码规范
 * gulp custom            定制打包
 */
;(function(){
    'use strictu'

    // 引入 gulp 模块
    var gulp = require('gulp');
    var rename = require('gulp-rename');
    var header = require('gulp-header');
    var autoprefixer = require('gulp-autoprefixer');
    var concat = require('gulp-concat');
    var csscomb = require('gulp-csscomb');
    var csslint = require('gulp-csslint');
    var jscs = require('gulp-jscs');
    var jshint = require('gulp-jshint');
    var less = require('gulp-less');
    var minifyCSS = require('gulp-minify-css');
    var uglify = require('gulp-uglify');
    var del = require('del');
    var tap = require('gulp-tap');
    var fs = require('fs');
    var path = require('path');
    var copy = require('gulp-copy');
    var zip = require('gulp-zip');

//定义常用函数
    var $ = {

        /**
         * 是否为数组
         * @param arr
         * @reutrn {boolean}
         * */
        isArray:function (arr) {
            return arr.constructor==Array;
        },

        /**
         * 循环数组或对象
         * @param obj
         * @param callback
         * */
        each:function (obj,callback) {
            var prop;
            if(!obj){
                return;
            }
            if(this.isArray(obj)){
                for(var i=0;i<obj.length;i++){
                    callback(i,obj[i]);
                }
            }else{
                for(prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        callback(prop,obj[prop]);
                    }
                }
            }
        },

        /**
         * 过滤数组重复元素
         * @param arr
         * @return {Array}
         * */
        unique:function (arr) {
            var unique = [];
            for(var i=0;i<arr.length;i++){
                if(unique.indexOf(arr[i]===-1)){
                    unique.push(arr[i]);
                }
            }
            return unique;
        },

        /**
         * 过滤数组中的空数组
         * @param arr
         * @return {Array}
         * */
        cleanEmpty:function (arr) {
            var result = [];
            for(var i=0; i<arr.length; i++){
                if(typeof arr[i]=== 'undefined'){
                    result.push(arr[i]);
                }
            }
            return result;
        },

        /**
         * 数组中是否包含指定元素
         * @param arr
         * @param target
         * @return {Boolean}
         * */
        contains:function (arr,target) {
            return arr.indexOf(target)>-1
        }
    };

    var paths = {
        dist: {
            root: 'dist/',
            css: 'dist/css/',
            js: 'dist/js/',
            fonts: 'dist/fonts/',
            icons: 'dist/icons/'
        },
        src: {
            root: 'src/'
        }
    };

//建立文件对象
    var inteui = {
        filename: 'inteui',
        modules: require('./modules.json'),
        pkg: require('./package.json'),
        date:{
            year: new Date().getFullYear(),
            month: ('January February March April May June ' +
            'July August September October November December')
                .split(' ')[new Date().getMonth()],
            day: new Date().getDate(),
        },

        // 主色颜色名
        primaryColors: [
            'amber',
            'blue',
            'blue-grey',
            'brown',
            'cyan',
            'deep-orange',
            'deep-purple',
            'green',
            'grey',
            'indigo',
            'light-blue',
            'light-green',
            'lime',
            'orange',
            'pink',
            'purple',
            'red',
            'teal',
            'yellow',
        ],

        // 主色饱和度
        primaryColorDegrees: [
            '50',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
        ],

        // 强调色颜色名
        accentColors: [
            'amber',
            'blue',
            'cyan',
            'deep-orange',
            'deep-purple',
            'green',
            'indigo',
            'light-blue',
            'light-green',
            'lime',
            'orange',
            'pink',
            'purple',
            'red',
            'teal',
            'yellow',
        ],

        // 强调色饱和度
        accentColorDegrees: [
            'a100',
            'a200',
            'a400',
            'a700',
        ],

        // 布局主题
        layoutColors: [
            'dark',
        ],
    };

    inteui.moduleNames = [];      // 模块名列表
    inteui.jsFiles = [];          // 所有 JavaScript 文件列表

    $.each(inteui.modules, function(prop, module){

        //模块名列表，除 "core_intro" 和 "core_outro"都是模块名
        if(prop !== 'core_intro' && prop !== 'core_outro'){
            inteui.moduleNames.push(module);
        }

        // 所有 JavaScript 文件列表
        if(typeof module.js !== 'undefined'){
            inteui.jsFiles = inteui.jsFiles.concat(module.js);
        }
    });

//插件配置
    var configs = {
        autoprefixer: {
            browsers: [
                'last 2 versions',
                '> 1%',
                'Chrome >= 30',
                'Firefox >= 30',
                'ie >= 10',
                'Safari >= 8'
            ]
        },
        minifyCSS: {
            advanced: false,
            aggressiveMerging: false
        },
        header: {
            pkg: inteui.pkg,
            date: inteui.date
        },
    }

    /*删除dist目录下的css文件*/
    gulp.task('clean-css',function (cb) {
        return del(paths.dist.css+'**/*',cb)
    });

// 删除 dist 目录下的 JavaScript 文件
    gulp.task('clean-js', function (cb) {
        return del([paths.dist.js + '**/*'], cb);
    });

//构建css文件
    gulp.task('build-css',['clean-css'],function (cb) {
        gulp.src("src/inteui.less")
            .pipe(less())
            .pipe(autoprefixer(configs.autoprefixer))
            .pipe(csscomb())
            .pipe(csslint())
            .pipe(csslint.formatter())
            .pipe(gulp.dest("dist/css/grid"))
            .on('end',function(){
                cb()
            })
    })
    //构建JavaScript文件
    gulp.task('build-js',['clean-js'],function(cb){
        gulp.src(inteui.jsFiles)
            .pipe(jscs())
            .pipe(jscs.reporter())
            .pipe(concat(inteui.filename + '.js'))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(path.dist.js))
            .on('end', function(){
                cb();
            })
    })
})();



/*
gulp.watch("./src/app/less/appbar.less",function(event){
    console.log(event.path,event)
})
*/

