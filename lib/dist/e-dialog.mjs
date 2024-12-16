import { Dialog, Button } from "element-ui";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(a) {
    for (var b, c = 1; c < arguments.length; c++)
      for (var d in b = arguments[c], b)
        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
    return a;
  }, _extends.apply(this, arguments);
}
var normalMerge = ["attrs", "props", "domProps"], toArrayMerge = ["class", "style", "directives"], functionalMerge = ["on", "nativeOn"], mergeJsxProps = function(a) {
  return a.reduce(function(c, a2) {
    for (var b in a2)
      if (!c[b])
        c[b] = a2[b];
      else if (-1 !== normalMerge.indexOf(b))
        c[b] = _extends({}, c[b], a2[b]);
      else if (-1 !== toArrayMerge.indexOf(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]], e = a2[b] instanceof Array ? a2[b] : [a2[b]];
        c[b] = [].concat(d, e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a2[b])
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]], h = a2[b][f] instanceof Array ? a2[b][f] : [a2[b][f]];
            c[b][f] = [].concat(g, h);
          } else
            c[b][f] = a2[b][f];
      } else if ("hook" === b)
        for (var i in a2[b])
          c[b][i] = c[b][i] ? mergeFn(c[b][i], a2[b][i]) : a2[b][i];
      else
        c[b] = a2[b];
    return c;
  }, {});
}, mergeFn = function(a, b) {
  return function() {
    a && a.apply(this, arguments), b && b.apply(this, arguments);
  };
};
var helper = mergeJsxProps;
const _mergeJSXProps = /* @__PURE__ */ getDefaultExportFromCjs(helper);
const drag = {
  bind(el, binding, vnode, oldVnode) {
    const value = binding.value;
    if (value === false)
      return;
    const dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el.querySelector(".el-dialog");
    dialogHeaderEl.style.cursor = "move";
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    dragDom.style.position = "absolute";
    let width = dragDom.style.width;
    if (width.includes("%")) {
      width = +document.body.clientWidth * (+width.replace(/%/g, "") / 100);
    } else {
      width = +width.replace(/\px/g, "");
    }
    dragDom.style.left = `${(document.body.clientWidth - width) / 2}px`;
    dialogHeaderEl.onmousedown = (e) => {
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      let styL, styT;
      if (sty.left.includes("%")) {
        styL = +document.body.clientWidth * (+sty.left.replace(/%/g, "") / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/%/g, "") / 100);
      } else {
        styL = +sty.left.replace(/\px/g, "");
        styT = +sty.top.replace(/\px/g, "");
      }
      document.onmousemove = function(e2) {
        const l = e2.clientX - disX;
        const t = e2.clientY - disY;
        let finallyL = l + styL;
        let finallyT = t + styT;
        dragDom.style.left = `${finallyL}px`;
        dragDom.style.top = `${finallyT}px`;
      };
      document.onmouseup = function(e2) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
};
const index = {
  install(Vue, config) {
    this.$createElement;
    let DialogConfig = Object.assign({
      width: "50%",
      top: "15vh",
      modal: true,
      showClose: true,
      floorBtnSize: "small",
      sureBtnText: "确定",
      closeBtnText: "关闭",
      draggable: true,
      isBtn: true
    }, config);
    if (DialogConfig.draggable) {
      Vue.directive("drag", drag);
    }
    let isDialog = null;
    Vue.prototype.$Dialog = function(compName, props, callback, config2 = {}) {
      let vm = null;
      if (isDialog)
        return;
      if (!compName)
        throw new Error("No pop-up content passed in");
      if (typeof compName == "string") {
        vm = Vue.extend({
          template: compName
        });
      } else if (typeof compName == "object") {
        vm = Vue.extend(compName);
      } else {
        throw new Error("Please enter a valid value");
      }
      let selfConfig = Object.assign(DialogConfig, config2);
      let attrs = {
        attrs: selfConfig
      };
      const footer = config2.footer;
      const ElDialog = Vue.extend({
        data() {
          return {
            visible: false
          };
        },
        render(h) {
          return h(Dialog, _mergeJSXProps([{
            "directives": [{
              name: "drag",
              value: true
            }],
            "attrs": {
              "visible": this.visible,
              "title": selfConfig.title || "标题",
              "width": selfConfig.width || "50%"
            }
          }, attrs, {
            "on": {
              "close": () => {
                handleClose();
              }
            }
          }]), [h(vm, {
            props
          }), h("div", {
            "slot": "footer"
          }, [footer && footer(h, handleClose), selfConfig.isBtn ? h("div", [h(Button, {
            "on": {
              "click": () => {
                handleClose();
              }
            },
            "attrs": {
              "size": selfConfig.floorBtnSize
            }
          }, [selfConfig.closeBtnText]), h(Button, {
            "on": {
              "click": () => {
                handleSure(callback, this);
              }
            },
            "attrs": {
              "size": selfConfig.floorBtnSize,
              "type": "primary"
            }
          }, [selfConfig.sureBtnText])]) : h("span")])]);
        }
      });
      isDialog = new ElDialog();
      document.body.appendChild(isDialog.$mount().$el);
      setTimeout(() => {
        isDialog.visible = true;
      }, 100);
    };
    function handleClose() {
      isDialog.visible = false;
      setTimeout(() => {
        if (isDialog) {
          document.body.removeChild(isDialog.$mount().$el);
          isDialog.$destroy();
          isDialog = null;
        }
      }, 500);
    }
    function handleSure(fn, vm) {
      let compVm = vm.$children[0].$children[2];
      fn && fn(compVm, handleClose);
    }
  }
};
export {
  index as default
};
