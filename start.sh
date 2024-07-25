# 捕捉异常：遇到错误则停止执行
set -e
# 启动后台服务
# version=$(node -v)
# if [[ $version != "v20."* ]]; then
#     echo "当前Node.js版本不是v20,正在切换..."
#     nvm use 20
# else
#     echo "$version node环境已准备"
# fi

# 判断项目docs/public是否有figure目录
if [ -d "docs/public/figure" ]; then
    echo "figure图床目录已就绪"
else
    echo "figure目录不存在,准备克隆最新图库"
    cd docs/public
    echo "开始克隆最新图库"
    git clone git@gitee.com:kimshift/figure.git
    # 返回根目录
    cd ../../

fi

echo "准备启动服务"
# 启动服务
vitepress dev
