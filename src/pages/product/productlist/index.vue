<template>
  <div>
    <el-button type="primary" @click="addProduct">增加商品</el-button>
    <element-table :tableData="tableData">
      <!-- 列  prop 数据源的key   show-overflow-tooltip 每一列都不换行 label 显示的文字 -->
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="商品编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="image"
        label="商品图片"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="sellPoint"
        label="商品卖点"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="price"
        label="商品价格"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="num"
        label="商品库存"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="descs"
        label="商品描述"
      ></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </element-table>
    <!-- 分页 -->
    <ProductPager @currentPageEvent="getCurrentPageData" />
    <!-- 增加商品对话框 -->
    <el-dialog
      title="增加商品"
      :visible.sync="dialogProductVisible"
      width="80%"
    >
      <el-form ref="form" :model="product" label-width="80px">
        <el-form-item label="类目选择">
          <span>{{ categoryData.name }}</span>
          <el-button @click="dialogProductCategoryVisible = true"
            >选择类型</el-button
          >
          <!--二级对话框 展示tree -->
          <el-dialog
            append-to-body
            width="60%"
            title="商品类目"
            :visible.sync="dialogProductCategoryVisible"
          >
            <ProductTree @ontreedata="gettreedata" />
            <span
              ><el-button
                type="primary"
                @click="dialogProductCategoryVisible = false"
                >确认</el-button
              ></span
            >
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品名称"
          ><el-input v-model="product.title"></el-input
        ></el-form-item>
        <el-form-item label="商品卖点"
          ><el-input v-model="product.sellPoint"></el-input
        ></el-form-item>
        <el-form-item label="商品价格"
          ><el-input v-model="product.price"></el-input
        ></el-form-item>
        <el-form-item label="商品图片">
          <span>{{ uploadimage.url }}</span>
          <el-button @click="dialoguploadVisible = true">上传图片</el-button>
          <!-- 点击上传图片要 显示的对话框 -->
          <el-dialog
            title="上传图片"
            width="40%"
            :visible.sync="dialoguploadVisible"
            append-to-body
          >
            <ProductUpload @onUpload="getUpload" />

            <span slot="footer" class="dialog-footer"
              ><el-button type="primary" @click="dialoguploadVisible = false"
                >确认</el-button
              ></span
            >
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品库存"
          ><el-input v-model="product.num"></el-input
        ></el-form-item>
        <el-form-item label="商品描述"
          ><ProductWangEditor @oneEditor="geteEditor"
        /></el-form-item>
      </el-form>
      <el-button @click="dialogProductVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitproductHandle">提交</el-button>
    </el-dialog>
    <!-- 修改商品对话框  要显示数据 -->
    <el-dialog
      title="修改商品"
      :visible.sync="dialogeditorProductVisible"
      width="80%"
    >
      <el-form ref="form" :model="product" label-width="80px">
        <el-form-item label="商品名称"
          ><el-input v-model="product.title"></el-input
        ></el-form-item>
        <el-form-item label="商品卖点"
          ><el-input v-model="product.sellPoint"></el-input
        ></el-form-item>
        <el-form-item label="商品价格"
          ><el-input v-model="product.price"></el-input
        ></el-form-item>

        <el-form-item label="商品库存"
          ><el-input v-model="product.num"></el-input
        ></el-form-item>
      </el-form>
      <el-button @click="dialogeditorProductVisible = false">取 消</el-button>
      <el-button type="primary" @click="updatesubmitproductHandle"
        >提交</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import ElementTable from "../../../components/element-table";
import ProductPager from "../productpager";
import ProductTree from "../producttree";
import ProductUpload from "../productupload";
import ProductWangEditor from "../productwangeditor";
export default {
  name: "ProductList",
  // 加载广播机制
  inject: ["reload"],
  components: {
    ElementTable,
    ProductPager,
    ProductTree,
    ProductUpload,
    ProductWangEditor,
  },
  data() {
    return {
      tableData: [],
      // 当前页面
      page: 1,
      // 控制添加商品对话框的显示与隐藏
      dialogProductVisible: false,
      // 提交商品对话框表单的数据
      product: {},
      dialogProductCategoryVisible: false,
      // 商品选择的类目 由producttree 传过来
      categoryData: {},
      //上传图片对话框是否显示 默认不显示
      dialoguploadVisible: false,
      // 图片对象
      uploadimage: {},
      // 富文本编辑器内容数据
      ueditorData: "",
      // 编辑产品对话框显示与隐藏
      dialogeditorProductVisible: false,
      // 获取更新商品的Id 点击编辑的回调函数中获得的row .id
      updateId: "",
    };
  },
  // 生命周期函数
  mounted() {
    this.http(1);
  },
  methods: {
    http(page) {
      this.$api
        .getProductByPage({
          page,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status == 200) {
            this.tableData = res.data.data.result;
          }
        });
    },
    // 分页器数据
    getCurrentPageData(page) {
      // console.log(page+"传过来的");
      this.page = page;
      this.http(page);
    },
    // 编辑修改 index 是第几行，row是这行的详细信息
    handleEdit(index, row) {
      this.updateId = row.id;
      // console.log(index,row);
      // 调用预更新接口获取数据，并赋值给data中的数据 完成回传显示
      this.$api
        .getpreupdate({
          id: row.id,
        })
        .then((res) => {
          // console.log(res.data);
          // 给数据list重新赋值 数据双向绑定的，所以可以显示
          if (res.data.status === 200) {
            this.product = {
              title: res.data.data.title,
              sellPoint: res.data.data.sellPoint,
              price: res.data.data.price,
              num: res.data.data.num,
            };
            // console.log(res.data);
          }
        });
      // 显示对话框
      this.dialogeditorProductVisible = true;
    },
    // 删除商品
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          this.$api.getDeleteProductByid({ id: row.id }).then((res) => {
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
      // console.log(index,row);
    },
    // 打开添加商品 对话框
    addProduct() {
      this.dialogProductVisible = true;
    },
    // 提交添加商品事件
    submitproductHandle() {
      this.$api
        .getinsertTbItem({
          title: this.product.title,
          cid: this.categoryData.cid,
          sellPoint: this.product.sellPoint,
          price: this.product.price,
          num: this.product.num,
          desc: this.ueditorData,
          image: this.uploadimage.url,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            // 关对话框 添加成功
            this.dialogProductVisible = false;
            //  刷新页面 查询第一页
            // this.$router.replace("/product");
            // this.http(1)
            // // 传出事件让productlist重新请求数据
            // this.http(this.page);
            // 全局刷新页面
            this.reload();
          } else {
            // 添加失败
            this.$message("添加失败，请重新添加");
          }
        });
    },
    // 更新修改商品数据 需要更新的接口
    updatesubmitproductHandle() {
      // 调用更新商品接口 传给后台要获取的id  并把商品参数信息传给后台
      this.$api
        .getupdatedproduct({
          id: this.updateId,
          title: this.product.title,
          sellPoint: this.product.sellPoint,
          price: this.product.price,
          num: this.product.num,
        })
        .then((res) => {
          // console.log(res);
          // 更新成功
          if (res.data.status === 200) {
            this.dialogeditorProductVisible = false;
            // 刷新页面
            this.reload();
          }
        });
    },
    // 获取类目数据
    gettreedata(data) {
      this.categoryData = data;
    },
    // 获取图片信息
    getUpload(data) {
      this.uploadimage = data;
    },
    // 获取富文本内容
    geteEditor(data) {
      // console.log(data);
      this.ueditorData = data;
    },
  },
};
</script>

<style scoped></style>
