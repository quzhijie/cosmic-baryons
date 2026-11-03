(()=>{var kl={cold:"#3ee6cf",warm:"#ff7eb0",hot:"#b9a4ff",stars:"#ffd38a",dm:"#9aa8ff",red:"#ff6b6b",blue:"#6fa8ff",gold:"#ffc85a",teal:"#3ee6cf",pink:"#ff7eb6",purple:"#b9a4ff",em:"#8ad2dd"},Xu=i=>String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function _o(i,e=0,t=!1){let n=[],s="",r=()=>{s&&n.push({text:s}),s=""};for(;e<i.length;){let a=i[e];if(t&&a==="}")return r(),[n,e+1];if(a==="\\"){let o=/^\\([a-zA-Z]+)\{/.exec(i.slice(e));if(o&&kl[o[1]]){let[l,c]=_o(i,e+o[0].length,!0);if(c>0){r(),n.push({macro:o[1],children:l}),e=c;continue}}}s+=a,e++}return r(),t?[n,-1]:[n,e]}var Bl=i=>i.map(e=>e.text!=null?Xu(e.text):`<span class="c-${e.macro}">${Bl(e.children)}</span>`).join(""),zl=i=>i.map(e=>e.text!=null?e.text:zl(e.children)).join(""),Ot=i=>Bl(_o(String(i??""))[0]),bs=i=>zl(_o(String(i??""))[0]);function Vl(){let i=document.createElement("style");i.textContent=Object.entries(kl).map(([e,t])=>`.c-${e}{color:${t}}`).join("")+".c-em{font-weight:500}",document.head.appendChild(i)}var ct={cold:"#2a9fd0",warm:"#e2507f",hot:"#8f6ff2",ink:"#edf2f6",muted:"#a9bac9",dim:"#6f879d",line:"#ffffff26"},Je=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!=null&&(n.innerHTML=t),n},Hl=i=>i>=1e4?`${(i/10**Math.floor(Math.log10(i))).toFixed(1).replace(/\.0$/,"")} \xD7 10<sup>${Math.floor(Math.log10(i))}</sup> K`:`${Math.round(i).toLocaleString("en")} K`;function on(i,e){let t=document.createElement("canvas"),n=Math.min(devicePixelRatio||1,2);t.width=i*n,t.height=e*n,t.style.width=`${i}px`,t.style.height=`${e}px`;let s=t.getContext("2d");return s.scale(n,n),[t,s]}var he=()=>Math.min(innerWidth/100,innerHeight/56.25);function $u(){let i=Je("div","panel p-summary");return{el:i,show(e){let t=Array.isArray(e.methods)&&e.methods.length?`<div class="methods">${e.methods.map(n=>`<div class="m" style="--c: var(--c-${n.band||"all"})"><b>${Ot(n.name)}</b><span>${Ot(n.sees)}</span></div>`).join("")}</div>`:"";i.classList.toggle("has-methods",!!t),i.innerHTML=t+`<ol>${(e.points||[]).map(n=>`<li>${Ot(n)}</li>`).join("")}</ol>`+(e.questions?`<div class="qs"><span>Open questions</span>${e.questions.map((n,s)=>`<p><b>${s+1}</b><span class="q">${Ot(n)}</span></p>`).join("")}</div>`:"")}}}function qu(){let i=Je("div","panel p-break","<span>Break</span><b></b><small>Up next \u2014 Part II: seeing the invisible</small>"),e=i.querySelector("b"),t=600,n=()=>{e.textContent=`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`};return n(),{el:i,show(s={}){let r=s.breakMin;t=(typeof r=="number"&&Number.isFinite(r)&&r>=0?r:10)*60,n()},tick(s){t=Math.max(0,t-s),n()}}}function yo(i,e,{drag:t=!1}={}){let n=Array.isArray(e.panelPos)?e.panelPos:null,s=+e.panelScale||1,r=i.style,a=(f,T)=>r.setProperty(f,T,"important");for(let f of["left","top","right","bottom","translate","transform-origin","scale"])r.removeProperty(f);if(!n&&s===1)return;let o=getComputedStyle(i),l=he(),c=i.offsetWidth*s,u=i.offsetHeight*s,d=n?n[0]*innerWidth:parseFloat(o.left),h=n?n[1]*innerHeight:parseFloat(o.top),p=document.body.classList.contains("editing"),v=p&&document.getElementById("editor"),w=v?v.getBoundingClientRect().left:innerWidth;if((()=>{d=Math.max(l,Math.min(d,w-l-c)),h=Math.max(l,Math.min(h,innerHeight-l-u))})(),!t&&!p)for(let f of[document.querySelector("#dock.on"),document.getElementById("ladder"),document.getElementById("bands")]){let T=f&&f.getBoundingClientRect();if(!T||!T.width||d+c<=T.left||d>=T.right||h+u<=T.top||h>=T.bottom)continue;let R=[[T.left-l-c-d,0],[T.right+l-d,0],[0,T.top-l-u-h],[0,T.bottom+l-h]].filter(([S,E])=>d+S>=l&&d+S+c<=w-l&&h+E>=l&&h+E+u<=innerHeight-l),[b,_]=R.sort((S,E)=>Math.hypot(...S)-Math.hypot(...E))[0]||[0,0];d+=b,h+=_}a("left",`${d}px`),a("top",`${h}px`),a("right","auto"),a("bottom","auto"),a("translate","none"),a("transform-origin","0 0"),a("scale",String(s))}function Gl(i,e){let t={summary:$u(e),break:qu(e)};for(let[a,o]of Object.entries(i||{}))t[a]=o(e);let n=document.getElementById("panels");for(let a in t)t[a].el.dataset.panel=a,n.appendChild(t[a].el);let s=null,r=null;return addEventListener("resize",()=>{s&&yo(t[s].el,r)}),{names:Object.keys(t),set(a,o,l){t[a]||(a=null),s&&s!==a&&(t[s].el.classList.remove("on"),t[s].hide&&t[s].hide()),a&&(t[a].el.classList.add("on"),t[a].show&&t[a].show(o,l),yo(t[a].el,o)),s=a||null,r=o},tick(a){s&&t[s].tick&&t[s].tick(a)}}}function Wl({STEPS:i,idx:e,go:t,onDigit:n}){let s=document.createElement("div");s.id="nav",s.hidden=!0,document.body.appendChild(s);let r=document.createElement("div");r.id="navnum",r.hidden=!0,document.body.appendChild(r);let a=0,o="",l=null,c=null,u=b=>{let _=/^\s*(Part\s+[IVX\d]+)/i.exec(bs(b.kicker||""));return _?_[1]:""},d=b=>bs(b.title||"")||(b.layout==="figure"?"Figure page":"\u2014");function h(){let b=[],_=i.map(u).find(Boolean)||"",S=null,E=null;i.forEach((M,A)=>{let C=u(M)||(S?S.name:_);(!S||C&&C!==S.name)&&(S={name:C||"Opening",stops:[]},b.push(S),E=null),(!E||E.stop!==M.stop)&&(E={stop:M.stop,steps:[]},S.stops.push(E)),E.steps.push(A)});let m=e();s.innerHTML=`<div class="nav-box"><div class="nav-head"><b>Jump to</b><span>click a step \xB7 \u2191\u2193 and Enter \xB7 type a number + Enter \xB7 Esc closes</span></div>
      <div class="nav-cols">${b.map(M=>`<h3>${M.name||"Steps"}</h3>${M.stops.map(A=>`
        <div class="nav-stop${A.steps.includes(m)?" here":""}"><em>${A.stop}</em><div>${A.steps.map(C=>`<button data-i="${C}" class="${C===m?"cur":""}"><small>${C+1}</small>${d(i[C])}</button>`).join("")}</div></div>`).join("")}`).join("")}</div></div>`,a=m,p()}let p=()=>{s.querySelectorAll("button.sel").forEach(_=>_.classList.remove("sel"));let b=s.querySelector(`button[data-i="${a}"]`);b&&(b.classList.add("sel"),b.scrollIntoView({block:"nearest"}))},v=()=>{h(),s.hidden=!1},w=()=>{s.hidden=!0,s.innerHTML=""},g=b=>{w(),b!==e()&&t(b)};s.addEventListener("click",b=>{let _=b.target.closest("button[data-i]");_?g(+_.dataset.i):b.target.closest(".nav-box")||w()});let f=()=>{r.hidden=!o,r.textContent=o?`Go to step ${o}`:"",clearTimeout(l),o&&(l=setTimeout(()=>{o="",f()},2500))};function T(b){if(!s.hidden)return b.key==="Escape"||b.key==="g"||b.key==="G"?w():b.key==="Enter"?g(a):b.key==="ArrowDown"||b.key==="ArrowRight"?(a=Math.min(i.length-1,a+1),p()):b.key==="ArrowUp"||b.key==="ArrowLeft"?(a=Math.max(0,a-1),p()):(b.key==="PageDown"||b.key==="PageUp")&&(a=Math.max(0,Math.min(i.length-1,a+(b.key==="PageDown"?8:-8))),p()),b.preventDefault(),!0;if(b.metaKey||b.ctrlKey||b.altKey)return!1;if(b.key==="g"||b.key==="G")return o="",f(),v(),!0;if(/^\d$/.test(b.key)){if(o=(o+b.key).slice(-3),f(),clearTimeout(c),o.length===1&&n){let _=b.key;c=setTimeout(()=>{o===_&&(n(_),o="",f())},450)}return!0}if(o&&b.key==="Enter"){let _=+o;return o="",f(),clearTimeout(c),_>=1&&_<=i.length&&g(_-1),b.preventDefault(),!0}return o&&(b.key==="Escape"||b.key==="Backspace")?(o=b.key==="Backspace"?o.slice(0,-1):"",f(),clearTimeout(c),!0):!1}let R=document.getElementById("progress");return R&&(R.title="Click to jump",R.addEventListener("click",b=>{let _=R.getBoundingClientRect();g(Math.min(i.length-1,Math.floor((b.clientX-_.left)/_.width*i.length)))}),R.addEventListener("pointermove",b=>{let _=R.getBoundingClientRect(),S=Math.min(i.length-1,Math.floor((b.clientX-_.left)/_.width*i.length));R.title=`${S+1} \xB7 ${d(i[S])}`})),{onKey:T,isOpen:()=>!s.hidden,close:w}}function Xl(i=[]){let e=new URLSearchParams(location.search).has("nopreload")?"nopreload":navigator.connection?.saveData?"saveData":"",t=M=>new URL(M,document.baseURI).href,n=new Map(i.map(M=>[t(M.src),{...M,steps:new Set(M.steps),state:"queued",loaded:0}])),s=[],r=new Set,a=()=>[...s,...n.values()],o=0,l=0,c=0,u=0,d=!1,h=!1,p=!1,v=!1,w=M=>window.requestIdleCallback?requestIdleCallback(M,{timeout:1e3}):setTimeout(M,50),g=M=>[...M].some(A=>A>=o&&A<=o+5);function f(M){M.image?.removeAttribute("src"),M.image=null,M.decoded=!1,M.decodeError=null}function T(){for(let M of n.values())M.kind==="image"&&!g(M.steps)&&f(M);for(let M of r)M();R()}function R(){h||e||!c||v||p||(v=!0,w(async()=>{if(v=!1,h)return;let M=[...n.values()].filter(C=>C.kind==="image"&&C.state==="ready"&&g(C.steps)&&!C.image&&!C.decodeError).sort((C,N)=>b(C)-b(N))[0];if(!M)return;let A=new Image;M.image=A,p=!0,A.decoding="async",A.src=M.url;try{await A.decode(),M.image===A&&(M.decoded=!0)}catch(C){M.image===A&&(M.decodeError=String(C),M.image=null)}finally{p=!1,R()}}))}let b=M=>M.kind==="font"?-1:M.steps.size?Math.min(...[...M.steps].map(A=>Math.abs(A-o))):1/0;function _(){d||h||e||!c||(d=!0,w(()=>{d=!1,S()}))}function S(){if(h)return;let M=a().filter(A=>A.state==="queued").sort((A,C)=>b(A)-b(C));for(;l<2&&M.length;){let A=M.shift();A.state="loading",l++,E(A).then(()=>{A.state="ready",T()},C=>{A.state="failed",A.error=String(C.message||C),h||console.warn(`[deckkit] preload failed: ${A.src}`,C),A.url&&(URL.revokeObjectURL(A.url),A.url=null)}).finally(()=>{l--,a().every(C=>["ready","failed"].includes(C.state))&&(u=performance.now()),_()})}a().every(A=>["ready","failed"].includes(A.state))&&(u||=performance.now())}async function E(M){if(M.kind==="font"){await M.face.load();return}let A=new AbortController;M.controller=A;let C=setTimeout(()=>A.abort(),12e4);try{let N=await fetch(M.src,{signal:A.signal,priority:"low"});if(!N.ok)throw new Error(`HTTP ${N.status}: ${M.src}`);let F;if(N.body){let P=N.body.getReader(),V=[];for(;;){let{done:K,value:G}=await P.read();if(K)break;V.push(G),M.loaded+=G.byteLength}F=new Blob(V,{type:N.headers.get("content-type")||(M.kind==="video"?"video/mp4":"")})}else F=await N.blob(),M.loaded=F.size;if(h)return;M.url=URL.createObjectURL(F)}finally{clearTimeout(C),M.controller=null}}let m=()=>{let M=[...n.values()];return{status:e?"disabled":c?u?a().some(A=>A.state==="failed")?"failed":"complete":"loading":"waiting",reason:e,done:M.filter(A=>A.state==="ready").length,total:M.length,window:[o,o+5],decodeActive:p,decodedCount:M.filter(A=>A.decoded).length,decodedPixelBytes:M.reduce((A,C)=>A+(C.decoded?C.image.naturalWidth*C.image.naturalHeight*4:0),0),fonts:s.map(({src:A,state:C,error:N})=>({src:A,state:C,error:N})),loadedBytes:M.reduce((A,C)=>A+C.loaded,0),totalBytes:M.reduce((A,C)=>A+C.bytes,0),active:l,startedAt:c,finishedAt:u,entries:M.map(({src:A,state:C,loaded:N,error:F,steps:P,image:V,decoded:K,decodeError:G})=>({src:A,state:C,loaded:N,error:F,steps:[...P],retained:!!V,decoded:!!K,decodeError:G}))}};return addEventListener("pagehide",M=>{if(!M.persisted){h=!0;for(let A of n.values())A.controller?.abort(),f(A),A.url&&URL.revokeObjectURL(A.url);r.clear()}}),{start(){if(!(e||c||h)){for(let M of document.fonts||[])s.push({kind:"font",face:M,src:`${M.family} ${M.weight}`,state:M.status==="loaded"?"ready":"queued"});c=performance.now(),_(),T()}},position(M){o=M,T(),_()},inWindow:M=>!e&&!!c&&g(M),subscribe(M){return r.add(M),()=>r.delete(M)},use(M,A){let C=n.get(t(M));if(C)for(let N of A)C.steps.add(N)},mediaURL(M){let A=n.get(t(M));return A?.state==="ready"?A.url:M},snapshot:m,text(){let M=m();return e?`preload off \xB7 ${e}`:`preload ${M.done}/${M.total} \xB7 ${(M.loadedBytes/1e6).toFixed(1)}/${(M.totalBytes/1e6).toFixed(1)} MB${M.status==="failed"?" \xB7 failed (see console)":""}`}}}function $l({media:i,idx:e,videos:t}){let n=null,s=o=>{if(typeof o.getVideoPlaybackQuality!="function"){n={supported:!1};return}let l=o.getVideoPlaybackQuality();l.totalVideoFrames>0&&(n={supported:!0,dropped:l.droppedVideoFrames,total:l.totalVideoFrames})},r=()=>t.find(({video:o,steps:l})=>l.includes(e())&&!o.paused&&!o.ended&&o.readyState>=2);function a(){for(let{video:o,src:l,steps:c}of t)if(c.includes(e())||i.inWindow(c)){let d=i.mediaURL(l);o.preload="auto",o.getAttribute("src")!==d&&(o.paused||!o.getAttribute("src"))&&(o.src=d)}else o.getAttribute("src")&&(s(o),o.pause(),o.removeAttribute("src"),o.preload="none",o.load())}for(let{video:o}of t)for(let l of["pause","ended"])o.addEventListener(l,()=>s(o));return i.subscribe(a),{sync:a,playing:()=>!!r(),quality(){let o=r();return o&&s(o.video),n},text(){let o=this.quality();return o?.supported?`video dropped ${o.dropped} / ${o.total} frames`:"video frames n/a"}}}function ql({scene:i=null,panels:e={}}={}){let t=L=>document.querySelector(L),n=window.DECK;if(!n||!Array.isArray(n.steps)||!n.steps.length){document.body.insertAdjacentHTML("beforeend",'<p style="color:#fff;padding:2em;font:16px sans-serif">deck.js is missing or empty.</p>');return}Vl();let s=n.steps,r=n.figs||={},a=n.dock||={},o=n.caps||={},l=Xl(window.DECK_MEDIA),c=L=>`img/${encodeURIComponent(r[L]&&r[L].file||`${L}.jpg`)}`,u=L=>l.mediaURL(c(L)),d=(L,re)=>{let ae=(o[re]||{})[L]||{},oe=r[L]||{};return{t:ae.t||oe.t||L,c:ae.c||oe.c||"",cr:oe.cr||""}},h=()=>JSON.parse(JSON.stringify({version:1,steps:s,dock:a,figs:r,caps:o})),p=0,v=!1,w=null,g=[],f=0;function T(){let L=g[f];t("#lightbox img").src=l.mediaURL(L.src||u(L.img)),t("#lightbox h3").innerHTML=Ot(L.t),t("#lightbox p").innerHTML=Ot(L.c),t("#lightbox small").textContent=L.cr?`Image: ${L.cr}`:"",t("#lightbox .lb-count").textContent=g.length>1?`${f+1} / ${g.length}  \xB7  \u2190 \u2192`:""}function R(L,re){g=L,f=re,T(),t("#lightbox").hidden=!1}let b=()=>{t("#lightbox").hidden=!0,t("#lightbox img").removeAttribute("src")};t("#lightbox").addEventListener("click",b),t("#card .notes-btn").addEventListener("click",()=>document.body.classList.toggle("notes"));let _=(L,re=s[p].stop)=>({img:L,src:u(L),...r[L],...d(L,re)}),S=L=>R([_(L)],0),E={right:-1e9,top:1e9},m=i?i({STEPS:s,idx:()=>p,openLightbox:R,figSrc:u,preloadInfo:()=>l.text(),videoInfo:()=>w?.text()||"video frames n/a",preloadFig:(L,re)=>l.use(c(L),re),marksHidden:({ignoreDim:L=!1}={})=>{let re=s[p];return v||!L&&!!re.dim||re.layout==="figure"||re.panel==="break"},blocked:(L,re)=>L<E.right+40&&re>E.top-30}):null,M={toggle(){},render(){},pickDock(){},dockRemove(){},selectFig(){}};function A(L){let re=(a[L]||[]).filter(Ie=>r[Ie]),ae=t("#dock"),oe=!1;ae.classList.toggle("on",re.length>0||oe),ae.innerHTML=(re.length||oe?"<span>Figures</span>":"")+re.map((Ie,We)=>`<button data-i="${We}" title="${bs(d(Ie,L).t).replace(/"/g,"&quot;")}"><img src="${u(Ie)}" alt="" loading="lazy">${oe?`<i data-rm="${We}" title="Remove from this stop">\xD7</i>`:""}</button>`).join("")+(oe?'<button class="dock-add" title="Add a figure">+</button>':""),ae.onclick=Ie=>{let We=Ie.target.closest("button");if(We){if(oe){if(We.classList.contains("dock-add"))return M.pickDock();let Ae=Ie.target.closest("[data-rm]");return Ae?M.dockRemove(+Ae.dataset.rm):M.selectFig(re[+We.dataset.i])}R(re.map(Ae=>_(Ae,L)),+We.dataset.i)}}}let C=Gl(e,{openFig:S,mediaURL:l.mediaURL,...m?m.panelApi:{}}),N=[];for(let L of document.querySelectorAll("#panels .panel")){let re=s.flatMap((ae,oe)=>ae.panel===L.dataset.panel?[oe]:[]);for(let ae of L.querySelectorAll("[data-fig], [data-media-src]")){let oe=ae.dataset.mediaSubMin===void 0?re:re.filter(Ie=>(s[Ie].sub||0)>=+ae.dataset.mediaSubMin);l.use(ae.dataset.fig?c(ae.dataset.fig):ae.dataset.mediaSrc,oe),ae.tagName==="VIDEO"&&ae.dataset.mediaSrc&&N.push({video:ae,src:ae.dataset.mediaSrc,steps:oe})}}w=$l({media:l,idx:()=>p,videos:N});function F(L,re={}){p=Math.max(0,Math.min(s.length-1,L)),l.position(p);let ae=s[p];m&&m.applyStep(ae,re),C.set(ae.panel,ae,ae.sub||0),A(ae.stop);let oe=t("#figpage"),Ie=ae.layout==="figure";if(clearTimeout(oe._release),Ie||(oe._release=setTimeout(()=>{oe.classList.contains("on")||oe.querySelector(".figs").replaceChildren()},600)),oe.classList.toggle("on",Ie),Ie){oe.dataset.arrange=ae.arrange||"stack";let He=(ae.figs||[]).filter(ft=>r[ft]);oe.querySelector(".kicker").innerHTML=ae.kicker?`${Ot(ae.kicker)} \xB7 ${ae.stop}`:"",oe.querySelector("h1").innerHTML=Ot(ae.title||""),oe.querySelector(".figs").className=`figs n${Math.min(He.length,2)}`,oe.classList.toggle("side",(ae.arrange||"stack")!=="stack"),oe.querySelector(".figs").innerHTML=He.length?He.map((ft,Pt)=>`<button data-k="${Pt}"><img src="${u(ft)}" alt=""></button>`).join(""):'<div class="empty">No figure yet \u2014 press E and add one.</div>',oe.querySelector(".figs").onclick=ft=>{let Pt=ft.target.closest("button");Pt&&R(He.map(xt=>_(xt,ae.stop)),+Pt.dataset.k)};let Ge=ae.caption||He.map(ft=>d(ft,ae.stop).c).join(" "),Ke=[...new Set(He.map(ft=>r[ft].cr).filter(Boolean))].join(" \xB7 ");oe.querySelector(".cap").innerHTML=`${Ot(Ge)}${Ke?`<small>${Ot(Ke)}</small>`:""}`}document.body.classList.toggle("dim",!!ae.dim||Ie);let We=t("#card"),Ae=t("#titlecard"),Pe=ae.layout==="title";if(v=Pe,We.classList.remove("on"),Ae.classList.toggle("on",Pe),clearTimeout(We._t),Pe){Ae.querySelector("h1").innerHTML=Ot(ae.title),Ae.querySelector("p").innerHTML=Ot(ae.text);let He=(Array.isArray(ae.meta)?ae.meta:String(ae.meta||"").split(`
`)).map(Ke=>String(Ke).trim()).filter(Boolean),Ge=Ae.querySelector("small");Ge.classList.toggle("lines",He.length>1),Ge.innerHTML=He.map(Ke=>`<span>${Ot(Ke)}</span>`).join("")}else!ae.noCard&&!Ie&&(We._t=setTimeout(()=>{We.querySelector(".kicker").innerHTML=`${Ot(ae.kicker)} \xB7 ${ae.stop}`,We.querySelector("h1").innerHTML=Ot(ae.title),We.querySelector("p").innerHTML=Ot(ae.text),We.querySelector(".notes").innerHTML=ae.notes?ae.notes.split(`

`).map(He=>`<p>${Ot(He)}</p>`).join(""):"",We.classList.toggle("has-notes",!!ae.notes),We.classList.add("on")},re.instant?0:380));t("#progress i").style.width=`${(p+1)/s.length*100}%`,history.replaceState(null,"",`#${p+1}`),re.keepCam||M.render()}let P=Wl({STEPS:s,idx:()=>p,go:L=>F(L,{jump:!0}),onDigit:L=>m&&m.onKey({key:L})});addEventListener("keydown",L=>{if(!t("#lightbox").hidden){["Escape"," ","Enter"].includes(L.key)?b():L.key==="ArrowRight"&&f<g.length-1?(f++,T()):L.key==="ArrowLeft"&&f>0&&(f--,T());return}if(!(L.target.closest&&L.target.closest("input, textarea, select, #editor")&&(!["PageDown","PageUp"].includes(L.key)||L.target.closest("#editor")))&&!P.onKey(L)){if(L.key==="e"||L.key==="E"){M.toggle();return}["ArrowRight","ArrowDown","PageDown"," "].includes(L.key)?(L.preventDefault(),F(p+1)):["ArrowLeft","ArrowUp","PageUp"].includes(L.key)?(L.preventDefault(),F(p-1)):m&&m.onKey(L)||(L.key==="h"||L.key==="H"?document.body.classList.toggle("bare"):L.key==="n"||L.key==="N"?document.body.classList.toggle("notes"):L.key==="b"||L.key==="B"?t("#black").classList.toggle("on"):(L.key==="f"||L.key==="F")&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()))}});let V=document.createElement("div");V.id="touchnav",V.innerHTML='<button data-t="prev" aria-label="Previous step">\u2039</button><button data-t="list" aria-label="All steps">\u2630</button><button data-t="next" aria-label="Next step">\u203A</button>',document.body.appendChild(V);let K=()=>document.body.classList.add("touch");matchMedia("(pointer: coarse)").matches&&K(),V.addEventListener("click",L=>{let re=L.target.closest("button");re&&(re.dataset.t==="prev"?F(p-1):re.dataset.t==="next"?F(p+1):P.onKey({key:"g",preventDefault(){}}))});let G=new Map,Q=null;addEventListener("pointerdown",L=>{if(L.pointerType!=="touch")return;K(),G.set(L.pointerId,!0);let re=L.target.closest&&L.target.closest("input, textarea, select, #editor, #nav, #touchnav, .panel input, [role=slider]");Q=G.size===1&&!re?{id:L.pointerId,x:L.clientX,y:L.clientY,t:performance.now()}:null},!0);let q=L=>{if(L.pointerType!=="touch")return;if(G.delete(L.pointerId),!Q||Q.id!==L.pointerId||L.type==="pointercancel"){G.size||(Q=null);return}let re=L.clientX-Q.x,ae=L.clientY-Q.y,oe=performance.now()-Q.t;if(Q=null,!(Math.abs(re)<60||Math.abs(re)<1.8*Math.abs(ae)||oe>1200)){if(!t("#lightbox").hidden){re<0&&f<g.length-1?(f++,T()):re>0&&f>0&&(f--,T());return}P.isOpen()||F(p+(re<0?1:-1))}};addEventListener("pointerup",q,!0),addEventListener("pointercancel",q,!0);let k=t("#fps"),U=performance.now(),le=0,ee=0,we=!0;function Ee(L){let re=Math.max(0,Math.min((L-U)/1e3,.05));U=L;let ae=t("#card");E=ae.classList.contains("on")?ae.getBoundingClientRect():{right:-1e9,top:1e9},C.tick(re),m&&m.frame(re,{lightboxOpen:!t("#lightbox").hidden,videoPlaying:w.playing()}),we&&(we=!1,requestAnimationFrame(()=>l.start())),le++,ee+=re,k&&ee>.5&&(k.textContent=`${Math.round(le/ee)} fps${m&&m.quality?` \xB7 ${m.quality()}`:""}`,le=0,ee=0),requestAnimationFrame(Ee)}let Be=parseInt(location.hash.slice(1),10);F(Number.isFinite(Be)?Be-1:0,{instant:!0}),new URLSearchParams(location.search).has("debug")&&document.body.classList.add("debug"),window.__dbg={...m?m.debug:{},applyStep:F,STEPS:s,preload:l.snapshot,videoQuality:()=>w.quality()},requestAnimationFrame(Ee);let j=t(".clock");if(j){let L=()=>{j.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1})};L(),setInterval(L,1e4)}}var gc=0,Yo=1,vc=2;var Ys=1,xc=2,rs=3,di=0,Xt=1,kn=2,yn=0,as=1,fi=2,Zo=3,Jo=4,_c=5;var Ai=100,yc=101,bc=102,Mc=103,Sc=104,wc=200,Tc=201,Ec=202,Ac=203,Ko=204,jo=205,Cc=206,Rc=207,Ic=208,Pc=209,Lc=210,Dc=211,Nc=212,Uc=213,Fc=214,kr=0,Br=1,zr=2,ji=3,Vr=4,Hr=5,Gr=6,Wr=7,Qo=0,Oc=1,kc=2,Rn=0,Zs=1,Js=2,Ks=3,Ci=4,js=5,Qs=6,er=7;var el=300,pi=301,Ri=302,pa=303,ma=304,tr=306,Xr=1e3,Dn=1001,$r=1002,Gt=1003,Bc=1004;var nr=1005;var Wt=1006,ga=1007;var mi=1008;var vn=1009,tl=1010,nl=1011,os=1012,va=1013,In=1014,Pn=1015,$t=1016,xa=1017,_a=1018,ls=1020,il=35902,sl=35899,rl=1021,al=1022,bn=1023,Nn=1026,gi=1027,ol=1028,ya=1029,vi=1030,ba=1031;var Ma=1033,ir=33776,sr=33777,rr=33778,ar=33779,Sa=35840,wa=35841,Ta=35842,Ea=35843,Aa=36196,Ca=37492,Ra=37496,Ia=37488,Pa=37489,or=37490,La=37491,Da=37808,Na=37809,Ua=37810,Fa=37811,Oa=37812,ka=37813,Ba=37814,za=37815,Va=37816,Ha=37817,Ga=37818,Wa=37819,Xa=37820,$a=37821,qa=36492,Ya=36494,Za=36495,Ja=36283,Ka=36284,lr=36285,ja=36286;var Cs=2300,qr=2301,Fr=2302,Vo=2303,Ho=2400,Go=2401,Wo=2402;var zc=3200;var ll=0,Vc=1,Zn="",fn="srgb",Rs="srgb-linear",Is="linear",mt="srgb";var Or=7680;var Hc=519,Gc=512,Wc=513,Xc=514,Qa=515,$c=516,qc=517,eo=518,Yc=519,Zc=35044;var cl="300 es",Cn=2e3,Ps=2001;function Yu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Zu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ls(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Jc(){let i=Ls("canvas");return i.style.display="block",i}var Yl={},Qi=null;function ul(...i){let e="THREE."+i.shift();Qi?Qi("log",e,...i):console.log(e,...i)}function Kc(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $e(...i){i=Kc(i);let e="THREE."+i.shift();if(Qi)Qi("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=Kc(i);let e="THREE."+i.shift();if(Qi)Qi("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function wi(...i){let e=i.join(" ");e in Yl||(Yl[e]=!0,$e(...i))}function jc(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Qc={[kr]:Br,[zr]:Gr,[Vr]:Wr,[ji]:Hr,[Br]:kr,[Gr]:zr,[Wr]:Vr,[Hr]:ji},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zl=1234567,Es=Math.PI/180,es=180/Math.PI;function cs(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function hl(i,e){return(i%e+e)%e}function Ju(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Ku(i,e,t){return i!==e?(t-i)/(e-i):0}function As(i,e,t){return(1-t)*i+t*e}function ju(i,e,t,n){return As(i,e,1-Math.exp(-t*n))}function Qu(i,e=1){return e-Math.abs(hl(i,e*2)-e)}function eh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function th(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function nh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ih(i,e){return i+Math.random()*(e-i)}function sh(i){return i*(.5-Math.random())}function rh(i){i!==void 0&&(Zl=i);let e=Zl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ah(i){return i*Es}function oh(i){return i*es}function lh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function ch(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function uh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hh(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),h=a((e-n)/2),p=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*v,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*v,o*c);break;case"ZYZ":i.set(l*v,l*p,o*u,o*c);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ji(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var to={DEG2RAD:Es,RAD2DEG:es,generateUUID:cs,clamp:dt,euclideanModulo:hl,mapLinear:Ju,inverseLerp:Ku,lerp:As,damp:ju,pingpong:Qu,smoothstep:eh,smootherstep:th,randInt:nh,randFloat:ih,randFloatSpread:sh,seededRandom:rh,degToRad:ah,radToDeg:oh,isPowerOfTwo:lh,ceilPowerOfTwo:ch,floorPowerOfTwo:uh,setQuaternionFromProperEuler:hh,normalize:tn,denormalize:Ji},Ye=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Fn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],p=r[a+1],v=r[a+2],w=r[a+3];if(d!==w||l!==h||c!==p||u!==v){let g=l*h+c*p+u*v+d*w;g<0&&(h=-h,p=-p,v=-v,w=-w,g=-g);let f=1-o;if(g<.9995){let T=Math.acos(g),R=Math.sin(T);f=Math.sin(f*T)/R,o=Math.sin(o*T)/R,l=l*f+h*o,c=c*f+p*o,u=u*f+v*o,d=d*f+w*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+v*o,d=d*f+w*o;let T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+u*d+l*p-c*h,e[t+1]=l*v+u*h+c*d-o*p,e[t+2]=c*v+u*p+o*h-l*d,e[t+3]=u*v-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*p*v,this._y=c*p*d-h*u*v,this._z=c*u*v+h*p*d,this._w=c*u*d-h*p*v;break;case"YXZ":this._x=h*u*d+c*p*v,this._y=c*p*d-h*u*v,this._z=c*u*v-h*p*d,this._w=c*u*d+h*p*v;break;case"ZXY":this._x=h*u*d-c*p*v,this._y=c*p*d+h*u*v,this._z=c*u*v+h*p*d,this._w=c*u*d-h*p*v;break;case"ZYX":this._x=h*u*d-c*p*v,this._y=c*p*d+h*u*v,this._z=c*u*v-h*p*d,this._w=c*u*d+h*p*v;break;case"YZX":this._x=h*u*d+c*p*v,this._y=c*p*d+h*u*v,this._z=c*u*v-h*p*d,this._w=c*u*d-h*p*v;break;case"XZY":this._x=h*u*d-c*p*v,this._y=c*p*d-h*u*v,this._z=c*u*v+h*p*d,this._w=c*u*d+h*p*v;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bo.copy(this).projectOnVector(e),this.sub(bo)}reflect(e){return this.sub(bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bo=new H,Jl=new Fn,je=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],v=n[8],w=s[0],g=s[3],f=s[6],T=s[1],R=s[4],b=s[7],_=s[2],S=s[5],E=s[8];return r[0]=a*w+o*T+l*_,r[3]=a*g+o*R+l*S,r[6]=a*f+o*b+l*E,r[1]=c*w+u*T+d*_,r[4]=c*g+u*R+d*S,r[7]=c*f+u*b+d*E,r[2]=h*w+p*T+v*_,r[5]=h*g+p*R+v*S,r[8]=h*f+p*b+v*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,p=c*r-a*l,v=t*d+n*h+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let w=1/v;return e[0]=d*w,e[1]=(s*c-u*n)*w,e[2]=(o*n-s*a)*w,e[3]=h*w,e[4]=(u*t-s*l)*w,e[5]=(s*r-o*t)*w,e[6]=p*w,e[7]=(n*l-c*t)*w,e[8]=(a*t-n*r)*w,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mo.makeScale(e,t)),this}rotate(e){return wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mo.makeRotation(-e)),this}translate(e,t){return wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Mo=new je,Kl=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dh(){let i={enabled:!0,workingColorSpace:Rs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(s.r=Ki(s.r),s.g=Ki(s.g),s.b=Ki(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zn?Is:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Rs]:{primaries:e,whitePoint:n,transfer:Is,toXYZ:Kl,fromXYZ:jl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:Kl,fromXYZ:jl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),i}var ot=dh();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Oi,Yr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Oi===void 0&&(Oi=Ls("canvas")),Oi.width=e.width,Oi.height=e.height;let s=Oi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Oi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ls("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},fh=0,ts=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=cs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(So(s[a].image)):r.push(So(s[a]))}else r=So(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function So(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}var ph=0,wo=new H,cn=class i extends Un{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Dn,s=Dn,r=Wt,a=mi,o=bn,l=vn,c=i.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=cs(),this.name="",this.source=new ts(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wo).x}get height(){return this.source.getSize(wo).y}get depth(){return this.source.getSize(wo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==el)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xr:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case $r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xr:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case $r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=el;cn.DEFAULT_ANISOTROPY=1;var Lt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],v=l[9],w=l[2],g=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-w)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+w)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let R=(c+1)/2,b=(p+1)/2,_=(f+1)/2,S=(u+h)/4,E=(d+w)/4,m=(v+g)/4;return R>b&&R>_?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=S/n,r=E/n):b>_?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=S/s,r=m/s):_<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(_),n=E/r,s=m/r),this.set(n,s,r,t),this}let T=Math.sqrt((g-v)*(g-v)+(d-w)*(d-w)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(g-v)/T,this.y=(d-w)/T,this.z=(h-u)/T,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zr=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new cn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ts(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ft=class extends Zr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ds=class extends cn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Jr=class extends cn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Rt=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,u,d,h,p,v,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,h,p,v,w,g)}set(e,t,n,s,r,a,o,l,c,u,d,h,p,v,w,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=v,f[11]=w,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ki.setFromMatrixColumn(e,0).length(),r=1/ki.setFromMatrixColumn(e,1).length(),a=1/ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,p=a*d,v=o*u,w=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+v*c,t[5]=h-w*c,t[9]=-o*l,t[2]=w-h*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,p=l*d,v=c*u,w=c*d;t[0]=h+w*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=w+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,p=l*d,v=c*u,w=c*d;t[0]=h-w*o,t[4]=-a*d,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=w-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,p=a*d,v=o*u,w=o*d;t[0]=l*u,t[4]=v*c-p,t[8]=h*c+w,t[1]=l*d,t[5]=w*c+h,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,p=a*c,v=o*l,w=o*c;t[0]=l*u,t[4]=w-h*d,t[8]=v*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+v,t[10]=h-w*d}else if(e.order==="XZY"){let h=a*l,p=a*c,v=o*l,w=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+w,t[5]=a*u,t[9]=p*d-v,t[2]=v*d-p,t[6]=o*u,t[10]=w*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mh,e,gh)}lookAt(e,t,n){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),ei.crossVectors(n,hn),ei.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),ei.crossVectors(n,hn)),ei.normalize(),mr.crossVectors(hn,ei),s[0]=ei.x,s[4]=mr.x,s[8]=hn.x,s[1]=ei.y,s[5]=mr.y,s[9]=hn.y,s[2]=ei.z,s[6]=mr.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],v=n[2],w=n[6],g=n[10],f=n[14],T=n[3],R=n[7],b=n[11],_=n[15],S=s[0],E=s[4],m=s[8],M=s[12],A=s[1],C=s[5],N=s[9],F=s[13],P=s[2],V=s[6],K=s[10],G=s[14],Q=s[3],q=s[7],k=s[11],U=s[15];return r[0]=a*S+o*A+l*P+c*Q,r[4]=a*E+o*C+l*V+c*q,r[8]=a*m+o*N+l*K+c*k,r[12]=a*M+o*F+l*G+c*U,r[1]=u*S+d*A+h*P+p*Q,r[5]=u*E+d*C+h*V+p*q,r[9]=u*m+d*N+h*K+p*k,r[13]=u*M+d*F+h*G+p*U,r[2]=v*S+w*A+g*P+f*Q,r[6]=v*E+w*C+g*V+f*q,r[10]=v*m+w*N+g*K+f*k,r[14]=v*M+w*F+g*G+f*U,r[3]=T*S+R*A+b*P+_*Q,r[7]=T*E+R*C+b*V+_*q,r[11]=T*m+R*N+b*K+_*k,r[15]=T*M+R*F+b*G+_*U,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],v=e[3],w=e[7],g=e[11],f=e[15],T=l*p-c*h,R=o*p-c*d,b=o*h-l*d,_=a*p-c*u,S=a*h-l*u,E=a*d-o*u;return t*(w*T-g*R+f*b)-n*(v*T-g*_+f*S)+s*(v*R-w*_+f*E)-r*(v*b-w*S+g*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],v=e[12],w=e[13],g=e[14],f=e[15],T=t*o-n*a,R=t*l-s*a,b=t*c-r*a,_=n*l-s*o,S=n*c-r*o,E=s*c-r*l,m=u*w-d*v,M=u*g-h*v,A=u*f-p*v,C=d*g-h*w,N=d*f-p*w,F=h*f-p*g,P=T*F-R*N+b*C+_*A-S*M+E*m;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/P;return e[0]=(o*F-l*N+c*C)*V,e[1]=(s*N-n*F-r*C)*V,e[2]=(w*E-g*S+f*_)*V,e[3]=(h*S-d*E-p*_)*V,e[4]=(l*A-a*F-c*M)*V,e[5]=(t*F-s*A+r*M)*V,e[6]=(g*b-v*E-f*R)*V,e[7]=(u*E-h*b+p*R)*V,e[8]=(a*N-o*A+c*m)*V,e[9]=(n*A-t*N-r*m)*V,e[10]=(v*S-w*b+f*T)*V,e[11]=(d*b-u*S-p*T)*V,e[12]=(o*M-a*C-l*m)*V,e[13]=(t*C-n*M+s*m)*V,e[14]=(w*R-v*_-g*T)*V,e[15]=(u*_-d*R+h*T)*V,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,p=r*u,v=r*d,w=a*u,g=a*d,f=o*d,T=l*c,R=l*u,b=l*d,_=n.x,S=n.y,E=n.z;return s[0]=(1-(w+f))*_,s[1]=(p+b)*_,s[2]=(v-R)*_,s[3]=0,s[4]=(p-b)*S,s[5]=(1-(h+f))*S,s[6]=(g+T)*S,s[7]=0,s[8]=(v+R)*E,s[9]=(g-T)*E,s[10]=(1-(h+w))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ki.set(s[0],s[1],s[2]).length(),o=ki.set(s[4],s[5],s[6]).length(),l=ki.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wn.copy(this);let c=1/a,u=1/o,d=1/l;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=u,wn.elements[5]*=u,wn.elements[6]*=u,wn.elements[8]*=d,wn.elements[9]*=d,wn.elements[10]*=d,t.setFromRotationMatrix(wn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Cn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s),v,w;if(l)v=r/(a-r),w=a*r/(a-r);else if(o===Cn)v=-(a+r)/(a-r),w=-2*a*r/(a-r);else if(o===Ps)v=-a/(a-r),w=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=w,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Cn,l=!1){let c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s),v,w;if(l)v=1/(a-r),w=a/(a-r);else if(o===Cn)v=-2/(a-r),w=-(a+r)/(a-r);else if(o===Ps)v=-1/(a-r),w=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=w,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ki=new H,wn=new Rt,mh=new H(0,0,0),gh=new H(1,1,1),ei=new H,mr=new H,hn=new H,Ql=new Rt,ec=new Fn,On=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-dt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ql.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ql,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ec.setFromEuler(this),this.setFromQuaternion(ec,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};On.DEFAULT_ORDER="XYZ";var Ns=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},vh=0,tc=new H,Bi=new Fn,Hn=new Rt,gr=new H,Ms=new H,xh=new H,_h=new Fn,nc=new H(1,0,0),ic=new H(0,1,0),sc=new H(0,0,1),rc={type:"added"},yh={type:"removed"},zi={type:"childadded",child:null},To={type:"childremoved",child:null},mn=class i extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new H,t=new On,n=new Fn,s=new H(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new je}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(nc,e)}rotateY(e){return this.rotateOnAxis(ic,e)}rotateZ(e){return this.rotateOnAxis(sc,e)}translateOnAxis(e,t){return tc.copy(e).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nc,e)}translateY(e){return this.translateOnAxis(ic,e)}translateZ(e){return this.translateOnAxis(sc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gr.copy(e):gr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Ms,gr,this.up):Hn.lookAt(gr,Ms,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rc),zi.child=e,this.dispatchEvent(zi),zi.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yh),To.child=e,this.dispatchEvent(To),To.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rc),zi.child=e,this.dispatchEvent(zi),zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,xh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,_h,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};mn.DEFAULT_UP=new H(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=class extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}},bh={type:"move"},ns=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let w of e.hand.values()){let g=t.getJointPose(w,n),f=this._getHandJoint(c,w);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},vr={h:0,s:0,l:0};function Eo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=hl(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Eo(a,r,e+1/3),this.g=Eo(a,r,e),this.b=Eo(a,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=fn){function n(r){r!==void 0&&parseFloat(r)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){let n=eu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return ot.workingToColorSpace(Jt.copy(this),e),Math.round(dt(Jt.r*255,0,255))*65536+Math.round(dt(Jt.g*255,0,255))*256+Math.round(dt(Jt.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Jt.copy(this),t);let n=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=fn){ot.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,n=Jt.g,s=Jt.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(vr);let n=As(ti.h,vr.h,t),s=As(ti.s,vr.s,t),r=As(ti.l,vr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new Qe;Qe.NAMES=eu;var Us=class extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Tn=new H,Gn=new H,Ao=new H,Wn=new H,Vi=new H,Hi=new H,ac=new H,Co=new H,Ro=new H,Io=new H,Po=new Lt,Lo=new Lt,Do=new Lt,ri=class i{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Tn.subVectors(e,t),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Tn.subVectors(s,t),Gn.subVectors(n,t),Ao.subVectors(e,t);let a=Tn.dot(Tn),o=Tn.dot(Gn),l=Tn.dot(Ao),c=Gn.dot(Gn),u=Gn.dot(Ao),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,p=(c*l-o*u)*h,v=(a*u-o*l)*h;return r.set(1-p-v,v,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Po.setScalar(0),Lo.setScalar(0),Do.setScalar(0),Po.fromBufferAttribute(e,t),Lo.fromBufferAttribute(e,n),Do.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Po,r.x),a.addScaledVector(Lo,r.y),a.addScaledVector(Do,r.z),a}static isFrontFacing(e,t,n,s){return Tn.subVectors(n,t),Gn.subVectors(e,t),Tn.cross(Gn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),Tn.cross(Gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Vi.subVectors(s,n),Hi.subVectors(r,n),Co.subVectors(e,n);let l=Vi.dot(Co),c=Hi.dot(Co);if(l<=0&&c<=0)return t.copy(n);Ro.subVectors(e,s);let u=Vi.dot(Ro),d=Hi.dot(Ro);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Vi,a);Io.subVectors(e,r);let p=Vi.dot(Io),v=Hi.dot(Io);if(v>=0&&p<=v)return t.copy(r);let w=p*c-l*v;if(w<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Hi,o);let g=u*v-p*d;if(g<=0&&d-u>=0&&p-v>=0)return ac.subVectors(r,s),o=(d-u)/(d-u+(p-v)),t.copy(s).addScaledVector(ac,o);let f=1/(g+w+h);return a=w*f,o=h*f,t.copy(n).addScaledVector(Vi,a).addScaledVector(Hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ai=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(r,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xr.copy(n.boundingBox)),xr.applyMatrix4(e.matrixWorld),this.union(xr)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ss),_r.subVectors(this.max,Ss),Gi.subVectors(e.a,Ss),Wi.subVectors(e.b,Ss),Xi.subVectors(e.c,Ss),ni.subVectors(Wi,Gi),ii.subVectors(Xi,Wi),yi.subVectors(Gi,Xi);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-yi.z,yi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,yi.z,0,-yi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-yi.y,yi.x,0];return!No(t,Gi,Wi,Xi,_r)||(t=[1,0,0,0,1,0,0,0,1],!No(t,Gi,Wi,Xi,_r))?!1:(yr.crossVectors(ni,ii),t=[yr.x,yr.y,yr.z],No(t,Gi,Wi,Xi,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Xn=[new H,new H,new H,new H,new H,new H,new H,new H],En=new H,xr=new ai,Gi=new H,Wi=new H,Xi=new H,ni=new H,ii=new H,yi=new H,Ss=new H,_r=new H,yr=new H,bi=new H;function No(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){bi.fromArray(i,r);let o=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=e.dot(bi),c=t.dot(bi),u=n.dot(bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Nt=new H,br=new Ye,Mh=0,ln=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),s=tn(s,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Fs=class extends ln{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Os=class extends ln{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ut=class extends ln{constructor(e,t,n){super(new Float32Array(e),t,n)}},Sh=new ai,ws=new H,Uo=new H,Yn=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Sh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ws.subVectors(e,this.center);let t=ws.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ws,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ws.copy(e.center).add(Uo)),this.expandByPoint(ws.copy(e.center).sub(Uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wh=0,_n=new Rt,Fo=new mn,$i=new H,dn=new ai,Ts=new ai,Ht=new H,jt=class i extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yu(e)?Os:Fs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Fo.lookAt(e),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ut(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(dn.min,Ts.min),dn.expandByPoint(Ht),Ht.addVectors(dn.max,Ts.max),dn.expandByPoint(Ht)):(dn.expandByPoint(Ts.min),dn.expandByPoint(Ts.max))}dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ht.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ht));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ht.fromBufferAttribute(o,c),l&&($i.fromBufferAttribute(e,c),Ht.add($i)),s=Math.max(s,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ln(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let m=0;m<n.count;m++)o[m]=new H,l[m]=new H;let c=new H,u=new H,d=new H,h=new Ye,p=new Ye,v=new Ye,w=new H,g=new H;function f(m,M,A){c.fromBufferAttribute(n,m),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,A),h.fromBufferAttribute(r,m),p.fromBufferAttribute(r,M),v.fromBufferAttribute(r,A),u.sub(c),d.sub(c),p.sub(h),v.sub(h);let C=1/(p.x*v.y-v.x*p.y);isFinite(C)&&(w.copy(u).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(C),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(C),o[m].add(w),o[M].add(w),o[A].add(w),l[m].add(g),l[M].add(g),l[A].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let m=0,M=T.length;m<M;++m){let A=T[m],C=A.start,N=A.count;for(let F=C,P=C+N;F<P;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let R=new H,b=new H,_=new H,S=new H;function E(m){_.fromBufferAttribute(s,m),S.copy(_);let M=o[m];R.copy(M),R.sub(_.multiplyScalar(_.dot(M))).normalize(),b.crossVectors(S,M);let C=b.dot(l[m])<0?-1:1;a.setXYZW(m,R.x,R.y,R.z,C)}for(let m=0,M=T.length;m<M;++m){let A=T[m],C=A.start,N=A.count;for(let F=C,P=C+N;F<P;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new ln(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new H,r=new H,a=new H,o=new H,l=new H,c=new H,u=new H,d=new H;if(e)for(let h=0,p=e.count;h<p;h+=3){let v=e.getX(h+0),w=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,w),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,w),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(w,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),p=0,v=0;for(let w=0,g=l.length;w<g;w++){o.isInterleavedBufferAttribute?p=l[w]*o.data.stride+o.offset:p=l[w]*u;for(let f=0;f<u;f++)h[v++]=c[p++]}return new ln(h,u,d)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Oo=new H,Th=new H,Eh=new je,An=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Oo.subVectors(n,t).cross(Th.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Oo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Eh.getNormalMatrix(e),s=this.coplanarPoint(Oo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ah=0,oi=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=cs(),this.name="",this.type="Material",this.blending=as,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ko,this.blendDst=jo,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Or,this.stencilZFail=Or,this.stencilZPass=Or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new An().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ye().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var $n=new H,ko=new H,Mr=new H,Sr=new H,ks=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ko.copy(e).add(t).multiplyScalar(.5),Mr.copy(t).sub(e).normalize(),Sr.copy(this.origin).sub(ko);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Mr),o=Sr.dot(this.direction),l=-Sr.dot(Mr),c=Sr.lengthSq(),u=Math.abs(1-a*a),d,h,p,v;if(u>0)if(d=a*l-o,h=a*o-l,v=r*u,d>=0)if(h>=-v)if(h<=v){let w=1/u;d*=w,h*=w,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ko).addScaledVector(Mr,h),p}intersectSphere(e,t){if(e.radius<0)return null;$n.subVectors(e.center,this.origin);let n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,v=t.x-a.x,w=t.y-a.y,g=t.z-a.z,f=n.x-a.x,T=n.y-a.y,R=n.z-a.z,b=Math.abs(l),_=Math.abs(c),S=Math.abs(u),E,m,M,A,C,N,F,P,V,K,G,Q;if(b>=_&&b>=S?(M=l,N=d,V=v,Q=f,l>=0?(E=c,m=u,A=h,C=p,F=w,P=g,K=T,G=R):(E=u,m=c,A=p,C=h,F=g,P=w,K=R,G=T)):_>=S?(M=c,N=h,V=w,Q=T,c>=0?(E=u,m=l,A=p,C=d,F=g,P=v,K=R,G=f):(E=l,m=u,A=d,C=p,F=v,P=g,K=f,G=R)):(M=u,N=p,V=g,Q=R,u>=0?(E=l,m=c,A=d,C=h,F=v,P=w,K=f,G=T):(E=c,m=l,A=h,C=d,F=w,P=v,K=T,G=f)),M===0)return null;let q=E/M,k=m/M,U=1/M,le=A-q*N,ee=C-k*N,we=F-q*V,Ee=P-k*V,Be=K-q*Q,j=G-k*Q,L=Be*Ee-j*we,re=le*j-ee*Be,ae=we*ee-Ee*le;if(s){if(L<0||re<0||ae<0)return null}else if((L<0||re<0||ae<0)&&(L>0||re>0||ae>0))return null;let oe=L+re+ae;if(oe===0)return null;let Ie=U*(L*N+re*V+ae*Q);return(oe>0?Ie<0:Ie>0)?null:this.at(Ie/oe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ti=class extends oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},oc=new Rt,Mi=new ks,wr=new Yn,lc=new H,Tr=new H,Er=new H,Ar=new H,Bo=new H,Cr=new H,cc=new H,Rr=new H,Qt=class extends mn{constructor(e=new jt,t=new Ti){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(Bo.fromBufferAttribute(d,e),a?Cr.addScaledVector(Bo,u):Cr.addScaledVector(Bo.sub(t),u))}t.add(Cr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(r),Mi.copy(e.ray).recast(e.near),!(wr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(wr,lc)===null||Mi.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(oc.copy(r).invert(),Mi.copy(e.ray).applyMatrix4(oc),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,w=h.length;v<w;v++){let g=h[v],f=a[g.materialIndex],T=Math.max(g.start,p.start),R=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=T,_=R;b<_;b+=3){let S=o.getX(b),E=o.getX(b+1),m=o.getX(b+2);s=Ir(this,f,e,n,c,u,d,S,E,m),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,p.start),w=Math.min(o.count,p.start+p.count);for(let g=v,f=w;g<f;g+=3){let T=o.getX(g),R=o.getX(g+1),b=o.getX(g+2);s=Ir(this,a,e,n,c,u,d,T,R,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,w=h.length;v<w;v++){let g=h[v],f=a[g.materialIndex],T=Math.max(g.start,p.start),R=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let b=T,_=R;b<_;b+=3){let S=b,E=b+1,m=b+2;s=Ir(this,f,e,n,c,u,d,S,E,m),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,p.start),w=Math.min(l.count,p.start+p.count);for(let g=v,f=w;g<f;g+=3){let T=g,R=g+1,b=g+2;s=Ir(this,a,e,n,c,u,d,T,R,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Ch(i,e,t,n,s,r,a,o){let l;if(e.side===Xt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===di,o),l===null)return null;Rr.copy(o),Rr.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Rr);return c<t.near||c>t.far?null:{distance:c,point:Rr.clone(),object:i}}function Ir(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Tr),i.getVertexPosition(l,Er),i.getVertexPosition(c,Ar);let u=Ch(i,e,t,n,Tr,Er,Ar,cc);if(u){let d=new H;ri.getBarycoord(cc,Tr,Er,Ar,d),s&&(u.uv=ri.getInterpolatedAttribute(s,o,l,c,d,new Ye)),r&&(u.uv1=ri.getInterpolatedAttribute(r,o,l,c,d,new Ye)),a&&(u.normal=ri.getInterpolatedAttribute(a,o,l,c,d,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new H,materialIndex:0};ri.getNormal(Tr,Er,Ar,h.normal),u.face=h,u.barycoord=d}return u}var Kr=class extends cn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Gt,u=Gt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Si=new Yn,Rh=new Ye(.5,.5),Pr=new H,Bs=class{constructor(e=new An,t=new An,n=new An,s=new An,r=new An,a=new An){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],p=r[7],v=r[8],w=r[9],g=r[10],f=r[11],T=r[12],R=r[13],b=r[14],_=r[15];if(s[0].setComponents(c-a,p-u,f-v,_-T).normalize(),s[1].setComponents(c+a,p+u,f+v,_+T).normalize(),s[2].setComponents(c+o,p+d,f+w,_+R).normalize(),s[3].setComponents(c-o,p-d,f-w,_-R).normalize(),n)s[4].setComponents(l,h,g,b).normalize(),s[5].setComponents(c-l,p-h,f-g,_-b).normalize();else if(s[4].setComponents(c-l,p-h,f-g,_-b).normalize(),t===Cn)s[5].setComponents(c+l,p+h,f+g,_+b).normalize();else if(t===Ps)s[5].setComponents(l,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(e){Si.center.set(0,0,0);let t=Rh.distanceTo(e.center);return Si.radius=.7071067811865476+t,Si.applyMatrix4(e.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Pr.x=s.normal.x>0?e.max.x:e.min.x,Pr.y=s.normal.y>0?e.max.y:e.min.y,Pr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var jr=class extends oi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},uc=new Rt,Xo=new ks,Lr=new Yn,Dr=new H,zs=class extends mn{constructor(e=new jt,t=new jr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(s),Lr.radius+=r,e.ray.intersectsSphere(Lr)===!1)return;uc.copy(s).invert(),Xo.copy(e.ray).applyMatrix4(uc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let v=h,w=p;v<w;v++){let g=c.getX(v);Dr.fromBufferAttribute(d,g),hc(Dr,g,l,s,e,t,this)}}else{let h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let v=h,w=p;v<w;v++)Dr.fromBufferAttribute(d,v),hc(Dr,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function hc(i,e,t,n,s,r,a){let o=Xo.distanceSqToPoint(i);if(o<t){let l=new H;Xo.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Vs=class extends cn{constructor(e=[],t=pi,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var li=class extends cn{constructor(e,t,n=In,s,r,a,o=Gt,l=Gt,c,u=Nn,d=1){if(u!==Nn&&u!==gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ts(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Qr=class extends li{constructor(e,t=In,n=pi,s,r,a=Gt,o=Gt,l,c=Nn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Hs=class extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},is=class i extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,p=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(d,2));function v(w,g,f,T,R,b,_,S,E,m,M){let A=b/E,C=_/m,N=b/2,F=_/2,P=S/2,V=E+1,K=m+1,G=0,Q=0,q=new H;for(let k=0;k<K;k++){let U=k*C-F;for(let le=0;le<V;le++){let ee=le*A-N;q[w]=ee*T,q[g]=U*R,q[f]=P,c.push(q.x,q.y,q.z),q[w]=0,q[g]=0,q[f]=S>0?1:-1,u.push(q.x,q.y,q.z),d.push(le/E),d.push(1-k/m),G+=1}}for(let k=0;k<m;k++)for(let U=0;U<E;U++){let le=h+U+V*k,ee=h+U+V*(k+1),we=h+(U+1)+V*(k+1),Ee=h+(U+1)+V*k;l.push(le,ee,Ee),l.push(ee,we,Ee),Q+=6}o.addGroup(p,Q,M),p+=Q,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Gs=class i extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,p=[],v=[],w=[],g=[];for(let f=0;f<u;f++){let T=f*h-a;for(let R=0;R<c;R++){let b=R*d-r;v.push(b,-T,0),w.push(0,0,1),g.push(R/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<o;T++){let R=T+c*f,b=T+c*(f+1),_=T+1+c*(f+1),S=T+1+c*f;p.push(R,b,S),p.push(b,_,S)}this.setIndex(p),this.setAttribute("position",new Ut(v,3)),this.setAttribute("normal",new Ut(w,3)),this.setAttribute("uv",new Ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ws=class i extends jt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new H,h=new H,p=[],v=[],w=[],g=[];for(let f=0;f<=n;f++){let T=[],R=f/n,b=a+R*o,_=e*Math.cos(b),S=Math.sqrt(e*e-_*_),E=0;f===0&&a===0?E=.5/t:f===n&&l===Math.PI&&(E=-.5/t);for(let m=0;m<=t;m++){let M=m/t,A=s+M*r;d.x=-S*Math.cos(A),d.y=_,d.z=S*Math.sin(A),v.push(d.x,d.y,d.z),h.copy(d).normalize(),w.push(h.x,h.y,h.z),g.push(M+E,1-R),T.push(c++)}u.push(T)}for(let f=0;f<n;f++)for(let T=0;T<t;T++){let R=u[f][T+1],b=u[f][T],_=u[f+1][T],S=u[f+1][T+1];(f!==0||a>0)&&p.push(R,b,S),(f!==n-1||l<Math.PI)&&p.push(b,_,S)}this.setIndex(p),this.setAttribute("position",new Ut(v,3)),this.setAttribute("normal",new Ut(w,3)),this.setAttribute("uv",new Ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ii(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(dc(s))s.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(dc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function en(i){let e={};for(let t=0;t<i.length;t++){let n=Ii(i[t]);for(let s in n)e[s]=n[s]}return e}function dc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ih(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function dl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var Jn={clone:Ii,merge:en},Ph=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,It=class extends oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ph,this.fragmentShader=Lh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=Ih(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Qe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ye().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Lt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new je().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Rt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ss=class extends It{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ea=class extends oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ta=class extends oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function qi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function zo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},na=class extends ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ho,endingEnd:Ho}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Go:r=e,o=2*t-n;break;case Wo:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Go:a=e,l=2*n-t;break;case Wo:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,v=(n-t)/(s-t),w=v*v,g=w*v,f=-h*g+2*h*w-h*v,T=(1+h)*g+(-1.5-2*h)*w+(-.5+h)*v+1,R=(-1-p)*g+(1.5+p)*w+.5*v,b=p*g-p*w;for(let _=0;_!==o;++_)r[_]=f*a[u+_]+T*a[c+_]+R*a[l+_]+b*a[d+_];return r}},ia=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},sa=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ra=class extends ci{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let v=(n-t)/(s-t),w=1-v;for(let g=0;g!==o;++g)r[g]=a[c+g]*w+a[l+g]*v;return r}let h=o*2,p=e-1;for(let v=0;v!==o;++v){let w=a[c+v],g=a[l+v],f=p*h+v*2,T=d[f],R=d[f+1],b=e*h+v*2,_=u[b],S=u[b+1],E=Nh(n,t,T,_,s);r[v]=tu(E,w,R,S,g)}return r}};function tu(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Dh(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Nh(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=tu(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Dh(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var gn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qi(t,this.TimeBufferType),this.values=qi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qi(e.times,Array),values:qi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),zo(e.settings)&&(n.settings={inTangents:qi(e.settings.inTangents,Array),outTangents:qi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new na(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ra(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Cs:t=this.InterpolantFactoryMethodDiscrete;break;case qr:t=this.InterpolantFactoryMethodLinear;break;case Fr:t=this.InterpolantFactoryMethodSmooth;break;case Vo:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return $e("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cs;case this.InterpolantFactoryMethodLinear:return qr;case this.InterpolantFactoryMethodSmooth:return Fr;case this.InterpolantFactoryMethodBezier:return Vo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;zo(this.settings)&&(fc(this.settings.inTangents,e),fc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ze("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ze("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Zu(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ze("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fr,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,h=d-n,p=d+n;for(let v=0;v!==n;++v){let w=t[d+v];if(w!==t[h+v]||w!==t[p+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,h=a*n;for(let p=0;p!==n;++p)t[h+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,zo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function fc(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=qr;var ui=class extends gn{constructor(e,t,n){super(e,t,n)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Cs;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var aa=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};aa.prototype.ValueTypeName="color";var oa=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};oa.prototype.ValueTypeName="number";var la=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Fn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Xs=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new la(this.times,this.values,this.getValueSize(),e)}};Xs.prototype.ValueTypeName="quaternion";Xs.prototype.InterpolantFactoryMethodSmooth=void 0;var hi=class extends gn{constructor(e,t,n){super(e,t,n)}};hi.prototype.ValueTypeName="string";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=Cs;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ca=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};ca.prototype.ValueTypeName="vector";var ua=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],v=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},nu=new ua,ha=class{constructor(e){this.manager=e!==void 0?e:nu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ha.DEFAULT_MATERIAL_NAME="__DEFAULT";var Nr=new H,Ur=new Fn,Ln=new H,$s=class extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Nr,Ur,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nr,Ur,Ln.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Nr,Ur,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nr,Ur,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},si=new H,pc=new Ye,mc=new Ye,Kt=class extends $s{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=es*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return es*2*Math.atan(Math.tan(Es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,pc,mc),t.subVectors(mc,pc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Es*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ei=class extends $s{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Yi=-90,Zi=1,da=class extends mn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Kt(Yi,Zi,e,t);s.layers=this.layers,this.add(s);let r=new Kt(Yi,Zi,e,t);r.layers=this.layers,this.add(r);let a=new Kt(Yi,Zi,e,t);a.layers=this.layers,this.add(a);let o=new Kt(Yi,Zi,e,t);o.layers=this.layers,this.add(o);let l=new Kt(Yi,Zi,e,t);l.layers=this.layers,this.add(l);let c=new Kt(Yi,Zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=w,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},fa=class extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},qs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Uh.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Uh(){this._document.hidden===!1&&this.reset()}var fl="\\[\\]\\.:\\/",Fh=new RegExp("["+fl+"]","g"),pl="[^"+fl+"]",Oh="[^"+fl.replace("\\.","")+"]",kh=/((?:WC+[\/:])*)/.source.replace("WC",pl),Bh=/(WCOD+)?/.source.replace("WCOD",Oh),zh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pl),Vh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pl),Hh=new RegExp("^"+kh+Bh+zh+Vh+"$"),Gh=["material","materials","bones","map"],$o=class{constructor(e,t,n){let s=n||At.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},At=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fh,"")}static parseTrackName(e){let t=Hh.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Gh.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){$e("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ze("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};At.Composite=$o;At.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};At.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};At.prototype.GetterByBindingType=[At.prototype._getValue_direct,At.prototype._getValue_array,At.prototype._getValue_arrayElement,At.prototype._getValue_toArray];At.prototype.SetterByBindingTypeAndVersioning=[[At.prototype._setValue_direct,At.prototype._setValue_direct_setNeedsUpdate,At.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[At.prototype._setValue_array,At.prototype._setValue_array_setNeedsUpdate,At.prototype._setValue_array_setMatrixWorldNeedsUpdate],[At.prototype._setValue_arrayElement,At.prototype._setValue_arrayElement_setNeedsUpdate,At.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[At.prototype._setValue_fromArray,At.prototype._setValue_fromArray_setNeedsUpdate,At.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var L0=new Float32Array(1);var qo=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};function ml(i,e,t,n){let s=Wh(n);switch(t){case rl:return i*e;case ol:return i*e/s.components*s.byteLength;case ya:return i*e/s.components*s.byteLength;case vi:return i*e*2/s.components*s.byteLength;case ba:return i*e*2/s.components*s.byteLength;case al:return i*e*3/s.components*s.byteLength;case bn:return i*e*4/s.components*s.byteLength;case Ma:return i*e*4/s.components*s.byteLength;case ir:case sr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case rr:case ar:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wa:case Ea:return Math.max(i,16)*Math.max(e,8)/4;case Sa:case Ta:return Math.max(i,8)*Math.max(e,8)/2;case Aa:case Ca:case Ia:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ra:case or:case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Va:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Xa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case qa:case Ya:case Za:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ja:case Ka:return Math.ceil(i/4)*Math.ceil(e/4)*8;case lr:case ja:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wh(i){switch(i){case vn:case tl:return{byteLength:1,components:1};case os:case nl:case $t:return{byteLength:2,components:1};case xa:case _a:return{byteLength:2,components:4};case In:case va:case Pn:return{byteLength:4,components:1};case il:case sl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function wu(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function $h(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,v)=>p.start-v.start);let h=0;for(let p=1;p<d.length;p++){let v=d[h],w=d[p];w.start<=v.start+v.count+1?v.count=Math.max(v.count,w.start+w.count-v.start):(++h,d[h]=w)}d.length=h+1;for(let p=0,v=d.length;p<v;p++){let w=d[p];i.bufferSubData(c,w.start*u.BYTES_PER_ELEMENT,u,w.start,w.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var qh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ed=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,td=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,nd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ad=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,od=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,md=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,gd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,_d=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sd="gl_FragColor = linearToOutputTexel( gl_FragColor );",wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ad=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Id=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Bd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,zd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$d=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Jd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,of=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,df=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ff=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_f=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Af=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,If=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Pf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Df=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ff=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Of=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ep=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,np=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ip=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,op=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_p=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:qh,alphahash_pars_fragment:Yh,alphamap_fragment:Zh,alphamap_pars_fragment:Jh,alphatest_fragment:Kh,alphatest_pars_fragment:jh,aomap_fragment:Qh,aomap_pars_fragment:ed,batching_pars_vertex:td,batching_vertex:nd,begin_vertex:id,beginnormal_vertex:sd,bsdfs:rd,iridescence_fragment:ad,bumpmap_pars_fragment:od,clipping_planes_fragment:ld,clipping_planes_pars_fragment:cd,clipping_planes_pars_vertex:ud,clipping_planes_vertex:hd,color_fragment:dd,color_pars_fragment:fd,color_pars_vertex:pd,color_vertex:md,common:gd,cube_uv_reflection_fragment:vd,defaultnormal_vertex:xd,displacementmap_pars_vertex:_d,displacementmap_vertex:yd,emissivemap_fragment:bd,emissivemap_pars_fragment:Md,colorspace_fragment:Sd,colorspace_pars_fragment:wd,envmap_fragment:Td,envmap_common_pars_fragment:Ed,envmap_pars_fragment:Ad,envmap_pars_vertex:Cd,envmap_physical_pars_fragment:Bd,envmap_vertex:Rd,fog_vertex:Id,fog_pars_vertex:Pd,fog_fragment:Ld,fog_pars_fragment:Dd,gradientmap_pars_fragment:Nd,lightmap_pars_fragment:Ud,lights_lambert_fragment:Fd,lights_lambert_pars_fragment:Od,lights_pars_begin:kd,lights_toon_fragment:zd,lights_toon_pars_fragment:Vd,lights_phong_fragment:Hd,lights_phong_pars_fragment:Gd,lights_physical_fragment:Wd,lights_physical_pars_fragment:Xd,lights_fragment_begin:$d,lights_fragment_maps:qd,lights_fragment_end:Yd,lightprobes_pars_fragment:Zd,logdepthbuf_fragment:Jd,logdepthbuf_pars_fragment:Kd,logdepthbuf_pars_vertex:jd,logdepthbuf_vertex:Qd,map_fragment:ef,map_pars_fragment:tf,map_particle_fragment:nf,map_particle_pars_fragment:sf,metalnessmap_fragment:rf,metalnessmap_pars_fragment:af,morphinstance_vertex:of,morphcolor_vertex:lf,morphnormal_vertex:cf,morphtarget_pars_vertex:uf,morphtarget_vertex:hf,normal_fragment_begin:df,normal_fragment_maps:ff,normal_pars_fragment:pf,normal_pars_vertex:mf,normal_vertex:gf,normalmap_pars_fragment:vf,clearcoat_normal_fragment_begin:xf,clearcoat_normal_fragment_maps:_f,clearcoat_pars_fragment:yf,iridescence_pars_fragment:bf,opaque_fragment:Mf,packing:Sf,premultiplied_alpha_fragment:wf,project_vertex:Tf,dithering_fragment:Ef,dithering_pars_fragment:Af,roughnessmap_fragment:Cf,roughnessmap_pars_fragment:Rf,shadowmap_pars_fragment:If,shadowmap_pars_vertex:Pf,shadowmap_vertex:Lf,shadowmask_pars_fragment:Df,skinbase_vertex:Nf,skinning_pars_vertex:Uf,skinning_vertex:Ff,skinnormal_vertex:Of,specularmap_fragment:kf,specularmap_pars_fragment:Bf,tonemapping_fragment:zf,tonemapping_pars_fragment:Vf,transmission_fragment:Hf,transmission_pars_fragment:Gf,uv_pars_fragment:Wf,uv_pars_vertex:Xf,uv_vertex:$f,worldpos_vertex:qf,background_vert:Yf,background_frag:Zf,backgroundCube_vert:Jf,backgroundCube_frag:Kf,cube_vert:jf,cube_frag:Qf,depth_vert:ep,depth_frag:tp,distance_vert:np,distance_frag:ip,equirect_vert:sp,equirect_frag:rp,linedashed_vert:ap,linedashed_frag:op,meshbasic_vert:lp,meshbasic_frag:cp,meshlambert_vert:up,meshlambert_frag:hp,meshmatcap_vert:dp,meshmatcap_frag:fp,meshnormal_vert:pp,meshnormal_frag:mp,meshphong_vert:gp,meshphong_frag:vp,meshphysical_vert:xp,meshphysical_frag:_p,meshtoon_vert:yp,meshtoon_frag:bp,points_vert:Mp,points_frag:Sp,shadow_vert:wp,shadow_frag:Tp,sprite_vert:Ep,sprite_frag:Ap},Te={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},zn={basic:{uniforms:en([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:en([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:en([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:en([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:en([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new Qe(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:en([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:en([Te.points,Te.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:en([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:en([Te.common,Te.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:en([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:en([Te.sprite,Te.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:en([Te.common,Te.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:en([Te.lights,Te.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};zn.physical={uniforms:en([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var no={r:0,b:0,g:0},Cp=new Rt,Tu=new je;Tu.set(-1,0,0,0,1,0,0,0,1);function Rp(i,e,t,n,s,r){let a=new Qe(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function p(T){let R=T.isScene===!0?T.background:null;if(R&&R.isTexture){let b=T.backgroundBlurriness>0;R=e.get(R,b)}return R}function v(T){let R=!1,b=p(T);b===null?g(a,o):b&&b.isColor&&(g(b,1),R=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function w(T,R){let b=p(R);b&&(b.isCubeTexture||b.mapping===tr)?(c===void 0&&(c=new Qt(new is(1,1,1),new It({name:"BackgroundCubeMaterial",uniforms:Ii(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Cp.makeRotationFromEuler(R.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Tu),c.material.toneMapped=ot.getTransfer(b.colorSpace)!==mt,(u!==b||d!==b.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Qt(new Gs(2,2),new It({name:"BackgroundMaterial",uniforms:Ii(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=ot.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function g(T,R){T.getRGB(no,dl(i)),t.buffers.color.setClear(no.r,no.g,no.b,R,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,R=1){a.set(T),o=R,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:v,addToRenderList:w,dispose:f}}function Ip(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(C,N,F,P,V){let K=!1,G=d(C,P,F,N);r!==G&&(r=G,c(r.object)),K=p(C,P,F,V),K&&v(C,P,F,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,b(C,N,F,P),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return i.createVertexArray()}function c(C){return i.bindVertexArray(C)}function u(C){return i.deleteVertexArray(C)}function d(C,N,F,P){let V=P.wireframe===!0,K=n[N.id];K===void 0&&(K={},n[N.id]=K);let G=C.isInstancedMesh===!0?C.id:0,Q=K[G];Q===void 0&&(Q={},K[G]=Q);let q=Q[F.id];q===void 0&&(q={},Q[F.id]=q);let k=q[V];return k===void 0&&(k=h(l()),q[V]=k),k}function h(C){let N=[],F=[],P=[];for(let V=0;V<t;V++)N[V]=0,F[V]=0,P[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:F,attributeDivisors:P,object:C,attributes:{},index:null}}function p(C,N,F,P){let V=r.attributes,K=N.attributes,G=0,Q=F.getAttributes();for(let q in Q)if(Q[q].location>=0){let U=V[q],le=K[q];if(le===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(le=C.instanceColor)),U===void 0||U.attribute!==le||le&&U.data!==le.data)return!0;G++}return r.attributesNum!==G||r.index!==P}function v(C,N,F,P){let V={},K=N.attributes,G=0,Q=F.getAttributes();for(let q in Q)if(Q[q].location>=0){let U=K[q];U===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(U=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(U=C.instanceColor));let le={};le.attribute=U,U&&U.data&&(le.data=U.data),V[q]=le,G++}r.attributes=V,r.attributesNum=G,r.index=P}function w(){let C=r.newAttributes;for(let N=0,F=C.length;N<F;N++)C[N]=0}function g(C){f(C,0)}function f(C,N){let F=r.newAttributes,P=r.enabledAttributes,V=r.attributeDivisors;F[C]=1,P[C]===0&&(i.enableVertexAttribArray(C),P[C]=1),V[C]!==N&&(i.vertexAttribDivisor(C,N),V[C]=N)}function T(){let C=r.newAttributes,N=r.enabledAttributes;for(let F=0,P=N.length;F<P;F++)N[F]!==C[F]&&(i.disableVertexAttribArray(F),N[F]=0)}function R(C,N,F,P,V,K,G){G===!0?i.vertexAttribIPointer(C,N,F,V,K):i.vertexAttribPointer(C,N,F,P,V,K)}function b(C,N,F,P){w();let V=P.attributes,K=F.getAttributes(),G=N.defaultAttributeValues;for(let Q in K){let q=K[Q];if(q.location>=0){let k=V[Q];if(k===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(k=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(k=C.instanceColor)),k!==void 0){let U=k.normalized,le=k.itemSize,ee=e.get(k);if(ee===void 0)continue;let we=ee.buffer,Ee=ee.type,Be=ee.bytesPerElement,j=Ee===i.INT||Ee===i.UNSIGNED_INT||k.gpuType===va;if(k.isInterleavedBufferAttribute){let L=k.data,re=L.stride,ae=k.offset;if(L.isInstancedInterleavedBuffer){for(let oe=0;oe<q.locationSize;oe++)f(q.location+oe,L.meshPerAttribute);C.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let oe=0;oe<q.locationSize;oe++)g(q.location+oe);i.bindBuffer(i.ARRAY_BUFFER,we);for(let oe=0;oe<q.locationSize;oe++)R(q.location+oe,le/q.locationSize,Ee,U,re*Be,(ae+le/q.locationSize*oe)*Be,j)}else{if(k.isInstancedBufferAttribute){for(let L=0;L<q.locationSize;L++)f(q.location+L,k.meshPerAttribute);C.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let L=0;L<q.locationSize;L++)g(q.location+L);i.bindBuffer(i.ARRAY_BUFFER,we);for(let L=0;L<q.locationSize;L++)R(q.location+L,le/q.locationSize,Ee,U,le*Be,le/q.locationSize*L*Be,j)}}else if(G!==void 0){let U=G[Q];if(U!==void 0)switch(U.length){case 2:i.vertexAttrib2fv(q.location,U);break;case 3:i.vertexAttrib3fv(q.location,U);break;case 4:i.vertexAttrib4fv(q.location,U);break;default:i.vertexAttrib1fv(q.location,U)}}}}T()}function _(){M();for(let C in n){let N=n[C];for(let F in N){let P=N[F];for(let V in P){let K=P[V];for(let G in K)u(K[G].object),delete K[G];delete P[V]}}delete n[C]}}function S(C){if(n[C.id]===void 0)return;let N=n[C.id];for(let F in N){let P=N[F];for(let V in P){let K=P[V];for(let G in K)u(K[G].object),delete K[G];delete P[V]}}delete n[C.id]}function E(C){for(let N in n){let F=n[N];for(let P in F){let V=F[P];if(V[C.id]===void 0)continue;let K=V[C.id];for(let G in K)u(K[G].object),delete K[G];delete V[C.id]}}}function m(C){for(let N in n){let F=n[N],P=C.isInstancedMesh===!0?C.id:0,V=F[P];if(V!==void 0){for(let K in V){let G=V[K];for(let Q in G)u(G[Q].object),delete G[Q];delete V[K]}delete F[P],Object.keys(F).length===0&&delete n[N]}}}function M(){A(),a=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:A,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfObject:m,releaseStatesOfProgram:E,initAttributes:w,enableAttribute:g,disableUnusedAttributes:T}}function Pp(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Lp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==bn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let m=E===$t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==vn&&E!==Pn&&!m&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&($e("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&$e("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:v,maxTextureSize:w,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:T,maxVaryings:R,maxFragmentUniforms:b,maxSamples:_,samples:S}}function Dp(i){let e=this,t=null,n=0,s=!1,r=!1,a=new An,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let v=d.clippingPlanes,w=d.clipIntersection,g=d.clipShadows,f=i.get(d);if(!s||v===null||v.length===0||r&&!g)r?u(null):c();else{let T=r?0:n,R=T*4,b=f.clippingState||null;l.value=b,b=u(v,h,R,p);for(let _=0;_!==R;++_)b[_]=t[_];f.clippingState=b,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,v){let w=d!==null?d.length:0,g=null;if(w!==0){if(g=l.value,v!==!0||g===null){let f=p+w*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<f)&&(g=new Float32Array(f));for(let R=0,b=p;R!==w;++R,b+=4)a.copy(d[R]).applyMatrix4(T,o),a.normal.toArray(g,b),g[b+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,g}}var hs=4,Np=6,Up=20,Fp=256,cr=new Ei,iu=new Qe,gl=null,vl=0,xl=0,_l=!1,Op=new H,Pi=new H,so=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Op}=r;gl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=au(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ru(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(gl,vl,xl),this._renderer.xr.enabled=_l,e.scissorTest=!1,us(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pi||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:$t,format:bn,colorSpace:Rs,depthBuffer:!1},s=su(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=su(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=kp(r)),this._blurMaterial=zp(r,e,t),this._ggxMaterial=Bp(r,e,t)}return s}_compileMaterial(e){let t=new Qt(new jt,e);this._renderer.compile(t,cr)}_sceneToCubeUV(e,t,n,s,r){let l=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(iu),d.toneMapping=Rn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new is,new Ti({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));let w=this._backgroundBox,g=w.material,f=!1,T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,f=!0):(g.color.copy(iu),f=!0);for(let R=0;R<6;R++){let b=R%3;b===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):b===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));let _=this._cubeSize;us(s,b*_,R>2?_:0,_,_),d.setRenderTarget(s),f&&d.render(w,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=T}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===pi||e.mapping===Ri;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=au()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ru());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;us(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,cr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:v}=this,w=this._sizeLods[n],g=3*w*(n>v-hs?n-v+hs:0),f=4*(this._cubeSize-w);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=v-t,us(r,g,f,3*w,2*w),s.setRenderTarget(r),s.render(o,cr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-n,us(e,g,f,3*w,2*w),s.setRenderTarget(e),s.render(o,cr)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-hs?s-this._lodMax+hs:0),h=4*(this._cubeSize-u);us(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,cr)}};function kp(i){let e=[],t=[],n=i,s=i-hs+1+Np;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,v=new Float32Array(p*h*d),w=new Float32Array(p*h*d);for(let f=0;f<d;f++){let T=f%3*2/3-1,R=f>2?0:-1,b=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];v.set(b,p*h*f);for(let _=0;_<h;_++){let S=u[_*2]*2-1,E=u[_*2+1]*2-1;f===0?Pi.set(1,E,S):f===1?Pi.set(-S,1,-E):f===2?Pi.set(-S,E,1):f===3?Pi.set(-1,E,-S):f===4?Pi.set(-S,-1,E):Pi.set(S,E,-1),Pi.toArray(w,(f*h+_)*p)}}let g=new jt;g.setAttribute("position",new ln(v,p)),g.setAttribute("outputDirection",new ln(w,p)),t.push(new Qt(g,null)),n>hs&&n--}return{lodMeshes:t,sizeLods:e}}function su(i,e,t){let n=new Ft(i,e,t);return n.texture.mapping=tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function us(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Bp(i,e,t){return new It({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function zp(i,e,t){return new It({name:"SphericalGaussianBlur",defines:{SAMPLES:Up,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function ru(){return new It({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function au(){return new It({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function oo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ro=class extends Ft{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Vs(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new is(5,5,5),r=new It({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:yn});r.uniforms.tEquirect.value=t;let a=new Qt(s,r),o=t.minFilter;return t.minFilter===mi&&(t.minFilter=Wt),new da(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Vp(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===pa||p===ma)if(e.has(h)){let v=e.get(h).texture;return o(v,h.mapping)}else{let v=h.image;if(v&&v.height>0){let w=new ro(v.height);return w.fromEquirectangularTexture(i,h),e.set(h,w),h.addEventListener("dispose",c),o(w.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,v=p===pa||p===ma,w=p===pi||p===Ri;if(v||w){let g=t.get(h),f=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new so(i)),g=v?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let T=h.image;return v&&T&&T.height>0||w&&T&&l(T)?(n===null&&(n=new so(i)),g=v?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,p){return p===pa?h.mapping=pi:p===ma&&(h.mapping=Ri),h}function l(h){let p=0,v=6;for(let w=0;w<v;w++)h[w]!==void 0&&p++;return p===v}function c(h){let p=h.target;p.removeEventListener("dispose",c);let v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Hp(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&wi("WebGLRenderer: "+n+" extension not supported."),s}}}function Gp(i,e,t,n){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,v=d.attributes.position,w=0;if(v===void 0)return;if(p!==null){let T=p.array;w=p.version;for(let R=0,b=T.length;R<b;R+=3){let _=T[R+0],S=T[R+1],E=T[R+2];h.push(_,S,S,E,E,_)}}else{let T=v.array;w=v.version;for(let R=0,b=T.length/3-1;R<b;R+=3){let _=R+0,S=R+1,E=R+2;h.push(_,S,S,E,E,_)}}let g=new(v.count>=65535?Os:Fs)(h,1);g.version=w;let f=r.get(d);f&&e.remove(f),r.set(d,g)}function u(d){let h=r.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Wp(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,r,d*a),t.update(h,n,1)}function c(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,d*a,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,p);let w=0;for(let g=0;g<p;g++)w+=h[g];t.update(w,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Xp(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function $p(i,e,t){let n=new WeakMap,s=new Lt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let M=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],R=0;p===!0&&(R=1),v===!0&&(R=2),w===!0&&(R=3);let b=o.attributes.position.count*R,_=1;b>e.maxTextureSize&&(_=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let S=new Float32Array(b*_*4*d),E=new Ds(S,b,_,d);E.type=Pn,E.needsUpdate=!0;let m=R*4;for(let A=0;A<d;A++){let C=g[A],N=f[A],F=T[A],P=b*_*4*A;for(let V=0;V<C.count;V++){let K=V*m;p===!0&&(s.fromBufferAttribute(C,V),S[P+K+0]=s.x,S[P+K+1]=s.y,S[P+K+2]=s.z,S[P+K+3]=0),v===!0&&(s.fromBufferAttribute(N,V),S[P+K+4]=s.x,S[P+K+5]=s.y,S[P+K+6]=s.z,S[P+K+7]=0),w===!0&&(s.fromBufferAttribute(F,V),S[P+K+8]=s.x,S[P+K+9]=s.y,S[P+K+10]=s.z,S[P+K+11]=F.itemSize===4?s.w:1)}}h={count:d,texture:E,size:new Ye(b,_)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let w=0;w<c.length;w++)p+=c[w];let v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function qp(i,e,t,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Yp={[Zs]:"LINEAR_TONE_MAPPING",[Js]:"REINHARD_TONE_MAPPING",[Ks]:"CINEON_TONE_MAPPING",[Ci]:"ACES_FILMIC_TONE_MAPPING",[Qs]:"AGX_TONE_MAPPING",[er]:"NEUTRAL_TONE_MAPPING",[js]:"CUSTOM_TONE_MAPPING"};function Zp(i,e,t,n,s,r){let a=new Ft(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new jt;c.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ut([0,2,0,0,2,0],2));let u=new ss({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Qt(c,u),h=new Ei(-1,1,1,-1,0,1),p=null,v=null,w=!1,g,f=null,T=[],R=!1;this.setSize=function(b,_){a.setSize(b,_),o!==null&&o.setSize(b,_),l!==null&&l.setSize(b,_);for(let S=0;S<T.length;S++){let E=T[S];E.setSize&&E.setSize(b,_)}},this.setEffects=function(b){T=b,R=T.length>0&&T[0].isRenderPass===!0;let _=a.width,S=a.height;T.length>0&&o===null&&(o=new Ft(_,S,{type:$t,depthBuffer:!1,stencilBuffer:!1}),l=new Ft(_,S,{type:$t,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<T.length;E++){let m=T[E];m.setSize&&m.setSize(_,S)}},this.begin=function(b,_){if(w||b.toneMapping===Rn&&T.length===0)return!1;if(f=_,_!==null){let S=_.width,E=_.height;(a.width!==S||a.height!==E)&&this.setSize(S,E)}return R===!1&&b.setRenderTarget(a),g=b.toneMapping,b.toneMapping=Rn,!0},this.hasRenderPass=function(){return R},this.end=function(b,_){b.toneMapping=g,w=!0;let S=a,E=o;for(let m=0;m<T.length;m++){let M=T[m];M.enabled!==!1&&(M.render(b,E,S,_),M.needsSwap!==!1&&(S=E,E=E===o?l:o))}if(p!==b.outputColorSpace||v!==b.toneMapping){p=b.outputColorSpace,v=b.toneMapping,u.defines={},ot.getTransfer(p)===mt&&(u.defines.SRGB_TRANSFER="");let m=Yp[v];m&&(u.defines[m]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(f),b.render(d,h),f=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Eu=new cn,Ml=new li(1,1),Au=new Ds,Cu=new Jr,Ru=new Vs,ou=[],lu=[],cu=new Float32Array(16),uu=new Float32Array(9),hu=new Float32Array(4);function fs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=ou[s];if(r===void 0&&(r=new Float32Array(s),ou[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function lo(i,e){let t=lu[e];t===void 0&&(t=new Int32Array(e),lu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Jp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Kp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function jp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function Qp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function em(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;hu.set(n),i.uniformMatrix2fv(this.addr,!1,hu),Bt(t,n)}}function tm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;uu.set(n),i.uniformMatrix3fv(this.addr,!1,uu),Bt(t,n)}}function nm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;cu.set(n),i.uniformMatrix4fv(this.addr,!1,cu),Bt(t,n)}}function im(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function sm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function rm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function am(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function om(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function lm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function cm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function um(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function hm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=t.isReversedDepthBuffer()?eo:Qa,r=Ml):r=Eu,t.setTexture2D(e||r,s)}function dm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Cu,s)}function fm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ru,s)}function pm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Au,s)}function mm(i){switch(i){case 5126:return Jp;case 35664:return Kp;case 35665:return jp;case 35666:return Qp;case 35674:return em;case 35675:return tm;case 35676:return nm;case 5124:case 35670:return im;case 35667:case 35671:return sm;case 35668:case 35672:return rm;case 35669:case 35673:return am;case 5125:return om;case 36294:return lm;case 36295:return cm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return dm;case 35680:case 36300:case 36308:case 36293:return fm;case 36289:case 36303:case 36311:case 36292:return pm}}function gm(i,e){i.uniform1fv(this.addr,e)}function vm(i,e){let t=fs(e,this.size,2);i.uniform2fv(this.addr,t)}function xm(i,e){let t=fs(e,this.size,3);i.uniform3fv(this.addr,t)}function _m(i,e){let t=fs(e,this.size,4);i.uniform4fv(this.addr,t)}function ym(i,e){let t=fs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function bm(i,e){let t=fs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mm(i,e){let t=fs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sm(i,e){i.uniform1iv(this.addr,e)}function wm(i,e){i.uniform2iv(this.addr,e)}function Tm(i,e){i.uniform3iv(this.addr,e)}function Em(i,e){i.uniform4iv(this.addr,e)}function Am(i,e){i.uniform1uiv(this.addr,e)}function Cm(i,e){i.uniform2uiv(this.addr,e)}function Rm(i,e){i.uniform3uiv(this.addr,e)}function Im(i,e){i.uniform4uiv(this.addr,e)}function Pm(i,e,t){let n=this.cache,s=e.length,r=lo(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ml:a=Eu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Lm(i,e,t){let n=this.cache,s=e.length,r=lo(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Cu,r[a])}function Dm(i,e,t){let n=this.cache,s=e.length,r=lo(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ru,r[a])}function Nm(i,e,t){let n=this.cache,s=e.length,r=lo(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Au,r[a])}function Um(i){switch(i){case 5126:return gm;case 35664:return vm;case 35665:return xm;case 35666:return _m;case 35674:return ym;case 35675:return bm;case 35676:return Mm;case 5124:case 35670:return Sm;case 35667:case 35671:return wm;case 35668:case 35672:return Tm;case 35669:case 35673:return Em;case 5125:return Am;case 36294:return Cm;case 36295:return Rm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Pm;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Dm;case 36289:case 36303:case 36311:case 36292:return Nm}}var Sl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=mm(t.type)}},wl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Um(t.type)}},Tl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},yl=/(\w+)(\])?(\[|\.)?/g;function du(i,e){i.seq.push(e),i.map[e.id]=e}function Fm(i,e,t){let n=i.name,s=n.length;for(yl.lastIndex=0;;){let r=yl.exec(n),a=yl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){du(t,c===void 0?new Sl(o,i,e):new wl(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Tl(o),du(t,d)),t=d}}}var ds=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Fm(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function fu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Om=37297,km=0;function Bm(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var pu=new je;function zm(i){ot._getMatrix(pu,ot.workingColorSpace,i);let e=`mat3( ${pu.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case Is:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function mu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Bm(i.getShaderSource(e),o)}else return r}function Vm(i,e){let t=zm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Hm={[Zs]:"Linear",[Js]:"Reinhard",[Ks]:"Cineon",[Ci]:"ACESFilmic",[Qs]:"AgX",[er]:"Neutral",[js]:"Custom"};function Gm(i,e){let t=Hm[e];return t===void 0?($e("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var io=new H;function Wm(){ot.getLuminanceCoefficients(io);let i=io.x.toFixed(4),e=io.y.toFixed(4),t=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hr).join(`
`)}function $m(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qm(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function hr(i){return i!==""}function gu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ym=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(i){return i.replace(Ym,Jm)}var Zm=new Map;function Jm(i,e){let t=it[e];if(t===void 0){let n=Zm.get(e);if(n!==void 0)t=it[n],$e('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return El(t)}var Km=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xu(i){return i.replace(Km,jm)}function jm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _u(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Qm={[Ys]:"SHADOWMAP_TYPE_PCF",[rs]:"SHADOWMAP_TYPE_VSM"};function eg(i){return Qm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var tg={[pi]:"ENVMAP_TYPE_CUBE",[Ri]:"ENVMAP_TYPE_CUBE",[tr]:"ENVMAP_TYPE_CUBE_UV"};function ng(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":tg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var ig={[Ri]:"ENVMAP_MODE_REFRACTION"};function sg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":ig[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var rg={[Qo]:"ENVMAP_BLENDING_MULTIPLY",[Oc]:"ENVMAP_BLENDING_MIX",[kc]:"ENVMAP_BLENDING_ADD"};function ag(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":rg[i.combine]||"ENVMAP_BLENDING_NONE"}function og(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function lg(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=eg(t),c=ng(t),u=sg(t),d=ag(t),h=og(t),p=Xm(t),v=$m(r),w=s.createProgram(),g,f,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(hr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(hr).join(`
`),f.length>0&&(f+=`
`)):(g=[_u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),f=[_u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?it.tonemapping_pars_fragment:"",t.toneMapping!==Rn?Gm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Vm("linearToOutputTexel",t.outputColorSpace),Wm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hr).join(`
`)),a=El(a),a=gu(a,t),a=vu(a,t),o=El(o),o=gu(o,t),o=vu(o,t),a=xu(a),o=xu(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let R=T+g+a,b=T+f+o,_=fu(s,s.VERTEX_SHADER,R),S=fu(s,s.FRAGMENT_SHADER,b);s.attachShader(w,_),s.attachShader(w,S),t.index0AttributeName!==void 0?s.bindAttribLocation(w,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(w,0,"position"),s.linkProgram(w);function E(C){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(w)||"",F=s.getShaderInfoLog(_)||"",P=s.getShaderInfoLog(S)||"",V=N.trim(),K=F.trim(),G=P.trim(),Q=!0,q=!0;if(s.getProgramParameter(w,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,w,_,S);else{let k=mu(s,_,"vertex"),U=mu(s,S,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(w,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+V+`
`+k+`
`+U)}else V!==""?$e("WebGLProgram: Program Info Log:",V):(K===""||G==="")&&(q=!1);q&&(C.diagnostics={runnable:Q,programLog:V,vertexShader:{log:K,prefix:g},fragmentShader:{log:G,prefix:f}})}s.deleteShader(_),s.deleteShader(S),m=new ds(s,w),M=qm(s,w)}let m;this.getUniforms=function(){return m===void 0&&E(this),m};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(w,Om)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=km++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=_,this.fragmentShader=S,this}var cg=0,Al=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Cl(e),t.set(e,n)),n}},Cl=class{constructor(e){this.id=cg++,this.code=e,this.usedTimes=0}};function ug(i){return i===vi||i===or||i===lr}function hg(i,e,t,n,s,r){let a=new Ns,o=new Al,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return l.add(m),m===0?"uv":`uv${m}`}function w(m,M,A,C,N,F){let P=C.fog,V=N.geometry,K=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?C.environment:null,G=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,Q=e.get(m.envMap||K,G),q=Q&&Q.mapping===tr?Q.image.height:null,k=p[m.type];m.precision!==null&&(h=n.getMaxPrecision(m.precision),h!==m.precision&&$e("WebGLProgram.getParameters:",m.precision,"not supported, using",h,"instead."));let U=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,le=U!==void 0?U.length:0,ee=0;V.morphAttributes.position!==void 0&&(ee=1),V.morphAttributes.normal!==void 0&&(ee=2),V.morphAttributes.color!==void 0&&(ee=3);let we,Ee,Be,j;if(k){let bt=zn[k];we=bt.vertexShader,Ee=bt.fragmentShader}else{we=m.vertexShader,Ee=m.fragmentShader;let bt=o.getVertexShaderStage(m),st=o.getFragmentShaderStage(m);o.update(m,bt,st),Be=bt.id,j=st.id}let L=i.getRenderTarget(),re=i.state.buffers.depth.getReversed(),ae=N.isInstancedMesh===!0,oe=N.isBatchedMesh===!0,Ie=!!m.map,We=!!m.matcap,Ae=!!Q,Pe=!!m.aoMap,He=!!m.lightMap,Ge=!!m.bumpMap&&m.wireframe===!1,Ke=!!m.normalMap,ft=!!m.displacementMap,Pt=!!m.emissiveMap,xt=!!m.metalnessMap,Ct=!!m.roughnessMap,B=m.anisotropy>0,zt=m.clearcoat>0,gt=m.dispersion>0,I=m.retroreflectivity>0,x=m.iridescence>0,z=m.sheen>0,Y=m.transmission>0,ne=B&&!!m.anisotropyMap,de=zt&&!!m.clearcoatMap,_e=zt&&!!m.clearcoatNormalMap,te=zt&&!!m.clearcoatRoughnessMap,ie=x&&!!m.iridescenceMap,ge=x&&!!m.iridescenceThicknessMap,Ue=z&&!!m.sheenColorMap,ye=z&&!!m.sheenRoughnessMap,pe=!!m.specularMap,Oe=!!m.specularColorMap,Ve=!!m.specularIntensityMap,qe=Y&&!!m.transmissionMap,O=Y&&!!m.thicknessMap,fe=!!m.gradientMap,se=!!m.alphaMap,me=m.alphaTest>0,Se=!!m.alphaHash,ce=!!m.extensions,ze=Rn;m.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ze=i.toneMapping);let Fe={shaderID:k,shaderType:m.type,shaderName:m.name,vertexShader:we,fragmentShader:Ee,defines:m.defines,customVertexShaderID:Be,customFragmentShaderID:j,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:h,batching:oe,batchingColor:oe&&N._colorsTexture!==null,instancing:ae,instancingColor:ae&&N.instanceColor!==null,instancingMorph:ae&&N.morphTexture!==null,outputColorSpace:L===null?i.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:Ie,matcap:We,envMap:Ae,envMapMode:Ae&&Q.mapping,envMapCubeUVHeight:q,aoMap:Pe,lightMap:He,bumpMap:Ge,normalMap:Ke,displacementMap:ft,emissiveMap:Pt,normalMapObjectSpace:Ke&&m.normalMapType===Vc,normalMapTangentSpace:Ke&&m.normalMapType===ll,packedNormalMap:Ke&&m.normalMapType===ll&&ug(m.normalMap.format),metalnessMap:xt,roughnessMap:Ct,anisotropy:B,anisotropyMap:ne,clearcoat:zt,clearcoatMap:de,clearcoatNormalMap:_e,clearcoatRoughnessMap:te,dispersion:gt,retroreflection:I,iridescence:x,iridescenceMap:ie,iridescenceThicknessMap:ge,sheen:z,sheenColorMap:Ue,sheenRoughnessMap:ye,specularMap:pe,specularColorMap:Oe,specularIntensityMap:Ve,transmission:Y,transmissionMap:qe,thicknessMap:O,gradientMap:fe,opaque:m.transparent===!1&&m.blending===as&&m.alphaToCoverage===!1,alphaMap:se,alphaTest:me,alphaHash:Se,combine:m.combine,mapUv:Ie&&v(m.map.channel),aoMapUv:Pe&&v(m.aoMap.channel),lightMapUv:He&&v(m.lightMap.channel),bumpMapUv:Ge&&v(m.bumpMap.channel),normalMapUv:Ke&&v(m.normalMap.channel),displacementMapUv:ft&&v(m.displacementMap.channel),emissiveMapUv:Pt&&v(m.emissiveMap.channel),metalnessMapUv:xt&&v(m.metalnessMap.channel),roughnessMapUv:Ct&&v(m.roughnessMap.channel),anisotropyMapUv:ne&&v(m.anisotropyMap.channel),clearcoatMapUv:de&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:_e&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:ye&&v(m.sheenRoughnessMap.channel),specularMapUv:pe&&v(m.specularMap.channel),specularColorMapUv:Oe&&v(m.specularColorMap.channel),specularIntensityMapUv:Ve&&v(m.specularIntensityMap.channel),transmissionMapUv:qe&&v(m.transmissionMap.channel),thicknessMapUv:O&&v(m.thicknessMap.channel),alphaMapUv:se&&v(m.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ke||B),vertexNormals:!!V.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!V.attributes.uv&&(Ie||se),fog:!!P,useFog:m.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||V.attributes.normal===void 0&&Ke===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:ee,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:m.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ie&&m.map.isVideoTexture===!0&&ot.getTransfer(m.map.colorSpace)===mt,decodeVideoTextureEmissive:Pt&&m.emissiveMap.isVideoTexture===!0&&ot.getTransfer(m.emissiveMap.colorSpace)===mt,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===kn,flipSided:m.side===Xt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ce&&m.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&m.extensions.multiDraw===!0||oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function g(m){let M=[];if(m.shaderID?M.push(m.shaderID):(M.push(m.customVertexShaderID),M.push(m.customFragmentShaderID)),m.defines!==void 0)for(let A in m.defines)M.push(A),M.push(m.defines[A]);return m.isRawShaderMaterial===!1&&(f(M,m),T(M,m),M.push(i.outputColorSpace)),M.push(m.customProgramCacheKey),M.join()}function f(m,M){m.push(M.precision),m.push(M.outputColorSpace),m.push(M.envMapMode),m.push(M.envMapCubeUVHeight),m.push(M.mapUv),m.push(M.alphaMapUv),m.push(M.lightMapUv),m.push(M.aoMapUv),m.push(M.bumpMapUv),m.push(M.normalMapUv),m.push(M.displacementMapUv),m.push(M.emissiveMapUv),m.push(M.metalnessMapUv),m.push(M.roughnessMapUv),m.push(M.anisotropyMapUv),m.push(M.clearcoatMapUv),m.push(M.clearcoatNormalMapUv),m.push(M.clearcoatRoughnessMapUv),m.push(M.iridescenceMapUv),m.push(M.iridescenceThicknessMapUv),m.push(M.sheenColorMapUv),m.push(M.sheenRoughnessMapUv),m.push(M.specularMapUv),m.push(M.specularColorMapUv),m.push(M.specularIntensityMapUv),m.push(M.transmissionMapUv),m.push(M.thicknessMapUv),m.push(M.combine),m.push(M.fogExp2),m.push(M.sizeAttenuation),m.push(M.morphTargetsCount),m.push(M.morphAttributeCount),m.push(M.numSunLights),m.push(M.numDirLights),m.push(M.numPointLights),m.push(M.numSpotLights),m.push(M.numSpotLightMaps),m.push(M.numHemiLights),m.push(M.numRectAreaLights),m.push(M.numSunLightShadows),m.push(M.numDirLightShadows),m.push(M.numPointLightShadows),m.push(M.numSpotLightShadows),m.push(M.numSpotLightShadowsWithMaps),m.push(M.numLightProbes),m.push(M.shadowMapType),m.push(M.toneMapping),m.push(M.numClippingPlanes),m.push(M.numClipIntersection),m.push(M.depthPacking)}function T(m,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),m.push(a.mask)}function R(m){let M=p[m.type],A;if(M){let C=zn[M];A=Jn.clone(C.uniforms)}else A=m.uniforms;return A}function b(m,M){let A=u.get(M);return A!==void 0?++A.usedTimes:(A=new lg(i,M,m,s),c.push(A),u.set(M,A)),A}function _(m){if(--m.usedTimes===0){let M=c.indexOf(m);c[M]=c[c.length-1],c.pop(),u.delete(m.cacheKey),m.destroy()}}function S(m){o.remove(m)}function E(){o.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:R,acquireProgram:b,releaseProgram:_,releaseShaderCache:S,programs:c,dispose:E}}function dg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function fg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function yu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,v,w,g,f){let T=i[e];return T===void 0?(T={id:h.id,object:h,geometry:p,material:v,materialVariant:a(h),groupOrder:w,renderOrder:h.renderOrder,z:g,group:f},i[e]=T):(T.id=h.id,T.object=h,T.geometry=p,T.material=v,T.materialVariant=a(h),T.groupOrder=w,T.renderOrder=h.renderOrder,T.z=g,T.group=f),e++,T}function l(h,p,v,w,g,f,T){T.reversedDepth===!0&&(g=-g);let R=o(h,p,v,w,g,f);v.transmission>0?n.push(R):v.transparent===!0?s.push(R):t.push(R)}function c(h,p,v,w,g,f){let T=o(h,p,v,w,g,f);v.transmission>0?n.unshift(T):v.transparent===!0?s.unshift(T):t.unshift(T)}function u(h,p){t.length>1&&t.sort(h||fg),n.length>1&&n.sort(p||yu),s.length>1&&s.sort(p||yu)}function d(){for(let h=e,p=i.length;h<p;h++){let v=i[h];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function pg(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new bu,i.set(n,[a])):s>=r.length?(a=new bu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function mg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new Qe};break;case"SpotLight":t={position:new H,direction:new H,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function gg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var vg=0;function xg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _g(i){let e=new mg,t=gg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let s=new H,r=new Rt,a=new Rt;function o(c){let u=0,d=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,v=0,w=0,g=0,f=0,T=0,R=0,b=0,_=0,S=0,E=0,m=0,M=0,A=0;c.sort(xg);for(let N=0,F=c.length;N<F;N++){let P=c[N],V=P.color,K=P.intensity,G=P.distance,Q=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===vi?Q=P.shadow.map.texture:Q=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=V.r*K,d+=V.g*K,h+=V.b*K;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],K);A++}else if(P.isSunLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let k=P.shadow,U=t.get(P);U.shadowIntensity=k.intensity,U.shadowBias=k.bias,U.shadowNormalBias=k.normalBias,U.shadowRadius=k.radius,U.shadowMapSize.copy(k.mapSize).multiply(k.getFrameExtents()),n.sunShadow[v]=U,n.sunShadowMap[v]=Q;let le=k.getViewportCount();for(let ee=0;ee<le;ee++)n.sunShadowMatrix[w+ee]=k.getMatrix(ee),n.sunShadowCascade[w+ee]=k._cascadeData[ee];w+=le,v++}n.sun[p]=q,p++}else if(P.isDirectionalLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let k=P.shadow,U=t.get(P);U.shadowIntensity=k.intensity,U.shadowBias=k.bias,U.shadowNormalBias=k.normalBias,U.shadowRadius=k.radius,U.shadowMapSize=k.mapSize,n.directionalShadow[g]=U,n.directionalShadowMap[g]=Q,n.directionalShadowMatrix[g]=P.shadow.matrix,_++}n.directional[g]=q,g++}else if(P.isSpotLight){let q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(V).multiplyScalar(K),q.distance=G,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[T]=q;let k=P.shadow;if(P.map&&(n.spotLightMap[m]=P.map,m++,k.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[T]=k.matrix,P.castShadow){let U=t.get(P);U.shadowIntensity=k.intensity,U.shadowBias=k.bias,U.shadowNormalBias=k.normalBias,U.shadowRadius=k.radius,U.shadowMapSize=k.mapSize,n.spotShadow[T]=U,n.spotShadowMap[T]=Q,E++}T++}else if(P.isRectAreaLight){let q=e.get(P);q.color.copy(V).multiplyScalar(K),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[R]=q,R++}else if(P.isPointLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){let k=P.shadow,U=t.get(P);U.shadowIntensity=k.intensity,U.shadowBias=k.bias,U.shadowNormalBias=k.normalBias,U.shadowRadius=k.radius,U.shadowMapSize=k.mapSize,U.shadowCameraNear=k.camera.near,U.shadowCameraFar=k.camera.far,n.pointShadow[f]=U,n.pointShadowMap[f]=Q,n.pointShadowMatrix[f]=P.shadow.matrix,S++}n.point[f]=q,f++}else if(P.isHemisphereLight){let q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(K),q.groundColor.copy(P.groundColor).multiplyScalar(K),n.hemi[b]=q,b++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let C=n.hash;(C.sunLength!==p||C.directionalLength!==g||C.pointLength!==f||C.spotLength!==T||C.rectAreaLength!==R||C.hemiLength!==b||C.numSunShadows!==v||C.numDirectionalShadows!==_||C.numPointShadows!==S||C.numSpotShadows!==E||C.numSpotMaps!==m||C.numLightProbes!==A)&&(n.sun.length=p,n.directional.length=g,n.spot.length=T,n.rectArea.length=R,n.point.length=f,n.hemi.length=b,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=w,n.sunShadowCascade.length=w,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.directionalShadowMatrix.length=_,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+m-M,n.spotLightMap.length=m,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=A,C.sunLength=p,C.directionalLength=g,C.pointLength=f,C.spotLength=T,C.rectAreaLength=R,C.hemiLength=b,C.numSunShadows=v,C.numDirectionalShadows=_,C.numPointShadows=S,C.numSpotShadows=E,C.numSpotMaps=m,C.numLightProbes=A,n.version=vg++)}function l(c,u){let d=0,h=0,p=0,v=0,w=0,g=0,f=u.matrixWorldInverse;for(let T=0,R=c.length;T<R;T++){let b=c[T];if(b.isSunLight){let _=n.sun[d];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(f),d++}else if(b.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(f),h++}else if(b.isSpotLight){let _=n.spot[v];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(f),v++}else if(b.isRectAreaLight){let _=n.rectArea[w];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(f),a.identity(),r.copy(b.matrixWorld),r.premultiply(f),a.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),w++}else if(b.isPointLight){let _=n.point[p];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){let _=n.hemi[g];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(f),g++}}}return{setup:o,setupView:l,state:n}}function Mu(i){let e=new _g(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function yg(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Mu(i),e.set(s,[o])):r>=a.length?(o=new Mu(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var bg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Sg=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],wg=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Su=new Rt,ur=new H,bl=new H;function Tg(i,e,t){let n=new Bs,s=new Ye,r=new Ye,a=new Lt,o=new ea,l=new ta,c={},u=t.maxTextureSize,d={[di]:Xt,[Xt]:di,[kn]:kn},h=new It({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:bg,fragmentShader:Mg}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let v=new jt;v.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let w=new Qt(v,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ys;let f=this.type;this.render=function(S,E,m){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===xc&&($e("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ys);let M=i.getRenderTarget(),A=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(yn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let F=f!==this.type;F&&E.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(V=>V.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,V=S.length;P<V;P++){let K=S[P],G=K.shadow;if(G===void 0){$e("WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let Q=G.getFrameExtents();s.multiply(Q),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,G.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=q,G.map===null||F===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===rs){if(K.isPointLight){$e("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Ft(s.x,s.y,{format:vi,type:$t,minFilter:Wt,magFilter:Wt,generateMipmaps:!1}),G.map.texture.name=K.name+".shadowMap",G.map.depthTexture=new li(s.x,s.y,Pn),G.map.depthTexture.name=K.name+".shadowMapDepth",G.map.depthTexture.format=Nn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Gt,G.map.depthTexture.magFilter=Gt}else K.isPointLight?(G.map=new ro(s.x),G.map.depthTexture=new Qr(s.x,In)):(G.map=new Ft(s.x,s.y),G.map.depthTexture=new li(s.x,s.y,In)),G.map.depthTexture.name=K.name+".shadowMap",G.map.depthTexture.format=Nn,this.type===Ys?(G.map.depthTexture.compareFunction=q?eo:Qa,G.map.depthTexture.minFilter=Wt,G.map.depthTexture.magFilter=Wt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Gt,G.map.depthTexture.magFilter=Gt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let k=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();K.isPointLight!==!0&&G.updateMatrices(K,m);for(let U=0;U<k;U++){let le=G.getCamera(U);if(K.isPointLight){let ee=G.camera,we=G.matrix,Ee=K.distance||ee.far;Ee!==ee.far&&(ee.far=Ee,ee.updateProjectionMatrix()),ur.setFromMatrixPosition(K.matrixWorld),ee.position.copy(ur),bl.copy(ee.position),bl.add(Sg[U]),ee.up.copy(wg[U]),ee.lookAt(bl),ee.updateMatrixWorld(),we.makeTranslation(-ur.x,-ur.y,-ur.z),Su.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Su,ee.coordinateSystem,ee.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,U),i.clear();else{U===0&&(i.setRenderTarget(G.map),i.clear());let ee=G.getViewport(U);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),N.viewport(a)}n=G.getFrustum(U),b(E,m,le,K,this.type)}G.isPointLightShadow!==!0&&this.type===rs&&T(G,m),G.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(M,A,C)};function T(S,E){let m=e.update(w);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null?S.mapPass=new Ft(s.x,s.y,{format:vi,type:$t}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(E,null,m,h,w,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value.set(S.map.width,S.map.height),p.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(E,null,m,p,w,null)}function R(S,E,m,M){let A=null,C=m.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)A=C;else if(A=m.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let N=A.uuid,F=E.uuid,P=c[N];P===void 0&&(P={},c[N]=P);let V=P[F];V===void 0&&(V=A.clone(),P[F]=V,E.addEventListener("dispose",_)),A=V}if(A.visible=E.visible,A.wireframe=E.wireframe,M===rs?A.side=E.shadowSide!==null?E.shadowSide:E.side:A.side=E.shadowSide!==null?E.shadowSide:d[E.side],A.alphaMap=E.alphaMap,A.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,A.map=E.map,A.clipShadows=E.clipShadows,A.clippingPlanes=E.clippingPlanes,A.clipIntersection=E.clipIntersection,A.displacementMap=E.displacementMap,A.displacementScale=E.displacementScale,A.displacementBias=E.displacementBias,A.wireframeLinewidth=E.wireframeLinewidth,A.linewidth=E.linewidth,m.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let N=i.properties.get(A);N.light=m}return A}function b(S,E,m,M,A){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===rs)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,S.matrixWorld);let F=e.update(S),P=S.material;if(Array.isArray(P)){let V=F.groups;for(let K=0,G=V.length;K<G;K++){let Q=V[K],q=P[Q.materialIndex];if(q&&q.visible){let k=R(S,q,M,A);S.onBeforeShadow(i,S,E,m,F,k,Q),i.renderBufferDirect(m,null,F,k,S,Q),S.onAfterShadow(i,S,E,m,F,k,Q)}}}else if(P.visible){let V=R(S,P,M,A);S.onBeforeShadow(i,S,E,m,F,V,null),i.renderBufferDirect(m,null,F,V,S,null),S.onAfterShadow(i,S,E,m,F,V,null)}}let N=S.children;for(let F=0,P=N.length;F<P;F++)b(N[F],E,m,M,A)}function _(S){S.target.removeEventListener("dispose",_);for(let m in c){let M=c[m],A=S.target.uuid;A in M&&(M[A].dispose(),delete M[A])}}}function Eg(i,e){function t(){let O=!1,fe=new Lt,se=null,me=new Lt(0,0,0,0);return{setMask:function(Se){se!==Se&&!O&&(i.colorMask(Se,Se,Se,Se),se=Se)},setLocked:function(Se){O=Se},setClear:function(Se,ce,ze,Fe,bt){bt===!0&&(Se*=Fe,ce*=Fe,ze*=Fe),fe.set(Se,ce,ze,Fe),me.equals(fe)===!1&&(i.clearColor(Se,ce,ze,Fe),me.copy(fe))},reset:function(){O=!1,se=null,me.set(-1,0,0,0)}}}function n(){let O=!1,fe=!1,se=null,me=null,Se=null;return{setReversed:function(ce){if(fe!==ce){let ze=e.get("EXT_clip_control");ce?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),fe=ce;let Fe=Se;Se=null,this.setClear(Fe)}},getReversed:function(){return fe},setTest:function(ce){ce?L(i.DEPTH_TEST):re(i.DEPTH_TEST)},setMask:function(ce){se!==ce&&!O&&(i.depthMask(ce),se=ce)},setFunc:function(ce){if(fe&&(ce=Qc[ce]),me!==ce){switch(ce){case kr:i.depthFunc(i.NEVER);break;case Br:i.depthFunc(i.ALWAYS);break;case zr:i.depthFunc(i.LESS);break;case ji:i.depthFunc(i.LEQUAL);break;case Vr:i.depthFunc(i.EQUAL);break;case Hr:i.depthFunc(i.GEQUAL);break;case Gr:i.depthFunc(i.GREATER);break;case Wr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=ce}},setLocked:function(ce){O=ce},setClear:function(ce){Se!==ce&&(Se=ce,fe&&(ce=1-ce),i.clearDepth(ce))},reset:function(){O=!1,se=null,me=null,Se=null,fe=!1}}}function s(){let O=!1,fe=null,se=null,me=null,Se=null,ce=null,ze=null,Fe=null,bt=null;return{setTest:function(st){O||(st?L(i.STENCIL_TEST):re(i.STENCIL_TEST))},setMask:function(st){fe!==st&&!O&&(i.stencilMask(st),fe=st)},setFunc:function(st,rn,an){(se!==st||me!==rn||Se!==an)&&(i.stencilFunc(st,rn,an),se=st,me=rn,Se=an)},setOp:function(st,rn,an){(ce!==st||ze!==rn||Fe!==an)&&(i.stencilOp(st,rn,an),ce=st,ze=rn,Fe=an)},setLocked:function(st){O=st},setClear:function(st){bt!==st&&(i.clearStencil(st),bt=st)},reset:function(){O=!1,fe=null,se=null,me=null,Se=null,ce=null,ze=null,Fe=null,bt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},p=new WeakMap,v=[],w=null,g=!1,f=null,T=null,R=null,b=null,_=null,S=null,E=null,m=new Qe(0,0,0),M=0,A=!1,C=null,N=null,F=null,P=null,V=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,Q=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(q)[1]),G=Q>=1):q.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),G=Q>=2);let k=null,U={},le=i.getParameter(i.SCISSOR_BOX),ee=i.getParameter(i.VIEWPORT),we=new Lt().fromArray(le),Ee=new Lt().fromArray(ee);function Be(O,fe,se,me){let Se=new Uint8Array(4),ce=i.createTexture();i.bindTexture(O,ce),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<se;ze++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(fe+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return ce}let j={};j[i.TEXTURE_2D]=Be(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),L(i.DEPTH_TEST),a.setFunc(ji),Ge(!1),Ke(Yo),L(i.CULL_FACE),Pe(yn);function L(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function re(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function ae(O,fe){return h[O]!==fe?(i.bindFramebuffer(O,fe),h[O]=fe,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=fe),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function oe(O,fe){let se=v,me=!1;if(O){se=p.get(fe),se===void 0&&(se=[],p.set(fe,se));let Se=O.textures;if(se.length!==Se.length||se[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,ze=Se.length;ce<ze;ce++)se[ce]=i.COLOR_ATTACHMENT0+ce;se.length=Se.length,me=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,me=!0);me&&i.drawBuffers(se)}function Ie(O){return w!==O?(i.useProgram(O),w=O,!0):!1}let We={[Ai]:i.FUNC_ADD,[yc]:i.FUNC_SUBTRACT,[bc]:i.FUNC_REVERSE_SUBTRACT};We[Mc]=i.MIN,We[Sc]=i.MAX;let Ae={[wc]:i.ZERO,[Tc]:i.ONE,[Ec]:i.SRC_COLOR,[Ko]:i.SRC_ALPHA,[Lc]:i.SRC_ALPHA_SATURATE,[Ic]:i.DST_COLOR,[Cc]:i.DST_ALPHA,[Ac]:i.ONE_MINUS_SRC_COLOR,[jo]:i.ONE_MINUS_SRC_ALPHA,[Pc]:i.ONE_MINUS_DST_COLOR,[Rc]:i.ONE_MINUS_DST_ALPHA,[Dc]:i.CONSTANT_COLOR,[Nc]:i.ONE_MINUS_CONSTANT_COLOR,[Uc]:i.CONSTANT_ALPHA,[Fc]:i.ONE_MINUS_CONSTANT_ALPHA};function Pe(O,fe,se,me,Se,ce,ze,Fe,bt,st){if(O===yn){g===!0&&(re(i.BLEND),g=!1);return}if(g===!1&&(L(i.BLEND),g=!0),O!==_c){if(O!==f||st!==A){if((T!==Ai||_!==Ai)&&(i.blendEquation(i.FUNC_ADD),T=Ai,_=Ai),st)switch(O){case as:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fi:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",O);break}else switch(O){case as:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",O);break}R=null,b=null,S=null,E=null,m.set(0,0,0),M=0,f=O,A=st}return}Se=Se||fe,ce=ce||se,ze=ze||me,(fe!==T||Se!==_)&&(i.blendEquationSeparate(We[fe],We[Se]),T=fe,_=Se),(se!==R||me!==b||ce!==S||ze!==E)&&(i.blendFuncSeparate(Ae[se],Ae[me],Ae[ce],Ae[ze]),R=se,b=me,S=ce,E=ze),(Fe.equals(m)===!1||bt!==M)&&(i.blendColor(Fe.r,Fe.g,Fe.b,bt),m.copy(Fe),M=bt),f=O,A=!1}function He(O,fe){O.side===kn?re(i.CULL_FACE):L(i.CULL_FACE);let se=O.side===Xt;fe&&(se=!se),Ge(se),O.blending===as&&O.transparent===!1?Pe(yn):Pe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let me=O.stencilWrite;o.setTest(me),me&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Pt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?L(i.SAMPLE_ALPHA_TO_COVERAGE):re(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(O){C!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),C=O)}function Ke(O){O!==gc?(L(i.CULL_FACE),O!==N&&(O===Yo?i.cullFace(i.BACK):O===vc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):re(i.CULL_FACE),N=O}function ft(O){O!==F&&(G&&i.lineWidth(O),F=O)}function Pt(O,fe,se){O?(L(i.POLYGON_OFFSET_FILL),(P!==fe||V!==se)&&(P=fe,V=se,a.getReversed()&&(fe=-fe),i.polygonOffset(fe,se))):re(i.POLYGON_OFFSET_FILL)}function xt(O){O?L(i.SCISSOR_TEST):re(i.SCISSOR_TEST)}function Ct(O){O===void 0&&(O=i.TEXTURE0+K-1),k!==O&&(i.activeTexture(O),k=O)}function B(O,fe,se){se===void 0&&(k===null?se=i.TEXTURE0+K-1:se=k);let me=U[se];me===void 0&&(me={type:void 0,texture:void 0},U[se]=me),(me.type!==O||me.texture!==fe)&&(k!==se&&(i.activeTexture(se),k=se),i.bindTexture(O,fe||j[O]),me.type=O,me.texture=fe)}function zt(){let O=U[k];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function gt(){try{i.compressedTexImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function x(){try{i.texSubImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function z(){try{i.texSubImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function ne(){try{i.compressedTexSubImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function de(){try{i.texStorage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function _e(){try{i.texStorage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function te(){try{i.texImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function ie(){try{i.texImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function ge(O){return d[O]!==void 0?d[O]:i.getParameter(O)}function Ue(O,fe){d[O]!==fe&&(i.pixelStorei(O,fe),d[O]=fe)}function ye(O){we.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),we.copy(O))}function pe(O){Ee.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Ee.copy(O))}function Oe(O,fe){let se=c.get(fe);se===void 0&&(se=new WeakMap,c.set(fe,se));let me=se.get(O);me===void 0&&(me=i.getUniformBlockIndex(fe,O.name),se.set(O,me))}function Ve(O,fe){let me=c.get(fe).get(O);l.get(fe)!==me&&(i.uniformBlockBinding(fe,me,O.__bindingPointIndex),l.set(fe,me))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},k=null,U={},h={},p=new WeakMap,v=[],w=null,g=!1,f=null,T=null,R=null,b=null,_=null,S=null,E=null,m=new Qe(0,0,0),M=0,A=!1,C=null,N=null,F=null,P=null,V=null,we.set(0,0,i.canvas.width,i.canvas.height),Ee.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:L,disable:re,bindFramebuffer:ae,drawBuffers:oe,useProgram:Ie,setBlending:Pe,setMaterial:He,setFlipSided:Ge,setCullFace:Ke,setLineWidth:ft,setPolygonOffset:Pt,setScissorTest:xt,activeTexture:Ct,bindTexture:B,unbindTexture:zt,compressedTexImage2D:gt,compressedTexImage3D:I,texImage2D:te,texImage3D:ie,pixelStorei:Ue,getParameter:ge,updateUBOMapping:Oe,uniformBlockBinding:Ve,texStorage2D:de,texStorage3D:_e,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:Y,compressedTexSubImage3D:ne,scissor:ye,viewport:pe,reset:qe}}function Ag(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,u=new WeakMap,d=new Set,h,p=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(I,x){return v?new OffscreenCanvas(I,x):Ls("canvas")}function g(I,x,z){let Y=1,ne=gt(I);if((ne.width>z||ne.height>z)&&(Y=z/Math.max(ne.width,ne.height)),Y<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let de=Math.floor(Y*ne.width),_e=Math.floor(Y*ne.height);h===void 0&&(h=w(de,_e));let te=x?w(de,_e):h;return te.width=de,te.height=_e,te.getContext("2d").drawImage(I,0,0,de,_e),$e("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+de+"x"+_e+")."),te}else return"data"in I&&$e("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),I;return I}function f(I){return I.generateMipmaps}function T(I){i.generateMipmap(I)}function R(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(I,x,z,Y,ne,de=!1){if(I!==null){if(i[I]!==void 0)return i[I];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let _e;Y&&(_e=e.get("EXT_texture_norm16"),_e||$e("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=x;if(x===i.RED&&(z===i.FLOAT&&(te=i.R32F),z===i.HALF_FLOAT&&(te=i.R16F),z===i.UNSIGNED_BYTE&&(te=i.R8),z===i.UNSIGNED_SHORT&&_e&&(te=_e.R16_EXT),z===i.SHORT&&_e&&(te=_e.R16_SNORM_EXT)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(te=i.R8UI),z===i.UNSIGNED_SHORT&&(te=i.R16UI),z===i.UNSIGNED_INT&&(te=i.R32UI),z===i.BYTE&&(te=i.R8I),z===i.SHORT&&(te=i.R16I),z===i.INT&&(te=i.R32I)),x===i.RG&&(z===i.FLOAT&&(te=i.RG32F),z===i.HALF_FLOAT&&(te=i.RG16F),z===i.UNSIGNED_BYTE&&(te=i.RG8),z===i.UNSIGNED_SHORT&&_e&&(te=_e.RG16_EXT),z===i.SHORT&&_e&&(te=_e.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(te=i.RG8UI),z===i.UNSIGNED_SHORT&&(te=i.RG16UI),z===i.UNSIGNED_INT&&(te=i.RG32UI),z===i.BYTE&&(te=i.RG8I),z===i.SHORT&&(te=i.RG16I),z===i.INT&&(te=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(te=i.RGB8UI),z===i.UNSIGNED_SHORT&&(te=i.RGB16UI),z===i.UNSIGNED_INT&&(te=i.RGB32UI),z===i.BYTE&&(te=i.RGB8I),z===i.SHORT&&(te=i.RGB16I),z===i.INT&&(te=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),z===i.UNSIGNED_INT&&(te=i.RGBA32UI),z===i.BYTE&&(te=i.RGBA8I),z===i.SHORT&&(te=i.RGBA16I),z===i.INT&&(te=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_SHORT&&_e&&(te=_e.RGB16_EXT),z===i.SHORT&&_e&&(te=_e.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),x===i.RGBA){let ie=de?Is:ot.getTransfer(ne);z===i.FLOAT&&(te=i.RGBA32F),z===i.HALF_FLOAT&&(te=i.RGBA16F),z===i.UNSIGNED_BYTE&&(te=ie===mt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&_e&&(te=_e.RGBA16_EXT),z===i.SHORT&&_e&&(te=_e.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function _(I,x){let z;return I?x===null||x===In||x===ls?z=i.DEPTH24_STENCIL8:x===Pn?z=i.DEPTH32F_STENCIL8:x===os&&(z=i.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===In||x===ls?z=i.DEPTH_COMPONENT24:x===Pn?z=i.DEPTH_COMPONENT32F:x===os&&(z=i.DEPTH_COMPONENT16),z}function S(I,x){return f(I)===!0||I.isFramebufferTexture&&I.minFilter!==Gt&&I.minFilter!==Wt?Math.log2(Math.max(x.width,x.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?x.mipmaps.length:1}function E(I){let x=I.target;x.removeEventListener("dispose",E),M(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&d.delete(x)}function m(I){let x=I.target;x.removeEventListener("dispose",m),C(x)}function M(I){let x=n.get(I);if(x.__webglInit===void 0)return;let z=I.source,Y=p.get(z);if(Y){let ne=Y[x.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&A(I),Object.keys(Y).length===0&&p.delete(z)}n.remove(I)}function A(I){let x=n.get(I);i.deleteTexture(x.__webglTexture);let z=I.source,Y=p.get(z);delete Y[x.__cacheKey],a.memory.textures--}function C(I){let x=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let ne=0;ne<x.__webglFramebuffer[Y].length;ne++)i.deleteFramebuffer(x.__webglFramebuffer[Y][ne]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=I.textures;for(let Y=0,ne=z.length;Y<ne;Y++){let de=n.get(z[Y]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove(z[Y])}n.remove(I)}let N=0;function F(){N=0}function P(){return N}function V(I){N=I}function K(){let I=N;return I>=s.maxTextures&&$e("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,I}function G(I){let x=[];return x.push(I.wrapS),x.push(I.wrapT),x.push(I.wrapR||0),x.push(I.magFilter),x.push(I.minFilter),x.push(I.anisotropy),x.push(I.internalFormat),x.push(I.format),x.push(I.type),x.push(I.generateMipmaps),x.push(I.premultiplyAlpha),x.push(I.flipY),x.push(I.unpackAlignment),x.push(I.colorSpace),x.join()}function Q(I,x){let z=n.get(I);if(I.isVideoTexture&&B(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&z.__version!==I.version){let Y=I.image;if(Y===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{re(z,I,x);return}}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function q(I,x){let z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){re(z,I,x);return}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function k(I,x){let z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){re(z,I,x);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function U(I,x){let z=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&z.__version!==I.version){ae(z,I,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}let le={[Xr]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[$r]:i.MIRRORED_REPEAT},ee={[Gt]:i.NEAREST,[Bc]:i.NEAREST_MIPMAP_NEAREST,[nr]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[ga]:i.LINEAR_MIPMAP_NEAREST,[mi]:i.LINEAR_MIPMAP_LINEAR},we={[Gc]:i.NEVER,[Yc]:i.ALWAYS,[Wc]:i.LESS,[Qa]:i.LEQUAL,[Xc]:i.EQUAL,[eo]:i.GEQUAL,[$c]:i.GREATER,[qc]:i.NOTEQUAL};function Ee(I,x){if(x.type===Pn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Wt||x.magFilter===ga||x.magFilter===nr||x.magFilter===mi||x.minFilter===Wt||x.minFilter===ga||x.minFilter===nr||x.minFilter===mi)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,le[x.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,le[x.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,le[x.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ee[x.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ee[x.minFilter]),x.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,we[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Gt||x.minFilter!==nr&&x.minFilter!==mi||x.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Be(I,x){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,x.addEventListener("dispose",E));let Y=x.source,ne=p.get(Y);ne===void 0&&(ne={},p.set(Y,ne));let de=G(x);if(de!==I.__cacheKey){ne[de]===void 0&&(ne[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ne[de].usedTimes++;let _e=ne[I.__cacheKey];_e!==void 0&&(ne[I.__cacheKey].usedTimes--,_e.usedTimes===0&&A(x)),I.__cacheKey=de,I.__webglTexture=ne[de].texture}return z}function j(I,x,z){return Math.floor(Math.floor(I/z)/x)}function L(I,x,z,Y){let de=I.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{de.sort((Ue,ye)=>Ue.start-ye.start);let _e=0;for(let Ue=1;Ue<de.length;Ue++){let ye=de[_e],pe=de[Ue],Oe=ye.start+ye.count,Ve=j(pe.start,x.width,4),qe=j(ye.start,x.width,4);pe.start<=Oe+1&&Ve===qe&&j(pe.start+pe.count-1,x.width,4)===Ve?ye.count=Math.max(ye.count,pe.start+pe.count-ye.start):(++_e,de[_e]=pe)}de.length=_e+1;let te=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Ue=0,ye=de.length;Ue<ye;Ue++){let pe=de[Ue],Oe=Math.floor(pe.start/4),Ve=Math.ceil(pe.count/4),qe=Oe%x.width,O=Math.floor(Oe/x.width),fe=Ve,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),t.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,qe,O,fe,se,z,Y,x.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function re(I,x,z){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);let ne=Be(I,x),de=x.source;t.bindTexture(Y,I.__webglTexture,i.TEXTURE0+z);let _e=n.get(de);if(de.version!==_e.__version||ne===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let se=ot.getPrimaries(ot.workingColorSpace),me=x.colorSpace===Zn?null:ot.getPrimaries(x.colorSpace),Se=x.colorSpace===Zn||se===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ie=g(x.image,!1,s.maxTextureSize);ie=zt(x,ie);let ge=r.convert(x.format,x.colorSpace),Ue=r.convert(x.type),ye=b(x.internalFormat,ge,Ue,x.normalized,x.colorSpace,x.isVideoTexture);Ee(Y,x);let pe,Oe=x.mipmaps,Ve=x.isVideoTexture!==!0,qe=_e.__version===void 0||ne===!0,O=de.dataReady,fe=S(x,ie);if(x.isDepthTexture)ye=_(x.format===gi,x.type),qe&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ye,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,ye,ie.width,ie.height,0,ge,Ue,null));else if(x.isDataTexture)if(Oe.length>0){Ve&&qe&&t.texStorage2D(i.TEXTURE_2D,fe,ye,Oe[0].width,Oe[0].height);for(let se=0,me=Oe.length;se<me;se++)pe=Oe[se],Ve?O&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,Ue,pe.data):t.texImage2D(i.TEXTURE_2D,se,ye,pe.width,pe.height,0,ge,Ue,pe.data);x.generateMipmaps=!1}else Ve?(qe&&t.texStorage2D(i.TEXTURE_2D,fe,ye,ie.width,ie.height),O&&L(x,ie,ge,Ue)):t.texImage2D(i.TEXTURE_2D,0,ye,ie.width,ie.height,0,ge,Ue,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ve&&qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ye,Oe[0].width,Oe[0].height,ie.depth);for(let se=0,me=Oe.length;se<me;se++)if(pe=Oe[se],x.format!==bn)if(ge!==null)if(Ve){if(O)if(x.layerUpdates.size>0){let Se=ml(pe.width,pe.height,x.format,x.type);for(let ce of x.layerUpdates){let ze=pe.data.subarray(ce*Se/pe.data.BYTES_PER_ELEMENT,(ce+1)*Se/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,ce,pe.width,pe.height,1,ge,ze)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,ie.depth,ge,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,ye,pe.width,pe.height,ie.depth,0,pe.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,ie.depth,ge,Ue,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,ye,pe.width,pe.height,ie.depth,0,ge,Ue,pe.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ve&&qe&&t.texStorage2D(i.TEXTURE_2D,fe,ye,Oe[0].width,Oe[0].height);for(let se=0,me=Oe.length;se<me;se++)pe=Oe[se],x.format!==bn?ge!==null?Ve?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,se,ye,pe.width,pe.height,0,pe.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?O&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,Ue,pe.data):t.texImage2D(i.TEXTURE_2D,se,ye,pe.width,pe.height,0,ge,Ue,pe.data)}else if(x.isDataArrayTexture)if(Ve){if(qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ye,ie.width,ie.height,ie.depth),O)if(x.layerUpdates.size>0){let se=ml(ie.width,ie.height,x.format,x.type);for(let me of x.layerUpdates){let Se=ie.data.subarray(me*se/ie.data.BYTES_PER_ELEMENT,(me+1)*se/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ie.width,ie.height,1,ge,Ue,Se)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ge,Ue,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ye,ie.width,ie.height,ie.depth,0,ge,Ue,ie.data);else if(x.isData3DTexture)Ve?(qe&&t.texStorage3D(i.TEXTURE_3D,fe,ye,ie.width,ie.height,ie.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ge,Ue,ie.data)):t.texImage3D(i.TEXTURE_3D,0,ye,ie.width,ie.height,ie.depth,0,ge,Ue,ie.data);else if(x.isFramebufferTexture){if(qe)if(Ve)t.texStorage2D(i.TEXTURE_2D,fe,ye,ie.width,ie.height);else{let se=ie.width,me=ie.height;for(let Se=0;Se<fe;Se++)t.texImage2D(i.TEXTURE_2D,Se,ye,se,me,0,ge,Ue,null),se>>=1,me>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),ie.parentNode!==se){se.appendChild(ie),d.add(x),se.onpaint=me=>{let Se=me.changedElements;for(let ce of d)Se.includes(ce.image)&&(ce.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{let Se=i.RGBA,ce=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,ce,ze,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Oe.length>0){if(Ve&&qe){let se=gt(Oe[0]);t.texStorage2D(i.TEXTURE_2D,fe,ye,se.width,se.height)}for(let se=0,me=Oe.length;se<me;se++)pe=Oe[se],Ve?O&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ge,Ue,pe):t.texImage2D(i.TEXTURE_2D,se,ye,ge,Ue,pe);x.generateMipmaps=!1}else if(Ve){if(qe){let se=gt(ie);t.texStorage2D(i.TEXTURE_2D,fe,ye,se.width,se.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Ue,ie)}else t.texImage2D(i.TEXTURE_2D,0,ye,ge,Ue,ie);f(x)&&T(Y),_e.__version=de.version,x.onUpdate&&x.onUpdate(x)}I.__version=x.version}function ae(I,x,z){if(x.image.length!==6)return;let Y=Be(I,x),ne=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+z);let de=n.get(ne);if(ne.version!==de.__version||Y===!0){t.activeTexture(i.TEXTURE0+z);let _e=ot.getPrimaries(ot.workingColorSpace),te=x.colorSpace===Zn?null:ot.getPrimaries(x.colorSpace),ie=x.colorSpace===Zn||_e===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let ge=x.isCompressedTexture||x.image[0].isCompressedTexture,Ue=x.image[0]&&x.image[0].isDataTexture,ye=[];for(let ce=0;ce<6;ce++)!ge&&!Ue?ye[ce]=g(x.image[ce],!0,s.maxCubemapSize):ye[ce]=Ue?x.image[ce].image:x.image[ce],ye[ce]=zt(x,ye[ce]);let pe=ye[0],Oe=r.convert(x.format,x.colorSpace),Ve=r.convert(x.type),qe=b(x.internalFormat,Oe,Ve,x.normalized,x.colorSpace),O=x.isVideoTexture!==!0,fe=de.__version===void 0||Y===!0,se=ne.dataReady,me=S(x,pe);Ee(i.TEXTURE_CUBE_MAP,x);let Se;if(ge){O&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,qe,pe.width,pe.height);for(let ce=0;ce<6;ce++){Se=ye[ce].mipmaps;for(let ze=0;ze<Se.length;ze++){let Fe=Se[ze];x.format!==bn?Oe!==null?O?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,0,0,Fe.width,Fe.height,Oe,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,qe,Fe.width,Fe.height,0,Fe.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,0,0,Fe.width,Fe.height,Oe,Ve,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,qe,Fe.width,Fe.height,0,Oe,Ve,Fe.data)}}}else{if(Se=x.mipmaps,O&&fe){Se.length>0&&me++;let ce=gt(ye[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,qe,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(Ue){O?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ye[ce].width,ye[ce].height,Oe,Ve,ye[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,qe,ye[ce].width,ye[ce].height,0,Oe,Ve,ye[ce].data);for(let ze=0;ze<Se.length;ze++){let bt=Se[ze].image[ce].image;O?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,0,0,bt.width,bt.height,Oe,Ve,bt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,qe,bt.width,bt.height,0,Oe,Ve,bt.data)}}else{O?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Oe,Ve,ye[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,qe,Oe,Ve,ye[ce]);for(let ze=0;ze<Se.length;ze++){let Fe=Se[ze];O?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,0,0,Oe,Ve,Fe.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,qe,Oe,Ve,Fe.image[ce])}}}f(x)&&T(i.TEXTURE_CUBE_MAP),de.__version=ne.version,x.onUpdate&&x.onUpdate(x)}I.__version=x.version}function oe(I,x,z,Y,ne,de){let _e=r.convert(z.format,z.colorSpace),te=r.convert(z.type),ie=b(z.internalFormat,_e,te,z.normalized,z.colorSpace),ge=n.get(x),Ue=n.get(z);if(Ue.__renderTarget=x,!ge.__hasExternalTextures){let ye=Math.max(1,x.width>>de),pe=Math.max(1,x.height>>de);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,de,ie,ye,pe,x.depth,0,_e,te,null):t.texImage2D(ne,de,ie,ye,pe,0,_e,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Ct(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,ne,Ue.__webglTexture,0,xt(x)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,ne,Ue.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(I,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,I),x.depthBuffer){let Y=x.depthTexture,ne=Y&&Y.isDepthTexture?Y.type:null,de=_(x.stencilBuffer,ne),_e=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ct(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(x),de,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(x),de,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,de,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,I)}else{let Y=x.textures;for(let ne=0;ne<Y.length;ne++){let de=Y[ne],_e=r.convert(de.format,de.colorSpace),te=r.convert(de.type),ie=b(de.internalFormat,_e,te,de.normalized,de.colorSpace);Ct(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(x),ie,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(x),ie,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ie,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function We(I,x,z){let Y=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ne=n.get(x.depthTexture);if(ne.__renderTarget=x,(!ne.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,x.depthTexture.addEventListener("dispose",E)),ne.__webglTexture===void 0){ne.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),Ee(i.TEXTURE_CUBE_MAP,x.depthTexture);let ge=r.convert(x.depthTexture.format),Ue=r.convert(x.depthTexture.type),ye;x.depthTexture.format===Nn?ye=i.DEPTH_COMPONENT24:x.depthTexture.format===gi&&(ye=i.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ye,x.width,x.height,0,ge,Ue,null)}}else Q(x.depthTexture,0);let de=ne.__webglTexture,_e=xt(x),te=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ie=x.depthTexture.format===gi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Nn)Ct(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,te,de,0,_e):i.framebufferTexture2D(i.FRAMEBUFFER,ie,te,de,0);else if(x.depthTexture.format===gi)Ct(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,te,de,0,_e):i.framebufferTexture2D(i.FRAMEBUFFER,ie,te,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ae(I){let x=n.get(I),z=I.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==I.depthTexture){let Y=I.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){let ne=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",ne)};Y.addEventListener("dispose",ne),x.__depthDisposeCallback=ne}x.__boundDepthTexture=Y}if(I.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let Y=0;Y<6;Y++)We(x.__webglFramebuffer[Y],I,Y);else{let Y=I.texture.mipmaps;Y&&Y.length>0?We(x.__webglFramebuffer[0],I,0):We(x.__webglFramebuffer,I,0)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),Ie(x.__webglDepthbuffer[Y],I,!1);else{let ne=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,de)}}else{let Y=I.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Ie(x.__webglDepthbuffer,I,!1);else{let ne=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,de)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(I,x,z){let Y=n.get(I);x!==void 0&&oe(Y.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ae(I)}function He(I){let x=I.texture,z=n.get(I),Y=n.get(x);I.addEventListener("dispose",m);let ne=I.textures,de=I.isWebGLCubeRenderTarget===!0,_e=ne.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,a.memory.textures++),de){z.__webglFramebuffer=[];for(let te=0;te<6;te++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[te]=[];for(let ie=0;ie<x.mipmaps.length;ie++)z.__webglFramebuffer[te][ie]=i.createFramebuffer()}else z.__webglFramebuffer[te]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let te=0;te<x.mipmaps.length;te++)z.__webglFramebuffer[te]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(_e)for(let te=0,ie=ne.length;te<ie;te++){let ge=n.get(ne[te]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Ct(I)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let te=0;te<ne.length;te++){let ie=ne[te];z.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[te]);let ge=r.convert(ie.format,ie.colorSpace),Ue=r.convert(ie.type),ye=b(ie.internalFormat,ge,Ue,ie.normalized,ie.colorSpace,I.isXRRenderTarget===!0),pe=xt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,ye,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,z.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(z.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Ee(i.TEXTURE_CUBE_MAP,x);for(let te=0;te<6;te++)if(x.mipmaps&&x.mipmaps.length>0)for(let ie=0;ie<x.mipmaps.length;ie++)oe(z.__webglFramebuffer[te][ie],I,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ie);else oe(z.__webglFramebuffer[te],I,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);f(x)&&T(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let te=0,ie=ne.length;te<ie;te++){let ge=ne[te],Ue=n.get(ge),ye=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ye=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ye,Ue.__webglTexture),Ee(ye,ge),oe(z.__webglFramebuffer,I,ge,i.COLOR_ATTACHMENT0+te,ye,0),f(ge)&&T(ye)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(te=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,Y.__webglTexture),Ee(te,x),x.mipmaps&&x.mipmaps.length>0)for(let ie=0;ie<x.mipmaps.length;ie++)oe(z.__webglFramebuffer[ie],I,x,i.COLOR_ATTACHMENT0,te,ie);else oe(z.__webglFramebuffer,I,x,i.COLOR_ATTACHMENT0,te,0);f(x)&&T(te),t.unbindTexture()}I.depthBuffer&&Ae(I)}function Ge(I){let x=I.textures;for(let z=0,Y=x.length;z<Y;z++){let ne=x[z];if(f(ne)){let de=R(I),_e=n.get(ne).__webglTexture;t.bindTexture(de,_e),T(de),t.unbindTexture()}}}let Ke=[],ft=[];function Pt(I){if(I.samples>0){if(Ct(I)===!1){let x=I.textures,z=I.width,Y=I.height,ne=i.COLOR_BUFFER_BIT,de=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(I),te=x.length>1;if(te)for(let ge=0;ge<x.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);let ie=I.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ge=0;ge<x.length;ge++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);let Ue=n.get(x[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ue,0)}i.blitFramebuffer(0,0,z,Y,0,0,z,Y,ne,i.NEAREST),l===!0&&(Ke.length=0,ft.length=0,Ke.push(i.COLOR_ATTACHMENT0+ge),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Ke.push(de),ft.push(de),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ft)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ke))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let ge=0;ge<x.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);let Ue=n.get(x[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,Ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){let x=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function xt(I){return Math.min(s.maxSamples,I.samples)}function Ct(I){let x=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function B(I){let x=a.render.frame;u.get(I)!==x&&(u.set(I,x),I.update())}function zt(I,x){let z=I.colorSpace,Y=I.format,ne=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==Rs&&z!==Zn&&(ot.getTransfer(z)===mt?(Y!==bn||ne!==vn)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",z)),x}function gt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=F,this.getTextureUnits=P,this.setTextureUnits=V,this.setTexture2D=Q,this.setTexture2DArray=q,this.setTexture3D=k,this.setTextureCube=U,this.rebindTextures=Pe,this.setupRenderTarget=He,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cg(i,e){function t(n,s=Zn){let r,a=ot.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===xa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_a)return i.UNSIGNED_SHORT_5_5_5_1;if(n===il)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===sl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===tl)return i.BYTE;if(n===nl)return i.SHORT;if(n===os)return i.UNSIGNED_SHORT;if(n===va)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===$t)return i.HALF_FLOAT;if(n===rl)return i.ALPHA;if(n===al)return i.RGB;if(n===bn)return i.RGBA;if(n===Nn)return i.DEPTH_COMPONENT;if(n===gi)return i.DEPTH_STENCIL;if(n===ol)return i.RED;if(n===ya)return i.RED_INTEGER;if(n===vi)return i.RG;if(n===ba)return i.RG_INTEGER;if(n===Ma)return i.RGBA_INTEGER;if(n===ir||n===sr||n===rr||n===ar)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sa||n===wa||n===Ta||n===Ea)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Aa||n===Ca||n===Ra||n===Ia||n===Pa||n===or||n===La)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Aa||n===Ca)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ra)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ia)return r.COMPRESSED_R11_EAC;if(n===Pa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===or)return r.COMPRESSED_RG11_EAC;if(n===La)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Da||n===Na||n===Ua||n===Fa||n===Oa||n===ka||n===Ba||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===$a)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Da)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Na)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ua)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fa)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oa)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ka)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===za)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Va)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ha)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wa)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xa)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$a)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qa||n===Ya||n===Za)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===qa)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ja||n===Ka||n===lr||n===ja)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ja)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ja)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ig=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Rl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new It({vertexShader:Rg,fragmentShader:Ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qt(new Gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Il=class extends Un{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,v=null,w=typeof XRWebGLBinding<"u",g=new Rl,f={},T=t.getContextAttributes(),R=null,b=null,_=[],S=[],E=new Ye,m=null,M=null,A=new Kt;A.viewport=new Lt;let C=new Kt;C.viewport=new Lt;let N=[A,C],F=new fa,P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let L=_[j];return L===void 0&&(L=new ns,_[j]=L),L.getTargetRaySpace()},this.getControllerGrip=function(j){let L=_[j];return L===void 0&&(L=new ns,_[j]=L),L.getGripSpace()},this.getHand=function(j){let L=_[j];return L===void 0&&(L=new ns,_[j]=L),L.getHandSpace()};function K(j){let L=S.indexOf(j.inputSource);if(L===-1)return;let re=_[L];re!==void 0&&(re.update(j.inputSource,j.frame,c||a),re.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",Q);for(let j=0;j<_.length;j++){let L=S[j];L!==null&&(S[j]=null,_[j].disconnect(L))}P=null,V=null,g.reset();for(let j in f)delete f[j];if(e.setRenderTarget(R),p=null,h=null,d=null,s=null,b=null,Be.stop(),n.isPresenting=!1,e.setPixelRatio(m),e.setSize(E.width,E.height,!1),M!==null){let j=M.camera;j.fov=M.fov,j.zoom=M.zoom,j.updateProjectionMatrix(),M=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&w&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",G),s.addEventListener("inputsourceschange",Q),T.xrCompatible!==!0&&await t.makeXRCompatible(),m=e.getPixelRatio(),e.getSize(E),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,ae=null,oe=null;T.depth&&(oe=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=T.stencil?gi:Nn,ae=T.stencil?ls:In);let Ie={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ie),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new Ft(h.textureWidth,h.textureHeight,{format:bn,type:vn,depthTexture:new li(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let re={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Ft(p.framebufferWidth,p.framebufferHeight,{format:bn,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Be.setContext(s),Be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(j){for(let L=0;L<j.removed.length;L++){let re=j.removed[L],ae=S.indexOf(re);ae>=0&&(S[ae]=null,_[ae].disconnect(re))}for(let L=0;L<j.added.length;L++){let re=j.added[L],ae=S.indexOf(re);if(ae===-1){for(let Ie=0;Ie<_.length;Ie++)if(Ie>=S.length){S.push(re),ae=Ie;break}else if(S[Ie]===null){S[Ie]=re,ae=Ie;break}if(ae===-1)break}let oe=_[ae];oe&&oe.connect(re)}}let q=new H,k=new H;function U(j,L,re){q.setFromMatrixPosition(L.matrixWorld),k.setFromMatrixPosition(re.matrixWorld);let ae=q.distanceTo(k),oe=L.projectionMatrix.elements,Ie=re.projectionMatrix.elements,We=oe[14]/(oe[10]-1),Ae=oe[14]/(oe[10]+1),Pe=(oe[9]+1)/oe[5],He=(oe[9]-1)/oe[5],Ge=(oe[8]-1)/oe[0],Ke=(Ie[8]+1)/Ie[0],ft=We*Ge,Pt=We*Ke,xt=ae/(-Ge+Ke),Ct=xt*-Ge;if(L.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ct),j.translateZ(xt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),oe[10]===-1)j.projectionMatrix.copy(L.projectionMatrix),j.projectionMatrixInverse.copy(L.projectionMatrixInverse);else{let B=We+xt,zt=Ae+xt,gt=ft-Ct,I=Pt+(ae-Ct),x=Pe*Ae/zt*B,z=He*Ae/zt*B;j.projectionMatrix.makePerspective(gt,I,x,z,B,zt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function le(j,L){L===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(L.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let L=j.near,re=j.far;g.texture!==null&&(g.depthNear>0&&(L=g.depthNear),g.depthFar>0&&(re=g.depthFar)),F.near=C.near=A.near=L,F.far=C.far=A.far=re,(P!==F.near||V!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),P=F.near,V=F.far),F.layers.mask=j.layers.mask|6,A.layers.mask=F.layers.mask&-5,C.layers.mask=F.layers.mask&-3;let ae=j.parent,oe=F.cameras;le(F,ae);for(let Ie=0;Ie<oe.length;Ie++)le(oe[Ie],ae);oe.length===2?U(F,A,C):F.projectionMatrix.copy(A.projectionMatrix),M===null&&j.isPerspectiveCamera&&(M={camera:j,fov:j.fov,zoom:j.zoom}),ee(j,F,ae)};function ee(j,L,re){re===null?j.matrix.copy(L.matrixWorld):(j.matrix.copy(re.matrixWorld),j.matrix.invert(),j.matrix.multiply(L.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(L.projectionMatrix),j.projectionMatrixInverse.copy(L.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=es*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(j){return f[j]};let we=null;function Ee(j,L){if(u=L.getViewerPose(c||a),v=L,u!==null){let re=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ae=!1;re.length!==F.cameras.length&&(F.cameras.length=0,ae=!0);for(let Ae=0;Ae<re.length;Ae++){let Pe=re[Ae],He=null;if(p!==null)He=p.getViewport(Pe);else{let Ke=d.getViewSubImage(h,Pe);He=Ke.viewport,Ae===0&&(e.setRenderTargetTextures(b,Ke.colorTexture,Ke.depthStencilTexture),e.setRenderTarget(b))}let Ge=N[Ae];Ge===void 0&&(Ge=new Kt,Ge.layers.enable(Ae),Ge.viewport=new Lt,N[Ae]=Ge),Ge.matrix.fromArray(Pe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(Pe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(He.x,He.y,He.width,He.height),Ae===0&&(F.matrix.copy(Ge.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ae===!0&&F.cameras.push(Ge)}let oe=s.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&w){d=n.getBinding();let Ae=d.getDepthInformation(re[0]);Ae&&Ae.isValid&&Ae.texture&&g.init(Ae,s.renderState)}if(oe&&oe.includes("camera-access")&&w){e.state.unbindTexture(),d=n.getBinding();for(let Ae=0;Ae<re.length;Ae++){let Pe=re[Ae].camera;if(Pe){let He=f[Pe];He||(He=new Hs,f[Pe]=He);let Ge=d.getCameraImage(Pe);He.sourceTexture=Ge}}}}for(let re=0;re<_.length;re++){let ae=S[re],oe=_[re];ae!==null&&oe!==void 0&&oe.update(ae,L,c||a)}we&&we(j,L),L.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:L}),v=null}let Be=new wu;Be.setAnimationLoop(Ee),this.setAnimationLoop=function(j){we=j},this.dispose=function(){}}},Pg=new Rt,Iu=new je;Iu.set(-1,0,0,0,1,0,0,0,1);function Lg(i,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,dl(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,T,R,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),d(g,f)):f.isMeshPhongMaterial?(r(g,f),u(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),h(g,f),f.isMeshPhysicalMaterial&&p(g,f,b)):f.isMeshMatcapMaterial?(r(g,f),v(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),w(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,T,R):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Xt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Xt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let T=e.get(f),R=T.envMap,b=T.envMapRotation;R&&(g.envMap.value=R,g.envMapRotation.value.setFromMatrix4(Pg.makeRotationFromEuler(b)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Iu),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,T,R){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*T,g.scale.value=R*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function h(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,T){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Xt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.retroreflectivity>0&&(g.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,f){f.matcap&&(g.matcap.value=f.matcap)}function w(g,f){let T=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Dg(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){let S=_.program;n.uniformBlockBinding(b,S)}function c(b,_){let S=s[b.id];S===void 0&&(g(b),S=u(b),s[b.id]=S,b.addEventListener("dispose",T));let E=_.program;n.updateUBOMapping(b,E);let m=e.render.frame;r[b.id]!==m&&(h(b),r[b.id]=m)}function u(b){let _=d();b.__bindingPointIndex=_;let S=i.createBuffer(),E=b.__size,m=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,E,m),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,S),S}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){let _=s[b.id],S=b.uniforms,E=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let m=0,M=S.length;m<M;m++){let A=S[m];if(Array.isArray(A))for(let C=0,N=A.length;C<N;C++)p(A[C],m,C,E);else p(A,m,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,_,S,E){if(w(b,_,S,E)===!0){let m=b.__offset,M=b.value;if(Array.isArray(M)){let A=0;for(let C=0;C<M.length;C++){let N=M[C],F=f(N);v(N,b.__data,A),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(A+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(M,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,m,b.__data)}}function v(b,_,S){typeof b=="number"||typeof b=="boolean"?_[0]=b:b.isMatrix3?(_[0]=b.elements[0],_[1]=b.elements[1],_[2]=b.elements[2],_[3]=0,_[4]=b.elements[3],_[5]=b.elements[4],_[6]=b.elements[5],_[7]=0,_[8]=b.elements[6],_[9]=b.elements[7],_[10]=b.elements[8],_[11]=0):ArrayBuffer.isView(b)?_.set(new b.constructor(b.buffer,b.byteOffset,_.length)):b.toArray(_,S)}function w(b,_,S,E){let m=b.value,M=_+"_"+S;if(E[M]===void 0)return typeof m=="number"||typeof m=="boolean"?E[M]=m:ArrayBuffer.isView(m)?E[M]=m.slice():E[M]=m.clone(),!0;{let A=E[M];if(typeof m=="number"||typeof m=="boolean"){if(A!==m)return E[M]=m,!0}else{if(ArrayBuffer.isView(m))return!0;if(A.equals(m)===!1)return A.copy(m),!0}}return!1}function g(b){let _=b.uniforms,S=0,E=16;for(let M=0,A=_.length;M<A;M++){let C=Array.isArray(_[M])?_[M]:[_[M]];for(let N=0,F=C.length;N<F;N++){let P=C[N],V=Array.isArray(P.value)?P.value:[P.value];for(let K=0,G=V.length;K<G;K++){let Q=V[K],q=f(Q),k=S%E,U=k%q.boundary,le=k+U;S+=U,le!==0&&E-le<q.storage&&(S+=E-le),P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,S+=q.storage}}}let m=S%E;return m>0&&(S+=E-m),b.__size=S,b.__cache={},this}function f(b){let _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(_.boundary=16,_.storage=b.byteLength):$e("WebGLRenderer: Unsupported uniform value type.",b),_}function T(b){let _=b.target;_.removeEventListener("dispose",T);let S=a.indexOf(_.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function R(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}var Ng=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bn=null;function Ug(){return Bn===null&&(Bn=new Kr(Ng,16,16,vi,$t),Bn.name="DFG_LUT",Bn.minFilter=Wt,Bn.magFilter=Wt,Bn.wrapS=Dn,Bn.wrapT=Dn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}var ao=class{constructor(e={}){let{canvas:t=Jc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=vn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let w=p,g=new Set([Ma,ba,ya]),f=new Set([vn,In,os,ls,xa,_a]),T=new Uint32Array(4),R=new Int32Array(4),b=new H,_=null,S=null,E=[],m=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,C=!1,N=null,F=null,P=null,V=null;this._outputColorSpace=fn;let K=0,G=0,Q=null,q=-1,k=null,U=new Lt,le=new Lt,ee=null,we=new Qe(0),Ee=0,Be=t.width,j=t.height,L=1,re=null,ae=null,oe=new Lt(0,0,Be,j),Ie=new Lt(0,0,Be,j),We=!1,Ae=new Bs,Pe=!1,He=!1,Ge=new Rt,Ke=new H,ft=new Lt,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},xt=!1;function Ct(){return Q===null?L:1}let B=n;function zt(y,D){return t.getContext(y,D)}let gt,I,x,z,Y,ne,de,_e,te,ie,ge,Ue,ye,pe,Oe,Ve,qe,O,fe,se,me,Se,ce;try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",bt,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",rn,!1),B===null){let D="webgl2";if(B=zt(D,y),B===null)throw zt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(y){throw t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",rn,!1),Ze("WebGLRenderer: "+y.message),y}function ze(){gt=new Hp(B),gt.init(),me=new Cg(B,gt),I=new Lp(B,gt,e,me),x=new Eg(B,gt),I.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),F=B.createFramebuffer(),P=B.createFramebuffer(),V=B.createFramebuffer(),z=new Xp(B),Y=new dg,ne=new Ag(B,gt,x,Y,I,me,z),de=new Vp(A),_e=new $h(B),Se=new Ip(B,_e),te=new Gp(B,_e,z,Se),ie=new qp(B,te,_e,Se,z),O=new $p(B,I,ne),Oe=new Dp(Y),ge=new hg(A,de,gt,I,Se,Oe),Ue=new Lg(A,Y),ye=new pg,pe=new yg(gt),qe=new Rp(A,de,x,ie,v,l),Ve=new Tg(A,ie,I),ce=new Dg(B,z,I,x),fe=new Pp(B,gt,z),se=new Wp(B,gt,z),z.programs=ge.programs,A.capabilities=I,A.extensions=gt,A.properties=Y,A.renderLists=ye,A.shadowMap=Ve,A.state=x,A.info=z}w!==vn&&(M=new Zp(w,t.width,t.height,o,s,r));let Fe=new Il(A,B);this.xr=Fe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let y=gt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=gt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return L},this.setPixelRatio=function(y){y!==void 0&&(L=y,this.setSize(Be,j,!1))},this.getSize=function(y){return y.set(Be,j)},this.setSize=function(y,D,J=!0){if(Fe.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}Be=y,j=D,t.width=Math.floor(y*L),t.height=Math.floor(D*L),J===!0&&(t.style.width=y+"px",t.style.height=D+"px"),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(Be*L,j*L).floor()},this.setDrawingBufferSize=function(y,D,J){Be=y,j=D,L=J,t.width=Math.floor(y*J),t.height=Math.floor(D*J),this.setViewport(0,0,y,D)},this.setEffects=function(y){if(w===vn){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let D=0;D<y.length;D++)if(y[D].isOutputPass===!0){$e("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(U)},this.getViewport=function(y){return y.copy(oe)},this.setViewport=function(y,D,J,X){y.isVector4?oe.set(y.x,y.y,y.z,y.w):oe.set(y,D,J,X),x.viewport(U.copy(oe).multiplyScalar(L).round())},this.getScissor=function(y){return y.copy(Ie)},this.setScissor=function(y,D,J,X){y.isVector4?Ie.set(y.x,y.y,y.z,y.w):Ie.set(y,D,J,X),x.scissor(le.copy(Ie).multiplyScalar(L).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(y){x.setScissorTest(We=y)},this.setOpaqueSort=function(y){re=y},this.setTransparentSort=function(y){ae=y},this.getClearColor=function(y){return y.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,J=!0){let X=0;if(y){let $=!1;if(Q!==null){let Me=Q.texture.format;$=g.has(Me)}if($){let Me=Q.texture.type,Ce=f.has(Me),ve=qe.getClearColor(),Re=qe.getClearAlpha(),De=ve.r,et=ve.g,nt=ve.b;Ce?(T[0]=De,T[1]=et,T[2]=nt,T[3]=Re,B.clearBufferuiv(B.COLOR,0,T)):(R[0]=De,R[1]=et,R[2]=nt,R[3]=Re,B.clearBufferiv(B.COLOR,0,R))}else X|=B.COLOR_BUFFER_BIT}D&&(X|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&B.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),N=y},this.dispose=function(){t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",rn,!1),qe.dispose(),ye.dispose(),pe.dispose(),Y.dispose(),de.dispose(),ie.dispose(),Se.dispose(),ce.dispose(),ge.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Ui),Fe.removeEventListener("sessionend",Vn),xn.stop()};function bt(y){y.preventDefault(),ul("WebGLRenderer: Context Lost."),C=!0}function st(){ul("WebGLRenderer: Context Restored."),C=!1;let y=z.autoReset,D=Ve.enabled,J=Ve.autoUpdate,X=Ve.needsUpdate,$=Ve.type;ze(),z.autoReset=y,Ve.enabled=D,Ve.autoUpdate=J,Ve.needsUpdate=X,Ve.type=$}function rn(y){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function an(y){let D=y.target;D.removeEventListener("dispose",an),vs(D)}function vs(y){vo(y),Y.remove(y)}function vo(y){let D=Y.get(y).programs;D!==void 0&&(D.forEach(function(J){ge.releaseProgram(J)}),y.isShaderMaterial&&ge.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,J,X,$,Me){D===null&&(D=Pt);let Ce=$.isMesh&&$.matrixWorld.determinantAffine()<0,ve=Vt(y,D,J,X,$);x.setMaterial(X,Ce);let Re=J.index,De=1;if(X.wireframe===!0){if(Re=te.getWireframeAttribute(J),Re===void 0)return;De=2}let et=J.drawRange,nt=J.attributes.position,Ne=et.start*De,rt=(et.start+et.count)*De;Me!==null&&(Ne=Math.max(Ne,Me.start*De),rt=Math.min(rt,(Me.start+Me.count)*De)),Re!==null?(Ne=Math.max(Ne,0),rt=Math.min(rt,Re.count)):nt!=null&&(Ne=Math.max(Ne,0),rt=Math.min(rt,nt.count));let yt=rt-Ne;if(yt<0||yt===1/0)return;Se.setup($,X,ve,J,Re);let pt,_t=fe;if(Re!==null&&(pt=_e.get(Re),_t=se,_t.setIndex(pt)),$.isMesh)X.wireframe===!0?(x.setLineWidth(X.wireframeLinewidth*Ct()),_t.setMode(B.LINES)):_t.setMode(B.TRIANGLES);else if($.isLine){let lt=X.linewidth;lt===void 0&&(lt=1),x.setLineWidth(lt*Ct()),$.isLineSegments?_t.setMode(B.LINES):$.isLineLoop?_t.setMode(B.LINE_LOOP):_t.setMode(B.LINE_STRIP)}else $.isPoints?_t.setMode(B.POINTS):$.isSprite&&_t.setMode(B.TRIANGLES);if($.isBatchedMesh)if(gt.get("WEBGL_multi_draw"))_t.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let lt=$._multiDrawStarts,xe=$._multiDrawCounts,Et=$._multiDrawCount,at=Re?_e.get(Re).bytesPerElement:1,St=Y.get(X).currentProgram.getUniforms();for(let Yt=0;Yt<Et;Yt++)St.setValue(B,"_gl_DrawID",Yt),_t.render(lt[Yt]/at,xe[Yt])}else if($.isInstancedMesh)_t.renderInstances(Ne,yt,$.count);else if(J.isInstancedBufferGeometry){let lt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,xe=Math.min(J.instanceCount,lt);_t.renderInstances(Ne,yt,xe)}else _t.render(Ne,yt)};function xs(y,D,J,X){N!==null&&y.isNodeMaterial&&N.setObject(X,y),Pe===!0&&Oe.setState(y,J,!1),y.transparent===!0&&y.side===kn&&y.forceSinglePass===!1?(y.side=Xt,y.needsUpdate=!0,Le(y,D,X),y.side=di,y.needsUpdate=!0,Le(y,D,X),y.side=kn):Le(y,D,X)}this.compile=function(y,D,J=null){J===null&&(J=y),N!==null&&N.renderStart(y,D,J),S=pe.get(J),S.init(D),m.push(S),J.traverseVisible(function($){$.isLight&&$.layers.test(D.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),y!==J&&y.traverseVisible(function($){$.isLight&&$.layers.test(D.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),He=this.localClippingEnabled,Pe=Oe.init(this.clippingPlanes,He),Pe===!0&&Oe.setGlobalState(this.clippingPlanes,D),N!==null&&Ve.render(S.state.shadowsArray,J,D);let X=new Set;return y.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let Me=$.material;if(Me)if(Array.isArray(Me))for(let Ce=0;Ce<Me.length;Ce++){let ve=Me[Ce];xs(ve,J,D,$),X.add(ve)}else xs(Me,J,D,$),X.add(Me)}),S=m.pop(),N!==null&&N.renderEnd(),X},this.compileAsync=function(y,D,J=null){let X=this.compile(y,D,J);return new Promise($=>{function Me(){if(X.forEach(function(Ce){let Re=Y.get(Ce).currentProgram;(Re===void 0||Re.isReady())&&X.delete(Ce)}),X.size===0){$(y);return}setTimeout(Me,10)}gt.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let _s=null;function Ni(y){_s&&_s(y)}function Ui(){xn.stop()}function Vn(){xn.start()}let xn=new wu;xn.setAnimationLoop(Ni),typeof self<"u"&&xn.setContext(self),this.setAnimationLoop=function(y){_s=y,Fe.setAnimationLoop(y),y===null?xn.stop():xn.start()},Fe.addEventListener("sessionstart",Ui),Fe.addEventListener("sessionend",Vn),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(y,D);let J=Fe.enabled===!0&&Fe.isPresenting===!0,X=M!==null&&(Q===null||J)&&M.begin(A,Q);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(D),D=Fe.getCamera()),y.isScene===!0&&y.onBeforeRender(A,y,D,Q),S=pe.get(y,m.length),S.init(D),S.state.textureUnits=ne.getTextureUnits(),m.push(S),Ge.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ae.setFromProjectionMatrix(Ge,Cn,D.reversedDepth),He=this.localClippingEnabled,Pe=Oe.init(this.clippingPlanes,He),_=ye.get(y,E.length),_.init(),E.push(_),Fe.enabled===!0&&Fe.isPresenting===!0){let Ce=A.xr.getDepthSensingMesh();Ce!==null&&ys(Ce,D,-1/0,A.sortObjects)}ys(y,D,0,A.sortObjects),_.finish(),N!==null&&N.updateLights(S.state.lightsArray),A.sortObjects===!0&&_.sort(re,ae),xt=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,xt&&qe.addToRenderList(_,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&Oe.beginShadows();let $=S.state.shadowsArray;if(Ve.render($,y,D),Pe===!0&&Oe.endShadows(),(X&&M.hasRenderPass())===!1){let Ce=_.opaque,ve=_.transmissive;if(S.setupLights(),D.isArrayCamera){let Re=D.cameras;if(ve.length>0)for(let De=0,et=Re.length;De<et;De++){let nt=Re[De];W(Ce,ve,y,nt)}xt&&qe.render(y);for(let De=0,et=Re.length;De<et;De++){let nt=Re[De];xo(_,y,nt,nt.viewport)}}else ve.length>0&&W(Ce,ve,y,D),xt&&qe.render(y),xo(_,y,D)}Q!==null&&G===0&&(ne.updateMultisampleRenderTarget(Q),ne.updateRenderTargetMipmap(Q)),X&&M.end(A),y.isScene===!0&&y.onAfterRender(A,y,D),Se.resetDefaultState(),q=-1,k=null,m.pop(),m.length>0?(S=m[m.length-1],ne.setTextureUnits(S.state.textureUnits),Pe===!0&&Oe.setGlobalState(A.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?_=E[E.length-1]:_=null,N!==null&&N.renderEnd()};function ys(y,D,J,X){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)J=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLightProbeGrid)S.pushLightProbeGrid(y);else if(y.isLight)S.pushLight(y),y.castShadow&&S.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Ae)){X&&ft.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ge);let Ce=ie.update(y),ve=y.material;ve.visible&&_.push(y,Ce,ve,J,ft.z,null,D)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Ae))){let Ce=ie.update(y),ve=y.material;if(X&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ft.copy(y.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),ft.copy(Ce.boundingSphere.center)),ft.applyMatrix4(y.matrixWorld).applyMatrix4(Ge)),Array.isArray(ve)){let Re=Ce.groups;for(let De=0,et=Re.length;De<et;De++){let nt=Re[De],Ne=ve[nt.materialIndex];Ne&&Ne.visible&&_.push(y,Ce,Ne,J,ft.z,nt,D)}}else ve.visible&&_.push(y,Ce,ve,J,ft.z,null,D)}}let Me=y.children;for(let Ce=0,ve=Me.length;Ce<ve;Ce++)ys(Me[Ce],D,J,X)}function xo(y,D,J,X){let{opaque:$,transmissive:Me,transparent:Ce}=y;S.setupLightsView(J),Pe===!0&&Oe.setGlobalState(A.clippingPlanes,J),X&&x.viewport(U.copy(X)),$.length>0&&ue($,D,J),Me.length>0&&ue(Me,D,J),Ce.length>0&&ue(Ce,D,J),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function W(y,D,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[X.id]===void 0){let Ne=gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[X.id]=new Ft(1,1,{generateMipmaps:!0,type:Ne?$t:vn,minFilter:mi,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let Me=S.state.transmissionRenderTarget[X.id],Ce=X.viewport||U;Me.setSize(Ce.z*A.transmissionResolutionScale,Ce.w*A.transmissionResolutionScale);let ve=A.getRenderTarget(),Re=A.getActiveCubeFace(),De=A.getActiveMipmapLevel();A.setRenderTarget(Me),A.getClearColor(we),Ee=A.getClearAlpha(),Ee<1&&A.setClearColor(16777215,.5),A.clear(),xt&&qe.render(J);let et=A.toneMapping;A.toneMapping=Rn;let nt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),S.setupLightsView(X),Pe===!0&&Oe.setGlobalState(A.clippingPlanes,X),ue(y,J,X),ne.updateMultisampleRenderTarget(Me),ne.updateRenderTargetMipmap(Me),gt.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let rt=0,yt=D.length;rt<yt;rt++){let pt=D[rt],{object:_t,geometry:lt,material:xe,group:Et}=pt;if(xe.side===kn&&_t.layers.test(X.layers)){let at=xe.side;xe.side=Xt,xe.needsUpdate=!0,be(_t,J,X,lt,xe,Et),xe.side=at,xe.needsUpdate=!0,Ne=!0}}Ne===!0&&(ne.updateMultisampleRenderTarget(Me),ne.updateRenderTargetMipmap(Me))}A.setRenderTarget(ve,Re,De),A.setClearColor(we,Ee),nt!==void 0&&(X.viewport=nt),A.toneMapping=et}function ue(y,D,J){let X=D.isScene===!0?D.overrideMaterial:null;for(let $=0,Me=y.length;$<Me;$++){let Ce=y[$],{object:ve,geometry:Re,group:De}=Ce,et=Ce.material;et.allowOverride===!0&&X!==null&&(et=X),ve.layers.test(J.layers)&&be(ve,D,J,Re,et,De)}}function be(y,D,J,X,$,Me){N!==null&&$.isNodeMaterial&&N.setObject(y,$),y.onBeforeRender(A,D,J,X,$,Me),y.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),$.onBeforeRender(A,D,J,X,y,Me),$.transparent===!0&&$.side===kn&&$.forceSinglePass===!1?($.side=Xt,$.needsUpdate=!0,A.renderBufferDirect(J,D,X,$,y,Me),$.side=di,$.needsUpdate=!0,A.renderBufferDirect(J,D,X,$,y,Me),$.side=kn):A.renderBufferDirect(J,D,X,$,y,Me),y.onAfterRender(A,D,J,X,$,Me)}function Le(y,D,J){D.isScene!==!0&&(D=Pt);let X=Y.get(y),$=S.state.lights,Me=S.state.shadowsArray,Ce=$.state.version,ve=ge.getParameters(y,$.state,Me,D,J,S.state.lightProbeGridArray),Re=ge.getProgramCacheKey(ve),De=X.programs;X.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,X.fog=D.fog;let et=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;X.envMap=de.get(y.envMap||X.environment,et),X.envMapRotation=X.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,De===void 0&&(y.addEventListener("dispose",an),De=new Map,X.programs=De);let nt=De.get(Re);if(nt!==void 0){if(X.currentProgram===nt&&X.lightsStateVersion===Ce)return Xe(y,ve),nt}else ve.uniforms=ge.getUniforms(y),N!==null&&y.isNodeMaterial&&N.build(y,J,ve),y.onBeforeCompile(ve,A),nt=ge.acquireProgram(ve,Re),De.set(Re,nt),X.uniforms=ve.uniforms;let Ne=X.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ne.clippingPlanes=Oe.uniform),Xe(y,ve),X.needsLights=ke(y),X.lightsStateVersion=Ce,X.needsLights&&(Ne.ambientLightColor.value=$.state.ambient,Ne.lightProbe.value=$.state.probe,Ne.sunLights.value=$.state.sun,Ne.sunLightShadows.value=$.state.sunShadow,Ne.directionalLights.value=$.state.directional,Ne.directionalLightShadows.value=$.state.directionalShadow,Ne.spotLights.value=$.state.spot,Ne.spotLightShadows.value=$.state.spotShadow,Ne.rectAreaLights.value=$.state.rectArea,Ne.ltc_1.value=$.state.rectAreaLTC1,Ne.ltc_2.value=$.state.rectAreaLTC2,Ne.pointLights.value=$.state.point,Ne.pointLightShadows.value=$.state.pointShadow,Ne.hemisphereLights.value=$.state.hemi,Ne.sunShadowMatrix.value=$.state.sunShadowMatrix,Ne.sunShadowCascade.value=$.state.sunShadowCascade,Ne.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ne.spotLightMatrix.value=$.state.spotLightMatrix,Ne.spotLightMap.value=$.state.spotLightMap,Ne.pointShadowMatrix.value=$.state.pointShadowMatrix),X.lightProbeGrid=S.state.lightProbeGridArray.length>0,X.currentProgram=nt,X.uniformsList=null,nt}function tt(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=ds.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Xe(y,D){let J=Y.get(y);J.outputColorSpace=D.outputColorSpace,J.batching=D.batching,J.batchingColor=D.batchingColor,J.instancing=D.instancing,J.instancingColor=D.instancingColor,J.instancingMorph=D.instancingMorph,J.skinning=D.skinning,J.morphTargets=D.morphTargets,J.morphNormals=D.morphNormals,J.morphColors=D.morphColors,J.morphTargetsCount=D.morphTargetsCount,J.numClippingPlanes=D.numClippingPlanes,J.numIntersection=D.numClipIntersection,J.vertexAlphas=D.vertexAlphas,J.vertexTangents=D.vertexTangents,J.toneMapping=D.toneMapping}function ht(y,D){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;b.setFromMatrixPosition(D.matrixWorld);for(let J=0,X=y.length;J<X;J++){let $=y[J];if($.texture!==null&&$.boundingBox.containsPoint(b))return $}return null}function Vt(y,D,J,X,$){D.isScene!==!0&&(D=Pt),ne.resetTextureUnits();let Me=D.fog,Ce=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?D.environment:null,ve=Q===null?A.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ot.workingColorSpace,Re=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,De=de.get(X.envMap||Ce,Re),et=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,nt=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ne=!!J.morphAttributes.position,rt=!!J.morphAttributes.normal,yt=!!J.morphAttributes.color,pt=Rn;X.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(pt=A.toneMapping);let _t=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,lt=_t!==void 0?_t.length:0,xe=Y.get(X),Et=S.state.lights;if(Pe===!0&&(He===!0||y!==k)){let wt=y===k&&X.id===q;Oe.setState(X,y,wt)}let at=!1;X.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Et.state.version||xe.outputColorSpace!==ve||$.isBatchedMesh&&xe.batching===!1||!$.isBatchedMesh&&xe.batching===!0||$.isBatchedMesh&&xe.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&xe.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&xe.instancing===!1||!$.isInstancedMesh&&xe.instancing===!0||$.isSkinnedMesh&&xe.skinning===!1||!$.isSkinnedMesh&&xe.skinning===!0||$.isInstancedMesh&&xe.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&xe.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&xe.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&xe.instancingMorph===!1&&$.morphTexture!==null||xe.envMap!==De||X.fog===!0&&xe.fog!==Me||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Oe.numPlanes||xe.numIntersection!==Oe.numIntersection)||xe.vertexAlphas!==et||xe.vertexTangents!==nt||xe.morphTargets!==Ne||xe.morphNormals!==rt||xe.morphColors!==yt||xe.toneMapping!==pt||xe.morphTargetsCount!==lt||!!xe.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,xe.__version=X.version);let St=xe.currentProgram;at===!0&&(St=Le(X,D,$),N&&X.isNodeMaterial&&N.onUpdateProgram(X,St,xe));let Yt=!1,un=!1,Kn=!1,vt=St.getUniforms(),Dt=xe.uniforms;if(x.useProgram(St.program)&&(Yt=!0,un=!0,Kn=!0),X.id!==q&&(q=X.id,un=!0),xe.needsLights){let wt=ht(S.state.lightProbeGridArray,$);xe.lightProbeGrid!==wt&&(xe.lightProbeGrid=wt,un=!0)}if(Yt||k!==y){x.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),vt.setValue(B,"projectionMatrix",y.projectionMatrix),vt.setValue(B,"viewMatrix",y.matrixWorldInverse);let Qn=vt.map.cameraPosition;Qn!==void 0&&Qn.setValue(B,Ke.setFromMatrixPosition(y.matrixWorld)),I.logarithmicDepthBuffer&&vt.setValue(B,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&vt.setValue(B,"isOrthographic",y.isOrthographicCamera===!0),k!==y&&(k=y,un=!0,Kn=!0)}if(xe.needsLights&&(Et.state.sunShadowMap.length>0&&vt.setValue(B,"sunShadowMap",Et.state.sunShadowMap,ne),Et.state.directionalShadowMap.length>0&&vt.setValue(B,"directionalShadowMap",Et.state.directionalShadowMap,ne),Et.state.spotShadowMap.length>0&&vt.setValue(B,"spotShadowMap",Et.state.spotShadowMap,ne),Et.state.pointShadowMap.length>0&&vt.setValue(B,"pointShadowMap",Et.state.pointShadowMap,ne)),$.isSkinnedMesh){vt.setOptional(B,$,"bindMatrix"),vt.setOptional(B,$,"bindMatrixInverse");let wt=$.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),vt.setValue(B,"boneTexture",wt.boneTexture,ne))}$.isBatchedMesh&&(vt.setOptional(B,$,"batchingTexture"),vt.setValue(B,"batchingTexture",$._matricesTexture,ne),vt.setOptional(B,$,"batchingIdTexture"),vt.setValue(B,"batchingIdTexture",$._indirectTexture,ne),vt.setOptional(B,$,"batchingColorTexture"),$._colorsTexture!==null&&vt.setValue(B,"batchingColorTexture",$._colorsTexture,ne));let jn=J.morphAttributes;if((jn.position!==void 0||jn.normal!==void 0||jn.color!==void 0)&&O.update($,J,St),(un||xe.receiveShadow!==$.receiveShadow)&&(xe.receiveShadow=$.receiveShadow,vt.setValue(B,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&D.environment!==null&&(Dt.envMapIntensity.value=D.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=Ug()),un){if(vt.setValue(B,"toneMappingExposure",A.toneMappingExposure),xe.needsLights&&Tt(Dt,Kn),Me&&X.fog===!0&&Ue.refreshFogUniforms(Dt,Me),Ue.refreshMaterialUniforms(Dt,X,L,j,S.state.transmissionRenderTarget[y.id]),xe.needsLights&&xe.lightProbeGrid){let wt=xe.lightProbeGrid;Dt.probesSH.value=wt.texture,Dt.probesMin.value.copy(wt.boundingBox.min),Dt.probesMax.value.copy(wt.boundingBox.max),Dt.probesResolution.value.copy(wt.resolution)}ds.upload(B,tt(xe),Dt,ne)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ds.upload(B,tt(xe),Dt,ne),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&vt.setValue(B,"center",$.center),vt.setValue(B,"modelViewMatrix",$.modelViewMatrix),vt.setValue(B,"normalMatrix",$.normalMatrix),vt.setValue(B,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){let wt=X.uniformsGroups;for(let Qn=0,Fi=wt.length;Qn<Fi;Qn++){let Ol=wt[Qn];ce.update(Ol,St),ce.bind(Ol,St)}}return St}function Tt(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.sunLights.needsUpdate=D,y.sunLightShadows.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function ke(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(y,D,J){let X=Y.get(y);X.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Y.get(y.texture).__webglTexture=D,Y.get(y.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let J=Y.get(y);J.__webglFramebuffer=D,J.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,J=0){Q=y,K=D,G=J;let X=null,$=!1,Me=!1;if(y){let ve=Y.get(y);if(ve.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(B.FRAMEBUFFER,ve.__webglFramebuffer),U.copy(y.viewport),le.copy(y.scissor),ee=y.scissorTest,x.viewport(U),x.scissor(le),x.setScissorTest(ee),q=-1;return}else if(ve.__webglFramebuffer===void 0)ne.setupRenderTarget(y);else if(ve.__hasExternalTextures)ne.rebindTextures(y,Y.get(y.texture).__webglTexture,Y.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let et=y.depthTexture;if(ve.__boundDepthTexture!==et){if(et!==null&&Y.has(et)&&(y.width!==et.image.width||y.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(y)}}let Re=y.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Me=!0);let De=Y.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(De[D])?X=De[D][J]:X=De[D],$=!0):y.samples>0&&ne.useMultisampledRTT(y)===!1?X=Y.get(y).__webglMultisampledFramebuffer:Array.isArray(De)?X=De[J]:X=De,U.copy(y.viewport),le.copy(y.scissor),ee=y.scissorTest}else U.copy(oe).multiplyScalar(L).floor(),le.copy(Ie).multiplyScalar(L).floor(),ee=We;if(J!==0&&(X=F),x.bindFramebuffer(B.FRAMEBUFFER,X)&&x.drawBuffers(y,X),x.viewport(U),x.scissor(le),x.setScissorTest(ee),$){let ve=Y.get(y.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+D,ve.__webglTexture,J)}else if(Me){let ve=D;for(let Re=0;Re<y.textures.length;Re++){let De=Y.get(y.textures[Re]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Re,De.__webglTexture,J,ve)}}else if(y!==null&&J!==0){let ve=Y.get(y.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ve.__webglTexture,J)}q=-1};function qt(y){let D=Y.get(y);return(D.__readFormat!==y.format||D.__readType!==y.type)&&(D.__readFormat=y.format,D.__readType=y.type,D.__formatReadable=I.textureFormatReadable(y.format),D.__typeReadable=I.textureTypeReadable(y.type)),D}this.readRenderTargetPixels=function(y,D,J,X,$,Me,Ce,ve=0){if(!(y&&y.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Y.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ce!==void 0&&(Re=Re[Ce]),Re){x.bindFramebuffer(B.FRAMEBUFFER,Re);try{let De=y.textures[ve],et=De.format,nt=De.type;y.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ve);let Ne=qt(De);if(Ne.__formatReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ne.__typeReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-X&&J>=0&&J<=y.height-$&&B.readPixels(D,J,X,$,me.convert(et),me.convert(nt),Me)}finally{let De=Q!==null?Y.get(Q).__webglFramebuffer:null;x.bindFramebuffer(B.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(y,D,J,X,$,Me,Ce,ve=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Y.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ce!==void 0&&(Re=Re[Ce]),Re)if(D>=0&&D<=y.width-X&&J>=0&&J<=y.height-$){x.bindFramebuffer(B.FRAMEBUFFER,Re);let De=y.textures[ve],et=De.format,nt=De.type;y.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ve);let Ne=qt(De);if(Ne.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let rt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,rt),B.bufferData(B.PIXEL_PACK_BUFFER,Me.byteLength,B.STREAM_READ),B.readPixels(D,J,X,$,me.convert(et),me.convert(nt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let yt=Q!==null?Y.get(Q).__webglFramebuffer:null;x.bindFramebuffer(B.FRAMEBUFFER,yt);let pt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await jc(B,pt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,rt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Me),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(rt),B.deleteSync(pt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,J=0){let X=Math.pow(2,-J),$=Math.floor(y.image.width*X),Me=Math.floor(y.image.height*X),Ce=D!==null?D.x:0,ve=D!==null?D.y:0;ne.setTexture2D(y,0),B.copyTexSubImage2D(B.TEXTURE_2D,J,0,0,Ce,ve,$,Me),x.unbindTexture()},this.copyTextureToTexture=function(y,D,J=null,X=null,$=0,Me=0){let Ce,ve,Re,De,et,nt,Ne,rt,yt,pt=y.isCompressedTexture?y.mipmaps[Me]:y.image;if(J!==null)Ce=J.max.x-J.min.x,ve=J.max.y-J.min.y,Re=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,et=J.min.y,nt=J.isBox3?J.min.z:0;else{let Dt=Math.pow(2,-$);Ce=Math.floor(pt.width*Dt),ve=Math.floor(pt.height*Dt),y.isDataArrayTexture?Re=pt.depth:y.isData3DTexture?Re=Math.floor(pt.depth*Dt):Re=1,De=0,et=0,nt=0}X!==null?(Ne=X.x,rt=X.y,yt=X.z):(Ne=0,rt=0,yt=0);let _t=me.convert(D.format),lt=me.convert(D.type),xe;D.isData3DTexture?(ne.setTexture3D(D,0),xe=B.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(ne.setTexture2DArray(D,0),xe=B.TEXTURE_2D_ARRAY):(ne.setTexture2D(D,0),xe=B.TEXTURE_2D),x.activeTexture(B.TEXTURE0),x.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,D.flipY),x.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),x.pixelStorei(B.UNPACK_ALIGNMENT,D.unpackAlignment);let Et=x.getParameter(B.UNPACK_ROW_LENGTH),at=x.getParameter(B.UNPACK_IMAGE_HEIGHT),St=x.getParameter(B.UNPACK_SKIP_PIXELS),Yt=x.getParameter(B.UNPACK_SKIP_ROWS),un=x.getParameter(B.UNPACK_SKIP_IMAGES);x.pixelStorei(B.UNPACK_ROW_LENGTH,pt.width),x.pixelStorei(B.UNPACK_IMAGE_HEIGHT,pt.height),x.pixelStorei(B.UNPACK_SKIP_PIXELS,De),x.pixelStorei(B.UNPACK_SKIP_ROWS,et),x.pixelStorei(B.UNPACK_SKIP_IMAGES,nt);let Kn=y.isDataArrayTexture||y.isData3DTexture,vt=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let Dt=Y.get(y),jn=Y.get(D),wt=Y.get(Dt.__renderTarget),Qn=Y.get(jn.__renderTarget);x.bindFramebuffer(B.READ_FRAMEBUFFER,wt.__webglFramebuffer),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let Fi=0;Fi<Re;Fi++)Kn&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Y.get(y).__webglTexture,$,nt+Fi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Y.get(D).__webglTexture,Me,yt+Fi)),B.blitFramebuffer(De,et,Ce,ve,Ne,rt,Ce,ve,B.DEPTH_BUFFER_BIT,B.NEAREST);x.bindFramebuffer(B.READ_FRAMEBUFFER,null),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if($!==0||y.isRenderTargetTexture||Y.has(y)){let Dt=Y.get(y),jn=Y.get(D);x.bindFramebuffer(B.READ_FRAMEBUFFER,P),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,V);for(let wt=0;wt<Re;wt++)Kn?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Dt.__webglTexture,$,nt+wt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Dt.__webglTexture,$),vt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,jn.__webglTexture,Me,yt+wt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,jn.__webglTexture,Me),$!==0?B.blitFramebuffer(De,et,Ce,ve,Ne,rt,Ce,ve,B.COLOR_BUFFER_BIT,B.NEAREST):vt?B.copyTexSubImage3D(xe,Me,Ne,rt,yt+wt,De,et,Ce,ve):B.copyTexSubImage2D(xe,Me,Ne,rt,De,et,Ce,ve);x.bindFramebuffer(B.READ_FRAMEBUFFER,null),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else vt?y.isDataTexture||y.isData3DTexture?B.texSubImage3D(xe,Me,Ne,rt,yt,Ce,ve,Re,_t,lt,pt.data):D.isCompressedArrayTexture?B.compressedTexSubImage3D(xe,Me,Ne,rt,yt,Ce,ve,Re,_t,pt.data):B.texSubImage3D(xe,Me,Ne,rt,yt,Ce,ve,Re,_t,lt,pt):y.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Me,Ne,rt,Ce,ve,_t,lt,pt.data):y.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Me,Ne,rt,pt.width,pt.height,_t,pt.data):B.texSubImage2D(B.TEXTURE_2D,Me,Ne,rt,Ce,ve,_t,lt,pt);x.pixelStorei(B.UNPACK_ROW_LENGTH,Et),x.pixelStorei(B.UNPACK_IMAGE_HEIGHT,at),x.pixelStorei(B.UNPACK_SKIP_PIXELS,St),x.pixelStorei(B.UNPACK_SKIP_ROWS,Yt),x.pixelStorei(B.UNPACK_SKIP_IMAGES,un),Me===0&&D.generateMipmaps&&B.generateMipmap(xe),x.unbindTexture()},this.initRenderTarget=function(y){Y.get(y).__webglFramebuffer===void 0&&ne.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?ne.setTextureCube(y,0):y.isData3DTexture?ne.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?ne.setTexture2DArray(y,0):ne.setTexture2D(y,0),x.unbindTexture()},this.resetState=function(){K=0,G=0,Q=null,x.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var ps={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var nn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Fg=new Ei(-1,1,1,-1,0,1),Pl=class extends jt{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}},Og=new Pl,xi=class{constructor(e){this._mesh=new Qt(Og,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Fg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var co=class extends nn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof It?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Jn.clone(e.uniforms),this.material=new It({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new xi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var fr=class extends nn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},uo=class extends nn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var ho=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Ye);this._width=n.width,this._height=n.height,t=new Ft(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new co(ps),this.copyPass.material.blending=yn,this.timer=new qs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}fr!==void 0&&(a instanceof fr?n=!0:a instanceof uo&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Ye);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var fo=class extends nn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Qe}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var po=class extends nn{constructor(e=0,t=0){super(),this.needsSwap=!1,this.clearColor=e,this.clearAlpha=t,this._oldClearColor=new Qe}render(e,t,n){let s;this.clearColor&&(e.getClearColor(this._oldClearColor),s=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),e.setRenderTarget(this.renderToScreen?null:n),e.clear(),this.clearColor&&e.setClearColor(this._oldClearColor,s)}};var Pu={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Qe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var ms=class i extends nn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new Ye(e.x,e.y):new Ye(256,256),this.clearColor=new Qe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ft(r,a,{type:$t,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Ft(r,a,{type:$t,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let h=new Ft(r,a,{type:$t,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}let o=Pu;this.highPassUniforms=Jn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new It({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Ye(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Jn.clone(ps.uniforms),this.blendMaterial=new It({uniforms:this.copyUniforms,vertexShader:ps.vertexShader,fragmentShader:ps.fragmentShader,premultipliedAlpha:!0,blending:fi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Qe,this._oldClearAlpha=1,this._basic=new Ti,this._fsQuad=new xi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ye(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let s=[],r=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new It({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ye(.5,.5)},direction:{value:new Ye(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new It({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};ms.BlurDirectionX=new Ye(1,0);ms.BlurDirectionY=new Ye(0,1);var pr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var mo=class extends nn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Jn.clone(pr.uniforms),this.material=new ss({name:pr.name,uniforms:this.uniforms,vertexShader:pr.vertexShader,fragmentShader:pr.fragmentShader}),this._fsQuad=new xi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ot.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Zs?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Js?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ks?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ci?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Qs?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===er?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===js&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function Li(i){let e=i>>>0,t=()=>{e=e+1831565813>>>0;let n=e;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296};return t.gauss=()=>{let n=Math.max(t(),1e-9),s=t();return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*s)},t.range=(n,s)=>n+(s-n)*t(),t.dir=()=>{let n=2*t()-1,s=2*Math.PI*t(),r=Math.sqrt(1-n*n);return[r*Math.cos(s),n,r*Math.sin(s)]},t}var Di={all:{label:"All light",w:[0,1,.8,1,1]},alldm:{label:"All",w:[.7,1,.6,.8,.9]},dm:{label:"Dark matter",w:[1,0,0,0,0]},stars:{label:"Starlight",w:[0,1,0,0,0]},cold:{label:"Cold gas",w:[0,.12,1,0,0]},warm:{label:"Warm gas",w:[0,.12,0,1,0]},hot:{label:"Hot gas",w:[0,.12,0,0,1]},absorb:{label:"All light",w:[0,.55,.35,.22,.3]},galaxy:{label:"All light",w:[0,1,.6,.3,.35]},accrete:{label:"All light",w:[0,.45,1,.12,.7]}},ut={uTime:{value:0},uScreen:{value:1e3},uW1:{value:new H(0,1,.8)},uW2:{value:new Ye(1,1)},uKeep:{value:1},uSteps:{value:30},uMorph:{value:0},uCdm:{value:new H(.34,.42,.85)},uCstar:{value:new H(1,.88,.72)},uCcold:{value:new H(.12,.95,.82)},uCwarm:{value:new H(1,.22,.52)},uChot:{value:new H(.52,.36,1)}},Lu=()=>({uTime:ut.uTime,uScreen:ut.uScreen,uW1:ut.uW1,uW2:ut.uW2,uKeep:ut.uKeep,uSteps:ut.uSteps,uCdm:ut.uCdm,uCcold:ut.uCcold,uCwarm:ut.uCwarm,uChot:ut.uChot,uCstar:ut.uCstar}),kg=`
uniform float uTime, uScreen, uOpacity, uSizeMul, uMorph, uGain, uNear, uCut, uKeep;
uniform vec3 uW1; uniform vec2 uW2;
uniform vec3 uCdm, uCcold, uCwarm, uChot;
attribute vec3 aCol, aCol2, aB1, aPos2, aVel, aAcc;
attribute vec2 aB2, aTm, aMf;
attribute float aSize;
varying vec3 vC;
void main() {
  // Light mode: a fixed subset of particles (integer hash of the vertex index, so it never flickers); the rest are
  // brightened by 1/uKeep below so the total light is kept. uKeep = 1 draws everything exactly as before.
  if (uKeep < 1.0) {
    uint hk = uint(gl_VertexID) * 2654435761u; hk ^= hk >> 15u; hk *= 2246822519u; hk ^= hk >> 13u;
    if (float(hk >> 8u) / 16777216.0 >= uKeep) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; vC = vec3(0.0); return; }
  }
  float m = uMorph * aMf.x;
  vec3 p = mix(position, aPos2, m);
  float fade = 1.0;
  if (aTm.x != 0.0) {
    float f = fract(uTime * aTm.x + aTm.y);
    p += aVel * f + aAcc * f * f;
    fade = sin(3.14159 * f);
  }
  // Inner cutoff (uCut > 0, model units): points fade out over the last quarter before reaching that radius.
  if (uCut > 0.0) fade *= smoothstep(0.7 * uCut, uCut, length(p));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float s = aSize * uSizeMul * uScreen / max(-mv.z, 1e-6);
  vec3 col = mix(aCol, aCol2, m);
  // Morphed (quenched) stars spread into a spheroid; brighten them so the galaxy keeps its overall light.
  vec3 c = uCdm * aB1.x * uW1.x + col * aB1.y * uW1.y * (1.0 + 0.6 * m) + uCcold * aB1.z * uW1.z
         + uCwarm * aB2.x * uW2.x + uChot * aB2.y * uW2.y;
  float a = fade * uOpacity * uGain * (1.0 - uMorph * aMf.y);
  #ifndef KEEP_LARGE_POINTS
    a *= 1.0 - smoothstep(60.0, 260.0, s);
  #endif
  // Foreground clutter much nearer than the focus (flying through a disk) fades away.
  a *= smoothstep(0.15 * uNear, 0.55 * uNear, -mv.z);
  if (s < 1.6) { a *= s * s / 2.56; s = 1.6; }
  gl_PointSize = min(s, 300.0);
  vC = uKeep < 1.0 ? c * a / uKeep : c * a;
}`,Bg=`
varying vec3 vC;
void main() {
  vec2 d = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(d, d);
  if (r2 > 1.0) discard;
  gl_FragColor = vec4(vC * exp(-r2 * 4.0), 1.0);
}`;function sn({size:i=1,gain:e=1,morph:t=null,fadeLarge:n=!0}={}){return new It({defines:n?{}:{KEEP_LARGE_POINTS:1},uniforms:{...Lu(),uOpacity:{value:1},uSizeMul:{value:i},uGain:{value:e},uMorph:t||{value:0},uNear:{value:0},uCut:{value:0}},vertexShader:kg,fragmentShader:Bg,transparent:!0,depthWrite:!1,depthTest:!1,blending:fi})}var Mt=class{constructor(){this.a={position:[],aCol:[],aCol2:[],aB1:[],aB2:[],aSize:[],aPos2:[],aVel:[],aAcc:[],aTm:[],aMf:[]},this.n=0}add(e,t){let n=this.a,s=t.col||[1,1,1],r=t.b;n.position.push(e[0],e[1],e[2]),n.aCol.push(s[0],s[1],s[2]);let a=t.col2||s;n.aCol2.push(a[0],a[1],a[2]),n.aB1.push(r[0],r[1],r[2]),n.aB2.push(r[3],r[4]),n.aSize.push(t.size);let o=t.pos2||e;n.aPos2.push(o[0],o[1],o[2]);let l=t.vel||[0,0,0],c=t.acc||[0,0,0];n.aVel.push(l[0],l[1],l[2]),n.aAcc.push(c[0],c[1],c[2]),n.aTm.push(t.rate||0,t.phase||0);let u=t.mf||[0,0];n.aMf.push(u[0],u[1]),this.n++}build(e){let t=new jt,n={position:3,aCol:3,aCol2:3,aB1:3,aB2:2,aSize:1,aPos2:3,aVel:3,aAcc:3,aTm:2,aMf:2};for(let r in n)t.setAttribute(r,new Ut(this.a[r],n[r]));t.boundingSphere=new Yn(new H,1e9);let s=new zs(t,e);return s.frustumCulled=!1,s}},zg=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,Vg=`
uniform vec3 uCenter; uniform float uR, uRc, uBeta, uInner, uWidth, uNoise, uNoiseScale, uGain, uOpacity, uTime, uSeed;
uniform int uType, uSteps;
uniform vec3 uA1; uniform vec2 uA2;
uniform vec3 uW1; uniform vec2 uW2;
uniform vec3 uCdm, uCstar, uCcold, uCwarm, uChot;
varying vec3 vW;
float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float dens(vec3 q) {
  float r = length(q);
  if (r > 1.0) return 0.0;
  float d;
  if (uType == 0) d = pow(1.0 + r * r / (uRc * uRc), -1.5 * uBeta);
  else if (uType == 1) d = exp(-pow((r - uInner) / uWidth, 2.0));
  else d = 1.0;
  d *= smoothstep(1.0, 0.75, r);
  if (uNoise > 0.0) {
    vec3 s = q * uNoiseScale + uSeed;
    float n = noise(s + vec3(0.0, uTime * 0.03, 0.0)) * 0.62 + noise(s * 2.7 - uTime * 0.02) * 0.38;
    d *= mix(1.0, pow(n * 1.6, 2.0), uNoise);
  }
  return d;
}
void main() {
  vec3 ro = cameraPosition, rd = normalize(vW - ro);
  vec3 oc = ro - uCenter;
  float b = dot(oc, rd), c = dot(oc, oc) - uR * uR, h = b * b - c;
  if (h < 0.0) discard;
  h = sqrt(h);
  float t0 = max(-b - h, 0.0), t1 = -b + h;
  if (t1 <= 0.0) discard;
  // uSteps samples (30 normally; fewer in light mode); same arithmetic as a fixed 30-sample loop when uSteps = 30
  const int N = 30;
  float dt = (t1 - t0) / float(uSteps), acc = 0.0;
  for (int i = 0; i < N; i++) { if (i >= uSteps) break; acc += dens((ro + rd * (t0 + (float(i) + 0.5) * dt) - uCenter) / uR); }
  acc *= dt / uR;
  vec3 col = uCdm * uA1.x * uW1.x + uCstar * uA1.y * uW1.y + uCcold * uA1.z * uW1.z + uCwarm * uA2.x * uW2.x + uChot * uA2.y * uW2.y;
  gl_FragColor = vec4(col * acc * uGain * uOpacity, 1.0);
}`,Hg=new Ws(1,40,28),Du=[],Mn=Math.fround;function Nu(){let i=ut.uW1.value,e=ut.uW2.value;for(let t of Du){let n=t.material.uniforms,s=n.uA1.value,r=n.uA2.value,a=Mn(n.uGain.value)===0||Mn(n.uOpacity.value)===0||Mn(s.x*Mn(i.x))===0&&Mn(s.y*Mn(i.y))===0&&Mn(s.z*Mn(i.z))===0&&Mn(r.x*Mn(e.x))===0&&Mn(r.y*Mn(e.y))===0;t.layers.mask=a?2:1}}function Sn(i){let e={beta:0,shell:1,uniform:2},t=i.amp,n=new It({uniforms:{...Lu(),uCenter:{value:new H(...i.center)},uR:{value:i.R},uType:{value:e[i.type||"beta"]},uRc:{value:i.rc??.15},uBeta:{value:i.beta??.6},uInner:{value:i.inner??.9},uWidth:{value:i.width??.06},uNoise:{value:i.noise??0},uNoiseScale:{value:i.noiseScale??3},uSeed:{value:i.seed??0},uA1:{value:new H(t[0],t[1],t[2])},uA2:{value:new Ye(t[3],t[4])},uGain:{value:i.gain??1},uOpacity:{value:1}},vertexShader:zg,fragmentShader:Vg,side:Xt,transparent:!0,depthWrite:!1,depthTest:!1,blending:fi}),s=new Qt(Hg,n);return s.position.set(...i.center),s.scale.setScalar(i.R),s.frustumCulled=!1,s.setRadius=r=>{s.scale.setScalar(r),n.uniforms.uR.value=r},Du.push(s),s}var Z={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],len:i=>Math.hypot(i[0],i[1],i[2]),norm:i=>{let e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},cross:(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t]};function go(i){let e=Math.abs(i[1])<.9?[0,1,0]:[1,0,0],t=Z.norm(Z.cross(i,e));return[t,Z.cross(i,t)]}function Uu(i,e,t){let s=new Rt().makeRotationFromEuler(new On(i,e,t)).elements;return r=>[s[0]*r[0]+s[4]*r[1]+s[8]*r[2],s[1]*r[0]+s[5]*r[1]+s[9]*r[2],s[2]*r[0]+s[6]*r[1]+s[10]*r[2]]}function Fu(){let i=Li(7),e=85,t=[{p:[0,0,0],m:.45}];for(;t.length<85;){let k=[i.range(-e,e),i.range(-e,e),i.range(-e,e)];t.every(U=>Z.len(Z.sub(U.p,k))>13)&&t.push({p:k,m:.12+.88*i()**3})}let n=new Map;t.forEach((k,U)=>{let le=k.m>.5?4:3;t.map((ee,we)=>[we,Z.len(Z.sub(ee.p,k.p))]).filter(([ee])=>ee!==U).sort((ee,we)=>ee[1]-we[1]).slice(0,le).forEach(([ee,we])=>{we<42&&n.set(U<ee?`${U}-${ee}`:`${ee}-${U}`,[Math.min(U,ee),Math.max(U,ee)])})});let s=new Mt,r=new Mt,a=[1,1,1],o=[];for(let[k,U]of n.values()){let le=t[k],ee=t[U],we=Z.sub(ee.p,le.p),Ee=Z.len(we),[Be,j]=go(Z.norm(we)),L=Z.add(Z.mul(Be,i.gauss()*.12*Ee),Z.mul(j,i.gauss()*.12*Ee)),re=Z.add(Z.lerp(le.p,ee.p,.5),L),ae=Ae=>Z.add(Z.add(Z.mul(le.p,(1-Ae)**2),Z.mul(re,2*Ae*(1-Ae))),Z.mul(ee.p,Ae*Ae)),oe=(le.m+ee.m)/2,Ie=.45+.9*oe;o.push({i:k,j:U,curve:ae,L:Ee});let We=Math.round(Ee*70*(.45+oe));for(let Ae=0;Ae<We;Ae++){let Pe=i(),He=ae(Pe),Ge=Ie*(.6+.8*Math.sin(Math.PI*Pe)**.5),Ke=Z.add(He,Z.add(Z.mul(Be,i.gauss()*Ge),Z.mul(j,i.gauss()*Ge)));s.add(Ke,{col:a,b:[.05,0,0,0,0],size:.7}),i()<.12&&s.add(Ke,{b:[0,0,0,0,.045],size:2.4}),i()<.022&&Z.len(Ke)>4&&r.add(Ke,{col:i()<.6?[.75,.85,1]:[1,.85,.65],b:[0,1.6,.6,0,0],size:.06})}}t.forEach((k,U)=>{let le=Math.round(1200+9e3*k.m),ee=.7+2*k.m;for(let we=0;we<le;we++){let Ee=ee*(i()<.5?.45:1),Be=[k.p[0]+i.gauss()*Ee,k.p[1]+i.gauss()*Ee,k.p[2]+i.gauss()*Ee];s.add(Be,{col:a,b:[.07,0,0,0,0],size:.6}),i()<.035&&Z.len(Be)>4&&r.add(Be,{col:i()<.25?[.8,.88,1]:[1,.8,.58],b:[0,1.8,.2,0,0],size:.06})}});for(let k=0;k<9e3;k++)s.add([i.range(-e,e),i.range(-e,e),i.range(-e,e)],{col:a,b:[.03,0,0,0,0],size:.8});let l=new pn,c=s.build(sn({gain:.22})),u=r.build(sn({gain:2.4}));l.add(c,u);let d=[];t.forEach((k,U)=>{if(U===0||k.m<.4)return;let le=Sn({center:k.p,R:3.5+5*k.m,type:"beta",rc:.22,beta:.65,amp:[0,0,0,0,1],gain:.8*k.m,noise:.25,noiseScale:2.5,seed:U});d.push(le),l.add(le)});let h=t.slice(1).reduce((k,U)=>U.m>k.m?U:k),p=o.find(k=>k.L>25)||o[0],v=[0,0,0],w=0;for(let k=0;k<4e3;k++){let U=[i.range(-50,50),i.range(-50,50),i.range(-50,50)],le=Math.min(...t.map(ee=>Z.len(Z.sub(ee.p,U))));le>w&&(w=le,v=U)}let g=o.filter(k=>k.i===0).map(k=>Z.norm(Z.sub(k.curve(.1),k.curve(0)))),f=[{kind:"label",text:"Knot",pos:h.p,zr:[7.2,9],stops:["02"]},{kind:"label",text:"Filament",pos:p.curve(.5),zr:[7.2,9],stops:["02"]},{kind:"label",text:"Void",pos:v,zr:[7.2,9],stops:["02"]},{kind:"image",text:"Bullet Cluster",pos:Z.add(h.p,[0,7,0]),zr:[7.2,9],stops:[],img:"bullet-cluster",caption:'Two colliding galaxy clusters. Stars (optical), hot gas (pink, X-ray) and dark matter (blue, from gravitational lensing) have separated: three kinds of "eyes" on one object.',credit:"X-ray: NASA/CXC/CfA/M.Markevitch; Optical & lensing: NASA/STScI, Magellan/U.Arizona/D.Clowe; ESO WFI"}],T=t.slice(1).filter(k=>{let U=Z.len(k.p);return U>55&&U<80}).sort((k,U)=>Math.abs(k.p[1])-Math.abs(U.p[1]))[0].p,R=3e3,b=new Mt;for(let k=0;k<R;k++)b.add(Z.lerp(T,[0,0,0],k/(R-1)),{col:[1,.55,.3],b:[0,1.4,0,0,0],size:.2});let _=b.build(sn({gain:0}));_.geometry.setDrawRange(0,0);let S=new Mt;S.add([0,0,0],{col:[1,.7,.45],b:[0,1,0,0,0],size:2.2});let E=S.build(sn({gain:0})),m=new Mt;m.add(T,{col:[1,.8,.6],b:[0,1,0,0,0],size:9});let M=m.build(sn({gain:0}));l.add(_,E,M);let A=s.a.position,C=2.5,N=new Map;for(let k=0;k<A.length;k+=3){let U=`${Math.floor(A[k]/C)},${Math.floor(A[k+1]/C)},${Math.floor(A[k+2]/C)}`;N.set(U,(N.get(U)||0)+1)}let F=200,P=[0];for(let k=1;k<=F;k++){let U=Z.lerp(T,[0,0,0],k/F),le=`${Math.floor(U[0]/C)},${Math.floor(U[1]/C)},${Math.floor(U[2]/C)}`;P.push(P[k-1]+1+Math.min((N.get(le)||0)*.08,2))}let V={src:T,t:-1,dur:6.5,dmCum:P,progress(){return this.t<0?0:Math.min(this.t/this.dur,1)},crossed(){let k=this.progress();return P[Math.round(k*F)]/P[F]},update(k,U){this.t>=0&&(this.t+=k);let le=this.progress(),ee=U?1:0;_.geometry.setDrawRange(0,Math.round(le*R)),_.material.uniforms.uGain.value=ee*.3,E.position.set(...Z.lerp(T,[0,0,0],le)),E.material.uniforms.uGain.value=ee*(this.t>=0&&le<1?1.5:0),M.material.uniforms.uGain.value=ee*(this.t>=0?6*Math.exp(-this.t/.4)+.4:0)}},K=k=>Z.lerp(T,[0,0,0],k),G=.5,Q=1e9;for(let k=0;k<=60;k++){let U=.2+.6*(k/60),le=K(U);for(let ee of t){let we=Z.len(Z.sub(ee.p,le));we<Q&&ee.m>.2&&(Q=we,G=U)}}let q="How much of the delay came from here?";return f.push({kind:"tag",when:"frbTags",short:!0,above:!0,pos:K(.02),zr:[7,9],text:"Host galaxy \xB7 DM_host",caption:q},{kind:"tag",when:"frbTags",short:!0,pos:K(.36),zr:[7,9],text:"Intergalactic gas \xB7 DM_IGM",caption:q},{kind:"tag",when:"frbTags",short:!0,above:!0,side:"left",pos:K(Math.min(.68,Math.max(.6,G))),zr:[7,9],text:"A halo on the way? \xB7 DM_halo",caption:q},{kind:"tag",when:"frbTags",short:!0,side:"left",pos:K(.98),zr:[7,9],text:"Milky Way \xB7 DM_MW",caption:"Our own Galaxy: modelled and subtracted."}),{group:l,volumes:d,marks:f,heroDirs:g,frb:V,materials:[c.material,u.material,...d.map(k=>k.material),_.material,E.material,M.material]}}var Nl=[1,.84,.64],Ou=[.62,.78,1],ku=[1,.76,.5],Ll=[1,.66,.42],Gg=[1,.42,.7];function Bu(i,e,t){for(;;){let n=Math.sqrt(i()*.98),s=e*n/(1-n);if(s<t)return s}}function Dl(i,e,t,n){let{type:s,at:r=[0,0,0],rot:a=[0,0,0],s:o=1,morphable:l=!1}=n,c=Uu(...a),u=f=>Z.add(r,Z.mul(c(f),o)),d=l?1:0,h=[],p=.26,v=3,w=(f,T)=>Math.log(f/.6)/p+T*Math.PI,g=(f,T,R=12)=>{let b=t.dir(),_=Bu(t,f,R);return[b[0]*_,b[1]*_*T,b[2]*_]};if(s==="spiral"||s==="lenticular"||s==="irregular"){let f=n.N??11e4;for(let _=0;_<f;_++){let S,E,m=0,M=!1;if(s==="irregular"){let C=n.clumps[t()*n.clumps.length|0];S=[C[0]+t.gauss()*C[3],(C[1]+t.gauss()*C[3])*.6,C[2]+t.gauss()*C[3]],E=t()<.6?Ou:Nl}else{let C=Math.min(v*-Math.log(t()*t()+1e-9)*.5+.3,17);M=s==="spiral"&&t()<.66;let N=M?w(C,t()<.5?0:1)+t.gauss()*.2:t()*2*Math.PI,F=M?.12:s==="lenticular"?.45:.28;S=[C*Math.cos(N),t.gauss()*F,C*Math.sin(N)],E=M?t()<.7?Ou:[.9,.92,1]:Nl,m=M?.65:0}let A=g(1,.8,20);i.add(u(S),{col:E,col2:Ll,b:[0,M?1.25:.45,0,0,0],size:.09,pos2:u(A),mf:[d,l?m:0]})}let T=s==="lenticular"?45e3:s==="irregular"?0:26e3;for(let _=0;_<T;_++){let S=g(.7,.8);i.add(u(S),{col:ku,col2:Ll,b:[0,.3,0,0,0],size:.08,pos2:u(Z.mul(S,1.3)),mf:[d,0]})}let R=s==="spiral"?n.knots??520:s==="irregular"?160:0;for(let _=0;_<R;_++){let S;if(s==="irregular"){let E=n.clumps[t()*n.clumps.length|0];S=[E[0]+t.gauss()*E[3],E[1]*.6,E[2]+t.gauss()*E[3]]}else{let E=t.range(1.8,14),m=w(E,t()<.5?0:1)+t.gauss()*.14;S=[E*Math.cos(m),t.gauss()*.05,E*Math.sin(m)]}h.push(S);for(let E=0;E<9;E++){let m=Z.add(S,[t.gauss()*.1,t.gauss()*.05,t.gauss()*.1]);i.add(u(m),{col:Gg,b:[0,.9,.15,1.4,0],size:.2,mf:[0,l?1:0]})}}let b=Math.round((s==="spiral"?n.Ngas??14e4:s==="irregular"?25e3:s==="lenticular"?4e3:0)*Math.min(1,o*o*1.5));for(let _=0;_<b;_++){let S;if(s==="irregular"){let E=n.clumps[t()*n.clumps.length|0];S=[E[0]+t.gauss()*E[3]*2.2,(E[1]+t.gauss()*E[3])*.5,E[2]+t.gauss()*E[3]*2.2]}else{let E=Math.min(-Math.log(t()*t()+1e-9)*4.6+1,42),M=t()<.65?w(E,t()<.5?0:1)+t.gauss()*.35:t()*2*Math.PI,A=E>16?.09*(E-16)*Math.sin(M-.6):0;S=[E*Math.cos(M),t.gauss()*.22+A,E*Math.sin(M)]}e.add(u(S),{b:[0,0,.009,0,0],size:.6,pos2:u(Z.mul(S,.22)),mf:[l?1:0,l?1:0]})}}if(s==="elliptical")for(let f=0;f<(n.N??9e4);f++){let T=g(n.a??2.2,.7,n.cap??12);i.add(u(T),{col:t()<.8?Ll:ku,b:[0,1,0,0,0],size:.1})}return h.map(u)}function zu(i){let e=Li(11),t=new Mt,n=new Mt,s=new Mt,r=new Mt,a=new Mt,o=new Mt,l=Dl(t,n,e,{type:"spiral",morphable:!0}),c=2.6,u=.45,d=[Math.cos(u)*Math.sin(c),Math.sin(u),Math.cos(u)*Math.cos(c)],h=Z.norm(Z.cross([0,1,0],d)),p=Z.cross(d,h),v=(U,le,ee=0)=>Z.add(Z.add(Z.mul(h,U),Z.mul(p,le)),Z.mul(d,ee)),w=[{name:"Elliptical",type:"elliptical",at:v(-66,34,-20),rot:[.4,0,.3],s:1,a:4.2,cap:42,N:19e4},{name:"Lenticular",type:"lenticular",at:v(78,-26,15),rot:[1.1,.3,0],s:1,N:5e4},{name:"Irregular",type:"irregular",at:v(66,30,10),rot:[.3,0,.5],s:.75,N:14e3,clumps:[[0,0,0,1.6],[2.5,.4,1.2,1],[-2,-.3,2.2,1.2],[1.2,.2,-2.4,.8],[-3,.5,-1,.7]]},{name:"Spiral",type:"spiral",at:v(20,-36,-30),rot:[1.25,.8,.2],s:.65,N:4e4,knots:160,Ngas:18e3}];w.forEach(U=>Dl(o,o,e,U));let g=new Mt,f=[[48,14,30],[-62,-20,55],[30,-34,-88]];f.forEach((U,le)=>{if(Dl(s,g,e,{type:"irregular",at:U,rot:[e()*3,e()*3,0],s:.35,N:6e3,clumps:[[0,0,0,1.4],[1.2,0,.8,.8]]}),le<2){let ee=Z.len(U),we=Z.norm(U),Ee=Z.add(le===0?[.15,1,.5]:[.6,1,-.25],[e.gauss()*.08,e.gauss()*.08,e.gauss()*.08]),Be=Z.norm(Z.cross(Ee,we)),j=Z.cross(we,Be),L=(le===0?100:85)*Math.PI/180;for(let re=0;re<5e3;re++){let ae=1-Math.sqrt(1-e()),oe=e.gauss(),Ie=e.gauss(),We=e.gauss(),Ae=-L*ae+.008*Math.tanh(We),Pe=Z.add(Z.mul(we,Math.cos(Ae)),Z.mul(Be,Math.sin(Ae))),He=1.2+3.2*ae,Ge=ee+ee*.06*Math.tanh(oe*He/(ee*.06)),Ke=2*He*Math.tanh(Ie/2),ft=Z.add(Z.mul(Pe,Ge),Z.mul(j,Ke));g.add(ft,{b:[0,0,.04,.005,0],size:1.4,pos2:[0,0,0],mf:[0,1]})}}});for(let U=0;U<7e4;U++){let le=e.dir(),ee=Bu(e,45,500);a.add(Z.mul(le,ee),{b:[.11,0,0,0,0],size:5})}let T=new Mt;(i.length?i.slice(0,4):[[1,.2,0],[-.6,.3,.7],[0,-.8,-.6]]).forEach((U,le)=>{let[ee,we]=go(U),Ee=Z.mul(U,2600),Be=Z.add(Z.mul(ee,e.gauss()*260),Z.mul(we,e.gauss()*260)),j=Z.add(Z.mul(ee,14*(le%2?1:-1)),[0,2*(le-1),0]),L=Z.add(Z.mul(U,700),Be),re=ae=>Z.add(Z.add(Z.mul(Ee,(1-ae)**2),Z.mul(L,2*ae*(1-ae))),Z.mul(j,ae*ae));for(let ae=0;ae<26e3;ae++){let oe=e()**.7,Ie=re(oe),We=re(Math.min(oe+.02,1)),Ae=6+140*(1-oe)**1.5,Pe=Z.add(Ie,Z.add(Z.mul(ee,e.gauss()*Ae),Z.mul(we,e.gauss()*Ae)));a.add(Z.add(Ie,Z.add(Z.mul(ee,e.gauss()*Ae*2),Z.mul(we,e.gauss()*Ae*2))),{b:[.09,0,0,0,0],size:6+Ae*.15}),T.add(Pe,{b:[0,0,.12+.16*oe,.02,0],size:1+Ae*.06,vel:Z.sub(We,Ie),rate:.25+e()*.15,phase:e(),mf:[0,1]}),e()<.02&&s.add(Pe,{col:Nl,b:[0,1.3,.3,0,0],size:.5})}});for(let U=0;U<12e3;U++){let le=e()<.5?1:-1,ee=e()*.42,we=e()*2*Math.PI,Ee=[Math.sin(ee)*Math.cos(we),le*Math.cos(ee),Math.sin(ee)*Math.sin(we)],Be=e.range(40,110);r.add(Z.mul(Ee,.5+e()*2.5),{b:[0,0,0,.035*(1-ee),.03],mf:[0,1],size:1+Be*.02,vel:Z.mul(Ee,Be),acc:Z.mul(Ee,Be*.4),rate:.035+e()*.03,phase:e()})}for(let U=0;U<9e3;U++){let le=e.range(2,11),ee=e()*2*Math.PI,we=e()<.5?1:-1,Ee=[Math.cos(ee)*4,we*e.range(25,55),Math.sin(ee)*4];r.add([le*Math.cos(ee),0,le*Math.sin(ee)],{b:[0,0,.04,.06,.01],size:.6,vel:Ee,acc:[0,-Ee[1],0],rate:.05+e()*.04,phase:e(),mf:[0,1]})}for(let U=0;U<420;U++){let le=Math.exp(e.range(Math.log(22),Math.log(230))),ee=Z.mul(e.dir(),le),we=e.range(1.2,3.5);for(let Ee=0;Ee<10;Ee++)n.add(Z.add(ee,[e.gauss()*we,e.gauss()*we,e.gauss()*we]),{b:[0,0,.015,.03,0],size:we*1.2})}let b=new pn,_=[],S=(U,le)=>{let ee=U.build(sn(le));return b.add(ee),_.push(ee.material),ee};S(a,{gain:.3}),S(n,{morph:ut.uMorph}),S(t,{morph:ut.uMorph,gain:.18}),S(s,{gain:.45});let E=S(o,{gain:.45});S(r,{morph:ut.uMorph});let m=S(T,{morph:ut.uMorph}),M=S(g,{morph:ut.uMorph}),A=new Mt;A.add([0,0,0],{col:[1,.95,.85],b:[0,14,0,0,.6],size:1.6});for(let U=0;U<9e3;U++){let le=e()<.5?1:-1,ee=e()*.05,we=e()*2*Math.PI,Ee=[Math.sin(ee)*Math.cos(we),le*Math.cos(ee),Math.sin(ee)*Math.sin(we)];A.add(Z.mul(Ee,e()*2),{col:[.72,.84,1],b:[0,.22,0,0,.3],size:.45,vel:Z.mul(Ee,e.range(45,75)),rate:.18+e()*.1,phase:e()})}let C=S(A,{}),N=[1,-1].map(U=>Sn({center:[0,U*22,0],R:20,type:"shell",inner:.86,width:.08,noise:.5,noiseScale:3,amp:[0,0,0,.1,1.2],gain:.7,seed:U>0?4:8}));N.forEach(U=>{b.add(U),_.push(U.material)});let F={set(U){C.material.uniforms.uGain.value=U,N.forEach(le=>{le.material.uniforms.uGain.value=.7*U,le.visible=U>.01}),C.visible=U>.01}};F.set(0);let P=Sn({center:[0,0,0],R:300,type:"beta",rc:.07,beta:.5,amp:[0,0,0,0,1],gain:.4,noise:.2,noiseScale:3}),V=Sn({center:w[0].at,R:120,type:"beta",rc:.08,beta:.55,amp:[0,0,0,0,1],gain:.7});b.add(P,V),_.push(P.material,V.material);let K=l.filter(U=>{let le=Math.hypot(U[0],U[2]);return le>7&&le<9})[0]||l[0],G=[{kind:"image",text:"M51 \u2014 the Whirlpool",pos:[0,9,-16],zr:[4.3,5.25],img:"m51-optical",stops:["06"],caption:"A real spiral galaxy, M51, with its small companion. Blue arms are young stars; the yellow centre is old stars.",credit:"X-ray: NASA/CXC/SAO; Optical: Detlef Hartmann; Infrared: NASA/JPL-Caltech"},{kind:"image",text:"M51 in 21 cm (FAST)",pos:[-30,4,18],zr:[4.3,5.3],img:"m51-hi-fast",stops:["07"],caption:"Cold hydrogen gas around M51 mapped by FAST. The gas reaches far beyond the stars (dashed ellipse = optical size).",credit:"Lin, including Qu+ 2025"},{kind:"image",text:"M81 group",pos:Z.add(f[1],[0,10,0]),zr:[4.3,5.4],img:"m81-group",stops:["07"],caption:"The M81 galaxy group. Galaxies are connected by streams of gas pulled out by their gravitational interaction.",credit:"de Blok et al. 2018"},{kind:"image",text:"M82 \u2014 a galactic wind",pos:[6,60,0],zr:[4.9,5.9],img:"m82",stops:["10"],bands:["all","warm","hot"],caption:"The starburst galaxy M82. Exploding stars drive hot (X-ray, blue) and warm (H\u03B1, red) gas out of the disk.",credit:"X-ray: NASA/CXC/JHU/D.Strickland; Optical: NASA/ESA/STScI/AURA/Hubble Heritage; IR: NASA/JPL-Caltech/Univ. of AZ/C. Engelbracht"},{kind:"image",text:"Hubble\u2019s tuning fork",pos:v(-24,58),zr:[5.2,5.47],img:"hubble-scheme",when:"zoo",caption:"Edwin Hubble sorted galaxies by shape: ellipticals on the left, spirals on the right.",credit:"Cosmogoblin @ Wikipedia"},{kind:"image",text:"Types of galaxies",pos:v(48,6),zr:[5.2,5.47],img:"galaxy-types",when:"zoo",caption:"Real galaxies (Hubble Space Telescope): spiral, barred spiral, elliptical, irregular, lenticular, peculiar.",credit:"Hubble Space Telescope image archive"},...w.map(U=>({kind:"fly",text:U.name,pos:Z.add(U.at,[0,22*U.s,0]),zr:[5.2,5.47],target:U.at,zoom:U.type==="elliptical"?4.95:Math.log10(6e4*U.s),when:"zoo"})),{kind:"tag",when:"agn",pos:[0,0,0],zr:[4.6,5.6],text:"Radiation (quasar mode)",caption:"A bright accreting black hole: its light and fast winds clear gas out of the galaxy."},{kind:"tag",when:"agn",pos:[0,29,0],zr:[4.6,5.6],text:"Jets (radio mode)",caption:"Narrow beams of particles near light speed, punching far into the halo and heating it."},{kind:"tag",when:"agn",side:"left",pos:[-19,26,0],zr:[4.6,5.6],text:"Bubbles",caption:"Hot gas inflated by past outbursts \u2014 like the Milky Way\u2019s eROSITA/Fermi bubbles."},{kind:"fly",text:"Our spiral",pos:[0,24,0],zr:[5.2,5.47],target:[0,0,0],zoom:4.82,when:"zoo"}],Q=[],q=(U,le,ee)=>{let we=Li(ee),Ee=Z.norm(Z.add(Z.add(Z.mul(d,.86),Z.mul(h,-.42)),Z.mul(p,.1))),Be=Z.sub(U,Z.mul(Ee,420)),j=Z.add(U,Z.mul(Ee,45)),L=new Mt;L.add(Be,{col:[.75,.88,1],b:[0,40,0,0,0],size:6});for(let Pe=0;Pe<60;Pe++)L.add(Z.add(Be,Z.mul(we.dir(),we()*6)),{col:[.7,.8,1],b:[0,3,0,0,0],size:4});let re=Z.len(Z.sub(j,Be));for(let Pe=0;Pe<2600;Pe++){let He=we();L.add(Z.add(Be,Z.mul(Ee,He*re)),{col:[.8,.9,1],b:[0,.5,0,0,0],size:.7})}for(let Pe=0;Pe<1400;Pe++)L.add(Be,{col:[.85,.93,1],b:[0,2.2,0,0,0],size:1.1,vel:Z.mul(Ee,re),rate:.16,phase:we()});let ae=new Mt,oe=[];le.forEach(Pe=>{let He=Z.add(U,Z.mul(Ee,Pe.s)),Ge=Pe.phase==="cold"?[0,0,.5,.35,0]:[0,0,0,.6,.12];for(let Ke=0;Ke<160;Ke++)ae.add(Z.add(He,[we.gauss()*Pe.r,we.gauss()*Pe.r,we.gauss()*Pe.r]),{b:Ge,size:Pe.r*.9});oe.push({...Pe,pos:He})});let Ie=L.build(sn({gain:0})),We=ae.build(sn({gain:0}));b.add(Ie,We),_.push(Ie.material,We.material);let Ae={beam:Ie,blobs:We,clouds:oe,quasar:Be,gain:0,target:0};return Q.push(Ae),Ae};q(v(40,-14),[{s:-80,r:4,phase:"cold",ion:"Mg II",lam:.18},{s:-45,r:7,phase:"warm",ion:"O VI",lam:.36},{s:-12,r:4.5,phase:"cold",ion:"H I",lam:.52},{s:22,r:8,phase:"warm",ion:"C IV",lam:.7}],41),q(Z.add(w[0].at,v(16,-14)),[{s:-40,r:4,phase:"cold",ion:"Mg II",lam:.22},{s:6,r:3.5,phase:"cold",ion:"Mg II",lam:.6}],43),G.push({kind:"tag",when:"qsoTag",side:"left",above:!0,pos:Q[0].quasar,zr:[4.6,6],text:"Background quasar (QSO)",caption:"A brilliant, distant galaxy core. Halo gas in front of it leaves dark absorption lines in its light."});let k=Sn({center:[0,0,0],R:230,type:"shell",inner:.94,width:.045,noise:.45,noiseScale:3,amp:[0,0,0,0,1],gain:0,seed:12});return b.add(k),_.push(k.material),k.visible=!1,{group:b,materials:_,knot:K,marks:G,neighbours:w,sightlines:Q,sky:{sx:h,sy:p,vd:d,onSky:v},nbrMat:E.material,halo:P,inflowMat:m.material,satGasMat:M.material,agn:F,shock:k}}var _i=[150,6,-95];function Vu(i){let e=Li(23),t=new Mt,n=new Mt,s=new Mt,r=Z.norm([i[0],0,i[2]]),a=[-r[2],0,r[0]];for(let E=0;E<6e4;E++){let m=e.gauss()*900,M=e.gauss()*(e()<.5?160:700),A=Z.add(Z.add(Z.mul(r,m),Z.mul(a,M)),[0,e.gauss()*70,0]),C=e()<.12;t.add(A,{col:C?[.7,.82,1]:e()<.5?[1,.86,.7]:[1,.72,.5],b:[0,C?1.6:1,0,0,0],size:e.range(.25,.5)})}for(let E=0;E<260;E++){let m=Z.add(Z.add(Z.mul(r,e.gauss()*900),Z.mul(a,-60+e.gauss()*90)),[0,e.gauss()*18,0]),M=e.range(8,40);for(let A=0;A<70;A++)n.add(Z.add(m,[e.gauss()*M,e.gauss()*M*.4,e.gauss()*M]),{b:[0,0,.12,0,0],size:M*.7})}let o=[-46,2,30];for(let E=0;E<40;E++){let m=Z.add(o,[e.gauss()*26,e.gauss()*12,e.gauss()*26]),M=e.range(3,11);for(let A=0;A<450;A++)n.add(Z.add(m,[e.gauss()*M,e.gauss()*M,e.gauss()*M]),{b:[0,0,.09,.005,0],size:M*.5})}for(let E=0;E<700;E++){let m=e()<.7?2.5:6;s.add([e.gauss()*m,e.gauss()*m,e.gauss()*m],{col:[.75,.86,1],b:[0,2.4,0,0,0],size:e.range(.25,.45)})}for(let E=0;E<14;E++)s.add([e.gauss()*2,e.gauss()*2,e.gauss()*2],{col:[.7,.85,1],b:[0,12,0,0,0],size:1.6});let l=42;for(let E=0;E<6e4&&n.n<4e5;E++){let m=e.dir(),M=Math.sin(m[0]*9+m[1]*3)*Math.sin(m[2]*8-m[1]*5)+.6*Math.sin(m[0]*17+m[2]*13),A=m[0]>.55?0:1;if(Math.abs(M)>.22||!A)continue;let C=.8+.12*Math.sin(m[0]*5+m[2]*4)*Math.cos(m[1]*6)+e.gauss()*.02;n.add(Z.mul(m,l*C),{b:[0,.04,0,.5,0],size:1.6})}let c=new pn,u=[];for(let[E,m]of[[n,{gain:.5}],[t,{gain:.6}],[s,{gain:.3}]]){let M=E.build(sn(m));c.add(M),u.push(M.material)}let d=Sn({center:[0,0,0],R:l,type:"uniform",noise:.95,noiseScale:2.6,amp:[0,0,0,1,0],gain:.32,seed:3});c.add(d),u.push(d.material);let h=Sn({center:[0,0,0],R:l*.82,type:"beta",rc:.35,beta:.6,noise:.5,noiseScale:2.4,amp:[0,0,0,0,1],gain:.22,seed:21}),p=Sn({center:[l*.95,4,0],R:l*.6,type:"beta",rc:.4,beta:.7,noise:.6,noiseScale:2.8,amp:[0,0,0,0,1],gain:.1,seed:22});c.add(h,p),u.push(h.material,p.material);let v=new Mt;v.add(_i,{col:[.75,.88,1],b:[0,10,0,0,0],size:1.8});let w=v.build(sn({}));c.add(w),u.push(w.material);let g=new Mt;g.add([0,0,0],{col:[1,.95,.9],b:[0,1,0,0,0],size:60});let f=g.build(sn({gain:0,fadeLarge:!1}));f.position.set(..._i),c.add(f),u.push(f.material);let T=Sn({center:_i,R:1,type:"shell",inner:.9,width:.045,noise:.95,noiseScale:4.5,amp:[0,0,0,.15,1.4],gain:.9,seed:9});c.add(T),u.push(T.material);let R=new Mt;for(let E=0;E<4e4;E++){let m=e.dir(),M=.9+.08*Math.sin(m[0]*11+m[1]*4)*Math.sin(m[2]*9)+e.gauss()*.015;Math.abs(Math.sin(m[0]*13+m[1]*7)*Math.sin(m[2]*11-m[0]*5))<.25&&R.add(Z.mul(m,M),{b:[0,0,0,.6,.5],size:.014})}let b=R.build(sn({}));b.position.set(..._i),c.add(b),u.push(b.material);let _={t:-1,update(E){this.t>=0&&(this.t+=E);let m=this.t>=0,M=m?1+31*Math.min(this.t/9,1)**.45:.001;T.setRadius(M),b.scale.setScalar(M),T.visible=b.visible=m,w.material.uniforms.uGain.value=m?0:1,f.material.uniforms.uGain.value=m?60*Math.exp(-this.t/.35)+2*Math.exp(-this.t/2.5):0}},S=[{kind:"image",text:"Tarantula Nebula",stops:["12"],pos:[0,52,0],zr:[1.8,3.2],img:"tarantula",caption:"The Tarantula Nebula (30 Doradus): thousands of newborn stars carving bubbles into the gas around them.",credit:"ESA"},{kind:"image",text:"S106 \u2014 a star being born",stops:["12"],pos:[-50,30,34],zr:[1.8,3.2],img:"s106",caption:"Star-forming region S106. A young massive star blows two lobes of glowing gas out of its natal cloud.",credit:"Hubble data from proposal 12326: K. Noll, Z. Levay, M. Livio, H. Bond, C. Christian, L. Frattare, M. Mutchler, T. Borders (Hubble Heritage Team/STScI)"},{kind:"image",text:"HL Tau \u2014 planets forming",stops:["12"],pos:[24,-30,10],zr:[1.8,3.2],img:"hl-tau",caption:"Zoom in another few hundred thousand times: a disk around a young star (~200 AU across), with gaps carved by forming planets.",credit:"ALMA (ESO/NAOJ/NRAO)"},{kind:"image",text:"Cas A \u2014 a supernova remnant",stops:["13"],pos:Z.add(_i,[0,40,0]),zr:[1.8,3.2],img:"cas-a",after:"sn",caption:"Cassiopeia A, the debris of a star that exploded ~350 years ago, glowing in X-rays at millions of degrees.",credit:"NASA/CXC/SAO"},{kind:"image",text:"Crab Nebula \u2014 SN 1054",stops:["13"],pos:Z.add(_i,[34,-16,0]),zr:[1.8,3.2],img:"crab",after:"sn",caption:"The Crab Nebula: remains of the supernova recorded by Chinese astronomers in 1054 AD.",credit:"NASA (NAS5-26555)"}];return{group:c,materials:u,sn:_,marks:S}}function Hu(i,e,{zoom:t,rotate:n}){let s=new Map,r=!1,a=()=>{let[o,l]=[...s.values()];return Math.hypot(o.x-l.x,o.y-l.y)};for(let o of[i,e]){o.addEventListener("wheel",c=>{c.preventDefault();let u=c.deltaMode===1?16:c.deltaMode===2?i.clientHeight:1;t(c.deltaY*u*.0015)},{passive:!1}),o.addEventListener("pointerdown",c=>{s.size||(r=!1),!(o!==i&&c.pointerType!=="touch")&&(s.set(c.pointerId,{x:c.clientX,y:c.clientY}),s.size>1&&(r=!0),c.target.setPointerCapture(c.pointerId))}),o.addEventListener("pointermove",c=>{let u=s.get(c.pointerId);if(!u)return;let d=s.size===2?a():0;if(s.set(c.pointerId,{x:c.clientX,y:c.clientY}),s.size===2){let h=a();d>0&&h>0&&t(Math.log10(d/h))}else r||n(c.clientX-u.x,c.clientY-u.y)});let l=c=>s.delete(c.pointerId);for(let c of["pointerup","pointercancel","lostpointercapture"])o.addEventListener(c,l);o.addEventListener("click",c=>{r&&(c.preventDefault(),c.stopPropagation())},!0)}return{active:()=>s.size>0}}var Ul=50,gs=(i,e,t)=>{let n=Math.min(Math.max((t-i)/(e-i),0),1);return n*n*(3-2*n)},Fl=i=>i<.5?4*i*i*i:1-(-2*i+2)**3/2,Wg=`
<canvas id="gl"></canvas>
<div id="marks"></div>
<nav id="ladder" aria-label="Scale"></nav>
<div id="scalebar"><div class="bar"></div><span></span></div>
<div id="bands" role="toolbar" aria-label="Which light to see"></div>
<div id="morph">
  <label>Gas supply</label>
  <input type="range" min="0" max="100" value="0" step="1">
  <div class="ends"><span>Fed \xB7 blue, star-forming</span><span>Starved \xB7 red, quiet</span></div>
</div>
<div id="halo">
  <label>Hot halo</label>
  <input type="range" min="0" max="100" value="0" step="1">
  <div class="ends"><span>Weak \xB7 smaller halo, cold streams</span><span>Strong \xB7 massive halo</span></div>
</div>
<div class="disclaimer">Conceptual illustration \xB7 real images behind every \u25C9</div>`;function Gu(i){let{STEPS:e}=i;document.body.insertAdjacentHTML("afterbegin",Wg);let t=W=>document.querySelector(W),n=t("#gl"),s=new ao({canvas:n,antialias:!1,powerPreference:"high-performance"});s.toneMapping=Ci,s.toneMappingExposure=.9;let r=matchMedia("(pointer: coarse)").matches,a=Math.min(screen.width,screen.height),o=r?a<600?.7:.85:1,l=Math.min(window.devicePixelRatio||1,o);s.setPixelRatio(l);let c=new ho(s);c.setPixelRatio(l),c.addPass(new po(new Qe("#03060c"),1));let u=Fu(),d=zu(u.heroDirs),h=Z.mul(d.knot,1e3),p=Z.norm([-d.knot[2],0,d.knot[0]]),v=Vu(p),w=[{name:"web",unit:1e6,origin:[0,0,0],obj:u,fade:W=>gs(6.45,7.1,W)},{name:"galaxy",unit:1e3,origin:[0,0,0],obj:d,fade:W=>(1-gs(6.9,7.45,W))*gs(3.2,4.1,W)},{name:"region",unit:1,origin:h,obj:v,fade:W=>1-gs(3.3,4,W)}];for(let W of w)W.scene=new Us,W.scene.add(W.obj.group),W.cam=new Kt(Ul,1,.001,1e4),W.pass=new fo(W.scene,W.cam),W.pass.clear=!1,c.addPass(W.pass),W.opacity=1;let g=new ms(new Ye(512,512),.6,.6,.7);c.addPass(g),c.addPass(new mo);let f={hero:[0,0,0],knot:h,sn:Z.add(h,_i),sight1:Z.mul(d.sky.onSky(28,12),1e3),pair:Z.mul(Z.lerp([0,0,0],d.neighbours[0].at,.5),1e3),frbMid:Z.mul(u.frb.src,5e5)},T=Math.atan2(u.frb.src[0],u.frb.src[2])+Math.PI/2,R=W=>Array.isArray(W)?W:f[W],b=W=>W==="frb"?T:W,_={f:[0,0,0],z:8.2,az:.6,el:.32},S=null,E=-1e9,m=null;function M(W,{instant:ue=!1,dur:be=0}={}){let Le={f:R(W.f??_.f),z:W.z??_.z,az:b(W.az??_.az),el:W.el??_.el};m=Le.z<3.6?[...Le.f]:null,E=-1e9;let tt=((Le.az-_.az)%(2*Math.PI)+3*Math.PI)%(2*Math.PI)-Math.PI;if(Le.az=_.az+tt,ue){Object.assign(_,Le),S=null;return}let Xe=Math.abs(Le.z-_.z),ht=Z.len(Z.sub(Le.f,_.f))>1e-6;S={from:{..._,f:[..._.f]},to:Le,t:0,dur:be||1.2+.6*Xe+(ht?.4:0)}}function A(W){if(!S)return;S.t=Math.min(S.t+W/S.dur,1);let{from:ue,to:be,t:Le}=S,tt=Fl(Le),Xe=be.z<ue.z-.2?Fl(Math.min(1,Le*1.7)):be.z>ue.z+.2?Fl(Math.max(0,(Le-.4)/.6)):tt;_.z=ue.z+(be.z-ue.z)*tt,_.az=ue.az+(be.az-ue.az)*tt,_.el=ue.el+(be.el-ue.el)*tt,Math.min(ue.z,be.z)<3.6&&Math.max(ue.z,be.z)>4.3&&(_.el=Math.min(1.35,_.el+.75*Math.sin(Math.PI*tt))),_.f=Z.lerp(ue.f,be.f,Xe),Le>=1&&(S=null)}let C="alldm",N=[...Di.alldm.w],F=0;function P(W){C=W;let ue=["absorb","galaxy","accrete"].includes(W)?"all":W;document.querySelectorAll("#bands button").forEach(be=>be.setAttribute("aria-pressed",be.dataset.band===ue))}let V=["all","dm","stars","cold","warm","hot"],K={all:"everything that shines",dm:"invisible, gravity only",stars:"optical",cold:"radio 21 cm",warm:"H\u03B1 \xB7 UV",hot:"X-ray"};t("#bands").innerHTML=V.map((W,ue)=>`<button data-band="${W}" class="b-${W}"><i></i><span>${Di[W].label}</span><small>${K[W]}</small><kbd>${ue+1}</kbd></button>`).join(""),t("#bands").addEventListener("click",W=>{let ue=W.target.closest("button");ue&&P(ue.dataset.band)});let G=t("#morph input");G.addEventListener("input",()=>{F=G.value/100});let Q=0,q=0,k=t("#halo input");k.addEventListener("input",()=>{Q=k.value/100});let U=[{z:8,name:"Cosmic web",len:"100 Mpc"},{z:6.5,name:"Galaxy group",len:"3 Mpc"},{z:5.5,name:"Galaxy halo",len:"300 kpc"},{z:4.6,name:"Galaxy",len:"40 kpc"},{z:2.5,name:"Star-forming region",len:"300 pc"},{z:1.6,name:"Nebula",len:"40 pc"}],le=1.3,ee=8.8,we=W=>(1-(W-le)/(ee-le))*100;t("#ladder").innerHTML='<div class="rail"></div><div class="you"></div>'+U.map(W=>`<button style="top:${we(W.z)}%" data-z="${W.z}"><b>${W.name}</b><span>${W.len}</span></button>`).join(""),t("#ladder").addEventListener("click",W=>{let ue=W.target.closest("button");if(!ue)return;let be=+ue.dataset.z;M({z:be,f:be<3.6?"knot":"hero"})});let Ee=W=>W>=1e6?`${+(W/1e6).toPrecision(2)} Mpc`:W>=1e3?`${+(W/1e3).toPrecision(2)} kpc`:`${+W.toPrecision(2)} pc`;function Be(W){let ue=W*3.2616;return ue>=1e9?`${+(ue/1e9).toPrecision(2)} billion light-years`:ue>=1e6?`${+(ue/1e6).toPrecision(2)} million light-years`:ue>=1e4?`${Math.round(ue/1e3).toLocaleString("en")},000 light-years`:`${Math.round(ue).toLocaleString("en")} light-years`}let j=null,L={};function re(){j||(j={bar:t("#scalebar .bar"),span:t("#scalebar span"),you:t("#ladder .you"),rungs:[...document.querySelectorAll("#ladder button")]});let W=10**_.z,ue=W*.16,be=10**Math.floor(Math.log10(ue)),Le=[5,2,1].map(Tt=>Tt*be).find(Tt=>Tt<=ue)||be,tt=`${Le/W*innerWidth}px`,Xe=`${Ee(Le)} <em>\u2248 ${Be(Le)}</em>`,ht=`${we(Math.min(Math.max(_.z,le),ee))}%`,Vt=U.reduce((Tt,ke)=>Math.abs(ke.z-_.z)<Math.abs(Tt.z-_.z)?ke:Tt).z;tt!==L.width&&(j.bar.style.width=tt),Xe!==L.label&&(j.span.innerHTML=Xe),ht!==L.top&&(j.you.style.top=ht),Vt!==L.near&&j.rungs.forEach(Tt=>Tt.classList.toggle("here",+Tt.dataset.z===Vt)),L={width:tt,label:Xe,top:ht,near:Vt}}let ae=[];w.forEach((W,ue)=>(W.obj.marks||[]).forEach(be=>{let Le=document.createElement(be.kind==="label"||be.kind==="tag"?"div":"button");Le.className=`mark ${be.kind}${be.side==="left"?" left":""}${be.above?" above":""}${be.short?" short":""}`,Le.innerHTML=be.kind==="label"?be.text:be.kind==="tag"?`<i></i><div><b>${be.text}</b><span>${be.caption}</span></div>`:`<i></i><span>${be.text}</span>`,t("#marks").appendChild(Le),be.kind==="image"&&(i.preloadFig?.(be.img,e.flatMap((tt,Xe)=>(be.when?tt[be.when]:!be.stops||be.stops.includes(tt.stop))?[Xe]:[])),Le.addEventListener("click",()=>i.openLightbox([{img:be.img,src:i.figSrc(be.img),t:be.text,c:be.caption,cr:be.credit}],0))),be.kind==="fly"&&Le.addEventListener("click",()=>M({f:Z.mul(be.target,1e3),z:be.zoom??4.75})),ae.push({...be,el:Le,li:ue})}));let oe=new H,Ie=8,We=.25;function Ae(){let W=[],ue=Math.min(innerWidth/100,innerHeight/56.25),be=e[i.idx()],Le=i.marksHidden(),tt=!!document.querySelector("#titlecard.on"),Xe=document.body.classList.contains("bare"),ht=y=>!y||Xe||y.getBoundingClientRect().width===0?!1:y.classList.contains("panel")?!0:["ladder","bands","card"].includes(y.id)&&tt?!1:["ladder","bands","touchnav","scalebar"].includes(y.id)||y.classList.contains("brand")||y.classList.contains("on"),Vt=[t(".brand"),t("#scalebar"),t("#rinfo"),t("#card"),t("#ladder"),t("#dock"),t("#bands"),t("#morph"),t("#halo"),t("#touchnav"),...document.querySelectorAll("#panels .panel.on")].filter(ht).map(y=>y.getBoundingClientRect()),Tt=8,ke=2*ue,qt=y=>!Vt.some(D=>y.l<D.right+Tt&&y.r>D.left-Tt&&y.t<D.bottom+Tt&&y.b>D.top-Tt)&&!W.some(D=>y.l<D.r+6&&y.r>D.l-6&&y.t<D.b+6&&y.b>D.t-6)&&y.l>ke-.5&&y.t>ke-.5&&y.r<innerWidth-ke+.5&&y.b<innerHeight-ke+.5;for(let y of ae){let D=w[y.li],J=y.when?!!be[y.when]:!!(y.stops&&y.stops.includes(be.stop)),X=(y.when?J&&!i.marksHidden({ignoreDim:!0}):!Le&&(!y.stops||J))&&!(y.after==="sn"&&v.sn.t<0),$=_.z>=y.zr[0]&&_.z<=y.zr[1],Me=J?.25:.6,Ce=y.el.classList.contains("on"),ve=X&&(J?D.opacity>(Ce?Me-.1:Me):D.opacity>(Ce?Me-.1:Me)&&$);if(ve&&(oe.set(...y.pos).project(D.cam),ve=oe.z<1),ve||(y.pk=null,y.off=null,y.miss=0),ve){let Re=(oe.x*.5+.5)*innerWidth,De=(-oe.y*.5+.5)*innerHeight,et=y.el.offsetWidth,nt=y.el.offsetHeight,Ne=(xe,Et,at,St)=>{let Yt=y.kind==="label"?xe-et/2:y.kind==="tag"?at?xe-et+.55*ue:xe-.55*ue:xe-.9*ue,un=y.kind==="tag"?St?Et-nt+.55*ue:Et-.55*ue:Et-nt/2;return{l:Yt,t:un,r:Yt+et,b:un+nt}},rt=y.side==="left",yt=!!y.above,pt=Ne(Re,De,rt,yt);pt.l<ke&&(Re+=ke-pt.l),pt.r>innerWidth-ke&&(Re-=pt.r-innerWidth+ke),pt.t<ke&&(De+=ke-pt.t),pt.b>innerHeight-ke&&(De-=pt.b-innerHeight+ke);let _t=xe=>qt(Ne(Re+xe.dx,De+xe.dy,xe.left,xe.above)),lt=y.pk;if(lt&&(y.miss=_t(lt)?0:y.miss+1,!S&&y.miss>=Ie&&(lt=null)),!lt){let xe=y.kind==="tag"?[[rt,yt],[rt,!yt],[!rt,yt],[!rt,!yt]]:[[rt,yt]],Et=nt+10,at=[[0,0]];for(let St=1;St<=8;St++)at.push([0,-St*Et],[0,St*Et],[-St*6*ue,0],[St*6*ue,0],[-St*6*ue,-St*Et]);for(let[St,Yt]of at){for(let[un,Kn]of St||Yt?[[rt,yt]]:xe){let vt={dx:St,dy:Yt,left:un,above:Kn};if(_t(vt)){lt=vt;break}}if(lt)break}!lt&&!J&&(ve=!1),lt=lt||y.pk||{dx:0,dy:0,left:rt,above:yt},y.pk=lt,y.miss=0}if(ve){y.kind==="tag"&&(y.el.classList.toggle("left",lt.left),y.el.classList.toggle("above",lt.above)),y.off=y.off&&Ce?[y.off[0]+(lt.dx-y.off[0])*We,y.off[1]+(lt.dy-y.off[1])*We]:[lt.dx,lt.dy];let xe=Re+y.off[0],Et=De+y.off[1];W.push(Ne(Re+lt.dx,De+lt.dy,lt.left,lt.above)),y.el.style.transform=`translate(${xe}px, ${Et}px)`}}y.el.classList.toggle("on",ve)}}let Pe=d.sightlines,He=!1,Ge=!1,Ke=0,ft=1,Pt=1,xt=0,Ct=0;function B(W,ue={}){let be=i.idx(),Le=ue.instant||ue.jump;if(!ue.keepCam){let tt=Le?e.slice(0,be+1).reverse().find(Xe=>Xe.cam):W;W.from&&!Le&&M(W.from,{instant:!0}),tt&&tt.cam&&M(tt.cam,ue.jump?{dur:1.1}:ue)}W.band&&Di[W.band]&&(P(W.band),Le&&N.splice(0,5,...Di[W.band].w)),W.morph!==void 0&&(F=W.morph,G.value=W.morph*100,Le&&(ut.uMorph.value=W.morph)),t("#morph").classList.toggle("on",!!W.morphUI),t("#halo").classList.toggle("on",!!W.haloUI),Q=typeof W.halo=="number"?W.halo:0,k.value=Q*100,Le&&(q=Q),W.sn==="reset"&&(v.sn.t=-1),He=W.sn==="trigger",He&&(v.sn.t=-1),W.sn==="done"&&v.sn.t<0&&(v.sn.t=9),Le&&!W.sn&&(v.sn.t=e.slice(0,be).some(tt=>tt.sn==="trigger")?9:-1),Ge=W.frb==="trigger",Ge&&(u.frb.t=-1),W.frb==="done"&&u.frb.t<0&&(u.frb.t=99),Pe.forEach((tt,Xe)=>{tt.target=(W.sight||[]).includes(Xe)?1:0,Le&&(tt.gain=tt.target)}),Pt=typeof W.inflow=="number"?W.inflow:1,Ct=W.agn?1:0,Le&&(ft=Pt,xt=Ct),Ke=0}let zt=Hu(n,t("#marks"),{rotate(W,ue){S=null,_.az-=W*.005,_.el=Math.max(-1.45,Math.min(1.45,_.el+ue*.004))},zoom(W){S=null,_.z=Math.max(le,Math.min(ee,_.z+W)),E=performance.now()}}),gt=W=>/^[1-6]$/.test(W.key)?(P(V[+W.key-1]),!0):W.key==="i"||W.key==="I"?(_s(),!0):W.key==="l"||W.key==="L"?(Fe(!fe),ze(fe?"Light mode \xB7 L for full quality":"Full quality"),!0):!1;function I(){let W=innerWidth,ue=innerHeight;s.setSize(W,ue,!1),c.setSize(W,ue),g.resolution.set(W*l*.5,ue*l*.5);for(let be of w)be.cam.aspect=W/ue,be.cam.updateProjectionMatrix();ut.uScreen.value=ue*l/(2*Math.tan(to.degToRad(Ul/2)))}addEventListener("resize",I),I();let x=[1,.85,.7,.6,.5],z=x.length+3,Y=x.length+4,ne=W=>{let ue=Math.imul(W,2654435761)>>>0;return ue=(ue^ue>>>15)>>>0,ue=Math.imul(ue,2246822519)>>>0,ue=(ue^ue>>>13)>>>0,(ue>>>8)/16777216},de=new Map;function _e(W){w.forEach(ue=>ue.obj.group.traverse(be=>{if(!be.isPoints||!be.material.uniforms||!be.material.uniforms.uKeep||be.geometry.drawRange.count!==1/0&&!be.geometry.index)return;let Le=be.geometry;if(W){if(!de.has(Le)){let tt=Le.attributes.position.count,Xe=[];for(let ht=0;ht<tt;ht++)ne(ht)<.25&&Xe.push(ht);de.set(Le,new ln(tt>65535?new Uint32Array(Xe):new Uint16Array(Xe),1))}Le.setIndex(de.get(Le))}else Le.index&&Le.setIndex(null)}))}let te=Math.max(0,x.findIndex(W=>W<=l+1e-9)),ie=te,ge=1/0,Ue=0,ye=!1,pe=[],Oe=performance.now()+3e3,Ve=0,qe=null,O=new Set,fe=!1,se=!1,me={fps30:!1};function Se(W){ie=W;let ue=Math.min(W,x.length-1);for(;ue>te&&O.has(ue);)ue--;let be=Math.min(x[ue],o,window.devicePixelRatio||1),Le=tt=>W>=x.length+tt&&!O.has(x.length+tt);me.fps30=Le(0),ut.uSteps.value=Le(1)?16:30,ut.uKeep.value=Le(4)?.25:Le(2)?.5:1,_e(Le(4)),g.enabled=!Le(3),be!==l&&(l=be,s.setPixelRatio(l),c.setPixelRatio(l),I()),Oe=performance.now()+1e3,pe=[],console.info(`[deckkit] quality ${ce()}`),!fe&&!se&&l<.7&&(se=!0,ze("Reduced quality for smoother playback \xB7 L to toggle"))}let ce=()=>ie===te&&!fe?"full":`${fe?"lite":"auto"} L${ie} \xB7 ratio ${l}${me.fps30?" \xB7 30fps":""}${ut.uSteps.value<30?" \xB7 vol16":""}${ut.uKeep.value<.5?" \xB7 \xBC particles":ut.uKeep.value<1?" \xB7 \xBD particles":""}${g.enabled?"":" \xB7 no bloom"}`;function ze(W){let ue=document.createElement("div");ue.className="q-toast",ue.textContent=W,document.body.appendChild(ue),setTimeout(()=>ue.classList.add("on"),30),setTimeout(()=>{ue.classList.remove("on"),setTimeout(()=>ue.remove(),800)},6e3)}function Fe(W,ue=z){fe=W,O=new Set,qe=null,Ue=0,ge=1/0,ye=!1,Se(fe?ue:te)}function bt(){if(fe)return;let W=performance.now(),ue=W-Ve;if(Ve=W,document.hidden||ue>1e3||W<Oe){pe=[];return}pe.push(ue);let be=pe.reduce((Xe,ht)=>Xe+ht,0);if(be<2e3)return;let Le=pe.slice().sort((Xe,ht)=>Xe-ht)[pe.length>>1],tt=me.fps30?40:25;if(pe=[],qe){let Xe=qe;qe=null;let ht=Xe.fps?Le<=40:Le<=.9*Xe.mean;if(ht&&Xe.to<x.length&&(ye=!0),!ht){if(O.add(Xe.to),Xe.to<x.length&&!ye)for(let Vt=Xe.to;Vt<x.length;Vt++)O.add(Vt);Se(Xe.from);return}}if(Le>tt){Ue=0;let Xe=ie+1;for(;Xe<=Y&&O.has(Xe);)Xe++;Xe<=Y&&(ie<x.length&&(ge=Math.min(ge,x[ie])),qe={from:ie,to:Xe,mean:Le,fps:Xe===x.length},Se(Xe));return}Ue=Le<14?Ue+be:0,Ue>=3e4&&ie>te&&ie<x.length&&x[ie-1]<ge&&(Ue=0,Se(ie-1))}{let W=new URLSearchParams(location.search);W.has("lite")&&setTimeout(()=>Fe(!0,W.get("lite")==="2"?Y:z),0)}let st=null,rn=0,an=0,vs=0,vo=(()=>{try{let W=s.getContext(),ue=W.getExtension("WEBGL_debug_renderer_info");return ue?W.getParameter(ue.UNMASKED_RENDERER_WEBGL):"not reported"}catch{return"not reported"}})();function xs(){let W=performance.now(),ue=(Vn-an)/((W-vs)/1e3);an=Vn,vs=W;let be=w.map(ht=>{let Vt=0,Tt=0;return ht.pass.enabled&&ht.obj.group.traverse(ke=>{if(!ke.isPoints||!ke.visible)return;let qt=ke.geometry,y=Math.min(qt.attributes.position.count,qt.drawRange.count);Vt+=y,Tt+=qt.index?qt.index.count:Math.round(y*ut.uKeep.value)}),{name:ht.name,total:Vt,drawn:Tt}}).filter(ht=>ht.total),Le=ht=>be.reduce((Vt,Tt)=>Vt+Tt[ht],0),tt=ht=>ht.toLocaleString("en"),Xe=s.domElement;st.innerHTML=`<b>Render</b> ${fe?"lite":ie===te?"full":"auto"} \xB7 L${ie}<br>canvas ${Xe.width}\xD7${Xe.height} \xB7 ratio ${l} (screen ${+(window.devicePixelRatio||1).toFixed(2)})<br>particles ${tt(Le("drawn"))} / ${tt(Le("total"))}${be.length>1?` (${be.map(ht=>`${ht.name} ${tt(ht.drawn)}`).join(", ")})`:""}<br>gas samples ${ut.uSteps.value} \xB7 bloom ${g.enabled?"on":"off"}<br>fps ${Number.isFinite(ue)?ue.toFixed(0):"\u2013"}${me.fps30?" (capped at 30)":""}<br>`+(i.preloadInfo?`${i.preloadInfo()}<br>`:"")+(i.videoInfo?`${i.videoInfo()}<br>`:"")+`<span>${vo.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</span>`}function _s(){if(st){clearInterval(rn),st.remove(),st=null;return}st=document.createElement("div"),st.id="rinfo",st.className="on",document.body.appendChild(st),an=Vn,vs=performance.now(),xs(),rn=setInterval(xs,333)}n.addEventListener("webglcontextlost",W=>{if(W.preventDefault(),t("#gl-lost"))return;let ue=document.createElement("button");ue.id="gl-lost",ue.textContent="Graphics reset \u2014 click to reload",ue.addEventListener("click",()=>location.reload()),document.body.appendChild(ue)});let Ni=0,Ui=0,Vn=0,xn=!1;function ys(W,{lightboxOpen:ue=!1,videoPlaying:be=!1}={}){if(be!==xn&&(xn=be,Ve=0,pe=[],Ue=0,qe=null,Oe=Math.max(Oe,performance.now()+1e3),Ni=0,Ui=0),xn&&Vn>0)return;if(me.fps30){if(Ni+=W,performance.now()-Ui<28)return;W=Math.min(Ni,.1),Ni=0}if(Ui=performance.now(),Vn++,bt(),ut.uTime.value+=W,A(W),!zt.active()&&!S&&!ue&&(_.az+=W*.018*(e[i.idx()].spin??1)),!S&&performance.now()-E<1500){let ke=_.z<3.6?m||f.knot:_.z>6.5?f.hero:null;ke&&(_.z>6.5||Z.len(_.f)<3e4)&&(_.f=Z.lerp(_.f,ke,Math.min(1,W*2.5)))}let Le=Di[C].w,tt=Math.min(1,W*3.5);for(let ke=0;ke<5;ke++)N[ke]+=(Le[ke]-N[ke])*tt;ut.uW1.value.set(N[0],N[1],N[2]),ut.uW2.value.set(N[3],N[4]),ut.uMorph.value+=(F-ut.uMorph.value)*Math.min(1,W*2.2),He&&!S&&(He=!1,v.sn.t=0),v.sn.update(W);let Xe=e[i.idx()];if(Ge&&!S&&(Ge=!1,u.frb.t=0),u.frb.update(W,!!Xe.frb),Xe.cycle){Ke+=W;let ke=Xe.cycle[Math.floor(Ke/3)%Xe.cycle.length];ke!==C&&P(ke)}let ht=1+.9*Math.max(0,Math.sin(ut.uTime.value*2.4))**6;for(let ke of Pe)ke.gain+=(ke.target-ke.gain)*Math.min(1,W*2.5),ke.beam.material.uniforms.uGain.value=ke.gain*.28,ke.blobs.material.uniforms.uGain.value=ke.gain*.5*ht,ke.beam.visible=ke.blobs.visible=ke.gain>.01;q+=(Q-q)*Math.min(1,W*2.5),d.halo.material.uniforms.uGain.value=.4*(1+2*ut.uMorph.value)*(1+5*q)*(1+2.5*q),d.inflowMat.uniforms.uCut.value=q>.01?25+175*q:0,d.shock.material.uniforms.uGain.value=1.6*q,d.shock.visible=q>.01,d.halo.material.uniforms.uBeta.value=.5+.6*q,d.satGasMat.uniforms.uGain.value=1-q,ft+=(Pt-ft)*Math.min(1,W*2.5),d.inflowMat.uniforms.uGain.value=ft*(1-.65*q),xt+=(Ct-xt)*Math.min(1,W*2),d.agn.set(xt),d.nbrMat.uniforms.uGain.value=.45*Math.max(gs(4.9,5.2,_.z),gs(15e3,3e4,Z.len(_.f)));let Vt=10**_.z,Tt=[Math.cos(_.el)*Math.sin(_.az),Math.sin(_.el),Math.cos(_.el)*Math.cos(_.az)];for(let ke of w){if(ke.opacity=ke.fade(_.z),ke.pass.enabled=ke.opacity>.003,!ke.pass.enabled)continue;let qt=Z.mul(Z.sub(_.f,ke.origin),1/ke.unit),y=Vt/ke.unit/(2*Math.tan(to.degToRad(Ul/2))*ke.cam.aspect);for(let D of ke.obj.materials)D.uniforms.uOpacity.value=ke.opacity,D.uniforms.uNear&&(D.uniforms.uNear.value=y);ke.cam.position.set(qt[0]+Tt[0]*y,qt[1]+Tt[1]*y,qt[2]+Tt[2]*y),ke.cam.near=y*.002,ke.cam.far=y*500,ke.cam.updateProjectionMatrix(),ke.cam.lookAt(qt[0],qt[1],qt[2])}Nu(),c.render(),Ae(),re()}return{applyStep:B,frame:ys,onKey:gt,panelApi:{setBand:W=>P(W),sightClouds:W=>Pe[W].clouds,sightCloudsOnScreen:W=>Pe[W].clouds.map(ue=>w[1].opacity<.5?null:(oe.set(...ue.pos).project(w[1].cam),oe.z<1?[(oe.x*.5+.5)*innerWidth,(-oe.y*.5+.5)*innerHeight]:null)),frbCrossed:()=>u.frb.crossed(),frbStarted:()=>u.frb.t>=0},bands:Object.keys(Di),view:()=>({f:_.f.map(W=>Math.round(W)),z:+_.z.toFixed(3),az:+((_.az%(2*Math.PI)+2*Math.PI)%(2*Math.PI)).toFixed(3),el:+_.el.toFixed(3)}),auditBlocks:()=>[t("#bands"),t("#ladder"),t("#morph"),t("#halo")],debug:{U:ut,bloom:g,layers:w,cam:_,renderer:s,reg:v,gal:d,web:u,flyTo:M,pixelRatio:()=>l,quality:ce,level:()=>ie,renders:()=>Vn,renderPaused:()=>xn,renderOnce:()=>c.render(),setLevel:W=>{fe=!1,Se(W)}},quality:ce}}function Xg(i){let e=Je("div","panel p-temp"),t=[{T:10,name:"A cold gas cloud",eye:"cold"},{T:310,name:"You",eye:"cold"},{T:1800,name:"A candle flame",eye:"stars"},{T:5800,name:"Surface of the Sun",eye:"stars"},{T:1e4,name:"Glowing ionized gas (H\u03B1)",eye:"warm"},{T:3e5,name:"Warm-hot halo gas (O VI)",eye:"warm"},{T:2e6,name:"Sun\u2019s corona \xB7 galaxy halos",eye:"hot"}],n=[{n:"Radio",a:0,b:-3.3,c:"#7b2d26"},{n:"Infrared",a:-3.3,b:-6.15,c:"#b5402c"},{n:"Optical",a:-6.15,b:-6.4,c:"linear-gradient(90deg,#ff3b30,#ff9500,#ffd60a,#34c759,#0a84ff,#5e5ce6)"},{n:"UV",a:-6.4,b:-8,c:"#6e4bd8"},{n:"X-ray",a:-8,b:-11,c:"#3d5bd9"}],s=0,r=-11,a=c=>(c-s)/(r-s)*100;e.innerHTML=`
    <div class="t-read"><b></b><span></span></div>
    <input type="range" min="1" max="7.4" step="0.01" value="4">
    <div class="t-scale"><span>10 K</span><span>1,000 K</span><span>100,000 K</span><span>10 million K</span></div>
    <div class="t-label">Where its light comes out</div>
    <div class="t-spec">${n.map(c=>`<i style="left:${a(c.a)}%;width:${a(c.b)-a(c.a)}%;background:${c.c}"><em>${c.n}</em></i>`).join("")}<u></u></div>
    <div class="t-axis"><span>long waves</span><span>short waves</span></div>
    <div class="t-note">Cold hydrogen also has its own radio line, at 21 cm.</div>`;let o=e.querySelector("input"),l=()=>{let c=+o.value,u=10**c,d=t.reduce((v,w)=>Math.abs(Math.log10(w.T)-c)<Math.abs(Math.log10(v.T)-c)?w:v);e.querySelector(".t-read b").innerHTML=Hl(u),e.querySelector(".t-read span").textContent=d.name;let h=Math.log10(.002898/u);e.querySelector(".t-spec u").style.left=`${Math.min(100,Math.max(0,a(h)))}%`;let p=c<2.8?"cold":c<3.9?"stars":c<5.6?"warm":"hot";i.setBand(p)};return o.addEventListener("input",l),{el:e,show(){o.value=4,l()}}}function $g(){let i=Je("div","panel p-dish"),e=30*he(),t=20*he(),[n,s]=on(e,t),r=document.createElement("canvas");r.width=900,r.height=600;let a=r.getContext("2d");a.fillStyle="#061018",a.fillRect(0,0,900,600);let o=5,l=()=>(o=o*16807%2147483647)/2147483647;for(let d=0;d<26e3;d++){let h=Math.min(-Math.log(l()*l()+1e-9)*3.4+.6,30),v=l()<.7?Math.log(h/.6)/.26+(l()<.5?0:Math.PI)+(l()-.5)*.5:l()*6.283,w=450+h*15*Math.cos(v),g=300+h*15*Math.sin(v)*.62,f=.6+l()*2.2;a.fillStyle=`rgba(62,230,207,${.18+l()*.3})`,a.beginPath(),a.arc(w,g,f,0,6.283),a.fill()}i.append(Je("div","p-head","Same galaxy \xB7 different telescopes"),n),i.insertAdjacentHTML("beforeend",`
    <input type="range" min="1.3" max="5.2" step="0.01" value="2.7">
    <div class="d-ticks"><span style="left:0%">25 m</span><span style="left:${(Math.log10(500)-1.3)/3.9*100}%">FAST \xB7 500 m</span><span style="left:${(Math.log10(15e4)-1.3)/3.9*100}%">SKA \xB7 150 km</span></div>
    <div class="d-read"></div><div class="d-note">Simulated 21 cm map, 60 kpc across, at the distance of M51.</div>`);let c=i.querySelector("input"),u=()=>{let d=10**+c.value,h=1.22*.21/d,p=h*8600,v=p/60*e/2.355;s.clearRect(0,0,e,t),s.filter=`blur(${Math.max(0,v).toFixed(1)}px)`,s.drawImage(r,0,0,e,t),s.filter="none";let w=h*206265;i.querySelector(".d-read").innerHTML=`Telescope size <b>${d>=1e3?`${+(d/1e3).toPrecision(2)} km`:`${Math.round(d)} m`}</b> \u2192 sees details down to <b>${p>=1?p.toFixed(1):p.toFixed(2)} kpc</b> <em>(${w>=60?`${(w/60).toFixed(1)}\u2032`:`${w.toFixed(1)}\u2033`})</em>`};return c.addEventListener("input",u),{el:i,show(){c.value=Math.log10(500),u()}}}function qg(){let i=Je("div","panel p-ifs"),e=30*he(),t=19*he(),[n,s]=on(e,t);i.append(Je("div","p-head","Every pixel gets its own spectrum"),n,Je("div","d-note","An integral-field spectrograph turns an image into a cube: x, y and wavelength \u03BB."));let r=0,a=9,o=8,l=(u,d,h)=>[e*.28+(u-h)*.9*he()*1.2,t*.62+(u+h)*.45*he()*1.2-d*he()*1.2],c=(u,d)=>{let h=u-3.5,p=d-3.5;return Math.exp(-(h*h+p*p)/6)};return{el:i,tick(u){r+=u;let d=.5+.5*Math.sin(Math.min(1,r%7/3)*Math.PI-Math.PI/2);s.clearRect(0,0,e,t);for(let b=a-1;b>=0;b--){let _=b*(.25+d*1.1),S=b===4;for(let E=0;E<o;E++)for(let m=0;m<o;m++){let M=c(E,m)*(S?1:.18+.05*Math.sin(E+b)),[A,C]=l(E,m,_),[N,F]=l(E+1,m,_),[P,V]=l(E+1,m+1,_),[K,G]=l(E,m+1,_);s.fillStyle=S?`rgba(226,80,127,${.15+.85*M})`:`rgba(160,180,200,${.06+.4*M})`,s.beginPath(),s.moveTo(A,C),s.lineTo(N,F),s.lineTo(P,V),s.lineTo(K,G),s.fill()}}s.strokeStyle=ct.dim,s.fillStyle=ct.muted,s.lineWidth=1,s.font=`${1.1*he()}px DM Sans, sans-serif`;let h=l(0,0,0),p=l(o+1,0,0),v=l(0,o+1,0),w=l(0,0,a*(.25+d*1.1)+1);[[p,"x"],[v,"y"],[w,"\u03BB"]].forEach(([b,_])=>{s.beginPath(),s.moveTo(h[0],h[1]),s.lineTo(b[0],b[1]),s.stroke(),s.fillText(_,b[0]+4,b[1]+4)});let g=e*.7,f=e*.26,T=t*.72,R=t*.45;s.strokeStyle=ct.line,s.beginPath(),s.moveTo(g,T),s.lineTo(g+f,T),s.stroke(),s.strokeStyle=ct.warm,s.lineWidth=2,s.beginPath();for(let b=0;b<=60;b++){let _=b/60,S=.12+Math.exp(-((_-.5)**2)/.004);s.lineTo(g+_*f,T-S*R*.85)}s.stroke(),s.fillStyle=ct.muted,s.fillText("one pixel",g,T+1.6*he()),s.fillStyle=ct.ink,s.fillText("H\u03B1",g+f*.5-he(),T-R*.95)}}}function Yg(i){let e=Je("div","panel p-spec"),t=42*he(),n=15*he(),[s,r]=on(t,n),a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.classList.add("p-links"),e.append(Je("div","p-head","The quasar\u2019s light after crossing the halo (z \u2248 0.10)"),s,Je("div","sp-cloud"),Je("div","d-note","Each cloud removes light at several wavelengths at once \u2014 its fingerprint. All its lines share one redshift: \u03BB<sub>obs</sub> = \u03BB<sub>rest</sub> (1 + z).")),document.body.appendChild(a);let o={"H I Ly\u03B2":1025.72,"O VI 1032":1031.93,"O VI 1038":1037.62,"Si III":1206.5,"H I Ly\u03B1":1215.67,"C IV 1548":1548.2,"C IV 1551":1550.78},l={cold:["H I Ly\u03B2","Si III","H I Ly\u03B1"],warm:["H I Ly\u03B2","O VI 1032","O VI 1038","H I Ly\u03B1","C IV 1548","C IV 1551"]},c={"H I Ly\u03B1":.9,"H I Ly\u03B2":.6,"Si III":.55,"O VI 1032":.55,"O VI 1038":.35,"C IV 1548":.5,"C IV 1551":.3},u=[.099,.1003,.1012,.1022],d=[{a:1124,b:1146,n:"H I Ly\u03B2 \xB7 O VI"},{a:1322,b:1342,n:"Si III \xB7 H I Ly\u03B1"},{a:1697,b:1711,n:"C IV"}],h=1.2*he(),p=1.6*he(),v=2.6*he(),w=n-2.4*he(),g=w-v,f=d.reduce((C,N)=>C+(N.b-N.a),0),T=t-2*h-p*(d.length-1),R=C=>{let N=h;for(let F of d){let P=(F.b-F.a)/f*T;if(C>=F.a&&C<=F.b)return N+(C-F.a)/(F.b-F.a)*P;N+=P+p}return null},b=[],_=[],S=-1,E=0,m="",M=[],A=()=>{r.clearRect(0,0,t,n);let C=h;r.font=`${.95*he()}px DM Sans, sans-serif`;for(let N of d){let F=(N.b-N.a)/f*T;r.strokeStyle=ct.line,r.lineWidth=1,r.beginPath(),r.moveTo(C,w),r.lineTo(C+F,w),r.stroke(),r.strokeStyle=ct.ink,r.lineWidth=1.6,r.beginPath();for(let P=0;P<=220;P++){let V=N.a+P/220*(N.b-N.a),K=.82;for(let q of _)K*=1-q.depth*Math.exp(-((V-q.obs)**2)/(2*.32*.32));K+=Math.sin(P*12.9898+N.a)*43758.5453%1*.012;let G=C+P/220*F,Q=w-K*g;P?r.lineTo(G,Q):r.moveTo(G,Q)}r.stroke(),r.fillStyle=ct.dim,r.textAlign="left",r.fillText(`${N.a}`,C,w+1.3*he()),r.textAlign="right",r.fillText(`${N.b} \xC5`,C+F,w+1.3*he()),r.textAlign="center",r.fillStyle=ct.muted,r.fillText(N.n,C+F/2,1*he()),C+=F+p}if(S>=0){r.font=`500 ${.9*he()}px DM Sans, sans-serif`;for(let F of _.filter(P=>P.cloud===S)){let P=R(F.obs);P!=null&&(r.strokeStyle=ct[b[S].phase],r.lineWidth=1.5,r.setLineDash([2,3]),r.beginPath(),r.moveTo(P,v-.4*he()),r.lineTo(P,w),r.stroke(),r.setLineDash([]))}let N=e.querySelector(".sp-cloud");N.style.color=ct[b[S].phase],N.textContent=`Cloud ${S+1}: z = ${b[S].z.toFixed(4)} \u2014 ${l[b[S].phase].map(F=>F.replace(/ \d+$/,"")).filter((F,P,V)=>V.indexOf(F)===P).join(", ")}`}};return{el:e,show(){b=i.sightClouds(0).map((C,N)=>({...C,z:u[N%u.length]})),_=b.flatMap((C,N)=>l[C.phase].map(F=>({cloud:N,ion:F,obs:o[F]*(1+C.z),depth:c[F]*(C.phase==="cold"?1:.85)}))),S=0,E=0,m="",A(),a.classList.add("on")},hide(){a.classList.remove("on")},tick(C){E+=C;let N=Math.floor(E/3)%Math.max(1,b.length);N!==S&&(S=N,A());let F=s.getBoundingClientRect(),P=F.width/t,V=i.sightCloudsOnScreen(0),K=`${V.map(G=>G?1:0).join("")}|${S}|${innerWidth}x${innerHeight}|${he()}`;if(K!==m)m=K,a.setAttribute("viewBox",`0 0 ${innerWidth} ${innerHeight}`),a.innerHTML=V.map((G,Q)=>{if(!G)return"";let q=ct[b[Q].phase],k=Q===S,U=`<circle data-c="${Q}" cx="${G[0]}" cy="${G[1]}" r="${.9*he()}" fill="none" stroke="${q}" stroke-width="${k?3:1.5}" opacity="${k?1:.5}"/>`;if(k)for(let le of _.filter(ee=>ee.cloud===Q)){let ee=R(le.obs);ee!=null&&(U+=`<line data-c="${Q}" data-x="${ee}" x1="${G[0]}" y1="${G[1]}" x2="${F.left+ee*P}" y2="${F.top+2.2*he()}" stroke="${q}" stroke-width="1.2" stroke-dasharray="3 5" opacity="0.7"/>`)}return U}).join(""),M=[...a.children];else for(let G of M){let Q=V[+G.dataset.c];G.tagName==="circle"?(G.setAttribute("cx",Q[0]),G.setAttribute("cy",Q[1])):(G.setAttribute("x1",Q[0]),G.setAttribute("y1",Q[1]),G.setAttribute("x2",F.left+ +G.dataset.x*P),G.setAttribute("y2",F.top+2.2*he()))}}}}function Zg(){let i=Je("div","panel p-emabs"),e=40*he(),t=7.4*he(),[n,s]=on(e,t),[r,a]=on(e,t);i.innerHTML='<div class="p-head">Same telescope, same exposure</div>';let o=(T,R)=>{let b=Je("div","ea-row");return b.append(Je("div","ea-t",T),R,Je("div","ea-sn")),b},l=o("Glowing gas only (emission)",n),c=o("Gas in front of a quasar (absorption)",r);i.append(l,c),i.insertAdjacentHTML("beforeend",`<label class="ea-l">Quasar brightness<input type="range" class="q" min="-0.5" max="1.5" step="0.01" value="0.5"></label>
    <label class="ea-l">Noise<input type="range" class="n" min="-2" max="-0.3" step="0.01" value="-1.3"></label>
    <div class="d-note">The emission line is fixed and faint. The absorption line removes a fixed <i>fraction</i> of the quasar\u2019s light, so a brighter quasar makes it stand out.</div>`);let u=i.querySelector(".q"),d=i.querySelector(".n"),h=.12,p=.5,v=()=>Math.sqrt(-2*Math.log(Math.random()+1e-12))*Math.cos(6.2832*Math.random()),w=(T,R,b,_)=>{T.clearRect(0,0,e,t);let S=t-.6*he(),E=t-1.4*he();T.strokeStyle=_,T.lineWidth=1.4,T.beginPath();for(let m=0;m<=160;m++){let M=S-Math.max(-.2,Math.min(1.15,R(m/160)/b))*E;m?T.lineTo(m/160*e,M):T.moveTo(0,M)}T.stroke()},g=0,f=()=>{let T=10**+u.value,R=10**+d.value,b=m=>Math.exp(-((m-.5)**2)/(2*.018**2));w(s,m=>h*b(m)+R*v(),.6,ct.warm),w(a,m=>T*(1-p*b(m))+R*v(),T*1.15,ct.ink);let _=h/R,S=p*T/R,E=m=>`S/N \u2248 ${m<10?m.toFixed(1):Math.round(m)} ${m>=5?'<b class="ok">detected</b>':'<b class="no">lost in noise</b>'}`;l.querySelector(".ea-sn").innerHTML=E(_),c.querySelector(".ea-sn").innerHTML=E(S)};return u.addEventListener("input",f),d.addEventListener("input",f),{el:i,show(){u.value=.5,d.value=-1.3,f()},tick(T){g+=T,g>.2&&(g=0,f())}}}function Jg(){let i=Je("div","panel p-spin"),e=(t,n)=>`<g transform="translate(${t},38)">
      <circle r="9" fill="#ff8a7a"/><path d="M0 5 V-6 M-3 -3 L0 -7 L3 -3" stroke="#fff" stroke-width="1.6" fill="none"/>
      <circle r="24" fill="none" stroke="#ffffff33" stroke-dasharray="2 3"/>
      <g transform="translate(24,0)"><circle r="5" fill="#3ee6cf"/><path d="${n?"M0 4 V-5 M-2.5 -2.5 L0 -5.5 L2.5 -2.5":"M0 -4 V5 M-2.5 2.5 L0 5.5 L2.5 2.5"}" stroke="#04121a" stroke-width="1.6" fill="none"/></g></g>`;return i.innerHTML=`<div class="p-head">Where the 21 cm line comes from</div>
    <svg viewBox="0 0 300 92" class="spin-svg">
      ${e(40,!0)}<text x="40" y="84" class="sl">spins aligned</text>
      ${e(196,!1)}<text x="196" y="84" class="sl">spins opposite</text>
      <path d="M86 38 H150" stroke="#ffffff66" stroke-width="1.4" marker-end="url(#ar)"/>
      <defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#ffffff99"/></marker></defs>
      <path d="M232 18 q6 -8 12 0 t12 0 t12 0 t12 0 t12 0" stroke="#3ee6cf" stroke-width="2" fill="none"/>
      <text x="262" y="34" class="sl" fill="#3ee6cf">photon</text>
    </svg>
    <p class="spin-n"><b>\u03BB = 21.1 cm \xB7 \u03BD = 1420.4 MHz</b></p>
    <p class="d-note">The electron in a hydrogen atom flips its spin relative to the proton and emits a radio photon. One atom does this only once in ~10 million years \u2014 but galaxies hold so much cold hydrogen that radio telescopes see it easily, even through dust.</p>`,{el:i}}function Kg(){let i=Je("div","panel p-lines"),e=34*he(),t=11*he(),[n,s]=on(e,t);i.append(Je("div","p-head","Glowing gas shines in a few colours"),n,Je("div","d-note","Atoms and ions emit only at their own wavelengths. H\u03B1 (656.3 nm, red) traces ionized hydrogen; [O III] (500.7 nm, green) traces gas lit by hot stars or black holes."));let r=[[372.7,"[O II]",.35],[486.1,"H\u03B2",.35],[495.9,"",.33],[500.7,"[O III]",1],[654.8,"",.12],[656.3,"H\u03B1",.95],[658.3,"[N II]",.35],[671.6,"[S II]",.2],[673.1,"",.15]],a=360,o=700,l=1*he(),c=t-2.6*he(),u=c-1.6*he(),d=p=>l+(p-a)/(o-a)*(e-2*l),h=()=>{s.clearRect(0,0,e,t);let p=s.createLinearGradient(d(380),0,d(700),0);[[380,"#6a3df0"],[450,"#3a6bff"],[495,"#20c0c0"],[530,"#40d040"],[580,"#e0e030"],[610,"#ff9a30"],[660,"#ff3030"],[700,"#a00020"]].forEach(([v,w])=>p.addColorStop((v-380)/320,w)),s.fillStyle=p,s.globalAlpha=.55,s.fillRect(d(380),c+.4*he(),d(700)-d(380),.6*he()),s.globalAlpha=1,s.strokeStyle=ct.ink,s.lineWidth=1.6,s.beginPath();for(let v=0;v<=500;v++){let w=a+v/500*(o-a),g=.04;for(let[R,,b]of r)g+=b*Math.exp(-((w-R)**2)/(2*.9**2));let f=d(w),T=c-g*u;v?s.lineTo(f,T):s.moveTo(f,T)}s.stroke(),s.font=`500 ${.95*he()}px DM Sans, sans-serif`,s.textAlign="center";for(let[v,w,g]of r)w&&(s.fillStyle=w==="H\u03B1"?"#ff6b6b":w==="[O III]"?"#6be38f":ct.muted,s.fillText(w,d(v),c-g*u-.5*he()));s.fillStyle=ct.dim,s.font=`${.9*he()}px DM Sans, sans-serif`,s.fillText("wavelength (nm) \u2192",e/2,t-.3*he());for(let v of[400,500,600,700])s.textAlign="center",s.fillText(v,d(v),c+2.1*he())};return{el:i,show(){h()}}}function jg(){let i=Je("div","panel p-xsrc"),e=30*he(),t=12*he(),[n,s]=on(e,t);i.append(Je("div","p-head","X-rays from gas at millions of degrees"),n),i.insertAdjacentHTML("beforeend",`<ul class="xs-list">
    <li><b>Hot diffuse gas</b> (&gt;10<sup>6</sup> K): halos, groups, clusters \u2014 a smooth continuum (bremsstrahlung) plus lines of O, Ne, Fe\u2026</li>
    <li><b>Also bright in X-rays:</b> growing black holes (AGN), X-ray binaries, supernova remnants \u2014 they must be told apart from the halo.</li></ul>`);let r=()=>{s.clearRect(0,0,e,t);let a=1.2*he(),o=t-2*he(),l=t-3.6*he(),c=.3,u=2,d=p=>a+Math.log(p/c)/Math.log(u/c)*(e-2*a),h=[[.574,"O VII",.8],[.654,"O VIII",.6],[.82,"Fe L",.7],[.92,"Ne IX",.35],[1.02,"Ne X",.25],[1.35,"Mg",.15]];s.strokeStyle=ct.hot,s.lineWidth=1.8,s.beginPath();for(let p=0;p<=400;p++){let v=c*(u/c)**(p/400),w=.55*Math.exp(-(v-c)/.25);for(let[T,,R]of h)w+=R*.6*Math.exp(-((v-T)**2)/(2*(.012*T/.6)**2));let g=d(v),f=o-Math.min(1,w)*l;p?s.lineTo(g,f):s.moveTo(g,f)}s.stroke(),s.font=`500 ${.9*he()}px DM Sans, sans-serif`,s.textAlign="center",s.fillStyle=ct.muted,h.forEach(([p,v],w)=>s.fillText(v,d(p),1*he()+w%2*1.15*he())),s.fillStyle=ct.dim;for(let p of[.5,1,2])s.fillText(`${p} keV`,d(p),t-.4*he())};return{el:i,show(){r()}}}function Qg(){let i=Je("div","panel p-xspec"),e=36*he(),t=7*he(),[n,s]=on(e,t),[r,a]=on(e,t);i.innerHTML='<div class="p-head">The O VII / O VIII lines, two kinds of camera</div>';let o=(h,p)=>{let v=Je("div","xr-row");v.append(Je("div","xr-t",h),p),i.append(v)};o("CCD (Chandra, XMM, eROSITA): ~70 eV resolution",n),o("Microcalorimeter (XRISM Resolve, HUBS): ~5 eV or better",r),i.insertAdjacentHTML("beforeend",'<div class="d-note">Resolved lines are easier to detect above the background, and their ratios, strengths and shifts give the gas <b>temperature</b>, <b>metallicity</b> and <b>velocity</b>.</div>');let l=[[.561,"f",.55],[.569,"i",.25],[.574,"r",.8],[.654,"O VIII",.6]],c=.53,u=.68,d=(h,p,v)=>{h.clearRect(0,0,e,t);let w=he(),g=t-1.6*he(),f=t-2.8*he(),T=_=>w+(_-c)/(u-c)*(e-2*w),R=0,b=_=>.05+l.reduce((S,[E,,m])=>S+m*Math.exp(-((_-E)**2)/(2*p*p))*(.002/p),0);for(let _=0;_<=400;_++)R=Math.max(R,b(c+_/400*(u-c)));h.strokeStyle=ct.hot,h.lineWidth=1.6,h.beginPath();for(let _=0;_<=400;_++){let S=c+_/400*(u-c),E=T(S),m=g-b(S)/R*f;_?h.lineTo(E,m):h.moveTo(E,m)}h.stroke(),h.font=`${.85*he()}px DM Sans, sans-serif`,h.textAlign="center",h.fillStyle=ct.dim;for(let _ of[.55,.6,.65])h.fillText(`${_} keV`,T(_),t-.2*he());if(v){h.fillStyle=ct.ink,h.fillText("O VII",T(.568),1*he()),h.fillText("O VIII",T(.654),1*he()),h.fillStyle=ct.dim,h.font=`${.75*he()}px DM Sans, sans-serif`;for(let[_,S]of l)S!=="O VIII"&&h.fillText(S,T(_)+(S==="f"?-.3*he():S==="r"?.3*he():0),2*he())}};return{el:i,show(){d(s,.03,!1),d(a,.0021,!0)}}}function e0(){let i=Je("div","panel p-answers");return i.innerHTML=`<h2>Back to the three questions</h2>
    <section><h3><b>1</b> What drives the diversity of galaxies?</h3><ul>
      <li><b>Gas supply</b> \u2014 set by halo mass and environment: cold streams feed small halos; massive halos receive their gas hot.</li>
      <li><b>Feedback</b> \u2014 supernovae and black holes push gas out or keep it hot. Blue or red depends on this balance.</li>
      <li class="how">Seen with: 21 cm, H\u03B1 / IFS, quasar absorption.</li></ul></section>
    <section><h3><b>2</b> Why so few stars?</h3><ul>
      <li><b>Low-mass galaxies:</b> supernova feedback blows gas out of shallow potential wells.</li>
      <li><b>High-mass galaxies:</b> hot halos cool slowly, and black-hole jets keep them hot.</li>
      <li class="how">Seen with: X-ray emission and stacking, absorption.</li></ul></section>
    <section><h3><b>3</b> Where is the missing ordinary matter, and <span class="c-em">what are their phases?</span></h3><ul>
      <li><b>Between galaxies:</b> found \u2014 fast radio bursts count it all (Connor+ 2025).</li>
      <li><b>Around galaxies:</b> still uncertain \u2014 split across cold, warm and hot phases, each seen a different way; much may sit in faint hot halos. That needs the new eyes.</li>
      <li class="how">Seen with: FRB dispersion, absorption, X-ray stacking.</li></ul></section>`,{el:i}}function t0(){let i=Je("div","panel p-halos"),e=[{name:"Cold gas",ion:"Mg II",phase:"cold",sf:6,q:5,note:"around both \u2014 set mostly by galaxy mass"},{name:"Warm gas",ion:"O VI",phase:"warm",sf:9,q:3,note:"common around star-forming, rare around quiet galaxies"}],t=(n,s)=>Array.from({length:10},(r,a)=>`<i class="${a<n?"on":""}" style="--c:${ct[s]}"></i>`).join("");return i.innerHTML='<div class="hl-grid"><span></span><b class="sf">Star-forming spiral</b><b class="q">Quiet elliptical</b>'+e.map(n=>`<span class="hl-row"><em style="color:${ct[n.phase]}">\u25CF</em> ${n.name} <small>${n.ion}</small></span>
      <div class="hl-dots" aria-label="${n.sf} of 10">${t(n.sf,n.phase)}</div><div class="hl-dots" aria-label="${n.q} of 10">${t(n.q,n.phase)}</div>
      <span class="hl-note">${n.note}</span>`).join("")+'</div><div class="d-note">Schematic: filled dots = sightlines where the gas is detected (out of 10). After Huang+ 2021 (Mg II), Qu+ 2024 (O VI).</div>',{el:i}}function n0(){let i=Je("div","panel p-stack"),e=64,t=13*he(),[n,s]=on(t,t),[r,a]=on(t,t),o=s.createImageData(e,e),l=a.createImageData(e,e),c=new Float32Array(e*e);for(let R=0;R<e;R++)for(let b=0;b<e;b++){let _=(b-e/2)/8,S=(R-e/2)/8;c[R*e+b]=Math.exp(-(_*_+S*S)/2)}let u=R=>{let b=Math.max(-1,Math.min(1,R/1.5)),_=[52,58,66],S=[42,120,214],E=[226,80,70],m=b<0?S:E,M=Math.abs(b);return[_[0]+(m[0]-_[0])*M,_[1]+(m[1]-_[1])*M,_[2]+(m[2]-_[2])*M]},d=(R,b,_,S)=>{for(let m=0;m<e*e;m++){let[M,A,C]=u(S(m));R.data.set([M,A,C,255],m*4)}let E=document.createElement("canvas");E.width=E.height=e,E.getContext("2d").putImageData(R,0,0),b.imageSmoothingEnabled=!1,b.clearRect(0,0,t,t),b.drawImage(E,0,0,t,t)},h=()=>Math.sqrt(-2*Math.log(Math.random()+1e-12))*Math.cos(6.2832*Math.random());i.append(Je("div","p-head","Average many galaxies"));let p=Je("div","st-row"),v=Je("figure"),w=Je("figure");v.append(n,Je("figcaption","","The faint signal we want")),w.append(r,Je("figcaption","","")),p.append(v,w),i.append(p),i.insertAdjacentHTML("beforeend",`<input type="range" min="0" max="4" step="0.01" value="0">
    <div class="d-ticks"><span style="left:0%">1</span><span style="left:50%">100</span><span style="left:100%">10,000 galaxies</span></div>
    <div class="d-note">Each observation has noise 10\xD7 bigger than the signal. Averaging N of them shrinks the noise by \u221AN.</div>`);let g=i.querySelector("input"),f=0;d(o,s,n,R=>c[R]);let T=()=>{let R=Math.round(10**+g.value),b=10/Math.sqrt(R);d(l,a,r,_=>c[_]+b*h()),w.querySelector("figcaption").innerHTML=`Average of <b>${R.toLocaleString("en")}</b> observation${R>1?"s":""} \xB7 noise ${b<1?b.toFixed(2):b.toFixed(1)}`};return g.addEventListener("input",T),{el:i,show(){g.value=0,T()},tick(R){f+=R,f>.15&&(f=0,T())}}}function i0(i){let e=Je("div","panel p-frb"),t=30*he(),n=11*he(),[s,r]=on(t,n),a=Je("div","frb-left");a.append(Je("div","p-head","The burst as it arrives"),s,Je("div","d-note","Low frequencies arrive later; the more gas crossed, the bigger the delay."));let o=Je("div","frb-right",`<div class="p-head">Where is the ordinary matter today?</div>
     <div class="census"><i class="ig" style="width:76%"></i><i class="gx" style="width:24%"></i></div>
     <div class="census-k"><span style="width:76%"><em style="background:#2a9fd0"></em>Between galaxies \xB7 about \xBE</span><span><em style="background:#8f6ff2"></em>In &amp; around galaxies</span></div>
     <div class="d-note">Fast radio bursts count all the electrons along their path. Connor+ 2025.</div>`);e.append(a,o);let l=0,c="";return{el:e,show(u,d){l=d,o.classList.toggle("on",d>=1),e.classList.toggle("wide",d>=1)},tick(){let u=i.frbCrossed(),d=i.frbStarted(),h=`${d}|${u}|${he()}|${document.fonts.status}`;if(h===c)return;c=h,r.clearRect(0,0,t,n);let p=2.4*he(),v=p,w=t-he(),g=he(),f=n-p;if(r.fillStyle="#0c1824",r.fillRect(v,g,w-v,f-g),d){let T=.9*u;for(let R=0;R<=120;R++){let b=.4+.4*(R/120),_=T*(1/(b*b)-1/.64)/(1/.16-1/.64),S=v+(.06+_*.86)*(w-v),E=g+(1-R/120)*(f-g),m=r.createRadialGradient(S,E,0,S,E,.9*he());m.addColorStop(0,"rgba(255,190,140,0.95)"),m.addColorStop(1,"rgba(255,140,80,0)"),r.fillStyle=m,r.fillRect(S-he(),E-he(),2*he(),2*he())}}r.fillStyle=ct.dim,r.font=`${1*he()}px DM Sans, sans-serif`,r.fillText("time \u2192",w-4.5*he(),n-.6*he()),r.save(),r.translate(1.2*he(),f),r.rotate(-Math.PI/2),r.fillText("radio frequency \u2192",0,0),r.restore()}}}function s0(i){let e=Je("div","panel p-future"),t=[{band:"Radio",gas:"cold gas",c:ct.cold,items:[{n:"FAST",s:"operating",cn:1,f:"fast",d:"Largest single dish; deep 21 cm maps",u:"https://fast.bao.ac.cn/",r:["Nan+ 2011","https://arxiv.org/abs/1105.3794"]},{n:"FAST Core Array",s:"planned",cn:1,f:"fast-core-array",d:"Dishes around FAST for sharper maps"},{n:"SKA",s:"building",f:"ska",d:"Thousands of antennas on two continents",u:"https://www.skao.int/",r:["Dewdney+ 2009","https://doi.org/10.1109/JPROC.2009.2021005"]}]},{band:"Optical",gas:"warm gas, glowing",c:ct.warm,items:[{n:"VLT / MUSE \xB7 Keck / KCWI",s:"operating",f:"vlt",d:"3D maps of glowing halo gas",u:"https://www.eso.org/public/teles-instr/paranal-observatory/vlt/vlt-instr/muse/",r:["Bacon+ 2010","https://doi.org/10.1117/12.856027"],r2:["Morrissey+ 2018","https://arxiv.org/abs/1807.10356"]},{n:"CSST",s:"planned",cn:1,f:"csst",d:"China\u2019s space survey telescope",r:["Gong+ 2019","https://arxiv.org/abs/1901.04634"]},{n:"AMASE",s:"planned",cn:1,f:"amase-prototype",d:"Wide-field integral-field mapping",r:["Yan+ 2021","https://arxiv.org/abs/2105.11471"]},{n:"14.5 m telescope",s:"planned \xB7 name not yet decided",cn:1,d:"With a possible new IFU, CUBWISE (concept)"}]},{band:"Ultraviolet",gas:"warm gas",c:ct.warm,items:[{n:"Hubble / COS",s:"operating",f:"hubble",d:"Absorption lines toward quasars",u:"https://www.stsci.edu/hst/instrumentation/cos",r:["Green+ 2012","https://arxiv.org/abs/1110.0462"]},{n:"Aspera",s:"planned",d:"Small satellite imaging halo gas in UV"},{n:"Lyric \xB7 Cafe",s:"concept",cn:1,f:"lyric",d:"UV mapping of halos from China",r:["Ji+ 2020","https://arxiv.org/abs/2012.07384"]}]},{band:"X-ray",gas:"hot gas",c:ct.hot,items:[{n:"eROSITA",s:"data 2019\u201322",f:"erosita-allsky",d:"All-sky X-ray survey",u:"https://www.mpe.mpg.de/eROSITA",r:["Predehl+ 2021","https://arxiv.org/abs/2010.03477"]},{n:"XRISM",s:"operating",f:"xrism",d:"Precise X-ray spectra: speed and temperature of hot gas",u:"https://science.nasa.gov/mission/xrism/"},{n:"HUBS",s:"planned",cn:1,f:"xray-mission",d:"Built to map hot gas around galaxies",r:["Cui+ 2020","https://doi.org/10.1007/s10909-019-02279-3"]},{n:"DIXE",s:"planned",cn:1,f:"dixe",d:"X-ray spectrometer on the Chinese Space Station",r:["Jin+ 2024","https://arxiv.org/abs/2406.09813"]}]}],n=(r,a)=>`<a href="${r}" target="_blank" rel="noopener">${a}</a>`,s=r=>[r.u&&n(r.u,"site \u2197"),r.r&&n(r.r[1],r.r[0]),r.r2&&n(r.r2[1],r.r2[0])].filter(Boolean).join("");return e.innerHTML="<h2>New eyes are coming \u2014 many of them built here</h2>"+t.map(r=>`<section style="--c:${r.c}"><h3>${r.band}</h3><p>${r.gas}</p>`+r.items.map(a=>`<div class="card${a.f?"":" plain"}"${a.f?` data-fig="${a.f}" role="button" tabindex="0"`:""}><b>${a.n}</b><span>${a.d}</span><em>${a.s}${a.cn?" \xB7 <strong>China</strong>":""}</em>`+(s(a)?`<nav>${s(a)}</nav>`:"")+"</div>").join("")+"</section>").join(""),e.addEventListener("click",r=>{if(r.target.closest("a"))return;let a=r.target.closest(".card[data-fig]");a&&i.openFig(a.dataset.fig)}),e.addEventListener("keydown",r=>{let a=r.target.closest(".card[data-fig]");a&&r.key==="Enter"&&i.openFig(a.dataset.fig)}),{el:e}}function r0(){let i=Je("div","panel p-inv"),e=15,t=10.5,n=18,s=18,r=(u,d,h,p,v)=>{let w=(M,A)=>[n+A*Math.sin(M*2*Math.PI),s-A*Math.cos(M*2*Math.PI)],[g,f]=w(u,p),[T,R]=w(d,p),[b,_]=w(d,h),[S,E]=w(u,h),m=d-u>.5?1:0;return`<path d="M${g} ${f}A${p} ${p} 0 ${m} 1 ${T} ${R}L${b} ${_}A${h} ${h} 0 ${m} 0 ${S} ${E}Z" fill="${v}" stroke="#0a121c" stroke-width="0.25"/>`},a=[{n:"Dark energy",v:.685,pct:68,c:"#5b6b8c"},{n:"Dark matter",v:.266,pct:27,c:"#8f6ff2"},{n:"Ordinary matter",v:.049,pct:5,c:"#c07a1e"}],o=0,l=a.map(u=>{let d=o;return o+=u.v,{...u,a0:d,a1:o}});i.innerHTML=`<div class="inv-q"></div><div class="inv-body">
    <svg viewBox="0 0 36 36" class="inv-donut">${l.map((u,d)=>`<g class="seg s${d}">${r(u.a0,u.a1,t,e,u.c)}</g>`).join("")}
      <g class="seg s3">${r(.951,.951+.049*.08,e+.8,e+2.4,"#ffd9a0")}</g></svg>
    <ul class="inv-key">${l.map((u,d)=>`<li class="k${d}"><i style="background:${u.c}"></i><b>${u.pct}%</b> ${u.n}</li>`).join("")}
      <li class="k3"><i style="background:#ffd9a0"></i><b>&lt;10%</b> of ordinary matter is in stars</li></ul></div>`;let c=["Everything you have ever seen \u2014 stars, planets, you \u2014 is ordinary matter. How much of the universe is that?","Only about 5%. The rest is dark matter and dark energy.","And of that 5%, how much is in stars? Less than a tenth."];return{el:i,show(u,d){i.querySelector(".inv-q").textContent=c[d],i.classList.toggle("reveal",d>=1),i.classList.toggle("stars",d>=2)}}}function a0(i){let e=Je("div","panel p-cycle"),t=[{n:"Accretion",d:"gas falls in from the cosmic web",a:-90},{n:"Star formation",d:"cold gas collapses into stars",a:0},{n:"Feedback",d:"supernovae and black holes push gas out",a:90},{n:"Recycling",d:"some of it cools and falls back",a:180}],n=13,s=20,r=o=>[s+n*Math.cos(o*Math.PI/180),s+n*Math.sin(o*Math.PI/180)];e.innerHTML=`<div class="cy-wrap"><svg viewBox="0 0 40 40" class="cy-svg">
      <circle cx="${s}" cy="${s}" r="${n}" fill="none" stroke="#ffffff22" stroke-width="0.35"/>
      <circle class="cy-run" cx="${s}" cy="${s}" r="${n}" fill="none" stroke="#8ad2dd" stroke-width="0.6" stroke-dasharray="3 79"/>
      ${t.map((o,l)=>{let[c,u]=r(o.a);return`<g class="cy-n n${l}"><circle cx="${c}" cy="${u}" r="3.2"/><text x="${c}" y="${u+.6}">${l+1}</text></g>`}).join("")}
      <text x="${s}" y="${s-.6}" class="cy-mid">the baryon</text><text x="${s}" y="${s+2.4}" class="cy-mid">cycle</text>
    </svg><ol class="cy-list">${t.map((o,l)=>`<li class="n${l}"><b>${o.n}</b><span>${o.d}</span></li>`).join("")}</ol></div>
    <figure class="cy-video"><video data-media-src="video/tng50-galaxy.mp4" data-media-sub-min="4" muted loop playsinline preload="none" controls></video>
      <figcaption>One galaxy forming in the TNG50 simulation: gas (colour) flows in, forms stars, and is blown back out. \xB7 TNG Collaboration</figcaption></figure>`;let a=e.querySelector("video");return{el:e,show(o,l){for(let u=0;u<4;u++)e.querySelectorAll(`.n${u}`).forEach(d=>d.classList.toggle("lit",u<l+1));let c=l>=4;if(e.classList.toggle("vid",c),c){let u=i.mediaURL(a.dataset.mediaSrc);a.preload="auto",a.getAttribute("src")!==u&&(a.src=u),a.paused&&a.currentTime<1&&(a.currentTime=1)}else a.pause()},hide(){a.pause()}}}function o0(){let i=Je("div","panel p-smhm"),e=40*he(),t=26*he(),n={l:4.6*he(),r:1.2*he(),t:1.2*he(),b:3.6*he()},[s,r]=on(e,t),a=10,o=15,l=7,c=13,u=_=>n.l+(_-a)/(o-a)*(e-n.l-n.r),d=_=>t-n.b-(_-l)/(c-l)*(t-n.t-n.b),h=.157,p=.0351,v=11.59,w=1.376,g=.608,f=_=>2*p/(10**(-w*(_-v))+10**(g*(_-v))),T=(_,S)=>_+Math.log10(h/(1+S*(h/f(_)-1)));i.append(Je("div","p-head","Stars in a galaxy vs. the mass of its halo"),s),i.insertAdjacentHTML("beforeend",`<input type="range" min="0" max="1" step="0.01" value="0">
    <div class="d-ticks"><span style="left:0%">no feedback</span><span style="left:100%">strong feedback</span></div>
    <div class="d-note">Dots: real galaxies follow this curve (fit of Moster+ 2013). Dashed: every bit of the halo's ordinary matter turned into stars.</div>`);let R=i.querySelector("input"),b=()=>{let _=+R.value;r.clearRect(0,0,e,t),r.strokeStyle="#ffffff14",r.lineWidth=1,r.fillStyle=ct.dim,r.font=`${.95*he()}px DM Sans, sans-serif`;for(let S=a;S<=o;S++)r.beginPath(),r.moveTo(u(S),d(l)),r.lineTo(u(S),d(c)),r.stroke();for(let S=a;S<=o;S++)r.textAlign="center",r.fillText(`10^${S}`,u(S),t-n.b+1.5*he());for(let S=l+1;S<=c;S+=2)r.beginPath(),r.moveTo(u(a),d(S)),r.lineTo(u(o),d(S)),r.stroke(),r.textAlign="right",r.fillText(`10^${S}`,u(a)-.5*he(),d(S)+.35*he());r.textAlign="center",r.fillStyle=ct.muted,r.fillText("halo mass (Suns)",u(12.5),t-.5*he()),r.save(),r.translate(1.1*he(),d(9.5)),r.rotate(-Math.PI/2),r.fillText("mass in stars (Suns)",0,0),r.restore(),r.save(),r.beginPath(),r.rect(u(a),d(c),u(o)-u(a),d(l)-d(c)),r.clip(),r.setLineDash([5,5]),r.strokeStyle="#c07a1e",r.lineWidth=2,r.beginPath(),r.moveTo(u(a),d(a+Math.log10(h))),r.lineTo(u(o),d(o+Math.log10(h))),r.stroke(),r.setLineDash([]);for(let S=0;S<90;S++){let E=A=>{let C=Math.sin(S*12.9898+A*78.233)*43758.5453;return C-Math.floor(C)},m=10.3+E(1)*4.4,M=(E(2)+E(3)+E(4)-1.5)*.3;r.fillStyle="#d7e3ee",r.beginPath(),r.arc(u(m),d(m+Math.log10(f(m))+M),.32*he(),0,6.283),r.fill()}r.strokeStyle="#8ad2dd",r.lineWidth=3,r.beginPath();for(let S=0;S<=100;S++){let E=a+S/100*(o-a),m=T(E,_);S?r.lineTo(u(E),d(m)):r.moveTo(u(E),d(m))}r.stroke(),r.restore(),r.fillStyle="#8ad2dd",r.textAlign="right",r.font=`500 ${1.05*he()}px DM Sans, sans-serif`,r.fillText("model with feedback",u(14.95),d(Math.min(T(14.6,_),12.6))+1.8*he()),r.fillStyle="#e7b36b",r.textAlign="left",r.fillText("if all gas became stars",u(10.6),d(12.4)),_>.45&&(r.fillStyle=ct.muted,r.font=`${1*he()}px DM Sans, sans-serif`,r.fillText("stars & supernovae",u(10.25),d(T(10.6,_))+2.2*he()),r.textAlign="right",r.fillText("black holes",u(14.9),d(T(14.6,_))+2.2*he())),r.fillStyle="#ffd9a0",r.beginPath(),r.arc(u(12.1),d(10.75),.55*he(),0,6.283),r.fill(),r.textAlign="left",r.fillStyle=ct.ink,r.font=`${1*he()}px DM Sans, sans-serif`,r.fillText("Milky Way",u(12.1)+.9*he(),d(10.75)+1.6*he())};return R.addEventListener("input",b),{el:i,show(){R.value=0,b()}}}function l0(){let i=Je("div","panel p-budget");return i.innerHTML=`<div class="p-head">Ordinary matter in a Milky Way\u2013like halo</div>
    <div class="bg-row"><span>Expected</span><div class="bg-bar"><i style="width:100%;background:#c07a1e55;border:1px dashed #c07a1e"></i></div><em>~200 billion Suns</em></div>
    <div class="bg-row"><span>Found</span><div class="bg-bar"><i style="width:30%;background:#c07a1e"></i><i style="width:5%;background:#2a9fd0"></i><i class="cgm" style="width:0%"></i></div><em class="bg-found">about one third</em></div>
    <div class="bg-key"><span><i style="background:#c07a1e"></i>stars</span><span><i style="background:#2a9fd0"></i>gas in the disk</span><span class="cgm-k"><i class="cgm"></i>hot halo gas?</span></div>
    <div class="d-note">Rough numbers for the Milky Way. Where is the other two thirds \u2014 pushed out, or hiding in a hot halo we can barely see?</div>`,{el:i,show(e,t){i.querySelector(".bg-bar i.cgm").style.width=t>=1?"35%":"0%",i.querySelector(".bg-found").textContent=t>=1?"one third + ?":"about one third",i.classList.toggle("k1",t>=1)}}}var Wu={emabs:Zg,spinflip:Jg,lines:Kg,xsources:jg,xspec:Qg,answers:e0,temperature:Xg,dish:$g,ifs:qg,spectrum:Yg,halos:t0,stack:n0,frb:i0,future:s0,inventory:r0,cycle:a0,smhm:o0,budget:l0};ql({scene:Gu,panels:Wu});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
