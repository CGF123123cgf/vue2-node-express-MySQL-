<template>
  <div>
    <el-tree
      :props="defaultProps"
      :load="loadTreeNodes"
      lazy
      highlight-current
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :render-content="renderContent"
    >
    </el-tree>
    <!-- 添加广告分类对话框 -->
    <el-dialog
      title="添加广告子导航"
      :visible.sync="contentNavAddVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="contentNavname" placeholder="请输入名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="contentNavAddVisible = false">取消</el-button>
        <el-button type="primary" @click="sureHandler">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog
      title="修改广告子导航"
      :visible.sync="contentNavUpdataVisible"
      width="30%"
      :before-close="UpdatahandleClose"
    >
      <el-input v-model="contentNavupdataname" placeholder="请输入名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="contentNavUpdataVisible = false">取消</el-button>
        <el-button type="primary" @click="sureUpdataHandler">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ContentNav",
  inject: ["reload"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      //   添加子导航的显示与隐藏
      contentNavAddVisible: false,
         //   修改子导航的显示与隐藏
      contentNavUpdataVisible: false,
      //   子导航名称
      contentNavname: "",
    //   修改导航名字
      contentNavupdataname:'',
      //   添加子分类的数据包含pid
      currentNavObj: {},
    //   修改pid
    currentupdataObj: {},
    };
  },

  methods: {
    //   懒加载的回调函数
    loadTreeNodes(node, resolve) {
      // 网络请求 resolve 把数据返回给tree显示
      // 一级
      if (node.level === 0) {
        this.$api
          .getselectNav()
          .then((res) => {
            // console.log(res);
            if (res.data.status === 200) {
              return resolve(res.data.data);
            }
          })
          .catch((error) => {
            resolve([]);
          });
      }
      // 二级循环显示
      if (node.level >= 1) {
        this.$api
          .getselectNav({
            id: node.data.pid,
          })
          .then((res) => {
            //   console.log(res);
            if (res.data.status === 200) {
              return resolve(res.data.data);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            resolve([]);
          });
      }
    },
    //   点击节点的回调函数
    handleNodeClick(data) {
      // 有当前点击的数据 id name pid
      //   console.log(data);
      this.$bus.$emit('nav',data)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.editor(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    },

    //   添加显示对话框
    append(data) {
      this.contentNavAddVisible = true;
      // console.log(data);
      this.currentNavObj = data;
      // this.$api.getinsertnavContentCategory
    },
    //   删除
    remove(node, data) {
      this.$api
        .getdeletenavContentCategory({
          id: data.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.reload()
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
    //   修改
    editor(node, data) {
this.contentNavUpdataVisible=true
    this.currentupdataObj=data

    },
    //   添加广告子导航对话框关闭的回调函数
    handleClose() {
      this.contentNavAddVisible = false;
    },
    //   添加事件
    sureHandler() {
      this.$api
        .getinsertnavContentCategory({
          pid: this.currentNavObj.pid,
          name: this.contentNavname,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.contentNavAddVisible = false;

            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.reload();
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
            });
          }
        });
    },
    // 修改对话框X关闭
    UpdatahandleClose(){
this.contentNavUpdataVisible=false
    },
    // 确认修改
    sureUpdataHandler(){
this.$api.getupdatenavContentCategory({
    id:this.currentupdataObj.pid,
    name:this.contentNavupdataname
}).then(res=>{
    if (res.data.status === 200) {
            this.contentNavUpdataVisible = false;

            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.reload();
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
})
    }
  },
};
</script>

<style scoped></style>
