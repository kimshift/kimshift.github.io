import{R as i}from"./chunks/theme.Bl_AtmYI.js";import{a4 as o,aK as u,aL as l,aM as c,aN as f,aO as d,aP as m,aQ as h,aR as A,aS as g,aT as P,l as R,u as v,L as w,K as y,aU as C,aV as S,aW as T,aA as b}from"./chunks/framework.-H45_L2h.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(i),E=R({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=v();return w(()=>{y(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&C(),S(),T(),s.setup&&s.setup(),()=>b(s.Layout)}});async function L(){globalThis.__VITEPRESS__=!0;const e=O(),a=D();a.provide(l,e);const t=c(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function D(){return A(E)}function O(){let e=o,a;return g(t=>{let n=P(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&L().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{L as createApp};
