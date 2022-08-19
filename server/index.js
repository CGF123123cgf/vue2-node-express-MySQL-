// 后端服务器
const express = require ("express")
const app =express()
// 导入路由
const router = require("./router")
// 处理post请求 req 传递参数。body 
const bodyParse = require("body-parser")
// cors 跨域
const cors = require("cors")
app.use(cors())
app.use(bodyParse.urlencoded({
  extended:true
}))
// 中间件 所有路径上加个api
app.use("/api",router)
// cors跨域处理
app.all("*",function(req,res,next){
   res.header("Accexx-Control-Allow-Origin","http://localhost:3003")
   res.header("Accexx-Control-Allow-Headers","Content-Type,Access-Token")
   res.header("Accexx-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
   res.header("X-Powered-By","3.2.1")
   res.header("Content-Type","application/json;charset=utf-8")
   next()
})
app.listen(3003,()=>{
 console.log("服务器运行在3003端口上。。。。");
})