/**
 * common gulpfile for all task
 */
let path = require('path'),
    gulp = require('gulp'),
    _ = require('colors'),
    LNG = require('./lang'),
    fs = require('fs');


require('../lib/env.js');

// console.log('当前路径', CUR_PTH);
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



function _path_job(strPath) {
    if (!fs.existsSync(strPath)) {
        console.log('Fiel/Directory :%s not exists!'.red, strPath);
        return false;
    } else {
        var r = gulp.task('job_watch', () => {
            console.log('onWatch', arguments);
        });

        let stat;
        if ((stat = fs.statSync(strPath)) && stat.isDirectory()) {
            if (strPath.substr(-1) != SEP) {
                strPath += SEP;
            }

            if (fs.existsSync(strPath + 'task') && fs.statSync(strPath + 'task').isDirectory()) {
                console.log('#### task directory..');
                let tasks = fs.readdirSync(strPath + 'task'),
                    pos, ext;
                if (tasks && tasks.length) {
                    for (let tsk of tasks) {
                        if (tsk.charAt(0) != '.' && (pos = tsk.indexOf('.')) != -1 && (ext = tsk.substr(pos)) && (ext == '.js' || ext == '.json')) {
                            _path_job(strPath + 'task/' + tsk);
                        }
                    }
                }
            } else if (fs.existsSync(strPath + 'task.json')) {
                //目录下有任务文件

            } else {

            }
        } else {
            let info = path.parse(strPath);
            if (info.ext == '.json') {
                //json任务配置
            } else if (info.ext == '.js' && info.dir.substr(info.dir.lastIndexOf(SEP) + 1) == 'task') {
                //task目录下的任务

            } else {
                //单个文件转码/处理
                switch (info.ext.toLocaleLowerCase()) {
                    case '.html':
                    case '.htm':

                        break;
                    case '.ts':
                    case '.es':
                    case '.less':
                    case '.sass':
                    case '.jade':
                        break;
                    case '.js':
                        let jobC = require(LIB_DIR + 'jobCluster.js');
                        new jobC.NCJobCluster({
                            'js': strPath,
                            'csss': strPath
                        })

                    default:
                }
            }
            console.log('[INFO]watch file:%s'.green, strPath);
            // gulp.watch(strPath, ['job_watch']);
        }
        return r;
    }
}

function _gulp_css_job() {
    gulp.task('css', () => {
        return gulp.src('**/*.css')
    });
}


(() => {
    gulp.task('default', () => {
        console.log(process.argv);
        console.log('gulp 路径：' + process.cwd());

        let files = (ARGS.src || process.cwd()) + '';
        if (files && files.indexOf(',') != -1) {
            files.split(',');
        } else {
            files = [files];
        }

        let jobs = [],
            task_id;
        for (let pth of files) {
            pth && (task_id = _path_job(pth)) && (jobs.push(task_id));
        }

        if (!jobs.length) {
            console.log('%s%s', "[INFO] ".bold, LNG.NO_GULP_JOB.blue);
            return;
        }
    });
})();