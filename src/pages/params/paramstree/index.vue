<template>
  <div>
    <!-- props传过来默认节点的名称 loadNode懒加载的事件  highlight-current选中高亮  -->
    <el-tree @node-click="handleNodeClick" :props="defaultProps" :load="loadNode" lazy highlight-current>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      // 存网络请求的数据，要展示的数据
      data: [],
      defaultProps: {
        children: "children",
        //   匹配的规则  匹配 category名字name 根据name进行展示 根据id和cid 请求数据 ，循环操作
        // 数据再返回给添加商品对话框 productlist
        label: "name",
      },
    };
  },
  methods: {
    //   节点监听事件 id cid name 都有 回传给productlist
    handleNodeClick(data){
// console.log(data);
this.$emit("onparamstreedata",data)
    },
    // 数据通过懒加载的事件，匹配  网络数据请求
    // node 当前节点, resolve返回数据 返回成功的结果 基于promise resolve成功的返回结果
    loadNode(node, resolve) {
        // console.log(node);
        // node是上一条数据
    //    第一级别
      if (node.level === 0) {
       this.$api.getselectproducttypebyid().then(res=>{
            if(res.status === 200){
                // 通过resolve 数据源
               return resolve(res.data.data)
            }else{
                 alert("请求失败")
             }
         })
      }
    //   二级以上的数据
       if (node.level >= 1){
           this.$api.getselectproducttypebyid({id:node.data.cid}).then(res=>{
            if(res.status === 200){
                return resolve(res.data.data)
            }else{
                alert("请求失败")
            }
        }).catch(error=>{
            // 没数据返回空数组
            resolve([])
        })
       } 
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
