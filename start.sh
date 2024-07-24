# 捕捉异常：遇到错误则停止执行
set -e
# 启动后台服务
version=$(node -v)
if [[ $version != "v20."* ]]; then
    echo "当前Node.js版本不是v20,正在切换..."
    nvm use 20
else
    echo "$version node环境已准备"
fi
# 启动服务
vitepress dev
