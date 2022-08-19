// 封装axios 导出实例化的对象 并添加网络拦截器 （包括请求拦截器和相应拦截器）

//1引入
import axios from "axios";
// 处理post请求参数的格式处理 默认是对象 ，要转成字符串服务器 才能处理
import qs from "querystring";
import store from "../store";
// 错误信息处理函数 相应状态码
// 状态码，信息码
const erroerHandle = (status, other) => {
  switch (status) {
    case 400:
      //   请求次数限制
      console.log("客户端请求的语法错误，服务器无法理解");
      break;
    case 401:
      console.log("	请求要求用户的身份认证,用户信息验证失败 token失效");
      break;
    case 403:
      console.log("请求被限制，服务器不让访问");
      break;
    case 404:
      console.log(
        "客户端错误（请求地址错误）  服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置您所请求的资源无法找到的个性页面"
      );
      break;
    default:
      // 其他信息 有错误就打印出错误
      console.log(other);
      break;
  }
};

// 2创建axios 实例对象 可以配置多个实例对象 对应多个服务器
const instance = axios.create({
  // 超时处理
  timeout: 5000,
});
//  全局配置axios默认值 将被用在各个请求的配置默认值 也可直接写在 和timeout平级的地方 都是全局的
// instance.defaults.baseURL = 'https://api.example.com';
// token
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// post的请求格式
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 拦截器

// 添加请求拦截器   普通函数 改成箭头函数 错误 信息要额外处理 成功信息也要处理

instance.interceptors.request.use(
  (config) => {
    // 请求处理  每个请求都会经过这个处理  config是请求的配置信息 包括请求方法请求。。。
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    // 把storelogin模块的token存在认证信息中，下次的网络请求就有这些信息
    if (store.state.LoginModule.token) {
      // 看是否是同一用户，如果用户出错啦，就后台经过过滤器的处理返回错误信息，让用户重新登录（这个没做）
      config.headers.Authorization = store.state.LoginModule.token;
    }
    // 在发送请求之前做些什么  对发送请求信息做一些更改 改完要还给人家 return出去
    return config;
  },
  (error) => {
    // 对请求错误做些什么  返回的 是proimse 随意 axios.then 。catch可以接收到
    Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  // 服务器响应成功
  (response) => {
    //   console.log(response);  看状态码 200 说明返回数据正确 promise掉用resolve  axios调用。then
    return response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response);
  },
  // 服务器相应失败
  (error) => {
    // 对象的解构
    const { response } = error;
    if (response) {
      //   如果有错误 调用函数处理
      erroerHandle(response.status, response.data);
      //  返回一个失败的promise
      return Promise.reject(response);
    } else {
      //  服务器没有相应 断网 连状态码都没有
      console.log("断网，网络请求中断");
    }
  }
);
// 导出封装好的instance
export default instance;
