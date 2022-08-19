const base ={
    // 有跨域就加上baseurl,没跨域，就不加 要处理跨域配置 地址前都加/
    // 后台的到http://localhost:3003/
    baseUrl:"/api",
    // 后台网络接口
    login:'/api/login',//登录地址
    register:'/api/register',//注册地址
    selectproductbypage:'/api/selectprodutbypage',//商品查询地址
    total:"/api/total",//商品总条数地址
    deleteproductbyid:"/api/deleteproductById",//删除商品地址
    selectproducttypebyid:"/api/selectproducttypebyid",//选择类目类型地址
    insertTbItem:"/api/addproducts",//添加商品地址
    preupdate:"api/preUpdatebyid",//预更新地址
    updatedproduct:"api/updateTproductbyid",//商品更新地址
    selectItemParam:'/api/selectItemParamAll',// 规格参数查询地址
    paramsdelete:"/api/paramsdeletebyid",//规格参数删除
    insertParam:"/api/insertParams",//规格参数添加地址
    selectNav:"/api/selectNavtreebyid" , // 导航分类查询地址
    insertnavContentCategory:"/api/insertContentCategory",// 添加子导航分类
    deletenavContentCategory:"/api/deleteContentCategoryById",//删除子导航分类
    updatenavContentCategory:"/api/updateContentCategory",// 修改子导航分类
    electxinxi:"/api/electxinxiById",//查询广告内容 
    insertxinxi:"/api/insertxixiContent",//添加广告内容 
    deletexinxi:"/api/deletexinxiByIds",//删除广告内容 



}
export default base