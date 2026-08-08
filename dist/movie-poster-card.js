function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,m=g?g.emptyScript:"",f=_.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??$)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[y("elementProperties")]=new Map,b[y("finalized")]=new Map,f?.({ReactiveElement:b}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,T=`<${P}>`,M=document,U=()=>M.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,I="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,L=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,X=M.createTreeWalker(M,129);function Y(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(n.lastIndex=c,l=n.exec(s),null!==l);)c=n.lastIndex,n===N?"!--"===l[1]?n=R:void 0!==l[1]?n=D:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=o??N,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?B:z):n===B||n===z?n=L:n===R||n===D?n=N:(n=L,o=void 0);const d=n===L&&t[e+1].startsWith("/>")?" ":"";r+=n===N?s+T:h>=0?(i.push(a),s.slice(0,h)+k+s.slice(h)+C+d):s+C+(-2===h?e:d)}return[Y(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,h]=K(t,e);if(this.el=G.createElement(l,s),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=h[r++],s=i.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?et:"?"===n[1]?st:"@"===n[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),X.nextNode(),a.push({type:2,index:++o});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===q)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=H(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);X.currentNode=i;let o=X.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=X.nextNode(),r++)}return X.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),H(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(Y(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Q(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=F}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Z(this,i[s+n],e,n),a===q&&(a=this._$AH[n]),r||=!H(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===q)return;const s=this._$AH,i=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==F&&(s===F||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(G,Q),(x.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;let at=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Q(e.insertBefore(U(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ct=(t=ht,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?ct(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return dt({...t,state:!0,attribute:!1})}const ut=1;let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const gt="important",mt=" !"+gt,ft=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends _t{constructor(t){if(super(t),t.type!==ut||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(mt);t.includes("-")||e?s.setProperty(t,e?i.slice(0,-11):i,e?gt:""):s[t]=i}}return q}});class yt{constructor(t,e=6){this.apiKey=t,this.cacheHours=e,this.cache=[],this.shuffled=[],this.lastFetch=0}async getMovies(t,e){const s=Date.now(),i=s-this.lastFetch>36e5*this.cacheHours;if(this.cache.length&&!i)return this.shuffled;const o=`https://api.themoviedb.org/3${this.endpoint(t,e)}&api_key=${this.apiKey}`,r=await fetch(o);if(!r.ok)throw new Error(`TMDB ${r.status}: ${r.statusText}`);const n=await r.json();return this.cache=n.results.filter(t=>t.poster_path),this.shuffled=this.shuffle(this.cache),this.lastFetch=s,this.shuffled}posterUrl(t){return`https://image.tmdb.org/t/p/w780${t}`}endpoint(t,e){switch(t){case"popular":return"/movie/popular?language=en-US";case"top_rated":return"/movie/top_rated?language=en-US";case"trending_day":return"/trending/movie/day?language=en-US";case"trending_week":return"/trending/movie/week?language=en-US";default:return`/movie/now_playing?language=en-US&region=${e}`}}shuffle(t){const e=[...t];for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}}const vt={source:"now_playing",region:"US",cache_hours:6,display_time:30,transition:"fade",transition_duration:1,shuffle:!0,pause_on_hover:!0,show_overlay:!0,show_title:!0,show_year:!0,show_rating:!0,show_synopsis:!0,synopsis_lines:3,show_progress_bar:!0,progress_bar_position:"bottom",show_clock:!1,clock_format:"24h",overlay_style:"gradient",overlay_color:"#000000",overlay_opacity:.7,overlay_position:"bottom",title_color:"#ffffff",title_size:"lg",title_weight:"bold",meta_color:"#cccccc",synopsis_color:"#aaaaaa",text_shadow:!0,tap_action:{action:"none"},double_tap_action:{action:"add-to-watchlist"},swipe_left_action:{action:"next"},swipe_right_action:{action:"previous"},swipe_threshold:50,watchlist_item_format:"{title} ({year}) — {rating}/10",watchlist_confirm:!0,watchlist_no_duplicates:!0},$t=[{name:"tmdb_api_key",required:!0,selector:{text:{type:"password"}}},{type:"expandable",title:"Source & timing",schema:[{name:"source",selector:{select:{mode:"dropdown",options:[{value:"now_playing",label:"Now Playing"},{value:"popular",label:"Popular"},{value:"top_rated",label:"Top Rated"},{value:"trending_day",label:"Trending Today"},{value:"trending_week",label:"Trending This Week"}]}}},{name:"region",selector:{text:{}}},{name:"display_time",selector:{number:{min:5,max:300,step:5,mode:"box",unit_of_measurement:"s"}}},{name:"transition",selector:{select:{mode:"dropdown",options:[{value:"fade",label:"Fade"},{value:"none",label:"None"}]}}}]},{type:"expandable",title:"Watchlist",schema:[{name:"watchlist_entity",selector:{entity:{domain:"todo"}}},{name:"watchlist_item_format",selector:{text:{}}},{name:"watchlist_confirm",selector:{boolean:{}}},{name:"watchlist_no_duplicates",selector:{boolean:{}}}]},{type:"expandable",title:"Overlay & display",schema:[{name:"show_overlay",selector:{boolean:{}}},{name:"show_title",selector:{boolean:{}}},{name:"show_year",selector:{boolean:{}}},{name:"show_rating",selector:{boolean:{}}},{name:"show_synopsis",selector:{boolean:{}}},{name:"synopsis_lines",selector:{number:{min:1,max:10,step:1,mode:"box"}}},{name:"show_progress_bar",selector:{boolean:{}}},{name:"progress_bar_position",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"Bottom"},{value:"top",label:"Top"}]}}},{name:"show_clock",selector:{boolean:{}}},{name:"clock_format",selector:{select:{mode:"dropdown",options:[{value:"24h",label:"24-hour"},{value:"12h",label:"12-hour"}]}}}]},{type:"expandable",title:"Banner appearance",schema:[{name:"overlay_style",selector:{select:{mode:"dropdown",options:[{value:"gradient",label:"Gradient"},{value:"solid",label:"Solid"}]}}},{name:"overlay_position",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"Bottom"},{value:"top",label:"Top"},{value:"center",label:"Centre"}]}}},{name:"overlay_color",selector:{text:{type:"color"}}},{name:"overlay_opacity",selector:{number:{min:0,max:1,step:.05,mode:"slider"}}},{name:"title_color",selector:{text:{type:"color"}}},{name:"title_size",selector:{select:{mode:"dropdown",options:[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"},{value:"xl",label:"Extra large"}]}}},{name:"title_weight",selector:{select:{mode:"dropdown",options:[{value:"normal",label:"Normal"},{value:"bold",label:"Bold"}]}}},{name:"meta_color",selector:{text:{type:"color"}}},{name:"synopsis_color",selector:{text:{type:"color"}}},{name:"text_shadow",selector:{boolean:{}}}]},{type:"expandable",title:"Gestures & actions",schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}},{name:"swipe_left_action",selector:{ui_action:{}}},{name:"swipe_right_action",selector:{ui_action:{}}}]}],wt={tmdb_api_key:"TMDB API Key",source:"Movie source",region:"Region code (e.g. GB, US, AU)",display_time:"Seconds per poster",transition:"Transition style",watchlist_entity:"Watchlist (to-do entity)",watchlist_item_format:"Item format",watchlist_confirm:"Show confirmation toast",watchlist_no_duplicates:"Prevent duplicates",show_overlay:"Show text overlay",show_title:"Show title",show_year:"Show year",show_rating:"Show rating",show_synopsis:"Show synopsis",synopsis_lines:"Max synopsis lines",show_progress_bar:"Show progress bar",progress_bar_position:"Progress bar position",show_clock:"Show clock",clock_format:"Clock format",overlay_style:"Overlay style",overlay_position:"Overlay position",overlay_color:"Overlay colour",overlay_opacity:"Overlay opacity",title_color:"Title colour",title_size:"Title size",title_weight:"Title weight",meta_color:"Year / rating colour",synopsis_color:"Synopsis colour",text_shadow:"Text shadow",tap_action:"Tap action",double_tap_action:"Double-tap action",swipe_left_action:"Swipe left (next poster)",swipe_right_action:"Swipe right (previous poster)"};class bt extends at{setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}_computeLabel(t){return wt[t.name]??t.name}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${$t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:W``}}bt.styles=n`
    ha-form {
      display: block;
      padding: 0 4px;
    }
  `,t([dt({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),customElements.define("movie-poster-card-editor",bt);const xt={sm:"14px",md:"18px",lg:"24px",xl:"32px"};class At extends at{constructor(){super(...arguments),this.movies=[],this.currentIndex=0,this.nextIndex=1,this.transitioning=!1,this.overlayVisible=!0,this.errorMsg=null,this.toast=null,this.clockStr="",this.cycleHandle=0,this.progressHandle=0,this.toastHandle=0,this.clockHandle=0,this.progressEl=null,this.progressStart=0,this.ptrStartX=0,this.ptrStartY=0,this.ptrStartTime=0,this.ptrType="",this.tapPending=!1,this.tapHandle=0,this.paused=!1}getCardSize(){return 8}static getConfigElement(){return document.createElement("movie-poster-card-editor")}static getStubConfig(){return{tmdb_api_key:"your_tmdb_api_key_here",watchlist_entity:"todo.family_watchlist"}}setConfig(t){if(!t.tmdb_api_key)throw new Error("movie-poster-card: tmdb_api_key is required");this.cfg={...vt,...t},t.watchlist_entity&&!t.double_tap_action&&(this.cfg.double_tap_action={action:"add-to-watchlist"}),this.client=new yt(this.cfg.tmdb_api_key,this.cfg.cache_hours)}connectedCallback(){super.connectedCallback(),this.load()}disconnectedCallback(){super.disconnectedCallback(),this.teardown()}async load(){this.errorMsg=null;try{this.movies=await this.client.getMovies(this.cfg.source,this.cfg.region),this.currentIndex=0,this.nextIndex=1%this.movies.length,this.startCycle(),this.cfg.show_clock&&this.startClock()}catch(t){this.errorMsg=t.message??"Failed to load movies"}}startCycle(){clearInterval(this.cycleHandle),this.progressStart=Date.now(),this.animateProgress(),this.cycleHandle=window.setInterval(()=>{this.paused||this.advance()},1e3*this.cfg.display_time)}advance(){this.movies.length<2||this.transitioning||(this.nextIndex=(this.currentIndex+1)%this.movies.length,this.doTransition())}retreat(){this.movies.length<2||this.transitioning||(this.nextIndex=(this.currentIndex-1+this.movies.length)%this.movies.length,this.doTransition())}doTransition(){if("none"===this.cfg.transition)return this.currentIndex=this.nextIndex,void this.resetProgress();this.transitioning=!0;const t=1e3*(this.cfg.transition_duration??1);setTimeout(()=>{this.currentIndex=this.nextIndex,this.transitioning=!1,this.resetProgress()},t)}resetProgress(){this.progressStart=Date.now(),this.progressEl&&(this.progressEl.style.transition="none",this.progressEl.style.width="0%",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.progressEl&&(this.progressEl.style.transition=`width ${this.cfg.display_time}s linear`,this.progressEl.style.width="100%")})}))}animateProgress(){this.cfg.show_progress_bar&&this.updateComplete.then(()=>{this.progressEl=this.renderRoot?.querySelector(".progress-fill"),this.progressEl&&(this.progressEl.style.transition="none",this.progressEl.style.width="0%",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.progressEl&&(this.progressEl.style.transition=`width ${this.cfg.display_time}s linear`,this.progressEl.style.width="100%")})}))})}startClock(){const t=()=>{const t=new Date;"12h"===this.cfg.clock_format?this.clockStr=t.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}):this.clockStr=t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})};t(),this.clockHandle=window.setInterval(t,1e4)}teardown(){clearInterval(this.cycleHandle),clearInterval(this.progressHandle),clearInterval(this.clockHandle),clearTimeout(this.toastHandle),clearTimeout(this.tapHandle)}onPointerDown(t){this.ptrStartX=t.clientX,this.ptrStartY=t.clientY,this.ptrStartTime=Date.now(),this.ptrType=t.pointerType,this.cfg.pause_on_hover&&(this.paused=!0)}onPointerUp(t){this.paused=!1;const e=t.clientX-this.ptrStartX,s=t.clientY-this.ptrStartY,i=Date.now()-this.ptrStartTime,o=this.cfg.swipe_threshold??50;if(Math.abs(e)>o&&Math.abs(e)>Math.abs(s))return clearTimeout(this.tapHandle),this.tapPending=!1,void this.execute(e<0?this.cfg.swipe_left_action:this.cfg.swipe_right_action);Math.abs(e)<20&&Math.abs(s)<20&&i<500&&(this.tapPending?(clearTimeout(this.tapHandle),this.tapPending=!1,this.execute(this.cfg.double_tap_action)):(this.tapPending=!0,this.tapHandle=window.setTimeout(()=>{this.tapPending=!1,this.execute(this.cfg.tap_action)},300)))}onPointerLeave(){this.paused=!1}execute(t){switch(t.action){case"none":break;case"next":clearInterval(this.cycleHandle),this.advance(),this.startCycle();break;case"previous":clearInterval(this.cycleHandle),this.retreat(),this.startCycle();break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})));break;case"call-service":if(t.service&&this.hass){const[e,s]=t.service.split(".");this.hass.callService(e,s,t.service_data??{})}break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"toggle-info":this.overlayVisible=!this.overlayVisible;break;case"add-to-watchlist":this.addToWatchlist()}}async addToWatchlist(){const t=this.cfg.watchlist_entity;if(!t||!this.hass)return void this.showToast("No watchlist configured");const e=this.movies[this.currentIndex];if(!e)return;const s=this.cfg.watchlist_item_format.replace("{title}",e.title).replace("{year}",(e.release_date??"").slice(0,4)||"?").replace("{rating}",e.vote_average?.toFixed(1)??"?").replace("{overview}",e.overview??"");if(this.cfg.watchlist_no_duplicates){const s=this.hass.states[t],i=(s?.attributes?.items??[]).some(t=>(t.summary??t.name??"").toLowerCase().includes(e.title.toLowerCase()));if(i)return void this.showToast("Already on your list")}try{await this.hass.callService("todo","add_item",{item:s},{entity_id:t}),this.cfg.watchlist_confirm&&this.showToast(`Added: ${e.title}`)}catch{this.showToast("Could not add to watchlist")}}showToast(t){this.toast=t,clearTimeout(this.toastHandle),this.toastHandle=window.setTimeout(()=>{this.toast=null},3e3)}render(){if(this.errorMsg)return this.renderError();if(!this.movies.length)return this.renderLoading();const t=this.movies[this.currentIndex],e=this.movies[this.nextIndex],s=`${this.cfg.transition_duration??1}s`,i=this.transitioning&&"fade"===this.cfg.transition;return W`
      <div class="root"
        @pointerdown=${this.onPointerDown}
        @pointerup=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}>

        <!-- Background layers: two divs crossfade between them -->
        <div class="layer current"
          style=${ft({backgroundImage:`url(${this.client.posterUrl(t.poster_path)})`,opacity:i?"0":"1",transition:`opacity ${s} ease`})}></div>

        <div class="layer next"
          style=${ft({backgroundImage:e?`url(${this.client.posterUrl(e.poster_path)})`:"none",opacity:i?"1":"0",transition:`opacity ${s} ease`})}></div>

        ${this.cfg.show_overlay&&this.overlayVisible?this.renderOverlay(t):F}

        ${this.cfg.show_progress_bar?this.renderProgressBar():F}

        ${this.toast?W`<div class="toast">${this.toast}</div>`:F}
      </div>
    `}renderOverlay(t){const e=this.cfg.text_shadow?"0 1px 4px rgba(0,0,0,0.8)":"none",s=xt[this.cfg.title_size]??xt.lg,i=(t.release_date??"").slice(0,4),o=t.vote_average?.toFixed(1)??"?",r=this.overlayBackground();return W`
      <div class="overlay" style=${ft({background:r})}>
        <div class="overlay-content">
          ${this.cfg.show_clock&&this.clockStr?W`<div class="clock" style=${ft({color:this.cfg.meta_color,textShadow:e})}>${this.clockStr}</div>`:F}

          ${this.cfg.show_title?W`<div class="title" style=${ft({color:this.cfg.title_color,fontSize:s,fontWeight:this.cfg.title_weight,textShadow:e})}>${t.title}</div>`:F}

          ${this.cfg.show_year||this.cfg.show_rating?W`<div class="meta" style=${ft({color:this.cfg.meta_color,textShadow:e})}>
                ${this.cfg.show_year&&i?W`<span>${i}</span>`:F}
                ${this.cfg.show_year&&i&&this.cfg.show_rating?W`<span class="sep">·</span>`:F}
                ${this.cfg.show_rating?W`<span>⭐ ${o}</span>`:F}
              </div>`:F}

          ${this.cfg.show_synopsis&&t.overview?W`<div class="synopsis" style=${ft({color:this.cfg.synopsis_color,WebkitLineClamp:String(this.cfg.synopsis_lines),textShadow:e})}>${t.overview}</div>`:F}
        </div>
      </div>
    `}overlayBackground(){const{overlay_style:t,overlay_color:e,overlay_opacity:s,overlay_position:i}=this.cfg,o=e??"#000000",r=parseInt(o.slice(1,3),16),n=parseInt(o.slice(3,5),16),a=parseInt(o.slice(5,7),16),l=`rgba(${r},${n},${a},${s??.7})`;if("solid"===t)return l;return`linear-gradient(${"top"===i?"to bottom":"to top"}, ${l} 0%, ${l} 30%, ${`rgba(${r},${n},${a},0)`} 100%)`}renderProgressBar(){const t="top"===this.cfg.progress_bar_position;return W`
      <div class="progress-track ${t?"progress-top":"progress-bottom"}">
        <div class="progress-fill"></div>
      </div>
    `}renderLoading(){return W`<div class="state-screen"><div class="spinner"></div></div>`}renderError(){return W`
      <div class="state-screen error">
        <div class="error-icon">⚠️</div>
        <div>${this.errorMsg}</div>
      </div>
    `}}At.styles=n`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }

    .root {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 300px;
      background: #111;
      border-radius: inherit;
      overflow: hidden;
      cursor: default;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Poster layers */
    .layer {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center top;
      will-change: opacity;
    }

    /* Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      pointer-events: none;
    }

    .overlay-content {
      padding: 20px 18px 14px;
      width: 100%;
    }

    .clock {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
      opacity: 0.8;
    }

    .title {
      line-height: 1.2;
      letter-spacing: -0.01em;
      margin-bottom: 6px;
      text-wrap: balance;
    }

    .meta {
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }

    .sep { opacity: 0.4; }

    .synopsis {
      font-size: 13px;
      line-height: 1.55;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Progress bar */
    .progress-track {
      position: absolute;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255,255,255,0.15);
    }
    .progress-top { top: 0; }
    .progress-bottom { bottom: 0; }

    .progress-fill {
      height: 100%;
      width: 0%;
      background: rgba(255,255,255,0.7);
    }

    /* Toast */
    .toast {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.75);
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 20px;
      white-space: nowrap;
      pointer-events: none;
      animation: toast-in 0.25s ease;
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    /* Loading / error states */
    .state-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 100%;
      min-height: 200px;
      color: #888;
      font-size: 14px;
    }

    .error { color: #e57373; }
    .error-icon { font-size: 28px; }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: rgba(255,255,255,0.5);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,t([dt({attribute:!1})],At.prototype,"hass",void 0),t([pt()],At.prototype,"movies",void 0),t([pt()],At.prototype,"currentIndex",void 0),t([pt()],At.prototype,"nextIndex",void 0),t([pt()],At.prototype,"transitioning",void 0),t([pt()],At.prototype,"overlayVisible",void 0),t([pt()],At.prototype,"errorMsg",void 0),t([pt()],At.prototype,"toast",void 0),t([pt()],At.prototype,"clockStr",void 0),customElements.define("movie-poster-card",At),window.customCards=window.customCards??[],window.customCards.push({type:"movie-poster-card",name:"Movie Poster Screensaver",description:"Cycles TMDB movie posters with title, rating, and synopsis overlay.",preview:!1});
