# 推送到Gitee---博客
# 在Bash窗口执行 yarn publish 或者 npm run publish

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# npm run gitee

# 进入生成的文件夹
# cd docs/.vuepress/dist/
cd dist/
path=$(pwd)

echo "当前路径是：$path"
BASE_URL='\/vuepress'
sed -i 's/\/BASE_URL/'"$BASE_URL"'/g' $path/about/me.html
sed -i 's/\/BASE_URL/'"$BASE_URL"'/g' $path/other/friends.html