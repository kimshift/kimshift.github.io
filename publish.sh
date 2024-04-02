# 推送到Gitee---博客
# 在Bash窗口执行 yarn publish 或者 npm run publish

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run gitee

# 进入生成的文件夹
# cd docs/.vuepress/dist/
cd dist/

# 处理yaml资源路径问题
path=$(pwd)
BASE_URL='\/vuepress'
sed -i 's/\/BASE_URL/'"$BASE_URL"'/g' $path/about/me.html
sed -i 's/\/BASE_URL/'"$BASE_URL"'/g' $path/other/friends.html
# 处理yaml资源路径问题

# 初始化项目仓库
git init
git add -A
git commit -m 'publish'
#关联远程仓库
git remote add origin git@gitee.com:kimshift/vuepress.git
git checkout -b pages

# 推送到部署分支
git push -u origin pages -f

# cd ../../../
cd ../
# #将源码推送的master
git add .
git commit -m 'update docs'
git push origin master