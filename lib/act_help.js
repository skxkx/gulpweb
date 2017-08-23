require('colors');

let env = require(APP_RD + 'lib' + SEP + 'env.js'),
    LINE_EMP = '-------------------------------------------';

let strGulpHeader = [LINE_EMP,'\t'+env.APPNAME,LINE_EMP,'Version:'+env.VER,'\r\n'].join("\r\n");

function show_usage() {
    console.log(strGulpHeader.green.bold);
}

module.exports = {
    run: function (args) {
        if (args && args.version) {
            console.log(strGulpHeader.green.bold);
        } else {
            show_usage();
        }
    }
}