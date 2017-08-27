/**
 * 实现gulp相关参数解析及调用
 **/
let fs = require('fs'),
    path = require('path');

function _run(args, allmods) {
    console.log('ARGS:', args);

    let sArgs = [];
    let kv, files = '';

    for (let k in args) {
        if (isNaN(k)) {
            if (k == 'gulp') {
                continue;
            }
            sArgs.push('--' + k + '=' + args[k]);
        } else {
            //解析参数中合理的路径作为处理对象
            if (k > 0 && (kv = args[k])) {
                kv = path.isAbsolute(kv) ? kv : path.normalize(CUR_PTH + kv);
                // console.log('##X>K', k, kv);
                if (fs.existsSync(kv)) {
                    files += (files ? ',' : '') + kv;
                } else {
                    console.log('[ERR]%s 不是有效的文件或目录.'.red.bold, kv);
                }
            }
        }
    }

    if (files) {
        sArgs.push('--src=' + files);
    } else {
        sArgs.push('--src=' + CUR_PTH);
    }

    sArgs.push('--gulpfile=' + APP_RD + 'etc/gulpfile.js', '--cwd=' + CUR_PTH);

    //子进程调用gulp
    let child = require('child_process').spawn('gulp', sArgs, {
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true,
        cwd: CUR_PTH
    });

    // child.send({ 'ok': 1 });



    // let cluster = require('cluster');
    // if (cluster.isMaster) {
    //     let clta = cluster.fork({ 'k': 'js' }),
    //         cltb = cluster.fork({ 'k': 'ts' });
    //     clta.on('message', (a) => {
    //         if (cltb && !cltb.isDead() && cltb.isConnected()) {
    //             cltb.send({ 'Msagfroma': a })
    //         } else {
    //             clta.removeAllListeners('message');
    //             clta.disconnect();
    //         }
    //     });
    //     clta.on('exit', (e) => {
    //         clta.__exit = 1;
    //     })
    //     cltb.on('message', (b) => {
    //         if (clta && !clta.isDead() && clta.isConnected()) {
    //             clta.send({ 'Msgfromb': b });
    //         } else {
    //             cltb.removeAllListeners('message');
    //             cltb.disconnect();
    //         }
    //     });
    //     cltb.on('exit', (e) => {
    //         cltb.__exit = 1;
    //     })
    // } else {
    //     if (process.env.k == 'js') {
    //         process.on('message', (e) => {
    //             console.log('A read message:', e);
    //         });
    //         let i = 0,
    //             th = setInterval(() => {
    //                 if (i++ < 20) {
    //                     process.send(process.env.k);
    //                 } else {
    //                     process.send(process.env.k + ';bye bye!I\'m gone!');
    //                     clearInterval(th);
    //                     th = 0;
    //                     process.exit(0);
    //                 }
    //             }, 1000);
    //     } else {
    //         process.on('message', (e) => {
    //             console.log('B read message:', e);
    //         });
    //         let i = 0,
    //             th = setInterval(() => {
    //                 if (i++ < 20) {
    //                     process.send(process.env.k);
    //                 } else {
    //                     process.send(process.env.k + ';bye bye!I\'m gone!' + th);
    //                     clearInterval(th);
    //                     th = 0;
    //                     process.exit(0);
    //                 }
    //             }, 2000);
    //     }
    // }
}

module.exports = {
    short_arg: 'g',
    flag: 1,
    run: _run
}