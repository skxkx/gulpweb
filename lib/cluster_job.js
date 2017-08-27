var cluster = require('cluster');
let isMaster = cluster.isMaster,
    children = {};
process.on('message', (jobs) => {
    if (isMaster) {
        console.log('EEEE____>', jobs);
        if (!jobs) {
            console.log('Exit!');
            if (children) {
                for (let k in children) {
                    children[k].exit();
                }
            }
        } else {
            let jobinfo = jobs;
            for (let k in jobinfo) {
                clh = cluster.fork();
                clh.send({ 'nm': k, 'job': jobinfo[k] });
                clh.on('exit', () => {
                    console.log('[info]child(%s) exit!'.blue, k);
                });
                clh.on('message', (msg, hdl) => {
                    process.send(msg, hdl);
                });
                clh.on('error', (err) => {
                    console.error('[Error]child(%s) error', k, err);
                });
                children[k] = clh;
            }
        }
    } else {
        console.log('child-dataL', jobs);
        // process.(0);
        process.send('***E>>>' + JSON.stringify(jobs));
        return;
    }
});