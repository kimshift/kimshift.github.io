import{u as h,q as p,E as s,y as i,F as e,aE as k,x as a,p as r}from"./chunks/framework.-H45_L2h.js";const d=k(`<h1 id="api-示例" tabindex="-1">API 示例 <a class="header-anchor" href="#api-示例" aria-label="Permalink to &quot;API 示例&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">摘要</p><p>本页演示了 VitePress 提供的一些运行时 API 的用法。</p><p><code>useData()</code> API 可用于访问当前页面的网站、主题和页面数据。它适用于以下两个文件：<code>.md</code> 和 <code>.vue</code></p></div><nav class="table-of-contents"><ul><li><a href="#results">Results</a><ul><li><a href="#主题信息">主题信息</a></li><li><a href="#页面信息">页面信息</a></li><li><a href="#文档配置">文档配置</a></li></ul></li><li><a href="#更多">更多</a></li></ul></nav><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { useData } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">theme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">page</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">frontmatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### 主题信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ theme }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">### 页面信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ page }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">### 文档配置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ frontmatter }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="results" tabindex="-1">Results <a class="header-anchor" href="#results" aria-label="Permalink to &quot;Results&quot;">​</a></h2><h3 id="主题信息" tabindex="-1">主题信息 <a class="header-anchor" href="#主题信息" aria-label="Permalink to &quot;主题信息&quot;">​</a></h3>`,6),E=s("h3",{id:"页面信息",tabindex:"-1"},[a("页面信息 "),s("a",{class:"header-anchor",href:"#页面信息","aria-label":'Permalink to "页面信息"'},"​")],-1),o=s("h3",{id:"文档配置",tabindex:"-1"},[a("文档配置 "),s("a",{class:"header-anchor",href:"#文档配置","aria-label":'Permalink to "文档配置"'},"​")],-1),c=s("h2",{id:"更多",tabindex:"-1"},[a("更多 "),s("a",{class:"header-anchor",href:"#更多","aria-label":'Permalink to "更多"'},"​")],-1),g=s("p",null,[a("查看文档以获得 "),s("a",{href:"https://vitepress.dev/zh/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"运行时 api 的完整列表"),a(".")],-1),A=JSON.parse('{"title":"API 示例","description":"本页演示了 VitePress 提供的一些运行时 API 的用法","frontmatter":{"description":"本页演示了 VitePress 提供的一些运行时 API 的用法","categories":["文章例子"],"tags":["示例"],"pagefind-indexed":false,"publish":false},"headers":[],"relativePath":"examples/api.md","filePath":"examples/api.md","lastUpdated":1723096133000}'),u={name:"examples/api.md"},F=Object.assign(u,{setup(y){const{site:_,theme:t,page:n,frontmatter:l}=h();return(m,f)=>(r(),p("div",null,[d,s("pre",null,i(e(t)),1),E,s("pre",null,i(e(n)),1),o,s("pre",null,i(e(l)),1),c,g]))}});export{A as __pageData,F as default};