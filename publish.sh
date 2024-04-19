# 推送到Gitee---博客
# 在Bash窗口执行 npm run publish

# 确保脚本抛出遇到的错误
set -e

#设置临时环境变量
export YUN_ENV='false'

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist/

# 处理yaml资源路径问题
# path=$(pwd)
# BASE_URL='\/vuepress'
# sed -i 's/\/BASE_URL/'$BASE_URL'/g' $path/about/me.html
# sed -i 's/\/BASE_URL/'$BASE_URL'/g' $path/other/friends.html
# sed -i 's/\/BASE_URL/'$BASE_URL'/g' $path/assets/js/*.js
# echo "路径替换完成"
# 处理yaml资源路径问题

# 初始化项目仓库
git init
git add -A
git commit -m 'publish'
#关联远程仓库
git remote add origin git@gitee.com:kimshift/kimshift.git
git checkout -b pages
echo "推送到部署分支"

# 强制推送到gitee部署分支
git push -u origin pages -f
cd ../
# #将源码推送的master
git add .
git commit -m 'update docs'
git push origin master
echo "推送结束---请前往更新:https://gitee.com/kimshift/kimshift/pages"