/****************************
 * 解析类命令行参数并返回数组
 * 支持长短参数 -a xxx --azx=wfewf -abce xx 等参数类型
 * @param params Array 命令行参数--默认取process.argv
 * @return object
 ****************************/
module.exports = {
    parseArgs : (params) => {
        let ret = [],
            karr;
        params = params || process.argv;
        if (params) {
            let k, v, i = 0,
                err = false,
                flagPos = 0;
            for (let idx = 1, itm, il = params.length; idx < il && (itm = params[idx] || 1); idx++) {
                // 根据顺序存储索引参数
                if (itm.charAt(0) == '-') {
                    itm = itm.substr(1).trim();
                    // 无效的参数名
                    if (!itm || (itm.charAt(0) == '-' && itm.length < 2)) {
                        // showError("Invalid arguments:" + itm)
                        return null;
                    } else {
                        // 只有
                        if (k) {
                            // 前一个是参数名，再次出现参数名，则默认前一个参数错误开关参数
                            ret[k] = true;
                            k = null;
                        }
                        // 长参数名
                        if (itm.charAt(0) == '-') {
                            // 解析等号
                            itm = itm.substr(1).trim();
                            if (itm && (flagPos = itm.indexOf('=')) > 0) {
                                ret[itm.substr(0, flagPos)] = itm.substr(flagPos + 1);
                            } else if (itm) {
                                ret[itm] = true;
                            }
                        } else {
                            if (itm.length > 1) {
                                // 多个连续短参数-最后一个取赋值，前面作为开关
                                karr = itm.split('');
                                k = karr.pop();
                                karr.forEach((it) => {
                                    ret[it] = true;
                                })
                                // console.log('ret:', ret)
                                karr = null;
                            } else {
                                // 短参数名，先保存参数名，取下一个参数作为取值
                                k = itm;
                            }
                        }
                    }
                } else {
                    if (k) {
                        // 如果有前置参数名称
                        ret[k] = itm;
                        k = null;
                    } else {
                        // 作为索引参数保存
                        ret[i++] = itm;
                    }
                }
            }

            // 最后一个短参数开关
            if (k) {
                ret[k] = true;
                k = null;
            }
        }
        return ret;
    }
}