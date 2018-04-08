/**
 * @author lsz
 * @desc 路由配置信息
 */
import Vue from 'vue'
import Router from 'vue-router'

/* 子路由注册 */
import app1Routers from '@/components/app/app1/router.js'
import app2Routers from '@/components/app/app2/router.js'

Vue.use(Router)
  // 路由配置信息
let baseUrl = '/:userId/:dataType/' // 基路径
export default new Router({
  routes: [{
    path: `${baseUrl}1`,
    name: '1',
    component: r => require.ensure([], () => r(require(`../components/app/app1/App`)), `app/app1`),
    children: app1Routers
  }, {
    path: `${baseUrl}2`,
    name: '2',
    component: r => require.ensure([], () => r(require(`../components/app/app2/App`)), `app/app2`),
    children: app2Routers
  }]
})
