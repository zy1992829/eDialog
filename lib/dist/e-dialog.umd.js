!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("element-ui")):"function"==typeof define&&define.amd?define(["element-ui"],t):(e="undefined"!=typeof globalThis?globalThis:e||self)["e-dialog"]=t(e.elementUi)}(this,(function(e){"use strict";function t(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t,n=1;n<arguments.length;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)}var o=["attrs","props","domProps"],i=["class","style","directives"],l=["on","nativeOn"],r=function(e,t){return function(){e&&e.apply(this,arguments),t&&t.apply(this,arguments)}};const s=t((function(e){return e.reduce((function(e,t){for(var s in t)if(e[s])if(-1!==o.indexOf(s))e[s]=n({},e[s],t[s]);else if(-1!==i.indexOf(s)){var c=e[s]instanceof Array?e[s]:[e[s]],u=t[s]instanceof Array?t[s]:[t[s]];e[s]=[].concat(c,u)}else if(-1!==l.indexOf(s))for(var a in t[s])if(e[s][a]){var d=e[s][a]instanceof Array?e[s][a]:[e[s][a]],f=t[s][a]instanceof Array?t[s][a]:[t[s][a]];e[s][a]=[].concat(d,f)}else e[s][a]=t[s][a];else if("hook"===s)for(var p in t[s])e[s][p]=e[s][p]?r(e[s][p],t[s][p]):t[s][p];else e[s]=t[s];else e[s]=t[s];return e}),{})})),c={bind(e,t,n,o){if(!1===t.value)return;const i=e.querySelector(".el-dialog__header"),l=e.querySelector(".el-dialog");i.style.cursor="move";const r=l.currentStyle||window.getComputedStyle(l,null);l.style.position="absolute";let s=l.style.width;s=s.includes("%")?+document.body.clientWidth*(+s.replace(/%/g,"")/100):+s.replace(/\px/g,""),l.style.left=(document.body.clientWidth-s)/2+"px",i.onmousedown=e=>{const t=e.clientX-i.offsetLeft,n=e.clientY-i.offsetTop;let o,s;r.left.includes("%")?(o=+document.body.clientWidth*(+r.left.replace(/%/g,"")/100),s=+document.body.clientHeight*(+r.top.replace(/%/g,"")/100)):(o=+r.left.replace(/\px/g,""),s=+r.top.replace(/\px/g,"")),document.onmousemove=function(e){const i=e.clientX-t,r=e.clientY-n;let c=i+o,u=r+s;l.style.left=`${c}px`,l.style.top=`${u}px`},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}};return{install(t,n){this.$createElement;let o=Object.assign({width:"50%",top:"15vh",modal:!0,showClose:!0,floorBtnSize:"small",sureBtnText:"确定",closeBtnText:"关闭",draggable:!0,isBtn:!0},n);o.draggable&&t.directive("drag",c);let i=null;function l(){i.visible=!1,setTimeout((()=>{i&&(document.body.removeChild(i.$mount().$el),i.$destroy(),i=null)}),500)}t.prototype.$Dialog=function(n,r,c,u={}){let a=null;if(i)return;if(!n)throw new Error("No pop-up content passed in");if("string"==typeof n)a=t.extend({template:n});else{if("object"!=typeof n)throw new Error("Please enter a valid value");a=t.extend(n)}let d=Object.assign(o,u),f={attrs:d};const p=u.footer,y=t.extend({data:()=>({visible:!1}),render(t){return t(e.Dialog,s([{directives:[{name:"drag",value:!0}],attrs:{visible:this.visible,title:d.title||"标题",width:d.width||"50%"}},f,{on:{close:()=>{l()}}}]),[t(a,{props:r}),t("div",{slot:"footer"},[p&&p(t,l),d.isBtn?t("div",[t(e.Button,{on:{click:()=>{l()}},attrs:{size:d.floorBtnSize}},[d.closeBtnText]),t(e.Button,{on:{click:()=>{!function(e,t){let n=t.$children[0].$children[2];e&&e(n,l)}(c,this)}},attrs:{size:d.floorBtnSize,type:"primary"}},[d.sureBtnText])]):t("span")])])}});i=new y,document.body.appendChild(i.$mount().$el),setTimeout((()=>{i.visible=!0}),100)}}}}));