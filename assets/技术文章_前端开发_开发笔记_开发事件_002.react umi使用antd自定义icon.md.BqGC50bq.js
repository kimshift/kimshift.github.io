import{_ as n,q as a,p as s,aE as e}from"./chunks/framework.-H45_L2h.js";const g=JSON.parse('{"title":"在react-umi在使用antd自定义icon/默认icon","description":"","frontmatter":{"title":"在react-umi在使用antd自定义icon/默认icon","date":"2023-06-02T18:59:15.000Z","categories":["前端开发"],"tags":["javascript","事件"],"sidebar":false,"prev":"001.开发事件","next":"003.react主动调用input-file唤醒选择文件"},"headers":[],"relativePath":"技术文章/前端开发/开发笔记/开发事件/002.react umi使用antd自定义icon.md","filePath":"技术文章/前端开发/开发笔记/开发事件/002.react umi使用antd自定义icon.md","lastUpdated":1723096133000}'),t={name:"技术文章/前端开发/开发笔记/开发事件/002.react umi使用antd自定义icon.md"},p=e(`<h1 id="在-react-umi-在使用-antd-自定义-icon-默认-icon" tabindex="-1">在 react-umi 在使用 antd 自定义 icon/默认 icon <a class="header-anchor" href="#在-react-umi-在使用-antd-自定义-icon-默认-icon" aria-label="Permalink to &quot;在 react-umi 在使用 antd 自定义 icon/默认 icon&quot;">​</a></h1><blockquote><p>antd 图标在侧边栏菜单中使用时，第一级没有图标，收缩时会出现文字没有隐藏的情况</p></blockquote><ul><li>引入文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Icon } from &#39;antd&#39;;</span></span>
<span class="line"><span>import { ReactComponent as AuthorizationSvg } from &#39;@/assets/svg/permissionResource.svg&#39;;//svg</span></span>
<span class="line"><span>import logo from &#39;@/assets/images/login-logo.png&#39;;//图片</span></span></code></pre></div><ul><li>使用方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let menuIcon=&#39;&#39;//用于侧边栏菜单的图标</span></span>
<span class="line"><span>if (引入svg图标) {</span></span>
<span class="line"><span>  // 引入svg图标</span></span>
<span class="line"><span>  menuIcon = &lt;Icon component={item.icon} /&gt;;</span></span>
<span class="line"><span>} else if (引入图片) {</span></span>
<span class="line"><span>  // 引入图片</span></span>
<span class="line"><span>  menuIcon = (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;img className={styles.img} src={item.icon} alt=&quot;&quot; /&gt;</span></span>
<span class="line"><span>      {/* 解决菜单导航栏收缩时文字没有隐藏的问题 */}</span></span>
<span class="line"><span>      &lt;Icon type={&#39;null&#39;} /&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  // 使用antd默认图标</span></span>
<span class="line"><span>  menuIcon = &lt;Icon type={item.icon} /&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,6),i=[p];function c(l,o,r,d,m,u){return s(),a("div",null,i)}const h=n(t,[["render",c]]);export{g as __pageData,h as default};
