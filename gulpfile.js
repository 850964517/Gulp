/* 
* @Author: Anle
* @Date:   2015-10-19 10:06:10
* @Last Modified by:   Anle
* @Last Modified time: 2015-10-20 15:26:31
*/

'use strict';
//引入gulp
var gulp=require('gulp'),
//引入本地服务插件
connect=require('gulp-connect'),
//压缩html
minfyHtml=require('gulp-minify-html'),
//清除文件
clean=require('gulp-clean'),
//图片压缩
imagemin=require('gulp-imagemin'),
//编译scss
sass=require('gulp-sass'),
//编译less
less=require('gulp-less'),
/*文件合并*/
concat=require('gulp-concat'),
/*压缩js文件*/
uglify=require('gulp-uglify'),
/*压缩css*/
minifyCss=require('gulp-minify-css'),
/*自动打开浏览器*/
open=require('gulp-open');

/*执行默认任务*/
gulp.task('default',['serve','watch']);
/*同时读取多个文件*/
gulp.task('data',function(){
	//gulp在读取多个文件时候src中方的数数组,文件名以逗号分开,如果要排除文件的话,前面加！
	gulp.src(['src/xml/*.xml','src/json/*.json','!src/json/secret-*.json'])
	.pipe(gulp.dest('dist/data'));
});
/*压缩html文件*/
gulp.task('html',function(){
     gulp.src("src/view/*.html")
     .pipe(minfyHtml())
     .pipe(gulp.dest('dist/html'))
     .pipe(connect.reload());
});
/*编译sass文件*/
gulp.task('sass',function(){
    gulp.src('src/style/**/*.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});
/*编译less*/
gulp.task('less',function(){
    gulp.src('src/style/**/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});
/*读取图片(并压缩图片)*/
gulp.task('images',function(){
    gulp.src('src/images/**/*.{jpg,png}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});
/*压缩js文件*/
gulp.task('script',function(){
    gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});
/*打开文件*/
gulp.task('open',function(){
   gulp.src('')
  .pipe(open({app: 'google-chrome', uri: 'http://localhost:8083'}));
});
/*合并文件(js文件)*/
gulp.task('concat',function(){
    //将jquery.js和about.js合并成vendor.js
    gulp.src(['src/js/jquery.js','src/js/about.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});
/*压缩css*/
gulp.task('minfyCss',function(){
    gulp.src('dist/css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});
/*清除缓存*/
gulp.task('clean',function(){
    gulp.src('dist').pipe(clean());
});
/*创建本地服务*/
gulp.task('serve',function(){
    connect.server({
    	root:'dist/',//设置服务的跟目录
    	livereload:true, //设置是否自动刷新
        port:'8083'  //设置本地服务端口号
    });
});
/*创建主任务*/
gulp.task('build',['clean','html','images','data'],function(){
	//在执行bulid任务时,会先执行clean,html,image.data任务
   console.log('编译成功');
});
/*文件监听(文件发生变化将会自动执行)*/
gulp.task('watch',function(){
    gulp.watch('src/view/*.html',['html']);
    gulp.watch('src/images/**/*.{jpg,png}',['images']);
    gulp.watch(['src/xml/*.xml','src/json/*.json'],['data']);
    gulp.watch('src/style/**/*.scss',['sass']);
    gulp.watch('src/style/**/*.less',['less']);
    gulp.watch('src/js/**/*.js',['script']);
    gulp.watch('dist/css/**/*.css',['minfyCss']);
});


