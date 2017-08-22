#!/usr/bin/env node

/**
 * gulp tool for web frontend
 */
const VER = "0.0.1";

var pth = require('path');

//路径分隔符
var SEP = pth.sep,
    //执行代码时所在的路径
    CUR_PTH = (process.cwd() || process.env['PWD']) + SEP,
    //应用工具根目录
    RD = pth.dirname(__dirname) + SEP;

function _export_vars() {
    global.APP_RD = RD;
    global.PSEP = SEP;
    global.CUR_PTH = CUR_PTH;
}

function _load_cnf() {

}

function index() {
    console.log('CURRENT_DIR:', CUR_PTH);
    _export_vars();

}

if (require.main == module) {
    index();
} else {
    exports.init = index;
}