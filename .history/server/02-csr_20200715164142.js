// 客户端渲染，返回给客户端的只是页面骨架，没有实际内容
// 真正的内容是在客户端使用js动态生成的
const express = require('express')
const server = express()

server.get('/',(req,res)=>{
  res.send(`
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <div id="app">{{msg}}</div>
  <script>
    new Vue({
      name:'hello csr',
      data:{
        msg:'hello csr
      },
      el:'#app'
    })
  </script>
  `)
})

server.listen(3000,()=>{
  console.log('csr server is running on 3000')
})