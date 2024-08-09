import{_ as i,q as s,p as a,aE as t}from"./chunks/framework.-H45_L2h.js";const c=JSON.parse('{"title":"git 远程仓库命令","description":"","frontmatter":{"title":"git 远程仓库命令","date":"2023-05-13T13:29:22.000Z","categories":["终端知识"],"tags":["git"]},"headers":[],"relativePath":"技术文章/终端知识/GIt/远程仓库命令.md","filePath":"技术文章/终端知识/GIt/远程仓库命令.md","lastUpdated":1723083875000}'),e={name:"技术文章/终端知识/GIt/远程仓库命令.md"},l=t(`<h1 id="git-远程仓库命令" tabindex="-1">git 远程仓库命令 <a class="header-anchor" href="#git-远程仓库命令" aria-label="Permalink to &quot;git 远程仓库命令&quot;">​</a></h1><h2 id="github-gitee-远程仓库" tabindex="-1">GitHub/Gitee 远程仓库 <a class="header-anchor" href="#github-gitee-远程仓库" aria-label="Permalink to &quot;GitHub/Gitee 远程仓库&quot;">​</a></h2><h3 id="关联远程仓库" tabindex="-1">关联远程仓库 <a class="header-anchor" href="#关联远程仓库" aria-label="Permalink to &quot;关联远程仓库&quot;">​</a></h3><ul><li><p>关联远程仓库：git remote add origin 仓库地址</p></li><li><p>关联多个远程仓库 Gitee、GitHub</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#关联 GitHub 仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remote</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> github</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 仓库地址</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#关联 Gitee 仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remote</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 仓库地址</span></span></code></pre></div></li></ul><h3 id="查看远程库信息" tabindex="-1">查看远程库信息 <a class="header-anchor" href="#查看远程库信息" aria-label="Permalink to &quot;查看远程库信息&quot;">​</a></h3><ul><li>查看远程库信息：git remote -v</li></ul><h3 id="拉取远程仓库" tabindex="-1">拉取远程仓库 <a class="header-anchor" href="#拉取远程仓库" aria-label="Permalink to &quot;拉取远程仓库&quot;">​</a></h3><ul><li>默认拉取更新：git pull 或者 git pull origin master</li><li>拉取 github 更新：git pull github master</li><li>拉取 gitee 更新：git pull gitee master</li></ul><h3 id="上传远程仓库" tabindex="-1">上传远程仓库 <a class="header-anchor" href="#上传远程仓库" aria-label="Permalink to &quot;上传远程仓库&quot;">​</a></h3><ul><li><p>初次上传远程仓库：git push -u origin master</p></li><li><p>上传到远程仓库：git push origin master</p></li><li><p>强制上传远程仓库：git push -u origin pages -f</p></li><li><p>关联多个仓库的情况下</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#上传到关联的GitHub仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> github</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#上传到关联的Gitee仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master</span></span></code></pre></div></li></ul><h3 id="整合远程仓库和本地仓库" tabindex="-1">整合远程仓库和本地仓库 <a class="header-anchor" href="#整合远程仓库和本地仓库" aria-label="Permalink to &quot;整合远程仓库和本地仓库&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#整合远程仓库和本地仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --allow-unrelated-histories</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#拒绝合并无关的历史</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#首先将远程仓库和本地仓库关联起来</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> branch</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --set-upstream-to=origin/远程分支名</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  你的分支名</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#整合远程仓库和本地仓库 (忽略版本不同造成的影响)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --allow-unrelated-histories</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#重新更新、提交即可</span></span></code></pre></div><h3 id="删除远程关联库名" tabindex="-1">删除远程关联库名 <a class="header-anchor" href="#删除远程关联库名" aria-label="Permalink to &quot;删除远程关联库名&quot;">​</a></h3><ul><li>git remote rm 远程仓库名</li></ul><h3 id="克隆远程仓库" tabindex="-1">克隆远程仓库 <a class="header-anchor" href="#克隆远程仓库" aria-label="Permalink to &quot;克隆远程仓库&quot;">​</a></h3><ul><li>所有分支：git clone 仓库地址</li><li>指定分支：git clone -b 分支名 仓库地址</li></ul><h3 id="更新远程仓库地址" tabindex="-1">更新远程仓库地址 <a class="header-anchor" href="#更新远程仓库地址" aria-label="Permalink to &quot;更新远程仓库地址&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 远程仓库地址变更==&gt;修改本地映射地址</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remote</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-url</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 新仓库地址</span></span></code></pre></div>`,18),n=[l];function h(p,k,r,d,g,o){return a(),s("div",null,n)}const u=i(e,[["render",h]]);export{c as __pageData,u as default};
