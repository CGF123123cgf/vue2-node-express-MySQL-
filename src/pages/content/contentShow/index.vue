<template>
  <div>
    <el-button
      v-if="flag"
      class="addBtn"
      type="primary"
      @click="addcontentVisible = true"
      >添加广告内容{{ textContent.name }}</el-button
    >
    <el-table :data="content">
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="广告名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="word"
        label="广告词"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="handledelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加广告内容"
      :visible="addcontentVisible"
      :before-close="handleclose"
    >
      <el-form :model="form">
        <el-form-item label="广告名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告词">
          <el-input v-model="form.word"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addcontentVisible = false">取消</el-button>
        <el-button type="primary" @click="addcontent">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ContentShow",
  inject: ["reload"],
  data() {
    return {
      content: [],
      addcontentVisible: false,
      form: {},
      textContent: {},
      flag: false,
    };
  },
  mounted() {
    this.$bus.$on("nav", (data) => {
      this.flag = true;
      this.textContent = data;

      this.$api
        .getelectxinxi({
          id: data.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.content = res.data.data;
            // console.log(res.data.data);
          } else {
            this.content = [];
          }
        });
    });
  },
  methods: {
    handleclose() {
      this.addcontentVisible = false;
    },
    // 确定添加事件
    addcontent() {
      this.$api
        .getinsertxinxi({
          id: this.textContent.pid,
          name: this.form.name,
          word: this.form.word,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.addcontentVisible = false;
            this.reload();
            this.$message({
              type: "success",
              message: "添加成功",
            });
          } else {
            alert("添加失败");
          }
        });
    },
    // 删除事件
    handledelete(index, row) {
      this.$api
        .getdeletexinxi({
          id: row.id,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.reload();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
  },
};
</script>

<style scoped></style>
