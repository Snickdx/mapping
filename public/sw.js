if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise((async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},i=(i,r)=>{Promise.all(i.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(i)};self.define=(i,s,c)=>{r[i]||(r[i]=Promise.resolve().then((()=>{let r={};const n={uri:location.origin+i.slice(1)};return Promise.all(s.map((i=>{switch(i){case"exports":return r;case"module":return n;default:return e(i)}}))).then((e=>{const i=c(...e);return r.default||(r.default=i),r}))})))}}define("./sw.js",["./workbox-b924d4d6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"app.html",revision:"7b493e6ca645cffe6713dc951e608780"},{url:"app.js",revision:"87154a1bae2c6519057b229279f39605"},{url:"config.js",revision:"e2fcf9a17fcf687771897b85011bec96"},{url:"csmodule.js",revision:"f9b7ced7484233369f2552bf094092ff"},{url:"favicon.ico",revision:"73261b3be33657974c583874bbcffa15"},{url:"img/favicon-32x32.png",revision:"524e38ed8f5a1d0f8c3f396f8addf876"},{url:"img/icon-192x192.png",revision:"e5077341e9c3e6c800a26987fb4e37e2"},{url:"img/icon-256x256.png",revision:"e0dd5bc939d1ce3b8b332fbfea54369e"},{url:"img/icon-512x512.png",revision:"2b4453c8466a7f6db4d9081fe0249e02"},{url:"img/maskable_icon.png",revision:"1a3e409d7d3231e5ed03081d1111e2a6"},{url:"index.html",revision:"7461d7e699cc109486bec4920229663d"},{url:"manifest.json",revision:"2cf62b4ac8a3497a63acece4a8c9e79d"},{url:"register.js",revision:"2fd49e8660ccfd75fa3660cffde2a698"},{url:"users.js",revision:"4ad9cacb203f5bd6fd019ca29175f863"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
