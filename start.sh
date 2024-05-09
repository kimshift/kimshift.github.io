
# 在Bash窗口执行 npm start
# 确保脚本抛出遇到的错误
set -e

#设置临时环境变量
export YUN_ENV='false'     # 部署到云服务
export VALINE_ENV='true' # 关闭/开启评论

# 切换node版本
nvm use 14.18.1

# 判断项目根路径是否有figure目录
if [ -d "figure" ]; then
  echo "figure图床目录已就绪"
  cd figure
  echo "开始拉取最新图库"
  git pull
  echo "拉取完成"
  cd ..
else
  echo "figure目录不存在,准备克隆最新图库"
  git clone git@gitee.com:kimshift/figure.git
  echo "克隆完成"
fi

# 启动服务
vuepress dev docs