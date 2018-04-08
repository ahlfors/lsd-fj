/**
 * @author lsz
 * @desc 初始化入口
 */

/* 插件引入 */

import Vue from 'vue'
import App from './App' // vue 入口
import router from './router' // 路由
import store from './store' // vuex
import axios from './components/common/http/main' //  Ajax

/* 公用组件引入 */
import AppTemplate from './components/common/vue/AppTemplate.vue' // app 模板
import ViewTemplate from './components/common/vue/ViewTemplate.vue' // view 视图模板
import PopupTemplate from './components/common/vue/PopupTemplate.vue' // 弹窗 模板
import Counter from './components/common/vue/Counter.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './components/common/helper/DateUtil.js'
import areaSort from './components/common/helper/AreaSort.js' //  固定地市排序

/**
 * 加载流水
 */
let app = {
  /**
   * 加载地市固定排序
   */
  loadAreaSort() {
    Vue.prototype.areaSort = areaSort;
  },
  /**
   * 装载 Ajax
   */
  loadAjax() {
    // 设置ajax请求的baseUrl
    // axios.defaults.baseURL = ''
    // 设置指标查询接口URL
    //  static  real
    /**
     *  设置是否注册更新回调函数,默认状态为false
     *  如果设置为true，在vue 实例销毁函数中需增加取消监听指标消息监听
     *  否则，因为对回调函数存在引用关系，可能无法销毁vue实例(暂未有确切证据)
     */
    axios.indi.setOnUpdateStatus(false)
    Vue.prototype.$http = axios
  },
  loadGlobalVariable() {
    window.HandleCmd = require('./handleCmd'); // 加载全局手机遥控命令
  },
  /**
   * 注册全局自定义组件
   */
  loadCustomComponent() {
    Vue.component('appTemplate', AppTemplate)
    Vue.component('viewTemplate', ViewTemplate)
    Vue.component('popupTemplate', PopupTemplate)
    Vue.component('counter', Counter)
    Vue.use(VueAwesomeSwiper)
  },
  /**
   * 加载vue
   */
  loadVue() {
    Vue.config.productionTip = false
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {
        App
      }
    })
  },
  /**
   * 初始化
   */
  init() {
    this.loadAreaSort();
    this.loadCustomComponent()
    this.loadGlobalVariable()
    this.loadVue()
    this.loadAjax()
  }
}
app.init(); // 走你
