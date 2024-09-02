(function(ts){typeof define=="function"&&define.amd?define(ts):ts()})(function(){"use strict";function ts(t){return Object.keys(t).reduce((r,s)=>{const n=t[s];return r[s]=Object.assign({},n),Li(n.value)&&!$l(n.value)&&!Array.isArray(n.value)&&(r[s].value=Object.assign({},n.value)),Array.isArray(n.value)&&(r[s].value=n.value.slice(0)),r},{})}function _l(t){return t?Object.keys(t).reduce((r,s)=>{const n=t[s];return r[s]=Li(n)&&"value"in n?n:{value:n},r[s].attribute||(r[s].attribute=Sl(s)),r[s].parse="parse"in r[s]?r[s].parse:typeof r[s].value!="string",r},{}):{}}function xl(t){return Object.keys(t).reduce((r,s)=>(r[s]=t[s].value,r),{})}function kl(t,e){const r=ts(e);return Object.keys(e).forEach(n=>{const i=r[n],o=t.getAttribute(i.attribute),a=t[n];o&&(i.value=i.parse?Ni(o):o),a!=null&&(i.value=Array.isArray(a)?a.slice(0):a),i.reflect&&Ri(t,i.attribute,i.value,!!i.parse),Object.defineProperty(t,n,{get(){return i.value},set(l){const c=i.value;i.value=l,i.reflect&&Ri(this,i.attribute,i.value,!!i.parse);for(let u=0,d=this.__propertyChangedCallbacks.length;u<d;u++)this.__propertyChangedCallbacks[u](n,l,c)},enumerable:!0,configurable:!0})}),r}function Ni(t){if(!!t)try{return JSON.parse(t)}catch{return t}}function Ri(t,e,r,s){if(r==null||r===!1)return t.removeAttribute(e);let n=s?JSON.stringify(r):r;t.__updating[e]=!0,n==="true"&&(n=""),t.setAttribute(e,n),Promise.resolve().then(()=>delete t.__updating[e])}function Sl(t){return t.replace(/\.?([A-Z]+)/g,(e,r)=>"-"+r.toLowerCase()).replace("_","-").replace(/^-/,"")}function Li(t){return t!=null&&(typeof t=="object"||typeof t=="function")}function $l(t){return Object.prototype.toString.call(t)==="[object Function]"}function Cl(t){return typeof t=="function"&&t.toString().indexOf("class")===0}let hn;function Al(t,e){const r=Object.keys(e);return class extends t{static get observedAttributes(){return r.map(n=>e[n].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=kl(this,e);const n=xl(this.props),i=this.Component,o=hn;try{hn=this,this.__initialized=!0,Cl(i)?new i(n,{element:this}):i(n,{element:this})}finally{hn=o}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let n=null;for(;n=this.__releaseCallbacks.pop();)n(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(n,i,o){if(!!this.__initialized&&!this.__updating[n]&&(n=this.lookupProp(n),n in e)){if(o==null&&!this[n])return;this[n]=e[n].parse?Ni(o):o}}lookupProp(n){if(!!e)return r.find(i=>n===i||n===e[i].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(n){this.__releaseCallbacks.push(n)}addPropertyChangedCallback(n){this.__propertyChangedCallbacks.push(n)}}}function El(t,e={},r={}){const{BaseElement:s=HTMLElement,extension:n,customElements:i=window.customElements}=r;return o=>{if(!t)throw new Error("tag is required to register a Component");let a=i.get(t);return a?(a.prototype.Component=o,a):(a=Al(s,_l(e)),a.prototype.Component=o,a.prototype.registeredTag=t,i.define(t,a,n),a)}}const M={context:void 0,registry:void 0,done:!1,getContextId(){return Ii(this.context.count)},getNextContextId(){return Ii(this.context.count++)}};function Ii(t){const e=String(t),r=e.length-1;return M.context.id+(r?String.fromCharCode(96+r):"")+e}function cr(t){M.context=t}const Tl=(t,e)=>t===e,Me=Symbol("solid-proxy"),fn=Symbol("solid-track"),rs={equals:Tl};let ur=null,Di=Bi;const We=1,ss=2,Mi={owned:null,cleanups:null,context:null,owner:null},pn={};var Z=null;let It=null,Ol=null,Y=null,he=null,Se=null,ns=0;function dr(t,e){const r=Y,s=Z,n=t.length===0,i=e===void 0?s:e,o=n?Mi:{owned:null,cleanups:null,context:i?i.context:null,owner:i},a=n?t:()=>t(()=>Pe(()=>ls(o)));Z=o,Y=null;try{return ct(a,!0)}finally{Y=r,Z=s}}function W(t,e){e=e?Object.assign({},rs,e):rs;const r={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},s=n=>(typeof n=="function"&&(n=n(r.value)),Vi(r,n));return[Ui.bind(r),s]}function zi(t,e,r){const s=fr(t,e,!0,We);zt(s)}function _e(t,e,r){const s=fr(t,e,!1,We);zt(s)}function is(t,e,r){Di=zl;const s=fr(t,e,!1,We),n=Mt&&Dt(Mt);n&&(s.suspense=n),(!r||!r.render)&&(s.user=!0),Se?Se.push(s):zt(s)}function ue(t,e,r){r=r?Object.assign({},rs,r):rs;const s=fr(t,e,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=r.equals||void 0,zt(s),Ui.bind(s)}function Pl(t){return t&&typeof t=="object"&&"then"in t}function Oe(t,e,r){let s,n,i;arguments.length===2&&typeof e=="object"||arguments.length===1?(s=!0,n=t,i=e||{}):(s=t,n=e,i=r||{});let o=null,a=pn,l=null,c=!1,u=!1,d="initialValue"in i,m=typeof s=="function"&&ue(s);const f=new Set,[g,v]=(i.storage||W)(i.initialValue),[y,w]=W(void 0),[k,C]=W(void 0,{equals:!1}),[P,N]=W(d?"ready":"unresolved");M.context&&(l=M.getNextContextId(),i.ssrLoadFrom==="initial"?a=i.initialValue:M.load&&M.has(l)&&(a=M.load(l)));function V(A,D,F,le){return o===A&&(o=null,le!==void 0&&(d=!0),(A===a||D===a)&&i.onHydrated&&queueMicrotask(()=>i.onHydrated(le,{value:D})),a=pn,ae(D,F)),D}function ae(A,D){ct(()=>{D===void 0&&v(()=>A),N(D!==void 0?"errored":d?"ready":"unresolved"),w(D);for(const F of f.keys())F.decrement();f.clear()},!1)}function we(){const A=Mt&&Dt(Mt),D=g(),F=y();if(F!==void 0&&!o)throw F;return Y&&!Y.user&&A&&zi(()=>{k(),o&&(A.resolved&&It&&c?It.promises.add(o):f.has(A)||(A.increment(),f.add(A)))}),D}function ne(A=!0){if(A!==!1&&u)return;u=!1;const D=m?m():s;if(c=It,D==null||D===!1){V(o,Pe(g));return}const F=a!==pn?a:Pe(()=>n(D,{value:g(),refetching:A}));return Pl(F)?(o=F,"value"in F?(F.status==="success"?V(o,F.value,void 0,D):V(o,void 0,bn(F.value),D),F):(u=!0,queueMicrotask(()=>u=!1),ct(()=>{N(d?"refreshing":"pending"),C()},!1),F.then(le=>V(F,le,void 0,D),le=>V(F,void 0,bn(le),D)))):(V(o,F,void 0,D),F)}return Object.defineProperties(we,{state:{get:()=>P()},error:{get:()=>y()},loading:{get(){const A=P();return A==="pending"||A==="refreshing"}},latest:{get(){if(!d)return we();const A=y();if(A&&!o)throw A;return g()}}}),m?zi(()=>ne(!1)):ne(!1),[we,{refetch:ne,mutate:v}]}function Nl(t){return ct(t,!1)}function Pe(t){if(Y===null)return t();const e=Y;Y=null;try{return t()}finally{Y=e}}function mn(t){return Z===null||(Z.cleanups===null?Z.cleanups=[t]:Z.cleanups.push(t)),t}function ji(t,e){ur||(ur=Symbol("error")),Z=fr(void 0,void 0,!0),Z.context={...Z.context,[ur]:[e]};try{return t()}catch(r){cs(r)}finally{Z=Z.owner}}function gn(){return Y}function J(){return Z}function Rl(t){Se.push.apply(Se,t),t.length=0}function hr(t,e){const r=Symbol("context");return{id:r,Provider:jl(r),defaultValue:t}}function Dt(t){let e;return Z&&Z.context&&(e=Z.context[t.id])!==void 0?e:t.defaultValue}function Ll(t){const e=ue(t),r=ue(()=>vn(e()));return r.toArray=()=>{const s=r();return Array.isArray(s)?s:s!=null?[s]:[]},r}let Mt;function Il(){return Mt||(Mt=hr())}function Ui(){if(this.sources&&this.state)if(this.state===We)zt(this);else{const t=he;he=null,ct(()=>as(this),!1),he=t}if(Y){const t=this.observers?this.observers.length:0;Y.sources?(Y.sources.push(this),Y.sourceSlots.push(t)):(Y.sources=[this],Y.sourceSlots=[t]),this.observers?(this.observers.push(Y),this.observerSlots.push(Y.sources.length-1)):(this.observers=[Y],this.observerSlots=[Y.sources.length-1])}return this.value}function Vi(t,e,r){let s=t.value;return(!t.comparator||!t.comparator(s,e))&&(t.value=e,t.observers&&t.observers.length&&ct(()=>{for(let n=0;n<t.observers.length;n+=1){const i=t.observers[n],o=It&&It.running;o&&It.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?he.push(i):Se.push(i),i.observers&&Fi(i)),o||(i.state=We)}if(he.length>1e6)throw he=[],new Error},!1)),e}function zt(t){if(!t.fn)return;ls(t);const e=ns;Dl(t,t.value,e)}function Dl(t,e,r){let s;const n=Z,i=Y;Y=Z=t;try{s=t.fn(e)}catch(o){return t.pure&&(t.state=We,t.owned&&t.owned.forEach(ls),t.owned=null),t.updatedAt=r+1,cs(o)}finally{Y=i,Z=n}(!t.updatedAt||t.updatedAt<=r)&&(t.updatedAt!=null&&"observers"in t?Vi(t,s):t.value=s,t.updatedAt=r)}function fr(t,e,r,s=We,n){const i={fn:t,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:Z,context:Z?Z.context:null,pure:r};return Z===null||Z!==Mi&&(Z.owned?Z.owned.push(i):Z.owned=[i]),i}function os(t){if(t.state===0)return;if(t.state===ss)return as(t);if(t.suspense&&Pe(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<ns);)t.state&&e.push(t);for(let r=e.length-1;r>=0;r--)if(t=e[r],t.state===We)zt(t);else if(t.state===ss){const s=he;he=null,ct(()=>as(t,e[0]),!1),he=s}}function ct(t,e){if(he)return t();let r=!1;e||(he=[]),Se?r=!0:Se=[],ns++;try{const s=t();return Ml(r),s}catch(s){r||(Se=null),he=null,cs(s)}}function Ml(t){if(he&&(Bi(he),he=null),t)return;const e=Se;Se=null,e.length&&ct(()=>Di(e),!1)}function Bi(t){for(let e=0;e<t.length;e++)os(t[e])}function zl(t){let e,r=0;for(e=0;e<t.length;e++){const s=t[e];s.user?t[r++]=s:os(s)}if(M.context){if(M.count){M.effects||(M.effects=[]),M.effects.push(...t.slice(0,r));return}else M.effects&&(t=[...M.effects,...t],r+=M.effects.length,delete M.effects);cr()}for(e=0;e<r;e++)os(t[e])}function as(t,e){t.state=0;for(let r=0;r<t.sources.length;r+=1){const s=t.sources[r];if(s.sources){const n=s.state;n===We?s!==e&&(!s.updatedAt||s.updatedAt<ns)&&os(s):n===ss&&as(s,e)}}}function Fi(t){for(let e=0;e<t.observers.length;e+=1){const r=t.observers[e];r.state||(r.state=ss,r.pure?he.push(r):Se.push(r),r.observers&&Fi(r))}}function ls(t){let e;if(t.sources)for(;t.sources.length;){const r=t.sources.pop(),s=t.sourceSlots.pop(),n=r.observers;if(n&&n.length){const i=n.pop(),o=r.observerSlots.pop();s<n.length&&(i.sourceSlots[o]=s,n[s]=i,r.observerSlots[s]=o)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)ls(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function bn(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Zi(t,e,r){try{for(const s of e)s(t)}catch(s){cs(s,r&&r.owner||null)}}function cs(t,e=Z){const r=ur&&e&&e.context&&e.context[ur],s=bn(t);if(!r)throw s;Se?Se.push({fn(){Zi(s,r,e)},state:We}):Zi(s,r,e)}function vn(t){if(typeof t=="function"&&!t.length)return vn(t());if(Array.isArray(t)){const e=[];for(let r=0;r<t.length;r++){const s=vn(t[r]);Array.isArray(s)?e.push.apply(e,s):e.push(s)}return e}return t}function jl(t,e){return function(s){let n;return _e(()=>n=Pe(()=>(Z.context={...Z.context,[t]:s.value},Ll(()=>s.children))),void 0),n}}const Ul=Symbol("fallback");function Hi(t){for(let e=0;e<t.length;e++)t[e]()}function Vl(t,e,r={}){let s=[],n=[],i=[],o=0,a=e.length>1?[]:null;return mn(()=>Hi(i)),()=>{let l=t()||[],c=l.length,u,d;return l[fn],Pe(()=>{let f,g,v,y,w,k,C,P,N;if(c===0)o!==0&&(Hi(i),i=[],s=[],n=[],o=0,a&&(a=[])),r.fallback&&(s=[Ul],n[0]=dr(V=>(i[0]=V,r.fallback())),o=1);else if(o===0){for(n=new Array(c),d=0;d<c;d++)s[d]=l[d],n[d]=dr(m);o=c}else{for(v=new Array(c),y=new Array(c),a&&(w=new Array(c)),k=0,C=Math.min(o,c);k<C&&s[k]===l[k];k++);for(C=o-1,P=c-1;C>=k&&P>=k&&s[C]===l[P];C--,P--)v[P]=n[C],y[P]=i[C],a&&(w[P]=a[C]);for(f=new Map,g=new Array(P+1),d=P;d>=k;d--)N=l[d],u=f.get(N),g[d]=u===void 0?-1:u,f.set(N,d);for(u=k;u<=C;u++)N=s[u],d=f.get(N),d!==void 0&&d!==-1?(v[d]=n[u],y[d]=i[u],a&&(w[d]=a[u]),d=g[d],f.set(N,d)):i[u]();for(d=k;d<c;d++)d in v?(n[d]=v[d],i[d]=y[d],a&&(a[d]=w[d],a[d](d))):n[d]=dr(m);n=n.slice(0,o=c),s=l.slice(0)}return n});function m(f){if(i[d]=f,a){const[g,v]=W(d);return a[d]=v,e(l[d],g)}return e(l[d])}}}function S(t,e){return Pe(()=>t(e||{}))}function us(){return!0}const yn={get(t,e,r){return e===Me?r:t.get(e)},has(t,e){return e===Me?!0:t.has(e)},set:us,deleteProperty:us,getOwnPropertyDescriptor(t,e){return{configurable:!0,enumerable:!0,get(){return t.get(e)},set:us,deleteProperty:us}},ownKeys(t){return t.keys()}};function wn(t){return(t=typeof t=="function"?t():t)?t:{}}function Bl(){for(let t=0,e=this.length;t<e;++t){const r=this[t]();if(r!==void 0)return r}}function ds(...t){let e=!1;for(let o=0;o<t.length;o++){const a=t[o];e=e||!!a&&Me in a,t[o]=typeof a=="function"?(e=!0,ue(a)):a}if(e)return new Proxy({get(o){for(let a=t.length-1;a>=0;a--){const l=wn(t[a])[o];if(l!==void 0)return l}},has(o){for(let a=t.length-1;a>=0;a--)if(o in wn(t[a]))return!0;return!1},keys(){const o=[];for(let a=0;a<t.length;a++)o.push(...Object.keys(wn(t[a])));return[...new Set(o)]}},yn);const r={},s=Object.create(null);for(let o=t.length-1;o>=0;o--){const a=t[o];if(!a)continue;const l=Object.getOwnPropertyNames(a);for(let c=l.length-1;c>=0;c--){const u=l[c];if(u==="__proto__"||u==="constructor")continue;const d=Object.getOwnPropertyDescriptor(a,u);if(!s[u])s[u]=d.get?{enumerable:!0,configurable:!0,get:Bl.bind(r[u]=[d.get.bind(a)])}:d.value!==void 0?d:void 0;else{const m=r[u];m&&(d.get?m.push(d.get.bind(a)):d.value!==void 0&&m.push(()=>d.value))}}}const n={},i=Object.keys(s);for(let o=i.length-1;o>=0;o--){const a=i[o],l=s[a];l&&l.get?Object.defineProperty(n,a,l):n[a]=l?l.value:void 0}return n}function _n(t,...e){if(Me in t){const n=new Set(e.length>1?e.flat():e[0]),i=e.map(o=>new Proxy({get(a){return o.includes(a)?t[a]:void 0},has(a){return o.includes(a)&&a in t},keys(){return o.filter(a=>a in t)}},yn));return i.push(new Proxy({get(o){return n.has(o)?void 0:t[o]},has(o){return n.has(o)?!1:o in t},keys(){return Object.keys(t).filter(o=>!n.has(o))}},yn)),i}const r={},s=e.map(()=>({}));for(const n of Object.getOwnPropertyNames(t)){const i=Object.getOwnPropertyDescriptor(t,n),o=!i.get&&!i.set&&i.enumerable&&i.writable&&i.configurable;let a=!1,l=0;for(const c of e)c.includes(n)&&(a=!0,o?s[l][n]=i.value:Object.defineProperty(s[l],n,i)),++l;a||(o?r[n]=i.value:Object.defineProperty(r,n,i))}return[...s,r]}const Fl=t=>`Stale read from <${t}>.`;function Wi(t){const e="fallback"in t&&{fallback:()=>t.fallback};return ue(Vl(()=>t.each,t.children,e||void 0))}function ut(t){const e=t.keyed,r=ue(()=>t.when,void 0,{equals:(s,n)=>e?s===n:!s==!n});return ue(()=>{const s=r();if(s){const n=t.children;return typeof n=="function"&&n.length>0?Pe(()=>n(e?s:()=>{if(!Pe(r))throw Fl("Show");return t.when})):n}return t.fallback},void 0,void 0)}let hs;function Zl(t){let e;M.context&&M.load&&(e=M.load(M.getContextId()));const[r,s]=W(e,void 0);return hs||(hs=new Set),hs.add(s),mn(()=>hs.delete(s)),ue(()=>{let n;if(n=r()){const i=t.fallback;return typeof i=="function"&&i.length?Pe(()=>i(n,()=>s())):i}return ji(()=>t.children,s)},void 0,void 0)}const Hl=hr();function pr(t){let e=0,r,s,n,i,o;const[a,l]=W(!1),c=Il(),u={increment:()=>{++e===1&&l(!0)},decrement:()=>{--e===0&&l(!1)},inFallback:a,effects:[],resolved:!1},d=J();if(M.context&&M.load){const g=M.getContextId();let v=M.load(g);if(v&&(typeof v!="object"||v.status!=="success"?n=v:M.gather(g)),n&&n!=="$$f"){const[y,w]=W(void 0,{equals:!1});i=y,n.then(()=>{if(M.done)return w();M.gather(g),cr(s),w(),cr()},k=>{o=k,w()})}}const m=Dt(Hl);m&&(r=m.register(u.inFallback));let f;return mn(()=>f&&f()),S(c.Provider,{value:u,get children(){return ue(()=>{if(o)throw o;if(s=M.context,i)return i(),i=void 0;s&&n==="$$f"&&cr();const g=ue(()=>t.children);return ue(v=>{const y=u.inFallback(),{showContent:w=!0,showFallback:k=!0}=r?r():{};if((!y||n&&n!=="$$f")&&w)return u.resolved=!0,f&&f(),f=s=n=void 0,Rl(u.effects),g();if(!!k)return f?v:dr(C=>(f=C,s&&(cr({id:s.id+"F",count:0}),s=void 0),t.fallback),d)})})}})}const Wl=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Gl=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Wl]),ql=new Set(["innerHTML","textContent","innerText","children"]),Kl=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Yl=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Jl(t,e){const r=Yl[t];return typeof r=="object"?r[e]?r.$:void 0:r}const Xl=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Ql={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ec(t,e,r){let s=r.length,n=e.length,i=s,o=0,a=0,l=e[n-1].nextSibling,c=null;for(;o<n||a<i;){if(e[o]===r[a]){o++,a++;continue}for(;e[n-1]===r[i-1];)n--,i--;if(n===o){const u=i<s?a?r[a-1].nextSibling:r[i-a]:l;for(;a<i;)t.insertBefore(r[a++],u)}else if(i===a)for(;o<n;)(!c||!c.has(e[o]))&&e[o].remove(),o++;else if(e[o]===r[i-1]&&r[a]===e[n-1]){const u=e[--n].nextSibling;t.insertBefore(r[a++],e[o++].nextSibling),t.insertBefore(r[--i],u),e[n]=r[i]}else{if(!c){c=new Map;let d=a;for(;d<i;)c.set(r[d],d++)}const u=c.get(e[o]);if(u!=null)if(a<u&&u<i){let d=o,m=1,f;for(;++d<n&&d<i&&!((f=c.get(e[d]))==null||f!==u+m);)m++;if(m>u-a){const g=e[o];for(;a<u;)t.insertBefore(r[a++],g)}else t.replaceChild(r[a++],e[o++])}else o++;else e[o++].remove()}}}const Gi="_$DX_DELEGATE";function q(t,e,r){let s;const n=()=>{const o=document.createElement("template");return o.innerHTML=t,r?o.content.firstChild.firstChild:o.content.firstChild},i=e?()=>Pe(()=>document.importNode(s||(s=n()),!0)):()=>(s||(s=n())).cloneNode(!0);return i.cloneNode=i,i}function tc(t,e=window.document){const r=e[Gi]||(e[Gi]=new Set);for(let s=0,n=t.length;s<n;s++){const i=t[s];r.has(i)||(r.add(i),e.addEventListener(i,cc))}}function ie(t,e,r){mr(t)||(r==null?t.removeAttribute(e):t.setAttribute(e,r))}function rc(t,e,r,s){mr(t)||(s==null?t.removeAttributeNS(e,r):t.setAttributeNS(e,r,s))}function sc(t,e){mr(t)||(e==null?t.removeAttribute("class"):t.className=e)}function nc(t,e,r,s){if(s)Array.isArray(r)?(t[`$$${e}`]=r[0],t[`$$${e}Data`]=r[1]):t[`$$${e}`]=r;else if(Array.isArray(r)){const n=r[0];t.addEventListener(e,r[0]=i=>n.call(t,r[1],i))}else t.addEventListener(e,r)}function ic(t,e,r={}){const s=Object.keys(e||{}),n=Object.keys(r);let i,o;for(i=0,o=n.length;i<o;i++){const a=n[i];!a||a==="undefined"||e[a]||(Ki(t,a,!1),delete r[a])}for(i=0,o=s.length;i<o;i++){const a=s[i],l=!!e[a];!a||a==="undefined"||r[a]===l||!l||(Ki(t,a,!0),r[a]=l)}return r}function oc(t,e,r){if(!e)return r?ie(t,"style"):e;const s=t.style;if(typeof e=="string")return s.cssText=e;typeof r=="string"&&(s.cssText=r=void 0),r||(r={}),e||(e={});let n,i;for(i in r)e[i]==null&&s.removeProperty(i),delete r[i];for(i in e)n=e[i],n!==r[i]&&(s.setProperty(i,n),r[i]=n);return r}function xn(t,e={},r,s){const n={};return s||_e(()=>n.children=jt(t,e.children,n.children)),_e(()=>typeof e.ref=="function"&&qi(e.ref,t)),_e(()=>ac(t,e,r,!0,n,!0)),n}function qi(t,e,r){return Pe(()=>t(e,r))}function O(t,e,r,s){if(r!==void 0&&!s&&(s=[]),typeof e!="function")return jt(t,e,s,r);_e(n=>jt(t,e(),n,r),s)}function ac(t,e,r,s,n={},i=!1){e||(e={});for(const o in n)if(!(o in e)){if(o==="children")continue;n[o]=Yi(t,o,null,n[o],r,i)}for(const o in e){if(o==="children"){s||jt(t,e.children);continue}const a=e[o];n[o]=Yi(t,o,a,n[o],r,i)}}function mr(t){return!!M.context&&!M.done&&(!t||t.isConnected)}function lc(t){return t.toLowerCase().replace(/-([a-z])/g,(e,r)=>r.toUpperCase())}function Ki(t,e,r){const s=e.trim().split(/\s+/);for(let n=0,i=s.length;n<i;n++)t.classList.toggle(s[n],r)}function Yi(t,e,r,s,n,i){let o,a,l,c,u;if(e==="style")return oc(t,r,s);if(e==="classList")return ic(t,r,s);if(r===s)return s;if(e==="ref")i||r(t);else if(e.slice(0,3)==="on:"){const d=e.slice(3);s&&t.removeEventListener(d,s),r&&t.addEventListener(d,r)}else if(e.slice(0,10)==="oncapture:"){const d=e.slice(10);s&&t.removeEventListener(d,s,!0),r&&t.addEventListener(d,r,!0)}else if(e.slice(0,2)==="on"){const d=e.slice(2).toLowerCase(),m=Xl.has(d);if(!m&&s){const f=Array.isArray(s)?s[0]:s;t.removeEventListener(d,f)}(m||r)&&(nc(t,d,r,m),m&&tc([d]))}else if(e.slice(0,5)==="attr:")ie(t,e.slice(5),r);else if((u=e.slice(0,5)==="prop:")||(l=ql.has(e))||!n&&((c=Jl(e,t.tagName))||(a=Gl.has(e)))||(o=t.nodeName.includes("-"))){if(u)e=e.slice(5),a=!0;else if(mr(t))return r;e==="class"||e==="className"?sc(t,r):o&&!a&&!l?t[lc(e)]=r:t[c||e]=r}else{const d=n&&e.indexOf(":")>-1&&Ql[e.split(":")[0]];d?rc(t,d,e,r):ie(t,Kl[e]||e,r)}return r}function cc(t){if(M.registry&&M.events&&M.events.find(([s,n])=>n===t))return;const e=`$$${t.type}`;let r=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==r&&Object.defineProperty(t,"target",{configurable:!0,value:r}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return r||document}}),M.registry&&!M.done&&(M.done=_$HY.done=!0);r;){const s=r[e];if(s&&!r.disabled){const n=r[`${e}Data`];if(n!==void 0?s.call(r,n,t):s.call(r,t),t.cancelBubble)return}r=r._$host||r.parentNode||r.host}}function jt(t,e,r,s,n){const i=mr(t);if(i){!r&&(r=[...t.childNodes]);let l=[];for(let c=0;c<r.length;c++){const u=r[c];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():l.push(u)}r=l}for(;typeof r=="function";)r=r();if(e===r)return r;const o=typeof e,a=s!==void 0;if(t=a&&r[0]&&r[0].parentNode||t,o==="string"||o==="number"){if(i||o==="number"&&(e=e.toString(),e===r))return r;if(a){let l=r[0];l&&l.nodeType===3?l.data!==e&&(l.data=e):l=document.createTextNode(e),r=Ut(t,r,s,l)}else r!==""&&typeof r=="string"?r=t.firstChild.data=e:r=t.textContent=e}else if(e==null||o==="boolean"){if(i)return r;r=Ut(t,r,s)}else{if(o==="function")return _e(()=>{let l=e();for(;typeof l=="function";)l=l();r=jt(t,l,r,s)}),()=>r;if(Array.isArray(e)){const l=[],c=r&&Array.isArray(r);if(kn(l,e,r,n))return _e(()=>r=jt(t,l,r,s,!0)),()=>r;if(i){if(!l.length)return r;if(s===void 0)return r=[...t.childNodes];let u=l[0];if(u.parentNode!==t)return r;const d=[u];for(;(u=u.nextSibling)!==s;)d.push(u);return r=d}if(l.length===0){if(r=Ut(t,r,s),a)return r}else c?r.length===0?Ji(t,l,s):ec(t,r,l):(r&&Ut(t),Ji(t,l));r=l}else if(e.nodeType){if(i&&e.parentNode)return r=a?[e]:e;if(Array.isArray(r)){if(a)return r=Ut(t,r,s,e);Ut(t,r,null,e)}else r==null||r===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);r=e}}return r}function kn(t,e,r,s){let n=!1;for(let i=0,o=e.length;i<o;i++){let a=e[i],l=r&&r[t.length],c;if(!(a==null||a===!0||a===!1))if((c=typeof a)=="object"&&a.nodeType)t.push(a);else if(Array.isArray(a))n=kn(t,a,l)||n;else if(c==="function")if(s){for(;typeof a=="function";)a=a();n=kn(t,Array.isArray(a)?a:[a],Array.isArray(l)?l:[l])||n}else t.push(a),n=!0;else{const u=String(a);l&&l.nodeType===3&&l.data===u?t.push(l):t.push(document.createTextNode(u))}}return n}function Ji(t,e,r=null){for(let s=0,n=e.length;s<n;s++)t.insertBefore(e[s],r)}function Ut(t,e,r,s){if(r===void 0)return t.textContent="";const n=s||document.createTextNode("");if(e.length){let i=!1;for(let o=e.length-1;o>=0;o--){const a=e[o];if(n!==a){const l=a.parentNode===t;!i&&!o?l?t.replaceChild(n,a):t.insertBefore(n,r):l&&a.remove()}else i=!0}}else t.insertBefore(n,r);return[n]}function uc(t){const e=Object.keys(t),r={};for(let s=0;s<e.length;s++){const[n,i]=W(t[e[s]]);Object.defineProperty(r,e[s],{get:n,set(o){i(()=>o)}})}return r}function dc(t){if(t.assignedSlot&&t.assignedSlot._$owner)return t.assignedSlot._$owner;let e=t.parentNode;for(;e&&!e._$owner&&!(e.assignedSlot&&e.assignedSlot._$owner);)e=e.parentNode;return e&&e.assignedSlot?e.assignedSlot._$owner:t._$owner}function hc(t){return(e,r)=>{const{element:s}=r;return dr(n=>{const i=uc(e);s.addPropertyChangedCallback((a,l)=>i[a]=l),s.addReleaseCallback(()=>{s.renderRoot.textContent="",n()});const o=t(i,r);return O(s.renderRoot,o)},dc(s))}}function Xi(t,e,r){return arguments.length===2&&(r=e,e={}),El(t,e)(hc(r))}var Sn="";function $n(t){Sn=t}function fc(t=""){if(!Sn){const e=[...document.getElementsByTagName("script")],r=e.find(s=>s.hasAttribute("data-shoelace"));if(r)$n(r.getAttribute("data-shoelace"));else{const s=e.find(i=>/shoelace(\.min)?\.js($|\?)/.test(i.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(i.src));let n="";s&&(n=s.getAttribute("src")),$n(n.split("/").slice(0,-1).join("/"))}}return Sn.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var pc={name:"default",resolver:t=>fc(`assets/icons/${t}.svg`)},mc=pc,Qi={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},gc={name:"system",resolver:t=>t in Qi?`data:image/svg+xml,${encodeURIComponent(Qi[t])}`:""},bc=gc,vc=[mc,bc],Cn=[];function yc(t){Cn.push(t)}function wc(t){Cn=Cn.filter(e=>e!==t)}function eo(t){return vc.find(e=>e.name===t)}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fs=globalThis,An=fs.ShadowRoot&&(fs.ShadyCSS===void 0||fs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,En=Symbol(),to=new WeakMap;class ro{constructor(e,r,s){if(this._$cssResult$=!0,s!==En)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(An&&e===void 0){const s=r!==void 0&&r.length===1;s&&(e=to.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&to.set(r,e))}return e}toString(){return this.cssText}}const _c=t=>new ro(typeof t=="string"?t:t+"",void 0,En),fe=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((s,n,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new ro(r,t,En)},xc=(t,e)=>{if(An)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const s=document.createElement("style"),n=fs.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=r.cssText,t.appendChild(s)}},so=An?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const s of e.cssRules)r+=s.cssText;return _c(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kc,defineProperty:Sc,getOwnPropertyDescriptor:$c,getOwnPropertyNames:Cc,getOwnPropertySymbols:Ac,getPrototypeOf:Ec}=Object,ps=globalThis,no=ps.trustedTypes,Tc=no?no.emptyScript:"",Oc=ps.reactiveElementPolyfillSupport,gr=(t,e)=>t,Vt={toAttribute(t,e){switch(e){case Boolean:t=t?Tc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Tn=(t,e)=>!kc(t,e),io={attribute:!0,type:String,converter:Vt,reflect:!1,hasChanged:Tn};Symbol.metadata??=Symbol("metadata"),ps.litPropertyMetadata??=new WeakMap;class Bt extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=io){if(r.state&&(r.attribute=!1),this._$Ei(),this.elementProperties.set(e,r),!r.noAccessor){const s=Symbol(),n=this.getPropertyDescriptor(e,s,r);n!==void 0&&Sc(this.prototype,e,n)}}static getPropertyDescriptor(e,r,s){const{get:n,set:i}=$c(this.prototype,e)??{get(){return this[r]},set(o){this[r]=o}};return{get(){return n?.call(this)},set(o){const a=n?.call(this);i.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??io}static _$Ei(){if(this.hasOwnProperty(gr("elementProperties")))return;const e=Ec(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(gr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gr("properties"))){const r=this.properties,s=[...Cc(r),...Ac(r)];for(const n of s)this.createProperty(n,r[n])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[s,n]of r)this.elementProperties.set(s,n)}this._$Eh=new Map;for(const[r,s]of this.elementProperties){const n=this._$Eu(r,s);n!==void 0&&this._$Eh.set(n,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)r.unshift(so(n))}else e!==void 0&&r.push(so(e));return r}static _$Eu(e,r){const s=r.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const s of r.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xc(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,s){this._$AK(e,s)}_$EC(e,r){const s=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,s);if(n!==void 0&&s.reflect===!0){const i=(s.converter?.toAttribute!==void 0?s.converter:Vt).toAttribute(r,s.type);this._$Em=e,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(e,r){const s=this.constructor,n=s._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const i=s.getPropertyOptions(n),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Vt;this._$Em=n,this[n]=o.fromAttribute(r,i.type),this._$Em=null}}requestUpdate(e,r,s){if(e!==void 0){if(s??=this.constructor.getPropertyOptions(e),!(s.hasChanged??Tn)(this[e],r))return;this.P(e,r,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,r,s){this._$AL.has(e)||this._$AL.set(e,r),s.reflect===!0&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,i]of s)i.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],i)}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(r)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(r=>this._$EC(r,this[r])),this._$EU()}updated(e){}firstUpdated(e){}}Bt.elementStyles=[],Bt.shadowRootOptions={mode:"open"},Bt[gr("elementProperties")]=new Map,Bt[gr("finalized")]=new Map,Oc?.({ReactiveElement:Bt}),(ps.reactiveElementVersions??=[]).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const On=globalThis,ms=On.trustedTypes,oo=ms?ms.createPolicy("lit-html",{createHTML:t=>t}):void 0,ao="$lit$",dt=`lit$${Math.random().toFixed(9).slice(2)}$`,lo="?"+dt,Pc=`<${lo}>`,kt=document,br=()=>kt.createComment(""),vr=t=>t===null||typeof t!="object"&&typeof t!="function",Pn=Array.isArray,Nc=t=>Pn(t)||typeof t?.[Symbol.iterator]=="function",Nn=`[ 	
\f\r]`,yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,co=/-->/g,uo=/>/g,St=RegExp(`>|${Nn}(?:([^\\s"'>=/]+)(${Nn}*=${Nn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ho=/'/g,fo=/"/g,po=/^(?:script|style|textarea|title)$/i,Rc=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),U=Rc(1),Ne=Symbol.for("lit-noChange"),ee=Symbol.for("lit-nothing"),mo=new WeakMap,$t=kt.createTreeWalker(kt,129);function go(t,e){if(!Pn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return oo!==void 0?oo.createHTML(e):e}const Lc=(t,e)=>{const r=t.length-1,s=[];let n,i=e===2?"<svg>":e===3?"<math>":"",o=yr;for(let a=0;a<r;a++){const l=t[a];let c,u,d=-1,m=0;for(;m<l.length&&(o.lastIndex=m,u=o.exec(l),u!==null);)m=o.lastIndex,o===yr?u[1]==="!--"?o=co:u[1]!==void 0?o=uo:u[2]!==void 0?(po.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=St):u[3]!==void 0&&(o=St):o===St?u[0]===">"?(o=n??yr,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?St:u[3]==='"'?fo:ho):o===fo||o===ho?o=St:o===co||o===uo?o=yr:(o=St,n=void 0);const f=o===St&&t[a+1].startsWith("/>")?" ":"";i+=o===yr?l+Pc:d>=0?(s.push(c),l.slice(0,d)+ao+l.slice(d)+dt+f):l+dt+(d===-2?a:f)}return[go(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class wr{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0;const a=e.length-1,l=this.parts,[c,u]=Lc(e,r);if(this.el=wr.createElement(c,s),$t.currentNode=this.el.content,r===2||r===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=$t.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(ao)){const m=u[o++],f=n.getAttribute(d).split(dt),g=/([.?@])?(.*)/.exec(m);l.push({type:1,index:i,name:g[2],strings:f,ctor:g[1]==="."?Dc:g[1]==="?"?Mc:g[1]==="@"?zc:gs}),n.removeAttribute(d)}else d.startsWith(dt)&&(l.push({type:6,index:i}),n.removeAttribute(d));if(po.test(n.tagName)){const d=n.textContent.split(dt),m=d.length-1;if(m>0){n.textContent=ms?ms.emptyScript:"";for(let f=0;f<m;f++)n.append(d[f],br()),$t.nextNode(),l.push({type:2,index:++i});n.append(d[m],br())}}}else if(n.nodeType===8)if(n.data===lo)l.push({type:2,index:i});else{let d=-1;for(;(d=n.data.indexOf(dt,d+1))!==-1;)l.push({type:7,index:i}),d+=dt.length-1}i++}}static createElement(e,r){const s=kt.createElement("template");return s.innerHTML=e,s}}function Ft(t,e,r=t,s){if(e===Ne)return e;let n=s!==void 0?r.o?.[s]:r.l;const i=vr(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r.o??=[])[s]=n:r.l=n),n!==void 0&&(e=Ft(t,n._$AS(t,e.values),n,s)),e}class Ic{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??kt).importNode(r,!0);$t.currentNode=n;let i=$t.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new _r(i,i.nextSibling,this,e):l.type===1?c=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(c=new jc(i,this,e)),this._$AV.push(c),l=s[++a]}o!==l?.index&&(i=$t.nextNode(),o++)}return $t.currentNode=kt,n}p(e){let r=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}}class _r{get _$AU(){return this._$AM?._$AU??this.v}constructor(e,r,s,n){this.type=2,this._$AH=ee,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this.v=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ft(this,e,r),vr(e)?e===ee||e==null||e===""?(this._$AH!==ee&&this._$AR(),this._$AH=ee):e!==this._$AH&&e!==Ne&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nc(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ee&&vr(this._$AH)?this._$AA.nextSibling.data=e:this.T(kt.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=wr.createElement(go(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{const i=new Ic(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=mo.get(e.strings);return r===void 0&&mo.set(e.strings,r=new wr(e)),r}k(e){Pn(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let s,n=0;for(const i of e)n===r.length?r.push(s=new _r(this.O(br()),this.O(br()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this.v=e,this._$AP?.(e))}}class gs{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=ee,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ee}_$AI(e,r=this,s,n){const i=this.strings;let o=!1;if(i===void 0)e=Ft(this,e,r,0),o=!vr(e)||e!==this._$AH&&e!==Ne,o&&(this._$AH=e);else{const a=e;let l,c;for(e=i[0],l=0;l<i.length-1;l++)c=Ft(this,a[s+l],r,l),c===Ne&&(c=this._$AH[l]),o||=!vr(c)||c!==this._$AH[l],c===ee?e=ee:e!==ee&&(e+=(c??"")+i[l+1]),this._$AH[l]=c}o&&!n&&this.j(e)}j(e){e===ee?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Dc extends gs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ee?void 0:e}}class Mc extends gs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ee)}}class zc extends gs{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=Ft(this,e,r,0)??ee)===Ne)return;const s=this._$AH,n=e===ee&&s!==ee||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==ee&&(s===ee||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class jc{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Ft(this,e)}}const Uc=On.litHtmlPolyfillSupport;Uc?.(wr,_r),(On.litHtmlVersions??=[]).push("3.2.0");const Vc=(t,e,r)=>{const s=r?.renderBefore??e;let n=s._$litPart$;if(n===void 0){const i=r?.renderBefore??null;s._$litPart$=n=new _r(e.insertBefore(br(),i),i,void 0,r??{})}return n._$AI(t),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class xr extends Bt{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=Vc(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.o?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.o?.setConnected(!1)}render(){return Ne}}xr._$litElement$=!0,xr.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:xr});const Bc=globalThis.litElementPolyfillSupport;Bc?.({LitElement:xr}),(globalThis.litElementVersions??=[]).push("4.1.0");var Fc=fe`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,bo=Object.defineProperty,Zc=Object.defineProperties,Hc=Object.getOwnPropertyDescriptor,Wc=Object.getOwnPropertyDescriptors,vo=Object.getOwnPropertySymbols,Gc=Object.prototype.hasOwnProperty,qc=Object.prototype.propertyIsEnumerable,yo=(t,e,r)=>e in t?bo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ht=(t,e)=>{for(var r in e||(e={}))Gc.call(e,r)&&yo(t,r,e[r]);if(vo)for(var r of vo(e))qc.call(e,r)&&yo(t,r,e[r]);return t},bs=(t,e)=>Zc(t,Wc(e)),h=(t,e,r,s)=>{for(var n=s>1?void 0:s?Hc(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(n=(s?o(e,r,n):o(n))||n);return s&&n&&bo(e,r,n),n};function re(t,e){const r=ht({waitUntilFirstUpdate:!1},e);return(s,n)=>{const{update:i}=s,o=Array.isArray(t)?t:[t];s.update=function(a){o.forEach(l=>{const c=l;if(a.has(c)){const u=a.get(c),d=this[c];u!==d&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[n](u,d)}}),i.call(this,a)}}}var xe=fe`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kc={attribute:!0,type:String,converter:Vt,reflect:!1,hasChanged:Tn},Yc=(t=Kc,e,r)=>{const{kind:s,metadata:n}=r;let i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),i.set(r.name,t),s==="accessor"){const{name:o}=r;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,t)},init(a){return a!==void 0&&this.P(o,void 0,t),a}}}if(s==="setter"){const{name:o}=r;return function(a){const l=this[o];e.call(this,a),this.requestUpdate(o,l,t)}}throw Error("Unsupported decorator location: "+s)};function p(t){return(e,r)=>typeof r=="object"?Yc(t,e,r):((s,n,i)=>{const o=n.hasOwnProperty(i);return n.constructor.createProperty(i,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(n,i):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ke(t){return p({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wo=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function de(t,e){return(r,s,n)=>{const i=o=>o.renderRoot?.querySelector(t)??null;if(e){const{get:o,set:a}=typeof s=="object"?r:n??(()=>{const l=Symbol();return{get(){return this[l]},set(c){this[l]=c}}})();return wo(r,s,{get(){let l=o.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return wo(r,s,{get(){return i(this)}})}}var oe=class extends xr{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const r=new CustomEvent(t,ht({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(r),r}static define(t,e=this,r={}){const s=customElements.get(t);if(!s){try{customElements.define(t,e,r)}catch{customElements.define(t,class extends e{},r)}return}let n=" (unknown version)",i=n;"version"in e&&e.version&&(n=" v"+e.version),"version"in s&&s.version&&(i=" v"+s.version),!(n&&i&&n===i)&&console.warn(`Attempted to register <${t}>${n}, but <${t}>${i} has already been registered.`)}};oe.version="2.16.0",oe.dependencies={},h([p()],oe.prototype,"dir",2),h([p()],oe.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jc=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e,Xc=t=>t.strings===void 0,Qc={},eu=(t,e=Qc)=>t._$AH=e;var kr=Symbol(),vs=Symbol(),Rn,Ln=new Map,be=class extends oe{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var r;let s;if(e?.spriteSheet){this.svg=U`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(n),this.svg}try{if(s=await fetch(t,{mode:"cors"}),!s.ok)return s.status===410?kr:vs}catch{return vs}try{const n=document.createElement("div");n.innerHTML=await s.text();const i=n.firstElementChild;if(((r=i?.tagName)==null?void 0:r.toLowerCase())!=="svg")return kr;Rn||(Rn=new DOMParser);const a=Rn.parseFromString(i.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):kr}catch{return kr}}connectedCallback(){super.connectedCallback(),yc(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),wc(this)}getIconSource(){const t=eo(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:r}=this.getIconSource(),s=r?eo(this.library):void 0;if(!e){this.svg=null;return}let n=Ln.get(e);if(n||(n=this.resolveIcon(e,s),Ln.set(e,n)),!this.initialRender)return;const i=await n;if(i===vs&&Ln.delete(e),e===this.getIconSource().url){if(Jc(i)){this.svg=i;return}switch(i){case vs:case kr:this.svg=null,this.emit("sl-error");break;default:this.svg=i.cloneNode(!0),(t=s?.mutator)==null||t.call(s,this.svg),this.emit("sl-load")}}}render(){return this.svg}};be.styles=[xe,Fc],h([ke()],be.prototype,"svg",2),h([p({reflect:!0})],be.prototype,"name",2),h([p()],be.prototype,"src",2),h([p()],be.prototype,"label",2),h([p({reflect:!0})],be.prototype,"library",2),h([re("label")],be.prototype,"handleLabelChange",1),h([re(["name","src","library"])],be.prototype,"setIcon",1),be.define("sl-icon");var tu=fe`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},In=t=>(...e)=>({_$litDirective$:t,values:e});class Dn{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this.t=e,this._$AM=r,this.i=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=In(class extends Dn{constructor(t){if(super(t),t.type!==ft.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(e)}const r=t.element.classList;for(const s of this.st)s in e||(r.remove(s),this.st.delete(s));for(const s in e){const n=!!e[s];n===this.st.has(s)||this.nt?.has(s)||(n?(r.add(s),this.st.add(s)):(r.remove(s),this.st.delete(s)))}return Ne}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _o=Symbol.for(""),ru=t=>{if(t?.r===_o)return t?._$litStatic$},ys=(t,...e)=>({_$litStatic$:e.reduce((r,s,n)=>r+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+t[n+1],t[0]),r:_o}),xo=new Map,su=t=>(e,...r)=>{const s=r.length;let n,i;const o=[],a=[];let l,c=0,u=!1;for(;c<s;){for(l=e[c];c<s&&(i=r[c],(n=ru(i))!==void 0);)l+=n+e[++c],u=!0;c!==s&&a.push(i),o.push(l),c++}if(c===s&&o.push(e[s]),u){const d=o.join("$$lit$$");(e=xo.get(d))===void 0&&(o.raw=o,xo.set(d,e=o)),r=a}return t(e,...r)},ws=su(U);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=t=>t??ee;var pe=class extends oe{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?ys`a`:ys`button`;return ws`
      <${e}
        part="base"
        class=${ve({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${B(t?void 0:this.disabled)}
        type=${B(t?void 0:"button")}
        href=${B(t?this.href:void 0)}
        target=${B(t?this.target:void 0)}
        download=${B(t?this.download:void 0)}
        rel=${B(t&&this.target?"noreferrer noopener":void 0)}
        role=${B(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${B(this.name)}
          library=${B(this.library)}
          src=${B(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};pe.styles=[xe,tu],pe.dependencies={"sl-icon":be},h([de(".icon-button")],pe.prototype,"button",2),h([ke()],pe.prototype,"hasFocus",2),h([p()],pe.prototype,"name",2),h([p()],pe.prototype,"library",2),h([p()],pe.prototype,"src",2),h([p()],pe.prototype,"href",2),h([p()],pe.prototype,"target",2),h([p()],pe.prototype,"download",2),h([p()],pe.prototype,"label",2),h([p({type:Boolean,reflect:!0})],pe.prototype,"disabled",2);var ko=new Map,nu=new WeakMap;function iu(t){return t??{keyframes:[],options:{duration:0}}}function So(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function _s(t,e){ko.set(t,iu(e))}function xs(t,e,r){const s=nu.get(t);if(s?.[e])return So(s[e],r.dir);const n=ko.get(e);return n?So(n,r.dir):{keyframes:[],options:{duration:0}}}function ks(t,e){return new Promise(r=>{function s(n){n.target===t&&(t.removeEventListener(e,s),r())}t.addEventListener(e,s)})}function Ss(t,e,r){return new Promise(s=>{if(r?.duration===1/0)throw new Error("Promise-based animations must be finite.");const n=t.animate(e,bs(ht({},r),{duration:ou()?0:r.duration}));n.addEventListener("cancel",s,{once:!0}),n.addEventListener("finish",s,{once:!0})})}function ou(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function $s(t){return Promise.all(t.getAnimations().map(e=>new Promise(r=>{e.cancel(),requestAnimationFrame(r)})))}var Cs=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=r=>{const s=r.target;(this.slotNames.includes("[default]")&&!s.name||s.name&&this.slotNames.includes(s.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};const Mn=new Set,Zt=new Map;let Ct,zn="ltr",jn="en";const $o=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if($o){const t=new MutationObserver(Ao);zn=document.documentElement.dir||"ltr",jn=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Co(...t){t.map(e=>{const r=e.$code.toLowerCase();Zt.has(r)?Zt.set(r,Object.assign(Object.assign({},Zt.get(r)),e)):Zt.set(r,e),Ct||(Ct=e)}),Ao()}function Ao(){$o&&(zn=document.documentElement.dir||"ltr",jn=document.documentElement.lang||navigator.language),[...Mn.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}class au{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Mn.add(this.host)}hostDisconnected(){Mn.delete(this.host)}dir(){return`${this.host.dir||zn}`.toLowerCase()}lang(){return`${this.host.lang||jn}`.toLowerCase()}getTranslationData(e){var r,s;const n=new Intl.Locale(e.replace(/_/g,"-")),i=n?.language.toLowerCase(),o=(s=(r=n?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&s!==void 0?s:"",a=Zt.get(`${i}-${o}`),l=Zt.get(i);return{locale:n,language:i,region:o,primary:a,secondary:l}}exists(e,r){var s;const{primary:n,secondary:i}=this.getTranslationData((s=r.lang)!==null&&s!==void 0?s:this.lang());return r=Object.assign({includeFallback:!1},r),!!(n&&n[e]||i&&i[e]||r.includeFallback&&Ct&&Ct[e])}term(e,...r){const{primary:s,secondary:n}=this.getTranslationData(this.lang());let i;if(s&&s[e])i=s[e];else if(n&&n[e])i=n[e];else if(Ct&&Ct[e])i=Ct[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i=="function"?i(...r):i}date(e,r){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),r).format(e)}number(e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),r).format(e)}relativeTime(e,r,s){return new Intl.RelativeTimeFormat(this.lang(),s).format(e,r)}}var Eo={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Co(Eo);var lu=Eo,st=class extends au{};Co(lu);var cu=fe`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`,Ht=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),Ge=class extends oe{constructor(){super(...arguments),this.hasSlotController=new Cs(this,"icon","suffix"),this.localize=new st(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await $s(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=xs(this,"alert.show",{dir:this.localize.dir()});await Ss(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await $s(this.base);const{keyframes:t,options:e}=xs(this,"alert.hide",{dir:this.localize.dir()});await Ss(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,ks(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,ks(this,"sl-after-hide")}async toast(){return new Promise(t=>{Ht.parentElement===null&&document.body.append(Ht),Ht.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{Ht.removeChild(this),t(),Ht.querySelector("sl-alert")===null&&Ht.remove()},{once:!0})})}render(){return U`
      <div
        part="base"
        class=${ve({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?U`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};Ge.styles=[xe,cu],Ge.dependencies={"sl-icon-button":pe},h([de('[part~="base"]')],Ge.prototype,"base",2),h([p({type:Boolean,reflect:!0})],Ge.prototype,"open",2),h([p({type:Boolean,reflect:!0})],Ge.prototype,"closable",2),h([p({reflect:!0})],Ge.prototype,"variant",2),h([p({type:Number})],Ge.prototype,"duration",2),h([re("open",{waitUntilFirstUpdate:!0})],Ge.prototype,"handleOpenChange",1),h([re("duration")],Ge.prototype,"handleDurationChange",1),_s("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),_s("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Ge.define("sl-alert");var uu=fe`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,Un=class extends oe{constructor(){super(...arguments),this.localize=new st(this)}render(){return U`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Un.styles=[xe,uu];var Sr=new WeakMap,$r=new WeakMap,Cr=new WeakMap,Vn=new WeakSet,As=new WeakMap,Bn=class{constructor(t,e){this.handleFormData=r=>{const s=this.options.disabled(this.host),n=this.options.name(this.host),i=this.options.value(this.host),o=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!s&&!o&&typeof n=="string"&&n.length>0&&typeof i<"u"&&(Array.isArray(i)?i.forEach(a=>{r.formData.append(n,a.toString())}):r.formData.append(n,i.toString()))},this.handleFormSubmit=r=>{var s;const n=this.options.disabled(this.host),i=this.options.reportValidity;this.form&&!this.form.noValidate&&((s=Sr.get(this.form))==null||s.forEach(o=>{this.setUserInteracted(o,!0)})),this.form&&!this.form.noValidate&&!n&&!i(this.host)&&(r.preventDefault(),r.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),As.set(this.host,[])},this.handleInteraction=r=>{const s=As.get(this.host);s.includes(r.type)||s.push(r.type),s.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const r=this.form.querySelectorAll("*");for(const s of r)if(typeof s.checkValidity=="function"&&!s.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const r=this.form.querySelectorAll("*");for(const s of r)if(typeof s.reportValidity=="function"&&!s.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=ht({form:r=>{const s=r.form;if(s){const i=r.getRootNode().querySelector(`#${s}`);if(i)return i}return r.closest("form")},name:r=>r.name,value:r=>r.value,defaultValue:r=>r.defaultValue,disabled:r=>{var s;return(s=r.disabled)!=null?s:!1},reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():!0,checkValidity:r=>typeof r.checkValidity=="function"?r.checkValidity():!0,setValue:(r,s)=>r.value=s,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),As.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),As.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Sr.has(this.form)?Sr.get(this.form).add(this.host):Sr.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),$r.has(this.form)||($r.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Cr.has(this.form)||(Cr.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=Sr.get(this.form);!t||(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),$r.has(this.form)&&(this.form.reportValidity=$r.get(this.form),$r.delete(this.form)),Cr.has(this.form)&&(this.form.checkValidity=Cr.get(this.form),Cr.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?Vn.add(t):Vn.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const r=document.createElement("button");r.type=t,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",e&&(r.name=e.name,r.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(s=>{e.hasAttribute(s)&&r.setAttribute(s,e.getAttribute(s))})),this.form.append(r),r.click(),r.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,r=Boolean(Vn.has(e)),s=Boolean(e.required);e.toggleAttribute("data-required",s),e.toggleAttribute("data-optional",!s),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&r),e.toggleAttribute("data-user-valid",t&&r)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}},Fn=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(bs(ht({},Fn),{valid:!1,valueMissing:!0})),Object.freeze(bs(ht({},Fn),{valid:!1,customError:!0}));var du=fe`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,H=class extends oe{constructor(){super(...arguments),this.formControlController=new Bn(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Cs(this,"[default]","prefix","suffix"),this.localize=new st(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Fn}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?ys`a`:ys`button`;return ws`
      <${e}
        part="base"
        class=${ve({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${B(t?void 0:this.disabled)}
        type=${B(t?void 0:this.type)}
        title=${this.title}
        name=${B(t?void 0:this.name)}
        value=${B(t?void 0:this.value)}
        href=${B(t?this.href:void 0)}
        target=${B(t?this.target:void 0)}
        download=${B(t?this.download:void 0)}
        rel=${B(t?this.rel:void 0)}
        role=${B(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?ws` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?ws`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};H.styles=[xe,du],H.dependencies={"sl-icon":be,"sl-spinner":Un},h([de(".button")],H.prototype,"button",2),h([ke()],H.prototype,"hasFocus",2),h([ke()],H.prototype,"invalid",2),h([p()],H.prototype,"title",2),h([p({reflect:!0})],H.prototype,"variant",2),h([p({reflect:!0})],H.prototype,"size",2),h([p({type:Boolean,reflect:!0})],H.prototype,"caret",2),h([p({type:Boolean,reflect:!0})],H.prototype,"disabled",2),h([p({type:Boolean,reflect:!0})],H.prototype,"loading",2),h([p({type:Boolean,reflect:!0})],H.prototype,"outline",2),h([p({type:Boolean,reflect:!0})],H.prototype,"pill",2),h([p({type:Boolean,reflect:!0})],H.prototype,"circle",2),h([p()],H.prototype,"type",2),h([p()],H.prototype,"name",2),h([p()],H.prototype,"value",2),h([p()],H.prototype,"href",2),h([p()],H.prototype,"target",2),h([p()],H.prototype,"rel",2),h([p()],H.prototype,"download",2),h([p()],H.prototype,"form",2),h([p({attribute:"formaction"})],H.prototype,"formAction",2),h([p({attribute:"formenctype"})],H.prototype,"formEnctype",2),h([p({attribute:"formmethod"})],H.prototype,"formMethod",2),h([p({attribute:"formnovalidate",type:Boolean})],H.prototype,"formNoValidate",2),h([p({attribute:"formtarget"})],H.prototype,"formTarget",2),h([re("disabled",{waitUntilFirstUpdate:!0})],H.prototype,"handleDisabledChange",1),H.define("sl-button");var hu=fe`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,To=(t="value")=>(e,r)=>{const s=e.constructor,n=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(i,o,a){var l;const c=s.getPropertyOptions(t),u=typeof c.attribute=="string"?c.attribute:t;if(i===u){const d=c.converter||Vt,f=(typeof d=="function"?d:(l=d?.fromAttribute)!=null?l:Vt.fromAttribute)(a,c.type);this[t]!==f&&(this[r]=f)}n.call(this,i,o,a)}},Oo=fe`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fu=In(class extends Dn{constructor(t){if(super(t),t.type!==ft.PROPERTY&&t.type!==ft.ATTRIBUTE&&t.type!==ft.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Xc(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Ne||e===ee)return e;const r=t.element,s=t.name;if(t.type===ft.PROPERTY){if(e===r[s])return Ne}else if(t.type===ft.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(s))return Ne}else if(t.type===ft.ATTRIBUTE&&r.getAttribute(s)===e+"")return Ne;return eu(t),e}});var L=class extends oe{constructor(){super(...arguments),this.formControlController=new Bn(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Cs(this,"help-text","label"),this.localize=new st(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,s="preserve"){const n=e??this.input.selectionStart,i=r??this.input.selectionEnd;this.input.setRangeText(t,n,i,s),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,s=this.helpText?!0:!!e,i=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return U`
      <div
        part="form-control"
        class=${ve({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${ve({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${B(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${B(this.placeholder)}
              minlength=${B(this.minlength)}
              maxlength=${B(this.maxlength)}
              min=${B(this.min)}
              max=${B(this.max)}
              step=${B(this.step)}
              .value=${fu(this.value)}
              autocapitalize=${B(this.autocapitalize)}
              autocomplete=${B(this.autocomplete)}
              autocorrect=${B(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${B(this.pattern)}
              enterkeyhint=${B(this.enterkeyhint)}
              inputmode=${B(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i?U`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?U`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?U`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:U`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};L.styles=[xe,Oo,hu],L.dependencies={"sl-icon":be},h([de(".input__control")],L.prototype,"input",2),h([ke()],L.prototype,"hasFocus",2),h([p()],L.prototype,"title",2),h([p({reflect:!0})],L.prototype,"type",2),h([p()],L.prototype,"name",2),h([p()],L.prototype,"value",2),h([To()],L.prototype,"defaultValue",2),h([p({reflect:!0})],L.prototype,"size",2),h([p({type:Boolean,reflect:!0})],L.prototype,"filled",2),h([p({type:Boolean,reflect:!0})],L.prototype,"pill",2),h([p()],L.prototype,"label",2),h([p({attribute:"help-text"})],L.prototype,"helpText",2),h([p({type:Boolean})],L.prototype,"clearable",2),h([p({type:Boolean,reflect:!0})],L.prototype,"disabled",2),h([p()],L.prototype,"placeholder",2),h([p({type:Boolean,reflect:!0})],L.prototype,"readonly",2),h([p({attribute:"password-toggle",type:Boolean})],L.prototype,"passwordToggle",2),h([p({attribute:"password-visible",type:Boolean})],L.prototype,"passwordVisible",2),h([p({attribute:"no-spin-buttons",type:Boolean})],L.prototype,"noSpinButtons",2),h([p({reflect:!0})],L.prototype,"form",2),h([p({type:Boolean,reflect:!0})],L.prototype,"required",2),h([p()],L.prototype,"pattern",2),h([p({type:Number})],L.prototype,"minlength",2),h([p({type:Number})],L.prototype,"maxlength",2),h([p()],L.prototype,"min",2),h([p()],L.prototype,"max",2),h([p()],L.prototype,"step",2),h([p()],L.prototype,"autocapitalize",2),h([p()],L.prototype,"autocorrect",2),h([p()],L.prototype,"autocomplete",2),h([p({type:Boolean})],L.prototype,"autofocus",2),h([p()],L.prototype,"enterkeyhint",2),h([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],L.prototype,"spellcheck",2),h([p()],L.prototype,"inputmode",2),h([re("disabled",{waitUntilFirstUpdate:!0})],L.prototype,"handleDisabledChange",1),h([re("step",{waitUntilFirstUpdate:!0})],L.prototype,"handleStepChange",1),h([re("value",{waitUntilFirstUpdate:!0})],L.prototype,"handleValueChange",1),L.define("sl-input");var pu=fe`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,qe=class extends oe{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const t=U`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let e=U``;return this.initials?e=U`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=U`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,U`
      <div
        part="base"
        class=${ve({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};qe.styles=[xe,pu],qe.dependencies={"sl-icon":be},h([ke()],qe.prototype,"hasError",2),h([p()],qe.prototype,"image",2),h([p()],qe.prototype,"label",2),h([p()],qe.prototype,"initials",2),h([p()],qe.prototype,"loading",2),h([p({reflect:!0})],qe.prototype,"shape",2),h([re("image")],qe.prototype,"handleImageChange",1),qe.define("sl-avatar"),Un.define("sl-spinner");var mu=fe`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,At=class extends oe{constructor(){super(...arguments),this.localize=new st(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return U`
      <span
        part="base"
        class=${ve({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?U`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};At.styles=[xe,mu],At.dependencies={"sl-icon-button":pe},h([p({reflect:!0})],At.prototype,"variant",2),h([p({reflect:!0})],At.prototype,"size",2),h([p({type:Boolean,reflect:!0})],At.prototype,"pill",2),h([p({type:Boolean})],At.prototype,"removable",2);var gu=fe`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Suffix */
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;function bu(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function Zn(t,e,r="vertical",s="smooth"){const n=bu(t,e),i=n.top+e.scrollTop,o=n.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,u=e.scrollTop+e.offsetHeight;(r==="horizontal"||r==="both")&&(o<a?e.scrollTo({left:o,behavior:s}):o+t.clientWidth>l&&e.scrollTo({left:o-e.offsetWidth+t.clientWidth,behavior:s})),(r==="vertical"||r==="both")&&(i<c?e.scrollTo({top:i,behavior:s}):i+t.clientHeight>u&&e.scrollTo({top:i-e.offsetHeight+t.clientHeight,behavior:s}))}var vu=fe`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Po=["top","right","bottom","left"],No=["start","end"],Ro=Po.reduce((t,e)=>t.concat(e,e+"-"+No[0],e+"-"+No[1]),[]),$e=Math.min,me=Math.max,Es=Math.round,Ts=Math.floor,pt=t=>({x:t,y:t}),yu={left:"right",right:"left",bottom:"top",top:"bottom"},wu={start:"end",end:"start"};function Hn(t,e,r){return me(t,$e(e,r))}function ze(t,e){return typeof t=="function"?t(e):t}function Ce(t){return t.split("-")[0]}function je(t){return t.split("-")[1]}function Wn(t){return t==="x"?"y":"x"}function Gn(t){return t==="y"?"height":"width"}function nt(t){return["top","bottom"].includes(Ce(t))?"y":"x"}function qn(t){return Wn(nt(t))}function Lo(t,e,r){r===void 0&&(r=!1);const s=je(t),n=qn(t),i=Gn(n);let o=n==="x"?s===(r?"end":"start")?"right":"left":s==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(o=Ps(o)),[o,Ps(o)]}function _u(t){const e=Ps(t);return[Os(t),e,Os(e)]}function Os(t){return t.replace(/start|end/g,e=>wu[e])}function xu(t,e,r){const s=["left","right"],n=["right","left"],i=["top","bottom"],o=["bottom","top"];switch(t){case"top":case"bottom":return r?e?n:s:e?s:n;case"left":case"right":return e?i:o;default:return[]}}function ku(t,e,r,s){const n=je(t);let i=xu(Ce(t),r==="start",s);return n&&(i=i.map(o=>o+"-"+n),e&&(i=i.concat(i.map(Os)))),i}function Ps(t){return t.replace(/left|right|bottom|top/g,e=>yu[e])}function Su(t){return{top:0,right:0,bottom:0,left:0,...t}}function Kn(t){return typeof t!="number"?Su(t):{top:t,right:t,bottom:t,left:t}}function Wt(t){const{x:e,y:r,width:s,height:n}=t;return{width:s,height:n,top:r,left:e,right:e+s,bottom:r+n,x:e,y:r}}function Io(t,e,r){let{reference:s,floating:n}=t;const i=nt(e),o=qn(e),a=Gn(o),l=Ce(e),c=i==="y",u=s.x+s.width/2-n.width/2,d=s.y+s.height/2-n.height/2,m=s[a]/2-n[a]/2;let f;switch(l){case"top":f={x:u,y:s.y-n.height};break;case"bottom":f={x:u,y:s.y+s.height};break;case"right":f={x:s.x+s.width,y:d};break;case"left":f={x:s.x-n.width,y:d};break;default:f={x:s.x,y:s.y}}switch(je(e)){case"start":f[o]-=m*(r&&c?-1:1);break;case"end":f[o]+=m*(r&&c?-1:1);break}return f}const $u=async(t,e,r)=>{const{placement:s="bottom",strategy:n="absolute",middleware:i=[],platform:o}=r,a=i.filter(Boolean),l=await(o.isRTL==null?void 0:o.isRTL(e));let c=await o.getElementRects({reference:t,floating:e,strategy:n}),{x:u,y:d}=Io(c,s,l),m=s,f={},g=0;for(let v=0;v<a.length;v++){const{name:y,fn:w}=a[v],{x:k,y:C,data:P,reset:N}=await w({x:u,y:d,initialPlacement:s,placement:m,strategy:n,middlewareData:f,rects:c,platform:o,elements:{reference:t,floating:e}});u=k??u,d=C??d,f={...f,[y]:{...f[y],...P}},N&&g<=50&&(g++,typeof N=="object"&&(N.placement&&(m=N.placement),N.rects&&(c=N.rects===!0?await o.getElementRects({reference:t,floating:e,strategy:n}):N.rects),{x:u,y:d}=Io(c,m,l)),v=-1)}return{x:u,y:d,placement:m,strategy:n,middlewareData:f}};async function Gt(t,e){var r;e===void 0&&(e={});const{x:s,y:n,platform:i,rects:o,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:m=!1,padding:f=0}=ze(e,t),g=Kn(f),y=a[m?d==="floating"?"reference":"floating":d],w=Wt(await i.getClippingRect({element:(r=await(i.isElement==null?void 0:i.isElement(y)))==null||r?y:y.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(a.floating)),boundary:c,rootBoundary:u,strategy:l})),k=d==="floating"?{x:s,y:n,width:o.floating.width,height:o.floating.height}:o.reference,C=await(i.getOffsetParent==null?void 0:i.getOffsetParent(a.floating)),P=await(i.isElement==null?void 0:i.isElement(C))?await(i.getScale==null?void 0:i.getScale(C))||{x:1,y:1}:{x:1,y:1},N=Wt(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:k,offsetParent:C,strategy:l}):k);return{top:(w.top-N.top+g.top)/P.y,bottom:(N.bottom-w.bottom+g.bottom)/P.y,left:(w.left-N.left+g.left)/P.x,right:(N.right-w.right+g.right)/P.x}}const Cu=t=>({name:"arrow",options:t,async fn(e){const{x:r,y:s,placement:n,rects:i,platform:o,elements:a,middlewareData:l}=e,{element:c,padding:u=0}=ze(t,e)||{};if(c==null)return{};const d=Kn(u),m={x:r,y:s},f=qn(n),g=Gn(f),v=await o.getDimensions(c),y=f==="y",w=y?"top":"left",k=y?"bottom":"right",C=y?"clientHeight":"clientWidth",P=i.reference[g]+i.reference[f]-m[f]-i.floating[g],N=m[f]-i.reference[f],V=await(o.getOffsetParent==null?void 0:o.getOffsetParent(c));let ae=V?V[C]:0;(!ae||!await(o.isElement==null?void 0:o.isElement(V)))&&(ae=a.floating[C]||i.floating[g]);const we=P/2-N/2,ne=ae/2-v[g]/2-1,A=$e(d[w],ne),D=$e(d[k],ne),F=A,le=ae-v[g]-D,ce=ae/2-v[g]/2+we,tt=Hn(F,ce,le),Le=!l.arrow&&je(n)!=null&&ce!==tt&&i.reference[g]/2-(ce<F?A:D)-v[g]/2<0,Ie=Le?ce<F?ce-F:ce-le:0;return{[f]:m[f]+Ie,data:{[f]:tt,centerOffset:ce-tt-Ie,...Le&&{alignmentOffset:Ie}},reset:Le}}});function Au(t,e,r){return(t?[...r.filter(n=>je(n)===t),...r.filter(n=>je(n)!==t)]:r.filter(n=>Ce(n)===n)).filter(n=>t?je(n)===t||(e?Os(n)!==n:!1):!0)}const Eu=function(t){return t===void 0&&(t={}),{name:"autoPlacement",options:t,async fn(e){var r,s,n;const{rects:i,middlewareData:o,placement:a,platform:l,elements:c}=e,{crossAxis:u=!1,alignment:d,allowedPlacements:m=Ro,autoAlignment:f=!0,...g}=ze(t,e),v=d!==void 0||m===Ro?Au(d||null,f,m):m,y=await Gt(e,g),w=((r=o.autoPlacement)==null?void 0:r.index)||0,k=v[w];if(k==null)return{};const C=Lo(k,i,await(l.isRTL==null?void 0:l.isRTL(c.floating)));if(a!==k)return{reset:{placement:v[0]}};const P=[y[Ce(k)],y[C[0]],y[C[1]]],N=[...((s=o.autoPlacement)==null?void 0:s.overflows)||[],{placement:k,overflows:P}],V=v[w+1];if(V)return{data:{index:w+1,overflows:N},reset:{placement:V}};const ae=N.map(A=>{const D=je(A.placement);return[A.placement,D&&u?A.overflows.slice(0,2).reduce((F,le)=>F+le,0):A.overflows[0],A.overflows]}).sort((A,D)=>A[1]-D[1]),ne=((n=ae.filter(A=>A[2].slice(0,je(A[0])?2:3).every(D=>D<=0))[0])==null?void 0:n[0])||ae[0][0];return ne!==a?{data:{index:w+1,overflows:N},reset:{placement:ne}}:{}}}},Tu=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r,s;const{placement:n,middlewareData:i,rects:o,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:v=!0,...y}=ze(t,e);if((r=i.arrow)!=null&&r.alignmentOffset)return{};const w=Ce(n),k=nt(a),C=Ce(a)===a,P=await(l.isRTL==null?void 0:l.isRTL(c.floating)),N=m||(C||!v?[Ps(a)]:_u(a)),V=g!=="none";!m&&V&&N.push(...ku(a,v,g,P));const ae=[a,...N],we=await Gt(e,y),ne=[];let A=((s=i.flip)==null?void 0:s.overflows)||[];if(u&&ne.push(we[w]),d){const ce=Lo(n,o,P);ne.push(we[ce[0]],we[ce[1]])}if(A=[...A,{placement:n,overflows:ne}],!ne.every(ce=>ce<=0)){var D,F;const ce=(((D=i.flip)==null?void 0:D.index)||0)+1,tt=ae[ce];if(tt)return{data:{index:ce,overflows:A},reset:{placement:tt}};let Le=(F=A.filter(Ie=>Ie.overflows[0]<=0).sort((Ie,rt)=>Ie.overflows[1]-rt.overflows[1])[0])==null?void 0:F.placement;if(!Le)switch(f){case"bestFit":{var le;const Ie=(le=A.filter(rt=>{if(V){const xt=nt(rt.placement);return xt===k||xt==="y"}return!0}).map(rt=>[rt.placement,rt.overflows.filter(xt=>xt>0).reduce((xt,fp)=>xt+fp,0)]).sort((rt,xt)=>rt[1]-xt[1])[0])==null?void 0:le[0];Ie&&(Le=Ie);break}case"initialPlacement":Le=a;break}if(n!==Le)return{reset:{placement:Le}}}return{}}}};function Do(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Mo(t){return Po.some(e=>t[e]>=0)}const Ou=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:r}=e,{strategy:s="referenceHidden",...n}=ze(t,e);switch(s){case"referenceHidden":{const i=await Gt(e,{...n,elementContext:"reference"}),o=Do(i,r.reference);return{data:{referenceHiddenOffsets:o,referenceHidden:Mo(o)}}}case"escaped":{const i=await Gt(e,{...n,altBoundary:!0}),o=Do(i,r.floating);return{data:{escapedOffsets:o,escaped:Mo(o)}}}default:return{}}}}};function zo(t){const e=$e(...t.map(i=>i.left)),r=$e(...t.map(i=>i.top)),s=me(...t.map(i=>i.right)),n=me(...t.map(i=>i.bottom));return{x:e,y:r,width:s-e,height:n-r}}function Pu(t){const e=t.slice().sort((n,i)=>n.y-i.y),r=[];let s=null;for(let n=0;n<e.length;n++){const i=e[n];!s||i.y-s.y>s.height/2?r.push([i]):r[r.length-1].push(i),s=i}return r.map(n=>Wt(zo(n)))}const Nu=function(t){return t===void 0&&(t={}),{name:"inline",options:t,async fn(e){const{placement:r,elements:s,rects:n,platform:i,strategy:o}=e,{padding:a=2,x:l,y:c}=ze(t,e),u=Array.from(await(i.getClientRects==null?void 0:i.getClientRects(s.reference))||[]),d=Pu(u),m=Wt(zo(u)),f=Kn(a);function g(){if(d.length===2&&d[0].left>d[1].right&&l!=null&&c!=null)return d.find(y=>l>y.left-f.left&&l<y.right+f.right&&c>y.top-f.top&&c<y.bottom+f.bottom)||m;if(d.length>=2){if(nt(r)==="y"){const A=d[0],D=d[d.length-1],F=Ce(r)==="top",le=A.top,ce=D.bottom,tt=F?A.left:D.left,Le=F?A.right:D.right,Ie=Le-tt,rt=ce-le;return{top:le,bottom:ce,left:tt,right:Le,width:Ie,height:rt,x:tt,y:le}}const y=Ce(r)==="left",w=me(...d.map(A=>A.right)),k=$e(...d.map(A=>A.left)),C=d.filter(A=>y?A.left===k:A.right===w),P=C[0].top,N=C[C.length-1].bottom,V=k,ae=w,we=ae-V,ne=N-P;return{top:P,bottom:N,left:V,right:ae,width:we,height:ne,x:V,y:P}}return m}const v=await i.getElementRects({reference:{getBoundingClientRect:g},floating:s.floating,strategy:o});return n.reference.x!==v.reference.x||n.reference.y!==v.reference.y||n.reference.width!==v.reference.width||n.reference.height!==v.reference.height?{reset:{rects:v}}:{}}}};async function Ru(t,e){const{placement:r,platform:s,elements:n}=t,i=await(s.isRTL==null?void 0:s.isRTL(n.floating)),o=Ce(r),a=je(r),l=nt(r)==="y",c=["left","top"].includes(o)?-1:1,u=i&&l?-1:1,d=ze(e,t);let{mainAxis:m,crossAxis:f,alignmentAxis:g}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return a&&typeof g=="number"&&(f=a==="end"?g*-1:g),l?{x:f*u,y:m*c}:{x:m*c,y:f*u}}const Lu=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var r,s;const{x:n,y:i,placement:o,middlewareData:a}=e,l=await Ru(e,t);return o===((r=a.offset)==null?void 0:r.placement)&&(s=a.arrow)!=null&&s.alignmentOffset?{}:{x:n+l.x,y:i+l.y,data:{...l,placement:o}}}}},Iu=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:r,y:s,placement:n}=e,{mainAxis:i=!0,crossAxis:o=!1,limiter:a={fn:y=>{let{x:w,y:k}=y;return{x:w,y:k}}},...l}=ze(t,e),c={x:r,y:s},u=await Gt(e,l),d=nt(Ce(n)),m=Wn(d);let f=c[m],g=c[d];if(i){const y=m==="y"?"top":"left",w=m==="y"?"bottom":"right",k=f+u[y],C=f-u[w];f=Hn(k,f,C)}if(o){const y=d==="y"?"top":"left",w=d==="y"?"bottom":"right",k=g+u[y],C=g-u[w];g=Hn(k,g,C)}const v=a.fn({...e,[m]:f,[d]:g});return{...v,data:{x:v.x-r,y:v.y-s}}}}},Du=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:r,y:s,placement:n,rects:i,middlewareData:o}=e,{offset:a=0,mainAxis:l=!0,crossAxis:c=!0}=ze(t,e),u={x:r,y:s},d=nt(n),m=Wn(d);let f=u[m],g=u[d];const v=ze(a,e),y=typeof v=="number"?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(l){const C=m==="y"?"height":"width",P=i.reference[m]-i.floating[C]+y.mainAxis,N=i.reference[m]+i.reference[C]-y.mainAxis;f<P?f=P:f>N&&(f=N)}if(c){var w,k;const C=m==="y"?"width":"height",P=["top","left"].includes(Ce(n)),N=i.reference[d]-i.floating[C]+(P&&((w=o.offset)==null?void 0:w[d])||0)+(P?0:y.crossAxis),V=i.reference[d]+i.reference[C]+(P?0:((k=o.offset)==null?void 0:k[d])||0)-(P?y.crossAxis:0);g<N?g=N:g>V&&(g=V)}return{[m]:f,[d]:g}}}},Mu=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:r,rects:s,platform:n,elements:i}=e,{apply:o=()=>{},...a}=ze(t,e),l=await Gt(e,a),c=Ce(r),u=je(r),d=nt(r)==="y",{width:m,height:f}=s.floating;let g,v;c==="top"||c==="bottom"?(g=c,v=u===(await(n.isRTL==null?void 0:n.isRTL(i.floating))?"start":"end")?"left":"right"):(v=c,g=u==="end"?"top":"bottom");const y=f-l.top-l.bottom,w=m-l.left-l.right,k=$e(f-l[g],y),C=$e(m-l[v],w),P=!e.middlewareData.shift;let N=k,V=C;if(d?V=u||P?$e(C,w):w:N=u||P?$e(k,y):y,P&&!u){const we=me(l.left,0),ne=me(l.right,0),A=me(l.top,0),D=me(l.bottom,0);d?V=m-2*(we!==0||ne!==0?we+ne:me(l.left,l.right)):N=f-2*(A!==0||D!==0?A+D:me(l.top,l.bottom))}await o({...e,availableWidth:V,availableHeight:N});const ae=await n.getDimensions(i.floating);return m!==ae.width||f!==ae.height?{reset:{rects:!0}}:{}}}};function qt(t){return jo(t)?(t.nodeName||"").toLowerCase():"#document"}function Ae(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function it(t){var e;return(e=(jo(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function jo(t){return t instanceof Node||t instanceof Ae(t).Node}function Ue(t){return t instanceof Element||t instanceof Ae(t).Element}function Ke(t){return t instanceof HTMLElement||t instanceof Ae(t).HTMLElement}function Uo(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Ae(t).ShadowRoot}function Ar(t){const{overflow:e,overflowX:r,overflowY:s,display:n}=Ve(t);return/auto|scroll|overlay|hidden|clip/.test(e+s+r)&&!["inline","contents"].includes(n)}function zu(t){return["table","td","th"].includes(qt(t))}function Ns(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function Yn(t){const e=Jn(),r=Ue(t)?Ve(t):t;return r.transform!=="none"||r.perspective!=="none"||(r.containerType?r.containerType!=="normal":!1)||!e&&(r.backdropFilter?r.backdropFilter!=="none":!1)||!e&&(r.filter?r.filter!=="none":!1)||["transform","perspective","filter"].some(s=>(r.willChange||"").includes(s))||["paint","layout","strict","content"].some(s=>(r.contain||"").includes(s))}function ju(t){let e=mt(t);for(;Ke(e)&&!Kt(e);){if(Yn(e))return e;if(Ns(e))return null;e=mt(e)}return null}function Jn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Kt(t){return["html","body","#document"].includes(qt(t))}function Ve(t){return Ae(t).getComputedStyle(t)}function Rs(t){return Ue(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function mt(t){if(qt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Uo(t)&&t.host||it(t);return Uo(e)?e.host:e}function Vo(t){const e=mt(t);return Kt(e)?t.ownerDocument?t.ownerDocument.body:t.body:Ke(e)&&Ar(e)?e:Vo(e)}function Er(t,e,r){var s;e===void 0&&(e=[]),r===void 0&&(r=!0);const n=Vo(t),i=n===((s=t.ownerDocument)==null?void 0:s.body),o=Ae(n);if(i){const a=Xn(o);return e.concat(o,o.visualViewport||[],Ar(n)?n:[],a&&r?Er(a):[])}return e.concat(n,Er(n,[],r))}function Xn(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Bo(t){const e=Ve(t);let r=parseFloat(e.width)||0,s=parseFloat(e.height)||0;const n=Ke(t),i=n?t.offsetWidth:r,o=n?t.offsetHeight:s,a=Es(r)!==i||Es(s)!==o;return a&&(r=i,s=o),{width:r,height:s,$:a}}function Qn(t){return Ue(t)?t:t.contextElement}function Yt(t){const e=Qn(t);if(!Ke(e))return pt(1);const r=e.getBoundingClientRect(),{width:s,height:n,$:i}=Bo(e);let o=(i?Es(r.width):r.width)/s,a=(i?Es(r.height):r.height)/n;return(!o||!Number.isFinite(o))&&(o=1),(!a||!Number.isFinite(a))&&(a=1),{x:o,y:a}}const Uu=pt(0);function Fo(t){const e=Ae(t);return!Jn()||!e.visualViewport?Uu:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Vu(t,e,r){return e===void 0&&(e=!1),!r||e&&r!==Ae(t)?!1:e}function Et(t,e,r,s){e===void 0&&(e=!1),r===void 0&&(r=!1);const n=t.getBoundingClientRect(),i=Qn(t);let o=pt(1);e&&(s?Ue(s)&&(o=Yt(s)):o=Yt(t));const a=Vu(i,r,s)?Fo(i):pt(0);let l=(n.left+a.x)/o.x,c=(n.top+a.y)/o.y,u=n.width/o.x,d=n.height/o.y;if(i){const m=Ae(i),f=s&&Ue(s)?Ae(s):s;let g=m,v=Xn(g);for(;v&&s&&f!==g;){const y=Yt(v),w=v.getBoundingClientRect(),k=Ve(v),C=w.left+(v.clientLeft+parseFloat(k.paddingLeft))*y.x,P=w.top+(v.clientTop+parseFloat(k.paddingTop))*y.y;l*=y.x,c*=y.y,u*=y.x,d*=y.y,l+=C,c+=P,g=Ae(v),v=Xn(g)}}return Wt({width:u,height:d,x:l,y:c})}function Bu(t){let{elements:e,rect:r,offsetParent:s,strategy:n}=t;const i=n==="fixed",o=it(s),a=e?Ns(e.floating):!1;if(s===o||a&&i)return r;let l={scrollLeft:0,scrollTop:0},c=pt(1);const u=pt(0),d=Ke(s);if((d||!d&&!i)&&((qt(s)!=="body"||Ar(o))&&(l=Rs(s)),Ke(s))){const m=Et(s);c=Yt(s),u.x=m.x+s.clientLeft,u.y=m.y+s.clientTop}return{width:r.width*c.x,height:r.height*c.y,x:r.x*c.x-l.scrollLeft*c.x+u.x,y:r.y*c.y-l.scrollTop*c.y+u.y}}function Fu(t){return Array.from(t.getClientRects())}function Zo(t){return Et(it(t)).left+Rs(t).scrollLeft}function Zu(t){const e=it(t),r=Rs(t),s=t.ownerDocument.body,n=me(e.scrollWidth,e.clientWidth,s.scrollWidth,s.clientWidth),i=me(e.scrollHeight,e.clientHeight,s.scrollHeight,s.clientHeight);let o=-r.scrollLeft+Zo(t);const a=-r.scrollTop;return Ve(s).direction==="rtl"&&(o+=me(e.clientWidth,s.clientWidth)-n),{width:n,height:i,x:o,y:a}}function Hu(t,e){const r=Ae(t),s=it(t),n=r.visualViewport;let i=s.clientWidth,o=s.clientHeight,a=0,l=0;if(n){i=n.width,o=n.height;const c=Jn();(!c||c&&e==="fixed")&&(a=n.offsetLeft,l=n.offsetTop)}return{width:i,height:o,x:a,y:l}}function Wu(t,e){const r=Et(t,!0,e==="fixed"),s=r.top+t.clientTop,n=r.left+t.clientLeft,i=Ke(t)?Yt(t):pt(1),o=t.clientWidth*i.x,a=t.clientHeight*i.y,l=n*i.x,c=s*i.y;return{width:o,height:a,x:l,y:c}}function Ho(t,e,r){let s;if(e==="viewport")s=Hu(t,r);else if(e==="document")s=Zu(it(t));else if(Ue(e))s=Wu(e,r);else{const n=Fo(t);s={...e,x:e.x-n.x,y:e.y-n.y}}return Wt(s)}function Wo(t,e){const r=mt(t);return r===e||!Ue(r)||Kt(r)?!1:Ve(r).position==="fixed"||Wo(r,e)}function Gu(t,e){const r=e.get(t);if(r)return r;let s=Er(t,[],!1).filter(a=>Ue(a)&&qt(a)!=="body"),n=null;const i=Ve(t).position==="fixed";let o=i?mt(t):t;for(;Ue(o)&&!Kt(o);){const a=Ve(o),l=Yn(o);!l&&a.position==="fixed"&&(n=null),(i?!l&&!n:!l&&a.position==="static"&&!!n&&["absolute","fixed"].includes(n.position)||Ar(o)&&!l&&Wo(t,o))?s=s.filter(u=>u!==o):n=a,o=mt(o)}return e.set(t,s),s}function qu(t){let{element:e,boundary:r,rootBoundary:s,strategy:n}=t;const o=[...r==="clippingAncestors"?Ns(e)?[]:Gu(e,this._c):[].concat(r),s],a=o[0],l=o.reduce((c,u)=>{const d=Ho(e,u,n);return c.top=me(d.top,c.top),c.right=$e(d.right,c.right),c.bottom=$e(d.bottom,c.bottom),c.left=me(d.left,c.left),c},Ho(e,a,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Ku(t){const{width:e,height:r}=Bo(t);return{width:e,height:r}}function Yu(t,e,r){const s=Ke(e),n=it(e),i=r==="fixed",o=Et(t,!0,i,e);let a={scrollLeft:0,scrollTop:0};const l=pt(0);if(s||!s&&!i)if((qt(e)!=="body"||Ar(n))&&(a=Rs(e)),s){const d=Et(e,!0,i,e);l.x=d.x+e.clientLeft,l.y=d.y+e.clientTop}else n&&(l.x=Zo(n));const c=o.left+a.scrollLeft-l.x,u=o.top+a.scrollTop-l.y;return{x:c,y:u,width:o.width,height:o.height}}function ei(t){return Ve(t).position==="static"}function Go(t,e){return!Ke(t)||Ve(t).position==="fixed"?null:e?e(t):t.offsetParent}function qo(t,e){const r=Ae(t);if(Ns(t))return r;if(!Ke(t)){let n=mt(t);for(;n&&!Kt(n);){if(Ue(n)&&!ei(n))return n;n=mt(n)}return r}let s=Go(t,e);for(;s&&zu(s)&&ei(s);)s=Go(s,e);return s&&Kt(s)&&ei(s)&&!Yn(s)?r:s||ju(t)||r}const Ju=async function(t){const e=this.getOffsetParent||qo,r=this.getDimensions,s=await r(t.floating);return{reference:Yu(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:s.width,height:s.height}}};function Xu(t){return Ve(t).direction==="rtl"}const Ls={convertOffsetParentRelativeRectToViewportRelativeRect:Bu,getDocumentElement:it,getClippingRect:qu,getOffsetParent:qo,getElementRects:Ju,getClientRects:Fu,getDimensions:Ku,getScale:Yt,isElement:Ue,isRTL:Xu};function Qu(t,e){let r=null,s;const n=it(t);function i(){var a;clearTimeout(s),(a=r)==null||a.disconnect(),r=null}function o(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),i();const{left:c,top:u,width:d,height:m}=t.getBoundingClientRect();if(a||e(),!d||!m)return;const f=Ts(u),g=Ts(n.clientWidth-(c+d)),v=Ts(n.clientHeight-(u+m)),y=Ts(c),k={rootMargin:-f+"px "+-g+"px "+-v+"px "+-y+"px",threshold:me(0,$e(1,l))||1};let C=!0;function P(N){const V=N[0].intersectionRatio;if(V!==l){if(!C)return o();V?o(!1,V):s=setTimeout(()=>{o(!1,1e-7)},1e3)}C=!1}try{r=new IntersectionObserver(P,{...k,root:n.ownerDocument})}catch{r=new IntersectionObserver(P,k)}r.observe(t)}return o(!0),i}function ed(t,e,r,s){s===void 0&&(s={});const{ancestorScroll:n=!0,ancestorResize:i=!0,elementResize:o=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=s,c=Qn(t),u=n||i?[...c?Er(c):[],...Er(e)]:[];u.forEach(w=>{n&&w.addEventListener("scroll",r,{passive:!0}),i&&w.addEventListener("resize",r)});const d=c&&a?Qu(c,r):null;let m=-1,f=null;o&&(f=new ResizeObserver(w=>{let[k]=w;k&&k.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var C;(C=f)==null||C.observe(e)})),r()}),c&&!l&&f.observe(c),f.observe(e));let g,v=l?Et(t):null;l&&y();function y(){const w=Et(t);v&&(w.x!==v.x||w.y!==v.y||w.width!==v.width||w.height!==v.height)&&r(),v=w,g=requestAnimationFrame(y)}return r(),()=>{var w;u.forEach(k=>{n&&k.removeEventListener("scroll",r),i&&k.removeEventListener("resize",r)}),d?.(),(w=f)==null||w.disconnect(),f=null,l&&cancelAnimationFrame(g)}}const td=Lu,rd=Iu,sd=Tu,Ko=Mu,nd=Cu,id=(t,e,r)=>{const s=new Map,n={platform:Ls,...r},i={...n.platform,_c:s};return $u(t,e,{...n,platform:i})};function od(t){return ad(t)}function ti(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function ad(t){for(let e=t;e;e=ti(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=ti(t);e;e=ti(e)){if(!(e instanceof Element))continue;const r=getComputedStyle(e);if(r.display!=="contents"&&(r.position!=="static"||r.filter!=="none"||e.tagName==="BODY"))return e}return null}function ld(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var G=class extends oe{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom");let s=0,n=0,i=0,o=0,a=0,l=0,c=0,u=0;r?t.top<e.top?(s=t.left,n=t.bottom,i=t.right,o=t.bottom,a=e.left,l=e.top,c=e.right,u=e.top):(s=e.left,n=e.bottom,i=e.right,o=e.bottom,a=t.left,l=t.top,c=t.right,u=t.top):t.left<e.left?(s=t.right,n=t.top,i=e.left,o=e.top,a=t.right,l=t.bottom,c=e.left,u=e.bottom):(s=e.right,n=e.top,i=t.left,o=t.top,a=e.right,l=e.bottom,c=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${s}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${o}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||ld(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||(this.cleanup=ed(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[td({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Ko({apply:({rects:r})=>{const s=this.sync==="width"||this.sync==="both",n=this.sync==="height"||this.sync==="both";this.popup.style.width=s?`${r.reference.width}px`:"",this.popup.style.height=n?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(sd({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(rd({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Ko({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:s})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${s}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(nd({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?r=>Ls.getOffsetParent(r,od):Ls.getOffsetParent;id(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:bs(ht({},Ls),{getOffsetParent:e})}).then(({x:r,y:s,middlewareData:n,placement:i})=>{const o=this.matches(":dir(rtl)"),a={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${r}px`,top:`${s}px`}),this.arrow){const l=n.arrow.x,c=n.arrow.y;let u="",d="",m="",f="";if(this.arrowPlacement==="start"){const g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=o?g:"",f=o?"":g}else if(this.arrowPlacement==="end"){const g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=o?"":g,f=o?g:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(f=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",u=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(f=typeof l=="number"?`${l}px`:"",u=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:u,right:d,bottom:m,left:f,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return U`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${ve({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${ve({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?U`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};G.styles=[xe,vu],h([de(".popup")],G.prototype,"popup",2),h([de(".popup__arrow")],G.prototype,"arrowEl",2),h([p()],G.prototype,"anchor",2),h([p({type:Boolean,reflect:!0})],G.prototype,"active",2),h([p({reflect:!0})],G.prototype,"placement",2),h([p({reflect:!0})],G.prototype,"strategy",2),h([p({type:Number})],G.prototype,"distance",2),h([p({type:Number})],G.prototype,"skidding",2),h([p({type:Boolean})],G.prototype,"arrow",2),h([p({attribute:"arrow-placement"})],G.prototype,"arrowPlacement",2),h([p({attribute:"arrow-padding",type:Number})],G.prototype,"arrowPadding",2),h([p({type:Boolean})],G.prototype,"flip",2),h([p({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],G.prototype,"flipFallbackPlacements",2),h([p({attribute:"flip-fallback-strategy"})],G.prototype,"flipFallbackStrategy",2),h([p({type:Object})],G.prototype,"flipBoundary",2),h([p({attribute:"flip-padding",type:Number})],G.prototype,"flipPadding",2),h([p({type:Boolean})],G.prototype,"shift",2),h([p({type:Object})],G.prototype,"shiftBoundary",2),h([p({attribute:"shift-padding",type:Number})],G.prototype,"shiftPadding",2),h([p({attribute:"auto-size"})],G.prototype,"autoSize",2),h([p()],G.prototype,"sync",2),h([p({type:Object})],G.prototype,"autoSizeBoundary",2),h([p({attribute:"auto-size-padding",type:Number})],G.prototype,"autoSizePadding",2),h([p({attribute:"hover-bridge",type:Boolean})],G.prototype,"hoverBridge",2);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ri extends Dn{constructor(e){if(super(e),this.it=ee,e.type!==ft.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ee||e==null)return this._t=void 0,this.it=e;if(e===Ne)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}ri.directiveName="unsafeHTML",ri.resultType=1;const cd=In(ri);var z=class extends oe{constructor(){super(...arguments),this.formControlController=new Bn(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Cs(this,"help-text","label"),this.localize=new st(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this.value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>U`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,r=e.closest(".select__clear")!==null,s=e.closest("sl-icon-button")!==null;if(!(r||s)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const n=this.getAllOptions(),i=n.indexOf(this.currentOption);let o=Math.max(0,i);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(o=i+1,o>n.length-1&&(o=0)):t.key==="ArrowUp"?(o=i-1,o<0&&(o=n.length-1)):t.key==="Home"?o=0:t.key==="End"&&(o=n.length-1),this.setCurrentOption(n[o])}if(t.key.length===1||t.key==="Backspace"){const n=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const i of n)if(i.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(i);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const r=t.composedPath().some(s=>s instanceof Element&&s.tagName.toLowerCase()==="sl-icon-button");this.disabled||r||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const r=t.target.closest("sl-option"),s=this.value;r&&!r.disabled&&(this.multiple?this.toggleOptionSelection(r):this.setSelectedOptions(r),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==s&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],r=[];customElements.get("sl-option")?(t.forEach(s=>r.push(s.value)),this.setSelectedOptions(t.filter(s=>e.includes(s.value)))):customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange())}handleTagRemove(t,e){t.stopPropagation(),this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(r=>{r.current=!1,r.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),r=Array.isArray(t)?t:[t];e.forEach(s=>s.selected=!1),r.length&&r.forEach(s=>s.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){var t,e,r,s;this.selectedOptions=this.getAllOptions().filter(n=>n.selected),this.multiple?(this.value=this.selectedOptions.map(n=>n.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length)):(this.value=(e=(t=this.selectedOptions[0])==null?void 0:t.value)!=null?e:"",this.displayLabel=(s=(r=this.selectedOptions[0])==null?void 0:r.getTextLabel())!=null?s:""),this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const r=this.getTag(t,e);return U`<div @sl-remove=${s=>this.handleTagRemove(s,t)}>
          ${typeof r=="string"?cd(r):r}
        </div>`}else if(e===this.maxOptionsVisible)return U`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return U``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(r=>e.includes(r.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await $s(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:t,options:e}=xs(this,"select.show",{dir:this.localize.dir()});await Ss(this.popup.popup,t,e),this.currentOption&&Zn(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await $s(this);const{keyframes:t,options:e}=xs(this,"select.hide",{dir:this.localize.dir()});await Ss(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,ks(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,ks(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,s=this.helpText?!0:!!e,n=this.clearable&&!this.disabled&&this.value.length>0,i=this.placeholder&&this.value.length===0;return U`
      <div
        part="form-control"
        class=${ve({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":s})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${ve({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":i,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?U`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${n?U`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};z.styles=[xe,Oo,gu],z.dependencies={"sl-icon":be,"sl-popup":G,"sl-tag":At},h([de(".select")],z.prototype,"popup",2),h([de(".select__combobox")],z.prototype,"combobox",2),h([de(".select__display-input")],z.prototype,"displayInput",2),h([de(".select__value-input")],z.prototype,"valueInput",2),h([de(".select__listbox")],z.prototype,"listbox",2),h([ke()],z.prototype,"hasFocus",2),h([ke()],z.prototype,"displayLabel",2),h([ke()],z.prototype,"currentOption",2),h([ke()],z.prototype,"selectedOptions",2),h([p()],z.prototype,"name",2),h([p({converter:{fromAttribute:t=>t.split(" "),toAttribute:t=>t.join(" ")}})],z.prototype,"value",2),h([To()],z.prototype,"defaultValue",2),h([p({reflect:!0})],z.prototype,"size",2),h([p()],z.prototype,"placeholder",2),h([p({type:Boolean,reflect:!0})],z.prototype,"multiple",2),h([p({attribute:"max-options-visible",type:Number})],z.prototype,"maxOptionsVisible",2),h([p({type:Boolean,reflect:!0})],z.prototype,"disabled",2),h([p({type:Boolean})],z.prototype,"clearable",2),h([p({type:Boolean,reflect:!0})],z.prototype,"open",2),h([p({type:Boolean})],z.prototype,"hoist",2),h([p({type:Boolean,reflect:!0})],z.prototype,"filled",2),h([p({type:Boolean,reflect:!0})],z.prototype,"pill",2),h([p()],z.prototype,"label",2),h([p({reflect:!0})],z.prototype,"placement",2),h([p({attribute:"help-text"})],z.prototype,"helpText",2),h([p({reflect:!0})],z.prototype,"form",2),h([p({type:Boolean,reflect:!0})],z.prototype,"required",2),h([p()],z.prototype,"getTag",2),h([re("disabled",{waitUntilFirstUpdate:!0})],z.prototype,"handleDisabledChange",1),h([re("value",{waitUntilFirstUpdate:!0})],z.prototype,"handleValueChange",1),h([re("open",{waitUntilFirstUpdate:!0})],z.prototype,"handleOpenChange",1),_s("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),_s("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),z.define("sl-select");var ud=fe`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,Re=class extends oe{constructor(){super(...arguments),this.localize=new st(this),this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){const t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach(r=>{r.nodeType===Node.ELEMENT_NODE&&(r.hasAttribute("slot")||(e+=r.textContent)),r.nodeType===Node.TEXT_NODE&&(e+=r.textContent)}),e.trim()}render(){return U`
      <div
        part="base"
        class=${ve({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Re.styles=[xe,ud],Re.dependencies={"sl-icon":be},h([de(".option__label")],Re.prototype,"defaultSlot",2),h([ke()],Re.prototype,"current",2),h([ke()],Re.prototype,"selected",2),h([ke()],Re.prototype,"hasHover",2),h([p({reflect:!0})],Re.prototype,"value",2),h([p({type:Boolean,reflect:!0})],Re.prototype,"disabled",2),h([re("disabled")],Re.prototype,"handleDisabledChange",1),h([re("selected")],Re.prototype,"handleSelectedChange",1),h([re("value")],Re.prototype,"handleValueChange",1),Re.define("sl-option");var dd=fe`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Ee=class extends oe{constructor(){super(...arguments),this.localize=new st(this),this.tabs=[],this.focusableTabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){const t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(r=>!["aria-labelledby","aria-controls"].includes(r.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(r=>r.attributeName==="disabled")&&this.syncTabsAndPanels()}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((r,s)=>{var n;r[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((n=this.getActiveTab())!=null?n:this.tabs[0],{emitEvents:!1}),s.unobserve(r[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const r=t.target.closest("sl-tab");r?.closest("sl-tab-group")===this&&r!==null&&this.setActiveTab(r,{scrollBehavior:"smooth"})}handleKeyDown(t){const r=t.target.closest("sl-tab");if(r?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&r!==null&&(this.setActiveTab(r,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const n=this.tabs.find(a=>a.matches(":focus")),i=this.matches(":dir(rtl)");let o=null;if(n?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")o=this.focusableTabs[0];else if(t.key==="End")o=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(i?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const a=this.tabs.findIndex(l=>l===n);o=this.findNextFocusableTab(a,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(i?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const a=this.tabs.findIndex(l=>l===n);o=this.findNextFocusableTab(a,"forward")}if(!o)return;o.tabIndex=0,o.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(o,{scrollBehavior:"smooth"}):this.tabs.forEach(a=>{a.tabIndex=a===o?0:-1}),["top","bottom"].includes(this.placement)&&Zn(o,this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=ht({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const r=this.activeTab;this.activeTab=t,this.tabs.forEach(s=>{s.active=s===this.activeTab,s.tabIndex=s===this.activeTab?0:-1}),this.panels.forEach(s=>{var n;return s.active=s.name===((n=this.activeTab)==null?void 0:n.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Zn(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(r&&this.emit("sl-tab-hide",{detail:{name:r.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(r=>r.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,r=t.clientHeight,s=this.matches(":dir(rtl)"),n=this.getAllTabs(),o=n.slice(0,n.indexOf(t)).reduce((a,l)=>({left:a.left+l.clientWidth,top:a.top+l.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=s?`${-1*o.left}px`:`${o.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${r}px`,this.indicator.style.translate=`0 ${o.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(t,e){let r=null;const s=e==="forward"?1:-1;let n=t+s;for(;t<this.tabs.length;){if(r=this.tabs[n]||null,r===null){e==="forward"?r=this.focusableTabs[0]:r=this.focusableTabs[this.focusableTabs.length-1];break}if(!r.disabled)break;n+=s}return r}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find(r=>r.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t=this.matches(":dir(rtl)");return U`
      <div
        part="base"
        class=${ve({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?U`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?U`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};Ee.styles=[xe,dd],Ee.dependencies={"sl-icon-button":pe},h([de(".tab-group")],Ee.prototype,"tabGroup",2),h([de(".tab-group__body")],Ee.prototype,"body",2),h([de(".tab-group__nav")],Ee.prototype,"nav",2),h([de(".tab-group__indicator")],Ee.prototype,"indicator",2),h([ke()],Ee.prototype,"hasScrollControls",2),h([p()],Ee.prototype,"placement",2),h([p()],Ee.prototype,"activation",2),h([p({attribute:"no-scroll-controls",type:Boolean})],Ee.prototype,"noScrollControls",2),h([re("noScrollControls",{waitUntilFirstUpdate:!0})],Ee.prototype,"updateScrollControls",1),h([re("placement",{waitUntilFirstUpdate:!0})],Ee.prototype,"syncIndicator",1),Ee.define("sl-tab-group");var hd=fe`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible):not([disabled]) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus-visible) {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,fd=0,Be=class extends oe{constructor(){super(...arguments),this.localize=new st(this),this.attrId=++fd,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,U`
      <div
        part="base"
        class=${ve({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?U`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Be.styles=[xe,hd],Be.dependencies={"sl-icon-button":pe},h([de(".tab")],Be.prototype,"tab",2),h([p({reflect:!0})],Be.prototype,"panel",2),h([p({type:Boolean,reflect:!0})],Be.prototype,"active",2),h([p({type:Boolean,reflect:!0})],Be.prototype,"closable",2),h([p({type:Boolean,reflect:!0})],Be.prototype,"disabled",2),h([p({type:Number,reflect:!0})],Be.prototype,"tabIndex",2),h([re("active")],Be.prototype,"handleActiveChange",1),h([re("disabled")],Be.prototype,"handleDisabledChange",1),Be.define("sl-tab");var pd=fe`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,md=0,Tr=class extends oe{constructor(){super(...arguments),this.attrId=++md,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return U`
      <slot
        part="base"
        class=${ve({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};Tr.styles=[xe,pd],h([p({reflect:!0})],Tr.prototype,"name",2),h([p({type:Boolean,reflect:!0})],Tr.prototype,"active",2),h([re("active")],Tr.prototype,"handleActiveChange",1),Tr.define("sl-tab-panel"),$n("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/dist");const gd=`main.app{background-color:var(--bg-color);border-color:var(--border-color);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.top-bar h1{text-align:center}.top-bar menu{display:flex;justify-content:space-around;column-gap:10px}.loading{text-align:center}sl-icon.rotate{animation:turn 1s infinite linear}@keyframes turn{0%{transform:rotate(0)}to{transform:rotate(180deg)}}sl-button{margin-right:1rem}sl-tab>sl-icon{margin-right:.5rem}form [data-invalid]::part(base){border-color:var(--sl-color-danger-600)}form .field,form sl-alert{margin:0rem .2rem 1rem}form .field>.error{display:flex;column-gap:.2rem;padding:.5rem 0;color:var(--sl-color-danger-600)}small.app-version{float:right}
`;var bd=t=>t;function vd(t,e=bd){return(r,...s)=>{r[0]==="."&&(r=r.slice(1));const n=t()?.[r];switch(typeof n){case"function":return n(...s);case"string":return e(n,s[0]);default:return n}}}const Yo={"Member Portal":"Medlemsportal","Sign up":"Opprett konto","Sign in":"Logg inn","Sign out":"Logg ut",Email:"E-post adresse",Password:"Passord",Profile:"Profil",Account:"Konto",Contact:"Kontakt",Save:"Lagre","First name":"Fornavn","Last name":"Etternavn",Address:"Adresse",Phone:"Telefonnummer","My membership":"Mitt medlemskap",Subscription:"Avtale","Failed signing up":"Kunne ikke opprette konto","Failed signing in":"Kunne ikke logge inn","Not implemented":"Ikke implementert","Did you type your password and email correct?":"Har du skrevet riktig passord og e-post-adresse?","Did you already sign up?":"Har du allerede registrert deg?","Error saving":"Kunne ikke lagre","Must be a valid email address":"Ugyldig adresse","Must be a valid name":"Ugyldig navn","Must be a valid street address":"Ugyldig adresse","Must be 3-16 charcters and contain one digit and a special char":"M\xE5 v\xE6re 3-16 tegn langt og inneha ett tall og et tegn"},Jo=[{code:"no",name:"norsk",dict:Yo},{code:"en",name:"english",dict:Object.keys(Yo).reduce((t,e)=>({...t,[e]:e}),[])}],yd=Jo.reduce((t,{code:e,dict:r})=>({...t,[e]:r}),{}),Xo=hr(),Qo=Jo.map(({code:t,name:e})=>({code:t,name:e})),wd=t=>{const[e,r]=W("en"),[s]=Oe(e,o=>(console.log({langCode:o}),yd[o])),i={t:o=>{const l=vd(s)(o);return l||(console.info(`i18nProvider: Missing text for '${o}'(${e()})`),o)},setLocale:r,locale:e};return S(Xo.Provider,{value:i,get children(){return t.children}})},Ye=()=>Dt(Xo);var j;(function(t){t.assertEqual=n=>n;function e(n){}t.assertIs=e;function r(n){throw new Error}t.assertNever=r,t.arrayToEnum=n=>{const i={};for(const o of n)i[o]=o;return i},t.getValidEnumValues=n=>{const i=t.objectKeys(n).filter(a=>typeof n[n[a]]!="number"),o={};for(const a of i)o[a]=n[a];return t.objectValues(o)},t.objectValues=n=>t.objectKeys(n).map(function(i){return n[i]}),t.objectKeys=typeof Object.keys=="function"?n=>Object.keys(n):n=>{const i=[];for(const o in n)Object.prototype.hasOwnProperty.call(n,o)&&i.push(o);return i},t.find=(n,i)=>{for(const o of n)if(i(o))return o},t.isInteger=typeof Number.isInteger=="function"?n=>Number.isInteger(n):n=>typeof n=="number"&&isFinite(n)&&Math.floor(n)===n;function s(n,i=" | "){return n.map(o=>typeof o=="string"?`'${o}'`:o).join(i)}t.joinValues=s,t.jsonStringifyReplacer=(n,i)=>typeof i=="bigint"?i.toString():i})(j||(j={}));var si;(function(t){t.mergeShapes=(e,r)=>({...e,...r})})(si||(si={}));const x=j.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),gt=t=>{switch(typeof t){case"undefined":return x.undefined;case"string":return x.string;case"number":return isNaN(t)?x.nan:x.number;case"boolean":return x.boolean;case"function":return x.function;case"bigint":return x.bigint;case"symbol":return x.symbol;case"object":return Array.isArray(t)?x.array:t===null?x.null:t.then&&typeof t.then=="function"&&t.catch&&typeof t.catch=="function"?x.promise:typeof Map<"u"&&t instanceof Map?x.map:typeof Set<"u"&&t instanceof Set?x.set:typeof Date<"u"&&t instanceof Date?x.date:x.object;default:return x.unknown}},b=j.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),_d=t=>JSON.stringify(t,null,2).replace(/"([^"]+)":/g,"$1:");class Te extends Error{constructor(e){super(),this.issues=[],this.addIssue=s=>{this.issues=[...this.issues,s]},this.addIssues=(s=[])=>{this.issues=[...this.issues,...s]};const r=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,r):this.__proto__=r,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){const r=e||function(i){return i.message},s={_errors:[]},n=i=>{for(const o of i.issues)if(o.code==="invalid_union")o.unionErrors.map(n);else if(o.code==="invalid_return_type")n(o.returnTypeError);else if(o.code==="invalid_arguments")n(o.argumentsError);else if(o.path.length===0)s._errors.push(r(o));else{let a=s,l=0;for(;l<o.path.length;){const c=o.path[l];l===o.path.length-1?(a[c]=a[c]||{_errors:[]},a[c]._errors.push(r(o))):a[c]=a[c]||{_errors:[]},a=a[c],l++}}};return n(this),s}static assert(e){if(!(e instanceof Te))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,j.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=r=>r.message){const r={},s=[];for(const n of this.issues)n.path.length>0?(r[n.path[0]]=r[n.path[0]]||[],r[n.path[0]].push(e(n))):s.push(e(n));return{formErrors:s,fieldErrors:r}}get formErrors(){return this.flatten()}}Te.create=t=>new Te(t);const Jt=(t,e)=>{let r;switch(t.code){case b.invalid_type:t.received===x.undefined?r="Required":r=`Expected ${t.expected}, received ${t.received}`;break;case b.invalid_literal:r=`Invalid literal value, expected ${JSON.stringify(t.expected,j.jsonStringifyReplacer)}`;break;case b.unrecognized_keys:r=`Unrecognized key(s) in object: ${j.joinValues(t.keys,", ")}`;break;case b.invalid_union:r="Invalid input";break;case b.invalid_union_discriminator:r=`Invalid discriminator value. Expected ${j.joinValues(t.options)}`;break;case b.invalid_enum_value:r=`Invalid enum value. Expected ${j.joinValues(t.options)}, received '${t.received}'`;break;case b.invalid_arguments:r="Invalid function arguments";break;case b.invalid_return_type:r="Invalid function return type";break;case b.invalid_date:r="Invalid date";break;case b.invalid_string:typeof t.validation=="object"?"includes"in t.validation?(r=`Invalid input: must include "${t.validation.includes}"`,typeof t.validation.position=="number"&&(r=`${r} at one or more positions greater than or equal to ${t.validation.position}`)):"startsWith"in t.validation?r=`Invalid input: must start with "${t.validation.startsWith}"`:"endsWith"in t.validation?r=`Invalid input: must end with "${t.validation.endsWith}"`:j.assertNever(t.validation):t.validation!=="regex"?r=`Invalid ${t.validation}`:r="Invalid";break;case b.too_small:t.type==="array"?r=`Array must contain ${t.exact?"exactly":t.inclusive?"at least":"more than"} ${t.minimum} element(s)`:t.type==="string"?r=`String must contain ${t.exact?"exactly":t.inclusive?"at least":"over"} ${t.minimum} character(s)`:t.type==="number"?r=`Number must be ${t.exact?"exactly equal to ":t.inclusive?"greater than or equal to ":"greater than "}${t.minimum}`:t.type==="date"?r=`Date must be ${t.exact?"exactly equal to ":t.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(t.minimum))}`:r="Invalid input";break;case b.too_big:t.type==="array"?r=`Array must contain ${t.exact?"exactly":t.inclusive?"at most":"less than"} ${t.maximum} element(s)`:t.type==="string"?r=`String must contain ${t.exact?"exactly":t.inclusive?"at most":"under"} ${t.maximum} character(s)`:t.type==="number"?r=`Number must be ${t.exact?"exactly":t.inclusive?"less than or equal to":"less than"} ${t.maximum}`:t.type==="bigint"?r=`BigInt must be ${t.exact?"exactly":t.inclusive?"less than or equal to":"less than"} ${t.maximum}`:t.type==="date"?r=`Date must be ${t.exact?"exactly":t.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(t.maximum))}`:r="Invalid input";break;case b.custom:r="Invalid input";break;case b.invalid_intersection_types:r="Intersection results could not be merged";break;case b.not_multiple_of:r=`Number must be a multiple of ${t.multipleOf}`;break;case b.not_finite:r="Number must be finite";break;default:r=e.defaultError,j.assertNever(t)}return{message:r}};let ea=Jt;function xd(t){ea=t}function Is(){return ea}const Ds=t=>{const{data:e,path:r,errorMaps:s,issueData:n}=t,i=[...r,...n.path||[]],o={...n,path:i};if(n.message!==void 0)return{...n,path:i,message:n.message};let a="";const l=s.filter(c=>!!c).slice().reverse();for(const c of l)a=c(o,{data:e,defaultError:a}).message;return{...n,path:i,message:a}},kd=[];function _(t,e){const r=Is(),s=Ds({issueData:e,data:t.data,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,r,r===Jt?void 0:Jt].filter(n=>!!n)});t.common.issues.push(s)}class ge{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,r){const s=[];for(const n of r){if(n.status==="aborted")return T;n.status==="dirty"&&e.dirty(),s.push(n.value)}return{status:e.value,value:s}}static async mergeObjectAsync(e,r){const s=[];for(const n of r){const i=await n.key,o=await n.value;s.push({key:i,value:o})}return ge.mergeObjectSync(e,s)}static mergeObjectSync(e,r){const s={};for(const n of r){const{key:i,value:o}=n;if(i.status==="aborted"||o.status==="aborted")return T;i.status==="dirty"&&e.dirty(),o.status==="dirty"&&e.dirty(),i.value!=="__proto__"&&(typeof o.value<"u"||n.alwaysSet)&&(s[i.value]=o.value)}return{status:e.value,value:s}}}const T=Object.freeze({status:"aborted"}),Xt=t=>({status:"dirty",value:t}),ye=t=>({status:"valid",value:t}),ni=t=>t.status==="aborted",ii=t=>t.status==="dirty",Or=t=>t.status==="valid",Pr=t=>typeof Promise<"u"&&t instanceof Promise;function Ms(t,e,r,s){if(r==="a"&&!s)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!s:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?s:r==="a"?s.call(t):s?s.value:e.get(t)}function ta(t,e,r,s,n){if(s==="m")throw new TypeError("Private method is not writable");if(s==="a"&&!n)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return s==="a"?n.call(t,r):n?n.value=r:e.set(t,r),r}typeof SuppressedError=="function"&&SuppressedError;var $;(function(t){t.errToObj=e=>typeof e=="string"?{message:e}:e||{},t.toString=e=>typeof e=="string"?e:e?.message})($||($={}));var Nr,Rr;class Je{constructor(e,r,s,n){this._cachedPath=[],this.parent=e,this.data=r,this._path=s,this._key=n}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const ra=(t,e)=>{if(Or(e))return{success:!0,data:e.value};if(!t.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const r=new Te(t.common.issues);return this._error=r,this._error}}};function R(t){if(!t)return{};const{errorMap:e,invalid_type_error:r,required_error:s,description:n}=t;if(e&&(r||s))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:n}:{errorMap:(o,a)=>{var l,c;const{message:u}=t;return o.code==="invalid_enum_value"?{message:u??a.defaultError}:typeof a.data>"u"?{message:(l=u??s)!==null&&l!==void 0?l:a.defaultError}:o.code!=="invalid_type"?{message:a.defaultError}:{message:(c=u??r)!==null&&c!==void 0?c:a.defaultError}},description:n}}class I{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return gt(e.data)}_getOrReturnCtx(e,r){return r||{common:e.parent.common,data:e.data,parsedType:gt(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new ge,ctx:{common:e.parent.common,data:e.data,parsedType:gt(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const r=this._parse(e);if(Pr(r))throw new Error("Synchronous parse encountered promise.");return r}_parseAsync(e){const r=this._parse(e);return Promise.resolve(r)}parse(e,r){const s=this.safeParse(e,r);if(s.success)return s.data;throw s.error}safeParse(e,r){var s;const n={common:{issues:[],async:(s=r?.async)!==null&&s!==void 0?s:!1,contextualErrorMap:r?.errorMap},path:r?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:gt(e)},i=this._parseSync({data:e,path:n.path,parent:n});return ra(n,i)}async parseAsync(e,r){const s=await this.safeParseAsync(e,r);if(s.success)return s.data;throw s.error}async safeParseAsync(e,r){const s={common:{issues:[],contextualErrorMap:r?.errorMap,async:!0},path:r?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:gt(e)},n=this._parse({data:e,path:s.path,parent:s}),i=await(Pr(n)?n:Promise.resolve(n));return ra(s,i)}refine(e,r){const s=n=>typeof r=="string"||typeof r>"u"?{message:r}:typeof r=="function"?r(n):r;return this._refinement((n,i)=>{const o=e(n),a=()=>i.addIssue({code:b.custom,...s(n)});return typeof Promise<"u"&&o instanceof Promise?o.then(l=>l?!0:(a(),!1)):o?!0:(a(),!1)})}refinement(e,r){return this._refinement((s,n)=>e(s)?!0:(n.addIssue(typeof r=="function"?r(s,n):r),!1))}_refinement(e){return new He({schema:this,typeName:E.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return Qe.create(this,this._def)}nullable(){return wt.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return Ze.create(this,this._def)}promise(){return rr.create(this,this._def)}or(e){return Mr.create([this,e],this._def)}and(e){return zr.create(this,e,this._def)}transform(e){return new He({...R(this._def),schema:this,typeName:E.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const r=typeof e=="function"?e:()=>e;return new Fr({...R(this._def),innerType:this,defaultValue:r,typeName:E.ZodDefault})}brand(){return new li({typeName:E.ZodBranded,type:this,...R(this._def)})}catch(e){const r=typeof e=="function"?e:()=>e;return new Zr({...R(this._def),innerType:this,catchValue:r,typeName:E.ZodCatch})}describe(e){const r=this.constructor;return new r({...this._def,description:e})}pipe(e){return Hr.create(this,e)}readonly(){return Wr.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const Sd=/^c[^\s-]{8,}$/i,$d=/^[0-9a-z]+$/,Cd=/^[0-9A-HJKMNP-TV-Z]{26}$/,Ad=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,Ed=/^[a-z0-9_-]{21}$/i,Td=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,Od=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,Pd="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";let oi;const Nd=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Rd=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,Ld=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,sa="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",Id=new RegExp(`^${sa}$`);function na(t){let e="([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";return t.precision?e=`${e}\\.\\d{${t.precision}}`:t.precision==null&&(e=`${e}(\\.\\d+)?`),e}function Dd(t){return new RegExp(`^${na(t)}$`)}function ia(t){let e=`${sa}T${na(t)}`;const r=[];return r.push(t.local?"Z?":"Z"),t.offset&&r.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${r.join("|")})`,new RegExp(`^${e}$`)}function Md(t,e){return!!((e==="v4"||!e)&&Nd.test(t)||(e==="v6"||!e)&&Rd.test(t))}class Fe extends I{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==x.string){const i=this._getOrReturnCtx(e);return _(i,{code:b.invalid_type,expected:x.string,received:i.parsedType}),T}const s=new ge;let n;for(const i of this._def.checks)if(i.kind==="min")e.data.length<i.value&&(n=this._getOrReturnCtx(e,n),_(n,{code:b.too_small,minimum:i.value,type:"string",inclusive:!0,exact:!1,message:i.message}),s.dirty());else if(i.kind==="max")e.data.length>i.value&&(n=this._getOrReturnCtx(e,n),_(n,{code:b.too_big,maximum:i.value,type:"string",inclusive:!0,exact:!1,message:i.message}),s.dirty());else if(i.kind==="length"){const o=e.data.length>i.value,a=e.data.length<i.value;(o||a)&&(n=this._getOrReturnCtx(e,n),o?_(n,{code:b.too_big,maximum:i.value,type:"string",inclusive:!0,exact:!0,message:i.message}):a&&_(n,{code:b.too_small,minimum:i.value,type:"string",inclusive:!0,exact:!0,message:i.message}),s.dirty())}else if(i.kind==="email")Od.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"email",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="emoji")oi||(oi=new RegExp(Pd,"u")),oi.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"emoji",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="uuid")Ad.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"uuid",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="nanoid")Ed.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"nanoid",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="cuid")Sd.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"cuid",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="cuid2")$d.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"cuid2",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="ulid")Cd.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"ulid",code:b.invalid_string,message:i.message}),s.dirty());else if(i.kind==="url")try{new URL(e.data)}catch{n=this._getOrReturnCtx(e,n),_(n,{validation:"url",code:b.invalid_string,message:i.message}),s.dirty()}else i.kind==="regex"?(i.regex.lastIndex=0,i.regex.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"regex",code:b.invalid_string,message:i.message}),s.dirty())):i.kind==="trim"?e.data=e.data.trim():i.kind==="includes"?e.data.includes(i.value,i.position)||(n=this._getOrReturnCtx(e,n),_(n,{code:b.invalid_string,validation:{includes:i.value,position:i.position},message:i.message}),s.dirty()):i.kind==="toLowerCase"?e.data=e.data.toLowerCase():i.kind==="toUpperCase"?e.data=e.data.toUpperCase():i.kind==="startsWith"?e.data.startsWith(i.value)||(n=this._getOrReturnCtx(e,n),_(n,{code:b.invalid_string,validation:{startsWith:i.value},message:i.message}),s.dirty()):i.kind==="endsWith"?e.data.endsWith(i.value)||(n=this._getOrReturnCtx(e,n),_(n,{code:b.invalid_string,validation:{endsWith:i.value},message:i.message}),s.dirty()):i.kind==="datetime"?ia(i).test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{code:b.invalid_string,validation:"datetime",message:i.message}),s.dirty()):i.kind==="date"?Id.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{code:b.invalid_string,validation:"date",message:i.message}),s.dirty()):i.kind==="time"?Dd(i).test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{code:b.invalid_string,validation:"time",message:i.message}),s.dirty()):i.kind==="duration"?Td.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"duration",code:b.invalid_string,message:i.message}),s.dirty()):i.kind==="ip"?Md(e.data,i.version)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"ip",code:b.invalid_string,message:i.message}),s.dirty()):i.kind==="base64"?Ld.test(e.data)||(n=this._getOrReturnCtx(e,n),_(n,{validation:"base64",code:b.invalid_string,message:i.message}),s.dirty()):j.assertNever(i);return{status:s.value,value:e.data}}_regex(e,r,s){return this.refinement(n=>e.test(n),{validation:r,code:b.invalid_string,...$.errToObj(s)})}_addCheck(e){return new Fe({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...$.errToObj(e)})}url(e){return this._addCheck({kind:"url",...$.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...$.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...$.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...$.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...$.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...$.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...$.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...$.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...$.errToObj(e)})}datetime(e){var r,s;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof e?.precision>"u"?null:e?.precision,offset:(r=e?.offset)!==null&&r!==void 0?r:!1,local:(s=e?.local)!==null&&s!==void 0?s:!1,...$.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof e?.precision>"u"?null:e?.precision,...$.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...$.errToObj(e)})}regex(e,r){return this._addCheck({kind:"regex",regex:e,...$.errToObj(r)})}includes(e,r){return this._addCheck({kind:"includes",value:e,position:r?.position,...$.errToObj(r?.message)})}startsWith(e,r){return this._addCheck({kind:"startsWith",value:e,...$.errToObj(r)})}endsWith(e,r){return this._addCheck({kind:"endsWith",value:e,...$.errToObj(r)})}min(e,r){return this._addCheck({kind:"min",value:e,...$.errToObj(r)})}max(e,r){return this._addCheck({kind:"max",value:e,...$.errToObj(r)})}length(e,r){return this._addCheck({kind:"length",value:e,...$.errToObj(r)})}nonempty(e){return this.min(1,$.errToObj(e))}trim(){return new Fe({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new Fe({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new Fe({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get minLength(){let e=null;for(const r of this._def.checks)r.kind==="min"&&(e===null||r.value>e)&&(e=r.value);return e}get maxLength(){let e=null;for(const r of this._def.checks)r.kind==="max"&&(e===null||r.value<e)&&(e=r.value);return e}}Fe.create=t=>{var e;return new Fe({checks:[],typeName:E.ZodString,coerce:(e=t?.coerce)!==null&&e!==void 0?e:!1,...R(t)})};function zd(t,e){const r=(t.toString().split(".")[1]||"").length,s=(e.toString().split(".")[1]||"").length,n=r>s?r:s,i=parseInt(t.toFixed(n).replace(".","")),o=parseInt(e.toFixed(n).replace(".",""));return i%o/Math.pow(10,n)}class bt extends I{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==x.number){const i=this._getOrReturnCtx(e);return _(i,{code:b.invalid_type,expected:x.number,received:i.parsedType}),T}let s;const n=new ge;for(const i of this._def.checks)i.kind==="int"?j.isInteger(e.data)||(s=this._getOrReturnCtx(e,s),_(s,{code:b.invalid_type,expected:"integer",received:"float",message:i.message}),n.dirty()):i.kind==="min"?(i.inclusive?e.data<i.value:e.data<=i.value)&&(s=this._getOrReturnCtx(e,s),_(s,{code:b.too_small,minimum:i.value,type:"number",inclusive:i.inclusive,exact:!1,message:i.message}),n.dirty()):i.kind==="max"?(i.inclusive?e.data>i.value:e.data>=i.value)&&(s=this._getOrReturnCtx(e,s),_(s,{code:b.too_big,maximum:i.value,type:"number",inclusive:i.inclusive,exact:!1,message:i.message}),n.dirty()):i.kind==="multipleOf"?zd(e.data,i.value)!==0&&(s=this._getOrReturnCtx(e,s),_(s,{code:b.not_multiple_of,multipleOf:i.value,message:i.message}),n.dirty()):i.kind==="finite"?Number.isFinite(e.data)||(s=this._getOrReturnCtx(e,s),_(s,{code:b.not_finite,message:i.message}),n.dirty()):j.assertNever(i);return{status:n.value,value:e.data}}gte(e,r){return this.setLimit("min",e,!0,$.toString(r))}gt(e,r){return this.setLimit("min",e,!1,$.toString(r))}lte(e,r){return this.setLimit("max",e,!0,$.toString(r))}lt(e,r){return this.setLimit("max",e,!1,$.toString(r))}setLimit(e,r,s,n){return new bt({...this._def,checks:[...this._def.checks,{kind:e,value:r,inclusive:s,message:$.toString(n)}]})}_addCheck(e){return new bt({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:$.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:$.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:$.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:$.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:$.toString(e)})}multipleOf(e,r){return this._addCheck({kind:"multipleOf",value:e,message:$.toString(r)})}finite(e){return this._addCheck({kind:"finite",message:$.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:$.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:$.toString(e)})}get minValue(){let e=null;for(const r of this._def.checks)r.kind==="min"&&(e===null||r.value>e)&&(e=r.value);return e}get maxValue(){let e=null;for(const r of this._def.checks)r.kind==="max"&&(e===null||r.value<e)&&(e=r.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&j.isInteger(e.value))}get isFinite(){let e=null,r=null;for(const s of this._def.checks){if(s.kind==="finite"||s.kind==="int"||s.kind==="multipleOf")return!0;s.kind==="min"?(r===null||s.value>r)&&(r=s.value):s.kind==="max"&&(e===null||s.value<e)&&(e=s.value)}return Number.isFinite(r)&&Number.isFinite(e)}}bt.create=t=>new bt({checks:[],typeName:E.ZodNumber,coerce:t?.coerce||!1,...R(t)});class vt extends I{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==x.bigint){const i=this._getOrReturnCtx(e);return _(i,{code:b.invalid_type,expected:x.bigint,received:i.parsedType}),T}let s;const n=new ge;for(const i of this._def.checks)i.kind==="min"?(i.inclusive?e.data<i.value:e.data<=i.value)&&(s=this._getOrReturnCtx(e,s),_(s,{code:b.too_small,type:"bigint",minimum:i.value,inclusive:i.inclusive,message:i.message}),n.dirty()):i.kind==="max"?(i.inclusive?e.data>i.value:e.data>=i.value)&&(s=this._getOrReturnCtx(e,s),_(s,{code:b.too_big,type:"bigint",maximum:i.value,inclusive:i.inclusive,message:i.message}),n.dirty()):i.kind==="multipleOf"?e.data%i.value!==BigInt(0)&&(s=this._getOrReturnCtx(e,s),_(s,{code:b.not_multiple_of,multipleOf:i.value,message:i.message}),n.dirty()):j.assertNever(i);return{status:n.value,value:e.data}}gte(e,r){return this.setLimit("min",e,!0,$.toString(r))}gt(e,r){return this.setLimit("min",e,!1,$.toString(r))}lte(e,r){return this.setLimit("max",e,!0,$.toString(r))}lt(e,r){return this.setLimit("max",e,!1,$.toString(r))}setLimit(e,r,s,n){return new vt({...this._def,checks:[...this._def.checks,{kind:e,value:r,inclusive:s,message:$.toString(n)}]})}_addCheck(e){return new vt({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:$.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:$.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:$.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:$.toString(e)})}multipleOf(e,r){return this._addCheck({kind:"multipleOf",value:e,message:$.toString(r)})}get minValue(){let e=null;for(const r of this._def.checks)r.kind==="min"&&(e===null||r.value>e)&&(e=r.value);return e}get maxValue(){let e=null;for(const r of this._def.checks)r.kind==="max"&&(e===null||r.value<e)&&(e=r.value);return e}}vt.create=t=>{var e;return new vt({checks:[],typeName:E.ZodBigInt,coerce:(e=t?.coerce)!==null&&e!==void 0?e:!1,...R(t)})};class Lr extends I{_parse(e){if(this._def.coerce&&(e.data=Boolean(e.data)),this._getType(e)!==x.boolean){const s=this._getOrReturnCtx(e);return _(s,{code:b.invalid_type,expected:x.boolean,received:s.parsedType}),T}return ye(e.data)}}Lr.create=t=>new Lr({typeName:E.ZodBoolean,coerce:t?.coerce||!1,...R(t)});class Tt extends I{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==x.date){const i=this._getOrReturnCtx(e);return _(i,{code:b.invalid_type,expected:x.date,received:i.parsedType}),T}if(isNaN(e.data.getTime())){const i=this._getOrReturnCtx(e);return _(i,{code:b.invalid_date}),T}const s=new ge;let n;for(const i of this._def.checks)i.kind==="min"?e.data.getTime()<i.value&&(n=this._getOrReturnCtx(e,n),_(n,{code:b.too_small,message:i.message,inclusive:!0,exact:!1,minimum:i.value,type:"date"}),s.dirty()):i.kind==="max"?e.data.getTime()>i.value&&(n=this._getOrReturnCtx(e,n),_(n,{code:b.too_big,message:i.message,inclusive:!0,exact:!1,maximum:i.value,type:"date"}),s.dirty()):j.assertNever(i);return{status:s.value,value:new Date(e.data.getTime())}}_addCheck(e){return new Tt({...this._def,checks:[...this._def.checks,e]})}min(e,r){return this._addCheck({kind:"min",value:e.getTime(),message:$.toString(r)})}max(e,r){return this._addCheck({kind:"max",value:e.getTime(),message:$.toString(r)})}get minDate(){let e=null;for(const r of this._def.checks)r.kind==="min"&&(e===null||r.value>e)&&(e=r.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(const r of this._def.checks)r.kind==="max"&&(e===null||r.value<e)&&(e=r.value);return e!=null?new Date(e):null}}Tt.create=t=>new Tt({checks:[],coerce:t?.coerce||!1,typeName:E.ZodDate,...R(t)});class zs extends I{_parse(e){if(this._getType(e)!==x.symbol){const s=this._getOrReturnCtx(e);return _(s,{code:b.invalid_type,expected:x.symbol,received:s.parsedType}),T}return ye(e.data)}}zs.create=t=>new zs({typeName:E.ZodSymbol,...R(t)});class Ir extends I{_parse(e){if(this._getType(e)!==x.undefined){const s=this._getOrReturnCtx(e);return _(s,{code:b.invalid_type,expected:x.undefined,received:s.parsedType}),T}return ye(e.data)}}Ir.create=t=>new Ir({typeName:E.ZodUndefined,...R(t)});class Dr extends I{_parse(e){if(this._getType(e)!==x.null){const s=this._getOrReturnCtx(e);return _(s,{code:b.invalid_type,expected:x.null,received:s.parsedType}),T}return ye(e.data)}}Dr.create=t=>new Dr({typeName:E.ZodNull,...R(t)});class Qt extends I{constructor(){super(...arguments),this._any=!0}_parse(e){return ye(e.data)}}Qt.create=t=>new Qt({typeName:E.ZodAny,...R(t)});class Ot extends I{constructor(){super(...arguments),this._unknown=!0}_parse(e){return ye(e.data)}}Ot.create=t=>new Ot({typeName:E.ZodUnknown,...R(t)});class ot extends I{_parse(e){const r=this._getOrReturnCtx(e);return _(r,{code:b.invalid_type,expected:x.never,received:r.parsedType}),T}}ot.create=t=>new ot({typeName:E.ZodNever,...R(t)});class js extends I{_parse(e){if(this._getType(e)!==x.undefined){const s=this._getOrReturnCtx(e);return _(s,{code:b.invalid_type,expected:x.void,received:s.parsedType}),T}return ye(e.data)}}js.create=t=>new js({typeName:E.ZodVoid,...R(t)});class Ze extends I{_parse(e){const{ctx:r,status:s}=this._processInputParams(e),n=this._def;if(r.parsedType!==x.array)return _(r,{code:b.invalid_type,expected:x.array,received:r.parsedType}),T;if(n.exactLength!==null){const o=r.data.length>n.exactLength.value,a=r.data.length<n.exactLength.value;(o||a)&&(_(r,{code:o?b.too_big:b.too_small,minimum:a?n.exactLength.value:void 0,maximum:o?n.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:n.exactLength.message}),s.dirty())}if(n.minLength!==null&&r.data.length<n.minLength.value&&(_(r,{code:b.too_small,minimum:n.minLength.value,type:"array",inclusive:!0,exact:!1,message:n.minLength.message}),s.dirty()),n.maxLength!==null&&r.data.length>n.maxLength.value&&(_(r,{code:b.too_big,maximum:n.maxLength.value,type:"array",inclusive:!0,exact:!1,message:n.maxLength.message}),s.dirty()),r.common.async)return Promise.all([...r.data].map((o,a)=>n.type._parseAsync(new Je(r,o,r.path,a)))).then(o=>ge.mergeArray(s,o));const i=[...r.data].map((o,a)=>n.type._parseSync(new Je(r,o,r.path,a)));return ge.mergeArray(s,i)}get element(){return this._def.type}min(e,r){return new Ze({...this._def,minLength:{value:e,message:$.toString(r)}})}max(e,r){return new Ze({...this._def,maxLength:{value:e,message:$.toString(r)}})}length(e,r){return new Ze({...this._def,exactLength:{value:e,message:$.toString(r)}})}nonempty(e){return this.min(1,e)}}Ze.create=(t,e)=>new Ze({type:t,minLength:null,maxLength:null,exactLength:null,typeName:E.ZodArray,...R(e)});function er(t){if(t instanceof X){const e={};for(const r in t.shape){const s=t.shape[r];e[r]=Qe.create(er(s))}return new X({...t._def,shape:()=>e})}else return t instanceof Ze?new Ze({...t._def,type:er(t.element)}):t instanceof Qe?Qe.create(er(t.unwrap())):t instanceof wt?wt.create(er(t.unwrap())):t instanceof Xe?Xe.create(t.items.map(e=>er(e))):t}class X extends I{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;const e=this._def.shape(),r=j.objectKeys(e);return this._cached={shape:e,keys:r}}_parse(e){if(this._getType(e)!==x.object){const c=this._getOrReturnCtx(e);return _(c,{code:b.invalid_type,expected:x.object,received:c.parsedType}),T}const{status:s,ctx:n}=this._processInputParams(e),{shape:i,keys:o}=this._getCached(),a=[];if(!(this._def.catchall instanceof ot&&this._def.unknownKeys==="strip"))for(const c in n.data)o.includes(c)||a.push(c);const l=[];for(const c of o){const u=i[c],d=n.data[c];l.push({key:{status:"valid",value:c},value:u._parse(new Je(n,d,n.path,c)),alwaysSet:c in n.data})}if(this._def.catchall instanceof ot){const c=this._def.unknownKeys;if(c==="passthrough")for(const u of a)l.push({key:{status:"valid",value:u},value:{status:"valid",value:n.data[u]}});else if(c==="strict")a.length>0&&(_(n,{code:b.unrecognized_keys,keys:a}),s.dirty());else if(c!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const c=this._def.catchall;for(const u of a){const d=n.data[u];l.push({key:{status:"valid",value:u},value:c._parse(new Je(n,d,n.path,u)),alwaysSet:u in n.data})}}return n.common.async?Promise.resolve().then(async()=>{const c=[];for(const u of l){const d=await u.key,m=await u.value;c.push({key:d,value:m,alwaysSet:u.alwaysSet})}return c}).then(c=>ge.mergeObjectSync(s,c)):ge.mergeObjectSync(s,l)}get shape(){return this._def.shape()}strict(e){return $.errToObj,new X({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(r,s)=>{var n,i,o,a;const l=(o=(i=(n=this._def).errorMap)===null||i===void 0?void 0:i.call(n,r,s).message)!==null&&o!==void 0?o:s.defaultError;return r.code==="unrecognized_keys"?{message:(a=$.errToObj(e).message)!==null&&a!==void 0?a:l}:{message:l}}}:{}})}strip(){return new X({...this._def,unknownKeys:"strip"})}passthrough(){return new X({...this._def,unknownKeys:"passthrough"})}extend(e){return new X({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new X({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:E.ZodObject})}setKey(e,r){return this.augment({[e]:r})}catchall(e){return new X({...this._def,catchall:e})}pick(e){const r={};return j.objectKeys(e).forEach(s=>{e[s]&&this.shape[s]&&(r[s]=this.shape[s])}),new X({...this._def,shape:()=>r})}omit(e){const r={};return j.objectKeys(this.shape).forEach(s=>{e[s]||(r[s]=this.shape[s])}),new X({...this._def,shape:()=>r})}deepPartial(){return er(this)}partial(e){const r={};return j.objectKeys(this.shape).forEach(s=>{const n=this.shape[s];e&&!e[s]?r[s]=n:r[s]=n.optional()}),new X({...this._def,shape:()=>r})}required(e){const r={};return j.objectKeys(this.shape).forEach(s=>{if(e&&!e[s])r[s]=this.shape[s];else{let i=this.shape[s];for(;i instanceof Qe;)i=i._def.innerType;r[s]=i}}),new X({...this._def,shape:()=>r})}keyof(){return oa(j.objectKeys(this.shape))}}X.create=(t,e)=>new X({shape:()=>t,unknownKeys:"strip",catchall:ot.create(),typeName:E.ZodObject,...R(e)}),X.strictCreate=(t,e)=>new X({shape:()=>t,unknownKeys:"strict",catchall:ot.create(),typeName:E.ZodObject,...R(e)}),X.lazycreate=(t,e)=>new X({shape:t,unknownKeys:"strip",catchall:ot.create(),typeName:E.ZodObject,...R(e)});class Mr extends I{_parse(e){const{ctx:r}=this._processInputParams(e),s=this._def.options;function n(i){for(const a of i)if(a.result.status==="valid")return a.result;for(const a of i)if(a.result.status==="dirty")return r.common.issues.push(...a.ctx.common.issues),a.result;const o=i.map(a=>new Te(a.ctx.common.issues));return _(r,{code:b.invalid_union,unionErrors:o}),T}if(r.common.async)return Promise.all(s.map(async i=>{const o={...r,common:{...r.common,issues:[]},parent:null};return{result:await i._parseAsync({data:r.data,path:r.path,parent:o}),ctx:o}})).then(n);{let i;const o=[];for(const l of s){const c={...r,common:{...r.common,issues:[]},parent:null},u=l._parseSync({data:r.data,path:r.path,parent:c});if(u.status==="valid")return u;u.status==="dirty"&&!i&&(i={result:u,ctx:c}),c.common.issues.length&&o.push(c.common.issues)}if(i)return r.common.issues.push(...i.ctx.common.issues),i.result;const a=o.map(l=>new Te(l));return _(r,{code:b.invalid_union,unionErrors:a}),T}}get options(){return this._def.options}}Mr.create=(t,e)=>new Mr({options:t,typeName:E.ZodUnion,...R(e)});const at=t=>t instanceof Ur?at(t.schema):t instanceof He?at(t.innerType()):t instanceof Vr?[t.value]:t instanceof yt?t.options:t instanceof Br?j.objectValues(t.enum):t instanceof Fr?at(t._def.innerType):t instanceof Ir?[void 0]:t instanceof Dr?[null]:t instanceof Qe?[void 0,...at(t.unwrap())]:t instanceof wt?[null,...at(t.unwrap())]:t instanceof li||t instanceof Wr?at(t.unwrap()):t instanceof Zr?at(t._def.innerType):[];class Us extends I{_parse(e){const{ctx:r}=this._processInputParams(e);if(r.parsedType!==x.object)return _(r,{code:b.invalid_type,expected:x.object,received:r.parsedType}),T;const s=this.discriminator,n=r.data[s],i=this.optionsMap.get(n);return i?r.common.async?i._parseAsync({data:r.data,path:r.path,parent:r}):i._parseSync({data:r.data,path:r.path,parent:r}):(_(r,{code:b.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[s]}),T)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,r,s){const n=new Map;for(const i of r){const o=at(i.shape[e]);if(!o.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(const a of o){if(n.has(a))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);n.set(a,i)}}return new Us({typeName:E.ZodDiscriminatedUnion,discriminator:e,options:r,optionsMap:n,...R(s)})}}function ai(t,e){const r=gt(t),s=gt(e);if(t===e)return{valid:!0,data:t};if(r===x.object&&s===x.object){const n=j.objectKeys(e),i=j.objectKeys(t).filter(a=>n.indexOf(a)!==-1),o={...t,...e};for(const a of i){const l=ai(t[a],e[a]);if(!l.valid)return{valid:!1};o[a]=l.data}return{valid:!0,data:o}}else if(r===x.array&&s===x.array){if(t.length!==e.length)return{valid:!1};const n=[];for(let i=0;i<t.length;i++){const o=t[i],a=e[i],l=ai(o,a);if(!l.valid)return{valid:!1};n.push(l.data)}return{valid:!0,data:n}}else return r===x.date&&s===x.date&&+t==+e?{valid:!0,data:t}:{valid:!1}}class zr extends I{_parse(e){const{status:r,ctx:s}=this._processInputParams(e),n=(i,o)=>{if(ni(i)||ni(o))return T;const a=ai(i.value,o.value);return a.valid?((ii(i)||ii(o))&&r.dirty(),{status:r.value,value:a.data}):(_(s,{code:b.invalid_intersection_types}),T)};return s.common.async?Promise.all([this._def.left._parseAsync({data:s.data,path:s.path,parent:s}),this._def.right._parseAsync({data:s.data,path:s.path,parent:s})]).then(([i,o])=>n(i,o)):n(this._def.left._parseSync({data:s.data,path:s.path,parent:s}),this._def.right._parseSync({data:s.data,path:s.path,parent:s}))}}zr.create=(t,e,r)=>new zr({left:t,right:e,typeName:E.ZodIntersection,...R(r)});class Xe extends I{_parse(e){const{status:r,ctx:s}=this._processInputParams(e);if(s.parsedType!==x.array)return _(s,{code:b.invalid_type,expected:x.array,received:s.parsedType}),T;if(s.data.length<this._def.items.length)return _(s,{code:b.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),T;!this._def.rest&&s.data.length>this._def.items.length&&(_(s,{code:b.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),r.dirty());const i=[...s.data].map((o,a)=>{const l=this._def.items[a]||this._def.rest;return l?l._parse(new Je(s,o,s.path,a)):null}).filter(o=>!!o);return s.common.async?Promise.all(i).then(o=>ge.mergeArray(r,o)):ge.mergeArray(r,i)}get items(){return this._def.items}rest(e){return new Xe({...this._def,rest:e})}}Xe.create=(t,e)=>{if(!Array.isArray(t))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Xe({items:t,typeName:E.ZodTuple,rest:null,...R(e)})};class jr extends I{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:r,ctx:s}=this._processInputParams(e);if(s.parsedType!==x.object)return _(s,{code:b.invalid_type,expected:x.object,received:s.parsedType}),T;const n=[],i=this._def.keyType,o=this._def.valueType;for(const a in s.data)n.push({key:i._parse(new Je(s,a,s.path,a)),value:o._parse(new Je(s,s.data[a],s.path,a)),alwaysSet:a in s.data});return s.common.async?ge.mergeObjectAsync(r,n):ge.mergeObjectSync(r,n)}get element(){return this._def.valueType}static create(e,r,s){return r instanceof I?new jr({keyType:e,valueType:r,typeName:E.ZodRecord,...R(s)}):new jr({keyType:Fe.create(),valueType:e,typeName:E.ZodRecord,...R(r)})}}class Vs extends I{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:r,ctx:s}=this._processInputParams(e);if(s.parsedType!==x.map)return _(s,{code:b.invalid_type,expected:x.map,received:s.parsedType}),T;const n=this._def.keyType,i=this._def.valueType,o=[...s.data.entries()].map(([a,l],c)=>({key:n._parse(new Je(s,a,s.path,[c,"key"])),value:i._parse(new Je(s,l,s.path,[c,"value"]))}));if(s.common.async){const a=new Map;return Promise.resolve().then(async()=>{for(const l of o){const c=await l.key,u=await l.value;if(c.status==="aborted"||u.status==="aborted")return T;(c.status==="dirty"||u.status==="dirty")&&r.dirty(),a.set(c.value,u.value)}return{status:r.value,value:a}})}else{const a=new Map;for(const l of o){const c=l.key,u=l.value;if(c.status==="aborted"||u.status==="aborted")return T;(c.status==="dirty"||u.status==="dirty")&&r.dirty(),a.set(c.value,u.value)}return{status:r.value,value:a}}}}Vs.create=(t,e,r)=>new Vs({valueType:e,keyType:t,typeName:E.ZodMap,...R(r)});class Pt extends I{_parse(e){const{status:r,ctx:s}=this._processInputParams(e);if(s.parsedType!==x.set)return _(s,{code:b.invalid_type,expected:x.set,received:s.parsedType}),T;const n=this._def;n.minSize!==null&&s.data.size<n.minSize.value&&(_(s,{code:b.too_small,minimum:n.minSize.value,type:"set",inclusive:!0,exact:!1,message:n.minSize.message}),r.dirty()),n.maxSize!==null&&s.data.size>n.maxSize.value&&(_(s,{code:b.too_big,maximum:n.maxSize.value,type:"set",inclusive:!0,exact:!1,message:n.maxSize.message}),r.dirty());const i=this._def.valueType;function o(l){const c=new Set;for(const u of l){if(u.status==="aborted")return T;u.status==="dirty"&&r.dirty(),c.add(u.value)}return{status:r.value,value:c}}const a=[...s.data.values()].map((l,c)=>i._parse(new Je(s,l,s.path,c)));return s.common.async?Promise.all(a).then(l=>o(l)):o(a)}min(e,r){return new Pt({...this._def,minSize:{value:e,message:$.toString(r)}})}max(e,r){return new Pt({...this._def,maxSize:{value:e,message:$.toString(r)}})}size(e,r){return this.min(e,r).max(e,r)}nonempty(e){return this.min(1,e)}}Pt.create=(t,e)=>new Pt({valueType:t,minSize:null,maxSize:null,typeName:E.ZodSet,...R(e)});class tr extends I{constructor(){super(...arguments),this.validate=this.implement}_parse(e){const{ctx:r}=this._processInputParams(e);if(r.parsedType!==x.function)return _(r,{code:b.invalid_type,expected:x.function,received:r.parsedType}),T;function s(a,l){return Ds({data:a,path:r.path,errorMaps:[r.common.contextualErrorMap,r.schemaErrorMap,Is(),Jt].filter(c=>!!c),issueData:{code:b.invalid_arguments,argumentsError:l}})}function n(a,l){return Ds({data:a,path:r.path,errorMaps:[r.common.contextualErrorMap,r.schemaErrorMap,Is(),Jt].filter(c=>!!c),issueData:{code:b.invalid_return_type,returnTypeError:l}})}const i={errorMap:r.common.contextualErrorMap},o=r.data;if(this._def.returns instanceof rr){const a=this;return ye(async function(...l){const c=new Te([]),u=await a._def.args.parseAsync(l,i).catch(f=>{throw c.addIssue(s(l,f)),c}),d=await Reflect.apply(o,this,u);return await a._def.returns._def.type.parseAsync(d,i).catch(f=>{throw c.addIssue(n(d,f)),c})})}else{const a=this;return ye(function(...l){const c=a._def.args.safeParse(l,i);if(!c.success)throw new Te([s(l,c.error)]);const u=Reflect.apply(o,this,c.data),d=a._def.returns.safeParse(u,i);if(!d.success)throw new Te([n(u,d.error)]);return d.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new tr({...this._def,args:Xe.create(e).rest(Ot.create())})}returns(e){return new tr({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,r,s){return new tr({args:e||Xe.create([]).rest(Ot.create()),returns:r||Ot.create(),typeName:E.ZodFunction,...R(s)})}}class Ur extends I{get schema(){return this._def.getter()}_parse(e){const{ctx:r}=this._processInputParams(e);return this._def.getter()._parse({data:r.data,path:r.path,parent:r})}}Ur.create=(t,e)=>new Ur({getter:t,typeName:E.ZodLazy,...R(e)});class Vr extends I{_parse(e){if(e.data!==this._def.value){const r=this._getOrReturnCtx(e);return _(r,{received:r.data,code:b.invalid_literal,expected:this._def.value}),T}return{status:"valid",value:e.data}}get value(){return this._def.value}}Vr.create=(t,e)=>new Vr({value:t,typeName:E.ZodLiteral,...R(e)});function oa(t,e){return new yt({values:t,typeName:E.ZodEnum,...R(e)})}class yt extends I{constructor(){super(...arguments),Nr.set(this,void 0)}_parse(e){if(typeof e.data!="string"){const r=this._getOrReturnCtx(e),s=this._def.values;return _(r,{expected:j.joinValues(s),received:r.parsedType,code:b.invalid_type}),T}if(Ms(this,Nr,"f")||ta(this,Nr,new Set(this._def.values),"f"),!Ms(this,Nr,"f").has(e.data)){const r=this._getOrReturnCtx(e),s=this._def.values;return _(r,{received:r.data,code:b.invalid_enum_value,options:s}),T}return ye(e.data)}get options(){return this._def.values}get enum(){const e={};for(const r of this._def.values)e[r]=r;return e}get Values(){const e={};for(const r of this._def.values)e[r]=r;return e}get Enum(){const e={};for(const r of this._def.values)e[r]=r;return e}extract(e,r=this._def){return yt.create(e,{...this._def,...r})}exclude(e,r=this._def){return yt.create(this.options.filter(s=>!e.includes(s)),{...this._def,...r})}}Nr=new WeakMap,yt.create=oa;class Br extends I{constructor(){super(...arguments),Rr.set(this,void 0)}_parse(e){const r=j.getValidEnumValues(this._def.values),s=this._getOrReturnCtx(e);if(s.parsedType!==x.string&&s.parsedType!==x.number){const n=j.objectValues(r);return _(s,{expected:j.joinValues(n),received:s.parsedType,code:b.invalid_type}),T}if(Ms(this,Rr,"f")||ta(this,Rr,new Set(j.getValidEnumValues(this._def.values)),"f"),!Ms(this,Rr,"f").has(e.data)){const n=j.objectValues(r);return _(s,{received:s.data,code:b.invalid_enum_value,options:n}),T}return ye(e.data)}get enum(){return this._def.values}}Rr=new WeakMap,Br.create=(t,e)=>new Br({values:t,typeName:E.ZodNativeEnum,...R(e)});class rr extends I{unwrap(){return this._def.type}_parse(e){const{ctx:r}=this._processInputParams(e);if(r.parsedType!==x.promise&&r.common.async===!1)return _(r,{code:b.invalid_type,expected:x.promise,received:r.parsedType}),T;const s=r.parsedType===x.promise?r.data:Promise.resolve(r.data);return ye(s.then(n=>this._def.type.parseAsync(n,{path:r.path,errorMap:r.common.contextualErrorMap})))}}rr.create=(t,e)=>new rr({type:t,typeName:E.ZodPromise,...R(e)});class He extends I{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===E.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:r,ctx:s}=this._processInputParams(e),n=this._def.effect||null,i={addIssue:o=>{_(s,o),o.fatal?r.abort():r.dirty()},get path(){return s.path}};if(i.addIssue=i.addIssue.bind(i),n.type==="preprocess"){const o=n.transform(s.data,i);if(s.common.async)return Promise.resolve(o).then(async a=>{if(r.value==="aborted")return T;const l=await this._def.schema._parseAsync({data:a,path:s.path,parent:s});return l.status==="aborted"?T:l.status==="dirty"||r.value==="dirty"?Xt(l.value):l});{if(r.value==="aborted")return T;const a=this._def.schema._parseSync({data:o,path:s.path,parent:s});return a.status==="aborted"?T:a.status==="dirty"||r.value==="dirty"?Xt(a.value):a}}if(n.type==="refinement"){const o=a=>{const l=n.refinement(a,i);if(s.common.async)return Promise.resolve(l);if(l instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return a};if(s.common.async===!1){const a=this._def.schema._parseSync({data:s.data,path:s.path,parent:s});return a.status==="aborted"?T:(a.status==="dirty"&&r.dirty(),o(a.value),{status:r.value,value:a.value})}else return this._def.schema._parseAsync({data:s.data,path:s.path,parent:s}).then(a=>a.status==="aborted"?T:(a.status==="dirty"&&r.dirty(),o(a.value).then(()=>({status:r.value,value:a.value}))))}if(n.type==="transform")if(s.common.async===!1){const o=this._def.schema._parseSync({data:s.data,path:s.path,parent:s});if(!Or(o))return o;const a=n.transform(o.value,i);if(a instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:r.value,value:a}}else return this._def.schema._parseAsync({data:s.data,path:s.path,parent:s}).then(o=>Or(o)?Promise.resolve(n.transform(o.value,i)).then(a=>({status:r.value,value:a})):o);j.assertNever(n)}}He.create=(t,e,r)=>new He({schema:t,typeName:E.ZodEffects,effect:e,...R(r)}),He.createWithPreprocess=(t,e,r)=>new He({schema:e,effect:{type:"preprocess",transform:t},typeName:E.ZodEffects,...R(r)});class Qe extends I{_parse(e){return this._getType(e)===x.undefined?ye(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}Qe.create=(t,e)=>new Qe({innerType:t,typeName:E.ZodOptional,...R(e)});class wt extends I{_parse(e){return this._getType(e)===x.null?ye(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}wt.create=(t,e)=>new wt({innerType:t,typeName:E.ZodNullable,...R(e)});class Fr extends I{_parse(e){const{ctx:r}=this._processInputParams(e);let s=r.data;return r.parsedType===x.undefined&&(s=this._def.defaultValue()),this._def.innerType._parse({data:s,path:r.path,parent:r})}removeDefault(){return this._def.innerType}}Fr.create=(t,e)=>new Fr({innerType:t,typeName:E.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...R(e)});class Zr extends I{_parse(e){const{ctx:r}=this._processInputParams(e),s={...r,common:{...r.common,issues:[]}},n=this._def.innerType._parse({data:s.data,path:s.path,parent:{...s}});return Pr(n)?n.then(i=>({status:"valid",value:i.status==="valid"?i.value:this._def.catchValue({get error(){return new Te(s.common.issues)},input:s.data})})):{status:"valid",value:n.status==="valid"?n.value:this._def.catchValue({get error(){return new Te(s.common.issues)},input:s.data})}}removeCatch(){return this._def.innerType}}Zr.create=(t,e)=>new Zr({innerType:t,typeName:E.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...R(e)});class Bs extends I{_parse(e){if(this._getType(e)!==x.nan){const s=this._getOrReturnCtx(e);return _(s,{code:b.invalid_type,expected:x.nan,received:s.parsedType}),T}return{status:"valid",value:e.data}}}Bs.create=t=>new Bs({typeName:E.ZodNaN,...R(t)});const jd=Symbol("zod_brand");class li extends I{_parse(e){const{ctx:r}=this._processInputParams(e),s=r.data;return this._def.type._parse({data:s,path:r.path,parent:r})}unwrap(){return this._def.type}}class Hr extends I{_parse(e){const{status:r,ctx:s}=this._processInputParams(e);if(s.common.async)return(async()=>{const i=await this._def.in._parseAsync({data:s.data,path:s.path,parent:s});return i.status==="aborted"?T:i.status==="dirty"?(r.dirty(),Xt(i.value)):this._def.out._parseAsync({data:i.value,path:s.path,parent:s})})();{const n=this._def.in._parseSync({data:s.data,path:s.path,parent:s});return n.status==="aborted"?T:n.status==="dirty"?(r.dirty(),{status:"dirty",value:n.value}):this._def.out._parseSync({data:n.value,path:s.path,parent:s})}}static create(e,r){return new Hr({in:e,out:r,typeName:E.ZodPipeline})}}class Wr extends I{_parse(e){const r=this._def.innerType._parse(e),s=n=>(Or(n)&&(n.value=Object.freeze(n.value)),n);return Pr(r)?r.then(n=>s(n)):s(r)}unwrap(){return this._def.innerType}}Wr.create=(t,e)=>new Wr({innerType:t,typeName:E.ZodReadonly,...R(e)});function aa(t,e={},r){return t?Qt.create().superRefine((s,n)=>{var i,o;if(!t(s)){const a=typeof e=="function"?e(s):typeof e=="string"?{message:e}:e,l=(o=(i=a.fatal)!==null&&i!==void 0?i:r)!==null&&o!==void 0?o:!0,c=typeof a=="string"?{message:a}:a;n.addIssue({code:"custom",...c,fatal:l})}}):Qt.create()}const Ud={object:X.lazycreate};var E;(function(t){t.ZodString="ZodString",t.ZodNumber="ZodNumber",t.ZodNaN="ZodNaN",t.ZodBigInt="ZodBigInt",t.ZodBoolean="ZodBoolean",t.ZodDate="ZodDate",t.ZodSymbol="ZodSymbol",t.ZodUndefined="ZodUndefined",t.ZodNull="ZodNull",t.ZodAny="ZodAny",t.ZodUnknown="ZodUnknown",t.ZodNever="ZodNever",t.ZodVoid="ZodVoid",t.ZodArray="ZodArray",t.ZodObject="ZodObject",t.ZodUnion="ZodUnion",t.ZodDiscriminatedUnion="ZodDiscriminatedUnion",t.ZodIntersection="ZodIntersection",t.ZodTuple="ZodTuple",t.ZodRecord="ZodRecord",t.ZodMap="ZodMap",t.ZodSet="ZodSet",t.ZodFunction="ZodFunction",t.ZodLazy="ZodLazy",t.ZodLiteral="ZodLiteral",t.ZodEnum="ZodEnum",t.ZodEffects="ZodEffects",t.ZodNativeEnum="ZodNativeEnum",t.ZodOptional="ZodOptional",t.ZodNullable="ZodNullable",t.ZodDefault="ZodDefault",t.ZodCatch="ZodCatch",t.ZodPromise="ZodPromise",t.ZodBranded="ZodBranded",t.ZodPipeline="ZodPipeline",t.ZodReadonly="ZodReadonly"})(E||(E={}));const Vd=(t,e={message:`Input not instance of ${t.name}`})=>aa(r=>r instanceof t,e),la=Fe.create,ca=bt.create,Bd=Bs.create,Fd=vt.create,ua=Lr.create,Zd=Tt.create,Hd=zs.create,Wd=Ir.create,Gd=Dr.create,qd=Qt.create,Kd=Ot.create,Yd=ot.create,Jd=js.create,Xd=Ze.create,Qd=X.create,eh=X.strictCreate,th=Mr.create,rh=Us.create,sh=zr.create,nh=Xe.create,ih=jr.create,oh=Vs.create,ah=Pt.create,lh=tr.create,ch=Ur.create,uh=Vr.create,dh=yt.create,hh=Br.create,fh=rr.create,da=He.create,ph=Qe.create,mh=wt.create,gh=He.createWithPreprocess,bh=Hr.create;var te=Object.freeze({__proto__:null,defaultErrorMap:Jt,setErrorMap:xd,getErrorMap:Is,makeIssue:Ds,EMPTY_PATH:kd,addIssueToContext:_,ParseStatus:ge,INVALID:T,DIRTY:Xt,OK:ye,isAborted:ni,isDirty:ii,isValid:Or,isAsync:Pr,get util(){return j},get objectUtil(){return si},ZodParsedType:x,getParsedType:gt,ZodType:I,datetimeRegex:ia,ZodString:Fe,ZodNumber:bt,ZodBigInt:vt,ZodBoolean:Lr,ZodDate:Tt,ZodSymbol:zs,ZodUndefined:Ir,ZodNull:Dr,ZodAny:Qt,ZodUnknown:Ot,ZodNever:ot,ZodVoid:js,ZodArray:Ze,ZodObject:X,ZodUnion:Mr,ZodDiscriminatedUnion:Us,ZodIntersection:zr,ZodTuple:Xe,ZodRecord:jr,ZodMap:Vs,ZodSet:Pt,ZodFunction:tr,ZodLazy:Ur,ZodLiteral:Vr,ZodEnum:yt,ZodNativeEnum:Br,ZodPromise:rr,ZodEffects:He,ZodTransformer:He,ZodOptional:Qe,ZodNullable:wt,ZodDefault:Fr,ZodCatch:Zr,ZodNaN:Bs,BRAND:jd,ZodBranded:li,ZodPipeline:Hr,ZodReadonly:Wr,custom:aa,Schema:I,ZodSchema:I,late:Ud,get ZodFirstPartyTypeKind(){return E},coerce:{string:t=>Fe.create({...t,coerce:!0}),number:t=>bt.create({...t,coerce:!0}),boolean:t=>Lr.create({...t,coerce:!0}),bigint:t=>vt.create({...t,coerce:!0}),date:t=>Tt.create({...t,coerce:!0})},any:qd,array:Xd,bigint:Fd,boolean:ua,date:Zd,discriminatedUnion:rh,effect:da,enum:dh,function:lh,instanceof:Vd,intersection:sh,lazy:ch,literal:uh,map:oh,nan:Bd,nativeEnum:hh,never:Yd,null:Gd,nullable:mh,number:ca,object:Qd,oboolean:()=>ua().optional(),onumber:()=>ca().optional(),optional:ph,ostring:()=>la().optional(),pipeline:bh,preprocess:gh,promise:fh,record:ih,set:ah,strictObject:eh,string:la,symbol:Hd,transformer:da,tuple:nh,undefined:Wd,union:th,unknown:Kd,void:Jd,NEVER:T,ZodIssueCode:b,quotelessJson:_d,ZodError:Te}),vh=Object.defineProperty,yh=(t,e)=>{for(var r in e)vh(t,r,{get:e[r],enumerable:!0})},wh=class{collectable={};listeners={};interceptors;constructor({interceptors:t}={}){this.interceptors=t??{}}subscribe(t,e,r=!1){if(this.listeners[t]||(this.listeners[t]=[]),!this.isSubscribed(t,e)&&(this.listeners[t]?.push(e),r&&this.collectable[t])){let s=this.collectable[t];this.collectable[t]=[];for(let n of s)e(...n)}}subscribeOnce(t,e=!1){return new Promise(r=>{let s=!1,n=(...i)=>{s||(s=!0,this.unSubscribe(t,n),r(i))};this.subscribe(t,n,e)})}unSubscribe(t,e){if(this.listeners[t]){let r=this.listeners[t]?.findIndex(s=>s===e);r&&this.listeners[t]?.splice(r,1)}}isSubscribed(t,e){return!!this.listeners[t]?.includes(e)}async emit(t,e,r=!1){let s=this.interceptors[t],n=s?await s(...e):e;this.listeners[t]?.length===0&&r&&(this.collectable[t]||(this.collectable[t]=[]),this.collectable[t]?.push(e));for(let i of this.listeners[t]??[])i(...n)}reset({collectable:t,listeners:e}){if(Array.isArray(t))for(let r of t)delete this.collectable[r];else typeof t=="string"?delete this.collectable[t]:t!==!1&&(this.collectable={});if(Array.isArray(e))for(let r of e)delete this.listeners[r];else typeof e=="string"?delete this.listeners[e]:e!==!1&&(this.listeners={})}scanListeners(t){let e=Object.keys(this.listeners);return t&&(e=e.filter(t)),e}},_h={};yh(_h,{CborBreak:()=>Zs,CborError:()=>Rt,CborFillMissing:()=>va,CborInvalidMajorError:()=>Fs,CborNumberError:()=>di,CborPartialDisabled:()=>ba,CborRangeError:()=>et,Encoded:()=>ui,Gap:()=>ya,POW_2_53:()=>xh,POW_2_64:()=>ci,PartiallyEncoded:()=>hi,Reader:()=>pi,Tagged:()=>se,Writer:()=>Hs,decode:()=>xa,encode:()=>sr,infiniteBytes:()=>mi,partiallyEncodeObject:()=>fi});var xh=9007199254740992,ci=BigInt(18446744073709552e3),ui=class{constructor(t){this.encoded=t}},Q=class extends Error{},Nt=class extends Q{name="NoActiveSocket";message="No socket is currently connected to a SurrealDB instance. Please call the .connect() method first!"},ha=class extends Q{name="EngineDisconnected";message="The engine reported the connection to SurrealDB has dropped"},fa=class extends Q{constructor(t){super(),this.response=t,this.message=`${t}`}name="UnexpectedServerResponse"},kh=class extends Q{constructor(t){super(),this.error=t,this.message=`${t}`}name="UnexpectedConnectionError"},Sh=class extends Q{constructor(t){super(),this.engine=t}name="UnsupportedEngine";message="The engine you are trying to connect to is not supported or configured."},pa=class extends Q{name="ConnectionUnavailable";message="There is no connection available at this moment."},$h=class extends Q{name="MissingNamespaceDatabase";message="There are no namespace and/or database configured."},Ch=class extends Q{constructor(t,e,r,s){super(),this.message=t,this.status=e,this.statusText=r,this.buffer=s}name="HttpConnectionError"},K=class extends Q{constructor(t){super(),this.message=t}name="ResponseError"},Ah=class extends Q{name="NoNamespaceSpecified";message="Please specify a namespace to use."},Eh=class extends Q{name="NoDatabaseSpecified";message="Please specify a database to use."},ma=class extends Q{name="NoTokenReturned";message="Did not receive an authentication token."},Th=class extends Q{name="UnsupportedVersion";version;supportedRange;constructor(t,e){super(),this.version=t,this.supportedRange=e,this.message=`The version "${t}" reported by the engine is not supported by this library, expected a version that satisfies "${e}".`}},ga=class extends Q{constructor(t){super(),this.error=t}name="VersionRetrievalFailure";message="Failed to retrieve remote version. If the server is behind a proxy, make sure it's configured correctly."},Rt=class extends Q{message;constructor(t){super(),this.message=t}},di=class extends Rt{name="CborNumberError"},et=class extends Rt{name="CborRangeError"},Fs=class extends Rt{name="CborInvalidMajorError"},Zs=class extends Rt{name="CborBreak";constructor(){super("Came across a break which was not intercepted by the decoder")}},ba=class extends Rt{name="CborPartialDisabled";constructor(){super("Tried to insert a Gap into a CBOR value, while partial mode is not enabled")}},va=class extends Rt{name="CborFillMissing";constructor(){super("Fill for a gap is missing, and gap has no default")}},ya=class{args=[];constructor(...t){this.args=t}fill(t){return[this,t]}hasDefault(){return this.args.length===1}get default(){return this.args[0]}},Hs=class{constructor(t=256){this.byteLength=t,this._buf=new ArrayBuffer(this.byteLength),this._view=new DataView(this._buf),this._byte=new Uint8Array(this._buf)}_chunks=[];_pos=0;_buf;_view;_byte;chunk(t){this._chunks.push([this._buf.slice(0,this._pos),t]),this._buf=new ArrayBuffer(this.byteLength),this._view=new DataView(this._buf),this._byte=new Uint8Array(this._buf),this._pos=0}get chunks(){return this._chunks}get buffer(){return this._buf.slice(0,this._pos)}claim(t){let e=this._pos;if(this._pos+=t,this._pos<=this._buf.byteLength)return e;let r=this._buf.byteLength<<1;for(;r<this._pos;)r<<=1;if(r>this._buf.byteLength){let s=this._byte;this._buf=new ArrayBuffer(r),this._view=new DataView(this._buf),this._byte=new Uint8Array(this._buf),this._byte.set(s)}return e}writeUint8(t){let e=this.claim(1);this._view.setUint8(e,t)}writeUint16(t){let e=this.claim(2);this._view.setUint16(e,t)}writeUint32(t){let e=this.claim(4);this._view.setUint32(e,t)}writeUint64(t){let e=this.claim(8);this._view.setBigUint64(e,t)}writeUint8Array(t){if(t.byteLength===0)return;let e=this.claim(t.byteLength);this._byte.set(t,e)}writeArrayBuffer(t){t.byteLength!==0&&this.writeUint8Array(new Uint8Array(t))}writePartiallyEncoded(t){for(let[e,r]of t.chunks)this.writeArrayBuffer(e),this.chunk(r);this.writeArrayBuffer(t.end)}writeFloat32(t){let e=this.claim(4);this._view.setFloat32(e,t)}writeFloat64(t){let e=this.claim(8);this._view.setFloat64(e,t)}writeMajor(t,e){let r=t<<5;e<24?this.writeUint8(r+Number(e)):e<256?(this.writeUint8(r+24),this.writeUint8(Number(e))):e<65536?(this.writeUint8(r+25),this.writeUint16(Number(e))):e<4294967296?(this.writeUint8(r+26),this.writeUint32(Number(e))):(this.writeUint8(r+27),this.writeUint64(BigInt(e)))}output(t,e){return t?new hi(this._chunks,this.buffer,e):this.buffer}},hi=class{constructor(t,e,r){this.chunks=t,this.end=e,this.replacer=r}build(t,e){let r=new Hs,s=new Map(t);for(let[n,i]of this.chunks){let o=s.has(i)||i.hasDefault();if(!e&&!o)throw new va;if(r.writeArrayBuffer(n),o){let a=s.get(i)??i.default;sr(a,{writer:r,replacer:this.replacer})}else r.chunk(i)}return r.writeArrayBuffer(this.end),r.output(!!e,this.replacer)}};function fi(t,e){return Object.fromEntries(Object.entries(t).map(([r,s])=>[r,sr(s,{...e,partial:!0})]))}var se=class{constructor(t,e){this.tag=t,this.value=e}},wa;function sr(t,e={}){let r=e.writer??new Hs,s=new Map(e.fills??[]);function n(i){let o=e.replacer?e.replacer(i):i;if(o===void 0)return r.writeUint8(247);if(o===null)return r.writeUint8(246);if(o===!0)return r.writeUint8(245);if(o===!1)return r.writeUint8(244);switch(typeof o){case"number":{if(Number.isInteger(o))if(o>=0&&o<=9007199254740992)r.writeMajor(0,o);else if(o<0&&o>=-9007199254740992)r.writeMajor(1,-(o+1));else throw new di("Number too big to be encoded");else r.writeUint8(251),r.writeFloat64(o);return}case"bigint":{if(o>=0&&o<ci)r.writeMajor(0,o);else if(o<=0&&o>=-ci)r.writeMajor(1,-(o+1n));else throw new di("BigInt too big to be encoded");return}case"string":{wa??=new TextEncoder;let a=wa.encode(o);r.writeMajor(3,a.byteLength),r.writeUint8Array(a);return}default:{if(Array.isArray(o)){r.writeMajor(4,o.length);for(let l of o)n(l);return}if(o instanceof se){r.writeMajor(6,o.tag),n(o.value);return}if(o instanceof ui){r.writeArrayBuffer(o.encoded);return}if(o instanceof ya){if(s.has(o))n(s.get(o));else{if(!e.partial)throw new ba;r.chunk(o)}return}if(o instanceof hi){let l=o.build(e.fills??[],e.partial);e.partial?r.writePartiallyEncoded(l):r.writeArrayBuffer(l);return}if(o instanceof Uint8Array||o instanceof Uint16Array||o instanceof Uint32Array||o instanceof Int8Array||o instanceof Int16Array||o instanceof Int32Array||o instanceof Float32Array||o instanceof Float64Array||o instanceof ArrayBuffer){let l=new Uint8Array(o);r.writeMajor(2,l.byteLength),r.writeUint8Array(l);return}let a=o instanceof Map?Array.from(o.entries()):Object.entries(o);r.writeMajor(5,a.length);for(let l of a.flat())n(l)}}}return n(t),r.output(!!e.partial,e.replacer)}var pi=class{_buf;_view;_byte;_pos=0;constructor(t){this._buf=new ArrayBuffer(t.byteLength),this._view=new DataView(this._buf),this._byte=new Uint8Array(this._buf),this._byte.set(new Uint8Array(t))}read(t,e){return this._pos+=t,e}readUint8(){try{return this.read(1,this._view.getUint8(this._pos))}catch(t){throw t instanceof RangeError?new et(t.message):t}}readUint16(){try{return this.read(2,this._view.getUint16(this._pos))}catch(t){throw t instanceof RangeError?new et(t.message):t}}readUint32(){try{return this.read(4,this._view.getUint32(this._pos))}catch(t){throw t instanceof RangeError?new et(t.message):t}}readUint64(){try{return this.read(8,this._view.getBigUint64(this._pos))}catch(t){throw t instanceof RangeError?new et(t.message):t}}readFloat16(){let t=this.readUint16(),e=(t&32768)>>15,r=(t&31744)>>10,s=t&1023;return r===0?(e?-1:1)*2**-14*(s/2**10):r===31?s?Number.NaN:(e?-1:1)*Number.POSITIVE_INFINITY:(e?-1:1)*2**(r-15)*(1+s/2**10)}readFloat32(){try{return this.read(4,this._view.getFloat32(this._pos))}catch(t){throw t instanceof RangeError?new et(t.message):t}}readFloat64(){try{return this.read(8,this._view.getFloat64(this._pos))}catch(t){throw t instanceof RangeError?new et(t.message):t}}readBytes(t){let e=this._byte.length-this._pos;if(e<t)throw new et(`The argument must be between 0 and ${e}`);return this.read(t,this._byte.slice(this._pos,this._pos+t))}readMajor(){let t=this.readUint8(),e=t>>5;if(e<0||e>7)throw new Fs("Received invalid major type");return[e,t&31]}readMajorLength(t){if(t<=23)return t;switch(t){case 24:return this.readUint8();case 25:return this.readUint16();case 26:return this.readUint32();case 27:{let e=this.readUint64();return e>9007199254740992?e:Number(e)}}throw new et("Expected a final length")}};function mi(t,e){let r=new Hs;for(;;){let[s,n]=t.readMajor();if(s===7&&n===31)break;if(s!==e)throw new Fs(`Expected a resource of the same major (${e}) while processing an infinite resource`);if(n===31)throw new et("Expected a finite resource while processing an infinite resource");r.writeUint8Array(t.readBytes(Number(t.readMajorLength(n))))}return r.buffer}var _a;function xa(t,e={}){let r=t instanceof pi?t:new pi(t);function s(){let[i,o]=r.readMajor();switch(i){case 0:return r.readMajorLength(o);case 1:{let a=r.readMajorLength(o);return typeof a=="bigint"?-(a+1n):-(a+1)}case 2:return o===31?mi(r,2):r.readBytes(Number(r.readMajorLength(o))).buffer;case 3:{let a=o===31?mi(r,3):r.readBytes(Number(r.readMajorLength(o)));return _a??=new TextDecoder,_a.decode(a)}case 4:{if(o===31){let c=[];for(;;)try{c.push(n())}catch(u){if(u instanceof Zs)break;throw u}return c}let a=r.readMajorLength(o),l=Array(a);for(let c=0;c<a;c++)l[c]=n();return l}case 5:{let a=[];if(o===31)for(;;){let l;try{l=n()}catch(u){if(u instanceof Zs)break;throw u}let c=n();a.push([l,c])}else{let l=r.readMajorLength(o);for(let c=0;c<l;c++){let u=n(),d=n();a[c]=[u,d]}}return e.map==="map"?new Map(a):Object.fromEntries(a)}case 6:{let a=r.readMajorLength(o),l=n();return new se(a,l)}case 7:switch(o){case 20:return!1;case 21:return!0;case 22:return null;case 23:return;case 25:return r.readFloat16();case 26:return r.readFloat32();case 27:return r.readFloat64();case 31:throw new Zs}}throw new Fs(`Unable to decode value with major tag ${i}`)}function n(){return e.replacer?e.replacer(s()):s()}return n()}function Oh(t){let e=Math.floor(t.getTime()/1e3),r=t.getTime()-e*1e3;return[e,r*1e6]}function Ph([t,e]){let r=new Date(0);return r.setUTCSeconds(Number(t)),r.setMilliseconds(Math.floor(Number(e)/1e6)),r}var gi=class{decimal;constructor(t){this.decimal=t.toString()}toString(){return this.decimal}toJSON(){return this.decimal}},bi=1,nr=bi/1e3,vi=nr/1e3,Ws=1e3*bi,Gs=60*Ws,qs=60*Gs,Ks=24*qs,yi=7*Ks,wi=new Map([["ns",vi],["\xB5s",nr],["\u03BCs",nr],["us",nr],["ms",bi],["s",Ws],["m",Gs],["h",qs],["d",Ks],["w",yi]]),Nh=Array.from(wi).reduce((t,[e,r])=>(t.set(r,e),t),new Map),Rh=new RegExp(`^(\\d+)(${Array.from(wi.keys()).join("|")})`),_i=class De{_milliseconds;constructor(e){e instanceof De?this._milliseconds=e._milliseconds:typeof e=="string"?this._milliseconds=De.parseString(e):this._milliseconds=e}static fromCompact([e,r]){e=e??0,r=r??0;let s=e*1e3+r/1e6;return new De(s)}toCompact(){let e=Math.floor(this._milliseconds/1e3),r=Math.floor((this._milliseconds-e*1e3)*1e6);return r>0?[e,r]:e>0?[e]:[]}toString(){let e=this._milliseconds,r="";function s(n){let i=Math.floor(e/n);return i>0&&(e=e%n),i}for(let[n,i]of Array.from(Nh).reverse()){let o=s(n);o>0&&(r+=`${o}${i}`)}return r}toJSON(){return this.toString()}static parseString(e){let r=0,s=e;for(;s!=="";){let n=s.match(Rh);if(n){let i=Number.parseInt(n[1]),o=wi.get(n[2]);if(o===void 0)throw new Q(`Invalid duration unit: ${n[2]}`);r+=i*o,s=s.slice(n[0].length);continue}throw new Q("Could not match a next duration part")}return r}static nanoseconds(e){return new De(Math.floor(e*vi))}static microseconds(e){return new De(Math.floor(e*nr))}static milliseconds(e){return new De(e)}static seconds(e){return new De(e*Ws)}static minutes(e){return new De(e*Gs)}static hours(e){return new De(e*qs)}static days(e){return new De(e*Ks)}static weeks(e){return new De(e*yi)}get microseconds(){return Math.floor(this._milliseconds/nr)}get nanoseconds(){return Math.floor(this._milliseconds/vi)}get milliseconds(){return Math.floor(this._milliseconds)}get seconds(){return Math.floor(this._milliseconds/Ws)}get minutes(){return Math.floor(this._milliseconds/Gs)}get hours(){return Math.floor(this._milliseconds/qs)}get days(){return Math.floor(this._milliseconds/Ks)}get weeks(){return Math.floor(this._milliseconds/yi)}},Lt=class{};function ka(t){return t instanceof gi?Number.parseFloat(t.decimal):t}var Sa=class sn extends Lt{point;constructor(e){super(),e instanceof sn?this.point=e.clone().point:this.point=[ka(e[0]),ka(e[1])]}toJSON(){return{type:"Point",coordinates:this.coordinates}}get coordinates(){return this.point}is(e){return e instanceof sn?this.point[0]===e.point[0]&&this.point[1]===e.point[1]:!1}clone(){return new sn([...this.point])}},$a=class nn extends Lt{line;constructor(e){super(),this.line=e instanceof nn?e.clone().line:e}toJSON(){return{type:"LineString",coordinates:this.coordinates}}get coordinates(){return this.line.map(e=>e.coordinates)}close(){this.line[0].is(this.line.at(-1))||this.line.push(this.line[0])}is(e){if(!(e instanceof nn)||this.line.length!==e.line.length)return!1;for(let r=0;r<this.line.length;r++)if(!this.line[r].is(e.line[r]))return!1;return!0}clone(){return new nn(this.line.map(e=>e.clone()))}},Ca=class on extends Lt{polygon;constructor(e){super(),this.polygon=e instanceof on?e.clone().polygon:e.map(r=>{let s=r.clone();return s.close(),s})}toJSON(){return{type:"Polygon",coordinates:this.coordinates}}get coordinates(){return this.polygon.map(e=>e.coordinates)}is(e){if(!(e instanceof on)||this.polygon.length!==e.polygon.length)return!1;for(let r=0;r<this.polygon.length;r++)if(!this.polygon[r].is(e.polygon[r]))return!1;return!0}clone(){return new on(this.polygon.map(e=>e.clone()))}},Aa=class an extends Lt{points;constructor(e){super(),this.points=e instanceof an?e.points:e}toJSON(){return{type:"MultiPoint",coordinates:this.coordinates}}get coordinates(){return this.points.map(e=>e.coordinates)}is(e){if(!(e instanceof an)||this.points.length!==e.points.length)return!1;for(let r=0;r<this.points.length;r++)if(!this.points[r].is(e.points[r]))return!1;return!0}clone(){return new an(this.points.map(e=>e.clone()))}},Ea=class ln extends Lt{lines;constructor(e){super(),this.lines=e instanceof ln?e.lines:e}toJSON(){return{type:"MultiLineString",coordinates:this.coordinates}}get coordinates(){return this.lines.map(e=>e.coordinates)}is(e){if(!(e instanceof ln)||this.lines.length!==e.lines.length)return!1;for(let r=0;r<this.lines.length;r++)if(!this.lines[r].is(e.lines[r]))return!1;return!0}clone(){return new ln(this.lines.map(e=>e.clone()))}},Ta=class cn extends Lt{polygons;constructor(e){super(),this.polygons=e instanceof cn?e.polygons:e}toJSON(){return{type:"MultiPolygon",coordinates:this.coordinates}}get coordinates(){return this.polygons.map(e=>e.coordinates)}is(e){if(!(e instanceof cn)||this.polygons.length!==e.polygons.length)return!1;for(let r=0;r<this.polygons.length;r++)if(!this.polygons[r].is(e.polygons[r]))return!1;return!0}clone(){return new cn(this.polygons.map(e=>e.clone()))}},Oa=class un extends Lt{collection;constructor(e){super(),this.collection=e instanceof un?e.collection:e}toJSON(){return{type:"GeometryCollection",geometries:this.geometries}}get geometries(){return this.collection.map(e=>e.toJSON())}is(e){if(!(e instanceof un)||this.collection.length!==e.collection.length)return!1;for(let r=0;r<this.collection.length;r++)if(!this.collection[r].is(e.collection[r]))return!1;return!0}clone(){return new un(this.collection.map(e=>e.clone()))}},Lh=9223372036854775807n,Pa=class{tb;id;constructor(t,e){if(typeof t!="string")throw new Q("TB part is not valid");if(!zh(e))throw new Q("ID part is not valid");this.tb=t,this.id=e}toJSON(){return this.toString()}toString(){let t=Na(this.tb),e=typeof this.id=="string"?Na(this.id):typeof this.id=="bigint"||typeof this.id=="number"?Dh(this.id):JSON.stringify(this.id);return`${t}:${e}`}},Ih=class{rid;constructor(t){if(typeof t!="string")throw new Q("String Record ID must be a string");this.rid=t}toJSON(){return this.rid}toString(){return this.rid}};function Dh(t){return t<=Lh?t.toString():`\u27E8${t}\u27E9`}function Na(t){if(Mh(t))return`\u27E8${t}\u27E9`;let e,r,s;for(r=0,s=t.length;r<s;r++)if(e=t.charCodeAt(r),!(e>47&&e<58)&&!(e>64&&e<91)&&!(e>96&&e<123)&&e!==95)return`\u27E8${t.replaceAll("\u27E9","\u27E9")}\u27E9`;return t}function Mh(t){let e=Number.parseInt(t);return!Number.isNaN(e)&&e.toString()===t}function zh(t){switch(typeof t){case"string":case"number":case"bigint":return!0;case"object":return Array.isArray(t)||t!==null;default:return!1}}var Ra=class{tb;constructor(t){if(typeof t!="string")throw new Q("Table must be a string");this.tb=t}toJSON(){return this.tb}toString(){return this.tb}},Ys="0123456789abcdef",ir=class es{constructor(e){this.bytes=e}static ofInner(e){if(e.length!==16)throw new TypeError("not 128-bit length");return new es(e)}static fromFieldsV7(e,r,s,n){if(!Number.isInteger(e)||!Number.isInteger(r)||!Number.isInteger(s)||!Number.isInteger(n)||e<0||r<0||s<0||n<0||e>0xffffffffffff||r>4095||s>1073741823||n>4294967295)throw new RangeError("invalid field value");let i=new Uint8Array(16);return i[0]=e/2**40,i[1]=e/2**32,i[2]=e/2**24,i[3]=e/2**16,i[4]=e/2**8,i[5]=e,i[6]=112|r>>>8,i[7]=r,i[8]=128|s>>>24,i[9]=s>>>16,i[10]=s>>>8,i[11]=s,i[12]=n>>>24,i[13]=n>>>16,i[14]=n>>>8,i[15]=n,new es(i)}static parse(e){var r,s,n,i;let o;switch(e.length){case 32:o=(r=/^[0-9a-f]{32}$/i.exec(e))===null||r===void 0?void 0:r[0];break;case 36:o=(s=/^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(e))===null||s===void 0?void 0:s.slice(1,6).join("");break;case 38:o=(n=/^\{([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})\}$/i.exec(e))===null||n===void 0?void 0:n.slice(1,6).join("");break;case 45:o=(i=/^urn:uuid:([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(e))===null||i===void 0?void 0:i.slice(1,6).join("");break}if(o){let a=new Uint8Array(16);for(let l=0;l<16;l+=4){let c=parseInt(o.substring(2*l,2*l+8),16);a[l+0]=c>>>24,a[l+1]=c>>>16,a[l+2]=c>>>8,a[l+3]=c}return new es(a)}else throw new SyntaxError("could not parse UUID string")}toString(){let e="";for(let r=0;r<this.bytes.length;r++)e+=Ys.charAt(this.bytes[r]>>>4),e+=Ys.charAt(this.bytes[r]&15),(r===3||r===5||r===7||r===9)&&(e+="-");return e}toHex(){let e="";for(let r=0;r<this.bytes.length;r++)e+=Ys.charAt(this.bytes[r]>>>4),e+=Ys.charAt(this.bytes[r]&15);return e}toJSON(){return this.toString()}getVariant(){let e=this.bytes[8]>>>4;if(e<0)throw new Error("unreachable");if(e<=7)return this.bytes.every(r=>r===0)?"NIL":"VAR_0";if(e<=11)return"VAR_10";if(e<=13)return"VAR_110";if(e<=15)return this.bytes.every(r=>r===255)?"MAX":"VAR_RESERVED";throw new Error("unreachable")}getVersion(){return this.getVariant()==="VAR_10"?this.bytes[6]>>>4:void 0}clone(){return new es(this.bytes.slice(0))}equals(e){return this.compareTo(e)===0}compareTo(e){for(let r=0;r<16;r++){let s=this.bytes[r]-e.bytes[r];if(s!==0)return Math.sign(s)}return 0}},La=class{constructor(t){this.timestamp=0,this.counter=0,this.random=t??jh()}generate(){return this.generateOrResetCore(Date.now(),1e4)}generateOrAbort(){return this.generateOrAbortCore(Date.now(),1e4)}generateOrResetCore(t,e){let r=this.generateOrAbortCore(t,e);return r===void 0&&(this.timestamp=0,r=this.generateOrAbortCore(t,e)),r}generateOrAbortCore(t,e){if(!Number.isInteger(t)||t<1||t>0xffffffffffff)throw new RangeError("`unixTsMs` must be a 48-bit positive integer");if(e<0||e>0xffffffffffff)throw new RangeError("`rollbackAllowance` out of reasonable range");if(t>this.timestamp)this.timestamp=t,this.resetCounter();else if(t+e>=this.timestamp)this.counter++,this.counter>4398046511103&&(this.timestamp++,this.resetCounter());else return;return ir.fromFieldsV7(this.timestamp,Math.trunc(this.counter/2**30),this.counter&2**30-1,this.random.nextUint32())}resetCounter(){this.counter=this.random.nextUint32()*1024+(this.random.nextUint32()&1023)}generateV4(){let t=new Uint8Array(Uint32Array.of(this.random.nextUint32(),this.random.nextUint32(),this.random.nextUint32(),this.random.nextUint32()).buffer);return t[6]=64|t[6]>>>4,t[8]=128|t[8]>>>2,ir.ofInner(t)}},jh=()=>{if(typeof crypto<"u"&&typeof crypto.getRandomValues<"u")return new Uh;if(typeof UUIDV7_DENY_WEAK_RNG<"u"&&UUIDV7_DENY_WEAK_RNG)throw new Error("no cryptographically strong RNG available");return{nextUint32:()=>Math.trunc(Math.random()*65536)*65536+Math.trunc(Math.random()*65536)}},Uh=class{constructor(){this.buffer=new Uint32Array(8),this.cursor=65535}nextUint32(){return this.cursor>=this.buffer.length&&(crypto.getRandomValues(this.buffer),this.cursor=0),this.buffer[this.cursor++]}},Js,Vh=()=>(Js||(Js=new La)).generate(),Bh=()=>(Js||(Js=new La)).generateV4(),xi=class dn{inner;constructor(e){e instanceof ArrayBuffer?this.inner=ir.ofInner(new Uint8Array(e)):e instanceof Uint8Array?this.inner=ir.ofInner(e):e instanceof dn?this.inner=e.inner:e instanceof ir?this.inner=e:this.inner=ir.parse(e)}toString(){return this.inner.toString()}toJSON(){return this.inner.toString()}toUint8Array(){return this.inner.bytes}toBuffer(){return this.inner.bytes.buffer}static v4(){return new dn(Bh())}static v7(){return new dn(Vh())}},Fh=0,Ia=37,Da=6,Ma=7,ki=8,Zh=9,za=10,ja=12,Hh=13,Ua=14,Va=88,Ba=89,Fa=90,Za=91,Ha=92,Wa=93,Ga=94,Gr={encode(t){return t instanceof Date?new se(ja,Oh(t)):t===void 0?new se(Da,null):t instanceof xi?new se(Ia,t.toBuffer()):t instanceof gi?new se(za,t.toString()):t instanceof _i?new se(Ua,t.toCompact()):t instanceof Pa?new se(ki,[t.tb,t.id]):t instanceof Ih?new se(ki,t.rid):t instanceof Ra?new se(Ma,t.tb):t instanceof Sa?new se(Va,t.point):t instanceof $a?new se(Ba,t.line):t instanceof Ca?new se(Fa,t.polygon):t instanceof Aa?new se(Za,t.points):t instanceof Ea?new se(Ha,t.lines):t instanceof Ta?new se(Wa,t.polygons):t instanceof Oa?new se(Ga,t.collection):t},decode(t){if(!(t instanceof se))return t;switch(t.tag){case Fh:return new Date(t.value);case Ia:case Zh:return new xi(t.value);case ja:return Ph(t.value);case Da:return;case za:return new gi(t.value);case Hh:return new _i(t.value);case Ua:return _i.fromCompact(t.value);case Ma:return new Ra(t.value);case ki:return new Pa(t.value[0],t.value[1]);case Va:return new Sa(t.value);case Ba:return new $a(t.value);case Fa:return new Ca(t.value);case Za:return new Aa(t.value);case Ha:return new Ea(t.value);case Wa:return new Ta(t.value);case Ga:return new Oa(t.value)}}};Object.freeze(Gr);function Wh(t){return sr(t,{replacer:Gr.encode})}function Gh(t){return xa(t,{replacer:Gr.decode})}var qh=class{query;bindings;constructor(t,e,r){this.query=new ui(sr(t)),this.bindings=fi(e??{},{replacer:Gr.encode})}build(t){return sr([this.query,this.bindings])}};function qa(t){let e={},r=(s,n,i)=>{if(s in t)e[n]=`${t[s]}`,delete e[s];else if(i!==!0)throw new Q(`Key ${s} is missing from the authentication parameters`)};return"scope"in t?(e={...t},r("scope","sc"),r("namespace","ns"),r("database","db")):"variables"in t?(e={...t.variables},r("access","ac"),r("namespace","ns"),r("database","db")):(r("access","ac",!0),r("database","db",!0),r("namespace","ns",!("database"in t)),r("username","user"),r("password","pass")),e}var Kh=["CREATE","UPDATE","DELETE"];function Yh(t){return!(typeof t!="object"||t===null||!("id"in t&&"action"in t&&"result"in t)||!(t.id instanceof xi)||!Kh.includes(t.action)||typeof t.result!="object"||t.result===null)}var Jh=5e3,Ka="1.4.2",Ya="3.0.0";function Xh(t,e=Ka,r=Ya){if(!Qh(t,e,r))throw new Th(t,`>= ${e} < ${r}`);return!0}function Qh(t,e=Ka,r=Ya){return e.localeCompare(t,void 0,{numeric:!0})<=0&&r.localeCompare(t,void 0,{numeric:!0})===1}async function Ja(t,e){let r={"ws:":"http:","wss:":"https:","http:":"http:","https:":"https:"}[t.protocol];if(r){let s=t.pathname.slice(0,-4);t=new URL(t),t.pathname=`${s}/version`,t.protocol=r;let n=new AbortController,i=setTimeout(()=>n.abort(),e??Jh),o="surrealdb-";return await fetch(t,{signal:n.signal}).then(a=>a.text()).then(a=>a.slice(o.length)).catch(a=>{throw new ga(a)}).finally(()=>{clearTimeout(i)})}throw new ga}var Si=0;function Xa(){return Si=(Si+1)%Number.MAX_SAFE_INTEGER,Si.toString()}var ef=(t=>(t.Disconnected="disconnected",t.Connecting="connecting",t.Connected="connected",t.Error="error",t))(ef||{}),tf=class{emitter;encodeCbor;decodeCbor;constructor({emitter:t,encodeCbor:e,decodeCbor:r}){this.emitter=t,this.encodeCbor=e,this.decodeCbor=r}},Qa=class{context;ready;status="disconnected";connection={url:void 0,namespace:void 0,database:void 0,token:void 0};constructor(t){this.context=t}get emitter(){return this.context.emitter}get encodeCbor(){return this.context.encodeCbor}get decodeCbor(){return this.context.decodeCbor}};function el(t,e){if("scope"in t||"access"in t&&"variables"in t&&t.variables){if(!t.namespace){if(!e?.namespace)throw new Ah;t.namespace=e.namespace}if(!t.database){if(!e?.database)throw new Eh;t.database=e.database}}return t}var tl=class extends Qa{connection={url:void 0,namespace:void 0,database:void 0,token:void 0,variables:{}};setStatus(t,...e){this.status=t,this.emitter.emit(t,e)}version(t,e){return Ja(t,e)}connect(t){return this.setStatus("connecting"),this.connection.url=t,this.setStatus("connected"),this.ready=new Promise(e=>e()),this.ready}disconnect(){return this.connection={url:void 0,namespace:void 0,database:void 0,token:void 0,variables:{}},this.ready=void 0,this.setStatus("disconnected"),new Promise(t=>t())}async rpc(t){if(await this.ready,!this.connection.url)throw new pa;if(t.method==="use"){let[i,o]=t.params;return i===null&&(this.connection.namespace=void 0),o===null&&(this.connection.database=void 0),i&&(this.connection.namespace=i),o&&(this.connection.database=o),{result:!0}}if(t.method==="let"){let[i,o]=t.params;return this.connection.variables[i]=o,{result:!0}}if(t.method==="unset"){let[i]=t.params;return delete this.connection.variables[i],{result:!0}}if(t.method==="query"&&(t.params=[t.params?.[0],{...this.connection.variables,...t.params?.[1]??{}}]),!this.connection.namespace||!this.connection.database)throw new $h;let e=Xa(),r=await fetch(`${this.connection.url}`,{method:"POST",headers:{"Content-Type":"application/cbor",Accept:"application/cbor","Surreal-NS":this.connection.namespace,"Surreal-DB":this.connection.database,...this.connection.token?{Authorization:`Bearer ${this.connection.token}`}:{}},body:this.encodeCbor({id:e,...t})}),s=await r.arrayBuffer();if(r.status===200){let i=this.decodeCbor(s);if("result"in i)switch(t.method){case"signin":case"signup":{this.connection.token=i.result;break}case"authenticate":{let[o]=t.params;this.connection.token=o;break}case"invalidate":{this.connection.token=void 0;break}}return this.emitter.emit(`rpc-${e}`,[i]),i}let n=new TextDecoder("utf-8");throw new Ch(n.decode(s),r.status,r.statusText,s)}get connected(){return!!this.connection.url}};function rf(){if(typeof WebSocket<"u")return WebSocket;if(typeof global.WebSocket<"u")return global.WebSocket;if(typeof window.WebSocket<"u")return window.WebSocket;if(typeof self.WebSocket<"u")return self.WebSocket;throw new Error("`WebSocket` is not supported in this environment")}var sf=rf(),rl=class extends Qa{pinger;socket;constructor(t){super(t),this.emitter.subscribe("disconnected",()=>this.pinger?.stop())}setStatus(t,...e){this.status=t,this.emitter.emit(t,e)}async requireStatus(t){return this.status!==t&&await this.emitter.subscribeOnce(t),!0}version(t,e){return Ja(t,e)}async connect(t){this.connection.url=t,this.setStatus("connecting");let e=new sf(t.toString(),"cbor"),r=new Promise((s,n)=>{e.addEventListener("open",()=>{this.setStatus("connected"),s()}),e.addEventListener("error",i=>{let o=new kh("error"in i?i.error:"An unexpected error occurred");this.setStatus("error",o),n(o)}),e.addEventListener("close",()=>{this.setStatus("disconnected")}),e.addEventListener("message",async({data:i})=>{try{let o=this.decodeCbor(i instanceof Blob?await i.arrayBuffer():i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength));if(typeof o=="object"&&o!=null&&Object.getPrototypeOf(o)===Object.prototype)this.handleRpcResponse(o);else throw new fa(o)}catch(o){e.dispatchEvent(new CustomEvent("error",{detail:o}))}})});return this.ready=r,await r.then(()=>{this.socket=e,this.pinger?.stop(),this.pinger=new nf(3e4),this.pinger.start(()=>this.rpc({method:"ping"}))})}async disconnect(){this.connection={url:void 0,namespace:void 0,database:void 0,token:void 0},await this.ready?.catch(()=>{}),this.socket?.close(),this.ready=void 0,this.socket=void 0,await Promise.any([this.requireStatus("disconnected"),this.requireStatus("error")])}async rpc(t){if(await this.ready,!this.socket)throw new pa;let e=Xa(),r=this.emitter.subscribeOnce(`rpc-${e}`);this.socket.send(this.encodeCbor({id:e,...t}));let[s]=await r;if(s instanceof ha)throw s;if("result"in s)switch(t.method){case"use":{let[n,i]=t.params;n===null&&(this.connection.namespace=void 0),i===null&&(this.connection.database=void 0),n&&(this.connection.namespace=n),i&&(this.connection.database=i);break}case"signin":case"signup":{this.connection.token=s.result;break}case"authenticate":{let[n]=t.params;this.connection.token=n;break}case"invalidate":{this.connection.token=void 0;break}}return s}handleRpcResponse({id:t,...e}){if(t)this.emitter.emit(`rpc-${t}`,[e]);else if(e.error)this.setStatus("error",new K(e.error));else if(Yh(e.result)){let{id:r,action:s,result:n}=e.result;this.emitter.emit(`live-${r}`,[s,n],!0)}else this.setStatus("error",new fa({id:t,...e}))}get connected(){return!!this.socket}},nf=class{pinger;interval;constructor(t=3e4){this.interval=t}start(t){this.pinger=setInterval(t,this.interval)}stop(){clearInterval(this.pinger)}},of=class{connection;ready;emitter;engines={ws:rl,wss:rl,http:tl,https:tl};constructor({engines:t}={}){this.emitter=new wh,this.emitter.subscribe("disconnected",()=>this.clean()),this.emitter.subscribe("error",()=>this.close()),t&&(this.engines={...this.engines,...t})}async connect(t,e={}){t=new URL(t),t.pathname.endsWith("/rpc")||(t.pathname.endsWith("/")||(t.pathname+="/"),t.pathname+="rpc");let r=t.protocol.slice(0,-1),s=this.engines[r];if(!s)throw new Sh(r);let{prepare:n,auth:i,namespace:o,database:a}=e;await this.close();let l=new tf({emitter:this.emitter,encodeCbor:Wh,decodeCbor:Gh}),c=new s(l);if(e.versionCheck!==!1){let u=await c.version(t,e.versionCheckTimeout);Xh(u)}return this.connection=c,this.ready=new Promise((u,d)=>c.connect(t).then(async()=>{(o||a)&&await this.use({namespace:o,database:a}),typeof i=="string"?await this.authenticate(i):i&&await this.signin(i),await n?.(this),u()}).catch(d)),await this.ready,!0}async close(){return this.clean(),await this.connection?.disconnect(),!0}clean(){let t=this.emitter.scanListeners(r=>r.startsWith("rpc-"));t.map(r=>this.emitter.emit(r,[new ha]));let e=this.emitter.scanListeners(r=>r.startsWith("live-"));e.map(r=>this.emitter.emit(r,["CLOSE","disconnected"])),this.emitter.reset({collectable:!0,listeners:[...t,...e]})}get status(){return this.connection?.status??"disconnected"}async ping(){let{error:t}=await this.rpc("ping");if(t)throw new K(t.message);return!0}async use({namespace:t,database:e}){if(!this.connection)throw new Nt;if(t===null&&e!==null)throw new Q("Cannot unset namespace without unsetting database");let{error:r}=await this.rpc("use",[t,e]);if(r)throw new K(r.message);return!0}async info(){await this.ready;let t=await this.rpc("info");if(t.error)throw new K(t.error.message);return t.result??void 0}async signup(t){if(!this.connection)throw new Nt;let e=el(t,this.connection.connection),r=qa(e),s=await this.rpc("signup",[r]);if(s.error)throw new K(s.error.message);if(!s.result)throw new ma;return s.result}async signin(t){if(!this.connection)throw new Nt;let e=el(t,this.connection.connection),r=qa(e),s=await this.rpc("signin",[r]);if(s.error)throw new K(s.error.message);if(!s.result)throw new ma;return s.result}async authenticate(t){let e=await this.rpc("authenticate",[t]);if(e.error)throw new K(e.error.message);return!0}async invalidate(){let t=await this.rpc("invalidate");if(t.error)throw new K(t.error.message);return!0}async let(t,e){let r=await this.rpc("let",[t,e]);if(r.error)throw new K(r.error.message);return!0}async unset(t){let e=await this.rpc("unset",[t]);if(e.error)throw new K(e.error.message);return!0}async live(t,e,r){await this.ready;let s=await this.rpc("live",[t,r]);if(s.error)throw new K(s.error.message);return e&&this.subscribeLive(s.result,e),s.result}async subscribeLive(t,e){if(await this.ready,!this.connection)throw new Nt;this.connection.emitter.subscribe(`live-${t}`,e,!0)}async unSubscribeLive(t,e){if(await this.ready,!this.connection)throw new Nt;this.connection.emitter.unSubscribe(`live-${t}`,e)}async kill(t){if(await this.ready,!this.connection)throw new Nt;if(Array.isArray(t)){await Promise.all(t.map(r=>this.rpc("kill",[r])));let e=t.map(r=>`live-${r}`);e.map(r=>this.emitter.emit(r,["CLOSE","killed"])),this.connection.emitter.reset({collectable:e,listeners:e})}else await this.rpc("kill",[t]),this.emitter.emit(`live-${t}`,["CLOSE","killed"]),this.connection.emitter.reset({collectable:`live-${t}`,listeners:`live-${t}`})}async query(...t){return(await this.query_raw(...t)).map(({status:e,result:r})=>{if(e==="ERR")throw new K(r);return r})}async query_raw(...[t,e]){let r=t instanceof qh?[t.query,fi(t.bindings,{fills:e,replacer:Gr.encode})]:[t,e];await this.ready;let s=await this.rpc("query",r);if(s.error)throw new K(s.error.message);return s.result}async select(t){await this.ready;let e=await this.rpc("select",[t]);if(e.error)throw new K(e.error.message);return e.result}async create(t,e){await this.ready;let r=await this.rpc("create",[t,e]);if(r.error)throw new K(r.error.message);return r.result}async insert(t,e){await this.ready;let r=await this.rpc("insert",[t,e]);if(r.error)throw new K(r.error.message);return r.result}async update(t,e){await this.ready;let r=await this.rpc("update",[t,e]);if(r.error)throw new K(r.error.message);return r.result}async upsert(t,e){await this.ready;let r=await this.rpc("upsert",[t,e]);if(r.error)throw new K(r.error.message);return r.result}async merge(t,e){await this.ready;let r=await this.rpc("merge",[t,e]);if(r.error)throw new K(r.error.message);return r.result}async patch(t,e,r){await this.ready;let s=await this.rpc("patch",[t,e,r]);if(s.error)throw new K(s.error.message);return s.result}async delete(t){await this.ready;let e=await this.rpc("delete",[t]);if(e.error)throw new K(e.error.message);return e.result}async version(){await this.ready;let t=await this.rpc("version");if(t.error)throw new K(t.error.message);return t.result}async run(t,e,r){await this.ready;let[s,n]=Array.isArray(e)?[void 0,e]:[e,r],i=await this.rpc("run",[t,s,n]);if(i.error)throw new K(i.error.message);return i.result}async relate(t,e,r,s){await this.ready;let n=await this.rpc("relate",[t,e,r,s]);if(n.error)throw new K(n.error.message);return n.result}rpc(t,e){if(!this.connection)throw new Nt;return this.connection.rpc({method:t,params:e})}};/*! Bundled license information:

  uuidv7/dist/index.js:
    (**
     * uuidv7: A JavaScript implementation of UUID version 7
     *
     * @license Apache-2.0
     * @copyright 2021-2024 LiosK
     * @packageDocumentation
     *)
  */const or=t=>{};W(void 0,{equals:!1});const sl=t=>t.pop().pop(),$i=t=>{const e=[t.name,t.message].filter(r=>r).join("::");console.warn(e,t)},af=async(t,e=10)=>{for(;!t();)await new Promise(r=>setTimeout(r,e))};function qr(t){if(t instanceof te.ZodEffects)return t.innerType()instanceof te.ZodEffects?getDefaults(t.innerType()):getDefaults(te.ZodObject.create(t.innerType().shape));function e(r){if(r instanceof te.ZodDefault)return r._def.defaultValue();if(r instanceof te.ZodArray)return[];if(r instanceof te.ZodString)return"";if(r instanceof te.ZodObject)return getDefaults(r);if("innerType"in r._def)return e(r._def.innerType)}return Object.fromEntries(Object.entries(t.shape).map(([r,s])=>[r,e(s)]))}const lf=te.object({isConnected:te.boolean().default(!1)});class nl{#e;#t;#r;#s;#n;state;constructor(e,r){this.#e=new of,this.#t=new URL(`${e.datapoint}/rpc`).toString(),this.#r=e.namespace,this.#s=e.database;const[s,n]=r(qr(lf));this.#n=n,this.state=s}async connect(){try{console.info("Connecting Surrealdb..."),await this.#e.connect(this.#t,{namespace:this.#r,database:this.#s})}catch(e){throw $i(e),e}return this.#n(e=>({...e,isConnected:!0})),console.info(`DbService connected: ${this.#s}@${this.#r}:${this.#t}`),console.log(this.#e),this}async disconnect(){this.#e.status==="connected"&&await this.#e.close(),this.#n(e=>({...e,isConnected:!1}))}async getDb(){return await af(()=>this.state().isConnected&&this.#e.status==="connected"),this.#e}async getAccountDetails(){try{const e=await this.#e.query("SELECT email FROM account;");return sl(e)}catch(e){throw e}}async setAccountDetails(e){try{await this.#e.merge("account",e)}catch(r){throw r}}async getProfileDetails(){try{const e=await this.#e.query("SELECT firstName, lastName, address, phone  FROM profile;");return sl(e)}catch(e){throw e}}async setProfileDetails(e){try{await this.#e.merge("profile",e)}catch(r){throw r}}}const cf=new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u),uf=new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/),df=new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u),hf=new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?!.* ).{3,16}$/),il=te.string().trim().email("Must be a valid email address"),ol=te.string().trim().regex(cf,"Must be a valid name"),al=te.string().trim().regex(hf,"Must be 3-16 charcters and contain one digit and a special char"),ff=te.string().trim().regex(df,"Must be a valid street address").or(te.literal("")),pf=te.preprocess(t=>t.split(" ").join(""),te.string().trim().regex(uf,"Must be a valid phone number").or(te.literal(""))),Xs=(t,e,r)=>{const s=t.safeParse(e);if(s.success)return r({}),s.data;r(s.error.flatten())},ll=(t,e)=>{const r=t.safeParse(e);r.success||console.warn("Incompatible data loaded:",r.error.flatten())},mf=te.object({isAuthenticated:te.boolean().default(!1)}),Ci=te.object({email:il.default(""),pass:al.default("")});class cl{#e;#t;#r;#s;state;constructor(e,r,s){this.#e=e,this.#t=r,this.#r="";const[n,i]=s(qr(mf));this.#s=i,this.state=n}#n(){localStorage.accessToken=this.#r}async authenticate(){if(localStorage.accessToken){const e=await this.#e.getDb();this.#r=localStorage.accessToken;try{console.info("Authenticating token from localStorage..."),await e.authenticate(this.#r)}catch(r){return $i(r),this.signout()}this.#s(r=>({...r,isAuthenticated:this.#i}))}}async signup(e){const r=await this.#e.getDb();try{this.#r=await r.signup({namespace:this.#t.namespace,database:this.#t.database,scope:this.#t.scope,email:e.email,pass:e.pass})}catch(s){throw s}this.#n(),this.#s(s=>({...s,isAuthenticated:this.#i}))}async signin(e){const r=await this.#e.getDb();try{this.#r=await r.signin({namespace:this.#t.namespace,database:this.#t.database,scope:this.#t.scope,email:e.email,pass:e.pass})}catch(s){throw s}this.#n(),this.#s(s=>({...s,isAuthenticated:this.#i}))}async signout(){this.#r="",this.#n(),await(await this.#e.getDb()).invalidate(),this.#s(r=>({...r,isAuthenticated:this.#i}))}get#i(){return!!this.#r&&this.#e.state().isConnected}}const Ai=te.object({email:il.default(""),pass:al.default("")}),gf=Ai.omit({pass:!0});class bf{#e;#t;state;constructor(e,r){this.#e=e;const[s,n]=r(qr(Ai));this.#t=n,this.state=s}async loadData(){const e=await this.#e.getAccountDetails();ll(gf,e),this.#t(e)}async saveData(e){await this.#e.setAccountDetails(e),this.#t(e)}}const Ei=te.object({firstName:ol.default(""),lastName:ol.default(""),address:ff.default(""),phone:pf.default("")}),vf=Ei;class yf{#e;#t;state;constructor(e,r){this.#e=e;const[s,n]=r(qr(Ei));this.#t=n,this.state=s}async loadData(){const e=await this.#e.getProfileDetails();ll(vf,e),this.#t(e)}async saveData(e){await this.#e.setProfileDetails(e),this.#t(e)}}var wf=q("<div class=loading><sl-spinner style=font-size:50px;--track-width:10px;></sl-spinner><div>",!0,!1);const Kr=t=>(()=>{var e=wf(),r=e.firstChild,s=r.nextSibling;return r._$owner=J(),O(s,()=>t.children),e})(),ul=hr(),_f=t=>{const e=new nl({datapoint:t.datapoint,namespace:t.namespace,database:t.database},W),r=new cl(e,{namespace:t.namespace,database:t.database,scope:t.scope},W),s=new bf(e,W),n=new yf(e,W),i={auth:r,account:s,profile:n};return Oe(()=>!e.state().isConnected,async()=>{await e.connect()}),S(pr,{get fallback(){return S(Kr,{})},get children(){return[ue(()=>or()),S(ul.Provider,{value:i,get children(){return t.children}})]}})},ar=()=>Dt(ul),Ti=Symbol("store-raw"),lr=Symbol("store-node"),lt=Symbol("store-has"),dl=Symbol("store-self");function hl(t){let e=t[Me];if(!e&&(Object.defineProperty(t,Me,{value:e=new Proxy(t,Sf)}),!Array.isArray(t))){const r=Object.keys(t),s=Object.getOwnPropertyDescriptors(t);for(let n=0,i=r.length;n<i;n++){const o=r[n];s[o].get&&Object.defineProperty(t,o,{enumerable:s[o].enumerable,get:s[o].get.bind(e)})}}return e}function Qs(t){let e;return t!=null&&typeof t=="object"&&(t[Me]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function Yr(t,e=new Set){let r,s,n,i;if(r=t!=null&&t[Ti])return r;if(!Qs(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let o=0,a=t.length;o<a;o++)n=t[o],(s=Yr(n,e))!==n&&(t[o]=s)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const o=Object.keys(t),a=Object.getOwnPropertyDescriptors(t);for(let l=0,c=o.length;l<c;l++)i=o[l],!a[i].get&&(n=t[i],(s=Yr(n,e))!==n&&(t[i]=s))}return t}function en(t,e){let r=t[e];return r||Object.defineProperty(t,e,{value:r=Object.create(null)}),r}function Jr(t,e,r){if(t[e])return t[e];const[s,n]=W(r,{equals:!1,internal:!0});return s.$=n,t[e]=s}function xf(t,e){const r=Reflect.getOwnPropertyDescriptor(t,e);return!r||r.get||!r.configurable||e===Me||e===lr||(delete r.value,delete r.writable,r.get=()=>t[Me][e]),r}function fl(t){gn()&&Jr(en(t,lr),dl)()}function kf(t){return fl(t),Reflect.ownKeys(t)}const Sf={get(t,e,r){if(e===Ti)return t;if(e===Me)return r;if(e===fn)return fl(t),r;const s=en(t,lr),n=s[e];let i=n?n():t[e];if(e===lr||e===lt||e==="__proto__")return i;if(!n){const o=Object.getOwnPropertyDescriptor(t,e);gn()&&(typeof i!="function"||t.hasOwnProperty(e))&&!(o&&o.get)&&(i=Jr(s,e,i)())}return Qs(i)?hl(i):i},has(t,e){return e===Ti||e===Me||e===fn||e===lr||e===lt||e==="__proto__"?!0:(gn()&&Jr(en(t,lt),e)(),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:kf,getOwnPropertyDescriptor:xf};function tn(t,e,r,s=!1){if(!s&&t[e]===r)return;const n=t[e],i=t.length;r===void 0?(delete t[e],t[lt]&&t[lt][e]&&n!==void 0&&t[lt][e].$()):(t[e]=r,t[lt]&&t[lt][e]&&n===void 0&&t[lt][e].$());let o=en(t,lr),a;if((a=Jr(o,e,n))&&a.$(()=>r),Array.isArray(t)&&t.length!==i){for(let l=t.length;l<i;l++)(a=o[l])&&a.$();(a=Jr(o,"length",i))&&a.$(t.length)}(a=o[dl])&&a.$()}function pl(t,e){const r=Object.keys(e);for(let s=0;s<r.length;s+=1){const n=r[s];tn(t,n,e[n])}}function $f(t,e){if(typeof e=="function"&&(e=e(t)),e=Yr(e),Array.isArray(e)){if(t===e)return;let r=0,s=e.length;for(;r<s;r++){const n=e[r];t[r]!==n&&tn(t,r,n)}tn(t,"length",s)}else pl(t,e)}function Xr(t,e,r=[]){let s,n=t;if(e.length>1){s=e.shift();const o=typeof s,a=Array.isArray(t);if(Array.isArray(s)){for(let l=0;l<s.length;l++)Xr(t,[s[l]].concat(e),r);return}else if(a&&o==="function"){for(let l=0;l<t.length;l++)s(t[l],l)&&Xr(t,[l].concat(e),r);return}else if(a&&o==="object"){const{from:l=0,to:c=t.length-1,by:u=1}=s;for(let d=l;d<=c;d+=u)Xr(t,[d].concat(e),r);return}else if(e.length>1){Xr(t[s],e,[s].concat(r));return}n=t[s],r=[s].concat(r)}let i=e[0];typeof i=="function"&&(i=i(n,r),i===n)||s===void 0&&i==null||(i=Yr(i),s===void 0||Qs(n)&&Qs(i)&&!Array.isArray(i)?pl(n,i):tn(t,s,i))}function rn(...[t,e]){const r=Yr(t||{}),s=Array.isArray(r),n=hl(r);function i(...o){Nl(()=>{s&&o.length===1?$f(r,o[0]):Xr(r,o)})}return[n,i]}var Cf=q("<sl-alert>",!0,!1),ml=q("<sl-icon slot=icon>",!0,!1),Af=q("<div class=error><sl-icon class=icon name=exclamation-circle></sl-icon><span>.",!0,!1),Ef=q("<div class=field><sl-input>",!0,!1),Tf=q("<sl-icon class=rotate slot=suffix name=arrow-repeat>",!0,!1),Of=q("<sl-button>",!0,!1),Pf=q("<form>");const gl=t=>{Ye();const[e,r]=_n(t,["isOpen"]);return(()=>{var s=Cf();return xn(s,r,!1,!0),s._$owner=J(),O(s,()=>t.children,null),O(s,()=>t.message,null),_e(()=>ie(s,"open",e.isOpen)),s})()},bl=t=>S(gl,ds(t,{variant:"success",get children(){var e=ml();return ie(e,"name","info-circle"),e._$owner=J(),e}})),Oi=t=>S(gl,ds(t,{variant:"warning",get children(){var e=ml();return ie(e,"name","exclamation-triangle"),e._$owner=J(),e}})),_t=t=>{const{t:e}=Ye(),[r,s]=_n(t,["isSubmiting","errors"]);return(()=>{var n=Ef(),i=n.firstChild;return xn(i,ds(s,{get disabled(){return r.isSubmiting}}),!1,!1),i._$owner=J(),O(n,S(ut,{get when(){return r.errors},get children(){var o=Af(),a=o.firstChild,l=a.nextSibling,c=l.firstChild;return a._$owner=J(),O(l,()=>r.errors?.map(u=>e(u)||u).join(". "),c),o}}),null),n})()},Qr=t=>{const[e,r]=_n(t,["isSubmiting","children"]);return(()=>{var s=Of();return xn(s,ds(r,{get disabled(){return e.isSubmiting}}),!1,!0),s._$owner=J(),O(s,S(ut,{get when(){return e.isSubmiting},get children(){var n=Tf();return n._$owner=J(),n}}),null),O(s,()=>e.children,null),s})()},Pi=t=>{const e=r=>{r.preventDefault(),t.onSubmit()};return(()=>{var r=Pf();return r.addEventListener("submit",e),O(r,()=>t.children),r})()};var Nf=q("<div>"),Rf=q("<section><h2>");const Lf=()=>{const{t}=Ye(),{auth:e}=ar(),[r,s]=rn(qr(Ci)),[n,i]=W(),[o,a]=W(),[l,c]=W({}),[u]=Oe(()=>!0,async()=>await e.authenticate()),[d]=Oe(o,v=>e.signin(v)),[m]=Oe(n,v=>e.signup(v));is(async()=>{d.error&&(console.warn(d.error?.message),c({formErrors:[t("Failed signing in"),t("Did you type your password and email correct?")]})),m.error&&(console.warn(m.error?.message),c({formErrors:[t("Failed signing up"),t("Did you already sign up?")]}))});const f=v=>y=>{s(v,y.target.value)},g=()=>d.loading||m.loading;return(()=>{var v=Rf(),y=v.firstChild;return O(y,()=>t("Sign in")),O(v,S(pr,{get fallback(){return S(Kr,{})},get children(){return[ue(()=>or(u())),S(Pi,{onSubmit:()=>a(Xs(Ci,r,c)),get children(){return[S(_t,{get label(){return t("Email")},type:"text",inputmode:"email",clearable:!0,required:!0,get value(){return r.email},get errors(){return l().fieldErrors?.email},get["data-invalid"](){return!!l().fieldErrors?.email||l().formErrors},get["on:sl-change"](){return f("email")},get isSubmiting(){return g()}}),S(_t,{get label(){return t("Password")},type:"password",inputmode:"text","password-toggle":!0,clearable:!0,required:!0,get value(){return r.pass},get errors(){return l().fieldErrors?.pass},get["on:sl-change"](){return f("pass")},get["data-invalid"](){return!!l().fieldErrors?.pass||l().formErrors},get isSubmiting(){return g()}}),S(Oi,{get open(){return!!l().formErrors?.length},get message(){return l().formErrors?.join(". ")}}),(()=>{var w=Nf();return O(w,S(Qr,{onClick:()=>i(Xs(Ci,r,c)),get isSubmiting(){return g()},variant:"neutral",get children(){return t("Sign up")}}),null),O(w,S(Qr,{type:"submit",variant:"primary",get isSubmiting(){return g()},get children(){return t("Sign in")}}),null),w})()]}})]}}),null),v})()},If=()=>{const{t}=Ye(),{auth:e}=ar(),[r,s]=W(),[n]=Oe(r,()=>e.signout());return S(Qr,{get isSubmiting(){return n.loading},onClick:()=>s(!0),variant:"primary",get children(){return t("Sign out")}})};var Df=q("<div><sl-select>",!0,!1),Mf=q("<sl-option>",!0,!1);const zf=(t={})=>{const r={...{languageCodeOnly:!0},...t},s=navigator.languages===void 0?[navigator.language]:navigator.languages;return s?s.map(n=>{const i=n.trim();return r.languageCodeOnly?i.split(/-|_/)[0]:i}):[]},jf=t=>{const{locale:e,setLocale:r}=Ye(),s=o=>{localStorage.langCode=o,r(o)};let n=localStorage.langCode;n||(n=zf()[0]??e()),n!==e()&&s(n);const i=ue(()=>Qo.find(({code:o})=>o===e()));return(()=>{var o=Df(),a=o.firstChild;return a.addEventListener("sl-change",l=>s(l.target.value)),a._$owner=J(),O(a,S(Wi,{each:Qo,children:l=>(()=>{var c=Mf();return c._$owner=J(),O(c,()=>l.name),_e(()=>ie(c,"value",l.code)),c})()})),_e(()=>ie(a,"value",i()?.code)),o})()};var Uf=q("<sl-avatar>",!0,!1),Vf=q("<div class=top-bar><menu></menu><h1>");const Bf=({firstName:t,lastName:e})=>[t,e].reduce((r,s)=>(r=r+(s.length?s[0]:""),r),""),Ff=t=>{const{t:e}=Ye(),{profile:r,auth:s}=ar();return(()=>{var n=Vf(),i=n.firstChild,o=i.nextSibling;return O(i,S(ut,{get when(){return s.state().isAuthenticated},get children(){var a=Uf();return a._$owner=J(),_e(()=>ie(a,"initials",Bf(r.state()))),a}}),null),O(i,S(jf,{}),null),O(i,S(ut,{get when(){return s.state().isAuthenticated},get children(){return S(If,{})}}),null),O(o,()=>e(t.title)),n})()};var Zf=q("<section><h2></h2><p>!");const vl=t=>{const{t:e}=Ye();return(()=>{var r=Zf(),s=r.firstChild,n=s.nextSibling,i=n.firstChild;return O(s,()=>t.title),O(n,()=>e("Not implemented"),i),r})()};var Hf=q("<section><h2>");const Wf=()=>{const{t}=Ye(),{auth:e,profile:r}=ar(),[s,n]=rn(r.state()),[i,o]=W(),[a,l]=W({});_e(()=>{n(r.state())});const[c]=Oe(()=>e.state().isAuthenticated,()=>r.loadData()),[u]=Oe(()=>i(),m=>r.saveData(m));is(async()=>{u.loading&&l({}),u.error&&l({formErrors:[t("Error saving")]}),u.state==="ready"&&console.log("!")});const d=m=>f=>{n(m,f.target.value)};return(()=>{var m=Hf(),f=m.firstChild;return O(f,()=>t("Profile")),O(m,S(pr,{get fallback(){return S(Kr,{})},get children(){return[ue(()=>or(c())),S(Pi,{onSubmit:()=>o(Xs(Ei,s,l)),get children(){return[S(_t,{get label(){return t("First name")},inputmode:"text",autocapitalize:"words",spellcheck:!1,clearable:!0,required:!0,get value(){return s.firstName},get["on:sl-change"](){return d("firstName")},get["data-invalid"](){return!!a().fieldErrors?.firstName},get isSubmiting(){return u.loading},get errors(){return a().fieldErrors?.firstName}}),S(_t,{get label(){return t("Last name")},inputmode:"text",autocapitalize:"words",spellcheck:!1,clearable:!0,required:!0,get value(){return s.lastName},get["on:sl-change"](){return d("lastName")},get["data-invalid"](){return!!a().fieldErrors?.lastName},get isSubmiting(){return u.loading},get errors(){return a().fieldErrors?.lastName}}),S(_t,{get label(){return t("Address")},inputmode:"text",autocapitalize:"words",spellcheck:!1,clearable:!0,required:!1,get value(){return s.address},get["on:sl-change"](){return d("address")},get["data-invalid"](){return!!a().fieldErrors?.address},get isSubmiting(){return u.loading},get errors(){return a().fieldErrors?.address}}),S(_t,{get label(){return t("Phone")},inputmode:"numeric",spellcheck:!1,clearable:!0,get value(){return s.phone},get["on:sl-change"](){return d("phone")},get["data-invalid"](){return!!a().fieldErrors?.phone},get isSubmiting(){return u.loading},get errors(){return a().fieldErrors?.phone}}),S(Oi,{get open(){return!!a().formErrors?.length},get message(){return a().formErrors?.join(". ")}}),S(bl,{get open(){return u.state==="ready"},message:`Succesfulluy saved at ${new Date}`}),S(Qr,{type:"submit",variant:"primary",get isSubmiting(){return u.loading},get children(){return t("Save")}})]}})]}}),null),m})()};var Gf=q("<section><h2>");const qf=()=>{const{t}=Ye(),{auth:e,account:r}=ar(),[s,n]=rn(r.state()),[i,o]=W(),[a,l]=W({});_e(()=>{n(r.state())});const[c]=Oe(()=>e.state().isAuthenticated,()=>r.loadData()),[u]=Oe(()=>i(),m=>r.saveData(m));is(async()=>{u.error&&l({formErrors:[t("Error saving")]}),u.state==="ready"&&n("pass","")});const d=m=>f=>{n(m,f.target.value)};return(()=>{var m=Gf(),f=m.firstChild;return O(f,()=>t("Account")),O(m,S(pr,{get fallback(){return S(Kr,{})},get children(){return[ue(()=>or(c())),S(Pi,{onSubmit:()=>o(Xs(Ai,s,l)),get children(){return[S(_t,{get label(){return t("Email")},inputmode:"text",autocapitalize:"words",spellcheck:!1,clearable:!0,required:!0,get value(){return s.email},get["on:sl-change"](){return d("email")},get["data-invalid"](){return!!a().fieldErrors?.email},get isSubmiting(){return u.loading},get errors(){return a().fieldErrors?.email}}),S(_t,{get label(){return t("Password")},inputmode:"text",clearable:!0,type:"password","password-toggle":!0,get value(){return s.pass},get["on:sl-change"](){return d("pass")},get["data-invalid"](){return!!a().fieldErrors?.pass},get isSubmiting(){return u.loading},get errors(){return a().fieldErrors?.pass}}),S(Oi,{get open(){return!!a().formErrors?.length},get message(){return a().formErrors?.join(". ")}}),S(bl,{get open(){return u.state==="ready"},message:`Succesfulluy saved at ${new Date}`}),S(Qr,{type:"submit",variant:"primary",get isSubmiting(){return u.loading},get children(){return t("Save")}})]}})]}}),null),m})()};class Kf extends Error{name="AuthenticationError"}var Yf=q("<h1>Fail <!>!"),yl=q("<p>"),Jf=q("<pre>");const Xf=t=>(console.error(t.error),[(()=>{var e=Yf(),r=e.firstChild,s=r.nextSibling;return s.nextSibling,O(e,()=>t.moduleName,s),e})(),S(ut,{get when(){return t.error.name},get children(){var e=yl();return O(e,()=>t.error.name),e}}),S(ut,{get when(){return t.error.message},get children(){var e=yl();return O(e,()=>t.error.message),e}}),(()=>{var e=Jf();return O(e,()=>JSON.stringify(t.error,null,2)),e})()]);var Qf=q("<small class=app-version>v");const ep=t=>(()=>{var e=Qf();return e.firstChild,O(e,"1.0.0",null),e})();var tp=q("<sl-tab-group><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab slot=nav><sl-icon></sl-icon></sl-tab><sl-tab-panel></sl-tab-panel><sl-tab-panel></sl-tab-panel><sl-tab-panel>",!0,!1),rp=q("<main class=app><style data-name=custom></style><div>");const sp=t=>{const{t:e}=Ye(),{auth:r}=ar(),[s,n]=W();return is(()=>{const{activePanel:i}=localStorage,o=s();i&&o&&o.updateComplete.then(()=>{o.show(i)})}),ji(()=>{},i=>{if(i instanceof Kf)$i(i),r.signout();else throw i}),(()=>{var i=rp(),o=i.firstChild,a=o.nextSibling;return O(o,gd),O(a,S(Ff,{get title(){return t.title}}),null),O(a,S(ut,{get when(){return!r.state().isAuthenticated},get children(){return S(Lf,{title:"Login"})}}),null),O(a,S(ut,{get when(){return r.state().isAuthenticated},get children(){var l=tp(),c=l.firstChild,u=c.firstChild,d=c.nextSibling,m=d.firstChild,f=d.nextSibling,g=f.firstChild,v=f.nextSibling,y=v.nextSibling,w=y.nextSibling;return qi(k=>n(k),l),l.addEventListener("sl-tab-show",({detail:k})=>{localStorage.activePanel=k.name}),l._$owner=J(),ie(c,"panel","account"),c._$owner=J(),ie(u,"name","person-lock"),u._$owner=J(),O(c,()=>e("Account"),null),ie(d,"panel","subscription"),d._$owner=J(),ie(m,"name","journal"),m._$owner=J(),O(d,()=>e("Subscription"),null),ie(f,"panel","contact"),f._$owner=J(),ie(g,"name","person-hearts"),g._$owner=J(),O(f,()=>e("Contact"),null),ie(v,"name","account"),v._$owner=J(),O(v,S(qf,{}),null),O(v,S(Wf,{}),null),ie(y,"name","subscription"),y._$owner=J(),O(y,S(vl,{get title(){return e("Subscription")}})),ie(w,"name","contact"),w._$owner=J(),O(w,S(vl,{get title(){return e("Contact")}})),l}}),null),O(i,S(ep,{}),null),i})()},np=t=>S(Zl,{fallback:e=>S(Xf,{get moduleName(){return t.title},error:e}),get children(){return S(wd,{get children(){return S(_f,{get namespace(){return t.namespace},get database(){return t.database},get scope(){return t.scope},get datapoint(){return t.datapoint},get children(){return S(sp,{get title(){return t.title}})}})}})}}),ip=`main.app{background-color:var(--bg-color);border-color:var(--border-color);border-radius:8px;border-style:solid;border-width:2px;max-width:780px;margin:auto;overflow-x:hidden;padding:1rem}.heading{text-align:center}main.app table{max-width:500px;margin:auto}
`,wl=hr(),op=t=>{const e=new nl({datapoint:t.datapoint,namespace:t.namespace,database:t.database},W),r=new cl(e,{namespace:t.namespace,database:t.database,scope:""},W),s={db:e,auth:r};return Oe(()=>!e.state().isConnected,async()=>{await e.connect()}),S(pr,{get fallback(){return S(Kr,{})},get children(){return[ue(()=>or()),S(wl.Provider,{value:s,get children(){return t.children}})]}})},ap=()=>Dt(wl);var lp=q("<main class=app><style data-name=custom></style><section><div class=heading><h1></h1></div><table><thead><tr><th>Email</th><th>pass</th></tr></thead><tbody>"),cp=q(`<tr><td><sl-copy-button copy-label="Click to copy"success-label="Copied to clipboard!"error-label="Whoops, your browser doesn't support this!"></sl-copy-button></td><td>`,!0,!1);const up="demo_accounts",dp=t=>{const{db:e}=ap(),[r,s]=W(),[n,i]=rn({accounts:{}}),o=async()=>{const l=await(await e.getDb()).select(up);i("accounts",l.reduce((c,u)=>({...c,[u.id]:u}),{}))};return Oe(async()=>!0,async()=>{await e.getDb();const a=o();s(a)}),(()=>{var a=lp(),l=a.firstChild,c=l.nextSibling,u=c.firstChild,d=u.firstChild,m=u.nextSibling,f=m.firstChild,g=f.nextSibling;return O(a,()=>or(),l),O(l,ip),O(d,()=>t.title),O(g,S(Wi,{get each(){return Object.values(n.accounts)},children:v=>(()=>{var y=cp(),w=y.firstChild,k=w.firstChild,C=w.nextSibling;return k._$owner=J(),O(C,()=>v.pass),_e(()=>k.value=v.email),y})()})),a})()},hp=t=>S(op,{get namespace(){return t.namespace},get database(){return t.database},get datapoint(){return t.datapoint},get children(){return S(dp,{get title(){return t.title}})}});Xi("membership-portal",{title:"Membership portal",datapoint:"wss://localhost:8055/",namespace:"test",database:"test",scope:"test"},np),Xi("demo-accounts",{title:"Demo accounts portal",datapoint:"wss://localhost:8055/",namespace:"test",database:"test",scope:"test"},hp)});
