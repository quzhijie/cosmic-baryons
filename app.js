(()=>{var kl={cold:"#3ee6cf",warm:"#ff7eb0",hot:"#b9a4ff",stars:"#ffd38a",dm:"#9aa8ff",red:"#ff6b6b",blue:"#6fa8ff",gold:"#ffc85a",teal:"#3ee6cf",pink:"#ff7eb6",purple:"#b9a4ff",em:"#8ad2dd"},Gu=i=>String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function _o(i,e=0,t=!1){let n=[],s="",r=()=>{s&&n.push({text:s}),s=""};for(;e<i.length;){let a=i[e];if(t&&a==="}")return r(),[n,e+1];if(a==="\\"){let o=/^\\([a-zA-Z]+)\{/.exec(i.slice(e));if(o&&kl[o[1]]){let[l,c]=_o(i,e+o[0].length,!0);if(c>0){r(),n.push({macro:o[1],children:l}),e=c;continue}}}s+=a,e++}return r(),t?[n,-1]:[n,e]}var Bl=i=>i.map(e=>e.text!=null?Gu(e.text):`<span class="c-${e.macro}">${Bl(e.children)}</span>`).join(""),zl=i=>i.map(e=>e.text!=null?e.text:zl(e.children)).join(""),Ot=i=>Bl(_o(String(i??""))[0]),xs=i=>zl(_o(String(i??""))[0]);function Vl(){let i=document.createElement("style");i.textContent=Object.entries(kl).map(([e,t])=>`.c-${e}{color:${t}}`).join("")+".c-em{font-weight:500}",document.head.appendChild(i)}var ht={cold:"#2a9fd0",warm:"#e2507f",hot:"#8f6ff2",ink:"#edf2f6",muted:"#a9bac9",dim:"#6f879d",line:"#ffffff26"},Qe=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!=null&&(n.innerHTML=t),n},Hl=i=>i>=1e4?`${(i/10**Math.floor(Math.log10(i))).toFixed(1).replace(/\.0$/,"")} \xD7 10<sup>${Math.floor(Math.log10(i))}</sup> K`:`${Math.round(i).toLocaleString("en")} K`;function ln(i,e){let t=document.createElement("canvas"),n=Math.min(devicePixelRatio||1,2);t.width=i*n,t.height=e*n,t.style.width=`${i}px`,t.style.height=`${e}px`;let s=t.getContext("2d");return s.scale(n,n),[t,s]}var ce=()=>Math.min(innerWidth/100,innerHeight/56.25);function Wu(){let i=Qe("div","panel p-summary");return{el:i,show(e){let t=Array.isArray(e.methods)&&e.methods.length?`<div class="methods">${e.methods.map(n=>`<div class="m" style="--c: var(--c-${n.band||"all"})"><b>${Ot(n.name)}</b><span>${Ot(n.sees)}</span></div>`).join("")}</div>`:"";i.classList.toggle("has-methods",!!t),i.innerHTML=t+`<ol>${e.points.map(n=>`<li>${Ot(n)}</li>`).join("")}</ol>`+(e.questions?`<div class="qs"><span>Open questions</span>${e.questions.map((n,s)=>`<p><b>${s+1}</b>${Ot(n)}</p>`).join("")}</div>`:"")}}}function Xu(){let i=Qe("div","panel p-break","<span>Break</span><b></b><small>Up next \u2014 Part II: seeing the invisible</small>"),e=i.querySelector("b"),t=600,n=()=>{e.textContent=`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`};return n(),{el:i,show(s={}){let r=s.breakMin;t=(typeof r=="number"&&Number.isFinite(r)&&r>=0?r:10)*60,n()},tick(s){t=Math.max(0,t-s),n()}}}function yo(i,e,{drag:t=!1}={}){let n=Array.isArray(e.panelPos)?e.panelPos:null,s=+e.panelScale||1,r=i.style,a=(f,M)=>r.setProperty(f,M,"important");for(let f of["left","top","right","bottom","translate","transform-origin","scale"])r.removeProperty(f);if(!n&&s===1)return;let o=getComputedStyle(i),l=ce(),c=i.offsetWidth*s,u=i.offsetHeight*s,d=n?n[0]*innerWidth:parseFloat(o.left),h=n?n[1]*innerHeight:parseFloat(o.top),p=document.body.classList.contains("editing"),v=p&&document.getElementById("editor"),S=v?v.getBoundingClientRect().left:innerWidth;if((()=>{d=Math.max(l,Math.min(d,S-l-c)),h=Math.max(l,Math.min(h,innerHeight-l-u))})(),!t&&!p)for(let f of[document.querySelector("#dock.on"),document.getElementById("ladder"),document.getElementById("bands")]){let M=f&&f.getBoundingClientRect();if(!M||!M.width||d+c<=M.left||d>=M.right||h+u<=M.top||h>=M.bottom)continue;let A=[[M.left-l-c-d,0],[M.right+l-d,0],[0,M.top-l-u-h],[0,M.bottom+l-h]].filter(([b,T])=>d+b>=l&&d+b+c<=S-l&&h+T>=l&&h+T+u<=innerHeight-l),[_,x]=A.sort((b,T)=>Math.hypot(...b)-Math.hypot(...T))[0]||[0,0];d+=_,h+=x}a("left",`${d}px`),a("top",`${h}px`),a("right","auto"),a("bottom","auto"),a("translate","none"),a("transform-origin","0 0"),a("scale",String(s))}function Gl(i,e){let t={summary:Wu(e),break:Xu(e)};for(let[a,o]of Object.entries(i||{}))t[a]=o(e);let n=document.getElementById("panels");for(let a in t)t[a].el.dataset.panel=a,n.appendChild(t[a].el);let s=null,r=null;return addEventListener("resize",()=>{s&&yo(t[s].el,r)}),{names:Object.keys(t),set(a,o,l){t[a]||(a=null),s&&s!==a&&(t[s].el.classList.remove("on"),t[s].hide&&t[s].hide()),a&&(t[a].el.classList.add("on"),t[a].show&&t[a].show(o,l),yo(t[a].el,o)),s=a||null,r=o},tick(a){s&&t[s].tick&&t[s].tick(a)}}}function Wl({STEPS:i,idx:e,go:t,onDigit:n}){let s=document.createElement("div");s.id="nav",s.hidden=!0,document.body.appendChild(s);let r=document.createElement("div");r.id="navnum",r.hidden=!0,document.body.appendChild(r);let a=0,o="",l=null,c=null,u=_=>{let x=/^\s*(Part\s+[IVX\d]+)/i.exec(xs(_.kicker||""));return x?x[1]:""},d=_=>xs(_.title||"")||(_.layout==="figure"?"Figure page":"\u2014");function h(){let _=[],x=i.map(u).find(Boolean)||"",b=null,T=null;i.forEach((E,I)=>{let R=u(E)||(b?b.name:x);(!b||R&&R!==b.name)&&(b={name:R||"Opening",stops:[]},_.push(b),T=null),(!T||T.stop!==E.stop)&&(T={stop:E.stop,steps:[]},b.stops.push(T)),T.steps.push(I)});let g=e();s.innerHTML=`<div class="nav-box"><div class="nav-head"><b>Jump to</b><span>click a step \xB7 \u2191\u2193 and Enter \xB7 type a number + Enter \xB7 Esc closes</span></div>
      <div class="nav-cols">${_.map(E=>`<h3>${E.name||"Steps"}</h3>${E.stops.map(I=>`
        <div class="nav-stop${I.steps.includes(g)?" here":""}"><em>${I.stop}</em><div>${I.steps.map(R=>`<button data-i="${R}" class="${R===g?"cur":""}"><small>${R+1}</small>${d(i[R])}</button>`).join("")}</div></div>`).join("")}`).join("")}</div></div>`,a=g,p()}let p=()=>{s.querySelectorAll("button.sel").forEach(x=>x.classList.remove("sel"));let _=s.querySelector(`button[data-i="${a}"]`);_&&(_.classList.add("sel"),_.scrollIntoView({block:"nearest"}))},v=()=>{h(),s.hidden=!1},S=()=>{s.hidden=!0,s.innerHTML=""},m=_=>{S(),_!==e()&&t(_)};s.addEventListener("click",_=>{let x=_.target.closest("button[data-i]");x?m(+x.dataset.i):_.target.closest(".nav-box")||S()});let f=()=>{r.hidden=!o,r.textContent=o?`Go to step ${o}`:"",clearTimeout(l),o&&(l=setTimeout(()=>{o="",f()},2500))};function M(_){if(!s.hidden)return _.key==="Escape"||_.key==="g"||_.key==="G"?S():_.key==="Enter"?m(a):_.key==="ArrowDown"||_.key==="ArrowRight"?(a=Math.min(i.length-1,a+1),p()):_.key==="ArrowUp"||_.key==="ArrowLeft"?(a=Math.max(0,a-1),p()):(_.key==="PageDown"||_.key==="PageUp")&&(a=Math.max(0,Math.min(i.length-1,a+(_.key==="PageDown"?8:-8))),p()),_.preventDefault(),!0;if(_.metaKey||_.ctrlKey||_.altKey)return!1;if(_.key==="g"||_.key==="G")return o="",f(),v(),!0;if(/^\d$/.test(_.key)){if(o=(o+_.key).slice(-3),f(),clearTimeout(c),o.length===1&&n){let x=_.key;c=setTimeout(()=>{o===x&&(n(x),o="",f())},450)}return!0}if(o&&_.key==="Enter"){let x=+o;return o="",f(),clearTimeout(c),x>=1&&x<=i.length&&m(x-1),_.preventDefault(),!0}return o&&(_.key==="Escape"||_.key==="Backspace")?(o=_.key==="Backspace"?o.slice(0,-1):"",f(),clearTimeout(c),!0):!1}let A=document.getElementById("progress");return A&&(A.title="Click to jump",A.addEventListener("click",_=>{let x=A.getBoundingClientRect();m(Math.min(i.length-1,Math.floor((_.clientX-x.left)/x.width*i.length)))}),A.addEventListener("pointermove",_=>{let x=A.getBoundingClientRect(),b=Math.min(i.length-1,Math.floor((_.clientX-x.left)/x.width*i.length));A.title=`${b+1} \xB7 ${d(i[b])}`})),{onKey:M,isOpen:()=>!s.hidden,close:S}}function Xl(i=[]){let e=new URLSearchParams(location.search).has("nopreload")?"nopreload":navigator.connection?.saveData?"saveData":"",t=M=>new URL(M,document.baseURI).href,n=new Map(i.map(M=>[t(M.src),{...M,steps:new Set(M.steps),state:"queued",loaded:0}])),s=[],r=()=>[...s,...n.values()],a=0,o=0,l=0,c=0,u=!1,d=!1,h=M=>window.requestIdleCallback?requestIdleCallback(M,{timeout:1e3}):setTimeout(M,50),p=M=>M.kind==="font"?-1:M.steps.size?Math.min(...[...M.steps].map(A=>Math.abs(A-a))):1/0;function v(){u||d||e||!l||(u=!0,h(()=>{u=!1,S()}))}function S(){if(d)return;let M=r().filter(A=>A.state==="queued").sort((A,_)=>p(A)-p(_));for(;o<2&&M.length;){let A=M.shift();A.state="loading",o++,m(A).then(()=>{A.state="ready"},_=>{A.state="failed",A.error=String(_.message||_),d||console.warn(`[deckkit] preload failed: ${A.src}`,_),A.url&&(URL.revokeObjectURL(A.url),A.url=null)}).finally(()=>{o--,r().every(_=>["ready","failed"].includes(_.state))&&(c=performance.now()),v()})}r().every(A=>["ready","failed"].includes(A.state))&&(c||=performance.now())}async function m(M){if(M.kind==="font"){await M.face.load();return}let A=new AbortController;M.controller=A;let _=setTimeout(()=>A.abort(),12e4);try{let x=await fetch(M.src,{signal:A.signal,priority:"low"});if(!x.ok)throw new Error(`HTTP ${x.status}: ${M.src}`);let b;if(x.body){let T=x.body.getReader(),g=[];for(;;){let{done:E,value:I}=await T.read();if(E)break;g.push(I),M.loaded+=I.byteLength}b=new Blob(g,{type:x.headers.get("content-type")||(M.kind==="video"?"video/mp4":"")})}else b=await x.blob(),M.loaded=b.size;if(d)return;M.url=URL.createObjectURL(b),M.kind==="image"&&(M.image=new Image,M.image.decoding="async",M.image.src=M.url,await M.image.decode())}finally{clearTimeout(_),M.controller=null}}let f=()=>{let M=[...n.values()];return{status:e?"disabled":l?c?r().some(A=>A.state==="failed")?"failed":"complete":"loading":"waiting",reason:e,done:M.filter(A=>A.state==="ready").length,total:M.length,fonts:s.map(({src:A,state:_,error:x})=>({src:A,state:_,error:x})),loadedBytes:M.reduce((A,_)=>A+_.loaded,0),totalBytes:M.reduce((A,_)=>A+_.bytes,0),active:o,startedAt:l,finishedAt:c,entries:M.map(({src:A,state:_,loaded:x,error:b,steps:T})=>({src:A,state:_,loaded:x,error:b,steps:[...T]}))}};return addEventListener("pagehide",M=>{if(!M.persisted){d=!0;for(let A of n.values())A.controller?.abort(),A.url&&URL.revokeObjectURL(A.url),A.image=null}}),{start(){if(!(e||l||d)){for(let M of document.fonts||[])s.push({kind:"font",face:M,src:`${M.family} ${M.weight}`,state:M.status==="loaded"?"ready":"queued"});l=performance.now(),v()}},position(M){a=M,v()},use(M,A){let _=n.get(t(M));if(_)for(let x of A)_.steps.add(x)},mediaURL(M){let A=n.get(t(M));return A?.state==="ready"?A.url:M},snapshot:f,text(){let M=f();return e?`preload off \xB7 ${e}`:`preload ${M.done}/${M.total} \xB7 ${(M.loadedBytes/1e6).toFixed(1)}/${(M.totalBytes/1e6).toFixed(1)} MB${M.status==="failed"?" \xB7 failed (see console)":""}`}}}function $l({scene:i=null,panels:e={}}={}){let t=G=>document.querySelector(G),n=window.DECK;if(!n||!Array.isArray(n.steps)||!n.steps.length){document.body.insertAdjacentHTML("beforeend",'<p style="color:#fff;padding:2em;font:16px sans-serif">deck.js is missing or empty.</p>');return}Vl();let s=n.steps,r=n.figs||={},a=n.dock||={},o=n.caps||={},l=Xl(window.DECK_MEDIA),c=G=>`img/${encodeURIComponent(r[G]&&r[G].file||`${G}.jpg`)}`,u=G=>l.mediaURL(c(G)),d=(G,ue)=>{let B=(o[ue]||{})[G]||{},J=r[G]||{};return{t:B.t||J.t||G,c:B.c||J.c||"",cr:J.cr||""}},h=()=>JSON.parse(JSON.stringify({version:1,steps:s,dock:a,figs:r,caps:o})),p=0,v=!1,S=[],m=0;function f(){let G=S[m];t("#lightbox img").src=l.mediaURL(G.src||u(G.img)),t("#lightbox h3").innerHTML=Ot(G.t),t("#lightbox p").innerHTML=Ot(G.c),t("#lightbox small").textContent=G.cr?`Image: ${G.cr}`:"",t("#lightbox .lb-count").textContent=S.length>1?`${m+1} / ${S.length}  \xB7  \u2190 \u2192`:""}function M(G,ue){S=G,m=ue,f(),t("#lightbox").hidden=!1}let A=()=>{t("#lightbox").hidden=!0};t("#lightbox").addEventListener("click",A),t("#card .notes-btn").addEventListener("click",()=>document.body.classList.toggle("notes"));let _=(G,ue=s[p].stop)=>({img:G,src:u(G),...r[G],...d(G,ue)}),x=G=>M([_(G)],0),b={right:-1e9,top:1e9},T=i?i({STEPS:s,idx:()=>p,openLightbox:M,figSrc:u,preloadInfo:()=>l.text(),preloadFig:(G,ue)=>l.use(c(G),ue),marksHidden:({ignoreDim:G=!1}={})=>{let ue=s[p];return v||!G&&!!ue.dim||ue.layout==="figure"||ue.panel==="break"},blocked:(G,ue)=>G<b.right+40&&ue>b.top-30}):null,g={toggle(){},render(){},pickDock(){},dockRemove(){},selectFig(){}};function E(G){let ue=(a[G]||[]).filter(he=>r[he]),B=t("#dock"),J=!1;B.classList.toggle("on",ue.length>0||J),B.innerHTML=(ue.length||J?"<span>Figures</span>":"")+ue.map((he,Me)=>`<button data-i="${Me}" title="${xs(d(he,G).t).replace(/"/g,"&quot;")}"><img src="${u(he)}" alt="" loading="lazy">${J?`<i data-rm="${Me}" title="Remove from this stop">\xD7</i>`:""}</button>`).join("")+(J?'<button class="dock-add" title="Add a figure">+</button>':""),B.onclick=he=>{let Me=he.target.closest("button");if(Me){if(J){if(Me.classList.contains("dock-add"))return g.pickDock();let de=he.target.closest("[data-rm]");return de?g.dockRemove(+de.dataset.rm):g.selectFig(ue[+Me.dataset.i])}M(ue.map(de=>_(de,G)),+Me.dataset.i)}}}let I=Gl(e,{openFig:x,mediaURL:l.mediaURL,...T?T.panelApi:{}});for(let G of document.querySelectorAll("#panels .panel")){let ue=s.flatMap((B,J)=>B.panel===G.dataset.panel?[J]:[]);for(let B of G.querySelectorAll("[data-fig], [data-media-src]"))l.use(B.dataset.fig?c(B.dataset.fig):B.dataset.mediaSrc,ue)}function R(G,ue={}){p=Math.max(0,Math.min(s.length-1,G)),l.position(p);let B=s[p];T&&T.applyStep(B,ue),I.set(B.panel,B,B.sub||0),E(B.stop);let J=t("#figpage"),he=B.layout==="figure";if(J.classList.toggle("on",he),he){J.dataset.arrange=B.arrange||"stack";let nt=(B.figs||[]).filter(Ze=>r[Ze]);J.querySelector(".kicker").innerHTML=B.kicker?`${Ot(B.kicker)} \xB7 ${B.stop}`:"",J.querySelector("h1").innerHTML=Ot(B.title||""),J.querySelector(".figs").className=`figs n${Math.min(nt.length,2)}`,J.classList.toggle("side",(B.arrange||"stack")!=="stack"),J.querySelector(".figs").innerHTML=nt.length?nt.map((Ze,Ge)=>`<button data-k="${Ge}"><img src="${u(Ze)}" alt=""></button>`).join(""):'<div class="empty">No figure yet \u2014 press E and add one.</div>',J.querySelector(".figs").onclick=Ze=>{let Ge=Ze.target.closest("button");Ge&&M(nt.map(lt=>_(lt,B.stop)),+Ge.dataset.k)};let Le=B.caption||nt.map(Ze=>d(Ze,B.stop).c).join(" "),Pe=[...new Set(nt.map(Ze=>r[Ze].cr).filter(Boolean))].join(" \xB7 ");J.querySelector(".cap").innerHTML=`${Ot(Le)}${Pe?`<small>${Ot(Pe)}</small>`:""}`}document.body.classList.toggle("dim",!!B.dim||he);let Me=t("#card"),de=t("#titlecard"),He=B.layout==="title";if(v=He,Me.classList.remove("on"),de.classList.toggle("on",He),clearTimeout(Me._t),He){de.querySelector("h1").innerHTML=Ot(B.title),de.querySelector("p").innerHTML=Ot(B.text);let nt=(Array.isArray(B.meta)?B.meta:String(B.meta||"").split(`
`)).map(Pe=>String(Pe).trim()).filter(Boolean),Le=de.querySelector("small");Le.classList.toggle("lines",nt.length>1),Le.innerHTML=nt.map(Pe=>`<span>${Ot(Pe)}</span>`).join("")}else!B.noCard&&!he&&(Me._t=setTimeout(()=>{Me.querySelector(".kicker").innerHTML=`${Ot(B.kicker)} \xB7 ${B.stop}`,Me.querySelector("h1").innerHTML=Ot(B.title),Me.querySelector("p").innerHTML=Ot(B.text),Me.querySelector(".notes").innerHTML=B.notes?B.notes.split(`

`).map(nt=>`<p>${Ot(nt)}</p>`).join(""):"",Me.classList.toggle("has-notes",!!B.notes),Me.classList.add("on")},ue.instant?0:380));t("#progress i").style.width=`${(p+1)/s.length*100}%`,history.replaceState(null,"",`#${p+1}`),ue.keepCam||g.render()}let U=Wl({STEPS:s,idx:()=>p,go:G=>R(G,{jump:!0}),onDigit:G=>T&&T.onKey({key:G})});addEventListener("keydown",G=>{if(!t("#lightbox").hidden){["Escape"," ","Enter"].includes(G.key)?A():G.key==="ArrowRight"&&m<S.length-1?(m++,f()):G.key==="ArrowLeft"&&m>0&&(m--,f());return}if(!(G.target.closest&&G.target.closest("input, textarea, select, #editor")&&(!["PageDown","PageUp"].includes(G.key)||G.target.closest("#editor")))&&!U.onKey(G)){if(G.key==="e"||G.key==="E"){g.toggle();return}["ArrowRight","ArrowDown","PageDown"," "].includes(G.key)?(G.preventDefault(),R(p+1)):["ArrowLeft","ArrowUp","PageUp"].includes(G.key)?(G.preventDefault(),R(p-1)):T&&T.onKey(G)||(G.key==="h"||G.key==="H"?document.body.classList.toggle("bare"):G.key==="n"||G.key==="N"?document.body.classList.toggle("notes"):G.key==="b"||G.key==="B"?t("#black").classList.toggle("on"):(G.key==="f"||G.key==="F")&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()))}});let k=document.createElement("div");k.id="touchnav",k.innerHTML='<button data-t="prev" aria-label="Previous step">\u2039</button><button data-t="list" aria-label="All steps">\u2630</button><button data-t="next" aria-label="Next step">\u203A</button>',document.body.appendChild(k);let P=()=>document.body.classList.add("touch");matchMedia("(pointer: coarse)").matches&&P(),k.addEventListener("click",G=>{let ue=G.target.closest("button");ue&&(ue.dataset.t==="prev"?R(p-1):ue.dataset.t==="next"?R(p+1):U.onKey({key:"g",preventDefault(){}}))});let X=new Map,Z=null;addEventListener("pointerdown",G=>{if(G.pointerType!=="touch")return;P(),X.set(G.pointerId,!0);let ue=G.target.closest&&G.target.closest("input, textarea, select, #editor, #nav, #touchnav, .panel input, [role=slider]");Z=X.size===1&&!ue?{id:G.pointerId,x:G.clientX,y:G.clientY,t:performance.now()}:null},!0);let H=G=>{if(G.pointerType!=="touch")return;if(X.delete(G.pointerId),!Z||Z.id!==G.pointerId||G.type==="pointercancel"){X.size||(Z=null);return}let ue=G.clientX-Z.x,B=G.clientY-Z.y,J=performance.now()-Z.t;if(Z=null,!(Math.abs(ue)<60||Math.abs(ue)<1.8*Math.abs(B)||J>1200)){if(!t("#lightbox").hidden){ue<0&&m<S.length-1?(m++,f()):ue>0&&m>0&&(m--,f());return}U.isOpen()||R(p+(ue<0?1:-1))}};addEventListener("pointerup",H,!0),addEventListener("pointercancel",H,!0);let ie=t("#fps"),j=performance.now(),F=0,L=0,ae=!0;function ne(G){let ue=Math.max(0,Math.min((G-j)/1e3,.05));j=G;let B=t("#card");b=B.classList.contains("on")?B.getBoundingClientRect():{right:-1e9,top:1e9},I.tick(ue),T&&T.frame(ue,{lightboxOpen:!t("#lightbox").hidden}),ae&&(ae=!1,requestAnimationFrame(()=>l.start())),F++,L+=ue,ie&&L>.5&&(ie.textContent=`${Math.round(F/L)} fps${T&&T.quality?` \xB7 ${T.quality()}`:""}`,F=0,L=0),requestAnimationFrame(ne)}let Ae=parseInt(location.hash.slice(1),10);R(Number.isFinite(Ae)?Ae-1:0,{instant:!0}),new URLSearchParams(location.search).has("debug")&&document.body.classList.add("debug"),window.__dbg={...T?T.debug:{},applyStep:R,STEPS:s,preload:l.snapshot},requestAnimationFrame(ne)}var mc=0,Yo=1,gc=2;var Xs=1,vc=2,as=3,fi=0,$t=1,Bn=2,yn=0,os=1,pi=2,Zo=3,Jo=4,xc=5;var Ri=100,_c=101,yc=102,bc=103,Mc=104,Sc=200,wc=201,Tc=202,Ec=203,Ko=204,jo=205,Ac=206,Cc=207,Rc=208,Ic=209,Pc=210,Lc=211,Dc=212,Nc=213,Uc=214,Br=0,zr=1,Vr=2,Qi=3,Hr=4,Gr=5,Wr=6,Xr=7,Qo=0,Fc=1,Oc=2,In=0,$s=1,qs=2,Ys=3,Ii=4,Zs=5,Js=6,Ks=7;var el=300,mi=301,Pi=302,ma=303,ga=304,js=306,$r=1e3,Nn=1001,qr=1002,Gt=1003,kc=1004;var Qs=1005;var Xt=1006,va=1007;var gi=1008;var vn=1009,tl=1010,nl=1011,ls=1012,xa=1013,Pn=1014,Ln=1015,qt=1016,_a=1017,ya=1018,cs=1020,il=35902,sl=35899,rl=1021,al=1022,bn=1023,Un=1026,vi=1027,ol=1028,ba=1029,xi=1030,Ma=1031;var Sa=1033,er=33776,tr=33777,nr=33778,ir=33779,wa=35840,Ta=35841,Ea=35842,Aa=35843,Ca=36196,Ra=37492,Ia=37496,Pa=37488,La=37489,sr=37490,Da=37491,Na=37808,Ua=37809,Fa=37810,Oa=37811,ka=37812,Ba=37813,za=37814,Va=37815,Ha=37816,Ga=37817,Wa=37818,Xa=37819,$a=37820,qa=37821,Ya=36492,Za=36494,Ja=36495,Ka=36283,ja=36284,rr=36285,Qa=36286;var Ts=2300,Yr=2301,Or=2302,Vo=2303,Ho=2400,Go=2401,Wo=2402;var Bc=3200;var ll=0,zc=1,Zn="",fn="srgb",Es="srgb-linear",As="linear",vt="srgb";var kr=7680;var Vc=519,Hc=512,Gc=513,Wc=514,eo=515,Xc=516,$c=517,to=518,qc=519,Yc=35044;var cl="300 es",Rn=2e3,Cs=2001;function $u(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Rs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zc(){let i=Rs("canvas");return i.style.display="block",i}var ql={},es=null;function ul(...i){let e="THREE."+i.shift();es?es("log",e,...i):console.log(e,...i)}function Jc(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function We(...i){i=Jc(i);let e="THREE."+i.shift();if(es)es("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=Jc(i);let e="THREE."+i.shift();if(es)es("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ei(...i){let e=i.join(" ");e in ql||(ql[e]=!0,We(...i))}function Kc(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var jc={[Br]:zr,[Vr]:Wr,[Hr]:Xr,[Qi]:Gr,[zr]:Br,[Wr]:Vr,[Xr]:Hr,[Gr]:Qi},Fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yl=1234567,Ss=Math.PI/180,ts=180/Math.PI;function us(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function ft(i,e,t){return Math.max(e,Math.min(t,i))}function hl(i,e){return(i%e+e)%e}function Yu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Zu(i,e,t){return i!==e?(t-i)/(e-i):0}function ws(i,e,t){return(1-t)*i+t*e}function Ju(i,e,t,n){return ws(i,e,1-Math.exp(-t*n))}function Ku(i,e=1){return e-Math.abs(hl(i,e*2)-e)}function ju(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Qu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function eh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function th(i,e){return i+Math.random()*(e-i)}function nh(i){return i*(.5-Math.random())}function ih(i){i!==void 0&&(Yl=i);let e=Yl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sh(i){return i*Ss}function rh(i){return i*ts}function ah(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function oh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function lh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ch(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),h=a((e-n)/2),p=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*v,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*v,o*c);break;case"ZYZ":i.set(l*v,l*p,o*u,o*c);break;default:We("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ki(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var no={DEG2RAD:Ss,RAD2DEG:ts,generateUUID:us,clamp:ft,euclideanModulo:hl,mapLinear:Yu,inverseLerp:Zu,lerp:ws,damp:Ju,pingpong:Ku,smoothstep:ju,smootherstep:Qu,randInt:eh,randFloat:th,randFloatSpread:nh,seededRandom:ih,degToRad:sh,radToDeg:rh,isPowerOfTwo:ah,ceilPowerOfTwo:oh,floorPowerOfTwo:lh,setQuaternionFromProperEuler:ch,normalize:sn,denormalize:Ki},qe=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},On=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],p=r[a+1],v=r[a+2],S=r[a+3];if(d!==S||l!==h||c!==p||u!==v){let m=l*h+c*p+u*v+d*S;m<0&&(h=-h,p=-p,v=-v,S=-S,m=-m);let f=1-o;if(m<.9995){let M=Math.acos(m),A=Math.sin(M);f=Math.sin(f*M)/A,o=Math.sin(o*M)/A,l=l*f+h*o,c=c*f+p*o,u=u*f+v*o,d=d*f+S*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+v*o,d=d*f+S*o;let M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+u*d+l*p-c*h,e[t+1]=l*v+u*h+c*d-o*p,e[t+2]=c*v+u*p+o*h-l*d,e[t+3]=u*v-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*p*v,this._y=c*p*d-h*u*v,this._z=c*u*v+h*p*d,this._w=c*u*d-h*p*v;break;case"YXZ":this._x=h*u*d+c*p*v,this._y=c*p*d-h*u*v,this._z=c*u*v-h*p*d,this._w=c*u*d+h*p*v;break;case"ZXY":this._x=h*u*d-c*p*v,this._y=c*p*d+h*u*v,this._z=c*u*v+h*p*d,this._w=c*u*d-h*p*v;break;case"ZYX":this._x=h*u*d-c*p*v,this._y=c*p*d+h*u*v,this._z=c*u*v-h*p*d,this._w=c*u*d+h*p*v;break;case"YZX":this._x=h*u*d+c*p*v,this._y=c*p*d+h*u*v,this._z=c*u*v-h*p*d,this._w=c*u*d-h*p*v;break;case"XZY":this._x=h*u*d-c*p*v,this._y=c*p*d-h*u*v,this._z=c*u*v+h*p*d,this._w=c*u*d+h*p*v;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bo.copy(this).projectOnVector(e),this.sub(bo)}reflect(e){return this.sub(bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bo=new W,Zl=new On,et=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],v=n[8],S=s[0],m=s[3],f=s[6],M=s[1],A=s[4],_=s[7],x=s[2],b=s[5],T=s[8];return r[0]=a*S+o*M+l*x,r[3]=a*m+o*A+l*b,r[6]=a*f+o*_+l*T,r[1]=c*S+u*M+d*x,r[4]=c*m+u*A+d*b,r[7]=c*f+u*_+d*T,r[2]=h*S+p*M+v*x,r[5]=h*m+p*A+v*b,r[8]=h*f+p*_+v*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,p=c*r-a*l,v=t*d+n*h+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/v;return e[0]=d*S,e[1]=(s*c-u*n)*S,e[2]=(o*n-s*a)*S,e[3]=h*S,e[4]=(u*t-s*l)*S,e[5]=(s*r-o*t)*S,e[6]=p*S,e[7]=(n*l-c*t)*S,e[8]=(a*t-n*r)*S,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ei("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mo.makeScale(e,t)),this}rotate(e){return Ei("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mo.makeRotation(-e)),this}translate(e,t){return Ei("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Mo=new et,Jl=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kl=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uh(){let i={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zn?As:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ei("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ei("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Es]:{primaries:e,whitePoint:n,transfer:As,toXYZ:Jl,fromXYZ:Kl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:Jl,fromXYZ:Kl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),i}var ct=uh();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ki,Zr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ki===void 0&&(ki=Rs("canvas")),ki.width=e.width,ki.height=e.height;let s=ki.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ki}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Rs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},hh=0,ns=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=us(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(So(s[a].image)):r.push(So(s[a]))}else r=So(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function So(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}var dh=0,wo=new W,un=class i extends Fn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Nn,s=Nn,r=Xt,a=gi,o=bn,l=vn,c=i.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=us(),this.name="",this.source=new ns(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wo).x}get height(){return this.source.getSize(wo).y}get depth(){return this.source.getSize(wo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){We(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){We(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==el)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $r:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case qr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $r:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case qr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=el;un.DEFAULT_ANISOTROPY=1;var Pt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],v=l[9],S=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-S)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+S)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,_=(p+1)/2,x=(f+1)/2,b=(u+h)/4,T=(d+S)/4,g=(v+m)/4;return A>_&&A>x?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=b/n,r=T/n):_>x?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=b/s,r=g/s):x<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(x),n=T/r,s=g/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-v)*(m-v)+(d-S)*(d-S)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-v)/M,this.y=(d-S)/M,this.z=(h-u)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jr=class extends Fn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new un(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ns(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ft=class extends Jr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Is=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kr=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var At=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,u,d,h,p,v,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,h,p,v,S,m)}set(e,t,n,s,r,a,o,l,c,u,d,h,p,v,S,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=v,f[11]=S,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Bi.setFromMatrixColumn(e,0).length(),r=1/Bi.setFromMatrixColumn(e,1).length(),a=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,p=a*d,v=o*u,S=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+v*c,t[5]=h-S*c,t[9]=-o*l,t[2]=S-h*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,p=l*d,v=c*u,S=c*d;t[0]=h+S*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=S+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,p=l*d,v=c*u,S=c*d;t[0]=h-S*o,t[4]=-a*d,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=S-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,p=a*d,v=o*u,S=o*d;t[0]=l*u,t[4]=v*c-p,t[8]=h*c+S,t[1]=l*d,t[5]=S*c+h,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,p=a*c,v=o*l,S=o*c;t[0]=l*u,t[4]=S-h*d,t[8]=v*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+v,t[10]=h-S*d}else if(e.order==="XZY"){let h=a*l,p=a*c,v=o*l,S=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+S,t[5]=a*u,t[9]=p*d-v,t[2]=v*d-p,t[6]=o*u,t[10]=S*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fh,e,ph)}lookAt(e,t,n){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),ti.crossVectors(n,hn),ti.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),ti.crossVectors(n,hn)),ti.normalize(),gr.crossVectors(hn,ti),s[0]=ti.x,s[4]=gr.x,s[8]=hn.x,s[1]=ti.y,s[5]=gr.y,s[9]=hn.y,s[2]=ti.z,s[6]=gr.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],v=n[2],S=n[6],m=n[10],f=n[14],M=n[3],A=n[7],_=n[11],x=n[15],b=s[0],T=s[4],g=s[8],E=s[12],I=s[1],R=s[5],U=s[9],k=s[13],P=s[2],X=s[6],Z=s[10],H=s[14],ie=s[3],j=s[7],F=s[11],L=s[15];return r[0]=a*b+o*I+l*P+c*ie,r[4]=a*T+o*R+l*X+c*j,r[8]=a*g+o*U+l*Z+c*F,r[12]=a*E+o*k+l*H+c*L,r[1]=u*b+d*I+h*P+p*ie,r[5]=u*T+d*R+h*X+p*j,r[9]=u*g+d*U+h*Z+p*F,r[13]=u*E+d*k+h*H+p*L,r[2]=v*b+S*I+m*P+f*ie,r[6]=v*T+S*R+m*X+f*j,r[10]=v*g+S*U+m*Z+f*F,r[14]=v*E+S*k+m*H+f*L,r[3]=M*b+A*I+_*P+x*ie,r[7]=M*T+A*R+_*X+x*j,r[11]=M*g+A*U+_*Z+x*F,r[15]=M*E+A*k+_*H+x*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],v=e[3],S=e[7],m=e[11],f=e[15],M=l*p-c*h,A=o*p-c*d,_=o*h-l*d,x=a*p-c*u,b=a*h-l*u,T=a*d-o*u;return t*(S*M-m*A+f*_)-n*(v*M-m*x+f*b)+s*(v*A-S*x+f*T)-r*(v*_-S*b+m*T)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],v=e[12],S=e[13],m=e[14],f=e[15],M=t*o-n*a,A=t*l-s*a,_=t*c-r*a,x=n*l-s*o,b=n*c-r*o,T=s*c-r*l,g=u*S-d*v,E=u*m-h*v,I=u*f-p*v,R=d*m-h*S,U=d*f-p*S,k=h*f-p*m,P=M*k-A*U+_*R+x*I-b*E+T*g;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/P;return e[0]=(o*k-l*U+c*R)*X,e[1]=(s*U-n*k-r*R)*X,e[2]=(S*T-m*b+f*x)*X,e[3]=(h*b-d*T-p*x)*X,e[4]=(l*I-a*k-c*E)*X,e[5]=(t*k-s*I+r*E)*X,e[6]=(m*_-v*T-f*A)*X,e[7]=(u*T-h*_+p*A)*X,e[8]=(a*U-o*I+c*g)*X,e[9]=(n*I-t*U-r*g)*X,e[10]=(v*b-S*_+f*M)*X,e[11]=(d*_-u*b-p*M)*X,e[12]=(o*E-a*R-l*g)*X,e[13]=(t*R-n*E+s*g)*X,e[14]=(S*A-v*x-m*M)*X,e[15]=(u*x-d*A+h*M)*X,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,p=r*u,v=r*d,S=a*u,m=a*d,f=o*d,M=l*c,A=l*u,_=l*d,x=n.x,b=n.y,T=n.z;return s[0]=(1-(S+f))*x,s[1]=(p+_)*x,s[2]=(v-A)*x,s[3]=0,s[4]=(p-_)*b,s[5]=(1-(h+f))*b,s[6]=(m+M)*b,s[7]=0,s[8]=(v+A)*T,s[9]=(m-M)*T,s[10]=(1-(h+S))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Bi.set(s[0],s[1],s[2]).length(),o=Bi.set(s[4],s[5],s[6]).length(),l=Bi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Tn.copy(this);let c=1/a,u=1/o,d=1/l;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=d,Tn.elements[9]*=d,Tn.elements[10]*=d,t.setFromRotationMatrix(Tn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s),v,S;if(l)v=r/(a-r),S=a*r/(a-r);else if(o===Rn)v=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Cs)v=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s),v,S;if(l)v=1/(a-r),S=a/(a-r);else if(o===Rn)v=-2/(a-r),S=-(a+r)/(a-r);else if(o===Cs)v=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Bi=new W,Tn=new At,fh=new W(0,0,0),ph=new W(1,1,1),ti=new W,gr=new W,hn=new W,jl=new At,Ql=new On,kn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ql.setFromEuler(this),this.setFromQuaternion(Ql,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";var Ps=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mh=0,ec=new W,zi=new On,Hn=new At,vr=new W,_s=new W,gh=new W,vh=new On,tc=new W(1,0,0),nc=new W(0,1,0),ic=new W(0,0,1),sc={type:"added"},xh={type:"removed"},Vi={type:"childadded",child:null},To={type:"childremoved",child:null},mn=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new W,t=new kn,n=new On,s=new W(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new At},normalMatrix:{value:new et}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.multiply(zi),this}rotateOnWorldAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.premultiply(zi),this}rotateX(e){return this.rotateOnAxis(tc,e)}rotateY(e){return this.rotateOnAxis(nc,e)}rotateZ(e){return this.rotateOnAxis(ic,e)}translateOnAxis(e,t){return ec.copy(e).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tc,e)}translateY(e){return this.translateOnAxis(nc,e)}translateZ(e){return this.translateOnAxis(ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?vr.copy(e):vr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(_s,vr,this.up):Hn.lookAt(vr,_s,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),zi.setFromRotationMatrix(Hn),this.quaternion.premultiply(zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sc),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xh),To.child=e,this.dispatchEvent(To),To.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sc),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,e,gh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,vh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};mn.DEFAULT_UP=new W(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=class extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}},_h={type:"move"},is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let S of e.hand.values()){let m=t.getJointPose(S,n),f=this._getHandJoint(c,S);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_h)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},xr={h:0,s:0,l:0};function Eo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var tt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ct.workingColorSpace){if(e=hl(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Eo(a,r,e+1/3),this.g=Eo(a,r,e),this.b=Eo(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=fn){function n(r){r!==void 0&&parseFloat(r)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){let n=Qc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return ct.workingToColorSpace(Jt.copy(this),e),Math.round(ft(Jt.r*255,0,255))*65536+Math.round(ft(Jt.g*255,0,255))*256+Math.round(ft(Jt.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(Jt.copy(this),t);let n=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=fn){ct.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,n=Jt.g,s=Jt.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ni),this.setHSL(ni.h+e,ni.s+t,ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ni),e.getHSL(xr);let n=ws(ni.h,xr.h,t),s=ws(ni.s,xr.s,t),r=ws(ni.l,xr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new tt;tt.NAMES=Qc;var Ls=class extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new W,Gn=new W,Ao=new W,Wn=new W,Hi=new W,Gi=new W,rc=new W,Co=new W,Ro=new W,Io=new W,Po=new Pt,Lo=new Pt,Do=new Pt,ai=class i{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),Gn.subVectors(n,t),Ao.subVectors(e,t);let a=En.dot(En),o=En.dot(Gn),l=En.dot(Ao),c=Gn.dot(Gn),u=Gn.dot(Ao),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,p=(c*l-o*u)*h,v=(a*u-o*l)*h;return r.set(1-p-v,v,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Po.setScalar(0),Lo.setScalar(0),Do.setScalar(0),Po.fromBufferAttribute(e,t),Lo.fromBufferAttribute(e,n),Do.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Po,r.x),a.addScaledVector(Lo,r.y),a.addScaledVector(Do,r.z),a}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),Gn.subVectors(e,t),En.cross(Gn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),En.cross(Gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Hi.subVectors(s,n),Gi.subVectors(r,n),Co.subVectors(e,n);let l=Hi.dot(Co),c=Gi.dot(Co);if(l<=0&&c<=0)return t.copy(n);Ro.subVectors(e,s);let u=Hi.dot(Ro),d=Gi.dot(Ro);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Hi,a);Io.subVectors(e,r);let p=Hi.dot(Io),v=Gi.dot(Io);if(v>=0&&p<=v)return t.copy(r);let S=p*c-l*v;if(S<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Gi,o);let m=u*v-p*d;if(m<=0&&d-u>=0&&p-v>=0)return rc.subVectors(r,s),o=(d-u)/(d-u+(p-v)),t.copy(s).addScaledVector(rc,o);let f=1/(m+S+h);return a=S*f,o=h*f,t.copy(n).addScaledVector(Hi,a).addScaledVector(Gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},oi=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_r.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_r.copy(n.boundingBox)),_r.applyMatrix4(e.matrixWorld),this.union(_r)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ys),yr.subVectors(this.max,ys),Wi.subVectors(e.a,ys),Xi.subVectors(e.b,ys),$i.subVectors(e.c,ys),ii.subVectors(Xi,Wi),si.subVectors($i,Xi),Mi.subVectors(Wi,$i);let t=[0,-ii.z,ii.y,0,-si.z,si.y,0,-Mi.z,Mi.y,ii.z,0,-ii.x,si.z,0,-si.x,Mi.z,0,-Mi.x,-ii.y,ii.x,0,-si.y,si.x,0,-Mi.y,Mi.x,0];return!No(t,Wi,Xi,$i,yr)||(t=[1,0,0,0,1,0,0,0,1],!No(t,Wi,Xi,$i,yr))?!1:(br.crossVectors(ii,si),t=[br.x,br.y,br.z],No(t,Wi,Xi,$i,yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Xn=[new W,new W,new W,new W,new W,new W,new W,new W],An=new W,_r=new oi,Wi=new W,Xi=new W,$i=new W,ii=new W,si=new W,Mi=new W,ys=new W,yr=new W,br=new W,Si=new W;function No(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Si.fromArray(i,r);let o=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),l=e.dot(Si),c=t.dot(Si),u=n.dot(Si);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Nt=new W,Mr=new qe,yh=0,cn=class extends Fn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yc,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.applyMatrix3(e),this.setXY(t,Mr.x,Mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),s=sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ds=class extends cn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ns=class extends cn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ut=class extends cn{constructor(e,t,n){super(new Float32Array(e),t,n)}},bh=new oi,bs=new W,Uo=new W,Yn=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):bh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bs.subVectors(e,this.center);let t=bs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(bs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bs.copy(e.center).add(Uo)),this.expandByPoint(bs.copy(e.center).sub(Uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Mh=0,_n=new At,Fo=new mn,qi=new W,dn=new oi,Ms=new oi,Ht=new W,jt=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=us(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($u(e)?Ns:Ds)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Fo.lookAt(e),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ut(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(dn.min,Ms.min),dn.expandByPoint(Ht),Ht.addVectors(dn.max,Ms.max),dn.expandByPoint(Ht)):(dn.expandByPoint(Ms.min),dn.expandByPoint(Ms.max))}dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ht.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ht));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ht.fromBufferAttribute(o,c),l&&(qi.fromBufferAttribute(e,c),Ht.add(qi)),s=Math.max(s,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new cn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let g=0;g<n.count;g++)o[g]=new W,l[g]=new W;let c=new W,u=new W,d=new W,h=new qe,p=new qe,v=new qe,S=new W,m=new W;function f(g,E,I){c.fromBufferAttribute(n,g),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,I),h.fromBufferAttribute(r,g),p.fromBufferAttribute(r,E),v.fromBufferAttribute(r,I),u.sub(c),d.sub(c),p.sub(h),v.sub(h);let R=1/(p.x*v.y-v.x*p.y);isFinite(R)&&(S.copy(u).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(R),o[g].add(S),o[E].add(S),o[I].add(S),l[g].add(m),l[E].add(m),l[I].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let g=0,E=M.length;g<E;++g){let I=M[g],R=I.start,U=I.count;for(let k=R,P=R+U;k<P;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let A=new W,_=new W,x=new W,b=new W;function T(g){x.fromBufferAttribute(s,g),b.copy(x);let E=o[g];A.copy(E),A.sub(x.multiplyScalar(x.dot(E))).normalize(),_.crossVectors(b,E);let R=_.dot(l[g])<0?-1:1;a.setXYZW(g,A.x,A.y,A.z,R)}for(let g=0,E=M.length;g<E;++g){let I=M[g],R=I.start,U=I.count;for(let k=R,P=R+U;k<P;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new cn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new W,r=new W,a=new W,o=new W,l=new W,c=new W,u=new W,d=new W;if(e)for(let h=0,p=e.count;h<p;h+=3){let v=e.getX(h+0),S=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),p=0,v=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*u;for(let f=0;f<u;f++)h[v++]=c[p++]}return new cn(h,u,d)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Oo=new W,Sh=new W,wh=new et,Cn=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Oo.subVectors(n,t).cross(Sh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Oo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||wh.getNormalMatrix(e),s=this.coplanarPoint(Oo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Th=0,li=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=us(),this.name="",this.type="Material",this.blending=os,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ko,this.blendDst=jo,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kr,this.stencilZFail=kr,this.stencilZPass=kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){We(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Cn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new qe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var $n=new W,ko=new W,Sr=new W,wr=new W,Us=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ko.copy(e).add(t).multiplyScalar(.5),Sr.copy(t).sub(e).normalize(),wr.copy(this.origin).sub(ko);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Sr),o=wr.dot(this.direction),l=-wr.dot(Sr),c=wr.lengthSq(),u=Math.abs(1-a*a),d,h,p,v;if(u>0)if(d=a*l-o,h=a*o-l,v=r*u,d>=0)if(h>=-v)if(h<=v){let S=1/u;d*=S,h*=S,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ko).addScaledVector(Sr,h),p}intersectSphere(e,t){if(e.radius<0)return null;$n.subVectors(e.center,this.origin);let n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,v=t.x-a.x,S=t.y-a.y,m=t.z-a.z,f=n.x-a.x,M=n.y-a.y,A=n.z-a.z,_=Math.abs(l),x=Math.abs(c),b=Math.abs(u),T,g,E,I,R,U,k,P,X,Z,H,ie;if(_>=x&&_>=b?(E=l,U=d,X=v,ie=f,l>=0?(T=c,g=u,I=h,R=p,k=S,P=m,Z=M,H=A):(T=u,g=c,I=p,R=h,k=m,P=S,Z=A,H=M)):x>=b?(E=c,U=h,X=S,ie=M,c>=0?(T=u,g=l,I=p,R=d,k=m,P=v,Z=A,H=f):(T=l,g=u,I=d,R=p,k=v,P=m,Z=f,H=A)):(E=u,U=p,X=m,ie=A,u>=0?(T=l,g=c,I=d,R=h,k=v,P=S,Z=f,H=M):(T=c,g=l,I=h,R=d,k=S,P=v,Z=M,H=f)),E===0)return null;let j=T/E,F=g/E,L=1/E,ae=I-j*U,ne=R-F*U,Ae=k-j*X,G=P-F*X,ue=Z-j*ie,B=H-F*ie,J=ue*G-B*Ae,he=ae*B-ne*ue,Me=Ae*ne-G*ae;if(s){if(J<0||he<0||Me<0)return null}else if((J<0||he<0||Me<0)&&(J>0||he>0||Me>0))return null;let de=J+he+Me;if(de===0)return null;let He=L*(J*U+he*X+Me*ie);return(de>0?He<0:He>0)?null:this.at(He/de,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ai=class extends li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ac=new At,wi=new Us,Tr=new Yn,oc=new W,Er=new W,Ar=new W,Cr=new W,Bo=new W,Rr=new W,lc=new W,Ir=new W,Qt=class extends mn{constructor(e=new jt,t=new Ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Rr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(Bo.fromBufferAttribute(d,e),a?Rr.addScaledVector(Bo,u):Rr.addScaledVector(Bo.sub(t),u))}t.add(Rr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(r),wi.copy(e.ray).recast(e.near),!(Tr.containsPoint(wi.origin)===!1&&(wi.intersectSphere(Tr,oc)===null||wi.origin.distanceToSquared(oc)>(e.far-e.near)**2))&&(ac.copy(r).invert(),wi.copy(e.ray).applyMatrix4(ac),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,S=h.length;v<S;v++){let m=h[v],f=a[m.materialIndex],M=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,x=A;_<x;_+=3){let b=o.getX(_),T=o.getX(_+1),g=o.getX(_+2);s=Pr(this,f,e,n,c,u,d,b,T,g),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let v=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=v,f=S;m<f;m+=3){let M=o.getX(m),A=o.getX(m+1),_=o.getX(m+2);s=Pr(this,a,e,n,c,u,d,M,A,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,S=h.length;v<S;v++){let m=h[v],f=a[m.materialIndex],M=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,x=A;_<x;_+=3){let b=_,T=_+1,g=_+2;s=Pr(this,f,e,n,c,u,d,b,T,g),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let v=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=v,f=S;m<f;m+=3){let M=m,A=m+1,_=m+2;s=Pr(this,a,e,n,c,u,d,M,A,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Eh(i,e,t,n,s,r,a,o){let l;if(e.side===$t?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===fi,o),l===null)return null;Ir.copy(o),Ir.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ir);return c<t.near||c>t.far?null:{distance:c,point:Ir.clone(),object:i}}function Pr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Er),i.getVertexPosition(l,Ar),i.getVertexPosition(c,Cr);let u=Eh(i,e,t,n,Er,Ar,Cr,lc);if(u){let d=new W;ai.getBarycoord(lc,Er,Ar,Cr,d),s&&(u.uv=ai.getInterpolatedAttribute(s,o,l,c,d,new qe)),r&&(u.uv1=ai.getInterpolatedAttribute(r,o,l,c,d,new qe)),a&&(u.normal=ai.getInterpolatedAttribute(a,o,l,c,d,new W),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new W,materialIndex:0};ai.getNormal(Er,Ar,Cr,h.normal),u.face=h,u.barycoord=d}return u}var jr=class extends un{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Gt,u=Gt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ti=new Yn,Ah=new qe(.5,.5),Lr=new W,Fs=class{constructor(e=new Cn,t=new Cn,n=new Cn,s=new Cn,r=new Cn,a=new Cn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],p=r[7],v=r[8],S=r[9],m=r[10],f=r[11],M=r[12],A=r[13],_=r[14],x=r[15];if(s[0].setComponents(c-a,p-u,f-v,x-M).normalize(),s[1].setComponents(c+a,p+u,f+v,x+M).normalize(),s[2].setComponents(c+o,p+d,f+S,x+A).normalize(),s[3].setComponents(c-o,p-d,f-S,x-A).normalize(),n)s[4].setComponents(l,h,m,_).normalize(),s[5].setComponents(c-l,p-h,f-m,x-_).normalize();else if(s[4].setComponents(c-l,p-h,f-m,x-_).normalize(),t===Rn)s[5].setComponents(c+l,p+h,f+m,x+_).normalize();else if(t===Cs)s[5].setComponents(l,h,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){Ti.center.set(0,0,0);let t=Ah.distanceTo(e.center);return Ti.radius=.7071067811865476+t,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Lr.x=s.normal.x>0?e.max.x:e.min.x,Lr.y=s.normal.y>0?e.max.y:e.min.y,Lr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Qr=class extends li{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},cc=new At,Xo=new Us,Dr=new Yn,Nr=new W,Os=class extends mn{constructor(e=new jt,t=new Qr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(s),Dr.radius+=r,e.ray.intersectsSphere(Dr)===!1)return;cc.copy(s).invert(),Xo.copy(e.ray).applyMatrix4(cc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let v=h,S=p;v<S;v++){let m=c.getX(v);Nr.fromBufferAttribute(d,m),uc(Nr,m,l,s,e,t,this)}}else{let h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let v=h,S=p;v<S;v++)Nr.fromBufferAttribute(d,v),uc(Nr,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function uc(i,e,t,n,s,r,a){let o=Xo.distanceSqToPoint(i);if(o<t){let l=new W;Xo.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ks=class extends un{constructor(e=[],t=mi,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ci=class extends un{constructor(e,t,n=Pn,s,r,a,o=Gt,l=Gt,c,u=Un,d=1){if(u!==Un&&u!==vi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ns(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ea=class extends ci{constructor(e,t=Pn,n=mi,s,r,a=Gt,o=Gt,l,c=Un){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Bs=class extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ss=class i extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,p=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(d,2));function v(S,m,f,M,A,_,x,b,T,g,E){let I=_/T,R=x/g,U=_/2,k=x/2,P=b/2,X=T+1,Z=g+1,H=0,ie=0,j=new W;for(let F=0;F<Z;F++){let L=F*R-k;for(let ae=0;ae<X;ae++){let ne=ae*I-U;j[S]=ne*M,j[m]=L*A,j[f]=P,c.push(j.x,j.y,j.z),j[S]=0,j[m]=0,j[f]=b>0?1:-1,u.push(j.x,j.y,j.z),d.push(ae/T),d.push(1-F/g),H+=1}}for(let F=0;F<g;F++)for(let L=0;L<T;L++){let ae=h+L+X*F,ne=h+L+X*(F+1),Ae=h+(L+1)+X*(F+1),G=h+(L+1)+X*F;l.push(ae,ne,G),l.push(ne,Ae,G),ie+=6}o.addGroup(p,ie,E),p+=ie,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var zs=class i extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,p=[],v=[],S=[],m=[];for(let f=0;f<u;f++){let M=f*h-a;for(let A=0;A<c;A++){let _=A*d-r;v.push(_,-M,0),S.push(0,0,1),m.push(A/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let A=M+c*f,_=M+c*(f+1),x=M+1+c*(f+1),b=M+1+c*f;p.push(A,_,b),p.push(_,x,b)}this.setIndex(p),this.setAttribute("position",new Ut(v,3)),this.setAttribute("normal",new Ut(S,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Vs=class i extends jt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new W,h=new W,p=[],v=[],S=[],m=[];for(let f=0;f<=n;f++){let M=[],A=f/n,_=a+A*o,x=e*Math.cos(_),b=Math.sqrt(e*e-x*x),T=0;f===0&&a===0?T=.5/t:f===n&&l===Math.PI&&(T=-.5/t);for(let g=0;g<=t;g++){let E=g/t,I=s+E*r;d.x=-b*Math.cos(I),d.y=x,d.z=b*Math.sin(I),v.push(d.x,d.y,d.z),h.copy(d).normalize(),S.push(h.x,h.y,h.z),m.push(E+T,1-A),M.push(c++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){let A=u[f][M+1],_=u[f][M],x=u[f+1][M],b=u[f+1][M+1];(f!==0||a>0)&&p.push(A,_,b),(f!==n-1||l<Math.PI)&&p.push(_,x,b)}this.setIndex(p),this.setAttribute("position",new Ut(v,3)),this.setAttribute("normal",new Ut(S,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Li(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(hc(s))s.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(hc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function en(i){let e={};for(let t=0;t<i.length;t++){let n=Li(i[t]);for(let s in n)e[s]=n[s]}return e}function hc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ch(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function dl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}var Jn={clone:Li,merge:en},Rh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ih=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ct=class extends li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rh,this.fragmentShader=Ih,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Li(e.uniforms),this.uniformsGroups=Ch(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new tt().setHex(s.value);break;case"v2":this.uniforms[n].value=new qe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new W().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Pt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new et().fromArray(s.value);break;case"m4":this.uniforms[n].value=new At().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},rs=class extends Ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ta=class extends li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},na=class extends li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Yi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function zo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ui=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ia=class extends ui{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ho,endingEnd:Ho}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Go:r=e,o=2*t-n;break;case Wo:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Go:a=e,l=2*n-t;break;case Wo:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,v=(n-t)/(s-t),S=v*v,m=S*v,f=-h*m+2*h*S-h*v,M=(1+h)*m+(-1.5-2*h)*S+(-.5+h)*v+1,A=(-1-p)*m+(1.5+p)*S+.5*v,_=p*m-p*S;for(let x=0;x!==o;++x)r[x]=f*a[u+x]+M*a[c+x]+A*a[l+x]+_*a[d+x];return r}},sa=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},ra=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},aa=class extends ui{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let v=(n-t)/(s-t),S=1-v;for(let m=0;m!==o;++m)r[m]=a[c+m]*S+a[l+m]*v;return r}let h=o*2,p=e-1;for(let v=0;v!==o;++v){let S=a[c+v],m=a[l+v],f=p*h+v*2,M=d[f],A=d[f+1],_=e*h+v*2,x=u[_],b=u[_+1],T=Lh(n,t,M,x,s);r[v]=eu(T,S,A,b,m)}return r}};function eu(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Ph(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Lh(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=eu(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Ph(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var gn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Yi(t,this.TimeBufferType),this.values=Yi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Yi(e.times,Array),values:Yi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),zo(e.settings)&&(n.settings={inTangents:Yi(e.settings.inTangents,Array),outTangents:Yi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new aa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ts:t=this.InterpolantFactoryMethodDiscrete;break;case Yr:t=this.InterpolantFactoryMethodLinear;break;case Or:t=this.InterpolantFactoryMethodSmooth;break;case Vo:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return We("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ts;case this.InterpolantFactoryMethodLinear:return Yr;case this.InterpolantFactoryMethodSmooth:return Or;case this.InterpolantFactoryMethodBezier:return Vo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;zo(this.settings)&&(dc(this.settings.inTangents,e),dc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ye("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ye("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&qu(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ye("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Or,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,h=d-n,p=d+n;for(let v=0;v!==n;++v){let S=t[d+v];if(S!==t[h+v]||S!==t[p+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,h=a*n;for(let p=0;p!==n;++p)t[h+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,zo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function dc(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Yr;var hi=class extends gn{constructor(e,t,n){super(e,t,n)}};hi.prototype.ValueTypeName="bool";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=Ts;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var oa=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};oa.prototype.ValueTypeName="color";var la=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};la.prototype.ValueTypeName="number";var ca=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)On.slerpFlat(r,0,a,c-o,a,c,l);return r}},Hs=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ca(this.times,this.values,this.getValueSize(),e)}};Hs.prototype.ValueTypeName="quaternion";Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends gn{constructor(e,t,n){super(e,t,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Ts;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};ua.prototype.ValueTypeName="vector";var ha=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],v=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},tu=new ha,da=class{constructor(e){this.manager=e!==void 0?e:tu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};da.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ur=new W,Fr=new On,Dn=new W,Gs=class extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ur,Fr,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ur,Fr,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ur,Fr,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ur,Fr,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ri=new W,fc=new qe,pc=new qe,Kt=class extends Gs{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ts*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,fc,pc),t.subVectors(pc,fc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ss*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ci=class extends Gs{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Zi=-90,Ji=1,fa=class extends mn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Kt(Zi,Ji,e,t);s.layers=this.layers,this.add(s);let r=new Kt(Zi,Ji,e,t);r.layers=this.layers,this.add(r);let a=new Kt(Zi,Ji,e,t);a.layers=this.layers,this.add(a);let o=new Kt(Zi,Ji,e,t);o.layers=this.layers,this.add(o);let l=new Kt(Zi,Ji,e,t);l.layers=this.layers,this.add(l);let c=new Kt(Zi,Ji,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},pa=class extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ws=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Dh.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Dh(){this._document.hidden===!1&&this.reset()}var fl="\\[\\]\\.:\\/",Nh=new RegExp("["+fl+"]","g"),pl="[^"+fl+"]",Uh="[^"+fl.replace("\\.","")+"]",Fh=/((?:WC+[\/:])*)/.source.replace("WC",pl),Oh=/(WCOD+)?/.source.replace("WCOD",Uh),kh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pl),Bh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pl),zh=new RegExp("^"+Fh+Oh+kh+Bh+"$"),Vh=["material","materials","bones","map"],$o=class{constructor(e,t,n){let s=n||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Et=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Nh,"")}static parseTrackName(e){let t=zh.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Vh.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){We("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=$o;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var C0=new Float32Array(1);var qo=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};function ml(i,e,t,n){let s=Hh(n);switch(t){case rl:return i*e;case ol:return i*e/s.components*s.byteLength;case ba:return i*e/s.components*s.byteLength;case xi:return i*e*2/s.components*s.byteLength;case Ma:return i*e*2/s.components*s.byteLength;case al:return i*e*3/s.components*s.byteLength;case bn:return i*e*4/s.components*s.byteLength;case Sa:return i*e*4/s.components*s.byteLength;case er:case tr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ta:case Aa:return Math.max(i,16)*Math.max(e,8)/4;case wa:case Ea:return Math.max(i,8)*Math.max(e,8)/2;case Ca:case Ra:case Pa:case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ia:case sr:case Da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case za:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ya:case Za:case Ja:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ka:case ja:return Math.ceil(i/4)*Math.ceil(e/4)*8;case rr:case Qa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hh(i){switch(i){case vn:case tl:return{byteLength:1,components:1};case ls:case nl:case qt:return{byteLength:2,components:1};case _a:case ya:return{byteLength:2,components:4};case Pn:case xa:case Ln:return{byteLength:4,components:1};case il:case sl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Su(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Wh(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,v)=>p.start-v.start);let h=0;for(let p=1;p<d.length;p++){let v=d[h],S=d[p];S.start<=v.start+v.count+1?v.count=Math.max(v.count,S.start+S.count-v.start):(++h,d[h]=S)}d.length=h+1;for(let p=0,v=d.length;p<v;p++){let S=d[p];i.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Xh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$h=`#ifdef USE_ALPHAHASH
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
#endif`,qh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kh=`#ifdef USE_AOMAP
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
#endif`,jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qh=`#ifdef USE_BATCHING
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
#endif`,ed=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,id=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sd=`#ifdef USE_IRIDESCENCE
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
#endif`,rd=`#ifdef USE_BUMPMAP
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
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ud=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,pd=`#define PI 3.141592653589793
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
} // validated`,md=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gd=`vec3 transformedNormal = objectNormal;
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
#endif`,vd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Md=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sd=`#ifdef USE_ENVMAP
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
#endif`,wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Td=`#ifdef USE_ENVMAP
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
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ad=`#ifdef USE_ENVMAP
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
#endif`,Cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Id=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ld=`#ifdef USE_GRADIENTMAP
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
}`,Dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Od=`#ifdef USE_ENVMAP
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
#endif`,kd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hd=`PhysicalMaterial material;
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
#endif`,Gd=`uniform sampler2D dfgLUT;
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
}`,Wd=`
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
#endif`,Xd=`#if defined( RE_IndirectDiffuse )
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
#endif`,$d=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qd=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Yd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tf=`#if defined( USE_POINTS_UV )
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
#endif`,nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,af=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,of=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
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
#endif`,cf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mf=`#ifdef USE_NORMALMAP
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
#endif`,gf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_f=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ef=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Af=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,If=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pf=`float getShadowMask() {
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
}`,Lf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Df=`#ifdef USE_SKINNING
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
#endif`,Nf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uf=`#ifdef USE_SKINNING
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
#endif`,Ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Of=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zf=`#ifdef USE_TRANSMISSION
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
#endif`,Vf=`#ifdef USE_TRANSMISSION
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
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,$f=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qf=`uniform sampler2D t2D;
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
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`#include <common>
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
}`,Qf=`#if DEPTH_PACKING == 3200
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
}`,ep=`#define DISTANCE
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
}`,tp=`#define DISTANCE
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
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`uniform float scale;
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
}`,rp=`uniform vec3 diffuse;
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
}`,ap=`#include <common>
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
}`,op=`uniform vec3 diffuse;
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
}`,lp=`#define LAMBERT
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
}`,cp=`#define LAMBERT
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
}`,up=`#define MATCAP
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
}`,hp=`#define MATCAP
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
}`,dp=`#define NORMAL
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
}`,fp=`#define NORMAL
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
}`,pp=`#define PHONG
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
}`,mp=`#define PHONG
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
}`,gp=`#define STANDARD
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
}`,vp=`#define STANDARD
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
}`,xp=`#define TOON
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
}`,_p=`#define TOON
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
}`,yp=`uniform float size;
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
}`,bp=`uniform vec3 diffuse;
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
}`,Mp=`#include <common>
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
}`,Sp=`uniform vec3 color;
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
}`,wp=`uniform float rotation;
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
}`,Tp=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:Xh,alphahash_pars_fragment:$h,alphamap_fragment:qh,alphamap_pars_fragment:Yh,alphatest_fragment:Zh,alphatest_pars_fragment:Jh,aomap_fragment:Kh,aomap_pars_fragment:jh,batching_pars_vertex:Qh,batching_vertex:ed,begin_vertex:td,beginnormal_vertex:nd,bsdfs:id,iridescence_fragment:sd,bumpmap_pars_fragment:rd,clipping_planes_fragment:ad,clipping_planes_pars_fragment:od,clipping_planes_pars_vertex:ld,clipping_planes_vertex:cd,color_fragment:ud,color_pars_fragment:hd,color_pars_vertex:dd,color_vertex:fd,common:pd,cube_uv_reflection_fragment:md,defaultnormal_vertex:gd,displacementmap_pars_vertex:vd,displacementmap_vertex:xd,emissivemap_fragment:_d,emissivemap_pars_fragment:yd,colorspace_fragment:bd,colorspace_pars_fragment:Md,envmap_fragment:Sd,envmap_common_pars_fragment:wd,envmap_pars_fragment:Td,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Od,envmap_vertex:Ad,fog_vertex:Cd,fog_pars_vertex:Rd,fog_fragment:Id,fog_pars_fragment:Pd,gradientmap_pars_fragment:Ld,lightmap_pars_fragment:Dd,lights_lambert_fragment:Nd,lights_lambert_pars_fragment:Ud,lights_pars_begin:Fd,lights_toon_fragment:kd,lights_toon_pars_fragment:Bd,lights_phong_fragment:zd,lights_phong_pars_fragment:Vd,lights_physical_fragment:Hd,lights_physical_pars_fragment:Gd,lights_fragment_begin:Wd,lights_fragment_maps:Xd,lights_fragment_end:$d,lightprobes_pars_fragment:qd,logdepthbuf_fragment:Yd,logdepthbuf_pars_fragment:Zd,logdepthbuf_pars_vertex:Jd,logdepthbuf_vertex:Kd,map_fragment:jd,map_pars_fragment:Qd,map_particle_fragment:ef,map_particle_pars_fragment:tf,metalnessmap_fragment:nf,metalnessmap_pars_fragment:sf,morphinstance_vertex:rf,morphcolor_vertex:af,morphnormal_vertex:of,morphtarget_pars_vertex:lf,morphtarget_vertex:cf,normal_fragment_begin:uf,normal_fragment_maps:hf,normal_pars_fragment:df,normal_pars_vertex:ff,normal_vertex:pf,normalmap_pars_fragment:mf,clearcoat_normal_fragment_begin:gf,clearcoat_normal_fragment_maps:vf,clearcoat_pars_fragment:xf,iridescence_pars_fragment:_f,opaque_fragment:yf,packing:bf,premultiplied_alpha_fragment:Mf,project_vertex:Sf,dithering_fragment:wf,dithering_pars_fragment:Tf,roughnessmap_fragment:Ef,roughnessmap_pars_fragment:Af,shadowmap_pars_fragment:Cf,shadowmap_pars_vertex:Rf,shadowmap_vertex:If,shadowmask_pars_fragment:Pf,skinbase_vertex:Lf,skinning_pars_vertex:Df,skinning_vertex:Nf,skinnormal_vertex:Uf,specularmap_fragment:Ff,specularmap_pars_fragment:Of,tonemapping_fragment:kf,tonemapping_pars_fragment:Bf,transmission_fragment:zf,transmission_pars_fragment:Vf,uv_pars_fragment:Hf,uv_pars_vertex:Gf,uv_vertex:Wf,worldpos_vertex:Xf,background_vert:$f,background_frag:qf,backgroundCube_vert:Yf,backgroundCube_frag:Zf,cube_vert:Jf,cube_frag:Kf,depth_vert:jf,depth_frag:Qf,distance_vert:ep,distance_frag:tp,equirect_vert:np,equirect_frag:ip,linedashed_vert:sp,linedashed_frag:rp,meshbasic_vert:ap,meshbasic_frag:op,meshlambert_vert:lp,meshlambert_frag:cp,meshmatcap_vert:up,meshmatcap_frag:hp,meshnormal_vert:dp,meshnormal_frag:fp,meshphong_vert:pp,meshphong_frag:mp,meshphysical_vert:gp,meshphysical_frag:vp,meshtoon_vert:xp,meshtoon_frag:_p,points_vert:yp,points_frag:bp,shadow_vert:Mp,shadow_frag:Sp,sprite_vert:wp,sprite_frag:Tp},Ee={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Vn={basic:{uniforms:en([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:en([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:en([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:en([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:en([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:en([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:en([Ee.points,Ee.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:en([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:en([Ee.common,Ee.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:en([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:en([Ee.sprite,Ee.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:en([Ee.common,Ee.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:en([Ee.lights,Ee.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Vn.physical={uniforms:en([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var io={r:0,b:0,g:0},Ep=new At,wu=new et;wu.set(-1,0,0,0,1,0,0,0,1);function Ap(i,e,t,n,s,r){let a=new tt(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function p(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){let _=M.backgroundBlurriness>0;A=e.get(A,_)}return A}function v(M){let A=!1,_=p(M);_===null?m(a,o):_&&_.isColor&&(m(_,1),A=!0);let x=i.xr.getEnvironmentBlendMode();x==="additive"?t.buffers.color.setClear(0,0,0,1,r):x==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(M,A){let _=p(A);_&&(_.isCubeTexture||_.mapping===js)?(c===void 0&&(c=new Qt(new ss(1,1,1),new Ct({name:"BackgroundCubeMaterial",uniforms:Li(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ep.makeRotationFromEuler(A.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(wu),c.material.toneMapped=ct.getTransfer(_.colorSpace)!==vt,(u!==_||d!==_.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,h=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Qt(new zs(2,2),new Ct({name:"BackgroundMaterial",uniforms:Li(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=ct.getTransfer(_.colorSpace)!==vt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,h=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,A){M.getRGB(io,dl(i)),t.buffers.color.setClear(io.r,io.g,io.b,A,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,A=1){a.set(M),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:v,addToRenderList:S,dispose:f}}function Cp(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(R,U,k,P,X){let Z=!1,H=d(R,P,k,U);r!==H&&(r=H,c(r.object)),Z=p(R,P,k,X),Z&&v(R,P,k,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,_(R,U,k,P),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function d(R,U,k,P){let X=P.wireframe===!0,Z=n[U.id];Z===void 0&&(Z={},n[U.id]=Z);let H=R.isInstancedMesh===!0?R.id:0,ie=Z[H];ie===void 0&&(ie={},Z[H]=ie);let j=ie[k.id];j===void 0&&(j={},ie[k.id]=j);let F=j[X];return F===void 0&&(F=h(l()),j[X]=F),F}function h(R){let U=[],k=[],P=[];for(let X=0;X<t;X++)U[X]=0,k[X]=0,P[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:P,object:R,attributes:{},index:null}}function p(R,U,k,P){let X=r.attributes,Z=U.attributes,H=0,ie=k.getAttributes();for(let j in ie)if(ie[j].location>=0){let L=X[j],ae=Z[j];if(ae===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(ae=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(ae=R.instanceColor)),L===void 0||L.attribute!==ae||ae&&L.data!==ae.data)return!0;H++}return r.attributesNum!==H||r.index!==P}function v(R,U,k,P){let X={},Z=U.attributes,H=0,ie=k.getAttributes();for(let j in ie)if(ie[j].location>=0){let L=Z[j];L===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(L=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(L=R.instanceColor));let ae={};ae.attribute=L,L&&L.data&&(ae.data=L.data),X[j]=ae,H++}r.attributes=X,r.attributesNum=H,r.index=P}function S(){let R=r.newAttributes;for(let U=0,k=R.length;U<k;U++)R[U]=0}function m(R){f(R,0)}function f(R,U){let k=r.newAttributes,P=r.enabledAttributes,X=r.attributeDivisors;k[R]=1,P[R]===0&&(i.enableVertexAttribArray(R),P[R]=1),X[R]!==U&&(i.vertexAttribDivisor(R,U),X[R]=U)}function M(){let R=r.newAttributes,U=r.enabledAttributes;for(let k=0,P=U.length;k<P;k++)U[k]!==R[k]&&(i.disableVertexAttribArray(k),U[k]=0)}function A(R,U,k,P,X,Z,H){H===!0?i.vertexAttribIPointer(R,U,k,X,Z):i.vertexAttribPointer(R,U,k,P,X,Z)}function _(R,U,k,P){S();let X=P.attributes,Z=k.getAttributes(),H=U.defaultAttributeValues;for(let ie in Z){let j=Z[ie];if(j.location>=0){let F=X[ie];if(F===void 0&&(ie==="instanceMatrix"&&R.instanceMatrix&&(F=R.instanceMatrix),ie==="instanceColor"&&R.instanceColor&&(F=R.instanceColor)),F!==void 0){let L=F.normalized,ae=F.itemSize,ne=e.get(F);if(ne===void 0)continue;let Ae=ne.buffer,G=ne.type,ue=ne.bytesPerElement,B=G===i.INT||G===i.UNSIGNED_INT||F.gpuType===xa;if(F.isInterleavedBufferAttribute){let J=F.data,he=J.stride,Me=F.offset;if(J.isInstancedInterleavedBuffer){for(let de=0;de<j.locationSize;de++)f(j.location+de,J.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let de=0;de<j.locationSize;de++)m(j.location+de);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let de=0;de<j.locationSize;de++)A(j.location+de,ae/j.locationSize,G,L,he*ue,(Me+ae/j.locationSize*de)*ue,B)}else{if(F.isInstancedBufferAttribute){for(let J=0;J<j.locationSize;J++)f(j.location+J,F.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let J=0;J<j.locationSize;J++)m(j.location+J);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let J=0;J<j.locationSize;J++)A(j.location+J,ae/j.locationSize,G,L,ae*ue,ae/j.locationSize*J*ue,B)}}else if(H!==void 0){let L=H[ie];if(L!==void 0)switch(L.length){case 2:i.vertexAttrib2fv(j.location,L);break;case 3:i.vertexAttrib3fv(j.location,L);break;case 4:i.vertexAttrib4fv(j.location,L);break;default:i.vertexAttrib1fv(j.location,L)}}}}M()}function x(){E();for(let R in n){let U=n[R];for(let k in U){let P=U[k];for(let X in P){let Z=P[X];for(let H in Z)u(Z[H].object),delete Z[H];delete P[X]}}delete n[R]}}function b(R){if(n[R.id]===void 0)return;let U=n[R.id];for(let k in U){let P=U[k];for(let X in P){let Z=P[X];for(let H in Z)u(Z[H].object),delete Z[H];delete P[X]}}delete n[R.id]}function T(R){for(let U in n){let k=n[U];for(let P in k){let X=k[P];if(X[R.id]===void 0)continue;let Z=X[R.id];for(let H in Z)u(Z[H].object),delete Z[H];delete X[R.id]}}}function g(R){for(let U in n){let k=n[U],P=R.isInstancedMesh===!0?R.id:0,X=k[P];if(X!==void 0){for(let Z in X){let H=X[Z];for(let ie in H)u(H[ie].object),delete H[ie];delete X[Z]}delete k[P],Object.keys(k).length===0&&delete n[U]}}}function E(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:I,dispose:x,releaseStatesOfGeometry:b,releaseStatesOfObject:g,releaseStatesOfProgram:T,initAttributes:S,enableAttribute:m,disableUnusedAttributes:M}}function Rp(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ip(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==bn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let g=T===qt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==vn&&T!==Ln&&!g&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(We("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:v,maxTextureSize:S,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:_,maxSamples:x,samples:b}}function Pp(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Cn,o=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let v=d.clippingPlanes,S=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||v===null||v.length===0||r&&!m)r?u(null):c();else{let M=r?0:n,A=M*4,_=f.clippingState||null;l.value=_,_=u(v,h,A,p);for(let x=0;x!==A;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,v){let S=d!==null?d.length:0,m=null;if(S!==0){if(m=l.value,v!==!0||m===null){let f=p+S*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,_=p;A!==S;++A,_+=4)a.copy(d[A]).applyMatrix4(M,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}var ds=4,Lp=6,Dp=20,Np=256,ar=new Ci,nu=new tt,gl=null,vl=0,xl=0,_l=!1,Up=new W,Di=new W,ro=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Up}=r;gl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=su(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(gl,vl,xl),this._renderer.xr.enabled=_l,e.scissorTest=!1,hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mi||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:qt,format:bn,colorSpace:Es,depthBuffer:!1},s=iu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=iu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Fp(r)),this._blurMaterial=kp(r,e,t),this._ggxMaterial=Op(r,e,t)}return s}_compileMaterial(e){let t=new Qt(new jt,e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,n,s,r){let l=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(nu),d.toneMapping=In,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new ss,new Ai({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,m=S.material,f=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(nu),f=!0);for(let A=0;A<6;A++){let _=A%3;_===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):_===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));let x=this._cubeSize;hs(s,_*x,A>2?x:0,x,x),d.setRenderTarget(s),f&&d.render(S,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===mi||e.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ru()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=su());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;hs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ar)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:v}=this,S=this._sizeLods[n],m=3*S*(n>v-ds?n-v+ds:0),f=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=v-t,hs(r,m,f,3*S,2*S),s.setRenderTarget(r),s.render(o,ar),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-n,hs(e,m,f,3*S,2*S),s.setRenderTarget(e),s.render(o,ar)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-ds?s-this._lodMax+ds:0),h=4*(this._cubeSize-u);hs(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,ar)}};function Fp(i){let e=[],t=[],n=i,s=i-ds+1+Lp;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,v=new Float32Array(p*h*d),S=new Float32Array(p*h*d);for(let f=0;f<d;f++){let M=f%3*2/3-1,A=f>2?0:-1,_=[M,A,0,M+2/3,A,0,M+2/3,A+1,0,M,A,0,M+2/3,A+1,0,M,A+1,0];v.set(_,p*h*f);for(let x=0;x<h;x++){let b=u[x*2]*2-1,T=u[x*2+1]*2-1;f===0?Di.set(1,T,b):f===1?Di.set(-b,1,-T):f===2?Di.set(-b,T,1):f===3?Di.set(-1,T,-b):f===4?Di.set(-b,-1,T):Di.set(b,T,-1),Di.toArray(S,(f*h+x)*p)}}let m=new jt;m.setAttribute("position",new cn(v,p)),m.setAttribute("outputDirection",new cn(S,p)),t.push(new Qt(m,null)),n>ds&&n--}return{lodMeshes:t,sizeLods:e}}function iu(i,e,t){let n=new Ft(i,e,t);return n.texture.mapping=js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Op(i,e,t){return new Ct({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Np,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function kp(i,e,t){return new Ct({name:"SphericalGaussianBlur",defines:{SAMPLES:Dp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:lo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function su(){return new Ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function ru(){return new Ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function lo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ao=class extends Ft{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ks(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ss(5,5,5),r=new Ct({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:yn});r.uniforms.tEquirect.value=t;let a=new Qt(s,r),o=t.minFilter;return t.minFilter===gi&&(t.minFilter=Xt),new fa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Bp(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===ma||p===ga)if(e.has(h)){let v=e.get(h).texture;return o(v,h.mapping)}else{let v=h.image;if(v&&v.height>0){let S=new ao(v.height);return S.fromEquirectangularTexture(i,h),e.set(h,S),h.addEventListener("dispose",c),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,v=p===ma||p===ga,S=p===mi||p===Pi;if(v||S){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new ro(i)),m=v?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let M=h.image;return v&&M&&M.height>0||S&&M&&l(M)?(n===null&&(n=new ro(i)),m=v?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===ma?h.mapping=mi:p===ga&&(h.mapping=Pi),h}function l(h){let p=0,v=6;for(let S=0;S<v;S++)h[S]!==void 0&&p++;return p===v}function c(h){let p=h.target;p.removeEventListener("dispose",c);let v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function zp(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ei("WebGLRenderer: "+n+" extension not supported."),s}}}function Vp(i,e,t,n){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,v=d.attributes.position,S=0;if(v===void 0)return;if(p!==null){let M=p.array;S=p.version;for(let A=0,_=M.length;A<_;A+=3){let x=M[A+0],b=M[A+1],T=M[A+2];h.push(x,b,b,T,T,x)}}else{let M=v.array;S=v.version;for(let A=0,_=M.length/3-1;A<_;A+=3){let x=A+0,b=A+1,T=A+2;h.push(x,b,b,T,T,x)}}let m=new(v.count>=65535?Ns:Ds)(h,1);m.version=S;let f=r.get(d);f&&e.remove(f),r.set(d,m)}function u(d){let h=r.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Hp(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,r,d*a),t.update(h,n,1)}function c(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,d*a,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,p);let S=0;for(let m=0;m<p;m++)S+=h[m];t.update(S,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Gp(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Wp(i,e,t){let n=new WeakMap,s=new Pt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let E=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],A=0;p===!0&&(A=1),v===!0&&(A=2),S===!0&&(A=3);let _=o.attributes.position.count*A,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let b=new Float32Array(_*x*4*d),T=new Is(b,_,x,d);T.type=Ln,T.needsUpdate=!0;let g=A*4;for(let I=0;I<d;I++){let R=m[I],U=f[I],k=M[I],P=_*x*4*I;for(let X=0;X<R.count;X++){let Z=X*g;p===!0&&(s.fromBufferAttribute(R,X),b[P+Z+0]=s.x,b[P+Z+1]=s.y,b[P+Z+2]=s.z,b[P+Z+3]=0),v===!0&&(s.fromBufferAttribute(U,X),b[P+Z+4]=s.x,b[P+Z+5]=s.y,b[P+Z+6]=s.z,b[P+Z+7]=0),S===!0&&(s.fromBufferAttribute(k,X),b[P+Z+8]=s.x,b[P+Z+9]=s.y,b[P+Z+10]=s.z,b[P+Z+11]=k.itemSize===4?s.w:1)}}h={count:d,texture:T,size:new qe(_,x)},n.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let S=0;S<c.length;S++)p+=c[S];let v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Xp(i,e,t,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var $p={[$s]:"LINEAR_TONE_MAPPING",[qs]:"REINHARD_TONE_MAPPING",[Ys]:"CINEON_TONE_MAPPING",[Ii]:"ACES_FILMIC_TONE_MAPPING",[Js]:"AGX_TONE_MAPPING",[Ks]:"NEUTRAL_TONE_MAPPING",[Zs]:"CUSTOM_TONE_MAPPING"};function qp(i,e,t,n,s,r){let a=new Ft(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new jt;c.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ut([0,2,0,0,2,0],2));let u=new rs({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Qt(c,u),h=new Ci(-1,1,1,-1,0,1),p=null,v=null,S=!1,m,f=null,M=[],A=!1;this.setSize=function(_,x){a.setSize(_,x),o!==null&&o.setSize(_,x),l!==null&&l.setSize(_,x);for(let b=0;b<M.length;b++){let T=M[b];T.setSize&&T.setSize(_,x)}},this.setEffects=function(_){M=_,A=M.length>0&&M[0].isRenderPass===!0;let x=a.width,b=a.height;M.length>0&&o===null&&(o=new Ft(x,b,{type:qt,depthBuffer:!1,stencilBuffer:!1}),l=new Ft(x,b,{type:qt,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<M.length;T++){let g=M[T];g.setSize&&g.setSize(x,b)}},this.begin=function(_,x){if(S||_.toneMapping===In&&M.length===0)return!1;if(f=x,x!==null){let b=x.width,T=x.height;(a.width!==b||a.height!==T)&&this.setSize(b,T)}return A===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=In,!0},this.hasRenderPass=function(){return A},this.end=function(_,x){_.toneMapping=m,S=!0;let b=a,T=o;for(let g=0;g<M.length;g++){let E=M[g];E.enabled!==!1&&(E.render(_,T,b,x),E.needsSwap!==!1&&(b=T,T=T===o?l:o))}if(p!==_.outputColorSpace||v!==_.toneMapping){p=_.outputColorSpace,v=_.toneMapping,u.defines={},ct.getTransfer(p)===vt&&(u.defines.SRGB_TRANSFER="");let g=$p[v];g&&(u.defines[g]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,_.setRenderTarget(f),_.render(d,h),f=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Tu=new un,Ml=new ci(1,1),Eu=new Is,Au=new Kr,Cu=new ks,au=[],ou=[],lu=new Float32Array(16),cu=new Float32Array(9),uu=new Float32Array(4);function ps(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=au[s];if(r===void 0&&(r=new Float32Array(s),au[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function co(i,e){let t=ou[e];t===void 0&&(t=new Int32Array(e),ou[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Yp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Zp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function Jp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function Kp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function jp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;uu.set(n),i.uniformMatrix2fv(this.addr,!1,uu),Bt(t,n)}}function Qp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;cu.set(n),i.uniformMatrix3fv(this.addr,!1,cu),Bt(t,n)}}function em(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;lu.set(n),i.uniformMatrix4fv(this.addr,!1,lu),Bt(t,n)}}function tm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function nm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function im(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function sm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function rm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function am(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function om(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function lm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function cm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=t.isReversedDepthBuffer()?to:eo,r=Ml):r=Tu,t.setTexture2D(e||r,s)}function um(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Au,s)}function hm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Cu,s)}function dm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Eu,s)}function fm(i){switch(i){case 5126:return Yp;case 35664:return Zp;case 35665:return Jp;case 35666:return Kp;case 35674:return jp;case 35675:return Qp;case 35676:return em;case 5124:case 35670:return tm;case 35667:case 35671:return nm;case 35668:case 35672:return im;case 35669:case 35673:return sm;case 5125:return rm;case 36294:return am;case 36295:return om;case 36296:return lm;case 35678:case 36198:case 36298:case 36306:case 35682:return cm;case 35679:case 36299:case 36307:return um;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return dm}}function pm(i,e){i.uniform1fv(this.addr,e)}function mm(i,e){let t=ps(e,this.size,2);i.uniform2fv(this.addr,t)}function gm(i,e){let t=ps(e,this.size,3);i.uniform3fv(this.addr,t)}function vm(i,e){let t=ps(e,this.size,4);i.uniform4fv(this.addr,t)}function xm(i,e){let t=ps(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _m(i,e){let t=ps(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ym(i,e){let t=ps(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function bm(i,e){i.uniform1iv(this.addr,e)}function Mm(i,e){i.uniform2iv(this.addr,e)}function Sm(i,e){i.uniform3iv(this.addr,e)}function wm(i,e){i.uniform4iv(this.addr,e)}function Tm(i,e){i.uniform1uiv(this.addr,e)}function Em(i,e){i.uniform2uiv(this.addr,e)}function Am(i,e){i.uniform3uiv(this.addr,e)}function Cm(i,e){i.uniform4uiv(this.addr,e)}function Rm(i,e,t){let n=this.cache,s=e.length,r=co(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ml:a=Tu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Im(i,e,t){let n=this.cache,s=e.length,r=co(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Au,r[a])}function Pm(i,e,t){let n=this.cache,s=e.length,r=co(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cu,r[a])}function Lm(i,e,t){let n=this.cache,s=e.length,r=co(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Eu,r[a])}function Dm(i){switch(i){case 5126:return pm;case 35664:return mm;case 35665:return gm;case 35666:return vm;case 35674:return xm;case 35675:return _m;case 35676:return ym;case 5124:case 35670:return bm;case 35667:case 35671:return Mm;case 35668:case 35672:return Sm;case 35669:case 35673:return wm;case 5125:return Tm;case 36294:return Em;case 36295:return Am;case 36296:return Cm;case 35678:case 36198:case 36298:case 36306:case 35682:return Rm;case 35679:case 36299:case 36307:return Im;case 35680:case 36300:case 36308:case 36293:return Pm;case 36289:case 36303:case 36311:case 36292:return Lm}}var Sl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fm(t.type)}},wl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dm(t.type)}},Tl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},yl=/(\w+)(\])?(\[|\.)?/g;function hu(i,e){i.seq.push(e),i.map[e.id]=e}function Nm(i,e,t){let n=i.name,s=n.length;for(yl.lastIndex=0;;){let r=yl.exec(n),a=yl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){hu(t,c===void 0?new Sl(o,i,e):new wl(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Tl(o),hu(t,d)),t=d}}}var fs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Nm(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function du(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Um=37297,Fm=0;function Om(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var fu=new et;function km(i){ct._getMatrix(fu,ct.workingColorSpace,i);let e=`mat3( ${fu.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(i)){case As:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Om(i.getShaderSource(e),o)}else return r}function Bm(i,e){let t=km(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var zm={[$s]:"Linear",[qs]:"Reinhard",[Ys]:"Cineon",[Ii]:"ACESFilmic",[Js]:"AgX",[Ks]:"Neutral",[Zs]:"Custom"};function Vm(i,e){let t=zm[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var so=new W;function Hm(){ct.getLuminanceCoefficients(so);let i=so.x.toFixed(4),e=so.y.toFixed(4),t=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function Wm(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xm(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function lr(i){return i!==""}function mu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var $m=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(i){return i.replace($m,Ym)}var qm=new Map;function Ym(i,e){let t=rt[e];if(t===void 0){let n=qm.get(e);if(n!==void 0)t=rt[n],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return El(t)}var Zm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vu(i){return i.replace(Zm,Jm)}function Jm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Km={[Xs]:"SHADOWMAP_TYPE_PCF",[as]:"SHADOWMAP_TYPE_VSM"};function jm(i){return Km[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Qm={[mi]:"ENVMAP_TYPE_CUBE",[Pi]:"ENVMAP_TYPE_CUBE",[js]:"ENVMAP_TYPE_CUBE_UV"};function eg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Qm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var tg={[Pi]:"ENVMAP_MODE_REFRACTION"};function ng(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":tg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ig={[Qo]:"ENVMAP_BLENDING_MULTIPLY",[Fc]:"ENVMAP_BLENDING_MIX",[Oc]:"ENVMAP_BLENDING_ADD"};function sg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ig[i.combine]||"ENVMAP_BLENDING_NONE"}function rg(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ag(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=jm(t),c=eg(t),u=ng(t),d=sg(t),h=rg(t),p=Gm(t),v=Wm(r),S=s.createProgram(),m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(lr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(lr).join(`
`),f.length>0&&(f+=`
`)):(m=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),f=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?rt.tonemapping_pars_fragment:"",t.toneMapping!==In?Vm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,Bm("linearToOutputTexel",t.outputColorSpace),Hm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),a=El(a),a=mu(a,t),a=gu(a,t),o=El(o),o=mu(o,t),o=gu(o,t),a=vu(a),o=vu(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let A=M+m+a,_=M+f+o,x=du(s,s.VERTEX_SHADER,A),b=du(s,s.FRAGMENT_SHADER,_);s.attachShader(S,x),s.attachShader(S,b),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function T(R){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(S)||"",k=s.getShaderInfoLog(x)||"",P=s.getShaderInfoLog(b)||"",X=U.trim(),Z=k.trim(),H=P.trim(),ie=!0,j=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,x,b);else{let F=pu(s,x,"vertex"),L=pu(s,b,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+X+`
`+F+`
`+L)}else X!==""?We("WebGLProgram: Program Info Log:",X):(Z===""||H==="")&&(j=!1);j&&(R.diagnostics={runnable:ie,programLog:X,vertexShader:{log:Z,prefix:m},fragmentShader:{log:H,prefix:f}})}s.deleteShader(x),s.deleteShader(b),g=new fs(s,S),E=Xm(s,S)}let g;this.getUniforms=function(){return g===void 0&&T(this),g};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(S,Um)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fm++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=x,this.fragmentShader=b,this}var og=0,Al=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Cl(e),t.set(e,n)),n}},Cl=class{constructor(e){this.id=og++,this.code=e,this.usedTimes=0}};function lg(i){return i===xi||i===sr||i===rr}function cg(i,e,t,n,s,r){let a=new Ps,o=new Al,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(g){return l.add(g),g===0?"uv":`uv${g}`}function S(g,E,I,R,U,k){let P=R.fog,X=U.geometry,Z=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?R.environment:null,H=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,ie=e.get(g.envMap||Z,H),j=ie&&ie.mapping===js?ie.image.height:null,F=p[g.type];g.precision!==null&&(h=n.getMaxPrecision(g.precision),h!==g.precision&&We("WebGLProgram.getParameters:",g.precision,"not supported, using",h,"instead."));let L=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ae=L!==void 0?L.length:0,ne=0;X.morphAttributes.position!==void 0&&(ne=1),X.morphAttributes.normal!==void 0&&(ne=2),X.morphAttributes.color!==void 0&&(ne=3);let Ae,G,ue,B;if(F){let pt=Vn[F];Ae=pt.vertexShader,G=pt.fragmentShader}else{Ae=g.vertexShader,G=g.fragmentShader;let pt=o.getVertexShaderStage(g),gt=o.getFragmentShaderStage(g);o.update(g,pt,gt),ue=pt.id,B=gt.id}let J=i.getRenderTarget(),he=i.state.buffers.depth.getReversed(),Me=U.isInstancedMesh===!0,de=U.isBatchedMesh===!0,He=!!g.map,nt=!!g.matcap,Le=!!ie,Pe=!!g.aoMap,Ze=!!g.lightMap,Ge=!!g.bumpMap&&g.wireframe===!1,lt=!!g.normalMap,Rt=!!g.displacementMap,zt=!!g.emissiveMap,Tt=!!g.metalnessMap,_t=!!g.roughnessMap,O=g.anisotropy>0,Vt=g.clearcoat>0,mt=g.dispersion>0,C=g.retroreflectivity>0,y=g.iridescence>0,V=g.sheen>0,Y=g.transmission>0,te=O&&!!g.anisotropyMap,fe=Vt&&!!g.clearcoatMap,pe=Vt&&!!g.clearcoatNormalMap,ee=Vt&&!!g.clearcoatRoughnessMap,re=y&&!!g.iridescenceMap,me=y&&!!g.iridescenceThicknessMap,Oe=V&&!!g.sheenColorMap,ge=V&&!!g.sheenRoughnessMap,ye=!!g.specularMap,Be=!!g.specularColorMap,Ve=!!g.specularIntensityMap,Xe=Y&&!!g.transmissionMap,D=Y&&!!g.thicknessMap,be=!!g.gradientMap,se=!!g.alphaMap,ve=g.alphaTest>0,we=!!g.alphaHash,oe=!!g.extensions,ze=In;g.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ze=i.toneMapping);let Fe={shaderID:F,shaderType:g.type,shaderName:g.name,vertexShader:Ae,fragmentShader:G,defines:g.defines,customVertexShaderID:ue,customFragmentShaderID:B,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:h,batching:de,batchingColor:de&&U._colorsTexture!==null,instancing:Me,instancingColor:Me&&U.instanceColor!==null,instancingMorph:Me&&U.morphTexture!==null,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:He,matcap:nt,envMap:Le,envMapMode:Le&&ie.mapping,envMapCubeUVHeight:j,aoMap:Pe,lightMap:Ze,bumpMap:Ge,normalMap:lt,displacementMap:Rt,emissiveMap:zt,normalMapObjectSpace:lt&&g.normalMapType===zc,normalMapTangentSpace:lt&&g.normalMapType===ll,packedNormalMap:lt&&g.normalMapType===ll&&lg(g.normalMap.format),metalnessMap:Tt,roughnessMap:_t,anisotropy:O,anisotropyMap:te,clearcoat:Vt,clearcoatMap:fe,clearcoatNormalMap:pe,clearcoatRoughnessMap:ee,dispersion:mt,retroreflection:C,iridescence:y,iridescenceMap:re,iridescenceThicknessMap:me,sheen:V,sheenColorMap:Oe,sheenRoughnessMap:ge,specularMap:ye,specularColorMap:Be,specularIntensityMap:Ve,transmission:Y,transmissionMap:Xe,thicknessMap:D,gradientMap:be,opaque:g.transparent===!1&&g.blending===os&&g.alphaToCoverage===!1,alphaMap:se,alphaTest:ve,alphaHash:we,combine:g.combine,mapUv:He&&v(g.map.channel),aoMapUv:Pe&&v(g.aoMap.channel),lightMapUv:Ze&&v(g.lightMap.channel),bumpMapUv:Ge&&v(g.bumpMap.channel),normalMapUv:lt&&v(g.normalMap.channel),displacementMapUv:Rt&&v(g.displacementMap.channel),emissiveMapUv:zt&&v(g.emissiveMap.channel),metalnessMapUv:Tt&&v(g.metalnessMap.channel),roughnessMapUv:_t&&v(g.roughnessMap.channel),anisotropyMapUv:te&&v(g.anisotropyMap.channel),clearcoatMapUv:fe&&v(g.clearcoatMap.channel),clearcoatNormalMapUv:pe&&v(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&v(g.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&v(g.iridescenceMap.channel),iridescenceThicknessMapUv:me&&v(g.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&v(g.sheenColorMap.channel),sheenRoughnessMapUv:ge&&v(g.sheenRoughnessMap.channel),specularMapUv:ye&&v(g.specularMap.channel),specularColorMapUv:Be&&v(g.specularColorMap.channel),specularIntensityMapUv:Ve&&v(g.specularIntensityMap.channel),transmissionMapUv:Xe&&v(g.transmissionMap.channel),thicknessMapUv:D&&v(g.thicknessMap.channel),alphaMapUv:se&&v(g.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(lt||O),vertexNormals:!!X.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!X.attributes.uv&&(He||se),fog:!!P,useFog:g.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||X.attributes.normal===void 0&&lt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:he,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ne,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:He&&g.map.isVideoTexture===!0&&ct.getTransfer(g.map.colorSpace)===vt,decodeVideoTextureEmissive:zt&&g.emissiveMap.isVideoTexture===!0&&ct.getTransfer(g.emissiveMap.colorSpace)===vt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Bn,flipSided:g.side===$t,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:oe&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&g.extensions.multiDraw===!0||de)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function m(g){let E=[];if(g.shaderID?E.push(g.shaderID):(E.push(g.customVertexShaderID),E.push(g.customFragmentShaderID)),g.defines!==void 0)for(let I in g.defines)E.push(I),E.push(g.defines[I]);return g.isRawShaderMaterial===!1&&(f(E,g),M(E,g),E.push(i.outputColorSpace)),E.push(g.customProgramCacheKey),E.join()}function f(g,E){g.push(E.precision),g.push(E.outputColorSpace),g.push(E.envMapMode),g.push(E.envMapCubeUVHeight),g.push(E.mapUv),g.push(E.alphaMapUv),g.push(E.lightMapUv),g.push(E.aoMapUv),g.push(E.bumpMapUv),g.push(E.normalMapUv),g.push(E.displacementMapUv),g.push(E.emissiveMapUv),g.push(E.metalnessMapUv),g.push(E.roughnessMapUv),g.push(E.anisotropyMapUv),g.push(E.clearcoatMapUv),g.push(E.clearcoatNormalMapUv),g.push(E.clearcoatRoughnessMapUv),g.push(E.iridescenceMapUv),g.push(E.iridescenceThicknessMapUv),g.push(E.sheenColorMapUv),g.push(E.sheenRoughnessMapUv),g.push(E.specularMapUv),g.push(E.specularColorMapUv),g.push(E.specularIntensityMapUv),g.push(E.transmissionMapUv),g.push(E.thicknessMapUv),g.push(E.combine),g.push(E.fogExp2),g.push(E.sizeAttenuation),g.push(E.morphTargetsCount),g.push(E.morphAttributeCount),g.push(E.numSunLights),g.push(E.numDirLights),g.push(E.numPointLights),g.push(E.numSpotLights),g.push(E.numSpotLightMaps),g.push(E.numHemiLights),g.push(E.numRectAreaLights),g.push(E.numSunLightShadows),g.push(E.numDirLightShadows),g.push(E.numPointLightShadows),g.push(E.numSpotLightShadows),g.push(E.numSpotLightShadowsWithMaps),g.push(E.numLightProbes),g.push(E.shadowMapType),g.push(E.toneMapping),g.push(E.numClippingPlanes),g.push(E.numClipIntersection),g.push(E.depthPacking)}function M(g,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function A(g){let E=p[g.type],I;if(E){let R=Vn[E];I=Jn.clone(R.uniforms)}else I=g.uniforms;return I}function _(g,E){let I=u.get(E);return I!==void 0?++I.usedTimes:(I=new ag(i,E,g,s),c.push(I),u.set(E,I)),I}function x(g){if(--g.usedTimes===0){let E=c.indexOf(g);c[E]=c[c.length-1],c.pop(),u.delete(g.cacheKey),g.destroy()}}function b(g){o.remove(g)}function T(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:A,acquireProgram:_,releaseProgram:x,releaseShaderCache:b,programs:c,dispose:T}}function ug(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function hg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function _u(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function yu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,v,S,m,f){let M=i[e];return M===void 0?(M={id:h.id,object:h,geometry:p,material:v,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:m,group:f},i[e]=M):(M.id=h.id,M.object=h,M.geometry=p,M.material=v,M.materialVariant=a(h),M.groupOrder=S,M.renderOrder=h.renderOrder,M.z=m,M.group=f),e++,M}function l(h,p,v,S,m,f,M){M.reversedDepth===!0&&(m=-m);let A=o(h,p,v,S,m,f);v.transmission>0?n.push(A):v.transparent===!0?s.push(A):t.push(A)}function c(h,p,v,S,m,f){let M=o(h,p,v,S,m,f);v.transmission>0?n.unshift(M):v.transparent===!0?s.unshift(M):t.unshift(M)}function u(h,p){t.length>1&&t.sort(h||hg),n.length>1&&n.sort(p||_u),s.length>1&&s.sort(p||_u)}function d(){for(let h=e,p=i.length;h<p;h++){let v=i[h];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function dg(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new yu,i.set(n,[a])):s>=r.length?(a=new yu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function fg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new tt};break;case"SpotLight":t={position:new W,direction:new W,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function pg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var mg=0;function gg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vg(i){let e=new fg,t=pg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new W);let s=new W,r=new At,a=new At;function o(c){let u=0,d=0,h=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let p=0,v=0,S=0,m=0,f=0,M=0,A=0,_=0,x=0,b=0,T=0,g=0,E=0,I=0;c.sort(gg);for(let U=0,k=c.length;U<k;U++){let P=c[U],X=P.color,Z=P.intensity,H=P.distance,ie=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===xi?ie=P.shadow.map.texture:ie=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=X.r*Z,d+=X.g*Z,h+=X.b*Z;else if(P.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(P.sh.coefficients[j],Z);I++}else if(P.isSunLight){let j=e.get(P);if(j.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let F=P.shadow,L=t.get(P);L.shadowIntensity=F.intensity,L.shadowBias=F.bias,L.shadowNormalBias=F.normalBias,L.shadowRadius=F.radius,L.shadowMapSize.copy(F.mapSize).multiply(F.getFrameExtents()),n.sunShadow[v]=L,n.sunShadowMap[v]=ie;let ae=F.getViewportCount();for(let ne=0;ne<ae;ne++)n.sunShadowMatrix[S+ne]=F.getMatrix(ne),n.sunShadowCascade[S+ne]=F._cascadeData[ne];S+=ae,v++}n.sun[p]=j,p++}else if(P.isDirectionalLight){let j=e.get(P);if(j.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let F=P.shadow,L=t.get(P);L.shadowIntensity=F.intensity,L.shadowBias=F.bias,L.shadowNormalBias=F.normalBias,L.shadowRadius=F.radius,L.shadowMapSize=F.mapSize,n.directionalShadow[m]=L,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=P.shadow.matrix,x++}n.directional[m]=j,m++}else if(P.isSpotLight){let j=e.get(P);j.position.setFromMatrixPosition(P.matrixWorld),j.color.copy(X).multiplyScalar(Z),j.distance=H,j.coneCos=Math.cos(P.angle),j.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),j.decay=P.decay,n.spot[M]=j;let F=P.shadow;if(P.map&&(n.spotLightMap[g]=P.map,g++,F.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[M]=F.matrix,P.castShadow){let L=t.get(P);L.shadowIntensity=F.intensity,L.shadowBias=F.bias,L.shadowNormalBias=F.normalBias,L.shadowRadius=F.radius,L.shadowMapSize=F.mapSize,n.spotShadow[M]=L,n.spotShadowMap[M]=ie,T++}M++}else if(P.isRectAreaLight){let j=e.get(P);j.color.copy(X).multiplyScalar(Z),j.halfWidth.set(P.width*.5,0,0),j.halfHeight.set(0,P.height*.5,0),n.rectArea[A]=j,A++}else if(P.isPointLight){let j=e.get(P);if(j.color.copy(P.color).multiplyScalar(P.intensity),j.distance=P.distance,j.decay=P.decay,P.castShadow){let F=P.shadow,L=t.get(P);L.shadowIntensity=F.intensity,L.shadowBias=F.bias,L.shadowNormalBias=F.normalBias,L.shadowRadius=F.radius,L.shadowMapSize=F.mapSize,L.shadowCameraNear=F.camera.near,L.shadowCameraFar=F.camera.far,n.pointShadow[f]=L,n.pointShadowMap[f]=ie,n.pointShadowMatrix[f]=P.shadow.matrix,b++}n.point[f]=j,f++}else if(P.isHemisphereLight){let j=e.get(P);j.skyColor.copy(P.color).multiplyScalar(Z),j.groundColor.copy(P.groundColor).multiplyScalar(Z),n.hemi[_]=j,_++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let R=n.hash;(R.sunLength!==p||R.directionalLength!==m||R.pointLength!==f||R.spotLength!==M||R.rectAreaLength!==A||R.hemiLength!==_||R.numSunShadows!==v||R.numDirectionalShadows!==x||R.numPointShadows!==b||R.numSpotShadows!==T||R.numSpotMaps!==g||R.numLightProbes!==I)&&(n.sun.length=p,n.directional.length=m,n.spot.length=M,n.rectArea.length=A,n.point.length=f,n.hemi.length=_,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.directionalShadowMatrix.length=x,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+g-E,n.spotLightMap.length=g,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=I,R.sunLength=p,R.directionalLength=m,R.pointLength=f,R.spotLength=M,R.rectAreaLength=A,R.hemiLength=_,R.numSunShadows=v,R.numDirectionalShadows=x,R.numPointShadows=b,R.numSpotShadows=T,R.numSpotMaps=g,R.numLightProbes=I,n.version=mg++)}function l(c,u){let d=0,h=0,p=0,v=0,S=0,m=0,f=u.matrixWorldInverse;for(let M=0,A=c.length;M<A;M++){let _=c[M];if(_.isSunLight){let x=n.sun[d];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(f),d++}else if(_.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),h++}else if(_.isSpotLight){let x=n.spot[v];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),v++}else if(_.isRectAreaLight){let x=n.rectArea[S];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(f),a.identity(),r.copy(_.matrixWorld),r.premultiply(f),a.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),S++}else if(_.isPointLight){let x=n.point[p];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let x=n.hemi[m];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:n}}function bu(i){let e=new vg(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function xg(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new bu(i),e.set(s,[o])):r>=a.length?(o=new bu(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var _g=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yg=`uniform sampler2D shadow_pass;
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
}`,bg=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Mg=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Mu=new At,or=new W,bl=new W;function Sg(i,e,t){let n=new Fs,s=new qe,r=new qe,a=new Pt,o=new ta,l=new na,c={},u=t.maxTextureSize,d={[fi]:$t,[$t]:fi,[Bn]:Bn},h=new Ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:_g,fragmentShader:yg}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let v=new jt;v.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new Qt(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xs;let f=this.type;this.render=function(b,T,g){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===vc&&(We("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xs);let E=i.getRenderTarget(),I=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),U=i.state;U.setBlending(yn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let k=f!==this.type;k&&T.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(X=>X.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,X=b.length;P<X;P++){let Z=b[P],H=Z.shadow;if(H===void 0){We("WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ie=H.getFrameExtents();s.multiply(ie),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,H.mapSize.y=r.y));let j=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=j,H.map===null||k===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===as){if(Z.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Ft(s.x,s.y,{format:xi,type:qt,minFilter:Xt,magFilter:Xt,generateMipmaps:!1}),H.map.texture.name=Z.name+".shadowMap",H.map.depthTexture=new ci(s.x,s.y,Ln),H.map.depthTexture.name=Z.name+".shadowMapDepth",H.map.depthTexture.format=Un,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Gt,H.map.depthTexture.magFilter=Gt}else Z.isPointLight?(H.map=new ao(s.x),H.map.depthTexture=new ea(s.x,Pn)):(H.map=new Ft(s.x,s.y),H.map.depthTexture=new ci(s.x,s.y,Pn)),H.map.depthTexture.name=Z.name+".shadowMap",H.map.depthTexture.format=Un,this.type===Xs?(H.map.depthTexture.compareFunction=j?to:eo,H.map.depthTexture.minFilter=Xt,H.map.depthTexture.magFilter=Xt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Gt,H.map.depthTexture.magFilter=Gt);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);let F=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();Z.isPointLight!==!0&&H.updateMatrices(Z,g);for(let L=0;L<F;L++){let ae=H.getCamera(L);if(Z.isPointLight){let ne=H.camera,Ae=H.matrix,G=Z.distance||ne.far;G!==ne.far&&(ne.far=G,ne.updateProjectionMatrix()),or.setFromMatrixPosition(Z.matrixWorld),ne.position.copy(or),bl.copy(ne.position),bl.add(bg[L]),ne.up.copy(Mg[L]),ne.lookAt(bl),ne.updateMatrixWorld(),Ae.makeTranslation(-or.x,-or.y,-or.z),Mu.multiplyMatrices(ne.projectionMatrix,ne.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Mu,ne.coordinateSystem,ne.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,L),i.clear();else{L===0&&(i.setRenderTarget(H.map),i.clear());let ne=H.getViewport(L);a.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),U.viewport(a)}n=H.getFrustum(L),_(T,g,ae,Z,this.type)}H.isPointLightShadow!==!0&&this.type===as&&M(H,g),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,I,R)};function M(b,T){let g=e.update(S);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new Ft(s.x,s.y,{format:xi,type:qt}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(T,null,g,h,S,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(T,null,g,p,S,null)}function A(b,T,g,E){let I=null,R=g.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)I=R;else if(I=g.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let U=I.uuid,k=T.uuid,P=c[U];P===void 0&&(P={},c[U]=P);let X=P[k];X===void 0&&(X=I.clone(),P[k]=X,T.addEventListener("dispose",x)),I=X}if(I.visible=T.visible,I.wireframe=T.wireframe,E===as?I.side=T.shadowSide!==null?T.shadowSide:T.side:I.side=T.shadowSide!==null?T.shadowSide:d[T.side],I.alphaMap=T.alphaMap,I.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,I.map=T.map,I.clipShadows=T.clipShadows,I.clippingPlanes=T.clippingPlanes,I.clipIntersection=T.clipIntersection,I.displacementMap=T.displacementMap,I.displacementScale=T.displacementScale,I.displacementBias=T.displacementBias,I.wireframeLinewidth=T.wireframeLinewidth,I.linewidth=T.linewidth,g.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let U=i.properties.get(I);U.light=g}return I}function _(b,T,g,E,I){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===as)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,b.matrixWorld);let k=e.update(b),P=b.material;if(Array.isArray(P)){let X=k.groups;for(let Z=0,H=X.length;Z<H;Z++){let ie=X[Z],j=P[ie.materialIndex];if(j&&j.visible){let F=A(b,j,E,I);b.onBeforeShadow(i,b,T,g,k,F,ie),i.renderBufferDirect(g,null,k,F,b,ie),b.onAfterShadow(i,b,T,g,k,F,ie)}}}else if(P.visible){let X=A(b,P,E,I);b.onBeforeShadow(i,b,T,g,k,X,null),i.renderBufferDirect(g,null,k,X,b,null),b.onAfterShadow(i,b,T,g,k,X,null)}}let U=b.children;for(let k=0,P=U.length;k<P;k++)_(U[k],T,g,E,I)}function x(b){b.target.removeEventListener("dispose",x);for(let g in c){let E=c[g],I=b.target.uuid;I in E&&(E[I].dispose(),delete E[I])}}}function wg(i,e){function t(){let D=!1,be=new Pt,se=null,ve=new Pt(0,0,0,0);return{setMask:function(we){se!==we&&!D&&(i.colorMask(we,we,we,we),se=we)},setLocked:function(we){D=we},setClear:function(we,oe,ze,Fe,pt){pt===!0&&(we*=Fe,oe*=Fe,ze*=Fe),be.set(we,oe,ze,Fe),ve.equals(be)===!1&&(i.clearColor(we,oe,ze,Fe),ve.copy(be))},reset:function(){D=!1,se=null,ve.set(-1,0,0,0)}}}function n(){let D=!1,be=!1,se=null,ve=null,we=null;return{setReversed:function(oe){if(be!==oe){let ze=e.get("EXT_clip_control");oe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),be=oe;let Fe=we;we=null,this.setClear(Fe)}},getReversed:function(){return be},setTest:function(oe){oe?J(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(oe){se!==oe&&!D&&(i.depthMask(oe),se=oe)},setFunc:function(oe){if(be&&(oe=jc[oe]),ve!==oe){switch(oe){case Br:i.depthFunc(i.NEVER);break;case zr:i.depthFunc(i.ALWAYS);break;case Vr:i.depthFunc(i.LESS);break;case Qi:i.depthFunc(i.LEQUAL);break;case Hr:i.depthFunc(i.EQUAL);break;case Gr:i.depthFunc(i.GEQUAL);break;case Wr:i.depthFunc(i.GREATER);break;case Xr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=oe}},setLocked:function(oe){D=oe},setClear:function(oe){we!==oe&&(we=oe,be&&(oe=1-oe),i.clearDepth(oe))},reset:function(){D=!1,se=null,ve=null,we=null,be=!1}}}function s(){let D=!1,be=null,se=null,ve=null,we=null,oe=null,ze=null,Fe=null,pt=null;return{setTest:function(gt){D||(gt?J(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(gt){be!==gt&&!D&&(i.stencilMask(gt),be=gt)},setFunc:function(gt,tn,on){(se!==gt||ve!==tn||we!==on)&&(i.stencilFunc(gt,tn,on),se=gt,ve=tn,we=on)},setOp:function(gt,tn,on){(oe!==gt||ze!==tn||Fe!==on)&&(i.stencilOp(gt,tn,on),oe=gt,ze=tn,Fe=on)},setLocked:function(gt){D=gt},setClear:function(gt){pt!==gt&&(i.clearStencil(gt),pt=gt)},reset:function(){D=!1,be=null,se=null,ve=null,we=null,oe=null,ze=null,Fe=null,pt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},p=new WeakMap,v=[],S=null,m=!1,f=null,M=null,A=null,_=null,x=null,b=null,T=null,g=new tt(0,0,0),E=0,I=!1,R=null,U=null,k=null,P=null,X=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,ie=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(j)[1]),H=ie>=1):j.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),H=ie>=2);let F=null,L={},ae=i.getParameter(i.SCISSOR_BOX),ne=i.getParameter(i.VIEWPORT),Ae=new Pt().fromArray(ae),G=new Pt().fromArray(ne);function ue(D,be,se,ve){let we=new Uint8Array(4),oe=i.createTexture();i.bindTexture(D,oe),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<se;ze++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(be,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,we):i.texImage2D(be+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,we);return oe}let B={};B[i.TEXTURE_2D]=ue(i.TEXTURE_2D,i.TEXTURE_2D,1),B[i.TEXTURE_CUBE_MAP]=ue(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[i.TEXTURE_2D_ARRAY]=ue(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),B[i.TEXTURE_3D]=ue(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(Qi),Ge(!1),lt(Yo),J(i.CULL_FACE),Pe(yn);function J(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function he(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Me(D,be){return h[D]!==be?(i.bindFramebuffer(D,be),h[D]=be,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=be),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=be),!0):!1}function de(D,be){let se=v,ve=!1;if(D){se=p.get(be),se===void 0&&(se=[],p.set(be,se));let we=D.textures;if(se.length!==we.length||se[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,ze=we.length;oe<ze;oe++)se[oe]=i.COLOR_ATTACHMENT0+oe;se.length=we.length,ve=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,ve=!0);ve&&i.drawBuffers(se)}function He(D){return S!==D?(i.useProgram(D),S=D,!0):!1}let nt={[Ri]:i.FUNC_ADD,[_c]:i.FUNC_SUBTRACT,[yc]:i.FUNC_REVERSE_SUBTRACT};nt[bc]=i.MIN,nt[Mc]=i.MAX;let Le={[Sc]:i.ZERO,[wc]:i.ONE,[Tc]:i.SRC_COLOR,[Ko]:i.SRC_ALPHA,[Pc]:i.SRC_ALPHA_SATURATE,[Rc]:i.DST_COLOR,[Ac]:i.DST_ALPHA,[Ec]:i.ONE_MINUS_SRC_COLOR,[jo]:i.ONE_MINUS_SRC_ALPHA,[Ic]:i.ONE_MINUS_DST_COLOR,[Cc]:i.ONE_MINUS_DST_ALPHA,[Lc]:i.CONSTANT_COLOR,[Dc]:i.ONE_MINUS_CONSTANT_COLOR,[Nc]:i.CONSTANT_ALPHA,[Uc]:i.ONE_MINUS_CONSTANT_ALPHA};function Pe(D,be,se,ve,we,oe,ze,Fe,pt,gt){if(D===yn){m===!0&&(he(i.BLEND),m=!1);return}if(m===!1&&(J(i.BLEND),m=!0),D!==xc){if(D!==f||gt!==I){if((M!==Ri||x!==Ri)&&(i.blendEquation(i.FUNC_ADD),M=Ri,x=Ri),gt)switch(D){case os:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pi:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",D);break}else switch(D){case os:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",D);break}A=null,_=null,b=null,T=null,g.set(0,0,0),E=0,f=D,I=gt}return}we=we||be,oe=oe||se,ze=ze||ve,(be!==M||we!==x)&&(i.blendEquationSeparate(nt[be],nt[we]),M=be,x=we),(se!==A||ve!==_||oe!==b||ze!==T)&&(i.blendFuncSeparate(Le[se],Le[ve],Le[oe],Le[ze]),A=se,_=ve,b=oe,T=ze),(Fe.equals(g)===!1||pt!==E)&&(i.blendColor(Fe.r,Fe.g,Fe.b,pt),g.copy(Fe),E=pt),f=D,I=!1}function Ze(D,be){D.side===Bn?he(i.CULL_FACE):J(i.CULL_FACE);let se=D.side===$t;be&&(se=!se),Ge(se),D.blending===os&&D.transparent===!1?Pe(yn):Pe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ve=D.stencilWrite;o.setTest(ve),ve&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),zt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(D){R!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),R=D)}function lt(D){D!==mc?(J(i.CULL_FACE),D!==U&&(D===Yo?i.cullFace(i.BACK):D===gc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),U=D}function Rt(D){D!==k&&(H&&i.lineWidth(D),k=D)}function zt(D,be,se){D?(J(i.POLYGON_OFFSET_FILL),(P!==be||X!==se)&&(P=be,X=se,a.getReversed()&&(be=-be),i.polygonOffset(be,se))):he(i.POLYGON_OFFSET_FILL)}function Tt(D){D?J(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function _t(D){D===void 0&&(D=i.TEXTURE0+Z-1),F!==D&&(i.activeTexture(D),F=D)}function O(D,be,se){se===void 0&&(F===null?se=i.TEXTURE0+Z-1:se=F);let ve=L[se];ve===void 0&&(ve={type:void 0,texture:void 0},L[se]=ve),(ve.type!==D||ve.texture!==be)&&(F!==se&&(i.activeTexture(se),F=se),i.bindTexture(D,be||B[D]),ve.type=D,ve.texture=be)}function Vt(){let D=L[F];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function mt(){try{i.compressedTexImage2D(...arguments)}catch(D){Ye("WebGLState:",D)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(D){Ye("WebGLState:",D)}}function y(){try{i.texSubImage2D(...arguments)}catch(D){Ye("WebGLState:",D)}}function V(){try{i.texSubImage3D(...arguments)}catch(D){Ye("WebGLState:",D)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Ye("WebGLState:",D)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Ye("WebGLState:",D)}}function fe(){try{i.texStorage2D(...arguments)}catch(D){Ye("WebGLState:",D)}}function pe(){try{i.texStorage3D(...arguments)}catch(D){Ye("WebGLState:",D)}}function ee(){try{i.texImage2D(...arguments)}catch(D){Ye("WebGLState:",D)}}function re(){try{i.texImage3D(...arguments)}catch(D){Ye("WebGLState:",D)}}function me(D){return d[D]!==void 0?d[D]:i.getParameter(D)}function Oe(D,be){d[D]!==be&&(i.pixelStorei(D,be),d[D]=be)}function ge(D){Ae.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Ae.copy(D))}function ye(D){G.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),G.copy(D))}function Be(D,be){let se=c.get(be);se===void 0&&(se=new WeakMap,c.set(be,se));let ve=se.get(D);ve===void 0&&(ve=i.getUniformBlockIndex(be,D.name),se.set(D,ve))}function Ve(D,be){let ve=c.get(be).get(D);l.get(be)!==ve&&(i.uniformBlockBinding(be,ve,D.__bindingPointIndex),l.set(be,ve))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,L={},h={},p=new WeakMap,v=[],S=null,m=!1,f=null,M=null,A=null,_=null,x=null,b=null,T=null,g=new tt(0,0,0),E=0,I=!1,R=null,U=null,k=null,P=null,X=null,Ae.set(0,0,i.canvas.width,i.canvas.height),G.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:he,bindFramebuffer:Me,drawBuffers:de,useProgram:He,setBlending:Pe,setMaterial:Ze,setFlipSided:Ge,setCullFace:lt,setLineWidth:Rt,setPolygonOffset:zt,setScissorTest:Tt,activeTexture:_t,bindTexture:O,unbindTexture:Vt,compressedTexImage2D:mt,compressedTexImage3D:C,texImage2D:ee,texImage3D:re,pixelStorei:Oe,getParameter:me,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:fe,texStorage3D:pe,texSubImage2D:y,texSubImage3D:V,compressedTexSubImage2D:Y,compressedTexSubImage3D:te,scissor:ge,viewport:ye,reset:Xe}}function Tg(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,u=new WeakMap,d=new Set,h,p=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(C,y){return v?new OffscreenCanvas(C,y):Rs("canvas")}function m(C,y,V){let Y=1,te=mt(C);if((te.width>V||te.height>V)&&(Y=V/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let fe=Math.floor(Y*te.width),pe=Math.floor(Y*te.height);h===void 0&&(h=S(fe,pe));let ee=y?S(fe,pe):h;return ee.width=fe,ee.height=pe,ee.getContext("2d").drawImage(C,0,0,fe,pe),We("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+fe+"x"+pe+")."),ee}else return"data"in C&&We("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function f(C){return C.generateMipmaps}function M(C){i.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(C,y,V,Y,te,fe=!1){if(C!==null){if(i[C]!==void 0)return i[C];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let pe;Y&&(pe=e.get("EXT_texture_norm16"),pe||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=y;if(y===i.RED&&(V===i.FLOAT&&(ee=i.R32F),V===i.HALF_FLOAT&&(ee=i.R16F),V===i.UNSIGNED_BYTE&&(ee=i.R8),V===i.UNSIGNED_SHORT&&pe&&(ee=pe.R16_EXT),V===i.SHORT&&pe&&(ee=pe.R16_SNORM_EXT)),y===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.R8UI),V===i.UNSIGNED_SHORT&&(ee=i.R16UI),V===i.UNSIGNED_INT&&(ee=i.R32UI),V===i.BYTE&&(ee=i.R8I),V===i.SHORT&&(ee=i.R16I),V===i.INT&&(ee=i.R32I)),y===i.RG&&(V===i.FLOAT&&(ee=i.RG32F),V===i.HALF_FLOAT&&(ee=i.RG16F),V===i.UNSIGNED_BYTE&&(ee=i.RG8),V===i.UNSIGNED_SHORT&&pe&&(ee=pe.RG16_EXT),V===i.SHORT&&pe&&(ee=pe.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RG8UI),V===i.UNSIGNED_SHORT&&(ee=i.RG16UI),V===i.UNSIGNED_INT&&(ee=i.RG32UI),V===i.BYTE&&(ee=i.RG8I),V===i.SHORT&&(ee=i.RG16I),V===i.INT&&(ee=i.RG32I)),y===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),V===i.UNSIGNED_INT&&(ee=i.RGB32UI),V===i.BYTE&&(ee=i.RGB8I),V===i.SHORT&&(ee=i.RGB16I),V===i.INT&&(ee=i.RGB32I)),y===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),V===i.UNSIGNED_INT&&(ee=i.RGBA32UI),V===i.BYTE&&(ee=i.RGBA8I),V===i.SHORT&&(ee=i.RGBA16I),V===i.INT&&(ee=i.RGBA32I)),y===i.RGB&&(V===i.UNSIGNED_SHORT&&pe&&(ee=pe.RGB16_EXT),V===i.SHORT&&pe&&(ee=pe.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),y===i.RGBA){let re=fe?As:ct.getTransfer(te);V===i.FLOAT&&(ee=i.RGBA32F),V===i.HALF_FLOAT&&(ee=i.RGBA16F),V===i.UNSIGNED_BYTE&&(ee=re===vt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&pe&&(ee=pe.RGBA16_EXT),V===i.SHORT&&pe&&(ee=pe.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function x(C,y){let V;return C?y===null||y===Pn||y===cs?V=i.DEPTH24_STENCIL8:y===Ln?V=i.DEPTH32F_STENCIL8:y===ls&&(V=i.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Pn||y===cs?V=i.DEPTH_COMPONENT24:y===Ln?V=i.DEPTH_COMPONENT32F:y===ls&&(V=i.DEPTH_COMPONENT16),V}function b(C,y){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==Gt&&C.minFilter!==Xt?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function T(C){let y=C.target;y.removeEventListener("dispose",T),E(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function g(C){let y=C.target;y.removeEventListener("dispose",g),R(y)}function E(C){let y=n.get(C);if(y.__webglInit===void 0)return;let V=C.source,Y=p.get(V);if(Y){let te=Y[y.__cacheKey];te.usedTimes--,te.usedTimes===0&&I(C),Object.keys(Y).length===0&&p.delete(V)}n.remove(C)}function I(C){let y=n.get(C);i.deleteTexture(y.__webglTexture);let V=C.source,Y=p.get(V);delete Y[y.__cacheKey],a.memory.textures--}function R(C){let y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let te=0;te<y.__webglFramebuffer[Y].length;te++)i.deleteFramebuffer(y.__webglFramebuffer[Y][te]);else i.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)i.deleteFramebuffer(y.__webglFramebuffer[Y]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let V=C.textures;for(let Y=0,te=V.length;Y<te;Y++){let fe=n.get(V[Y]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(V[Y])}n.remove(C)}let U=0;function k(){U=0}function P(){return U}function X(C){U=C}function Z(){let C=U;return C>=s.maxTextures&&We("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),U+=1,C}function H(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function ie(C,y){let V=n.get(C);if(C.isVideoTexture&&O(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){let Y=C.image;if(Y===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{he(V,C,y);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+y)}function j(C,y){let V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){he(V,C,y);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+y)}function F(C,y){let V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){he(V,C,y);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+y)}function L(C,y){let V=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){Me(V,C,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+y)}let ae={[$r]:i.REPEAT,[Nn]:i.CLAMP_TO_EDGE,[qr]:i.MIRRORED_REPEAT},ne={[Gt]:i.NEAREST,[kc]:i.NEAREST_MIPMAP_NEAREST,[Qs]:i.NEAREST_MIPMAP_LINEAR,[Xt]:i.LINEAR,[va]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},Ae={[Hc]:i.NEVER,[qc]:i.ALWAYS,[Gc]:i.LESS,[eo]:i.LEQUAL,[Wc]:i.EQUAL,[to]:i.GEQUAL,[Xc]:i.GREATER,[$c]:i.NOTEQUAL};function G(C,y){if(y.type===Ln&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Xt||y.magFilter===va||y.magFilter===Qs||y.magFilter===gi||y.minFilter===Xt||y.minFilter===va||y.minFilter===Qs||y.minFilter===gi)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ae[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ae[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ae[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ne[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ne[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ae[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Gt||y.minFilter!==Qs&&y.minFilter!==gi||y.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ue(C,y){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",T));let Y=y.source,te=p.get(Y);te===void 0&&(te={},p.set(Y,te));let fe=H(y);if(fe!==C.__cacheKey){te[fe]===void 0&&(te[fe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),te[fe].usedTimes++;let pe=te[C.__cacheKey];pe!==void 0&&(te[C.__cacheKey].usedTimes--,pe.usedTimes===0&&I(y)),C.__cacheKey=fe,C.__webglTexture=te[fe].texture}return V}function B(C,y,V){return Math.floor(Math.floor(C/V)/y)}function J(C,y,V,Y){let fe=C.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,V,Y,y.data);else{fe.sort((Oe,ge)=>Oe.start-ge.start);let pe=0;for(let Oe=1;Oe<fe.length;Oe++){let ge=fe[pe],ye=fe[Oe],Be=ge.start+ge.count,Ve=B(ye.start,y.width,4),Xe=B(ge.start,y.width,4);ye.start<=Be+1&&Ve===Xe&&B(ye.start+ye.count-1,y.width,4)===Ve?ge.count=Math.max(ge.count,ye.start+ye.count-ge.start):(++pe,fe[pe]=ye)}fe.length=pe+1;let ee=t.getParameter(i.UNPACK_ROW_LENGTH),re=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Oe=0,ge=fe.length;Oe<ge;Oe++){let ye=fe[Oe],Be=Math.floor(ye.start/4),Ve=Math.ceil(ye.count/4),Xe=Be%y.width,D=Math.floor(Be/y.width),be=Ve,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Xe,D,be,se,V,Y,y.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ee),t.pixelStorei(i.UNPACK_SKIP_PIXELS,re),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function he(C,y,V){let Y=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=i.TEXTURE_3D);let te=ue(C,y),fe=y.source;t.bindTexture(Y,C.__webglTexture,i.TEXTURE0+V);let pe=n.get(fe);if(fe.version!==pe.__version||te===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let se=ct.getPrimaries(ct.workingColorSpace),ve=y.colorSpace===Zn?null:ct.getPrimaries(y.colorSpace),we=y.colorSpace===Zn||se===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let re=m(y.image,!1,s.maxTextureSize);re=Vt(y,re);let me=r.convert(y.format,y.colorSpace),Oe=r.convert(y.type),ge=_(y.internalFormat,me,Oe,y.normalized,y.colorSpace,y.isVideoTexture);G(Y,y);let ye,Be=y.mipmaps,Ve=y.isVideoTexture!==!0,Xe=pe.__version===void 0||te===!0,D=fe.dataReady,be=b(y,re);if(y.isDepthTexture)ge=x(y.format===vi,y.type),Xe&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ge,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,ge,re.width,re.height,0,me,Oe,null));else if(y.isDataTexture)if(Be.length>0){Ve&&Xe&&t.texStorage2D(i.TEXTURE_2D,be,ge,Be[0].width,Be[0].height);for(let se=0,ve=Be.length;se<ve;se++)ye=Be[se],Ve?D&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ye.width,ye.height,me,Oe,ye.data):t.texImage2D(i.TEXTURE_2D,se,ge,ye.width,ye.height,0,me,Oe,ye.data);y.generateMipmaps=!1}else Ve?(Xe&&t.texStorage2D(i.TEXTURE_2D,be,ge,re.width,re.height),D&&J(y,re,me,Oe)):t.texImage2D(i.TEXTURE_2D,0,ge,re.width,re.height,0,me,Oe,re.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ve&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,ge,Be[0].width,Be[0].height,re.depth);for(let se=0,ve=Be.length;se<ve;se++)if(ye=Be[se],y.format!==bn)if(me!==null)if(Ve){if(D)if(y.layerUpdates.size>0){let we=ml(ye.width,ye.height,y.format,y.type);for(let oe of y.layerUpdates){let ze=ye.data.subarray(oe*we/ye.data.BYTES_PER_ELEMENT,(oe+1)*we/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,oe,ye.width,ye.height,1,me,ze)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ye.width,ye.height,re.depth,me,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,ge,ye.width,ye.height,re.depth,0,ye.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ye.width,ye.height,re.depth,me,Oe,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,ge,ye.width,ye.height,re.depth,0,me,Oe,ye.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Ve&&Xe&&t.texStorage2D(i.TEXTURE_2D,be,ge,Be[0].width,Be[0].height);for(let se=0,ve=Be.length;se<ve;se++)ye=Be[se],y.format!==bn?me!==null?Ve?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,ye.width,ye.height,me,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,se,ge,ye.width,ye.height,0,ye.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?D&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ye.width,ye.height,me,Oe,ye.data):t.texImage2D(i.TEXTURE_2D,se,ge,ye.width,ye.height,0,me,Oe,ye.data)}else if(y.isDataArrayTexture)if(Ve){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,ge,re.width,re.height,re.depth),D)if(y.layerUpdates.size>0){let se=ml(re.width,re.height,y.format,y.type);for(let ve of y.layerUpdates){let we=re.data.subarray(ve*se/re.data.BYTES_PER_ELEMENT,(ve+1)*se/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,re.width,re.height,1,me,Oe,we)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,me,Oe,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,re.width,re.height,re.depth,0,me,Oe,re.data);else if(y.isData3DTexture)Ve?(Xe&&t.texStorage3D(i.TEXTURE_3D,be,ge,re.width,re.height,re.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,me,Oe,re.data)):t.texImage3D(i.TEXTURE_3D,0,ge,re.width,re.height,re.depth,0,me,Oe,re.data);else if(y.isFramebufferTexture){if(Xe)if(Ve)t.texStorage2D(i.TEXTURE_2D,be,ge,re.width,re.height);else{let se=re.width,ve=re.height;for(let we=0;we<be;we++)t.texImage2D(i.TEXTURE_2D,we,ge,se,ve,0,me,Oe,null),se>>=1,ve>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),re.parentNode!==se){se.appendChild(re),d.add(y),se.onpaint=ve=>{let we=ve.changedElements;for(let oe of d)we.includes(oe.image)&&(oe.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,re);else{let we=i.RGBA,oe=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,we,oe,ze,re)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Be.length>0){if(Ve&&Xe){let se=mt(Be[0]);t.texStorage2D(i.TEXTURE_2D,be,ge,se.width,se.height)}for(let se=0,ve=Be.length;se<ve;se++)ye=Be[se],Ve?D&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,me,Oe,ye):t.texImage2D(i.TEXTURE_2D,se,ge,me,Oe,ye);y.generateMipmaps=!1}else if(Ve){if(Xe){let se=mt(re);t.texStorage2D(i.TEXTURE_2D,be,ge,se.width,se.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Oe,re)}else t.texImage2D(i.TEXTURE_2D,0,ge,me,Oe,re);f(y)&&M(Y),pe.__version=fe.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Me(C,y,V){if(y.image.length!==6)return;let Y=ue(C,y),te=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);let fe=n.get(te);if(te.version!==fe.__version||Y===!0){t.activeTexture(i.TEXTURE0+V);let pe=ct.getPrimaries(ct.workingColorSpace),ee=y.colorSpace===Zn?null:ct.getPrimaries(y.colorSpace),re=y.colorSpace===Zn||pe===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let me=y.isCompressedTexture||y.image[0].isCompressedTexture,Oe=y.image[0]&&y.image[0].isDataTexture,ge=[];for(let oe=0;oe<6;oe++)!me&&!Oe?ge[oe]=m(y.image[oe],!0,s.maxCubemapSize):ge[oe]=Oe?y.image[oe].image:y.image[oe],ge[oe]=Vt(y,ge[oe]);let ye=ge[0],Be=r.convert(y.format,y.colorSpace),Ve=r.convert(y.type),Xe=_(y.internalFormat,Be,Ve,y.normalized,y.colorSpace),D=y.isVideoTexture!==!0,be=fe.__version===void 0||Y===!0,se=te.dataReady,ve=b(y,ye);G(i.TEXTURE_CUBE_MAP,y);let we;if(me){D&&be&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Xe,ye.width,ye.height);for(let oe=0;oe<6;oe++){we=ge[oe].mipmaps;for(let ze=0;ze<we.length;ze++){let Fe=we[ze];y.format!==bn?Be!==null?D?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,0,0,Fe.width,Fe.height,Be,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,Xe,Fe.width,Fe.height,0,Fe.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,0,0,Fe.width,Fe.height,Be,Ve,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze,Xe,Fe.width,Fe.height,0,Be,Ve,Fe.data)}}}else{if(we=y.mipmaps,D&&be){we.length>0&&ve++;let oe=mt(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Xe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Oe){D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ge[oe].width,ge[oe].height,Be,Ve,ge[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Xe,ge[oe].width,ge[oe].height,0,Be,Ve,ge[oe].data);for(let ze=0;ze<we.length;ze++){let pt=we[ze].image[oe].image;D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,0,0,pt.width,pt.height,Be,Ve,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,Xe,pt.width,pt.height,0,Be,Ve,pt.data)}}else{D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Be,Ve,ge[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Xe,Be,Ve,ge[oe]);for(let ze=0;ze<we.length;ze++){let Fe=we[ze];D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,0,0,Be,Ve,Fe.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ze+1,Xe,Be,Ve,Fe.image[oe])}}}f(y)&&M(i.TEXTURE_CUBE_MAP),fe.__version=te.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function de(C,y,V,Y,te,fe){let pe=r.convert(V.format,V.colorSpace),ee=r.convert(V.type),re=_(V.internalFormat,pe,ee,V.normalized,V.colorSpace),me=n.get(y),Oe=n.get(V);if(Oe.__renderTarget=y,!me.__hasExternalTextures){let ge=Math.max(1,y.width>>fe),ye=Math.max(1,y.height>>fe);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,fe,re,ge,ye,y.depth,0,pe,ee,null):t.texImage2D(te,fe,re,ge,ye,0,pe,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),_t(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,te,Oe.__webglTexture,0,Tt(y)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,te,Oe.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(C,y,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){let Y=y.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,fe=x(y.stencilBuffer,te),pe=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_t(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt(y),fe,y.width,y.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt(y),fe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,fe,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,C)}else{let Y=y.textures;for(let te=0;te<Y.length;te++){let fe=Y[te],pe=r.convert(fe.format,fe.colorSpace),ee=r.convert(fe.type),re=_(fe.internalFormat,pe,ee,fe.normalized,fe.colorSpace);_t(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt(y),re,y.width,y.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt(y),re,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,re,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function nt(C,y,V){let Y=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(y.depthTexture);if(te.__renderTarget=y,(!te.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y){if(te.__webglInit===void 0&&(te.__webglInit=!0,y.depthTexture.addEventListener("dispose",T)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),G(i.TEXTURE_CUBE_MAP,y.depthTexture);let me=r.convert(y.depthTexture.format),Oe=r.convert(y.depthTexture.type),ge;y.depthTexture.format===Un?ge=i.DEPTH_COMPONENT24:y.depthTexture.format===vi&&(ge=i.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,ge,y.width,y.height,0,me,Oe,null)}}else ie(y.depthTexture,0);let fe=te.__webglTexture,pe=Tt(y),ee=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,re=y.depthTexture.format===vi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Un)_t(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ee,fe,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,re,ee,fe,0);else if(y.depthTexture.format===vi)_t(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ee,fe,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,re,ee,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Le(C){let y=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let Y=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){let te=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),y.__depthDisposeCallback=te}y.__boundDepthTexture=Y}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(V)for(let Y=0;Y<6;Y++)nt(y.__webglFramebuffer[Y],C,Y);else{let Y=C.texture.mipmaps;Y&&Y.length>0?nt(y.__webglFramebuffer[0],C,0):nt(y.__webglFramebuffer,C,0)}else if(V){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=i.createRenderbuffer(),He(y.__webglDepthbuffer[Y],C,!1);else{let te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=y.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,fe)}}else{let Y=C.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),He(y.__webglDepthbuffer,C,!1);else{let te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,fe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(C,y,V){let Y=n.get(C);y!==void 0&&de(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Le(C)}function Ze(C){let y=C.texture,V=n.get(C),Y=n.get(y);C.addEventListener("dispose",g);let te=C.textures,fe=C.isWebGLCubeRenderTarget===!0,pe=te.length>1;if(pe||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=y.version,a.memory.textures++),fe){V.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[ee]=[];for(let re=0;re<y.mipmaps.length;re++)V.__webglFramebuffer[ee][re]=i.createFramebuffer()}else V.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let ee=0;ee<y.mipmaps.length;ee++)V.__webglFramebuffer[ee]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(pe)for(let ee=0,re=te.length;ee<re;ee++){let me=n.get(te[ee]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&_t(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ee=0;ee<te.length;ee++){let re=te[ee];V.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ee]);let me=r.convert(re.format,re.colorSpace),Oe=r.convert(re.type),ge=_(re.internalFormat,me,Oe,re.normalized,re.colorSpace,C.isXRRenderTarget===!0),ye=Tt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,ge,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,V.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),He(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),G(i.TEXTURE_CUBE_MAP,y);for(let ee=0;ee<6;ee++)if(y.mipmaps&&y.mipmaps.length>0)for(let re=0;re<y.mipmaps.length;re++)de(V.__webglFramebuffer[ee][re],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,re);else de(V.__webglFramebuffer[ee],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);f(y)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let ee=0,re=te.length;ee<re;ee++){let me=te[ee],Oe=n.get(me),ge=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ge=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Oe.__webglTexture),G(ge,me),de(V.__webglFramebuffer,C,me,i.COLOR_ATTACHMENT0+ee,ge,0),f(me)&&M(ge)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ee=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,Y.__webglTexture),G(ee,y),y.mipmaps&&y.mipmaps.length>0)for(let re=0;re<y.mipmaps.length;re++)de(V.__webglFramebuffer[re],C,y,i.COLOR_ATTACHMENT0,ee,re);else de(V.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,ee,0);f(y)&&M(ee),t.unbindTexture()}C.depthBuffer&&Le(C)}function Ge(C){let y=C.textures;for(let V=0,Y=y.length;V<Y;V++){let te=y[V];if(f(te)){let fe=A(C),pe=n.get(te).__webglTexture;t.bindTexture(fe,pe),M(fe),t.unbindTexture()}}}let lt=[],Rt=[];function zt(C){if(C.samples>0){if(_t(C)===!1){let y=C.textures,V=C.width,Y=C.height,te=i.COLOR_BUFFER_BIT,fe=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=n.get(C),ee=y.length>1;if(ee)for(let me=0;me<y.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let re=C.texture.mipmaps;re&&re.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let me=0;me<y.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);let Oe=n.get(y[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Oe,0)}i.blitFramebuffer(0,0,V,Y,0,0,V,Y,te,i.NEAREST),l===!0&&(lt.length=0,Rt.length=0,lt.push(i.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(lt.push(fe),Rt.push(fe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let me=0;me<y.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);let Oe=n.get(y[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Tt(C){return Math.min(s.maxSamples,C.samples)}function _t(C){let y=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function O(C){let y=a.render.frame;u.get(C)!==y&&(u.set(C,y),C.update())}function Vt(C,y){let V=C.colorSpace,Y=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==Es&&V!==Zn&&(ct.getTransfer(V)===vt?(Y!==bn||te!==vn)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",V)),y}function mt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=k,this.getTextureUnits=P,this.setTextureUnits=X,this.setTexture2D=ie,this.setTexture2DArray=j,this.setTexture3D=F,this.setTextureCube=L,this.rebindTextures=Pe,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=de,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Eg(i,e){function t(n,s=Zn){let r,a=ct.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===_a)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ya)return i.UNSIGNED_SHORT_5_5_5_1;if(n===il)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===sl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===tl)return i.BYTE;if(n===nl)return i.SHORT;if(n===ls)return i.UNSIGNED_SHORT;if(n===xa)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===qt)return i.HALF_FLOAT;if(n===rl)return i.ALPHA;if(n===al)return i.RGB;if(n===bn)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===vi)return i.DEPTH_STENCIL;if(n===ol)return i.RED;if(n===ba)return i.RED_INTEGER;if(n===xi)return i.RG;if(n===Ma)return i.RG_INTEGER;if(n===Sa)return i.RGBA_INTEGER;if(n===er||n===tr||n===nr||n===ir)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wa||n===Ta||n===Ea||n===Aa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ca||n===Ra||n===Ia||n===Pa||n===La||n===sr||n===Da)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ca||n===Ra)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ia)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Pa)return r.COMPRESSED_R11_EAC;if(n===La)return r.COMPRESSED_SIGNED_R11_EAC;if(n===sr)return r.COMPRESSED_RG11_EAC;if(n===Da)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Na||n===Ua||n===Fa||n===Oa||n===ka||n===Ba||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===$a||n===qa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Na)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ka)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ba)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===za)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Va)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ha)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ga)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$a)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ya||n===Za||n===Ja)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ya)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ka||n===ja||n===rr||n===Qa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ka)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Ag=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cg=`
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

}`,Rl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Bs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ct({vertexShader:Ag,fragmentShader:Cg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qt(new zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Il=class extends Fn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,v=null,S=typeof XRWebGLBinding<"u",m=new Rl,f={},M=t.getContextAttributes(),A=null,_=null,x=[],b=[],T=new qe,g=null,E=null,I=new Kt;I.viewport=new Pt;let R=new Kt;R.viewport=new Pt;let U=[I,R],k=new pa,P=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let J=x[B];return J===void 0&&(J=new is,x[B]=J),J.getTargetRaySpace()},this.getControllerGrip=function(B){let J=x[B];return J===void 0&&(J=new is,x[B]=J),J.getGripSpace()},this.getHand=function(B){let J=x[B];return J===void 0&&(J=new is,x[B]=J),J.getHandSpace()};function Z(B){let J=b.indexOf(B.inputSource);if(J===-1)return;let he=x[J];he!==void 0&&(he.update(B.inputSource,B.frame,c||a),he.dispatchEvent({type:B.type,data:B.inputSource}))}function H(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",ie);for(let B=0;B<x.length;B++){let J=b[B];J!==null&&(b[B]=null,x[B].disconnect(J))}P=null,X=null,m.reset();for(let B in f)delete f[B];if(e.setRenderTarget(A),p=null,h=null,d=null,s=null,_=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(g),e.setSize(T.width,T.height,!1),E!==null){let B=E.camera;B.fov=E.fov,B.zoom=E.zoom,B.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",H),s.addEventListener("inputsourceschange",ie),M.xrCompatible!==!0&&await t.makeXRCompatible(),g=e.getPixelRatio(),e.getSize(T),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,Me=null,de=null;M.depth&&(de=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=M.stencil?vi:Un,Me=M.stencil?cs:Pn);let He={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(He),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Ft(h.textureWidth,h.textureHeight,{format:bn,type:vn,depthTexture:new ci(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let he={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Ft(p.framebufferWidth,p.framebufferHeight,{format:bn,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ue.setContext(s),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(B){for(let J=0;J<B.removed.length;J++){let he=B.removed[J],Me=b.indexOf(he);Me>=0&&(b[Me]=null,x[Me].disconnect(he))}for(let J=0;J<B.added.length;J++){let he=B.added[J],Me=b.indexOf(he);if(Me===-1){for(let He=0;He<x.length;He++)if(He>=b.length){b.push(he),Me=He;break}else if(b[He]===null){b[He]=he,Me=He;break}if(Me===-1)break}let de=x[Me];de&&de.connect(he)}}let j=new W,F=new W;function L(B,J,he){j.setFromMatrixPosition(J.matrixWorld),F.setFromMatrixPosition(he.matrixWorld);let Me=j.distanceTo(F),de=J.projectionMatrix.elements,He=he.projectionMatrix.elements,nt=de[14]/(de[10]-1),Le=de[14]/(de[10]+1),Pe=(de[9]+1)/de[5],Ze=(de[9]-1)/de[5],Ge=(de[8]-1)/de[0],lt=(He[8]+1)/He[0],Rt=nt*Ge,zt=nt*lt,Tt=Me/(-Ge+lt),_t=Tt*-Ge;if(J.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(_t),B.translateZ(Tt),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),de[10]===-1)B.projectionMatrix.copy(J.projectionMatrix),B.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let O=nt+Tt,Vt=Le+Tt,mt=Rt-_t,C=zt+(Me-_t),y=Pe*Le/Vt*O,V=Ze*Le/Vt*O;B.projectionMatrix.makePerspective(mt,C,y,V,O,Vt),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function ae(B,J){J===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(J.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let J=B.near,he=B.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(he=m.depthFar)),k.near=R.near=I.near=J,k.far=R.far=I.far=he,(P!==k.near||X!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),P=k.near,X=k.far),k.layers.mask=B.layers.mask|6,I.layers.mask=k.layers.mask&-5,R.layers.mask=k.layers.mask&-3;let Me=B.parent,de=k.cameras;ae(k,Me);for(let He=0;He<de.length;He++)ae(de[He],Me);de.length===2?L(k,I,R):k.projectionMatrix.copy(I.projectionMatrix),E===null&&B.isPerspectiveCamera&&(E={camera:B,fov:B.fov,zoom:B.zoom}),ne(B,k,Me)};function ne(B,J,he){he===null?B.matrix.copy(J.matrixWorld):(B.matrix.copy(he.matrixWorld),B.matrix.invert(),B.matrix.multiply(J.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(J.projectionMatrix),B.projectionMatrixInverse.copy(J.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=ts*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(B){l=B,h!==null&&(h.fixedFoveation=B),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=B)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(B){return f[B]};let Ae=null;function G(B,J){if(u=J.getViewerPose(c||a),v=J,u!==null){let he=u.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let Me=!1;he.length!==k.cameras.length&&(k.cameras.length=0,Me=!0);for(let Le=0;Le<he.length;Le++){let Pe=he[Le],Ze=null;if(p!==null)Ze=p.getViewport(Pe);else{let lt=d.getViewSubImage(h,Pe);Ze=lt.viewport,Le===0&&(e.setRenderTargetTextures(_,lt.colorTexture,lt.depthStencilTexture),e.setRenderTarget(_))}let Ge=U[Le];Ge===void 0&&(Ge=new Kt,Ge.layers.enable(Le),Ge.viewport=new Pt,U[Le]=Ge),Ge.matrix.fromArray(Pe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(Pe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Le===0&&(k.matrix.copy(Ge.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Me===!0&&k.cameras.push(Ge)}let de=s.enabledFeatures;if(de&&de.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=n.getBinding();let Le=d.getDepthInformation(he[0]);Le&&Le.isValid&&Le.texture&&m.init(Le,s.renderState)}if(de&&de.includes("camera-access")&&S){e.state.unbindTexture(),d=n.getBinding();for(let Le=0;Le<he.length;Le++){let Pe=he[Le].camera;if(Pe){let Ze=f[Pe];Ze||(Ze=new Bs,f[Pe]=Ze);let Ge=d.getCameraImage(Pe);Ze.sourceTexture=Ge}}}}for(let he=0;he<x.length;he++){let Me=b[he],de=x[he];Me!==null&&de!==void 0&&de.update(Me,J,c||a)}Ae&&Ae(B,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),v=null}let ue=new Su;ue.setAnimationLoop(G),this.setAnimationLoop=function(B){Ae=B},this.dispose=function(){}}},Rg=new At,Ru=new et;Ru.set(-1,0,0,0,1,0,0,0,1);function Ig(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,dl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,A,_){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(r(m,f),v(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),S(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,A):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===$t&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===$t&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=e.get(f),A=M.envMap,_=M.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(Rg.makeRotationFromEuler(_)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ru),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=A*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===$t&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,f){f.matcap&&(m.matcap.value=f.matcap)}function S(m,f){let M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Pg(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){let b=x.program;n.uniformBlockBinding(_,b)}function c(_,x){let b=s[_.id];b===void 0&&(m(_),b=u(_),s[_.id]=b,_.addEventListener("dispose",M));let T=x.program;n.updateUBOMapping(_,T);let g=e.render.frame;r[_.id]!==g&&(h(_),r[_.id]=g)}function u(_){let x=d();_.__bindingPointIndex=x;let b=i.createBuffer(),T=_.__size,g=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,T,g),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){let x=s[_.id],b=_.uniforms,T=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let g=0,E=b.length;g<E;g++){let I=b[g];if(Array.isArray(I))for(let R=0,U=I.length;R<U;R++)p(I[R],g,R,T);else p(I,g,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,x,b,T){if(S(_,x,b,T)===!0){let g=_.__offset,E=_.value;if(Array.isArray(E)){let I=0;for(let R=0;R<E.length;R++){let U=E[R],k=f(U);v(U,_.__data,I),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(I+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(E,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,g,_.__data)}}function v(_,x,b){typeof _=="number"||typeof _=="boolean"?x[0]=_:_.isMatrix3?(x[0]=_.elements[0],x[1]=_.elements[1],x[2]=_.elements[2],x[3]=0,x[4]=_.elements[3],x[5]=_.elements[4],x[6]=_.elements[5],x[7]=0,x[8]=_.elements[6],x[9]=_.elements[7],x[10]=_.elements[8],x[11]=0):ArrayBuffer.isView(_)?x.set(new _.constructor(_.buffer,_.byteOffset,x.length)):_.toArray(x,b)}function S(_,x,b,T){let g=_.value,E=x+"_"+b;if(T[E]===void 0)return typeof g=="number"||typeof g=="boolean"?T[E]=g:ArrayBuffer.isView(g)?T[E]=g.slice():T[E]=g.clone(),!0;{let I=T[E];if(typeof g=="number"||typeof g=="boolean"){if(I!==g)return T[E]=g,!0}else{if(ArrayBuffer.isView(g))return!0;if(I.equals(g)===!1)return I.copy(g),!0}}return!1}function m(_){let x=_.uniforms,b=0,T=16;for(let E=0,I=x.length;E<I;E++){let R=Array.isArray(x[E])?x[E]:[x[E]];for(let U=0,k=R.length;U<k;U++){let P=R[U],X=Array.isArray(P.value)?P.value:[P.value];for(let Z=0,H=X.length;Z<H;Z++){let ie=X[Z],j=f(ie),F=b%T,L=F%j.boundary,ae=F+L;b+=L,ae!==0&&T-ae<j.storage&&(b+=T-ae),P.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=b,b+=j.storage}}}let g=b%T;return g>0&&(b+=T-g),_.__size=b,_.__cache={},this}function f(_){let x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(x.boundary=16,x.storage=_.byteLength):We("WebGLRenderer: Unsupported uniform value type.",_),x}function M(_){let x=_.target;x.removeEventListener("dispose",M);let b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function A(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}var Lg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zn=null;function Dg(){return zn===null&&(zn=new jr(Lg,16,16,xi,qt),zn.name="DFG_LUT",zn.minFilter=Xt,zn.magFilter=Xt,zn.wrapS=Nn,zn.wrapT=Nn,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}var oo=class{constructor(e={}){let{canvas:t=Zc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=vn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let S=p,m=new Set([Sa,Ma,ba]),f=new Set([vn,Pn,ls,cs,_a,ya]),M=new Uint32Array(4),A=new Int32Array(4),_=new W,x=null,b=null,T=[],g=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,R=!1,U=null,k=null,P=null,X=null;this._outputColorSpace=fn;let Z=0,H=0,ie=null,j=-1,F=null,L=new Pt,ae=new Pt,ne=null,Ae=new tt(0),G=0,ue=t.width,B=t.height,J=1,he=null,Me=null,de=new Pt(0,0,ue,B),He=new Pt(0,0,ue,B),nt=!1,Le=new Fs,Pe=!1,Ze=!1,Ge=new At,lt=new W,Rt=new Pt,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Tt=!1;function _t(){return ie===null?J:1}let O=n;function Vt(w,N){return t.getContext(w,N)}let mt,C,y,V,Y,te,fe,pe,ee,re,me,Oe,ge,ye,Be,Ve,Xe,D,be,se,ve,we,oe;try{let w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",tn,!1),O===null){let N="webgl2";if(O=Vt(N,w),O===null)throw Vt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(w){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",tn,!1),Ye("WebGLRenderer: "+w.message),w}function ze(){mt=new zp(O),mt.init(),ve=new Eg(O,mt),C=new Ip(O,mt,e,ve),y=new wg(O,mt),C.reversedDepthBuffer&&h&&y.buffers.depth.setReversed(!0),k=O.createFramebuffer(),P=O.createFramebuffer(),X=O.createFramebuffer(),V=new Gp(O),Y=new ug,te=new Tg(O,mt,y,Y,C,ve,V),fe=new Bp(I),pe=new Wh(O),we=new Cp(O,pe),ee=new Vp(O,pe,V,we),re=new Xp(O,ee,pe,we,V),D=new Wp(O,C,te),Be=new Pp(Y),me=new cg(I,fe,mt,C,we,Be),Oe=new Ig(I,Y),ge=new dg,ye=new xg(mt),Xe=new Ap(I,fe,y,re,v,l),Ve=new Sg(I,re,C),oe=new Pg(O,V,C,y),be=new Rp(O,mt,V),se=new Hp(O,mt,V),V.programs=me.programs,I.capabilities=C,I.extensions=mt,I.properties=Y,I.renderLists=ge,I.shadowMap=Ve,I.state=y,I.info=V}S!==vn&&(E=new qp(S,t.width,t.height,o,s,r));let Fe=new Il(I,O);this.xr=Fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=mt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=mt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(w){w!==void 0&&(J=w,this.setSize(ue,B,!1))},this.getSize=function(w){return w.set(ue,B)},this.setSize=function(w,N,Q=!0){if(Fe.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}ue=w,B=N,t.width=Math.floor(w*J),t.height=Math.floor(N*J),Q===!0&&(t.style.width=w+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(ue*J,B*J).floor()},this.setDrawingBufferSize=function(w,N,Q){ue=w,B=N,J=Q,t.width=Math.floor(w*Q),t.height=Math.floor(N*Q),this.setViewport(0,0,w,N)},this.setEffects=function(w){if(S===vn){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let N=0;N<w.length;N++)if(w[N].isOutputPass===!0){We("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(de)},this.setViewport=function(w,N,Q,$){w.isVector4?de.set(w.x,w.y,w.z,w.w):de.set(w,N,Q,$),y.viewport(L.copy(de).multiplyScalar(J).round())},this.getScissor=function(w){return w.copy(He)},this.setScissor=function(w,N,Q,$){w.isVector4?He.set(w.x,w.y,w.z,w.w):He.set(w,N,Q,$),y.scissor(ae.copy(He).multiplyScalar(J).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(w){y.setScissorTest(nt=w)},this.setOpaqueSort=function(w){he=w},this.setTransparentSort=function(w){Me=w},this.getClearColor=function(w){return w.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,Q=!0){let $=0;if(w){let q=!1;if(ie!==null){let xe=ie.texture.format;q=m.has(xe)}if(q){let xe=ie.texture.type,Ce=f.has(xe),_e=Xe.getClearColor(),De=Xe.getClearAlpha(),Ue=_e.r,it=_e.g,Ke=_e.b;Ce?(M[0]=Ue,M[1]=it,M[2]=Ke,M[3]=De,O.clearBufferuiv(O.COLOR,0,M)):(A[0]=Ue,A[1]=it,A[2]=Ke,A[3]=De,O.clearBufferiv(O.COLOR,0,A))}else $|=O.COLOR_BUFFER_BIT}N&&($|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),U=w},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",tn,!1),Xe.dispose(),ge.dispose(),ye.dispose(),Y.dispose(),fe.dispose(),re.dispose(),we.dispose(),oe.dispose(),me.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Kn),Fe.removeEventListener("sessionend",mr),jn.stop()};function pt(w){w.preventDefault(),ul("WebGLRenderer: Context Lost."),R=!0}function gt(){ul("WebGLRenderer: Context Restored."),R=!1;let w=V.autoReset,N=Ve.enabled,Q=Ve.autoUpdate,$=Ve.needsUpdate,q=Ve.type;ze(),V.autoReset=w,Ve.enabled=N,Ve.autoUpdate=Q,Ve.needsUpdate=$,Ve.type=q}function tn(w){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function on(w){let N=w.target;N.removeEventListener("dispose",on),xo(N)}function xo(w){dr(w),Y.remove(w)}function dr(w){let N=Y.get(w).programs;N!==void 0&&(N.forEach(function(Q){me.releaseProgram(Q)}),w.isShaderMaterial&&me.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,Q,$,q,xe){N===null&&(N=zt);let Ce=q.isMesh&&q.matrixWorld.determinantAffine()<0,_e=yt(w,N,Q,$,q);y.setMaterial($,Ce);let De=Q.index,Ue=1;if($.wireframe===!0){if(De=ee.getWireframeAttribute(Q),De===void 0)return;Ue=2}let it=Q.drawRange,Ke=Q.attributes.position,Ie=it.start*Ue,at=(it.start+it.count)*Ue;xe!==null&&(Ie=Math.max(Ie,xe.start*Ue),at=Math.min(at,(xe.start+xe.count)*Ue)),De!==null?(Ie=Math.max(Ie,0),at=Math.min(at,De.count)):Ke!=null&&(Ie=Math.max(Ie,0),at=Math.min(at,Ke.count));let It=at-Ie;if(It<0||It===1/0)return;we.setup(q,$,_e,Q,De);let je,st=be;if(De!==null&&(je=pe.get(De),st=se,st.setIndex(je)),q.isMesh)$.wireframe===!0?(y.setLineWidth($.wireframeLinewidth*_t()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(q.isLine){let St=$.linewidth;St===void 0&&(St=1),y.setLineWidth(St*_t()),q.isLineSegments?st.setMode(O.LINES):q.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else q.isPoints?st.setMode(O.POINTS):q.isSprite&&st.setMode(O.TRIANGLES);if(q.isBatchedMesh)if(mt.get("WEBGL_multi_draw"))st.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let St=q._multiDrawStarts,Re=q._multiDrawCounts,xt=q._multiDrawCount,ot=De?pe.get(De).bytesPerElement:1,Wt=Y.get($).currentProgram.getUniforms();for(let xn=0;xn<xt;xn++)Wt.setValue(O,"_gl_DrawID",xn),st.render(St[xn]/ot,Re[xn])}else if(q.isInstancedMesh)st.renderInstances(Ie,It,q.count);else if(Q.isInstancedBufferGeometry){let St=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Re=Math.min(Q.instanceCount,St);st.renderInstances(Ie,It,Re)}else st.render(Ie,It)};function fr(w,N,Q,$){U!==null&&w.isNodeMaterial&&U.setObject($,w),Pe===!0&&Be.setState(w,Q,!1),w.transparent===!0&&w.side===Bn&&w.forceSinglePass===!1?(w.side=$t,w.needsUpdate=!0,$e(w,N,$),w.side=fi,w.needsUpdate=!0,$e(w,N,$),w.side=Bn):$e(w,N,$)}this.compile=function(w,N,Q=null){Q===null&&(Q=w),U!==null&&U.renderStart(w,N,Q),b=ye.get(Q),b.init(N),g.push(b),Q.traverseVisible(function(q){q.isLight&&q.layers.test(N.layers)&&(b.pushLight(q),q.castShadow&&b.pushShadow(q))}),w!==Q&&w.traverseVisible(function(q){q.isLight&&q.layers.test(N.layers)&&(b.pushLight(q),q.castShadow&&b.pushShadow(q))}),b.setupLights(),U!==null&&U.updateLights(b.state.lightsArray),Ze=this.localClippingEnabled,Pe=Be.init(this.clippingPlanes,Ze),Pe===!0&&Be.setGlobalState(this.clippingPlanes,N),U!==null&&Ve.render(b.state.shadowsArray,Q,N);let $=new Set;return w.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let xe=q.material;if(xe)if(Array.isArray(xe))for(let Ce=0;Ce<xe.length;Ce++){let _e=xe[Ce];fr(_e,Q,N,q),$.add(_e)}else fr(xe,Q,N,q),$.add(xe)}),b=g.pop(),U!==null&&U.renderEnd(),$},this.compileAsync=function(w,N,Q=null){let $=this.compile(w,N,Q);return new Promise(q=>{function xe(){if($.forEach(function(Ce){let De=Y.get(Ce).currentProgram;(De===void 0||De.isReady())&&$.delete(Ce)}),$.size===0){q(w);return}setTimeout(xe,10)}mt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let bi=null;function pr(w){bi&&bi(w)}function Kn(){jn.stop()}function mr(){jn.start()}let jn=new Su;jn.setAnimationLoop(pr),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(w){bi=w,Fe.setAnimationLoop(w),w===null?jn.stop():jn.start()},Fe.addEventListener("sessionstart",Kn),Fe.addEventListener("sessionend",mr),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;U!==null&&U.renderStart(w,N);let Q=Fe.enabled===!0&&Fe.isPresenting===!0,$=E!==null&&(ie===null||Q)&&E.begin(I,ie);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(N),N=Fe.getCamera()),w.isScene===!0&&w.onBeforeRender(I,w,N,ie),b=ye.get(w,g.length),b.init(N),b.state.textureUnits=te.getTextureUnits(),g.push(b),Ge.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Le.setFromProjectionMatrix(Ge,Rn,N.reversedDepth),Ze=this.localClippingEnabled,Pe=Be.init(this.clippingPlanes,Ze),x=ge.get(w,T.length),x.init(),T.push(x),Fe.enabled===!0&&Fe.isPresenting===!0){let Ce=I.xr.getDepthSensingMesh();Ce!==null&&z(Ce,N,-1/0,I.sortObjects)}z(w,N,0,I.sortObjects),x.finish(),U!==null&&U.updateLights(b.state.lightsArray),I.sortObjects===!0&&x.sort(he,Me),Tt=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,Tt&&Xe.addToRenderList(x,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&Be.beginShadows();let q=b.state.shadowsArray;if(Ve.render(q,w,N),Pe===!0&&Be.endShadows(),($&&E.hasRenderPass())===!1){let Ce=x.opaque,_e=x.transmissive;if(b.setupLights(),N.isArrayCamera){let De=N.cameras;if(_e.length>0)for(let Ue=0,it=De.length;Ue<it;Ue++){let Ke=De[Ue];Se(Ce,_e,w,Ke)}Tt&&Xe.render(w);for(let Ue=0,it=De.length;Ue<it;Ue++){let Ke=De[Ue];le(x,w,Ke,Ke.viewport)}}else _e.length>0&&Se(Ce,_e,w,N),Tt&&Xe.render(w),le(x,w,N)}ie!==null&&H===0&&(te.updateMultisampleRenderTarget(ie),te.updateRenderTargetMipmap(ie)),$&&E.end(I),w.isScene===!0&&w.onAfterRender(I,w,N),we.resetDefaultState(),j=-1,F=null,g.pop(),g.length>0?(b=g[g.length-1],te.setTextureUnits(b.state.textureUnits),Pe===!0&&Be.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,T.pop(),T.length>0?x=T[T.length-1]:x=null,U!==null&&U.renderEnd()};function z(w,N,Q,$){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)Q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Le)){$&&Rt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ge);let Ce=re.update(w),_e=w.material;_e.visible&&x.push(w,Ce,_e,Q,Rt.z,null,N)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Le))){let Ce=re.update(w),_e=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Rt.copy(w.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Rt.copy(Ce.boundingSphere.center)),Rt.applyMatrix4(w.matrixWorld).applyMatrix4(Ge)),Array.isArray(_e)){let De=Ce.groups;for(let Ue=0,it=De.length;Ue<it;Ue++){let Ke=De[Ue],Ie=_e[Ke.materialIndex];Ie&&Ie.visible&&x.push(w,Ce,Ie,Q,Rt.z,Ke,N)}}else _e.visible&&x.push(w,Ce,_e,Q,Rt.z,null,N)}}let xe=w.children;for(let Ce=0,_e=xe.length;Ce<_e;Ce++)z(xe[Ce],N,Q,$)}function le(w,N,Q,$){let{opaque:q,transmissive:xe,transparent:Ce}=w;b.setupLightsView(Q),Pe===!0&&Be.setGlobalState(I.clippingPlanes,Q),$&&y.viewport(L.copy($)),q.length>0&&Ne(q,N,Q),xe.length>0&&Ne(xe,N,Q),Ce.length>0&&Ne(Ce,N,Q),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Se(w,N,Q,$){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[$.id]===void 0){let Ie=mt.has("EXT_color_buffer_half_float")||mt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[$.id]=new Ft(1,1,{generateMipmaps:!0,type:Ie?qt:vn,minFilter:gi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}let xe=b.state.transmissionRenderTarget[$.id],Ce=$.viewport||L;xe.setSize(Ce.z*I.transmissionResolutionScale,Ce.w*I.transmissionResolutionScale);let _e=I.getRenderTarget(),De=I.getActiveCubeFace(),Ue=I.getActiveMipmapLevel();I.setRenderTarget(xe),I.getClearColor(Ae),G=I.getClearAlpha(),G<1&&I.setClearColor(16777215,.5),I.clear(),Tt&&Xe.render(Q);let it=I.toneMapping;I.toneMapping=In;let Ke=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),b.setupLightsView($),Pe===!0&&Be.setGlobalState(I.clippingPlanes,$),Ne(w,Q,$),te.updateMultisampleRenderTarget(xe),te.updateRenderTargetMipmap(xe),mt.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let at=0,It=N.length;at<It;at++){let je=N[at],{object:st,geometry:St,material:Re,group:xt}=je;if(Re.side===Bn&&st.layers.test($.layers)){let ot=Re.side;Re.side=$t,Re.needsUpdate=!0,Je(st,Q,$,St,Re,xt),Re.side=ot,Re.needsUpdate=!0,Ie=!0}}Ie===!0&&(te.updateMultisampleRenderTarget(xe),te.updateRenderTargetMipmap(xe))}I.setRenderTarget(_e,De,Ue),I.setClearColor(Ae,G),Ke!==void 0&&($.viewport=Ke),I.toneMapping=it}function Ne(w,N,Q){let $=N.isScene===!0?N.overrideMaterial:null;for(let q=0,xe=w.length;q<xe;q++){let Ce=w[q],{object:_e,geometry:De,group:Ue}=Ce,it=Ce.material;it.allowOverride===!0&&$!==null&&(it=$),_e.layers.test(Q.layers)&&Je(_e,N,Q,De,it,Ue)}}function Je(w,N,Q,$,q,xe){U!==null&&q.isNodeMaterial&&U.setObject(w,q),w.onBeforeRender(I,N,Q,$,q,xe),w.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),q.onBeforeRender(I,N,Q,$,w,xe),q.transparent===!0&&q.side===Bn&&q.forceSinglePass===!1?(q.side=$t,q.needsUpdate=!0,I.renderBufferDirect(Q,N,$,q,w,xe),q.side=fi,q.needsUpdate=!0,I.renderBufferDirect(Q,N,$,q,w,xe),q.side=Bn):I.renderBufferDirect(Q,N,$,q,w,xe),w.onAfterRender(I,N,Q,$,q,xe)}function $e(w,N,Q){N.isScene!==!0&&(N=zt);let $=Y.get(w),q=b.state.lights,xe=b.state.shadowsArray,Ce=q.state.version,_e=me.getParameters(w,q.state,xe,N,Q,b.state.lightProbeGridArray),De=me.getProgramCacheKey(_e),Ue=$.programs;$.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?N.environment:null,$.fog=N.fog;let it=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;$.envMap=fe.get(w.envMap||$.environment,it),$.envMapRotation=$.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Ue===void 0&&(w.addEventListener("dispose",on),Ue=new Map,$.programs=Ue);let Ke=Ue.get(De);if(Ke!==void 0){if($.currentProgram===Ke&&$.lightsStateVersion===Ce)return Lt(w,_e),Ke}else _e.uniforms=me.getUniforms(w),U!==null&&w.isNodeMaterial&&U.build(w,Q,_e),w.onBeforeCompile(_e,I),Ke=me.acquireProgram(_e,De),Ue.set(De,Ke),$.uniforms=_e.uniforms;let Ie=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ie.clippingPlanes=Be.uniform),Lt(w,_e),$.needsLights=Te(w),$.lightsStateVersion=Ce,$.needsLights&&(Ie.ambientLightColor.value=q.state.ambient,Ie.lightProbe.value=q.state.probe,Ie.sunLights.value=q.state.sun,Ie.sunLightShadows.value=q.state.sunShadow,Ie.directionalLights.value=q.state.directional,Ie.directionalLightShadows.value=q.state.directionalShadow,Ie.spotLights.value=q.state.spot,Ie.spotLightShadows.value=q.state.spotShadow,Ie.rectAreaLights.value=q.state.rectArea,Ie.ltc_1.value=q.state.rectAreaLTC1,Ie.ltc_2.value=q.state.rectAreaLTC2,Ie.pointLights.value=q.state.point,Ie.pointLightShadows.value=q.state.pointShadow,Ie.hemisphereLights.value=q.state.hemi,Ie.sunShadowMatrix.value=q.state.sunShadowMatrix,Ie.sunShadowCascade.value=q.state.sunShadowCascade,Ie.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ie.spotLightMatrix.value=q.state.spotLightMatrix,Ie.spotLightMap.value=q.state.spotLightMap,Ie.pointShadowMatrix.value=q.state.pointShadowMatrix),$.lightProbeGrid=b.state.lightProbeGridArray.length>0,$.currentProgram=Ke,$.uniformsList=null,Ke}function ut(w){if(w.uniformsList===null){let N=w.currentProgram.getUniforms();w.uniformsList=fs.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Lt(w,N){let Q=Y.get(w);Q.outputColorSpace=N.outputColorSpace,Q.batching=N.batching,Q.batchingColor=N.batchingColor,Q.instancing=N.instancing,Q.instancingColor=N.instancingColor,Q.instancingMorph=N.instancingMorph,Q.skinning=N.skinning,Q.morphTargets=N.morphTargets,Q.morphNormals=N.morphNormals,Q.morphColors=N.morphColors,Q.morphTargetsCount=N.morphTargetsCount,Q.numClippingPlanes=N.numClippingPlanes,Q.numIntersection=N.numClipIntersection,Q.vertexAlphas=N.vertexAlphas,Q.vertexTangents=N.vertexTangents,Q.toneMapping=N.toneMapping}function ke(w,N){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(N.matrixWorld);for(let Q=0,$=w.length;Q<$;Q++){let q=w[Q];if(q.texture!==null&&q.boundingBox.containsPoint(_))return q}return null}function yt(w,N,Q,$,q){N.isScene!==!0&&(N=zt),te.resetTextureUnits();let xe=N.fog,Ce=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?N.environment:null,_e=ie===null?I.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ct.workingColorSpace,De=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ue=fe.get($.envMap||Ce,De),it=$.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Ke=!!Q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ie=!!Q.morphAttributes.position,at=!!Q.morphAttributes.normal,It=!!Q.morphAttributes.color,je=In;$.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(je=I.toneMapping);let st=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,St=st!==void 0?st.length:0,Re=Y.get($),xt=b.state.lights;if(Pe===!0&&(Ze===!0||w!==F)){let wt=w===F&&$.id===j;Be.setState($,w,wt)}let ot=!1;$.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==xt.state.version||Re.outputColorSpace!==_e||q.isBatchedMesh&&Re.batching===!1||!q.isBatchedMesh&&Re.batching===!0||q.isBatchedMesh&&Re.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Re.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Re.instancing===!1||!q.isInstancedMesh&&Re.instancing===!0||q.isSkinnedMesh&&Re.skinning===!1||!q.isSkinnedMesh&&Re.skinning===!0||q.isInstancedMesh&&Re.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Re.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Re.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Re.instancingMorph===!1&&q.morphTexture!==null||Re.envMap!==Ue||$.fog===!0&&Re.fog!==xe||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==Be.numPlanes||Re.numIntersection!==Be.numIntersection)||Re.vertexAlphas!==it||Re.vertexTangents!==Ke||Re.morphTargets!==Ie||Re.morphNormals!==at||Re.morphColors!==It||Re.toneMapping!==je||Re.morphTargetsCount!==St||!!Re.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,Re.__version=$.version);let Wt=Re.currentProgram;ot===!0&&(Wt=$e($,N,q),U&&$.isNodeMaterial&&U.onUpdateProgram($,Wt,Re));let xn=!1,wn=!1,Fi=!1,bt=Wt.getUniforms(),Dt=Re.uniforms;if(y.useProgram(Wt.program)&&(xn=!0,wn=!0,Fi=!0),$.id!==j&&(j=$.id,wn=!0),Re.needsLights){let wt=ke(b.state.lightProbeGridArray,q);Re.lightProbeGrid!==wt&&(Re.lightProbeGrid=wt,wn=!0)}if(xn||F!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),bt.setValue(O,"projectionMatrix",w.projectionMatrix),bt.setValue(O,"viewMatrix",w.matrixWorldInverse);let ei=bt.map.cameraPosition;ei!==void 0&&ei.setValue(O,lt.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&bt.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&bt.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),F!==w&&(F=w,wn=!0,Fi=!0)}if(Re.needsLights&&(xt.state.sunShadowMap.length>0&&bt.setValue(O,"sunShadowMap",xt.state.sunShadowMap,te),xt.state.directionalShadowMap.length>0&&bt.setValue(O,"directionalShadowMap",xt.state.directionalShadowMap,te),xt.state.spotShadowMap.length>0&&bt.setValue(O,"spotShadowMap",xt.state.spotShadowMap,te),xt.state.pointShadowMap.length>0&&bt.setValue(O,"pointShadowMap",xt.state.pointShadowMap,te)),q.isSkinnedMesh){bt.setOptional(O,q,"bindMatrix"),bt.setOptional(O,q,"bindMatrixInverse");let wt=q.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),bt.setValue(O,"boneTexture",wt.boneTexture,te))}q.isBatchedMesh&&(bt.setOptional(O,q,"batchingTexture"),bt.setValue(O,"batchingTexture",q._matricesTexture,te),bt.setOptional(O,q,"batchingIdTexture"),bt.setValue(O,"batchingIdTexture",q._indirectTexture,te),bt.setOptional(O,q,"batchingColorTexture"),q._colorsTexture!==null&&bt.setValue(O,"batchingColorTexture",q._colorsTexture,te));let Qn=Q.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&D.update(q,Q,Wt),(wn||Re.receiveShadow!==q.receiveShadow)&&(Re.receiveShadow=q.receiveShadow,bt.setValue(O,"receiveShadow",q.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&N.environment!==null&&(Dt.envMapIntensity.value=N.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=Dg()),wn){if(bt.setValue(O,"toneMappingExposure",I.toneMappingExposure),Re.needsLights&&nn(Dt,Fi),xe&&$.fog===!0&&Oe.refreshFogUniforms(Dt,xe),Oe.refreshMaterialUniforms(Dt,$,J,B,b.state.transmissionRenderTarget[w.id]),Re.needsLights&&Re.lightProbeGrid){let wt=Re.lightProbeGrid;Dt.probesSH.value=wt.texture,Dt.probesMin.value.copy(wt.boundingBox.min),Dt.probesMax.value.copy(wt.boundingBox.max),Dt.probesResolution.value.copy(wt.resolution)}fs.upload(O,ut(Re),Dt,te)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(fs.upload(O,ut(Re),Dt,te),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&bt.setValue(O,"center",q.center),bt.setValue(O,"modelViewMatrix",q.modelViewMatrix),bt.setValue(O,"normalMatrix",q.normalMatrix),bt.setValue(O,"modelMatrix",q.matrixWorld),$.uniformsGroups!==void 0){let wt=$.uniformsGroups;for(let ei=0,Oi=wt.length;ei<Oi;ei++){let Ol=wt[ei];oe.update(Ol,Wt),oe.bind(Ol,Wt)}}return Wt}function nn(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.sunLights.needsUpdate=N,w.sunLightShadows.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function Te(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(w,N,Q){let $=Y.get(w);$.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Y.get(w.texture).__webglTexture=N,Y.get(w.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Q,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){let Q=Y.get(w);Q.__webglFramebuffer=N,Q.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,Q=0){ie=w,Z=N,H=Q;let $=null,q=!1,xe=!1;if(w){let _e=Y.get(w);if(_e.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(O.FRAMEBUFFER,_e.__webglFramebuffer),L.copy(w.viewport),ae.copy(w.scissor),ne=w.scissorTest,y.viewport(L),y.scissor(ae),y.setScissorTest(ne),j=-1;return}else if(_e.__webglFramebuffer===void 0)te.setupRenderTarget(w);else if(_e.__hasExternalTextures)te.rebindTextures(w,Y.get(w.texture).__webglTexture,Y.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let it=w.depthTexture;if(_e.__boundDepthTexture!==it){if(it!==null&&Y.has(it)&&(w.width!==it.image.width||w.height!==it.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(w)}}let De=w.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(xe=!0);let Ue=Y.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ue[N])?$=Ue[N][Q]:$=Ue[N],q=!0):w.samples>0&&te.useMultisampledRTT(w)===!1?$=Y.get(w).__webglMultisampledFramebuffer:Array.isArray(Ue)?$=Ue[Q]:$=Ue,L.copy(w.viewport),ae.copy(w.scissor),ne=w.scissorTest}else L.copy(de).multiplyScalar(J).floor(),ae.copy(He).multiplyScalar(J).floor(),ne=nt;if(Q!==0&&($=k),y.bindFramebuffer(O.FRAMEBUFFER,$)&&y.drawBuffers(w,$),y.viewport(L),y.scissor(ae),y.setScissorTest(ne),q){let _e=Y.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,_e.__webglTexture,Q)}else if(xe){let _e=N;for(let De=0;De<w.textures.length;De++){let Ue=Y.get(w.textures[De]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+De,Ue.__webglTexture,Q,_e)}}else if(w!==null&&Q!==0){let _e=Y.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,_e.__webglTexture,Q)}j=-1};function Yt(w){let N=Y.get(w);return(N.__readFormat!==w.format||N.__readType!==w.type)&&(N.__readFormat=w.format,N.__readType=w.type,N.__formatReadable=C.textureFormatReadable(w.format),N.__typeReadable=C.textureTypeReadable(w.type)),N}this.readRenderTargetPixels=function(w,N,Q,$,q,xe,Ce,_e=0){if(!(w&&w.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Y.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ce!==void 0&&(De=De[Ce]),De){y.bindFramebuffer(O.FRAMEBUFFER,De);try{let Ue=w.textures[_e],it=Ue.format,Ke=Ue.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+_e);let Ie=Yt(Ue);if(Ie.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-$&&Q>=0&&Q<=w.height-q&&O.readPixels(N,Q,$,q,ve.convert(it),ve.convert(Ke),xe)}finally{let Ue=ie!==null?Y.get(ie).__webglFramebuffer:null;y.bindFramebuffer(O.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(w,N,Q,$,q,xe,Ce,_e=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Y.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ce!==void 0&&(De=De[Ce]),De)if(N>=0&&N<=w.width-$&&Q>=0&&Q<=w.height-q){y.bindFramebuffer(O.FRAMEBUFFER,De);let Ue=w.textures[_e],it=Ue.format,Ke=Ue.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+_e);let Ie=Yt(Ue);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,at),O.bufferData(O.PIXEL_PACK_BUFFER,xe.byteLength,O.STREAM_READ),O.readPixels(N,Q,$,q,ve.convert(it),ve.convert(Ke),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let It=ie!==null?Y.get(ie).__webglFramebuffer:null;y.bindFramebuffer(O.FRAMEBUFFER,It);let je=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Kc(O,je,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,at),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xe),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(at),O.deleteSync(je),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,Q=0){let $=Math.pow(2,-Q),q=Math.floor(w.image.width*$),xe=Math.floor(w.image.height*$),Ce=N!==null?N.x:0,_e=N!==null?N.y:0;te.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,Q,0,0,Ce,_e,q,xe),y.unbindTexture()},this.copyTextureToTexture=function(w,N,Q=null,$=null,q=0,xe=0){let Ce,_e,De,Ue,it,Ke,Ie,at,It,je=w.isCompressedTexture?w.mipmaps[xe]:w.image;if(Q!==null)Ce=Q.max.x-Q.min.x,_e=Q.max.y-Q.min.y,De=Q.isBox3?Q.max.z-Q.min.z:1,Ue=Q.min.x,it=Q.min.y,Ke=Q.isBox3?Q.min.z:0;else{let Dt=Math.pow(2,-q);Ce=Math.floor(je.width*Dt),_e=Math.floor(je.height*Dt),w.isDataArrayTexture?De=je.depth:w.isData3DTexture?De=Math.floor(je.depth*Dt):De=1,Ue=0,it=0,Ke=0}$!==null?(Ie=$.x,at=$.y,It=$.z):(Ie=0,at=0,It=0);let st=ve.convert(N.format),St=ve.convert(N.type),Re;N.isData3DTexture?(te.setTexture3D(N,0),Re=O.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(te.setTexture2DArray(N,0),Re=O.TEXTURE_2D_ARRAY):(te.setTexture2D(N,0),Re=O.TEXTURE_2D),y.activeTexture(O.TEXTURE0),y.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,N.flipY),y.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),y.pixelStorei(O.UNPACK_ALIGNMENT,N.unpackAlignment);let xt=y.getParameter(O.UNPACK_ROW_LENGTH),ot=y.getParameter(O.UNPACK_IMAGE_HEIGHT),Wt=y.getParameter(O.UNPACK_SKIP_PIXELS),xn=y.getParameter(O.UNPACK_SKIP_ROWS),wn=y.getParameter(O.UNPACK_SKIP_IMAGES);y.pixelStorei(O.UNPACK_ROW_LENGTH,je.width),y.pixelStorei(O.UNPACK_IMAGE_HEIGHT,je.height),y.pixelStorei(O.UNPACK_SKIP_PIXELS,Ue),y.pixelStorei(O.UNPACK_SKIP_ROWS,it),y.pixelStorei(O.UNPACK_SKIP_IMAGES,Ke);let Fi=w.isDataArrayTexture||w.isData3DTexture,bt=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){let Dt=Y.get(w),Qn=Y.get(N),wt=Y.get(Dt.__renderTarget),ei=Y.get(Qn.__renderTarget);y.bindFramebuffer(O.READ_FRAMEBUFFER,wt.__webglFramebuffer),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,ei.__webglFramebuffer);for(let Oi=0;Oi<De;Oi++)Fi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Y.get(w).__webglTexture,q,Ke+Oi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Y.get(N).__webglTexture,xe,It+Oi)),O.blitFramebuffer(Ue,it,Ce,_e,Ie,at,Ce,_e,O.DEPTH_BUFFER_BIT,O.NEAREST);y.bindFramebuffer(O.READ_FRAMEBUFFER,null),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(q!==0||w.isRenderTargetTexture||Y.has(w)){let Dt=Y.get(w),Qn=Y.get(N);y.bindFramebuffer(O.READ_FRAMEBUFFER,P),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,X);for(let wt=0;wt<De;wt++)Fi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Dt.__webglTexture,q,Ke+wt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Dt.__webglTexture,q),bt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qn.__webglTexture,xe,It+wt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qn.__webglTexture,xe),q!==0?O.blitFramebuffer(Ue,it,Ce,_e,Ie,at,Ce,_e,O.COLOR_BUFFER_BIT,O.NEAREST):bt?O.copyTexSubImage3D(Re,xe,Ie,at,It+wt,Ue,it,Ce,_e):O.copyTexSubImage2D(Re,xe,Ie,at,Ue,it,Ce,_e);y.bindFramebuffer(O.READ_FRAMEBUFFER,null),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else bt?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Re,xe,Ie,at,It,Ce,_e,De,st,St,je.data):N.isCompressedArrayTexture?O.compressedTexSubImage3D(Re,xe,Ie,at,It,Ce,_e,De,st,je.data):O.texSubImage3D(Re,xe,Ie,at,It,Ce,_e,De,st,St,je):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xe,Ie,at,Ce,_e,st,St,je.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xe,Ie,at,je.width,je.height,st,je.data):O.texSubImage2D(O.TEXTURE_2D,xe,Ie,at,Ce,_e,st,St,je);y.pixelStorei(O.UNPACK_ROW_LENGTH,xt),y.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ot),y.pixelStorei(O.UNPACK_SKIP_PIXELS,Wt),y.pixelStorei(O.UNPACK_SKIP_ROWS,xn),y.pixelStorei(O.UNPACK_SKIP_IMAGES,wn),xe===0&&N.generateMipmaps&&O.generateMipmap(Re),y.unbindTexture()},this.initRenderTarget=function(w){Y.get(w).__webglFramebuffer===void 0&&te.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?te.setTextureCube(w,0):w.isData3DTexture?te.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?te.setTexture2DArray(w,0):te.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){Z=0,H=0,ie=null,y.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}};var ms={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var rn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Ng=new Ci(-1,1,1,-1,0,1),Pl=class extends jt{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}},Ug=new Pl,_i=class{constructor(e){this._mesh=new Qt(Ug,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ng)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var uo=class extends rn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Jn.clone(e.uniforms),this.material=new Ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new _i(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ur=class extends rn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},ho=class extends rn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var fo=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new qe);this._width=n.width,this._height=n.height,t=new Ft(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:qt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uo(ms),this.copyPass.material.blending=yn,this.timer=new Ws}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ur!==void 0&&(a instanceof ur?n=!0:a instanceof ho&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new qe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var po=class extends rn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new tt}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var mo=class extends rn{constructor(e=0,t=0){super(),this.needsSwap=!1,this.clearColor=e,this.clearAlpha=t,this._oldClearColor=new tt}render(e,t,n){let s;this.clearColor&&(e.getClearColor(this._oldClearColor),s=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),e.setRenderTarget(this.renderToScreen?null:n),e.clear(),this.clearColor&&e.setClearColor(this._oldClearColor,s)}};var Iu={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new tt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var gs=class i extends rn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new qe(e.x,e.y):new qe(256,256),this.clearColor=new tt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ft(r,a,{type:qt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Ft(r,a,{type:qt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let h=new Ft(r,a,{type:qt,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}let o=Iu;this.highPassUniforms=Jn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ct({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new qe(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Jn.clone(ms.uniforms),this.blendMaterial=new Ct({uniforms:this.copyUniforms,vertexShader:ms.vertexShader,fragmentShader:ms.fragmentShader,premultipliedAlpha:!0,blending:pi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new tt,this._oldClearAlpha=1,this._basic=new Ai,this._fsQuad=new _i(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new qe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let s=[],r=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new Ct({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new qe(.5,.5)},direction:{value:new qe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Ct({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};gs.BlurDirectionX=new qe(1,0);gs.BlurDirectionY=new qe(0,1);var hr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var go=class extends rn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Jn.clone(hr.uniforms),this.material=new rs({name:hr.name,uniforms:this.uniforms,vertexShader:hr.vertexShader,fragmentShader:hr.fragmentShader}),this._fsQuad=new _i(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ct.getTransfer(this._outputColorSpace)===vt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$s?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qs?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ys?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ii?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Js?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ks?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Zs&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function Ni(i){let e=i>>>0,t=()=>{e=e+1831565813>>>0;let n=e;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296};return t.gauss=()=>{let n=Math.max(t(),1e-9),s=t();return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*s)},t.range=(n,s)=>n+(s-n)*t(),t.dir=()=>{let n=2*t()-1,s=2*Math.PI*t(),r=Math.sqrt(1-n*n);return[r*Math.cos(s),n,r*Math.sin(s)]},t}var Ui={all:{label:"All light",w:[0,1,.8,1,1]},alldm:{label:"All",w:[.7,1,.6,.8,.9]},dm:{label:"Dark matter",w:[1,0,0,0,0]},stars:{label:"Starlight",w:[0,1,0,0,0]},cold:{label:"Cold gas",w:[0,.12,1,0,0]},warm:{label:"Warm gas",w:[0,.12,0,1,0]},hot:{label:"Hot gas",w:[0,.12,0,0,1]},absorb:{label:"All light",w:[0,.55,.35,.22,.3]},galaxy:{label:"All light",w:[0,1,.6,.3,.35]},accrete:{label:"All light",w:[0,.45,1,.12,.7]}},dt={uTime:{value:0},uScreen:{value:1e3},uW1:{value:new W(0,1,.8)},uW2:{value:new qe(1,1)},uKeep:{value:1},uSteps:{value:30},uMorph:{value:0},uCdm:{value:new W(.34,.42,.85)},uCstar:{value:new W(1,.88,.72)},uCcold:{value:new W(.12,.95,.82)},uCwarm:{value:new W(1,.22,.52)},uChot:{value:new W(.52,.36,1)}},Pu=()=>({uTime:dt.uTime,uScreen:dt.uScreen,uW1:dt.uW1,uW2:dt.uW2,uKeep:dt.uKeep,uSteps:dt.uSteps,uCdm:dt.uCdm,uCcold:dt.uCcold,uCwarm:dt.uCwarm,uChot:dt.uChot,uCstar:dt.uCstar}),Fg=`
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
  a *= 1.0 - smoothstep(60.0, 260.0, s);
  // Foreground clutter much nearer than the focus (flying through a disk) fades away.
  a *= smoothstep(0.15 * uNear, 0.55 * uNear, -mv.z);
  if (s < 1.6) { a *= s * s / 2.56; s = 1.6; }
  gl_PointSize = min(s, 300.0);
  vC = uKeep < 1.0 ? c * a / uKeep : c * a;
}`,Og=`
varying vec3 vC;
void main() {
  vec2 d = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(d, d);
  if (r2 > 1.0) discard;
  gl_FragColor = vec4(vC * exp(-r2 * 4.0), 1.0);
}`;function an({size:i=1,gain:e=1,morph:t=null}={}){return new Ct({uniforms:{...Pu(),uOpacity:{value:1},uSizeMul:{value:i},uGain:{value:e},uMorph:t||{value:0},uNear:{value:0},uCut:{value:0}},vertexShader:Fg,fragmentShader:Og,transparent:!0,depthWrite:!1,depthTest:!1,blending:pi})}var Mt=class{constructor(){this.a={position:[],aCol:[],aCol2:[],aB1:[],aB2:[],aSize:[],aPos2:[],aVel:[],aAcc:[],aTm:[],aMf:[]},this.n=0}add(e,t){let n=this.a,s=t.col||[1,1,1],r=t.b;n.position.push(e[0],e[1],e[2]),n.aCol.push(s[0],s[1],s[2]);let a=t.col2||s;n.aCol2.push(a[0],a[1],a[2]),n.aB1.push(r[0],r[1],r[2]),n.aB2.push(r[3],r[4]),n.aSize.push(t.size);let o=t.pos2||e;n.aPos2.push(o[0],o[1],o[2]);let l=t.vel||[0,0,0],c=t.acc||[0,0,0];n.aVel.push(l[0],l[1],l[2]),n.aAcc.push(c[0],c[1],c[2]),n.aTm.push(t.rate||0,t.phase||0);let u=t.mf||[0,0];n.aMf.push(u[0],u[1]),this.n++}build(e){let t=new jt,n={position:3,aCol:3,aCol2:3,aB1:3,aB2:2,aSize:1,aPos2:3,aVel:3,aAcc:3,aTm:2,aMf:2};for(let r in n)t.setAttribute(r,new Ut(this.a[r],n[r]));t.boundingSphere=new Yn(new W,1e9);let s=new Os(t,e);return s.frustumCulled=!1,s}},kg=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,Bg=`
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
}`,zg=new Vs(1,40,28),Lu=[],Mn=Math.fround;function Du(){let i=dt.uW1.value,e=dt.uW2.value;for(let t of Lu){let n=t.material.uniforms,s=n.uA1.value,r=n.uA2.value,a=Mn(n.uGain.value)===0||Mn(n.uOpacity.value)===0||Mn(s.x*Mn(i.x))===0&&Mn(s.y*Mn(i.y))===0&&Mn(s.z*Mn(i.z))===0&&Mn(r.x*Mn(e.x))===0&&Mn(r.y*Mn(e.y))===0;t.layers.mask=a?2:1}}function Sn(i){let e={beta:0,shell:1,uniform:2},t=i.amp,n=new Ct({uniforms:{...Pu(),uCenter:{value:new W(...i.center)},uR:{value:i.R},uType:{value:e[i.type||"beta"]},uRc:{value:i.rc??.15},uBeta:{value:i.beta??.6},uInner:{value:i.inner??.9},uWidth:{value:i.width??.06},uNoise:{value:i.noise??0},uNoiseScale:{value:i.noiseScale??3},uSeed:{value:i.seed??0},uA1:{value:new W(t[0],t[1],t[2])},uA2:{value:new qe(t[3],t[4])},uGain:{value:i.gain??1},uOpacity:{value:1}},vertexShader:kg,fragmentShader:Bg,side:$t,transparent:!0,depthWrite:!1,depthTest:!1,blending:pi}),s=new Qt(zg,n);return s.position.set(...i.center),s.scale.setScalar(i.R),s.frustumCulled=!1,s.setRadius=r=>{s.scale.setScalar(r),n.uniforms.uR.value=r},Lu.push(s),s}var K={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],len:i=>Math.hypot(i[0],i[1],i[2]),norm:i=>{let e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},cross:(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t]};function vo(i){let e=Math.abs(i[1])<.9?[0,1,0]:[1,0,0],t=K.norm(K.cross(i,e));return[t,K.cross(i,t)]}function Nu(i,e,t){let s=new At().makeRotationFromEuler(new kn(i,e,t)).elements;return r=>[s[0]*r[0]+s[4]*r[1]+s[8]*r[2],s[1]*r[0]+s[5]*r[1]+s[9]*r[2],s[2]*r[0]+s[6]*r[1]+s[10]*r[2]]}function Uu(){let i=Ni(7),e=85,t=[{p:[0,0,0],m:.45}];for(;t.length<85;){let F=[i.range(-e,e),i.range(-e,e),i.range(-e,e)];t.every(L=>K.len(K.sub(L.p,F))>13)&&t.push({p:F,m:.12+.88*i()**3})}let n=new Map;t.forEach((F,L)=>{let ae=F.m>.5?4:3;t.map((ne,Ae)=>[Ae,K.len(K.sub(ne.p,F.p))]).filter(([ne])=>ne!==L).sort((ne,Ae)=>ne[1]-Ae[1]).slice(0,ae).forEach(([ne,Ae])=>{Ae<42&&n.set(L<ne?`${L}-${ne}`:`${ne}-${L}`,[Math.min(L,ne),Math.max(L,ne)])})});let s=new Mt,r=new Mt,a=[1,1,1],o=[];for(let[F,L]of n.values()){let ae=t[F],ne=t[L],Ae=K.sub(ne.p,ae.p),G=K.len(Ae),[ue,B]=vo(K.norm(Ae)),J=K.add(K.mul(ue,i.gauss()*.12*G),K.mul(B,i.gauss()*.12*G)),he=K.add(K.lerp(ae.p,ne.p,.5),J),Me=Le=>K.add(K.add(K.mul(ae.p,(1-Le)**2),K.mul(he,2*Le*(1-Le))),K.mul(ne.p,Le*Le)),de=(ae.m+ne.m)/2,He=.45+.9*de;o.push({i:F,j:L,curve:Me,L:G});let nt=Math.round(G*70*(.45+de));for(let Le=0;Le<nt;Le++){let Pe=i(),Ze=Me(Pe),Ge=He*(.6+.8*Math.sin(Math.PI*Pe)**.5),lt=K.add(Ze,K.add(K.mul(ue,i.gauss()*Ge),K.mul(B,i.gauss()*Ge)));s.add(lt,{col:a,b:[.05,0,0,0,0],size:.7}),i()<.12&&s.add(lt,{b:[0,0,0,0,.045],size:2.4}),i()<.022&&K.len(lt)>4&&r.add(lt,{col:i()<.6?[.75,.85,1]:[1,.85,.65],b:[0,1.6,.6,0,0],size:.06})}}t.forEach((F,L)=>{let ae=Math.round(1200+9e3*F.m),ne=.7+2*F.m;for(let Ae=0;Ae<ae;Ae++){let G=ne*(i()<.5?.45:1),ue=[F.p[0]+i.gauss()*G,F.p[1]+i.gauss()*G,F.p[2]+i.gauss()*G];s.add(ue,{col:a,b:[.07,0,0,0,0],size:.6}),i()<.035&&K.len(ue)>4&&r.add(ue,{col:i()<.25?[.8,.88,1]:[1,.8,.58],b:[0,1.8,.2,0,0],size:.06})}});for(let F=0;F<9e3;F++)s.add([i.range(-e,e),i.range(-e,e),i.range(-e,e)],{col:a,b:[.03,0,0,0,0],size:.8});let l=new pn,c=s.build(an({gain:.22})),u=r.build(an({gain:2.4}));l.add(c,u);let d=[];t.forEach((F,L)=>{if(L===0||F.m<.4)return;let ae=Sn({center:F.p,R:3.5+5*F.m,type:"beta",rc:.22,beta:.65,amp:[0,0,0,0,1],gain:.8*F.m,noise:.25,noiseScale:2.5,seed:L});d.push(ae),l.add(ae)});let h=t.slice(1).reduce((F,L)=>L.m>F.m?L:F),p=o.find(F=>F.L>25)||o[0],v=[0,0,0],S=0;for(let F=0;F<4e3;F++){let L=[i.range(-50,50),i.range(-50,50),i.range(-50,50)],ae=Math.min(...t.map(ne=>K.len(K.sub(ne.p,L))));ae>S&&(S=ae,v=L)}let m=o.filter(F=>F.i===0).map(F=>K.norm(K.sub(F.curve(.1),F.curve(0)))),f=[{kind:"label",text:"Knot",pos:h.p,zr:[7.2,9],stops:["02"]},{kind:"label",text:"Filament",pos:p.curve(.5),zr:[7.2,9],stops:["02"]},{kind:"label",text:"Void",pos:v,zr:[7.2,9],stops:["02"]},{kind:"image",text:"Bullet Cluster",pos:K.add(h.p,[0,7,0]),zr:[7.2,9],stops:[],img:"bullet-cluster",caption:'Two colliding galaxy clusters. Stars (optical), hot gas (pink, X-ray) and dark matter (blue, from gravitational lensing) have separated: three kinds of "eyes" on one object.',credit:"X-ray: NASA/CXC/CfA/M.Markevitch; Optical & lensing: NASA/STScI, Magellan/U.Arizona/D.Clowe; ESO WFI"}],M=t.slice(1).filter(F=>{let L=K.len(F.p);return L>55&&L<80}).sort((F,L)=>Math.abs(F.p[1])-Math.abs(L.p[1]))[0].p,A=3e3,_=new Mt;for(let F=0;F<A;F++)_.add(K.lerp(M,[0,0,0],F/(A-1)),{col:[1,.55,.3],b:[0,1.4,0,0,0],size:.2});let x=_.build(an({gain:0}));x.geometry.setDrawRange(0,0);let b=new Mt;b.add([0,0,0],{col:[1,.7,.45],b:[0,1,0,0,0],size:2.2});let T=b.build(an({gain:0})),g=new Mt;g.add(M,{col:[1,.8,.6],b:[0,1,0,0,0],size:9});let E=g.build(an({gain:0}));l.add(x,T,E);let I=s.a.position,R=2.5,U=new Map;for(let F=0;F<I.length;F+=3){let L=`${Math.floor(I[F]/R)},${Math.floor(I[F+1]/R)},${Math.floor(I[F+2]/R)}`;U.set(L,(U.get(L)||0)+1)}let k=200,P=[0];for(let F=1;F<=k;F++){let L=K.lerp(M,[0,0,0],F/k),ae=`${Math.floor(L[0]/R)},${Math.floor(L[1]/R)},${Math.floor(L[2]/R)}`;P.push(P[F-1]+1+(U.get(ae)||0)*.08)}let X={src:M,t:-1,dur:6.5,dmCum:P,progress(){return this.t<0?0:Math.min(this.t/this.dur,1)},crossed(){let F=this.progress();return P[Math.round(F*k)]/P[k]},update(F,L){this.t>=0&&(this.t+=F);let ae=this.progress(),ne=L?1:0;x.geometry.setDrawRange(0,Math.round(ae*A)),x.material.uniforms.uGain.value=ne*.3,T.position.set(...K.lerp(M,[0,0,0],ae)),T.material.uniforms.uGain.value=ne*(this.t>=0&&ae<1?1.5:0),E.material.uniforms.uGain.value=ne*(this.t>=0?6*Math.exp(-this.t/.4)+.4:0)}},Z=F=>K.lerp(M,[0,0,0],F),H=.5,ie=1e9;for(let F=0;F<=60;F++){let L=.2+.6*(F/60),ae=Z(L);for(let ne of t){let Ae=K.len(K.sub(ne.p,ae));Ae<ie&&ne.m>.2&&(ie=Ae,H=L)}}let j="How much of the delay came from here?";return f.push({kind:"tag",when:"frbTags",short:!0,above:!0,pos:Z(.02),zr:[7,9],text:"Host galaxy \xB7 DM_host",caption:j},{kind:"tag",when:"frbTags",short:!0,pos:Z(.36),zr:[7,9],text:"Intergalactic gas \xB7 DM_IGM",caption:j},{kind:"tag",when:"frbTags",short:!0,above:!0,side:"left",pos:Z(Math.min(.68,Math.max(.6,H))),zr:[7,9],text:"A halo on the way? \xB7 DM_halo",caption:j},{kind:"tag",when:"frbTags",short:!0,side:"left",pos:Z(.98),zr:[7,9],text:"Milky Way \xB7 DM_MW",caption:"Our own Galaxy: modelled and subtracted."}),{group:l,volumes:d,marks:f,heroDirs:m,frb:X,materials:[c.material,u.material,...d.map(F=>F.material),x.material,T.material,E.material]}}var Nl=[1,.84,.64],Fu=[.62,.78,1],Ou=[1,.76,.5],Ll=[1,.66,.42],Vg=[1,.42,.7];function ku(i,e,t){for(;;){let n=Math.sqrt(i()*.98),s=e*n/(1-n);if(s<t)return s}}function Dl(i,e,t,n){let{type:s,at:r=[0,0,0],rot:a=[0,0,0],s:o=1,morphable:l=!1}=n,c=Nu(...a),u=f=>K.add(r,K.mul(c(f),o)),d=l?1:0,h=[],p=.26,v=3,S=(f,M)=>Math.log(f/.6)/p+M*Math.PI,m=(f,M,A=12)=>{let _=t.dir(),x=ku(t,f,A);return[_[0]*x,_[1]*x*M,_[2]*x]};if(s==="spiral"||s==="lenticular"||s==="irregular"){let f=n.N??11e4;for(let x=0;x<f;x++){let b,T,g=0,E=!1;if(s==="irregular"){let R=n.clumps[t()*n.clumps.length|0];b=[R[0]+t.gauss()*R[3],(R[1]+t.gauss()*R[3])*.6,R[2]+t.gauss()*R[3]],T=t()<.6?Fu:Nl}else{let R=Math.min(v*-Math.log(t()*t()+1e-9)*.5+.3,17);E=s==="spiral"&&t()<.66;let U=E?S(R,t()<.5?0:1)+t.gauss()*.2:t()*2*Math.PI,k=E?.12:s==="lenticular"?.45:.28;b=[R*Math.cos(U),t.gauss()*k,R*Math.sin(U)],T=E?t()<.7?Fu:[.9,.92,1]:Nl,g=E?.65:0}let I=m(1,.8,20);i.add(u(b),{col:T,col2:Ll,b:[0,E?1.25:.45,0,0,0],size:.09,pos2:u(I),mf:[d,l?g:0]})}let M=s==="lenticular"?45e3:s==="irregular"?0:26e3;for(let x=0;x<M;x++){let b=m(.7,.8);i.add(u(b),{col:Ou,col2:Ll,b:[0,.3,0,0,0],size:.08,pos2:u(K.mul(b,1.3)),mf:[d,0]})}let A=s==="spiral"?n.knots??520:s==="irregular"?160:0;for(let x=0;x<A;x++){let b;if(s==="irregular"){let T=n.clumps[t()*n.clumps.length|0];b=[T[0]+t.gauss()*T[3],T[1]*.6,T[2]+t.gauss()*T[3]]}else{let T=t.range(1.8,14),g=S(T,t()<.5?0:1)+t.gauss()*.14;b=[T*Math.cos(g),t.gauss()*.05,T*Math.sin(g)]}h.push(b);for(let T=0;T<9;T++){let g=K.add(b,[t.gauss()*.1,t.gauss()*.05,t.gauss()*.1]);i.add(u(g),{col:Vg,b:[0,.9,.15,1.4,0],size:.2,mf:[0,l?1:0]})}}let _=Math.round((s==="spiral"?n.Ngas??14e4:s==="irregular"?25e3:s==="lenticular"?4e3:0)*Math.min(1,o*o*1.5));for(let x=0;x<_;x++){let b;if(s==="irregular"){let T=n.clumps[t()*n.clumps.length|0];b=[T[0]+t.gauss()*T[3]*2.2,(T[1]+t.gauss()*T[3])*.5,T[2]+t.gauss()*T[3]*2.2]}else{let T=Math.min(-Math.log(t()*t()+1e-9)*4.6+1,42),E=t()<.65?S(T,t()<.5?0:1)+t.gauss()*.35:t()*2*Math.PI,I=T>16?.09*(T-16)*Math.sin(E-.6):0;b=[T*Math.cos(E),t.gauss()*.22+I,T*Math.sin(E)]}e.add(u(b),{b:[0,0,.009,0,0],size:.6,pos2:u(K.mul(b,.22)),mf:[l?1:0,l?1:0]})}}if(s==="elliptical")for(let f=0;f<(n.N??9e4);f++){let M=m(n.a??2.2,.7,n.cap??12);i.add(u(M),{col:t()<.8?Ll:Ou,b:[0,1,0,0,0],size:.1})}return h.map(u)}function Bu(i){let e=Ni(11),t=new Mt,n=new Mt,s=new Mt,r=new Mt,a=new Mt,o=new Mt,l=Dl(t,n,e,{type:"spiral",morphable:!0}),c=2.6,u=.45,d=[Math.cos(u)*Math.sin(c),Math.sin(u),Math.cos(u)*Math.cos(c)],h=K.norm(K.cross([0,1,0],d)),p=K.cross(d,h),v=(L,ae,ne=0)=>K.add(K.add(K.mul(h,L),K.mul(p,ae)),K.mul(d,ne)),S=[{name:"Elliptical",type:"elliptical",at:v(-66,34,-20),rot:[.4,0,.3],s:1,a:4.2,cap:42,N:19e4},{name:"Lenticular",type:"lenticular",at:v(78,-26,15),rot:[1.1,.3,0],s:1,N:5e4},{name:"Irregular",type:"irregular",at:v(66,30,10),rot:[.3,0,.5],s:.75,N:14e3,clumps:[[0,0,0,1.6],[2.5,.4,1.2,1],[-2,-.3,2.2,1.2],[1.2,.2,-2.4,.8],[-3,.5,-1,.7]]},{name:"Spiral",type:"spiral",at:v(20,-36,-30),rot:[1.25,.8,.2],s:.65,N:4e4,knots:160,Ngas:18e3}];S.forEach(L=>Dl(o,o,e,L));let m=new Mt,f=[[48,14,30],[-62,-20,55],[30,-34,-88]];f.forEach((L,ae)=>{if(Dl(s,m,e,{type:"irregular",at:L,rot:[e()*3,e()*3,0],s:.35,N:6e3,clumps:[[0,0,0,1.4],[1.2,0,.8,.8]]}),ae<2){let ne=K.add(K.mul(L,.5),[e.gauss()*10,e.gauss()*6,e.gauss()*10]);for(let Ae=0;Ae<5e3;Ae++){let G=e()*.85+.1,ue=K.add(K.add(K.mul(K.mul(L,.35),(1-G)**2),K.mul(ne,2*G*(1-G))),K.mul(L,G*G));m.add(K.add(ue,[e.gauss()*1.6,e.gauss()*1.2,e.gauss()*1.6]),{b:[0,0,.04,.005,0],size:1.4,pos2:[0,0,0],mf:[0,1]})}}});for(let L=0;L<7e4;L++){let ae=e.dir(),ne=ku(e,45,500);a.add(K.mul(ae,ne),{b:[.11,0,0,0,0],size:5})}let M=new Mt;(i.length?i.slice(0,4):[[1,.2,0],[-.6,.3,.7],[0,-.8,-.6]]).forEach((L,ae)=>{let[ne,Ae]=vo(L),G=K.mul(L,2600),ue=K.add(K.mul(ne,e.gauss()*260),K.mul(Ae,e.gauss()*260)),B=K.add(K.mul(ne,14*(ae%2?1:-1)),[0,2*(ae-1),0]),J=K.add(K.mul(L,700),ue),he=Me=>K.add(K.add(K.mul(G,(1-Me)**2),K.mul(J,2*Me*(1-Me))),K.mul(B,Me*Me));for(let Me=0;Me<26e3;Me++){let de=e()**.7,He=he(de),nt=he(Math.min(de+.02,1)),Le=6+140*(1-de)**1.5,Pe=K.add(He,K.add(K.mul(ne,e.gauss()*Le),K.mul(Ae,e.gauss()*Le)));a.add(K.add(He,K.add(K.mul(ne,e.gauss()*Le*2),K.mul(Ae,e.gauss()*Le*2))),{b:[.09,0,0,0,0],size:6+Le*.15}),M.add(Pe,{b:[0,0,.12+.16*de,.02,0],size:1+Le*.06,vel:K.sub(nt,He),rate:.25+e()*.15,phase:e(),mf:[0,1]}),e()<.02&&s.add(Pe,{col:Nl,b:[0,1.3,.3,0,0],size:.5})}});for(let L=0;L<12e3;L++){let ae=e()<.5?1:-1,ne=e()*.42,Ae=e()*2*Math.PI,G=[Math.sin(ne)*Math.cos(Ae),ae*Math.cos(ne),Math.sin(ne)*Math.sin(Ae)],ue=e.range(40,110);r.add(K.mul(G,.5+e()*2.5),{b:[0,0,0,.035*(1-ne),.03],mf:[0,1],size:1+ue*.02,vel:K.mul(G,ue),acc:K.mul(G,ue*.4),rate:.035+e()*.03,phase:e()})}for(let L=0;L<9e3;L++){let ae=e.range(2,11),ne=e()*2*Math.PI,Ae=e()<.5?1:-1,G=[Math.cos(ne)*4,Ae*e.range(25,55),Math.sin(ne)*4];r.add([ae*Math.cos(ne),0,ae*Math.sin(ne)],{b:[0,0,.04,.06,.01],size:.6,vel:G,acc:[0,-G[1],0],rate:.05+e()*.04,phase:e(),mf:[0,1]})}for(let L=0;L<420;L++){let ae=Math.exp(e.range(Math.log(22),Math.log(230))),ne=K.mul(e.dir(),ae),Ae=e.range(1.2,3.5);for(let G=0;G<10;G++)n.add(K.add(ne,[e.gauss()*Ae,e.gauss()*Ae,e.gauss()*Ae]),{b:[0,0,.015,.03,0],size:Ae*1.2})}let _=new pn,x=[],b=(L,ae)=>{let ne=L.build(an(ae));return _.add(ne),x.push(ne.material),ne};b(a,{gain:.3}),b(n,{morph:dt.uMorph}),b(t,{morph:dt.uMorph,gain:.18}),b(s,{gain:.45});let T=b(o,{gain:.45});b(r,{morph:dt.uMorph});let g=b(M,{morph:dt.uMorph}),E=b(m,{morph:dt.uMorph}),I=new Mt;I.add([0,0,0],{col:[1,.95,.85],b:[0,14,0,0,.6],size:1.6});for(let L=0;L<9e3;L++){let ae=e()<.5?1:-1,ne=e()*.05,Ae=e()*2*Math.PI,G=[Math.sin(ne)*Math.cos(Ae),ae*Math.cos(ne),Math.sin(ne)*Math.sin(Ae)];I.add(K.mul(G,e()*2),{col:[.72,.84,1],b:[0,.22,0,0,.3],size:.45,vel:K.mul(G,e.range(45,75)),rate:.18+e()*.1,phase:e()})}let R=b(I,{}),U=[1,-1].map(L=>Sn({center:[0,L*22,0],R:20,type:"shell",inner:.86,width:.08,noise:.5,noiseScale:3,amp:[0,0,0,.1,1.2],gain:.7,seed:L>0?4:8}));U.forEach(L=>{_.add(L),x.push(L.material)});let k={set(L){R.material.uniforms.uGain.value=L,U.forEach(ae=>{ae.material.uniforms.uGain.value=.7*L,ae.visible=L>.01}),R.visible=L>.01}};k.set(0);let P=Sn({center:[0,0,0],R:300,type:"beta",rc:.07,beta:.5,amp:[0,0,0,0,1],gain:.4,noise:.2,noiseScale:3}),X=Sn({center:S[0].at,R:120,type:"beta",rc:.08,beta:.55,amp:[0,0,0,0,1],gain:.7});_.add(P,X),x.push(P.material,X.material);let Z=l.filter(L=>{let ae=Math.hypot(L[0],L[2]);return ae>7&&ae<9})[0]||l[0],H=[{kind:"image",text:"M51 \u2014 the Whirlpool",pos:[0,9,-16],zr:[4.3,5.25],img:"m51-optical",stops:["06"],caption:"A real spiral galaxy, M51, with its small companion. Blue arms are young stars; the yellow centre is old stars.",credit:"X-ray: NASA/CXC/SAO; Optical: Detlef Hartmann; Infrared: NASA/JPL-Caltech"},{kind:"image",text:"M51 in 21 cm (FAST)",pos:[-30,4,18],zr:[4.3,5.3],img:"m51-hi-fast",stops:["07"],caption:"Cold hydrogen gas around M51 mapped by FAST. The gas reaches far beyond the stars (dashed ellipse = optical size).",credit:"Lin, including Qu+ 2025"},{kind:"image",text:"M81 group",pos:K.add(f[1],[0,10,0]),zr:[4.3,5.4],img:"m81-group",stops:["07"],caption:"The M81 galaxy group. Galaxies are connected by streams of gas pulled out by their gravitational interaction.",credit:"de Blok et al. 2018"},{kind:"image",text:"M82 \u2014 a galactic wind",pos:[6,60,0],zr:[4.9,5.9],img:"m82",stops:["10"],bands:["all","warm","hot"],caption:"The starburst galaxy M82. Exploding stars drive hot (X-ray, blue) and warm (H\u03B1, red) gas out of the disk.",credit:"X-ray: NASA/CXC/JHU/D.Strickland; Optical: NASA/ESA/STScI/AURA/Hubble Heritage; IR: NASA/JPL-Caltech/Univ. of AZ/C. Engelbracht"},{kind:"image",text:"Hubble\u2019s tuning fork",pos:v(-24,58),zr:[5.2,5.47],img:"hubble-scheme",when:"zoo",caption:"Edwin Hubble sorted galaxies by shape: ellipticals on the left, spirals on the right.",credit:"Cosmogoblin @ Wikipedia"},{kind:"image",text:"Types of galaxies",pos:v(48,6),zr:[5.2,5.47],img:"galaxy-types",when:"zoo",caption:"Real galaxies (Hubble Space Telescope): spiral, barred spiral, elliptical, irregular, lenticular, peculiar.",credit:"Hubble Space Telescope image archive"},...S.map(L=>({kind:"fly",text:L.name,pos:K.add(L.at,[0,22*L.s,0]),zr:[5.2,5.47],target:L.at,zoom:L.type==="elliptical"?4.95:Math.log10(6e4*L.s),when:"zoo"})),{kind:"tag",when:"agn",pos:[0,0,0],zr:[4.6,5.6],text:"Radiation (quasar mode)",caption:"A bright accreting black hole: its light and fast winds clear gas out of the galaxy."},{kind:"tag",when:"agn",pos:[0,29,0],zr:[4.6,5.6],text:"Jets (radio mode)",caption:"Narrow beams of particles near light speed, punching far into the halo and heating it."},{kind:"tag",when:"agn",side:"left",pos:[-19,26,0],zr:[4.6,5.6],text:"Bubbles",caption:"Hot gas inflated by past outbursts \u2014 like the Milky Way\u2019s eROSITA/Fermi bubbles."},{kind:"fly",text:"Our spiral",pos:[0,24,0],zr:[5.2,5.47],target:[0,0,0],zoom:4.82,when:"zoo"}],ie=[],j=(L,ae,ne)=>{let Ae=Ni(ne),G=K.norm(K.add(K.add(K.mul(d,.86),K.mul(h,-.42)),K.mul(p,.1))),ue=K.sub(L,K.mul(G,420)),B=K.add(L,K.mul(G,45)),J=new Mt;J.add(ue,{col:[.75,.88,1],b:[0,40,0,0,0],size:6});for(let Pe=0;Pe<60;Pe++)J.add(K.add(ue,K.mul(Ae.dir(),Ae()*6)),{col:[.7,.8,1],b:[0,3,0,0,0],size:4});let he=K.len(K.sub(B,ue));for(let Pe=0;Pe<2600;Pe++){let Ze=Ae();J.add(K.add(ue,K.mul(G,Ze*he)),{col:[.8,.9,1],b:[0,.5,0,0,0],size:.7})}for(let Pe=0;Pe<1400;Pe++)J.add(ue,{col:[.85,.93,1],b:[0,2.2,0,0,0],size:1.1,vel:K.mul(G,he),rate:.16,phase:Ae()});let Me=new Mt,de=[];ae.forEach(Pe=>{let Ze=K.add(L,K.mul(G,Pe.s)),Ge=Pe.phase==="cold"?[0,0,.5,.35,0]:[0,0,0,.6,.12];for(let lt=0;lt<160;lt++)Me.add(K.add(Ze,[Ae.gauss()*Pe.r,Ae.gauss()*Pe.r,Ae.gauss()*Pe.r]),{b:Ge,size:Pe.r*.9});de.push({...Pe,pos:Ze})});let He=J.build(an({gain:0})),nt=Me.build(an({gain:0}));_.add(He,nt),x.push(He.material,nt.material);let Le={beam:He,blobs:nt,clouds:de,quasar:ue,gain:0,target:0};return ie.push(Le),Le};j(v(40,-14),[{s:-80,r:4,phase:"cold",ion:"Mg II",lam:.18},{s:-45,r:7,phase:"warm",ion:"O VI",lam:.36},{s:-12,r:4.5,phase:"cold",ion:"H I",lam:.52},{s:22,r:8,phase:"warm",ion:"C IV",lam:.7}],41),j(K.add(S[0].at,v(16,-14)),[{s:-40,r:4,phase:"cold",ion:"Mg II",lam:.22},{s:6,r:3.5,phase:"cold",ion:"Mg II",lam:.6}],43),H.push({kind:"tag",when:"qsoTag",side:"left",above:!0,pos:ie[0].quasar,zr:[4.6,6],text:"Background quasar (QSO)",caption:"A brilliant, distant galaxy core. Halo gas in front of it leaves dark absorption lines in its light."});let F=Sn({center:[0,0,0],R:230,type:"shell",inner:.94,width:.045,noise:.45,noiseScale:3,amp:[0,0,0,0,1],gain:0,seed:12});return _.add(F),x.push(F.material),F.visible=!1,{group:_,materials:x,knot:Z,marks:H,neighbours:S,sightlines:ie,sky:{sx:h,sy:p,vd:d,onSky:v},nbrMat:T.material,halo:P,inflowMat:g.material,satGasMat:E.material,agn:k,shock:F}}var yi=[150,6,-95];function zu(i){let e=Ni(23),t=new Mt,n=new Mt,s=new Mt,r=K.norm([i[0],0,i[2]]),a=[-r[2],0,r[0]];for(let T=0;T<6e4;T++){let g=e.gauss()*900,E=e.gauss()*(e()<.5?160:700),I=K.add(K.add(K.mul(r,g),K.mul(a,E)),[0,e.gauss()*70,0]),R=e()<.12;t.add(I,{col:R?[.7,.82,1]:e()<.5?[1,.86,.7]:[1,.72,.5],b:[0,R?1.6:1,0,0,0],size:e.range(.25,.5)})}for(let T=0;T<260;T++){let g=K.add(K.add(K.mul(r,e.gauss()*900),K.mul(a,-60+e.gauss()*90)),[0,e.gauss()*18,0]),E=e.range(8,40);for(let I=0;I<70;I++)n.add(K.add(g,[e.gauss()*E,e.gauss()*E*.4,e.gauss()*E]),{b:[0,0,.12,0,0],size:E*.7})}let o=[-46,2,30];for(let T=0;T<40;T++){let g=K.add(o,[e.gauss()*26,e.gauss()*12,e.gauss()*26]),E=e.range(3,11);for(let I=0;I<450;I++)n.add(K.add(g,[e.gauss()*E,e.gauss()*E,e.gauss()*E]),{b:[0,0,.09,.005,0],size:E*.5})}for(let T=0;T<700;T++){let g=e()<.7?2.5:6;s.add([e.gauss()*g,e.gauss()*g,e.gauss()*g],{col:[.75,.86,1],b:[0,2.4,0,0,0],size:e.range(.25,.45)})}for(let T=0;T<14;T++)s.add([e.gauss()*2,e.gauss()*2,e.gauss()*2],{col:[.7,.85,1],b:[0,12,0,0,0],size:1.6});let l=42;for(let T=0;T<6e4&&n.n<4e5;T++){let g=e.dir(),E=Math.sin(g[0]*9+g[1]*3)*Math.sin(g[2]*8-g[1]*5)+.6*Math.sin(g[0]*17+g[2]*13),I=g[0]>.55?0:1;if(Math.abs(E)>.22||!I)continue;let R=.8+.12*Math.sin(g[0]*5+g[2]*4)*Math.cos(g[1]*6)+e.gauss()*.02;n.add(K.mul(g,l*R),{b:[0,.04,0,.5,0],size:1.6})}let c=new pn,u=[];for(let[T,g]of[[n,{gain:.5}],[t,{gain:.6}],[s,{gain:.3}]]){let E=T.build(an(g));c.add(E),u.push(E.material)}let d=Sn({center:[0,0,0],R:l,type:"uniform",noise:.95,noiseScale:2.6,amp:[0,0,0,1,0],gain:.32,seed:3});c.add(d),u.push(d.material);let h=Sn({center:[0,0,0],R:l*.82,type:"beta",rc:.35,beta:.6,noise:.5,noiseScale:2.4,amp:[0,0,0,0,1],gain:.22,seed:21}),p=Sn({center:[l*.95,4,0],R:l*.6,type:"beta",rc:.4,beta:.7,noise:.6,noiseScale:2.8,amp:[0,0,0,0,1],gain:.1,seed:22});c.add(h,p),u.push(h.material,p.material);let v=new Mt;v.add(yi,{col:[.75,.88,1],b:[0,10,0,0,0],size:1.8});let S=v.build(an({}));c.add(S),u.push(S.material);let m=new Mt;m.add([0,0,0],{col:[1,.95,.9],b:[0,1,0,0,0],size:60});let f=m.build(an({gain:0}));f.position.set(...yi),c.add(f),u.push(f.material);let M=Sn({center:yi,R:1,type:"shell",inner:.9,width:.045,noise:.95,noiseScale:4.5,amp:[0,0,0,.15,1.4],gain:.9,seed:9});c.add(M),u.push(M.material);let A=new Mt;for(let T=0;T<4e4;T++){let g=e.dir(),E=.9+.08*Math.sin(g[0]*11+g[1]*4)*Math.sin(g[2]*9)+e.gauss()*.015;Math.abs(Math.sin(g[0]*13+g[1]*7)*Math.sin(g[2]*11-g[0]*5))<.25&&A.add(K.mul(g,E),{b:[0,0,0,.6,.5],size:.014})}let _=A.build(an({}));_.position.set(...yi),c.add(_),u.push(_.material);let x={t:-1,update(T){this.t>=0&&(this.t+=T);let g=this.t>=0,E=g?1+31*Math.min(this.t/9,1)**.45:.001;M.setRadius(E),_.scale.setScalar(E),M.visible=_.visible=g,S.material.uniforms.uGain.value=g?0:1,f.material.uniforms.uGain.value=g?60*Math.exp(-this.t/.35)+2*Math.exp(-this.t/2.5):0}},b=[{kind:"image",text:"Tarantula Nebula",stops:["12"],pos:[0,52,0],zr:[1.8,3.2],img:"tarantula",caption:"The Tarantula Nebula (30 Doradus): thousands of newborn stars carving bubbles into the gas around them.",credit:"ESA"},{kind:"image",text:"S106 \u2014 a star being born",stops:["12"],pos:[-50,30,34],zr:[1.8,3.2],img:"s106",caption:"Star-forming region S106. A young massive star blows two lobes of glowing gas out of its natal cloud.",credit:"Hubble data from proposal 12326: K. Noll, Z. Levay, M. Livio, H. Bond, C. Christian, L. Frattare, M. Mutchler, T. Borders (Hubble Heritage Team/STScI)"},{kind:"image",text:"HL Tau \u2014 planets forming",stops:["12"],pos:[24,-30,10],zr:[1.8,3.2],img:"hl-tau",caption:"Zoom in another few hundred thousand times: a disk around a young star (~200 AU across), with gaps carved by forming planets.",credit:"ALMA (ESO/NAOJ/NRAO)"},{kind:"image",text:"Cas A \u2014 a supernova remnant",stops:["13"],pos:K.add(yi,[0,40,0]),zr:[1.8,3.2],img:"cas-a",after:"sn",caption:"Cassiopeia A, the debris of a star that exploded ~350 years ago, glowing in X-rays at millions of degrees.",credit:"NASA/CXC/SAO"},{kind:"image",text:"Crab Nebula \u2014 SN 1054",stops:["13"],pos:K.add(yi,[34,-16,0]),zr:[1.8,3.2],img:"crab",after:"sn",caption:"The Crab Nebula: remains of the supernova recorded by Chinese astronomers in 1054 AD.",credit:"NASA (NAS5-26555)"}];return{group:c,materials:u,sn:x,marks:b}}var Ul=50,vs=(i,e,t)=>{let n=Math.min(Math.max((t-i)/(e-i),0),1);return n*n*(3-2*n)},Fl=i=>i<.5?4*i*i*i:1-(-2*i+2)**3/2,Hg=`
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
<div class="disclaimer">Conceptual illustration \xB7 real images behind every \u25C9</div>`;function Vu(i){let{STEPS:e}=i;document.body.insertAdjacentHTML("afterbegin",Hg);let t=z=>document.querySelector(z),n=t("#gl"),s=new oo({canvas:n,antialias:!1,powerPreference:"high-performance"});s.toneMapping=Ii,s.toneMappingExposure=.9;let r=matchMedia("(pointer: coarse)").matches,a=Math.min(screen.width,screen.height),o=r?a<600?.7:.85:1,l=Math.min(window.devicePixelRatio||1,o);s.setPixelRatio(l);let c=new fo(s);c.setPixelRatio(l),c.addPass(new mo(new tt("#03060c"),1));let u=Uu(),d=Bu(u.heroDirs),h=K.mul(d.knot,1e3),p=K.norm([-d.knot[2],0,d.knot[0]]),v=zu(p),S=[{name:"web",unit:1e6,origin:[0,0,0],obj:u,fade:z=>vs(6.45,7.1,z)},{name:"galaxy",unit:1e3,origin:[0,0,0],obj:d,fade:z=>(1-vs(6.9,7.45,z))*vs(3.2,4.1,z)},{name:"region",unit:1,origin:h,obj:v,fade:z=>1-vs(3.3,4,z)}];for(let z of S)z.scene=new Ls,z.scene.add(z.obj.group),z.cam=new Kt(Ul,1,.001,1e4),z.pass=new po(z.scene,z.cam),z.pass.clear=!1,c.addPass(z.pass),z.opacity=1;let m=new gs(new qe(512,512),.6,.6,.7);c.addPass(m),c.addPass(new go);let f={hero:[0,0,0],knot:h,sn:K.add(h,yi),sight1:K.mul(d.sky.onSky(28,12),1e3),pair:K.mul(K.lerp([0,0,0],d.neighbours[0].at,.5),1e3),frbMid:K.mul(u.frb.src,5e5)},M=Math.atan2(u.frb.src[0],u.frb.src[2])+Math.PI/2,A=z=>Array.isArray(z)?z:f[z],_=z=>z==="frb"?M:z,x={f:[0,0,0],z:8.2,az:.6,el:.32},b=null;function T(z,{instant:le=!1,dur:Se=0}={}){let Ne={f:A(z.f??x.f),z:z.z??x.z,az:_(z.az??x.az),el:z.el??x.el},Je=((Ne.az-x.az)%(2*Math.PI)+3*Math.PI)%(2*Math.PI)-Math.PI;if(Ne.az=x.az+Je,le){Object.assign(x,Ne),b=null;return}let $e=Math.abs(Ne.z-x.z),ut=K.len(K.sub(Ne.f,x.f))>1e-6;b={from:{...x,f:[...x.f]},to:Ne,t:0,dur:Se||1.2+.6*$e+(ut?.4:0)}}function g(z){if(!b)return;b.t=Math.min(b.t+z/b.dur,1);let{from:le,to:Se,t:Ne}=b,Je=Fl(Ne),$e=Se.z<le.z-.2?Fl(Math.min(1,Ne*1.7)):Se.z>le.z+.2?Fl(Math.max(0,(Ne-.4)/.6)):Je;x.z=le.z+(Se.z-le.z)*Je,x.az=le.az+(Se.az-le.az)*Je,x.el=le.el+(Se.el-le.el)*Je,Math.min(le.z,Se.z)<3.6&&Math.max(le.z,Se.z)>4.3&&(x.el=Math.min(1.35,x.el+.75*Math.sin(Math.PI*Je))),x.f=K.lerp(le.f,Se.f,$e),Ne>=1&&(b=null)}let E="alldm",I=[...Ui.alldm.w],R=0;function U(z){E=z;let le=["absorb","galaxy","accrete"].includes(z)?"all":z;document.querySelectorAll("#bands button").forEach(Se=>Se.setAttribute("aria-pressed",Se.dataset.band===le))}let k=["all","dm","stars","cold","warm","hot"],P={all:"everything that shines",dm:"invisible, gravity only",stars:"optical",cold:"radio 21 cm",warm:"H\u03B1 \xB7 UV",hot:"X-ray"};t("#bands").innerHTML=k.map((z,le)=>`<button data-band="${z}" class="b-${z}"><i></i><span>${Ui[z].label}</span><small>${P[z]}</small><kbd>${le+1}</kbd></button>`).join(""),t("#bands").addEventListener("click",z=>{let le=z.target.closest("button");le&&U(le.dataset.band)});let X=t("#morph input");X.addEventListener("input",()=>{R=X.value/100});let Z=0,H=0,ie=t("#halo input");ie.addEventListener("input",()=>{Z=ie.value/100});let j=[{z:8,name:"Cosmic web",len:"100 Mpc"},{z:6.5,name:"Galaxy group",len:"3 Mpc"},{z:5.5,name:"Galaxy halo",len:"300 kpc"},{z:4.6,name:"Galaxy",len:"40 kpc"},{z:2.5,name:"Star-forming region",len:"300 pc"},{z:1.6,name:"Nebula",len:"40 pc"}],F=1.3,L=8.8,ae=z=>(1-(z-F)/(L-F))*100;t("#ladder").innerHTML='<div class="rail"></div><div class="you"></div>'+j.map(z=>`<button style="top:${ae(z.z)}%" data-z="${z.z}"><b>${z.name}</b><span>${z.len}</span></button>`).join(""),t("#ladder").addEventListener("click",z=>{let le=z.target.closest("button");if(!le)return;let Se=+le.dataset.z;T({z:Se,f:Se<3.6?"knot":"hero"})});let ne=z=>z>=1e6?`${+(z/1e6).toPrecision(2)} Mpc`:z>=1e3?`${+(z/1e3).toPrecision(2)} kpc`:`${+z.toPrecision(2)} pc`;function Ae(z){let le=z*3.2616;return le>=1e9?`${+(le/1e9).toPrecision(2)} billion light-years`:le>=1e6?`${+(le/1e6).toPrecision(2)} million light-years`:le>=1e4?`${Math.round(le/1e3).toLocaleString("en")},000 light-years`:`${Math.round(le).toLocaleString("en")} light-years`}let G=null,ue={};function B(){G||(G={bar:t("#scalebar .bar"),span:t("#scalebar span"),you:t("#ladder .you"),rungs:[...document.querySelectorAll("#ladder button")]});let z=10**x.z,le=z*.16,Se=10**Math.floor(Math.log10(le)),Ne=[5,2,1].map(ke=>ke*Se).find(ke=>ke<=le)||Se,Je=`${Ne/z*innerWidth}px`,$e=`${ne(Ne)} <em>\u2248 ${Ae(Ne)}</em>`,ut=`${ae(Math.min(Math.max(x.z,F),L))}%`,Lt=j.reduce((ke,yt)=>Math.abs(yt.z-x.z)<Math.abs(ke.z-x.z)?yt:ke).z;Je!==ue.width&&(G.bar.style.width=Je),$e!==ue.label&&(G.span.innerHTML=$e),ut!==ue.top&&(G.you.style.top=ut),Lt!==ue.near&&G.rungs.forEach(ke=>ke.classList.toggle("here",+ke.dataset.z===Lt)),ue={width:Je,label:$e,top:ut,near:Lt}}let J=[];S.forEach((z,le)=>(z.obj.marks||[]).forEach(Se=>{let Ne=document.createElement(Se.kind==="label"||Se.kind==="tag"?"div":"button");Ne.className=`mark ${Se.kind}${Se.side==="left"?" left":""}${Se.above?" above":""}${Se.short?" short":""}`,Ne.innerHTML=Se.kind==="label"?Se.text:Se.kind==="tag"?`<i></i><div><b>${Se.text}</b><span>${Se.caption}</span></div>`:`<i></i><span>${Se.text}</span>`,t("#marks").appendChild(Ne),Se.kind==="image"&&(i.preloadFig?.(Se.img,e.flatMap((Je,$e)=>(Se.when?Je[Se.when]:!Se.stops||Se.stops.includes(Je.stop))?[$e]:[])),Ne.addEventListener("click",()=>i.openLightbox([{img:Se.img,src:i.figSrc(Se.img),t:Se.text,c:Se.caption,cr:Se.credit}],0))),Se.kind==="fly"&&Ne.addEventListener("click",()=>T({f:K.mul(Se.target,1e3),z:Se.zoom??4.75})),J.push({...Se,el:Ne,li:le})}));let he=new W,Me=8,de=.25;function He(){let z=[],le=Math.min(innerWidth/100,innerHeight/56.25),Se=e[i.idx()],Ne=i.marksHidden(),Je=!!document.querySelector("#titlecard.on"),$e=document.body.classList.contains("bare"),ut=Te=>!Te||$e||Te.getBoundingClientRect().width===0?!1:Te.classList.contains("panel")?!0:["ladder","bands","card"].includes(Te.id)&&Je?!1:["ladder","bands","touchnav","scalebar"].includes(Te.id)||Te.classList.contains("brand")||Te.classList.contains("on"),Lt=[t(".brand"),t("#scalebar"),t("#rinfo"),t("#card"),t("#ladder"),t("#dock"),t("#bands"),t("#morph"),t("#halo"),t("#touchnav"),...document.querySelectorAll("#panels .panel.on")].filter(ut).map(Te=>Te.getBoundingClientRect()),ke=8,yt=2*le,nn=Te=>!Lt.some(Yt=>Te.l<Yt.right+ke&&Te.r>Yt.left-ke&&Te.t<Yt.bottom+ke&&Te.b>Yt.top-ke)&&!z.some(Yt=>Te.l<Yt.r+6&&Te.r>Yt.l-6&&Te.t<Yt.b+6&&Te.b>Yt.t-6)&&Te.l>yt-.5&&Te.t>yt-.5&&Te.r<innerWidth-yt+.5&&Te.b<innerHeight-yt+.5;for(let Te of J){let Yt=S[Te.li],w=Te.when?!!Se[Te.when]:!!(Te.stops&&Te.stops.includes(Se.stop)),N=(Te.when?w&&!i.marksHidden({ignoreDim:!0}):!Ne&&(!Te.stops||w))&&!(Te.after==="sn"&&v.sn.t<0),Q=x.z>=Te.zr[0]&&x.z<=Te.zr[1],$=w?.25:.6,q=Te.el.classList.contains("on"),xe=N&&(w?Yt.opacity>(q?$-.1:$):Yt.opacity>(q?$-.1:$)&&Q);if(xe&&(he.set(...Te.pos).project(Yt.cam),xe=he.z<1),xe||(Te.pk=null,Te.off=null,Te.miss=0),xe){let Ce=(he.x*.5+.5)*innerWidth,_e=(-he.y*.5+.5)*innerHeight,De=Te.el.offsetWidth,Ue=Te.el.offsetHeight,it=(st,St,Re,xt)=>{let ot=Te.kind==="label"?st-De/2:Te.kind==="tag"?Re?st-De+.55*le:st-.55*le:st-.9*le,Wt=Te.kind==="tag"?xt?St-Ue+.55*le:St-.55*le:St-Ue/2;return{l:ot,t:Wt,r:ot+De,b:Wt+Ue}},Ke=Te.side==="left",Ie=!!Te.above,at=it(Ce,_e,Ke,Ie);at.l<yt&&(Ce+=yt-at.l),at.r>innerWidth-yt&&(Ce-=at.r-innerWidth+yt),at.t<yt&&(_e+=yt-at.t),at.b>innerHeight-yt&&(_e-=at.b-innerHeight+yt);let It=st=>nn(it(Ce+st.dx,_e+st.dy,st.left,st.above)),je=Te.pk;if(je&&(Te.miss=It(je)?0:Te.miss+1,!b&&Te.miss>=Me&&(je=null)),!je){let st=Te.kind==="tag"?[[Ke,Ie],[Ke,!Ie],[!Ke,Ie],[!Ke,!Ie]]:[[Ke,Ie]],St=Ue+10,Re=[[0,0]];for(let xt=1;xt<=8;xt++)Re.push([0,-xt*St],[0,xt*St],[-xt*6*le,0],[xt*6*le,0],[-xt*6*le,-xt*St]);for(let[xt,ot]of Re){for(let[Wt,xn]of xt||ot?[[Ke,Ie]]:st){let wn={dx:xt,dy:ot,left:Wt,above:xn};if(It(wn)){je=wn;break}}if(je)break}!je&&!w&&(xe=!1),je=je||Te.pk||{dx:0,dy:0,left:Ke,above:Ie},Te.pk=je,Te.miss=0}if(xe){Te.kind==="tag"&&(Te.el.classList.toggle("left",je.left),Te.el.classList.toggle("above",je.above)),Te.off=Te.off&&q?[Te.off[0]+(je.dx-Te.off[0])*de,Te.off[1]+(je.dy-Te.off[1])*de]:[je.dx,je.dy];let st=Ce+Te.off[0],St=_e+Te.off[1];z.push(it(Ce+je.dx,_e+je.dy,je.left,je.above)),Te.el.style.transform=`translate(${st}px, ${St}px)`}}Te.el.classList.toggle("on",xe)}}let nt=d.sightlines,Le=!1,Pe=!1,Ze=0,Ge=1,lt=1,Rt=0,zt=0;function Tt(z,le={}){let Se=i.idx(),Ne=le.instant||le.jump;if(!le.keepCam){let Je=Ne?e.slice(0,Se+1).reverse().find($e=>$e.cam):z;z.from&&!Ne&&T(z.from,{instant:!0}),Je&&Je.cam&&T(Je.cam,le.jump?{dur:1.1}:le)}z.band&&Ui[z.band]&&(U(z.band),Ne&&I.splice(0,5,...Ui[z.band].w)),z.morph!==void 0&&(R=z.morph,X.value=z.morph*100,Ne&&(dt.uMorph.value=z.morph)),t("#morph").classList.toggle("on",!!z.morphUI),t("#halo").classList.toggle("on",!!z.haloUI),Z=typeof z.halo=="number"?z.halo:0,ie.value=Z*100,Ne&&(H=Z),z.sn==="reset"&&(v.sn.t=-1),Le=z.sn==="trigger",Le&&(v.sn.t=-1),z.sn==="done"&&v.sn.t<0&&(v.sn.t=9),Ne&&!z.sn&&(v.sn.t=e.slice(0,Se).some(Je=>Je.sn==="trigger")?9:-1),Pe=z.frb==="trigger",Pe&&(u.frb.t=-1),z.frb==="done"&&u.frb.t<0&&(u.frb.t=99),nt.forEach((Je,$e)=>{Je.target=(z.sight||[]).includes($e)?1:0,Ne&&(Je.gain=Je.target)}),lt=typeof z.inflow=="number"?z.inflow:1,zt=z.agn?1:0,Ne&&(Ge=lt,Rt=zt),Ze=0}let _t=null,O=-1e9;n.addEventListener("pointerdown",z=>{_t={x:z.clientX,y:z.clientY},n.setPointerCapture(z.pointerId)}),n.addEventListener("pointermove",z=>{_t&&(b=null,x.az-=(z.clientX-_t.x)*.005,x.el=Math.max(-1.45,Math.min(1.45,x.el+(z.clientY-_t.y)*.004)),_t={x:z.clientX,y:z.clientY})}),n.addEventListener("pointerup",()=>{_t=null}),n.addEventListener("wheel",z=>{z.preventDefault(),b=null,x.z=Math.max(F,Math.min(L,x.z+z.deltaY*.0015)),O=performance.now()},{passive:!1});let Vt=z=>/^[1-6]$/.test(z.key)?(U(k[+z.key-1]),!0):z.key==="i"||z.key==="I"?(fr(),!0):z.key==="l"||z.key==="L"?(ze(!D),oe(D?"Light mode \xB7 L for full quality":"Full quality"),!0):!1;function mt(){let z=innerWidth,le=innerHeight;s.setSize(z,le,!1),c.setSize(z,le),m.resolution.set(z*l*.5,le*l*.5);for(let Se of S)Se.cam.aspect=z/le,Se.cam.updateProjectionMatrix();dt.uScreen.value=le*l/(2*Math.tan(no.degToRad(Ul/2)))}addEventListener("resize",mt),mt();let C=[1,.85,.7,.6,.5],y=C.length+3,V=C.length+4,Y=z=>{let le=Math.imul(z,2654435761)>>>0;return le=(le^le>>>15)>>>0,le=Math.imul(le,2246822519)>>>0,le=(le^le>>>13)>>>0,(le>>>8)/16777216},te=new Map;function fe(z){S.forEach(le=>le.obj.group.traverse(Se=>{if(!Se.isPoints||!Se.material.uniforms||!Se.material.uniforms.uKeep||Se.geometry.drawRange.count!==1/0&&!Se.geometry.index)return;let Ne=Se.geometry;if(z){if(!te.has(Ne)){let Je=Ne.attributes.position.count,$e=[];for(let ut=0;ut<Je;ut++)Y(ut)<.25&&$e.push(ut);te.set(Ne,new cn(Je>65535?new Uint32Array($e):new Uint16Array($e),1))}Ne.setIndex(te.get(Ne))}else Ne.index&&Ne.setIndex(null)}))}let pe=Math.max(0,C.findIndex(z=>z<=l+1e-9)),ee=pe,re=1/0,me=0,Oe=!1,ge=[],ye=performance.now()+3e3,Be=0,Ve=null,Xe=new Set,D=!1,be=!1,se={fps30:!1};function ve(z){ee=z;let le=Math.min(z,C.length-1);for(;le>pe&&Xe.has(le);)le--;let Se=Math.min(C[le],o,window.devicePixelRatio||1),Ne=Je=>z>=C.length+Je&&!Xe.has(C.length+Je);se.fps30=Ne(0),dt.uSteps.value=Ne(1)?16:30,dt.uKeep.value=Ne(4)?.25:Ne(2)?.5:1,fe(Ne(4)),m.enabled=!Ne(3),Se!==l&&(l=Se,s.setPixelRatio(l),c.setPixelRatio(l),mt()),ye=performance.now()+1e3,ge=[],console.info(`[deckkit] quality ${we()}`),!D&&!be&&l<.7&&(be=!0,oe("Reduced quality for smoother playback \xB7 L to toggle"))}let we=()=>ee===pe&&!D?"full":`${D?"lite":"auto"} L${ee} \xB7 ratio ${l}${se.fps30?" \xB7 30fps":""}${dt.uSteps.value<30?" \xB7 vol16":""}${dt.uKeep.value<.5?" \xB7 \xBC particles":dt.uKeep.value<1?" \xB7 \xBD particles":""}${m.enabled?"":" \xB7 no bloom"}`;function oe(z){let le=document.createElement("div");le.className="q-toast",le.textContent=z,document.body.appendChild(le),setTimeout(()=>le.classList.add("on"),30),setTimeout(()=>{le.classList.remove("on"),setTimeout(()=>le.remove(),800)},6e3)}function ze(z,le=y){D=z,Xe=new Set,Ve=null,me=0,re=1/0,Oe=!1,ve(D?le:pe)}function Fe(){if(D)return;let z=performance.now(),le=z-Be;if(Be=z,document.hidden||le>1e3||z<ye){ge=[];return}ge.push(le);let Se=ge.reduce(($e,ut)=>$e+ut,0);if(Se<2e3)return;let Ne=ge.slice().sort(($e,ut)=>$e-ut)[ge.length>>1],Je=se.fps30?40:25;if(ge=[],Ve){let $e=Ve;Ve=null;let ut=$e.fps?Ne<=40:Ne<=.9*$e.mean;if(ut&&$e.to<C.length&&(Oe=!0),!ut){if(Xe.add($e.to),$e.to<C.length&&!Oe)for(let Lt=$e.to;Lt<C.length;Lt++)Xe.add(Lt);ve($e.from);return}}if(Ne>Je){me=0;let $e=ee+1;for(;$e<=V&&Xe.has($e);)$e++;$e<=V&&(ee<C.length&&(re=Math.min(re,C[ee])),Ve={from:ee,to:$e,mean:Ne,fps:$e===C.length},ve($e));return}me=Ne<14?me+Se:0,me>=3e4&&ee>pe&&ee<C.length&&C[ee-1]<re&&(me=0,ve(ee-1))}{let z=new URLSearchParams(location.search);z.has("lite")&&setTimeout(()=>ze(!0,z.get("lite")==="2"?V:y),0)}let pt=null,gt=0,tn=0,on=0,xo=(()=>{try{let z=s.getContext(),le=z.getExtension("WEBGL_debug_renderer_info");return le?z.getParameter(le.UNMASKED_RENDERER_WEBGL):"not reported"}catch{return"not reported"}})();function dr(){let z=performance.now(),le=(Kn-tn)/((z-on)/1e3);tn=Kn,on=z;let Se=S.map(ut=>{let Lt=0,ke=0;return ut.pass.enabled&&ut.obj.group.traverse(yt=>{if(!yt.isPoints||!yt.visible)return;let nn=yt.geometry,Te=Math.min(nn.attributes.position.count,nn.drawRange.count);Lt+=Te,ke+=nn.index?nn.index.count:Math.round(Te*dt.uKeep.value)}),{name:ut.name,total:Lt,drawn:ke}}).filter(ut=>ut.total),Ne=ut=>Se.reduce((Lt,ke)=>Lt+ke[ut],0),Je=ut=>ut.toLocaleString("en"),$e=s.domElement;pt.innerHTML=`<b>Render</b> ${D?"lite":ee===pe?"full":"auto"} \xB7 L${ee}<br>canvas ${$e.width}\xD7${$e.height} \xB7 ratio ${l} (screen ${+(window.devicePixelRatio||1).toFixed(2)})<br>particles ${Je(Ne("drawn"))} / ${Je(Ne("total"))}${Se.length>1?` (${Se.map(ut=>`${ut.name} ${Je(ut.drawn)}`).join(", ")})`:""}<br>gas samples ${dt.uSteps.value} \xB7 bloom ${m.enabled?"on":"off"}<br>fps ${Number.isFinite(le)?le.toFixed(0):"\u2013"}${se.fps30?" (capped at 30)":""}<br>`+(i.preloadInfo?`${i.preloadInfo()}<br>`:"")+`<span>${xo.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</span>`}function fr(){if(pt){clearInterval(gt),pt.remove(),pt=null;return}pt=document.createElement("div"),pt.id="rinfo",pt.className="on",document.body.appendChild(pt),tn=Kn,on=performance.now(),dr(),gt=setInterval(dr,333)}n.addEventListener("webglcontextlost",z=>{if(z.preventDefault(),t("#gl-lost"))return;let le=document.createElement("button");le.id="gl-lost",le.textContent="Graphics reset \u2014 click to reload",le.addEventListener("click",()=>location.reload()),document.body.appendChild(le)});let bi=0,pr=0,Kn=0;function mr(z,{lightboxOpen:le=!1}={}){if(se.fps30){if(bi+=z,performance.now()-pr<28)return;z=Math.min(bi,.1),bi=0}if(pr=performance.now(),Kn++,Fe(),dt.uTime.value+=z,g(z),!_t&&!b&&!le&&(x.az+=z*.018),!b&&performance.now()-O<1500){let ke=x.z<3.6?f.knot:x.z>6.5?f.hero:null;ke&&(x.z>6.5||K.len(x.f)<3e4)&&(x.f=K.lerp(x.f,ke,Math.min(1,z*2.5)))}let Se=Ui[E].w,Ne=Math.min(1,z*3.5);for(let ke=0;ke<5;ke++)I[ke]+=(Se[ke]-I[ke])*Ne;dt.uW1.value.set(I[0],I[1],I[2]),dt.uW2.value.set(I[3],I[4]),dt.uMorph.value+=(R-dt.uMorph.value)*Math.min(1,z*2.2),Le&&!b&&(Le=!1,v.sn.t=0),v.sn.update(z);let Je=e[i.idx()];if(Pe&&!b&&(Pe=!1,u.frb.t=0),u.frb.update(z,!!Je.frb),Je.cycle){Ze+=z;let ke=Je.cycle[Math.floor(Ze/3)%Je.cycle.length];ke!==E&&U(ke)}let $e=1+.9*Math.max(0,Math.sin(dt.uTime.value*2.4))**6;for(let ke of nt)ke.gain+=(ke.target-ke.gain)*Math.min(1,z*2.5),ke.beam.material.uniforms.uGain.value=ke.gain*.28,ke.blobs.material.uniforms.uGain.value=ke.gain*.5*$e,ke.beam.visible=ke.blobs.visible=ke.gain>.01;H+=(Z-H)*Math.min(1,z*2.5),d.halo.material.uniforms.uGain.value=.4*(1+2*dt.uMorph.value)*(1+5*H)*(1+2.5*H),d.inflowMat.uniforms.uCut.value=H>.01?25+175*H:0,d.shock.material.uniforms.uGain.value=1.6*H,d.shock.visible=H>.01,d.halo.material.uniforms.uBeta.value=.5+.6*H,d.satGasMat.uniforms.uGain.value=1-H,Ge+=(lt-Ge)*Math.min(1,z*2.5),d.inflowMat.uniforms.uGain.value=Ge*(1-.65*H),Rt+=(zt-Rt)*Math.min(1,z*2),d.agn.set(Rt),d.nbrMat.uniforms.uGain.value=.45*Math.max(vs(4.9,5.2,x.z),vs(15e3,3e4,K.len(x.f)));let ut=10**x.z,Lt=[Math.cos(x.el)*Math.sin(x.az),Math.sin(x.el),Math.cos(x.el)*Math.cos(x.az)];for(let ke of S){if(ke.opacity=ke.fade(x.z),ke.pass.enabled=ke.opacity>.003,!ke.pass.enabled)continue;let yt=K.mul(K.sub(x.f,ke.origin),1/ke.unit),nn=ut/ke.unit/(2*Math.tan(no.degToRad(Ul/2))*ke.cam.aspect);for(let Te of ke.obj.materials)Te.uniforms.uOpacity.value=ke.opacity,Te.uniforms.uNear&&(Te.uniforms.uNear.value=nn);ke.cam.position.set(yt[0]+Lt[0]*nn,yt[1]+Lt[1]*nn,yt[2]+Lt[2]*nn),ke.cam.near=nn*.002,ke.cam.far=nn*500,ke.cam.updateProjectionMatrix(),ke.cam.lookAt(yt[0],yt[1],yt[2])}Du(),c.render(),He(),B()}return{applyStep:Tt,frame:mr,onKey:Vt,panelApi:{setBand:z=>U(z),sightClouds:z=>nt[z].clouds,sightCloudsOnScreen:z=>nt[z].clouds.map(le=>S[1].opacity<.5?null:(he.set(...le.pos).project(S[1].cam),he.z<1?[(he.x*.5+.5)*innerWidth,(-he.y*.5+.5)*innerHeight]:null)),frbCrossed:()=>u.frb.crossed(),frbStarted:()=>u.frb.t>=0},bands:Object.keys(Ui),view:()=>({f:x.f.map(z=>Math.round(z)),z:+x.z.toFixed(3),az:+((x.az%(2*Math.PI)+2*Math.PI)%(2*Math.PI)).toFixed(3),el:+x.el.toFixed(3)}),auditBlocks:()=>[t("#bands"),t("#ladder"),t("#morph"),t("#halo")],debug:{U:dt,bloom:m,layers:S,cam:x,renderer:s,reg:v,gal:d,web:u,flyTo:T,pixelRatio:()=>l,quality:we,level:()=>ee,renders:()=>Kn,renderOnce:()=>c.render(),setLevel:z=>{D=!1,ve(z)}},quality:we}}function Gg(i){let e=Qe("div","panel p-temp"),t=[{T:10,name:"A cold gas cloud",eye:"cold"},{T:310,name:"You",eye:"cold"},{T:1800,name:"A candle flame",eye:"stars"},{T:5800,name:"Surface of the Sun",eye:"stars"},{T:1e4,name:"Glowing ionized gas (H\u03B1)",eye:"warm"},{T:3e5,name:"Warm-hot halo gas (O VI)",eye:"warm"},{T:2e6,name:"Sun\u2019s corona \xB7 galaxy halos",eye:"hot"}],n=[{n:"Radio",a:0,b:-3.3,c:"#7b2d26"},{n:"Infrared",a:-3.3,b:-6.15,c:"#b5402c"},{n:"Optical",a:-6.15,b:-6.4,c:"linear-gradient(90deg,#ff3b30,#ff9500,#ffd60a,#34c759,#0a84ff,#5e5ce6)"},{n:"UV",a:-6.4,b:-8,c:"#6e4bd8"},{n:"X-ray",a:-8,b:-11,c:"#3d5bd9"}],s=0,r=-11,a=c=>(c-s)/(r-s)*100;e.innerHTML=`
    <div class="t-read"><b></b><span></span></div>
    <input type="range" min="1" max="7.4" step="0.01" value="4">
    <div class="t-scale"><span>10 K</span><span>1,000 K</span><span>100,000 K</span><span>10 million K</span></div>
    <div class="t-label">Where its light comes out</div>
    <div class="t-spec">${n.map(c=>`<i style="left:${a(c.a)}%;width:${a(c.b)-a(c.a)}%;background:${c.c}"><em>${c.n}</em></i>`).join("")}<u></u></div>
    <div class="t-axis"><span>long waves</span><span>short waves</span></div>
    <div class="t-note">Cold hydrogen also has its own radio line, at 21 cm.</div>`;let o=e.querySelector("input"),l=()=>{let c=+o.value,u=10**c,d=t.reduce((v,S)=>Math.abs(Math.log10(S.T)-c)<Math.abs(Math.log10(v.T)-c)?S:v);e.querySelector(".t-read b").innerHTML=Hl(u),e.querySelector(".t-read span").textContent=d.name;let h=Math.log10(.002898/u);e.querySelector(".t-spec u").style.left=`${Math.min(100,Math.max(0,a(h)))}%`;let p=c<2.8?"cold":c<3.9?"stars":c<5.6?"warm":"hot";i.setBand(p)};return o.addEventListener("input",l),{el:e,show(){o.value=4,l()}}}function Wg(){let i=Qe("div","panel p-dish"),e=30*ce(),t=20*ce(),[n,s]=ln(e,t),r=document.createElement("canvas");r.width=900,r.height=600;let a=r.getContext("2d");a.fillStyle="#061018",a.fillRect(0,0,900,600);let o=5,l=()=>(o=o*16807%2147483647)/2147483647;for(let d=0;d<26e3;d++){let h=Math.min(-Math.log(l()*l()+1e-9)*3.4+.6,30),v=l()<.7?Math.log(h/.6)/.26+(l()<.5?0:Math.PI)+(l()-.5)*.5:l()*6.283,S=450+h*15*Math.cos(v),m=300+h*15*Math.sin(v)*.62,f=.6+l()*2.2;a.fillStyle=`rgba(62,230,207,${.18+l()*.3})`,a.beginPath(),a.arc(S,m,f,0,6.283),a.fill()}i.append(Qe("div","p-head","Same galaxy \xB7 different telescopes"),n),i.insertAdjacentHTML("beforeend",`
    <input type="range" min="1.3" max="5.2" step="0.01" value="2.7">
    <div class="d-ticks"><span style="left:0%">25 m</span><span style="left:${(Math.log10(500)-1.3)/3.9*100}%">FAST \xB7 500 m</span><span style="left:${(Math.log10(15e4)-1.3)/3.9*100}%">SKA \xB7 150 km</span></div>
    <div class="d-read"></div><div class="d-note">Simulated 21 cm map, 60 kpc across, at the distance of M51.</div>`);let c=i.querySelector("input"),u=()=>{let d=10**+c.value,h=1.22*.21/d,p=h*8600,v=p/60*e/2.355;s.clearRect(0,0,e,t),s.filter=`blur(${Math.max(0,v).toFixed(1)}px)`,s.drawImage(r,0,0,e,t),s.filter="none";let S=h*206265;i.querySelector(".d-read").innerHTML=`Telescope size <b>${d>=1e3?`${+(d/1e3).toPrecision(2)} km`:`${Math.round(d)} m`}</b> \u2192 sees details down to <b>${p>=1?p.toFixed(1):p.toFixed(2)} kpc</b> <em>(${S>=60?`${(S/60).toFixed(1)}\u2032`:`${S.toFixed(1)}\u2033`})</em>`};return c.addEventListener("input",u),{el:i,show(){c.value=Math.log10(500),u()}}}function Xg(){let i=Qe("div","panel p-ifs"),e=30*ce(),t=19*ce(),[n,s]=ln(e,t);i.append(Qe("div","p-head","Every pixel gets its own spectrum"),n,Qe("div","d-note","An integral-field spectrograph turns an image into a cube: x, y and wavelength \u03BB."));let r=0,a=9,o=8,l=(u,d,h)=>[e*.28+(u-h)*.9*ce()*1.2,t*.62+(u+h)*.45*ce()*1.2-d*ce()*1.2],c=(u,d)=>{let h=u-3.5,p=d-3.5;return Math.exp(-(h*h+p*p)/6)};return{el:i,tick(u){r+=u;let d=.5+.5*Math.sin(Math.min(1,r%7/3)*Math.PI-Math.PI/2);s.clearRect(0,0,e,t);for(let _=a-1;_>=0;_--){let x=_*(.25+d*1.1),b=_===4;for(let T=0;T<o;T++)for(let g=0;g<o;g++){let E=c(T,g)*(b?1:.18+.05*Math.sin(T+_)),[I,R]=l(T,g,x),[U,k]=l(T+1,g,x),[P,X]=l(T+1,g+1,x),[Z,H]=l(T,g+1,x);s.fillStyle=b?`rgba(226,80,127,${.15+.85*E})`:`rgba(160,180,200,${.06+.4*E})`,s.beginPath(),s.moveTo(I,R),s.lineTo(U,k),s.lineTo(P,X),s.lineTo(Z,H),s.fill()}}s.strokeStyle=ht.dim,s.fillStyle=ht.muted,s.lineWidth=1,s.font=`${1.1*ce()}px DM Sans, sans-serif`;let h=l(0,0,0),p=l(o+1,0,0),v=l(0,o+1,0),S=l(0,0,a*(.25+d*1.1)+1);[[p,"x"],[v,"y"],[S,"\u03BB"]].forEach(([_,x])=>{s.beginPath(),s.moveTo(h[0],h[1]),s.lineTo(_[0],_[1]),s.stroke(),s.fillText(x,_[0]+4,_[1]+4)});let m=e*.7,f=e*.26,M=t*.72,A=t*.45;s.strokeStyle=ht.line,s.beginPath(),s.moveTo(m,M),s.lineTo(m+f,M),s.stroke(),s.strokeStyle=ht.warm,s.lineWidth=2,s.beginPath();for(let _=0;_<=60;_++){let x=_/60,b=.12+Math.exp(-((x-.5)**2)/.004);s.lineTo(m+x*f,M-b*A*.85)}s.stroke(),s.fillStyle=ht.muted,s.fillText("one pixel",m,M+1.6*ce()),s.fillStyle=ht.ink,s.fillText("H\u03B1",m+f*.5-ce(),M-A*.95)}}}function $g(i){let e=Qe("div","panel p-spec"),t=42*ce(),n=15*ce(),[s,r]=ln(t,n),a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.classList.add("p-links"),e.append(Qe("div","p-head","The quasar\u2019s light after crossing the halo (z \u2248 0.10)"),s,Qe("div","sp-cloud"),Qe("div","d-note","Each cloud removes light at several wavelengths at once \u2014 its fingerprint. All its lines share one redshift: \u03BB<sub>obs</sub> = \u03BB<sub>rest</sub> (1 + z).")),document.body.appendChild(a);let o={"H I Ly\u03B2":1025.72,"O VI 1032":1031.93,"O VI 1038":1037.62,"Si III":1206.5,"H I Ly\u03B1":1215.67,"C IV 1548":1548.2,"C IV 1551":1550.78},l={cold:["H I Ly\u03B2","Si III","H I Ly\u03B1"],warm:["H I Ly\u03B2","O VI 1032","O VI 1038","H I Ly\u03B1","C IV 1548","C IV 1551"]},c={"H I Ly\u03B1":.9,"H I Ly\u03B2":.6,"Si III":.55,"O VI 1032":.55,"O VI 1038":.35,"C IV 1548":.5,"C IV 1551":.3},u=[.099,.1003,.1012,.1022],d=[{a:1124,b:1146,n:"H I Ly\u03B2 \xB7 O VI"},{a:1322,b:1342,n:"Si III \xB7 H I Ly\u03B1"},{a:1697,b:1711,n:"C IV"}],h=1.2*ce(),p=1.6*ce(),v=2.6*ce(),S=n-2.4*ce(),m=S-v,f=d.reduce((R,U)=>R+(U.b-U.a),0),M=t-2*h-p*(d.length-1),A=R=>{let U=h;for(let k of d){let P=(k.b-k.a)/f*M;if(R>=k.a&&R<=k.b)return U+(R-k.a)/(k.b-k.a)*P;U+=P+p}return null},_=[],x=[],b=-1,T=0,g="",E=[],I=()=>{r.clearRect(0,0,t,n);let R=h;r.font=`${.95*ce()}px DM Sans, sans-serif`;for(let U of d){let k=(U.b-U.a)/f*M;r.strokeStyle=ht.line,r.lineWidth=1,r.beginPath(),r.moveTo(R,S),r.lineTo(R+k,S),r.stroke(),r.strokeStyle=ht.ink,r.lineWidth=1.6,r.beginPath();for(let P=0;P<=220;P++){let X=U.a+P/220*(U.b-U.a),Z=.82;for(let j of x)Z*=1-j.depth*Math.exp(-((X-j.obs)**2)/(2*.32*.32));Z+=Math.sin(P*12.9898+U.a)*43758.5453%1*.012;let H=R+P/220*k,ie=S-Z*m;P?r.lineTo(H,ie):r.moveTo(H,ie)}r.stroke(),r.fillStyle=ht.dim,r.textAlign="left",r.fillText(`${U.a}`,R,S+1.3*ce()),r.textAlign="right",r.fillText(`${U.b} \xC5`,R+k,S+1.3*ce()),r.textAlign="center",r.fillStyle=ht.muted,r.fillText(U.n,R+k/2,1*ce()),R+=k+p}if(b>=0){r.font=`500 ${.9*ce()}px DM Sans, sans-serif`;for(let k of x.filter(P=>P.cloud===b)){let P=A(k.obs);P!=null&&(r.strokeStyle=ht[_[b].phase],r.lineWidth=1.5,r.setLineDash([2,3]),r.beginPath(),r.moveTo(P,v-.4*ce()),r.lineTo(P,S),r.stroke(),r.setLineDash([]))}let U=e.querySelector(".sp-cloud");U.style.color=ht[_[b].phase],U.textContent=`Cloud ${b+1}: z = ${_[b].z.toFixed(4)} \u2014 ${l[_[b].phase].map(k=>k.replace(/ \d+$/,"")).filter((k,P,X)=>X.indexOf(k)===P).join(", ")}`}};return{el:e,show(){_=i.sightClouds(0).map((R,U)=>({...R,z:u[U%u.length]})),x=_.flatMap((R,U)=>l[R.phase].map(k=>({cloud:U,ion:k,obs:o[k]*(1+R.z),depth:c[k]*(R.phase==="cold"?1:.85)}))),b=0,T=0,g="",I(),a.classList.add("on")},hide(){a.classList.remove("on")},tick(R){T+=R;let U=Math.floor(T/3)%Math.max(1,_.length);U!==b&&(b=U,I());let k=s.getBoundingClientRect(),P=k.width/t,X=i.sightCloudsOnScreen(0),Z=`${X.map(H=>H?1:0).join("")}|${b}|${innerWidth}x${innerHeight}|${ce()}`;if(Z!==g)g=Z,a.setAttribute("viewBox",`0 0 ${innerWidth} ${innerHeight}`),a.innerHTML=X.map((H,ie)=>{if(!H)return"";let j=ht[_[ie].phase],F=ie===b,L=`<circle data-c="${ie}" cx="${H[0]}" cy="${H[1]}" r="${.9*ce()}" fill="none" stroke="${j}" stroke-width="${F?3:1.5}" opacity="${F?1:.5}"/>`;if(F)for(let ae of x.filter(ne=>ne.cloud===ie)){let ne=A(ae.obs);ne!=null&&(L+=`<line data-c="${ie}" data-x="${ne}" x1="${H[0]}" y1="${H[1]}" x2="${k.left+ne*P}" y2="${k.top+2.2*ce()}" stroke="${j}" stroke-width="1.2" stroke-dasharray="3 5" opacity="0.7"/>`)}return L}).join(""),E=[...a.children];else for(let H of E){let ie=X[+H.dataset.c];H.tagName==="circle"?(H.setAttribute("cx",ie[0]),H.setAttribute("cy",ie[1])):(H.setAttribute("x1",ie[0]),H.setAttribute("y1",ie[1]),H.setAttribute("x2",k.left+ +H.dataset.x*P),H.setAttribute("y2",k.top+2.2*ce()))}}}}function qg(){let i=Qe("div","panel p-emabs"),e=40*ce(),t=7.4*ce(),[n,s]=ln(e,t),[r,a]=ln(e,t);i.innerHTML='<div class="p-head">Same telescope, same exposure</div>';let o=(M,A)=>{let _=Qe("div","ea-row");return _.append(Qe("div","ea-t",M),A,Qe("div","ea-sn")),_},l=o("Glowing gas only (emission)",n),c=o("Gas in front of a quasar (absorption)",r);i.append(l,c),i.insertAdjacentHTML("beforeend",`<label class="ea-l">Quasar brightness<input type="range" class="q" min="-0.5" max="1.5" step="0.01" value="0.5"></label>
    <label class="ea-l">Noise<input type="range" class="n" min="-2" max="-0.3" step="0.01" value="-1.3"></label>
    <div class="d-note">The emission line is fixed and faint. The absorption line removes a fixed <i>fraction</i> of the quasar\u2019s light, so a brighter quasar makes it stand out.</div>`);let u=i.querySelector(".q"),d=i.querySelector(".n"),h=.12,p=.5,v=()=>Math.sqrt(-2*Math.log(Math.random()+1e-12))*Math.cos(6.2832*Math.random()),S=(M,A,_,x)=>{M.clearRect(0,0,e,t);let b=t-.6*ce(),T=t-1.4*ce();M.strokeStyle=x,M.lineWidth=1.4,M.beginPath();for(let g=0;g<=160;g++){let E=b-Math.max(-.2,Math.min(1.15,A(g/160)/_))*T;g?M.lineTo(g/160*e,E):M.moveTo(0,E)}M.stroke()},m=0,f=()=>{let M=10**+u.value,A=10**+d.value,_=g=>Math.exp(-((g-.5)**2)/(2*.018**2));S(s,g=>h*_(g)+A*v(),.6,ht.warm),S(a,g=>M*(1-p*_(g))+A*v(),M*1.15,ht.ink);let x=h/A,b=p*M/A,T=g=>`S/N \u2248 ${g<10?g.toFixed(1):Math.round(g)} ${g>=5?'<b class="ok">detected</b>':'<b class="no">lost in noise</b>'}`;l.querySelector(".ea-sn").innerHTML=T(x),c.querySelector(".ea-sn").innerHTML=T(b)};return u.addEventListener("input",f),d.addEventListener("input",f),{el:i,show(){u.value=.5,d.value=-1.3,f()},tick(M){m+=M,m>.2&&(m=0,f())}}}function Yg(){let i=Qe("div","panel p-spin"),e=(t,n)=>`<g transform="translate(${t},38)">
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
    <p class="d-note">The electron in a hydrogen atom flips its spin relative to the proton and emits a radio photon. One atom does this only once in ~10 million years \u2014 but galaxies hold so much cold hydrogen that radio telescopes see it easily, even through dust.</p>`,{el:i}}function Zg(){let i=Qe("div","panel p-lines"),e=34*ce(),t=11*ce(),[n,s]=ln(e,t);i.append(Qe("div","p-head","Glowing gas shines in a few colours"),n,Qe("div","d-note","Atoms and ions emit only at their own wavelengths. H\u03B1 (656.3 nm, red) traces ionized hydrogen; [O III] (500.7 nm, green) traces gas lit by hot stars or black holes."));let r=[[372.7,"[O II]",.35],[486.1,"H\u03B2",.35],[495.9,"",.33],[500.7,"[O III]",1],[654.8,"",.12],[656.3,"H\u03B1",.95],[658.3,"[N II]",.35],[671.6,"[S II]",.2],[673.1,"",.15]],a=360,o=700,l=1*ce(),c=t-2.6*ce(),u=c-1.6*ce(),d=p=>l+(p-a)/(o-a)*(e-2*l),h=()=>{s.clearRect(0,0,e,t);let p=s.createLinearGradient(d(380),0,d(700),0);[[380,"#6a3df0"],[450,"#3a6bff"],[495,"#20c0c0"],[530,"#40d040"],[580,"#e0e030"],[610,"#ff9a30"],[660,"#ff3030"],[700,"#a00020"]].forEach(([v,S])=>p.addColorStop((v-380)/320,S)),s.fillStyle=p,s.globalAlpha=.55,s.fillRect(d(380),c+.4*ce(),d(700)-d(380),.6*ce()),s.globalAlpha=1,s.strokeStyle=ht.ink,s.lineWidth=1.6,s.beginPath();for(let v=0;v<=500;v++){let S=a+v/500*(o-a),m=.04;for(let[A,,_]of r)m+=_*Math.exp(-((S-A)**2)/(2*.9**2));let f=d(S),M=c-m*u;v?s.lineTo(f,M):s.moveTo(f,M)}s.stroke(),s.font=`500 ${.95*ce()}px DM Sans, sans-serif`,s.textAlign="center";for(let[v,S,m]of r)S&&(s.fillStyle=S==="H\u03B1"?"#ff6b6b":S==="[O III]"?"#6be38f":ht.muted,s.fillText(S,d(v),c-m*u-.5*ce()));s.fillStyle=ht.dim,s.font=`${.9*ce()}px DM Sans, sans-serif`,s.fillText("wavelength (nm) \u2192",e/2,t-.3*ce());for(let v of[400,500,600,700])s.textAlign="center",s.fillText(v,d(v),c+2.1*ce())};return{el:i,show(){h()}}}function Jg(){let i=Qe("div","panel p-xsrc"),e=30*ce(),t=12*ce(),[n,s]=ln(e,t);i.append(Qe("div","p-head","X-rays from gas at millions of degrees"),n),i.insertAdjacentHTML("beforeend",`<ul class="xs-list">
    <li><b>Hot diffuse gas</b> (&gt;10<sup>6</sup> K): halos, groups, clusters \u2014 a smooth continuum (bremsstrahlung) plus lines of O, Ne, Fe\u2026</li>
    <li><b>Also bright in X-rays:</b> growing black holes (AGN), X-ray binaries, supernova remnants \u2014 they must be told apart from the halo.</li></ul>`);let r=()=>{s.clearRect(0,0,e,t);let a=1.2*ce(),o=t-2*ce(),l=t-3.6*ce(),c=.3,u=2,d=p=>a+Math.log(p/c)/Math.log(u/c)*(e-2*a),h=[[.574,"O VII",.8],[.654,"O VIII",.6],[.82,"Fe L",.7],[.92,"Ne IX",.35],[1.02,"Ne X",.25],[1.35,"Mg",.15]];s.strokeStyle=ht.hot,s.lineWidth=1.8,s.beginPath();for(let p=0;p<=400;p++){let v=c*(u/c)**(p/400),S=.55*Math.exp(-(v-c)/.25);for(let[M,,A]of h)S+=A*.6*Math.exp(-((v-M)**2)/(2*(.012*M/.6)**2));let m=d(v),f=o-Math.min(1,S)*l;p?s.lineTo(m,f):s.moveTo(m,f)}s.stroke(),s.font=`500 ${.9*ce()}px DM Sans, sans-serif`,s.textAlign="center",s.fillStyle=ht.muted,h.forEach(([p,v],S)=>s.fillText(v,d(p),1*ce()+S%2*1.15*ce())),s.fillStyle=ht.dim;for(let p of[.5,1,2])s.fillText(`${p} keV`,d(p),t-.4*ce())};return{el:i,show(){r()}}}function Kg(){let i=Qe("div","panel p-xspec"),e=36*ce(),t=7*ce(),[n,s]=ln(e,t),[r,a]=ln(e,t);i.innerHTML='<div class="p-head">The O VII / O VIII lines, two kinds of camera</div>';let o=(h,p)=>{let v=Qe("div","xr-row");v.append(Qe("div","xr-t",h),p),i.append(v)};o("CCD (Chandra, XMM, eROSITA): ~70 eV resolution",n),o("Microcalorimeter (XRISM Resolve, HUBS): ~5 eV or better",r),i.insertAdjacentHTML("beforeend",'<div class="d-note">Resolved lines are easier to detect above the background, and their ratios, strengths and shifts give the gas <b>temperature</b>, <b>metallicity</b> and <b>velocity</b>.</div>');let l=[[.561,"f",.55],[.569,"i",.25],[.574,"r",.8],[.654,"O VIII",.6]],c=.53,u=.68,d=(h,p,v)=>{h.clearRect(0,0,e,t);let S=ce(),m=t-1.6*ce(),f=t-2.8*ce(),M=x=>S+(x-c)/(u-c)*(e-2*S),A=0,_=x=>.05+l.reduce((b,[T,,g])=>b+g*Math.exp(-((x-T)**2)/(2*p*p))*(.002/p),0);for(let x=0;x<=400;x++)A=Math.max(A,_(c+x/400*(u-c)));h.strokeStyle=ht.hot,h.lineWidth=1.6,h.beginPath();for(let x=0;x<=400;x++){let b=c+x/400*(u-c),T=M(b),g=m-_(b)/A*f;x?h.lineTo(T,g):h.moveTo(T,g)}h.stroke(),h.font=`${.85*ce()}px DM Sans, sans-serif`,h.textAlign="center",h.fillStyle=ht.dim;for(let x of[.55,.6,.65])h.fillText(`${x} keV`,M(x),t-.2*ce());if(v){h.fillStyle=ht.ink,h.fillText("O VII",M(.568),1*ce()),h.fillText("O VIII",M(.654),1*ce()),h.fillStyle=ht.dim,h.font=`${.75*ce()}px DM Sans, sans-serif`;for(let[x,b]of l)b!=="O VIII"&&h.fillText(b,M(x)+(b==="f"?-.3*ce():b==="r"?.3*ce():0),2*ce())}};return{el:i,show(){d(s,.03,!1),d(a,.0021,!0)}}}function jg(){let i=Qe("div","panel p-answers");return i.innerHTML=`<h2>Back to the three questions</h2>
    <section><h3><b>1</b> What drives the diversity of galaxies?</h3><ul>
      <li><b>Gas supply</b> \u2014 set by halo mass and environment: cold streams feed small halos; massive halos receive their gas hot.</li>
      <li><b>Feedback</b> \u2014 supernovae and black holes push gas out or keep it hot. Blue or red depends on this balance.</li>
      <li class="how">Seen with: 21 cm, H\u03B1 / IFS, quasar absorption.</li></ul></section>
    <section><h3><b>2</b> Why so few stars?</h3><ul>
      <li><b>Low-mass galaxies:</b> supernova feedback blows gas out of shallow potential wells.</li>
      <li><b>High-mass galaxies:</b> hot halos cool slowly, and black-hole jets keep them hot.</li>
      <li class="how">Seen with: X-ray emission and stacking, absorption.</li></ul></section>
    <section><h3><b>3</b> Where is the missing ordinary matter, and how much is there?</h3><ul>
      <li><b>Between galaxies:</b> found \u2014 fast radio bursts count it all (Connor+ 2025).</li>
      <li><b>Around galaxies:</b> still uncertain \u2014 maybe about half missing, or in faint hot halos. That needs the new eyes.</li>
      <li class="how">Seen with: FRB dispersion, absorption, X-ray stacking.</li></ul></section>`,{el:i}}function Qg(){let i=Qe("div","panel p-halos"),e=[{name:"Cold gas",ion:"Mg II",phase:"cold",sf:6,q:5,note:"around both \u2014 set mostly by galaxy mass"},{name:"Warm gas",ion:"O VI",phase:"warm",sf:9,q:3,note:"common around star-forming, rare around quiet galaxies"}],t=(n,s)=>Array.from({length:10},(r,a)=>`<i class="${a<n?"on":""}" style="--c:${ht[s]}"></i>`).join("");return i.innerHTML='<div class="hl-grid"><span></span><b class="sf">Star-forming spiral</b><b class="q">Quiet elliptical</b>'+e.map(n=>`<span class="hl-row"><em style="color:${ht[n.phase]}">\u25CF</em> ${n.name} <small>${n.ion}</small></span>
      <div class="hl-dots" aria-label="${n.sf} of 10">${t(n.sf,n.phase)}</div><div class="hl-dots" aria-label="${n.q} of 10">${t(n.q,n.phase)}</div>
      <span class="hl-note">${n.note}</span>`).join("")+'</div><div class="d-note">Schematic: filled dots = sightlines where the gas is detected (out of 10). After Huang+ 2021 (Mg II), Qu+ 2024 (O VI).</div>',{el:i}}function e0(){let i=Qe("div","panel p-stack"),e=64,t=13*ce(),[n,s]=ln(t,t),[r,a]=ln(t,t),o=s.createImageData(e,e),l=a.createImageData(e,e),c=new Float32Array(e*e);for(let A=0;A<e;A++)for(let _=0;_<e;_++){let x=(_-e/2)/8,b=(A-e/2)/8;c[A*e+_]=Math.exp(-(x*x+b*b)/2)}let u=A=>{let _=Math.max(-1,Math.min(1,A/1.5)),x=[52,58,66],b=[42,120,214],T=[226,80,70],g=_<0?b:T,E=Math.abs(_);return[x[0]+(g[0]-x[0])*E,x[1]+(g[1]-x[1])*E,x[2]+(g[2]-x[2])*E]},d=(A,_,x,b)=>{for(let g=0;g<e*e;g++){let[E,I,R]=u(b(g));A.data.set([E,I,R,255],g*4)}let T=document.createElement("canvas");T.width=T.height=e,T.getContext("2d").putImageData(A,0,0),_.imageSmoothingEnabled=!1,_.clearRect(0,0,t,t),_.drawImage(T,0,0,t,t)},h=()=>Math.sqrt(-2*Math.log(Math.random()+1e-12))*Math.cos(6.2832*Math.random());i.append(Qe("div","p-head","Average many galaxies"));let p=Qe("div","st-row"),v=Qe("figure"),S=Qe("figure");v.append(n,Qe("figcaption","","The faint signal we want")),S.append(r,Qe("figcaption","","")),p.append(v,S),i.append(p),i.insertAdjacentHTML("beforeend",`<input type="range" min="0" max="4" step="0.01" value="0">
    <div class="d-ticks"><span style="left:0%">1</span><span style="left:50%">100</span><span style="left:100%">10,000 galaxies</span></div>
    <div class="d-note">Each observation has noise 10\xD7 bigger than the signal. Averaging N of them shrinks the noise by \u221AN.</div>`);let m=i.querySelector("input"),f=0;d(o,s,n,A=>c[A]);let M=()=>{let A=Math.round(10**+m.value),_=10/Math.sqrt(A);d(l,a,r,x=>c[x]+_*h()),S.querySelector("figcaption").innerHTML=`Average of <b>${A.toLocaleString("en")}</b> observation${A>1?"s":""} \xB7 noise ${_<1?_.toFixed(2):_.toFixed(1)}`};return m.addEventListener("input",M),{el:i,show(){m.value=0,M()},tick(A){f+=A,f>.15&&(f=0,M())}}}function t0(i){let e=Qe("div","panel p-frb"),t=30*ce(),n=11*ce(),[s,r]=ln(t,n),a=Qe("div","frb-left");a.append(Qe("div","p-head","The burst as it arrives"),s,Qe("div","d-note","Low frequencies arrive later; the more gas crossed, the bigger the delay."));let o=Qe("div","frb-right",`<div class="p-head">Where is the ordinary matter today?</div>
     <div class="census"><i class="ig" style="width:76%"></i><i class="gx" style="width:24%"></i></div>
     <div class="census-k"><span style="width:76%"><em style="background:#2a9fd0"></em>Between galaxies \xB7 about \xBE</span><span><em style="background:#8f6ff2"></em>In &amp; around galaxies</span></div>
     <div class="d-note">Fast radio bursts count all the electrons along their path. Connor+ 2025.</div>`);e.append(a,o);let l=0,c="";return{el:e,show(u,d){l=d,o.classList.toggle("on",d>=1),e.classList.toggle("wide",d>=1)},tick(){let u=i.frbCrossed(),d=i.frbStarted(),h=`${d}|${u}|${ce()}|${document.fonts.status}`;if(h===c)return;c=h,r.clearRect(0,0,t,n);let p=2.4*ce(),v=p,S=t-ce(),m=ce(),f=n-p;if(r.fillStyle="#0c1824",r.fillRect(v,m,S-v,f-m),d){let M=.9*u;for(let A=0;A<=120;A++){let _=.4+.4*(A/120),x=M*(1/(_*_)-1/.64)/(1/.16-1/.64),b=v+(.06+x*.86)*(S-v),T=m+(1-A/120)*(f-m),g=r.createRadialGradient(b,T,0,b,T,.9*ce());g.addColorStop(0,"rgba(255,190,140,0.95)"),g.addColorStop(1,"rgba(255,140,80,0)"),r.fillStyle=g,r.fillRect(b-ce(),T-ce(),2*ce(),2*ce())}}r.fillStyle=ht.dim,r.font=`${1*ce()}px DM Sans, sans-serif`,r.fillText("time \u2192",S-4.5*ce(),n-.6*ce()),r.save(),r.translate(1.2*ce(),f),r.rotate(-Math.PI/2),r.fillText("radio frequency \u2192",0,0),r.restore()}}}function n0(i){let e=Qe("div","panel p-future"),t=[{band:"Radio",gas:"cold gas",c:ht.cold,items:[{n:"FAST",s:"operating",cn:1,f:"fast",d:"Largest single dish; deep 21 cm maps",u:"https://fast.bao.ac.cn/",r:["Nan+ 2011","https://arxiv.org/abs/1105.3794"]},{n:"FAST Core Array",s:"planned",cn:1,f:"fast-core-array",d:"Dishes around FAST for sharper maps"},{n:"SKA",s:"building",f:"ska",d:"Thousands of antennas on two continents",u:"https://www.skao.int/",r:["Dewdney+ 2009","https://doi.org/10.1109/JPROC.2009.2021005"]}]},{band:"Optical",gas:"warm gas, glowing",c:ht.warm,items:[{n:"VLT / MUSE \xB7 Keck / KCWI",s:"operating",f:"vlt",d:"3D maps of glowing halo gas",u:"https://www.eso.org/public/teles-instr/paranal-observatory/vlt/vlt-instr/muse/",r:["Bacon+ 2010","https://doi.org/10.1117/12.856027"],r2:["Morrissey+ 2018","https://arxiv.org/abs/1807.10356"]},{n:"CSST",s:"planned",cn:1,f:"csst",d:"China\u2019s space survey telescope",r:["Gong+ 2019","https://arxiv.org/abs/1901.04634"]},{n:"AMASE",s:"planned",cn:1,f:"amase-prototype",d:"Wide-field integral-field mapping",r:["Yan+ 2021","https://arxiv.org/abs/2105.11471"]},{n:"14.5 m telescope",s:"planned \xB7 name not yet decided",cn:1,d:"With a possible new IFU, CUBWISE (concept)"}]},{band:"Ultraviolet",gas:"warm gas",c:ht.warm,items:[{n:"Hubble / COS",s:"operating",f:"hubble",d:"Absorption lines toward quasars",u:"https://www.stsci.edu/hst/instrumentation/cos",r:["Green+ 2012","https://arxiv.org/abs/1110.0462"]},{n:"Aspera",s:"planned",d:"Small satellite imaging halo gas in UV"},{n:"Lyric \xB7 Cafe",s:"concept",cn:1,f:"lyric",d:"UV mapping of halos from China",r:["Ji+ 2020","https://arxiv.org/abs/2012.07384"]}]},{band:"X-ray",gas:"hot gas",c:ht.hot,items:[{n:"eROSITA",s:"data 2019\u201322",f:"erosita-allsky",d:"All-sky X-ray survey",u:"https://www.mpe.mpg.de/eROSITA",r:["Predehl+ 2021","https://arxiv.org/abs/2010.03477"]},{n:"XRISM",s:"operating",f:"xrism",d:"Precise X-ray spectra: speed and temperature of hot gas",u:"https://science.nasa.gov/mission/xrism/"},{n:"HUBS",s:"planned",cn:1,f:"xray-mission",d:"Built to map hot gas around galaxies",r:["Cui+ 2020","https://doi.org/10.1007/s10909-019-02279-3"]},{n:"DIXE",s:"planned",cn:1,f:"dixe",d:"X-ray spectrometer on the Chinese Space Station",r:["Jin+ 2024","https://arxiv.org/abs/2406.09813"]}]}],n=(r,a)=>`<a href="${r}" target="_blank" rel="noopener">${a}</a>`,s=r=>[r.u&&n(r.u,"site \u2197"),r.r&&n(r.r[1],r.r[0]),r.r2&&n(r.r2[1],r.r2[0])].filter(Boolean).join("");return e.innerHTML="<h2>New eyes are coming \u2014 many of them built here</h2>"+t.map(r=>`<section style="--c:${r.c}"><h3>${r.band}</h3><p>${r.gas}</p>`+r.items.map(a=>`<div class="card${a.f?"":" plain"}"${a.f?` data-fig="${a.f}" role="button" tabindex="0"`:""}><b>${a.n}</b><span>${a.d}</span><em>${a.s}${a.cn?" \xB7 <strong>China</strong>":""}</em>`+(s(a)?`<nav>${s(a)}</nav>`:"")+"</div>").join("")+"</section>").join(""),e.addEventListener("click",r=>{if(r.target.closest("a"))return;let a=r.target.closest(".card[data-fig]");a&&i.openFig(a.dataset.fig)}),e.addEventListener("keydown",r=>{let a=r.target.closest(".card[data-fig]");a&&r.key==="Enter"&&i.openFig(a.dataset.fig)}),{el:e}}function i0(){let i=Qe("div","panel p-inv"),e=15,t=10.5,n=18,s=18,r=(u,d,h,p,v)=>{let S=(E,I)=>[n+I*Math.sin(E*2*Math.PI),s-I*Math.cos(E*2*Math.PI)],[m,f]=S(u,p),[M,A]=S(d,p),[_,x]=S(d,h),[b,T]=S(u,h),g=d-u>.5?1:0;return`<path d="M${m} ${f}A${p} ${p} 0 ${g} 1 ${M} ${A}L${_} ${x}A${h} ${h} 0 ${g} 0 ${b} ${T}Z" fill="${v}" stroke="#0a121c" stroke-width="0.25"/>`},a=[{n:"Dark energy",v:.685,pct:68,c:"#5b6b8c"},{n:"Dark matter",v:.266,pct:27,c:"#8f6ff2"},{n:"Ordinary matter",v:.049,pct:5,c:"#c07a1e"}],o=0,l=a.map(u=>{let d=o;return o+=u.v,{...u,a0:d,a1:o}});i.innerHTML=`<div class="inv-q"></div><div class="inv-body">
    <svg viewBox="0 0 36 36" class="inv-donut">${l.map((u,d)=>`<g class="seg s${d}">${r(u.a0,u.a1,t,e,u.c)}</g>`).join("")}
      <g class="seg s3">${r(.951,.951+.049*.08,e+.8,e+2.4,"#ffd9a0")}</g></svg>
    <ul class="inv-key">${l.map((u,d)=>`<li class="k${d}"><i style="background:${u.c}"></i><b>${u.pct}%</b> ${u.n}</li>`).join("")}
      <li class="k3"><i style="background:#ffd9a0"></i><b>&lt;10%</b> of ordinary matter is in stars</li></ul></div>`;let c=["Everything you have ever seen \u2014 stars, planets, you \u2014 is ordinary matter. How much of the universe is that?","Only about 5%. The rest is dark matter and dark energy.","And of that 5%, how much is in stars? Less than a tenth."];return{el:i,show(u,d){i.querySelector(".inv-q").textContent=c[d],i.classList.toggle("reveal",d>=1),i.classList.toggle("stars",d>=2)}}}function s0(i){let e=Qe("div","panel p-cycle"),t=[{n:"Accretion",d:"gas falls in from the cosmic web",a:-90},{n:"Star formation",d:"cold gas collapses into stars",a:0},{n:"Feedback",d:"supernovae and black holes push gas out",a:90},{n:"Recycling",d:"some of it cools and falls back",a:180}],n=13,s=20,r=o=>[s+n*Math.cos(o*Math.PI/180),s+n*Math.sin(o*Math.PI/180)];e.innerHTML=`<div class="cy-wrap"><svg viewBox="0 0 40 40" class="cy-svg">
      <circle cx="${s}" cy="${s}" r="${n}" fill="none" stroke="#ffffff22" stroke-width="0.35"/>
      <circle class="cy-run" cx="${s}" cy="${s}" r="${n}" fill="none" stroke="#8ad2dd" stroke-width="0.6" stroke-dasharray="3 79"/>
      ${t.map((o,l)=>{let[c,u]=r(o.a);return`<g class="cy-n n${l}"><circle cx="${c}" cy="${u}" r="3.2"/><text x="${c}" y="${u+.6}">${l+1}</text></g>`}).join("")}
      <text x="${s}" y="${s-.6}" class="cy-mid">the baryon</text><text x="${s}" y="${s+2.4}" class="cy-mid">cycle</text>
    </svg><ol class="cy-list">${t.map((o,l)=>`<li class="n${l}"><b>${o.n}</b><span>${o.d}</span></li>`).join("")}</ol></div>
    <figure class="cy-video"><video data-media-src="video/tng50-galaxy.mp4" muted loop playsinline preload="none" controls></video>
      <figcaption>One galaxy forming in the TNG50 simulation: gas (colour) flows in, forms stars, and is blown back out. \xB7 TNG Collaboration</figcaption></figure>`;let a=e.querySelector("video");return{el:e,show(o,l){for(let u=0;u<4;u++)e.querySelectorAll(`.n${u}`).forEach(d=>d.classList.toggle("lit",u<l+1));let c=l>=4;if(e.classList.toggle("vid",c),c){let u=i.mediaURL(a.dataset.mediaSrc);a.getAttribute("src")!==u&&(a.src=u),a.play().catch(()=>{})}else a.pause()},hide(){a.pause()}}}function r0(){let i=Qe("div","panel p-smhm"),e=40*ce(),t=26*ce(),n={l:4.6*ce(),r:1.2*ce(),t:1.2*ce(),b:3.6*ce()},[s,r]=ln(e,t),a=10,o=15,l=7,c=13,u=x=>n.l+(x-a)/(o-a)*(e-n.l-n.r),d=x=>t-n.b-(x-l)/(c-l)*(t-n.t-n.b),h=.157,p=.0351,v=11.59,S=1.376,m=.608,f=x=>2*p/(10**(-S*(x-v))+10**(m*(x-v))),M=(x,b)=>x+Math.log10(h/(1+b*(h/f(x)-1)));i.append(Qe("div","p-head","Stars in a galaxy vs. the mass of its halo"),s),i.insertAdjacentHTML("beforeend",`<input type="range" min="0" max="1" step="0.01" value="0">
    <div class="d-ticks"><span style="left:0%">no feedback</span><span style="left:100%">strong feedback</span></div>
    <div class="d-note">Dots: real galaxies follow this curve (fit of Moster+ 2013). Dashed: every bit of the halo's ordinary matter turned into stars.</div>`);let A=i.querySelector("input"),_=()=>{let x=+A.value;r.clearRect(0,0,e,t),r.strokeStyle="#ffffff14",r.lineWidth=1,r.fillStyle=ht.dim,r.font=`${.95*ce()}px DM Sans, sans-serif`;for(let b=a;b<=o;b++)r.beginPath(),r.moveTo(u(b),d(l)),r.lineTo(u(b),d(c)),r.stroke();for(let b=a;b<=o;b++)r.textAlign="center",r.fillText(`10^${b}`,u(b),t-n.b+1.5*ce());for(let b=l+1;b<=c;b+=2)r.beginPath(),r.moveTo(u(a),d(b)),r.lineTo(u(o),d(b)),r.stroke(),r.textAlign="right",r.fillText(`10^${b}`,u(a)-.5*ce(),d(b)+.35*ce());r.textAlign="center",r.fillStyle=ht.muted,r.fillText("halo mass (Suns)",u(12.5),t-.5*ce()),r.save(),r.translate(1.1*ce(),d(9.5)),r.rotate(-Math.PI/2),r.fillText("mass in stars (Suns)",0,0),r.restore(),r.save(),r.beginPath(),r.rect(u(a),d(c),u(o)-u(a),d(l)-d(c)),r.clip(),r.setLineDash([5,5]),r.strokeStyle="#c07a1e",r.lineWidth=2,r.beginPath(),r.moveTo(u(a),d(a+Math.log10(h))),r.lineTo(u(o),d(o+Math.log10(h))),r.stroke(),r.setLineDash([]);for(let b=0;b<90;b++){let T=I=>{let R=Math.sin(b*12.9898+I*78.233)*43758.5453;return R-Math.floor(R)},g=10.3+T(1)*4.4,E=(T(2)+T(3)+T(4)-1.5)*.3;r.fillStyle="#d7e3ee",r.beginPath(),r.arc(u(g),d(g+Math.log10(f(g))+E),.32*ce(),0,6.283),r.fill()}r.strokeStyle="#8ad2dd",r.lineWidth=3,r.beginPath();for(let b=0;b<=100;b++){let T=a+b/100*(o-a),g=M(T,x);b?r.lineTo(u(T),d(g)):r.moveTo(u(T),d(g))}r.stroke(),r.restore(),r.fillStyle="#8ad2dd",r.textAlign="right",r.font=`500 ${1.05*ce()}px DM Sans, sans-serif`,r.fillText("model with feedback",u(14.95),d(Math.min(M(14.6,x),12.6))+1.8*ce()),r.fillStyle="#e7b36b",r.textAlign="left",r.fillText("if all gas became stars",u(10.6),d(12.4)),x>.45&&(r.fillStyle=ht.muted,r.font=`${1*ce()}px DM Sans, sans-serif`,r.fillText("stars & supernovae",u(10.25),d(M(10.6,x))+2.2*ce()),r.textAlign="right",r.fillText("black holes",u(14.9),d(M(14.6,x))+2.2*ce())),r.fillStyle="#ffd9a0",r.beginPath(),r.arc(u(12.1),d(10.75),.55*ce(),0,6.283),r.fill(),r.textAlign="left",r.fillStyle=ht.ink,r.font=`${1*ce()}px DM Sans, sans-serif`,r.fillText("Milky Way",u(12.1)+.9*ce(),d(10.75)+1.6*ce())};return A.addEventListener("input",_),{el:i,show(){A.value=0,_()}}}function a0(){let i=Qe("div","panel p-budget");return i.innerHTML=`<div class="p-head">Ordinary matter in a Milky Way\u2013like halo</div>
    <div class="bg-row"><span>Expected</span><div class="bg-bar"><i style="width:100%;background:#c07a1e55;border:1px dashed #c07a1e"></i></div><em>~200 billion Suns</em></div>
    <div class="bg-row"><span>Found</span><div class="bg-bar"><i style="width:30%;background:#c07a1e"></i><i style="width:5%;background:#2a9fd0"></i><i class="cgm" style="width:0%"></i></div><em class="bg-found">about one third</em></div>
    <div class="bg-key"><span><i style="background:#c07a1e"></i>stars</span><span><i style="background:#2a9fd0"></i>gas in the disk</span><span class="cgm-k"><i class="cgm"></i>hot halo gas?</span></div>
    <div class="d-note">Rough numbers for the Milky Way. Where is the other two thirds \u2014 pushed out, or hiding in a hot halo we can barely see?</div>`,{el:i,show(e,t){i.querySelector(".bg-bar i.cgm").style.width=t>=1?"35%":"0%",i.querySelector(".bg-found").textContent=t>=1?"one third + ?":"about one third",i.classList.toggle("k1",t>=1)}}}var Hu={emabs:qg,spinflip:Yg,lines:Zg,xsources:Jg,xspec:Kg,answers:jg,temperature:Gg,dish:Wg,ifs:Xg,spectrum:$g,halos:Qg,stack:e0,frb:t0,future:n0,inventory:i0,cycle:s0,smhm:r0,budget:a0};$l({scene:Vu,panels:Hu});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
