<template>
  <div>
    <el-button @click="addDomain">添加规格参数大分组</el-button>
    <el-form :model="dynamicValidataForm" ref="ruleForm" label-width="200px">
      <!-- 遍历dynamicValidataForm表单中的数据结构 -->
      <el-form-item
        v-for="(domain, index) in dynamicValidataForm.domains"
        :key="index"
        :label="'规格参数大分组' + index"
      >
        <el-input
          v-model="domain.value"
          style="width: 60%; margin-right: 10px"
        ></el-input>
        <el-button @click.prevent="addjieshao(index)">添加小分组</el-button>
        <el-button @click.prevent="removeDomain(domain)">删除大分组</el-button>
        <div
          v-for="(item, index1) in dynamicValidataForm.domains[index].children"
          :key="index1"
          :label="'小分组' + index1"
        >
          <el-input
            v-model="item.chileValue"
            style="width: 60%; margin-right: 10px"
          ></el-input>
          <el-button @click.prevent="removeChild(index, item)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ParamsAdd",
   inject: ["reload"],
  props: {
    treeData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      dynamicValidataForm: {
        //   初始化表单数据 push结构用于添加规格参数的分组
        domains: [
          //   大的分组结构数据
          {
            value: "",
            // 小分组结构数据
            children: [
              {
                chileValue: "",
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    //   添加规格参数大的分组
    addDomain() {
      this.dynamicValidataForm.domains.push({
        value: "",
        // 小分组结构数据
        children: [
          {
            chileValue: "",
            value: "",
          },
        ],
      });
    },
    // 添加大分组的小分组
    addjieshao(index) {
      // console.log('添加小分组');
      this.dynamicValidataForm.domains[index].children.push({
        chileValue: "",
        value: "",
      });
    },
    // 删除小分组  删除的是哪一个index item是结构 ，从外找内
    removeChild(index, item) {
      // 从大的数据结构中找到子机构
      var num = this.dynamicValidataForm.domains[index].children.indexOf(item);
      //  找到了就删除
      if (num !== -1) {
        this.dynamicValidataForm.domains[index].children.splice(num, 1);
      }
    },
    // 删除大分组
    removeDomain(item) {
      var index = this.dynamicValidataForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidataForm.domains.splice(index, 1);
      }
    },
    // 提交表单数据
    submitForm() {
      // 发送网络请求，获取输入哦的表单信息，提交给服务器完成添加功能
      // this.$api.getinsertParam().then()
      // 对象类型的数据不可以直接传递给后台，以前我们都是字符串
      // console.log(this.dynamicValidataForm);
      this.$api
        .getinsertParam({
          itemCatId: this.treeData.cid,
          paramData: JSON.stringify(this.dynamicValidataForm.domains),
        })
        .then(res=>{
            if(res.data.status === 200){
                // console.log("添加成功");
                 this.$message({
            type: "info",
            message: "添加成功",
          });
        //   重新刷新视图
                  this.reload();
// 关闭俩个对话框
this.$emit("tianjiaSucces")
            }
        });
      // console.log(this.treeData);
    },
  },
};
</script>

<style scoped></style>
