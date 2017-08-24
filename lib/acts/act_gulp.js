function _run(args, allmods) {
    console.log('ARGS:', args);

    let sArgs = args.length ? args.splice(1, args.length - 1) : [];
    for (let k in args) {
        if (isNaN(k)) {
            sArgs.push('--' + k + '=' + args[k]);
        } else {}
    }

    sArgs.push('--gulpfile=' + APP_RD + 'etc/gulpfile.js', '--cwd=' + CUR_PTH);

    let child = require('child_process').spawn('gulp', sArgs, {
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true,
        cwd: CUR_PTH
    });



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