/**
 * 传统web开发
 * 直接返回html，所见即所得
 */
const express = require('express')
const server = new express()

server.get('/',(req,res)=>{
  res.send(`
    <h1>hell express</h1>
    <p>ok</p>
  `)
})

server.listen(3000,()=>{
  console.log('server is running on 3000')
})