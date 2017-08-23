#!/usr/bin/env node

/**
 * gulp tool for web frontend
 */

require('colors');

const VER = "0.0.1";

var pth = require('path'),
    fs = require('fs'),
    OS = require('os');


//路径分隔符
let SEP = pth.sep,
    //执行代码时所在的路径
    CUR_PTH = (process.cwd() || process.env['PWD']) + SEP,
    //应用工具根目录
    RD = pth.dirname(__dirname) + SEP,
    //用户目录
    USER_HOME = OS.homedir();


let Env = require('../lib/env.js'),
    ARGS = require('../lib/arguments.js');


function _export_vars() {
    global.APP_RD = RD;
    global.SEP = SEP;
    global.CUR_PTH = CUR_PTH;
}

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
    let lib_pth = APP_RD + 'lib' + SEP,
        flists = fs.readdirSync(lib_pth),
        fstat = null,
        bnm = '',
        actn = '',
        ret = { cur: null, all: {} };

    for (let fnm of flists) {
        bnm = pth.basename(fnm, '.js');
        if (bnm != fnm && bnm.length > 4 && bnm.substr(0, 4) == 'act_') {
            fstat = fs.lstatSync(lib_pth + fnm);
            if (fstat.isFile()) {
                actn = bnm.substr(4);
                if (!ret.cur && args[actn]) {
                    ret.cur = require(lib_pth + fnm);
                    ret.cur.__nm = bnm.substr(4);
                } else if (!ret.cur) {

                }
                ret.all[bnm.substr(4)] = lib_pth + fnm;
            }
        }
    }

    return ret;
}

function _is_proj() {

}

function _run_args(args) {
    let { cur, all } = _parse_support_acts(args);

    run_act(cur || (args.version ? 'version' : ''), args, all);
}

function index() {
    console.log('::CURRENT_DIR:%s'.red.bold, CUR_PTH);

    _export_vars();

    _run_args(ARGS.parseArgs(process.argv));
}


function run_act(act, args, allmods) {
    (!act) && (act = 'help');

    try {

        if (typeof act == 'string') {
            act = require(RD + 'lib' + SEP + 'act_' + (act == 'version' ? 'help' : act) + '.js');
            act.__nm = act;
        }

        if (act && act.run) {
            act.run(args, allmods);
        } else {
            console.error('###Action###' + act + ' not supported!');
            process.abort();
        }
    } catch (e) {
        console.error('Error!');
    }
}

if (require.main == module) {
    index();
} else {
    exports.init = function(args) {
        console.log('::::CURRENT_DIR:%s'.red.bold, CUR_PTH);
        _export_vars();
        _run_args(args);
    }
}