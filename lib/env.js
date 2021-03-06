let OS = require('os'),
    pth = require('path');

// if (!global.APP_RD) {
//初始化一次就可以了
let VER = '0.0.1',
    APPNAME = 'Gulp tool for web',
    //路径分隔符
    SEP = pth.sep,
    //执行代码时所在的路径
    CUR_PTH = (process.cwd() || process.env['PWD']) + SEP,
    //应用工具根目录
    RD = pth.dirname(__dirname) + SEP,
    LIB_DIR = RD + 'lib' + SEP,
    ACT_DIR = LIB_DIR + "acts" + SEP, //支持的动作目录
    //用户目录
    USER_HOME = OS.homedir() + SEP,
    APP_CONF_DIR = USER_HOME + (OS.platform == 'win32' ? 'AppData\\Local\\gtw' : '.gtw') + SEP,
    ARG_OBJ = require('./arguments.js').parseArgs(),
    TMP_DIR = OS.tmpdir() + SEP + APPNAME.replace(/\s/g, '_') + '.v' + VER + SEP;
// }
// console.log(OS.userInfo(), OS.release(), process.version);

console.log(APP_CONF_DIR);

//导出全局变量
(() => {
    if (!global.APP_RD) {
        global.APP_RD = RD;
        global.SEP = SEP;
        global.ARGS = ARG_OBJ;
        global.LIB_DIR = LIB_DIR;
        global.ACT_DIR = ACT_DIR;
        global.CUR_PTH = CUR_PTH;
        global.USER_HOME = USER_HOME;
        global.APP_CONF_DIR = APP_CONF_DIR;
        global.TMP_DIR = TMP_DIR;
    }
})();

module.exports = { VER, APPNAME, SEP, CUR_PTH, RD, LIB_DIR, ACT_DIR, USER_HOME, TMP_DIR };