import subprocess

def png_to_mkv():
    cmd = [
        "ffmpeg",
        "-framerate", "30",
        "-start_number", "10001",   # 从 p10001.png 开始
        "-i", "p%05d.png",          # 匹配 p10001.png ... p10170.png
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "output.mkv"
    ]
    print("运行命令:", " ".join(cmd))
    subprocess.run(cmd)

if __name__ == "__main__":
    png_to_mkv()
