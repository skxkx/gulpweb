/**
 * 自定义任务cluster--通过fork
 */


let child = require('child_process');

class NCJobCluster {

    constructor(jobs) {
        console.log('##XXX>>>', jobs);
        this.ch = child.fork(LIB_DIR + 'cluster_job.js', null, { stdio: [process.stdin, process.stdout, process.stderr, 'ipc'] });
        this.ch.send(jobs);
        let $this = this;
        this.ch.on('message', (msg, hdl) => { $this._on_msg(msg, hdl) });
    }

    _on_msg(msg, hdl) {
        console.log('On sub message:', msg, hdl, this);
    }
}

module.exports = { NCJobCluster };