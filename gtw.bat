@ECHO OFF


::设置node 可执行文件路径
set NODE="d:\Program Files\nodejs\node.exe"

if not exist %NODE% (
    echo "node not found in %NODE%"
    exit
)

for %l in (gulp.exe,gulp.bat,gulp) do if "%~PATH:l"=="" echo gulp 未安装!

:: 获取脚本所在路径
set D=%~dp0

set P=%D%/bin/gw.js
REM COLOR a0

%NODE% %P%

@ECHO ON