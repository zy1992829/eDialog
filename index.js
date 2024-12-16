
import { Dialog, Button } from 'element-ui'
import drag from './utils/directive/drag.js'

export default {
  install(Vue, config) {
    let DialogConfig = Object.assign({
      width: '50%',
      top: '15vh',
      modal: true,
      showClose: true,
      floorBtnSize: 'small',
      sureBtnText: '确定',
      closeBtnText: '关闭',
      draggable: true,
      isBtn:true
    }, config)
    if (DialogConfig.draggable) {
      Vue.directive('drag', drag)
    }
    let isDialog = null;
    Vue.prototype.$Dialog = function (compName, props, callback, config = {}) {
      let vm =null
      if (isDialog) return 
      if (!compName) throw new Error('No pop-up content passed in'); 
      if (typeof compName == 'string') {
        vm = Vue.extend({
          template: compName
        })
      } else if (typeof compName == 'object') {
        vm = Vue.extend(compName)
      } else {
        throw new Error('Please enter a valid value'); 
      }
      let selfConfig = Object.assign(DialogConfig, config)
      let attrs = { attrs: selfConfig }
      
      const footer = config.footer
      const ElDialog = Vue.extend({
      
        data() {
          return {
            visible:false
          }
        },
        render(h) {
          return (
            <Dialog v-drag visible={this.visible} title={selfConfig.title || '标题'} width={selfConfig.width || '50%'}
              {...attrs}  onClose={() => { handleClose() }} >
              { h(vm,{
                props
              })}
              <div slot="footer">
                {
                  footer && footer(h,handleClose)
                }
                {
                  selfConfig.isBtn ? (
                    <div>
                    <Button onClick={() => { handleClose() }} size={selfConfig.floorBtnSize}>{selfConfig.closeBtnText}</Button>
                    <Button onClick={() => { handleSure(callback, this) }} size={selfConfig.floorBtnSize} type={'primary'}>{ selfConfig.sureBtnText}</Button>
                    </div>
                  ) : (<span></span>)
                }
              </div>
              </Dialog>
          )
        }
      })
      isDialog = new ElDialog();
      document.body.appendChild(isDialog.$mount().$el);
      setTimeout(() => {
        isDialog.visible = true
      },100)
    }
    function handleClose() {
      isDialog.visible = false
      setTimeout(() => {
        if (isDialog) {
          document.body.removeChild(isDialog.$mount().$el)
          isDialog.$destroy();
          isDialog = null
        }
      },500) 
    }
    function handleSure(fn, vm) {
      let compVm = vm.$children[0].$children[2]
      fn && fn(compVm,handleClose)
    }
  }
}