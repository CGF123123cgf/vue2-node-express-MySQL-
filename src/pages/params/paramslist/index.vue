<template>
  <div class="params">
    <div>
      <el-button type="primary" @click="addParamsHandle"
        >添加规格参数</el-button
      >
    </div>
    <element-table :tableData="tableData">
      <el-table-column width="100px" prop="id" label="数据id"></el-table-column>
      <el-table-column
        width="100px"
        prop="itemCatId"
        label="商品分类id"
      ></el-table-column>
      <el-table-column prop="paramData" label="规格参数数据"></el-table-column>
      <!-- 删除按钮 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="handledelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </element-table>
    <!-- 添加规格参数对话框  包括两个对话框，第一个是商品类目的选择第二个是添加规格参数的分组和具体规格参数的名称-->
    <!-- 商品类目的选择对话框tree引入之前分装好的 -->
    <el-dialog
      append-to-body
      width="50%"
      title="商品类目选择"
      :visible.sync="paramsVisible"
    >
      <ParamsTree @onparamstreedata="getTreeData" />
      <el-dialog
        append-to-body
        width="50%"
        title="添加规格参数分组"
        :visible.sync="groupparamsVisible"
      >
        <ParamsAdd :treeData="treeData" @tianjiaSucces="ParamsAddsuccess" />
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paramsVisible = false">取消</el-button>
        <el-button type="primary" @click="groupVisiblehandler"
          >确认并添加规格参数分组</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 查询数据列表展示
import ElementTable from "../../../components/element-table";
import ParamsTree from "../paramstree";
import ParamsAdd from "../paramsAdd";
export default {
  name: "ParamsList",
  // 加载广播机制
  inject: ["reload"],
  components: {
    ElementTable,
    ParamsTree,
    ParamsAdd,
  },
  data() {
    return {
      //规格参数列表数据
      tableData: [],
      // 商品类目对话框的显示与隐藏
      paramsVisible: false,
      //   规格参数分组对话框显示与隐藏
      groupparamsVisible: false,
      // 商品类目选择的数据
      treeData: {},
    };
  },
  methods: {
    //   删除规格参数
    handledelete(index, row) {
      // console.log(index,row); index是数组下表 row是这条数据的信息，包括id cid name
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          this.$api
            .getparamsdelete({
              id: row.id,
            })
            .then((res) => {
              if (res.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                // 重新加载组件
                this.reload();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加规格参数 需要cid和规格参数数据
    addParamsHandle() {
      this.paramsVisible = true;
    },
    // 获取treedata 数据，进而获取cid
    getTreeData(data) {
    //   console.log(data);
      // data.cid
      this.treeData = data;
    },
    // 添加分组
    groupVisiblehandler() {
      this.groupparamsVisible = true;
    },
    // 规格参数添加成功
ParamsAddsuccess(){
    this.paramsVisible= false
   
      this.groupparamsVisible=false
},
  },

  mounted() {
    //  查询规格参数
    this.$api.getselectItemParam().then((res) => {
      if (res.data.status === 200) {
        //   拿到了后台数据 表格展示
        //   console.log(res.data);
        this.tableData = res.data.result;
      }
    });
  },
};
</script>

<style scoped></style>
