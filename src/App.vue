<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  // 广播机制 在任意组件中调用这个方法 
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    // 具体刷新组件功能
    reload() {
      this.isRouterAlive = false;
      //先改成false ，再改成true ,要在nextTick方法中改为true $nextTick(callback)：
      // 当dom发生变化，更新后执行的回调。将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
};
</script>

<style></style>
