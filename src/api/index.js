// 封装网络请求函数所以要引入 base,js (请求路径)，require，js(封装好的axios实例对象)
import base from "./base";
import axios from "../utils/request";
const api = {
  // 登录封装函数
  getLogin(params) {
    /**  params 要以对象的形式穿过去就好了
     * axios.post(url,{username:'',password:'})
     */
    // 发送网络请求  相当于完整的后台接口
    return axios.post(base.baseUrl + base.login, params);
  },
  // 注册请求接口
  getRegiste(params) {
     return axios.post(base.baseUrl + base.register, params);
  },
  // 商品查询接口  有参数  get请求参数要加一个对象结构
getProductByPage(params){
  return axios.get(base.baseUrl + base.selectproductbypage,{
    params:params
  })
  },
  //商品总条数
  getTotal(){
    return axios.get(base.baseUrl + base.total)
  },
  // 商品删除接口
  getDeleteProductByid(params){
    return axios.get(base.baseUrl + base.deleteproductbyid,{params})
  },
  // 商品类型接口
getselectproducttypebyid(params){
  return axios.get(base.baseUrl + base.selectproducttypebyid,{params})
},
// 提交添加商品接口
getinsertTbItem(params){
    return axios.get(base.baseUrl+base.insertTbItem,{
      params
    })
},
// 预更新接口
getpreupdate(params){
  return axios.get(base.baseUrl+base.preupdate,{
    params
  })
},
// 更新商品接口
getupdatedproduct(params){
  return axios.get(base.baseUrl+base.updatedproduct,{
    params
  })
},
// 规格参数接口

getselectItemParam(params){
  return axios.get(base.baseUrl+base.selectItemParam,{
    params
  })
},
// 规格参数删除
getparamsdelete(params){
  return axios.get(base.baseUrl+base.paramsdelete,{
    params
  })
},
// 规格参数添加
getinsertParam(params){
  return axios.get(base.baseUrl+base.insertParam,{
    params
  })
},
// 导航分类查询接口
getselectNav(params){
  return axios.get(base.baseUrl+base.selectNav,{
    params
  })
},
// 子导航添加
getinsertnavContentCategory(params){
  return axios.get(base.baseUrl+base.insertnavContentCategory,{
    params
  })
},
// 子导航删除
getdeletenavContentCategory(params){
  return axios.get(base.baseUrl+base.deletenavContentCategory,{
    params
  })
},
// 子导航修改
getupdatenavContentCategory(params){
  return axios.get(base.baseUrl+base. updatenavContentCategory,{
    params
  })
},
//查询广告内容
getelectxinxi(params){
  return axios.get(base.baseUrl+base.electxinxi,{
    params
  })
},
//删除广告内容
getdeletexinxi(params){
  return axios.get(base.baseUrl+base.deletexinxi,{
    params
  })
},
//添加广告内容
getinsertxinxi(params){
  return axios.get(base.baseUrl+base.insertxinxi,{
    params
  })
},




};

// 默认导出别人可以起名字 要在 main。js配置全局对象，挂载到原型上
export default api;
