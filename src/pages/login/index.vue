<template>
  <div class="login">
    <!-- el组件直接复制  card-->
    <el-card class="box-card">
      <!-- 表单 里面有两个输入框 一个 按钮 elmentui组件 
      ref="form"有读dom的操作
      :model="form"绑定文本内容的
      -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="first">
          <el-form ref="form" :model="form" label-width="80px">
            <!-- 输入框 -->
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input> </el-form-item
            ><el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form></el-tab-pane
        >
        <el-tab-pane label="用户注册" name="second"
          ><el-form :model="register" label-width="80px">
            <!-- 输入框 -->
            <el-form-item label="用户名">
              <el-input v-model="register.username"></el-input> </el-form-item
            ><el-form-item label="密码">
              <el-input type="password" v-model="register.password"></el-input>
            </el-form-item>
           
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="onRegisterSubmit"
                >注册</el-button
              >
            </el-form-item>
          </el-form></el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
// 映射vuex的mutations方法在组件中就可以使用，不有commit
import { mapMutations } from "vuex";
// state自带模块命名空间
// 读取moduleB:{{ this.$store.state.moduleB.countB }}
//  ...mapActions(["moduleA/incrementCountAAction", "moduleA/decrementCountAAction"]),
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      // tab切换默认高亮
      activeName: "first",
      // 对象存注册用户的数据
      register: {
        username: "",
        password: "",
     
      },
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setToken", "setUser"]),
    onSubmit() {
      // 登录的逻辑
      // console.log(this.form);
      // 原始的post请求参数形式就是 对象 请求后端接口 （看 server router.js）成功就返回后端接口的数据send
      //输入用户名和密码才做网络请求
      if (this.form.username && this.form.password) {
        this.$api
          .getLogin({
            username: this.form.username,
            password: this.form.password,
          })
          .then((res) => {
            // 拿到数据进一步处理
            console.log(res.data);
            // 有返回结果要进一步判断是有用户还是没有用户 密码错误  数据库中是否有用户信息 登陆成功还是失败
            // token验证 有token说明数据库中有用户，没有弹窗 告诉没有用户密码错误
            // 返回数据成功 里面有token
            if (res.data.status === 200) {
              // 登陆成功 在本地或者vuex中存token   （很多地方都用，前端路由导航守卫读取token，并决定是跳转到登录页还是进入系统）
              // 存到vuex中
              this.setToken(res.data.token);
              this.setUser(res.data.data[0].username);
              // 本地存储
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", res.data.data[0].username);

              // 跳转到系统的查询页面 走router 全局导航守卫前置的在那读取token看能不能跳
              this.$router.push("/product");
            } else {
              // 返回数据失败，登录失败
              // 用户名密码不正确 用户提示
              // alert(res.data.msg);
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // 用的是element消息提示框
        this.$message("请输入用户名和密码");
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 注册事件
    onRegisterSubmit() {
      // 测试是否能拿到数据
      // console.log(this.register);
      if (this.register.username && this.register.password) {
        // 发送网络请求完成注册
        this.$api
          .getRegiste({
            username: this.register.username,
            password: this.register.password,
          })
          .then((res) => {
            if (res.data.status === 200) {
              this.$message(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
      }else {
        // 用的是element消息提示框
        this.$message("请输入用户名和密码");
      }
    },
  },
};
</script>
<style scoped>
.login {
  width: 100%;
}
.text {
  font-size: 14px;
}
.box-card {
  width: 700px;
  margin: 100px auto;
}
</style>
