import 'amfe-flexible'
import Vue from 'vue'
import './common/css/icon.css'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './vuex/store.js'
import '../static/layer_mobile/need/layer.css'
import '../static/layer_mobile/layer.js'

fastclick.attach(document.body);

import {
  Style,
  Button,
  CheckboxGroup,
  Radio,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Loading,
  Tip,
  Popup,
  Toast,
  Picker,
  CascadePicker,
  TimePicker,
  Dialog,
  ActionSheet,
  Scroll,
  Slide,
  IndexList,
  Swipe,
  DatePicker,
  Upload
} from 'cube-ui'




import Vueloading from './loading/loading.js'
Vue.use(Vueloading, {
  //container: '' // 设置loading的挂载点
})

// Validator.addMessage('required','weixf');
// Validator.addMessage('type', {
//   'tel': '请输入正确的手机号码'
// })


// Validator.addType('password', (val) => {
//   return typeof val === 'password' && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/ig.test(val)
// })

// Validator.addType('tel', (val) => {
//   return typeof val === 'Number'
// })



// Vue.use(axios)
Vue.use(Button)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Validator)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)
Vue.use(Swipe)
Vue.use(DatePicker)
Vue.use(Upload)

Vue.config.productionTip = false

 router.beforeEach((to, from, next) => {
   if(to.meta.requireAuth) {
     if(window.sessionStorage.getItem('token')) {
       next();
     }else {
       next({
         path: '/register'
       })
     }
   }else {
     next();
   }
 })


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
