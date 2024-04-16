# 在Bash窗口执行 yarn deploy 或者 npm run deploy

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist/

git init
git add -A
git commit -m 'deploy'
#关联远程仓库
git remote add origin git@gitee.com:kimshift/kimshift.git
git checkout -b gh-pages

# 推送到部署分支
git push -u origin gh-pages -f

cd ../../../
#将源码推送的master
git add .
git commit -m 'update docs'
git push origin master