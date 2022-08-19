<template>
  <div>
    <!-- 导航栏 -->

    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- <el-menu-item index="1"><span>商城后台管理系统</span></el-menu-item> -->
      <!-- <h1>商城后台管理系统</h1> -->
      <el-menu-item index="2">
        <router-link class="routter-text" to="/">
          <i class="el-icon-search"></i>
          商品查询</router-link
        >
      </el-menu-item>
      <el-menu-item index="3">
        <router-link class="routter-text" to="/params"
          ><i class="el-icon-document"></i>规格参数</router-link
        ></el-menu-item
      >
      <el-menu-item index="4">
        <router-link class="routter-text" to="/content"
          ><i class="el-icon-postcard"></i>内容管理</router-link
        ></el-menu-item
      >
      <el-menu-item index="5" class="user">
        <!-- 读取模块中的用户 -->
      {{this.$store.state.LoginModule.user}}
        <el-button @click="logout">退出</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import{mapMutations} from "vuex"
export default {
  name: "",
  components: {},
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    ...mapMutations("LoginModule",["clearToken","clearUser"]),
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    logout(){
      //退出登录的功能： 本地和vuex 要清除 并回到登录页
      // 本地用户信息的清除
      localStorage.removeItem("user");
      localStorage.removeItem("token")
      // vuex用户的清除
      this.clearToken()
      this.clearUser()
      // 回到登录页
      this.$router.replace("/login")
    }
  },
};
</script>

<style scoped>
.el-menu-demo {
  padding: 0 200px;
}
.routter-text {
  display: block;
  width: 100%;
  height: 100%;
}
.user{
  /* 权重不够  */
  float: right!important;
}
</style>
