/**
 * common gulpfile for all task
 */
let path = require('path'),
    gulp = require('gulp'),
    fs = require('fs');

require('../lib/env.js');
console.log('当前路径', CUR_PTH);
let tasknm = "";


function is_a_task_dir() {
    let pth = process.cwd();
    pth && (pth = pth.replace(/[:@]/g, '_'));
    if (pth && pth.charAt(pth.length - 1) == SEP) {
        pth = pth.substr(0, pth.length - 1);
    }
    nm = pth.substr(pth.lastIndexOf(SEP) + 1);
    console.log('Projnam', nm);
}

function _gulp_less_job() {
    gulp.task('less2css', () => {

    });
    gulp.task('less', ['less2css'], () => {
        // gulp.run('css');
    });
}



function _gulp_css_job() {
    gulp.task('css', () => {
        return gulp.src('**/*.css')
    });
}

-

function main() {
    console.log(process.argv);
    console.log('gulp 路径：' + process.cwd());

    _gulp_css_job();

}();