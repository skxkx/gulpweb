#!/usr/bin/env sh

NODE_BIN=node
CUR_PTH=`pwd`

# echo '::::CURRENT PATH:'$CUR_PTH

#####GET BIN DIR######################
bin_dir=`dirname $0`
APP_ROOT=`cd $bin_dir && pwd`
######################################

$NODE_BIN ${APP_ROOT}/bin/gw.js ${@}
