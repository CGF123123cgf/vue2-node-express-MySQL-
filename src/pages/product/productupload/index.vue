<template>
<!-- 上传文件的接口调用action  -->
  <el-upload
    ref="upload"
    action="http://localhost:3003/api/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :limit="1"
    :on-success="uploadHandle"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </el-upload>
</template>

<script>
export default {
  name: "Upload",

  data() {
    return {
       fileList:[]
    };
  },
  methods: {
    handlePreview(file) {
      // 预览事件
    },
    handleRemove(file, fileList) {
      // 移除
    },
    uploadHandle(res, file, fileList) {
      // 图片上传成功后的回调 图片打印的信息 包括name url后端存放的地址
      console.log(res);
      this.$emit("onUpload",res)
    },
    // 图片上传到服务器
    submitUpload() {
      // 写法固定的
      this.$refs.upload.submit();
    },
  },
};
</script>
