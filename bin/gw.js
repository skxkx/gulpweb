#!/usr/bin/env node

/**
 * gulp tool for web frontend
 */

let NO_COLOR = false;
try {
    require('colors');
} catch (e) {
    NO_COLOR = true;
    // console.log('--->');
}
const VER = "0.0.1";

var pth = require('path'),
    fs = require('fs'),
    OS = require('os');

var Env = require('../lib/env.js'),
    ARGS = require('../lib/arguments.js');

/**
 * gulp 模块验证
 */
function _valid_gulp() {

}

function _load_cnf() {

}

/**
 * 解析支持的行为
 * 
 * @returns
 */
function _parse_support_acts(args) {
    var flists = fs.readdirSync(ACT_DIR),
        fstat = null,
        bnm = '',
        actn = '',
        ret = { cur: null, all: {} };

    // for (let fnm of flists) {
    var fnm;
    for (var k in flists) {
        fnm = flists[k];
        bnm = pth.basename(fnm, '.js');
        if (bnm != fnm && bnm.length > 4 && bnm.substr(0, 4) == 'act_') {
            fstat = fs.lstatSync(ACT_DIR + fnm);
            if (fstat.isFile()) {
                actn = bnm.substr(4);
                if (!ret.cur && args[actn]) {
                    ret.cur = require(ACT_DIR + fnm);
                    ret.cur.__nm = bnm.substr(4);
                } else if (!ret.cur) {

                }
                ret.all[bnm.substr(4)] = ACT_DIR + fnm;
            }
        }
    }

    return ret;
}

function _is_proj() {

}

function _run_args(args) {
    // let { cur, all } = _parse_support_acts(args);
    var obj = _parse_support_acts(args),
        cur = obj.cur,
        all = obj.all;

    run_act(cur || (args.version ? 'version' : ''), args, all);
}

function index() {
    var args = ARGS.parseArgs(process.argv),
        i = args.length - 1;
    while (i >= 0) {
        // console.log('act valid:', args[i]);
        if (/^[a-z_]+$/gi.test(args[i]) && fs.existsSync(ACT_DIR + 'act_' + args[i] + '.js')) {
            args[args[i]] = true;
            args.splice(i, 1);
        }
        i--;
    }

    _run_args(args);
}


function run_act(act, args, allmods) {
    (!act) && (act = 'help');

    try {

        if (typeof act == 'string') {
            act = require(ACT_DIR + 'act_' + (act == 'version' ? 'help' : act) + '.js');
            act.__nm = act;
        }

        if (act && act.run) {
            act.run(args, allmods);
            return;
        } else {
            console.error('###Action###' + act + ' not supported!');
            process.abort();
        }
    } catch (e) {
        console.error('Error!', e);
    }
}

if (require.main == module) {
    index();
} else {
    exports.init = function(args) {
        if (NO_COLOR) {
            console.log('::::CURRENT_DIR:%s', CUR_PTH);
        } else {
            console.log('::::CURRENT_DIR:%s'.red.bold, CUR_PTH);
        }
        _run_args(args);
    }
}