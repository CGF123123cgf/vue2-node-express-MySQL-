<template>
    <el-table :data="tableData" style="width:100%">
        <slot></slot>
    </el-table>
</template>
<script>
export default {
    // 二次封装   可以做 样式结构的修改
    name:"ElementTable",
    // 父传子
    props:{
      tableData:{
          type:Array,
          default:()=>{
              return []
          }
      }
    }
}
</script>