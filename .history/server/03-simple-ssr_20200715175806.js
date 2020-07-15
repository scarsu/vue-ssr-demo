/**
 * 一个简单的ssr实例
 * 整合了vue-router
 */
// 创建一个express实例
const express = require('express')
const server = express()

// 导入vue
const Vue = require('vue')

// 引入ssr工厂函数
const {createRenderer} = require('vue-server-renderer')

// 创建ssr实例
const render = createRenderer()

// 导入路由插件并安装
const Router = require('vue-router')
Vue.use(Router)

// express拦截一切路由，再通过router.push(req.url)
server.get('*', async (req, res) => {
  // 创建一个路由器实例
  const router = new Router({
    routes:[
      {path:'/',component:{template:'<div>index</div>'}},
      {path:'/detail',component:{template:'<div>detail</div>'}}
    ]
  })

  // 构建渲染页面内容
  const vm = new Vue({
    router,
    data(){
      return {
        name:'hello ssr + vue-router'
      }
    },
    template:`
      <div>
        <router-link :to="{path:'/'}">index</router-link>
        <router-link :to="{path:'/detail'}">detail</router-link>
        <div>{{name}}</div>
        <router-view></router-view>
      </div>
    `
  })

  try {
    // 路由跳转
    router.push(req.url)

    // 渲染: 得到html字符串
    const html = await render.renderToString(vm)

    // 发送回前端
    res.send(html)
  } catch (error) {
    res.status(500).send('500')
  }
})

// 监听端口
server.listen(3000)