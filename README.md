# myshop

## Project setup
npm install
npm run serve
npm run build
 

### 项目介绍
# 项目总的是四个大的功能模块  登录注册 商品查询  规格参数 内容分类管理  有权限管理  各种增删改查 还有一些项目的常用小功能 

## 准备工作 开发环境的搭建 VScode（配置一些常用的插件） 谷歌浏览器 nodejs mysql安装  全局安装vuecli 全局安装webpack
设置淘宝镜像 比npm快
1.安装npm install cnpm -g --registry=https://registry.npm.taobao.org
2. 改变默认下载地址 可以使用npm config set registry https://registry.npm.taobao.org来改变默认下载地址，达到可以不安装cnpm就能采用淘宝镜像的目的，
3.可以使用npm config get registry查看npm的仓库地址 
4 . 用cnpm 代 npm
nrm 用于切换
npm install nrm -g                  //后续还要用，就直接装到全局中，一次安装，永久使用
nrm ls 
nrm use cnpm
nrm use npm  
## 思想   注意目录  有发送就有接收 
前后台交互 后台通过数据前台访问（input输入框输入信息，然后前端获取输入框的信息传给后台）接口 ，给前台发送数据，前端axios.then() 接收到数据 ，列表展示。
 总的思路是根据需求设计数据表，根据数据表的参数设计接口 ，前端根据接口传参获取数据或者得到数据，或者完成，某个操作。
前端页面根据后端参数的需要，在页面遍历展示或者放input输入框。

可以在开一个终端，安装依赖 ，和跑后台服务项目
cd  转到对应目录 tab 补全路径
先有后台接口 ，再有前台数据访问接口（封装axios请求函数）

#项目步骤
### 前台项目
# 1.安装项目
vue2 vue cli3 
vue create myhop
选之前安装的配置 vue2 
精简前台项目：
把原始项目删除，变成一个空项目
# 2。vue add element   要在空项目中安装add 才能成功 因为add会改变项目的目录holleoworld
Still proceed? Yes(继续)
Import on demand（按需）
zh-CN（中文）
按需引入复制 代码 打开element官网 看按需加载 复制到 plugs element。js 
运行项目打开 看到elbutton 说明配置成功

pages文件夹
1.先创建页面， 效果图 有四个大的视图 所以创建四个文件夹组件
 登录页 查询  规格参数，内容管理
创建文件夹 因为还有可能有子文件 
要实现路由嵌套
创建二级路由组件的父组件 Layout 这样和login组件同为一级路由组件，可实现权限管理
创建导航nav组件 共享导航  在layout组件中引入并使用，同时加上routeview 显示二级路由组件
创建好页面就配置路由规则
重定向 指向 商品查询页
index.js 
最后nav导航routerlink to 实现跳转(要用elementui)
2导航的实现
menu 导航  初始化css 并在main.js中引入（内边距啥啦）
图标 
bug class="routter-text"增加routerlink的大小
vue看组件是否被加载 看位置

elementui 效果配不出来 是因为对属性不了解

3.登录判断 (权限的处理)（路由权限管理 添加导航守卫 判断 isLogin token 本地存储 vuex ）
a.添加导航守卫
meta:{
      isLogin:false
    }
/ /全局导航守卫  权限管理
router.beforeEach((to,from,next)=> {


  // 需要登录 里面进一步处理 
  // 有token 放行 没token 跳转到登录页面 哪个路由需要登录加 加meta 元信息islogin
  if(to.meta.isLogin){
    // 判断的是token
    if(false){
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

aap.vue 根组件会被加载 所以放routerview显示 一级路由组件 login layout

4。完善登录页面的组件(登录页面ui)
先不加样式 慢慢调 把组件先复制过来
添加el组件  调整样式 看最外层的样式 可以调试元素的样式

5.后台登录接口的实现
a.获取输入的内容  ，this.from.password  数据双向绑定
给登录按钮绑定事件，在回调函数中可以，获取到数据 ，获取到数据传给后端验证
b.发送网络请求， 登录的接口，回调函数中 ，查询后台数据库中是否存在用户名和密码，如果存在返回token 登录成功
跳转到系统查询商品页面进入系统，如果登录返回登录失败的信息
写后端接口。新建router.js 文件 导出 index。js 导入
router.post("/login",(req,res)=>{
    const username = req.body.username
    const password =req.body.password
    res.send({
        <!-- 先不连接数据库 -->
        username:username,
        password:password
    })
})
x-www-form-urlencoded 格式body
postman 测试接口
c.关联数据库 

  1.启动数据库 打开 菜单 mysql workbance
之前安装了MySQL 并配置了用户名是root ,密码是admin123 ，运行在端口 3306
安装 后台项目  cnpm i mysql -S  模块 
写一个mysql 文件用于导出数据库对象（或者函数），谁用谁导入 

mysqlconnect .js  连接数据库 ，封装操作数据库的函数，导出供外界使用
router ,js
在路由的回调函数中操作数据库 并返回结果
回掉函数相当于一个函数里面执行 想当于外面执行 所能接到参数 result
根据result判断是否有查询到用户

postman 测试接口 停在那说明，接口，不对改服务端代码，看报错信息


d.接口有了前台访问 --- 
通过axios （要封装） 然后以点登录（回调函数中）就调用网络请求 然后拿到结果，然后根据
token（后台生成）
判断是否登录 
决定跳转的页面
src 程序员 源码 utils 
request,js(封装axios实例对象) 
创建实例对象，配置全局对象， 添加拦截器，封装错误信息处理函数
安装axios cnpm i axios -S
axios看云 看规范
api base.js（网络请求的路径） index.js (封装网络请求函数 导出一个api 对象，并在main.js中挂载，任何组件this.$api.自己的网络函数)

登录组件使用封装好的请求函数，发送网络请求 （如登录页面调用(回调函数中)，this.$api.getLogin()）
为了方便使用
import api from "./api/index"
Vue.prototype.$api=api

配置跨域 vue.config.js

vue官网生态，vuecli 配置参考 devserveproxy 代理
修改配置文件要重启前端项目
前端发送网络请求
 后端返回查数据库返回数据
  前端接收 。then()做进一步处理token验证有token 说明登陆用户名密码正确 跳转到系统中
  没有就提示弹窗msg 登陆用户名密码不正确
    .cath

e. 后台生成 token返回给前端
token的组成 用户名密码 过期时间等。。
后台生成token的步骤 
1，建一个文件秘钥 ，2安装jsonwebtoken 用方法创建一个秘钥即可。
 cnpm i -S jsonwebtoken
 router.js 文件中生成token因为它给前台返回东西
jwt调用.sign
 token两个点 分割的字符串结构

 f。 vuex和本地存储token
 1.vuex 中存储token和user
 步骤：在store 中创建modules loginmodule.js 并在index中引入，穿件loginmodule 存储登录模块的信息  有自己的state mutation。。。存token和username  创建mutation方法，在组件login index.vue中map引入模块中的方法，登录逻辑方法onsumit 修改数据，调用方法存储到vuex中。
2.存储vuex中后要使用。 全局导航守卫读取token 看是否登录看是否放行
前端的router index 引入store ，读取token
缺点是vuex（强制刷新丢失，整个页面刷新）中存储token
3，为了弥补这个缺点，配合本地存储（强制强制刷新不丢失），
login 组件中onsubmit 本地存储
可在application localstorage 看是否存下啦
用户强制刷新说明用户要重新走程序 在main。js（入口文件）中判断用户是否登录过

如果本地有从本地写到vuex中 说明用户登录过 不用再发送网络请求啦 main.js
中写

g.网络请求携带token
下一次的网络请求要携带上token：放在封装好的请求拦截器上
1.requirest.js 引入store 
2.请求拦截器中添加
// 把storelogin模块的token存在认证信息中，下次的网络请求就有这些信息
    if (store.state.LoginModule.token) {
      // 看是否是同一用户，如果用户出错啦，就后台经过过滤器的处理返回错误信息，让用户重新登录（这个没做）
      config.headers.Authorization = store.state.LoginModule.token;
    }

3.检验登录之后检查，network login 看请求头信息
   
 前端根据是否有token 有token跳转到对应页面 否则给用户提示
消息提示框
1.在vuex（强制刷新丢失）中存储token
本地存储token 强制刷新不丢失
如果本地有从本地写到vuex中 不用再发送网络请求啦 main.js
中写
每次发送网络请求携带token 放在请求头上，在请求拦截器上鞋
这个后台要配合使用 通过过滤器（不会写没教）




g 退出登录 

1.添加登录后的视觉效果
导航栏 再加一个结构。显示登录用户的信息
nav公共组件
<el-menu-item index="5" class="user">
        <!-- 读取模块中的用户 -->
      {{this.$store.state.LoginModule.user}}
        <el-button>退出</el-button>
</el-menu-item>

2.实现退出的功能
回调函数中处理
//退出登录的功能： 本地和vuex 要清除 并回到登录页
      // 本地用户信息的清除
      localStorage.removeItem("user");
      localStorage.removeItem("token")
      // vuex用户的清除
      this.clearToken()
      this.clearUser()
      // 回到登录页
      this.$router.replace("/login")

1.清除vuex和本地存储的数据
并跳转到登录页面
h.注册
login 登录页面
el tabs标签页  table切换
1.先写前端页面 tabs切换复制登录el组件 然后修改绑定数据register 实现注册绑定事件，测试是
否能接受到用户注册输入的信息 传给后端，后端写入数据库
2.写注册的接口
router.post("/register", (req, res) => {
  // 接收post提交过来的参数
  const username = req.body.username;
  const password = req.body.password;
  //    操作数据库 调用封装好的连接数据库的函数
  // 定义操作数据库的语句
  const sql = "insert into user values (null,?,?)";
  // 数据库占位符的数组
  const arr = [username, password];
  //调用函数，操作数据库
  SqlConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      // 返回给前端的数据
      res.send({
        status: 200,
        msg: "注册成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "注册失败",
      });
    }
  });
})
3.前台调用
api文件封装注册请求函数，base.js写注册的请求路径，index，js封装请求函数post请求所以有参数
传给后台处理，然后login.vue 组件使用，调用网络请求函数把数据传给后端，.then写一些消息的提示，然后登录测试一下，在数据库中看一下是否注册成功。


### 商品管理
a 查询商品接口
1.创建数据库表
2.编写查询商品接口（router.js），浏览器中测试接口数据
3.前端获取商品数据
pages文件夹中新建productlist文件夹（真正发送网络请求，获取数据,为了项目的结构更清晰）
每个组件都是独立的视图，属于谁的组件就放在哪个文件夹中，
api 配置网络请求函数，先网络请求地址，再网络请求函数
最后在productlist文件中组件生命周期函数中发送网络请求  axios $api 获取数据
.then log打印输出测试一下 

4.表格展示数据
element 表格 二次封装 插槽
components公共组件 elemet-table 一个系统的表格风格一直所以进行二次封装 element 表格
在product productlist引用表格显示数据
表格添加列
layout布局添加样式padding 上下为0 左右为200px
效果没出来，强制刷新一下就出来啦
组件的属性
5 ，分页器
电脑分页器，手机端上拉加载更多
独立的公共能 二次封装
私有组件产品的分页器，
prduct productpager 总共多少条数据要有一个接口，查询有多少条数据
6，分页器的引用实现
数据总条数接口：实现router.js   浏览器中测试 http://localhost:3003/api//total

productlist里引入分页组件
分页器中获取总条数，发送网络请求

分页器中，点击事件显示对应页面
分页器组件传给productlist组件，点击的page页数，
productlist重新发送网络请求
http函数封装成根据页数进行跳转
7，删除功能
表格 自定义表格 修改删除 有现成的代码 实现对应的方法
宽度大点儿 
删除功能，要有对应的接口根据穿过来的id进行删除。
后端删除接口：http://localhost:3003/api/deleteproductById？id=1
productlist组件中前端点击删除按钮，在对应的方法中发送网络请求，传入id ,调用后端删除接口完成删除功能。
弹窗 确认消息
删除完UI视图要刷新  存起来分页器中的页数，删除成功 重新调用 http函数刷新当前页。
8，添加商品 
 A 类目的选择   商品的类型
 productlist 组件中  增加商品 按钮 回调函数 弹出element Dialog 对话框 
 嵌套form表单 输入商品的信息 
类型选择 对话框中再弹出一个对话框，内层对话框 append-to-body 
tree 独立的功能  product producttree 有自己的数据库category分类
id 大的类目 cid小的二级目录分类
后台接口，用于获取数据库中的数据
浏览器中测试数据 http://localhost:3003/api/selectproducttypebyid
配置前端axios访问接口
producttree 中获取数据并显示 
在productlist中调用producttree
数据再返回给添加商品对话框 productlist
B 上传图片功能
productlist 组件 点击上传按钮 应该弹出一个对话框 完成上传到服务器功能
 
elemenet上传图片组件 
Upload 上传   代码差不多就是属性配置的不同
选择的是手动上传  
第一件事是完成后台上传接口。先有接口才能完成功能
第二 前台 图片上传对话框
product  productupload 完成产品上传到服务器的功能。然后在productlist中引入
productupload 子传父 productlist 回传显示上传的路径 

C 富文本编辑器  商品描述 

### 富文本编辑器：
    1. wangEditor（国产，基于javascript和css开发的web富文本编辑器，开源免费）优势：轻量简介，最重要的是开源且中文文档齐全。缺点：更新不及时。没有强大的开发团队支撑。http://www.wangeditor.com/
    2. UEditor（百度）优势：插件多，基本曼度各种需求，由百度web前端研发部开发。缺点：插件提交较大，网页加载速度相对就慢了些。使用复杂。属于前后端不分离插件。在使用时需要配置后端的一些东西，使用不便。
    3. Kindeditor （） 优势：文档齐全，为中文，阅读方便。缺点：图片上传存在问题，上传历史过多，会全部加载，导致浏览器卡顿。
    4. Tinymce也是一款不错的富文本编辑器，种植，各有优势和劣势，关键是选择一款最适合的就好。因为笔者在开发vue，所以直接使用vue-quill-editor较为方便些。具体看情况使用。
中后端
<!-- 第三方 github vue-ueditor https://github.com/haochuan9421/vue-ueditor-wrap 下载utf-8jsp 凡在public 并名为 UEditor  -->
<!-- 或者找vue官网 资源 awesome 组件  -->
wangEditor 轻量级的富文本编辑器
官网：https://www.wangeditor.com/
使用步骤：
cnpm i wangeditor --save
product productwangedtior 封装好富文本编辑器 productlist组件引用
 productwangedtior内容数据回传传给 produclist 用于数据提交

d 产品信息添加完成
 第一先有服务器接口 router.js http://localhost:3003/api/addproducts
 第二前台配置axios 并 productlist 提交按钮 调用 更新提交要整体刷新 刷新功能
 刷新功能 app.vue 广播机制
e预更新  数据回传显示
管理系统后台可能很多人在修改，为了避免同时修改一个产品数据的信息延迟，后台重新请求数据显示在对话框中
http://localhost:3003/api/preUpdatebyid?id=10068
写预更新接口 router.js ,配置前台axios，前端复制添加商品对话框，点击编辑，弹出对话框，发送网络请求id，then() res数据重新赋值给product用于显示，点提交关闭对话框
f更新商品

编写更新接口，/updateTproductbyid  配置axios
提交的回调函数中 发送axios请求 ，更新数据 row.id 提交product里的数据，双向绑定很方便。

### 规格参数
1 查询规格参数：
paramslist文件用于列表展示  ，编写后台查询规格参数接口,paramslist在生命周期函数mounted中发送网络请求进行数据赋值，数据双向绑定，然后引入封装好的el-table 展示数据。 
删除规格参数：
2  在paramslist组件表格后面添加一个删除按钮。
同理，要完成删除功能，在后台router.js中先编写后台删除接口，前端配置axios请求。删除按钮的回调函数中，发送axios请求调用后端删除规格参数接口，完成规格参数删除功能，并调用reload方法重新加载组件内容。
添加规格参数功能：
规格参数对话框：
商品类目对话框实现：
paramslist 表格上面添加一个添加规格参数的按钮弹出一个对话框完成规格参数数据的获取，在下面再编写一个对话框，在添加规格参数按钮的回调函数中，决定该对话框的显示，两个对话框，商品类目的选择，tree结构（ 用于获取cid）,新建paramstree文件夹复制之前添加商品的tree。完成商品类目的展示。
规格参数分组对话框的实现：
在商品类目对话框中点击确认并添加分组打开嵌套的对话框，
添加分组对话框包括规格参数的分组和具体规格参数的名称（用于获取规格参数的数据）。
添加规格参数分组写成了独立的组件。paramsAdd文件中实现，并在paramslist中引入该组件。
在paramsAdd下index.vue中，添加一个添加规格参数分组的按钮,生成一个大的分组默认包括一个小的分组，大小分组都可以删除和添加。运用v-for循环实现读取数据，数据使用Form表单展示。

调用规格参数添加接口完成添加规格参数的功能：编写接口 /insertParams
配置前端请求函数，在paramsAdd组件中获取表单中输入的规格参数数据和商品类目的cid，在提交按钮回调函数中，完成规格参数的添加并刷新视图组件关闭当前对话框。
### 内容分类
两部分
 导航： 最终效果是右边是一个广告分类的tree 可以无限添加删除修改，
 在content文件夹中，新建两个文件夹，contentNav和contentShow在各自文件家中创建index.vue,用于展示广告导航和，广告内容展示。在content，index.vue中引入并使用两组件。

 两个部分的数据都是存在后台数据库中的，所以创建两个数据库用于数据存储，content存导航数据，contentinfo广告具体信息。
 id分类pid是进一步的子分类
 写后台接口 ，Nav查询 接口
 视图 事件 接口 

 router.js接口编写获取导航数据,然后配置前端api,在contentNav中发送网络请求，获取导航数据
并以tree的形式展示数据。
  第三部是 el-tree 增加一个属性 :render-content="renderContent"就可在tree后面添加操作按钮，
  添加弹出一个对话框
  
  并在各自的回调函数中调用各自后台接口 完成 分类的添加 删除 修改。  

 





# 3.搭建服务器端 前后端同时运行（可调用接口）
项目根目录加一个serve服务端
cnpm i mysql jsonwebtoken express -S
转到服务端文件夹
安装
# 后台服务项目 
服务器端环境的搭建 
服务器和前台项目的依赖分开装，项目上线的时候没有服务器的东西
为了实现登录与注册的功能，搭建服务器端
 项目根目录创建server 自己的服务器
 index.js 主入口 创建服务器
 router.js 后端接口文件

 项目根目录加一个server服务端
转到服务端文件夹
安装
cnpm i express -S
a、安装nodemon 服务端代码同步更新
npm install -g nodemon
b、node启动服务与nodemon启动服务（进入项目文件夹后，执行启动文件。 修改代码会自动重启服务器，比较方便）
 nodemon index.js
server文件夹里有
写基本服务index.js 入口文件 提供服务的
写路由配置router.js 配置后端路由
在index.js中用router。js 

自己学会百度错误
上是上个运行的命令

6.关联数据库 
 1.启动数据库 打开 菜单 mysql workbance
之前安装了MySQL 并配置了用户名是root ,密码是admin123 ，运行在端口 3306
安装 后台项目  cnpm i mysql -S  模块 
写一个mysql 文件用于导出数据库对象（或者函数），谁用谁导入 

mysqlconnect .js  连接数据库 ，封装操作数据库的函数，导出供外界使用
router ,js
在路由的回调函数中操作数据库 并返回结果
回掉函数相当于一个函数里面执行 想当于外面执行 所能接到参数 result
根据result判断是否有查询到用户

7, router.js 文件中后台生成 token返回给前端

token的组成 用户名密码 过期时间等。。
后台生成token的步骤 
1，建一个文件秘钥 config.js，2安装jsonwebtoken 用方法创建一个秘钥即可。
  cnpm i -S jsonwebtoken
 router.js 文件中生成token因为它给前台返回东西
jwt调用.sign
 token两个点 分割的字符串结构
 
8 , postman 测试登陆接口 停在那说明，接口，不对改服务端代码，看报错信息
9，配置前后端同时运行的命令
修改前台的配置
package.json
安装模块
cnpm i -g concurrently
"dev":"concurrently \"npm run serve\" \"nodemon mock/index.js\"" 
npm run dev 同时运行前后端
10，至此登录接口完成，现在要前台访问接口（封装axios请求接口函数，因为端口不一样，所以要配置跨域 
要重启前台项目 改了webpack的配置）
对应视频5
自己学会百度错误
上是上个运行的命令





