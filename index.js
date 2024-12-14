
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
      draggable:true
    }, config)
    if (DialogConfig.draggable) {
      Vue.directive('drag', drag)
    }
    let isDialog = null;
    Vue.prototype.$Dialog = function (compName, props, callback, config = {}) {
      if (isDialog) return 
      let vm = Vue.extend(compName)
      let contentComp = new vm()
      let selfConfig = Object.assign(DialogConfig, config)
      const ElDialog = Vue.extend({
      
        data() {
          return {
            visible:false
          }
        },
        render(h) {
          return (
            <Dialog v-drag visible={this.visible} title={config.title || '标题'} width={config.width || '50%'}
            {...selfConfig}  onClose={() => { handleClose() }} >
              { h(vm,{
                props
              })}
              <div slot="footer">
                <Button onClick={() => { handleClose() }} size={selfConfig.floorBtnSize}>{selfConfig.closeBtnText}</Button>
                <Button onClick={() => { handleSure(callback, contentComp) }} size={selfConfig.floorBtnSize} type={'primary'}>{ selfConfig.sureBtnText}</Button>
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
      fn && fn(vm,handleClose)
    }
  }
}