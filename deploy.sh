# 部署到云服务器

# 在Bash窗口执行 npm run deploy

# 确保脚本抛出遇到的错误
set -e

#设置临时环境变量
export YUN_ENV='true'

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist/

# 处理yaml资源路径问题
# path=$(pwd)
# BASE_URL=''
# sed -i 's/\/BASE_URL/'"$BASE_URL"'/g' $path/about/me.html
# sed -i 's/\/BASE_URL/'"$BASE_URL"'/g' $path/other/friends.html
# sed -i 's/\/BASE_URL/'$BASE_URL'/g' $path/assets/js/*.js
# echo "路径替换完成"
# 处理yaml资源路径问题

git init
git add -A
git commit -m 'deploy'
#关联远程仓库
git remote add origin git@gitee.com:kimshift/kimshift.git
git checkout -b yun-pages

# # 推送到部署分支
git push -u origin yun-pages -f

cd ../
#将源码推送的master
git add .
git commit -m 'update docs'
git push origin master