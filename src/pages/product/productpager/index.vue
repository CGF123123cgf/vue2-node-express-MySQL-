<template>
  <!-- 二次封装的el分页器  total 总条数    布局有什么-->
  <el-pagination
    background
    :current-page="currentPage" 
    layout="prev,pager,next"
    :total="total"
    class="pagina"
    @current-change="handleCurrentchange"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "ProductPager",
  components: {},
  data() {
    return {
      total: 0,
    //   高亮效果
      currentPage:1,
    };
  },
  mounted() {

      this.$api.getTotal().then(res=>{
        //   console.log(res.data);
        // 读特殊字符用中括号就行啦
          this.total = res.data.result[0]["count(*)"]
      })
  },
  methods: {
    //  当前页点击事件
    handleCurrentchange(currentPage) {
        // console.log(currentPage);
    //    子传父
    this.$emit("currentPageEvent",currentPage)
    },
  },
 
};
</script>

<style scoped>
.pagina{
   margin-top: 30px;
}
</style>
