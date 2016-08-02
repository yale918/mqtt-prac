var gulp = require('gulp');
gulp.task('hello',function(){
    console.log('Hello Gulp.js');
});

var  connect = require('gulp-connect');
   
   gulp.task('http-server', function() {
         connect.server();
   });
    
    gulp.task('default', ['http-server']);
