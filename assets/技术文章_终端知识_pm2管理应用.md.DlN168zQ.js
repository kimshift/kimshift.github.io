import{_ as a,q as s,p,aE as n}from"./chunks/framework.-H45_L2h.js";const b=JSON.parse('{"title":"pm2 基础知识","description":"","frontmatter":{"title":"pm2 基础知识","date":"2023-05-31T14:10:03.000Z","categories":["终端知识"],"tags":["pm2"]},"headers":[],"relativePath":"技术文章/终端知识/pm2管理应用.md","filePath":"技术文章/终端知识/pm2管理应用.md","lastUpdated":1723083875000}'),e={name:"技术文章/终端知识/pm2管理应用.md"},t=n(`<h1 id="pm2-基础知识" tabindex="-1">pm2 基础知识 <a class="header-anchor" href="#pm2-基础知识" aria-label="Permalink to &quot;pm2 基础知识&quot;">​</a></h1><h2 id="pm2-管理器" tabindex="-1">pm2 管理器 <a class="header-anchor" href="#pm2-管理器" aria-label="Permalink to &quot;pm2 管理器&quot;">​</a></h2><h3 id="pm2-安装" tabindex="-1">pm2 安装 <a class="header-anchor" href="#pm2-安装" aria-label="Permalink to &quot;pm2 安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 命令行安装 pm2</span></span>
<span class="line"><span>npm install -g pm2</span></span></code></pre></div><h3 id="pm2-用法" tabindex="-1">pm2 用法 <a class="header-anchor" href="#pm2-用法" aria-label="Permalink to &quot;pm2 用法&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pm2 start app.js --name demo # 启动带命名的进程(demo为自定义名称)</span></span>
<span class="line"><span>pm2 start npm -- run dev --name demo # 启动npm脚本</span></span>
<span class="line"><span>pm2 start app.js -i 4  #启动4个app.js</span></span>
<span class="line"><span>pm2 ls            # 显示所有进程状态</span></span>
<span class="line"><span>pm2 monit              # 监视所有进程</span></span>
<span class="line"><span>pm2 logs               #  显示所有进程日志</span></span>
<span class="line"><span>pm2 stop all           # 停止所有进程</span></span>
<span class="line"><span>pm2 restart all        # 重启所有进程</span></span>
<span class="line"><span>pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)</span></span>
<span class="line"><span>pm2 stop id             # 停止指定的进程(id为pm2进程的id值)</span></span>
<span class="line"><span>pm2 restart id          # 重启指定的进程</span></span>
<span class="line"><span>pm2 startup            # 产生 init 脚本 保持进程活着</span></span>
<span class="line"><span>pm2 web                # 运行健壮的</span></span>
<span class="line"><span>pm2 delete id           # 删除指定的进程</span></span>
<span class="line"><span>pm2 delete all         # 删除全部进程</span></span></code></pre></div><h3 id="运行进程的不同方式" tabindex="-1">运行进程的不同方式： <a class="header-anchor" href="#运行进程的不同方式" aria-label="Permalink to &quot;运行进程的不同方式：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目</span></span>
<span class="line"><span>pm2 start app.js -i 3      # 启动3个进程</span></span>
<span class="line"><span>pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster</span></span>
<span class="line"><span>pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)</span></span>
<span class="line"><span>pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone</span></span>
<span class="line"><span>pm2 stop serverone       # 停止 serverone 进程</span></span>
<span class="line"><span>pm2 start app.json        # 启动进程, 在 app.json里设置选项</span></span>
<span class="line"><span>pm2 start app.js -i max -- -a 23  #在--之后给 app.js 传递参数</span></span>
<span class="line"><span>pm2 start app.js -i max -e err.log -o out.log  # 启动并生成一个配置文件</span></span></code></pre></div><h4 id="你也可以执行用其他语言编写的-app-fork-模式" tabindex="-1">你也可以执行用其他语言编写的 app ( fork 模式): <a class="header-anchor" href="#你也可以执行用其他语言编写的-app-fork-模式" aria-label="Permalink to &quot;你也可以执行用其他语言编写的 app ( fork 模式):&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pm2 start my-bash-script.sh    -x --interpreter bash</span></span>
<span class="line"><span>pm2 start my-python-script.py -x --interpreter python</span></span></code></pre></div>`,10),l=[t];function i(r,o,c,m,d,h){return p(),s("div",null,l)}const g=a(e,[["render",i]]);export{b as __pageData,g as default};
