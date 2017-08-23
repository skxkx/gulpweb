#!/usr/bin/env node
/**
 * gulp tool for web frontend
 */

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

//参数解析
function _parse_args() {
    return ARGS.parseArgs(process.argv);
}

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

function _parse_act(args) {
    let ret = { act: 'help', 'args': args };
    
    return ret;
}

function index() {
    console.log('CURRENT_DIR:', CUR_PTH);
    _export_vars();

    let args = _parse_args();
    let {act,arg}=_parse_act(args);

    run_act(act,arg);
}


function run_act(act, args) {
    console.log('act:', act);
    try {
        let actmod = require(RD + 'lib' + SEP + 'act_' + act + '.js');
        if (actmod && actmod.run) {
            actmod.run();
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
    exports.init = index;
}