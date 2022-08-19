// 前端路由
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/pages/login";
import Content from "@/pages/content";
import Params from "@/pages/params";
import Product from "@/pages/product";
import LayOut from "@/pages/LayOut"
import store from "../store"
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      isLogin:false
    }
  },
  {
    path: "/",
   
    component: LayOut,
    children:[
      // 重定向
      {
        path: '/', redirect: '/product' 
      },
      {
        path: "product",
        name: "Product",
        component: Product,
        meta:{
          isLogin:true
        }
      },{
        path: "params",
        name: "Params",
        component: Params,
        meta:{
          isLogin:true
        }
      },{
        path: "content",
        name: "Content",
        component:Content,
        meta:{
          isLogin:true
        }
      },
    ]
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局导航守卫  权限管理 路由跳转之前触发
router.beforeEach((to,from,next)=> {


  // 需要登录 里面进一步处理 
  // 有token 放行 没token 跳转到登录页面 哪个路由需要登录加 加meta 元信息islogin
  if(to.meta.isLogin){
    // 判断的是有token引入store读取模块中的token
    if(store.state.LoginModule.token){
      next();
    }else{
      next({
        path:"/login"
      })
    }
  }
  // 不需要登录的直接放行
  next() ;
  
})

export default router;
