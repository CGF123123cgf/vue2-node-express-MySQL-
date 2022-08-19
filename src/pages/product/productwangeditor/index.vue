
   
<template>
  <!-- 2.加载组件 -->
  <div ref="editorElem" style="text-align:left;"></div>
</template>

<script>
// 1.引入组件
import wangeditor from "wangeditor";

export default {
  name: "",
  components: {},
  data() {
    return {
      // 3声明数据
      // 编辑器对象
      editor: null,
      // 文本内容
      editorContent: "",
    };
  },

  mounted() {
    // 4 实例化 富文本编辑器对象
    this.editor = new wangeditor(this.$refs.editorElem);
// 兼容老版本
    this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config
    // 富文本编辑器事件，每次改变会获取html内容
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html;
      // console.log(this.editorContent);
      this.$emit("oneEditor",this.editorContent)
    };
    // 5.配置编辑器的功能
    this.editor.customConfig.menus = [
      // 菜单配置
      "head",//标题
      "bold",//粗体
      "fontSize",//字号
      "fontName",//字体
      "italic",//斜体
      "underline",//下划线
      "strikeThrough",//删除线
      "foreColor",//文字颜色
      "backColor",//背景颜色
      "link",//插入链接
      "list",//列表
      "justify",//对齐方式
      "quote",//引用
      "emoticon",//表情
      "image",//图片
      "table",//表格
      "code",//插入代码
      "undo",//撤销
      "redo",//重复
    ];
    // 创建富文本实例
    this.editor.create()
  },
};
</script>

<style scoped></style>