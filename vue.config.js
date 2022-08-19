module.exports = {
  // 配置代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3003/",
        pathRewrite: {
            // 重写地址
          "^/api": "",
        },
        // 允许跨域
        changeOrigin: true,
      },
    },
  },
};
