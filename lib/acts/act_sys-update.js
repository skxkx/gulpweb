var child = require('child_process'),
    platform = require('os').platform;

// console.log('####', platform);
var cmdpre = ('win32' == platform ? '' : 'sudo ');

function run_cmd(arglist, onsucc, onerr) {
    if (!arglist || !arglist.length) {
        onsucc();
    }

    var strcmd = arglist.shift();
    var ch = child.exec(strcmd, function(err, stdout, stderr) {
        if (err) {
            console.error('[Error]', err);
        } else {
            console.log(stdout);
        }
    });

    ch.on('exit', function() {
        console.log('--->', strcmd, arglist);
        if (arglist && arglist.length) {
            run_cmd(arglist, onsucc, onerr);
        } else {
            onsucc();
        }
    });
    ch.on('error', function() {
        onerr(strcmd, arglist);
    });
}

module.exports = {
    run: function() {
        var cmds = [
            'cd ' + APP_RD, cmdpre + 'npm cache clean -f', cmdpre + 'npm install -g n', cmdpre + 'n stable', 'npm install ' + APP_RD
        ];
        run_cmd(cmds, function() {
            console.log('[info]success!');
        }, function(cmd, _) {
            console.log('error on cmd:', cmd);
        });
    }
}