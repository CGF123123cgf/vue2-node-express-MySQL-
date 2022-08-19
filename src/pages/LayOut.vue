<template>
  <div>
    <!-- 登录后的布局父组件 -->
    <Nav />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
export default {
  name: "LayOut",
  components: {
    Nav,
  },
};
</script>
<style scoped>
.container {
 padding: 0 200px;
}
</style>
