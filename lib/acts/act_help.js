require('colors');

let env = require(APP_RD + 'lib' + SEP + 'env.js'),
    LINE_EMP = '-------------------------------------------';

let strGulpHeader = [LINE_EMP, '\t' + env.APPNAME, LINE_EMP, 'Version:' + env.VER, '\r\n'].join("\r\n");

function show_usage(allmods) {
    console.log(strGulpHeader.green.bold);
    let strUseage = "",
        sk = '',
        mod;
    for (let k in allmods) {
        mod = require(allmods[k]);
        if (mod) {
            strUseage += (mod.short_arg ? '-' + mod.short_arg + (mod.flag ? ',' : ' value,') : '')
            strUseage += '--' + k + (mod.flag ? '' : '=value') + '\t\t' + (mod.desc || k + ' module!') + '\r\n';
        }
        // if (mod && mod.flag) {
        //     strUseage += '\t--' + k + '\t\t' + (mod.desc || k + ' module!') + '\r\n';
        // } else if (mod) {
        //     strUseage += '\t--' + k + '=value\t\t' + (mod.desc || k + ' module!') + '\r\n';
        // }
    }
    console.log('Arguments lists:');
    console.log(strUseage);
}

module.exports = {
    run: function(args, allmods) {
        if (args && args.version) {
            console.log(strGulpHeader.blue.bold);
        } else {
            show_usage(allmods);
        }
    },
    desc: '显示帮助信息',
    flag: 1,
    short_arg: 'h'
}