# 推送到Gitee/Github ---博客
# 在Bash窗口执行 npm run publish
# 确保脚本抛出遇到的错误
set -e

#设置临时环境变量
export YUN_ENV='false'   # 部署到云服务
export VALINE_ENV='true' # 关闭/开启评论

# 切换node版本
version=$(node -v)
if [[ $version != "v20."* ]]; then
    echo "当前Node.js版本不是v20,正在切换..."
    nvm use 20
else
    echo "$version node环境已准备"
fi

# 构建静态文件
pnpm build

# 进入生成的文件夹
cd .vitepress/dist/

# 修改index.html 内容
# sed -i 's/en-US/zh-CN/g' index.html # 改为中文网站

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
# git remote add origin git@gitee.com:kimshift/notebook.git
git add .
git commit -m 'update docs'
# 将源码推送到Github
git push -u origin master

# echo "推送结束---请前往更新:https://gitee.com/kimshift/kimshift/pages"
echo "推送结束---请前往查看:https://github.com/kimshift/kimshift.github.io/actions"