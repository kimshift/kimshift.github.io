# 推送到Gitee---博客
# 在Bash窗口执行 npm run publish

# 确保脚本抛出遇到的错误
set -e

#设置临时环境变量
export YUN_ENV='false'    # 部署到云服务
export VALINE_ENV='true' # 关闭/开启评论

# 切换node版本
nvm use 14.18.1

# 构建静态文件
npm run build

# 进入生成的文件夹
cd dist/

# 修改index.html 内容
sed -i 's/en-US/zh-CN/g' index.html # 改为中文网站

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
#关联Gitee远程仓库
# git remote add origin git@gitee.com:kimshift/kimshift.git
#关联Github远程仓库
git remote add github git@github.com:kimshift/kimshift.github.io.git
# 切换到镜像分支
git checkout -b pages

# 强制推送到Gitee部署分支
# echo "推送到Gitee部署分支"
# git push -u origin pages -f
# 强制推送到Github部署分支
echo "推送到Github部署分支"
git push -u github pages -f


cd ../
git add .
git commit -m 'update docs'
# 将源码推送到Gitee
git push origin master

# echo "推送结束---请前往更新:https://gitee.com/kimshift/kimshift/pages"
echo "推送结束---请前往更新:https://github.com/kimshift/kimshift.github.io/actions"