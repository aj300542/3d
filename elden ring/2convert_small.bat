@echo off
setlocal enabledelayedexpansion

:: 创建输出文件夹
set "output=converted_h264"
if not exist "%output%" (
    mkdir "%output%"
)

:: 遍历当前目录下所有 mp4 和 mkv 文件
for %%f in (*.mp4 *.mkv) do (
    echo 正在处理：%%f

    :: 设置输出文件名
    set "filename=%%~nf"
    set "outfile=%output%\!filename!_web.mp4"

    :: 执行压缩转码（网页兼容：H.264 + AAC）
    ffmpeg -i "%%f" -c:v libx264 -preset veryfast -crf 28 -c:a aac -b:a 96k -movflags +faststart "!outfile!"
)

echo 转码完成！
pause
