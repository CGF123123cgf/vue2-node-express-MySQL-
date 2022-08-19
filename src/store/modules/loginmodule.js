export default {
  //命名空间 作用域的问题 用的时候要写模块名
  namespaced: true,
  state: {
    token: "",
    user: "",
  },
  // 修改state 同步的
  mutations: {
    //    四个方法 供外界使用 设置token 清除token
    // 设置用户，清除用户 组件中使用
    setToken(state, value) {
      state.token = value;
    },
    clearToken(state) {
      state.token = "";
    },
    setUser(state, value) {
      state.user = value;
    },
    clearUser(state) {
      state.user = "";
    },
  },
};
