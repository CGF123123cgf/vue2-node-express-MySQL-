// 后端路由
const express = require("express");
const router = express.Router();
const SqlConnect = require("./MySqlConnect");
// 设置后台token 引入 秘钥
const jwt = require("jsonwebtoken");
const config = require("./config");
// get url
const url = require("url");
// 图片上传
const fs = require("fs");
const multer = require("multer");
// post请求 index。js要增加一个配置 bodyParse
// 用于req.body增加.body对象 可以。出来输入框的参数
// 登录地址
/**
 * 登录接口
 */
router.post("/login", (req, res) => {
  // 接收post提交过来的参数
  const username = req.body.username;
  const password = req.body.password;
  //    操作数据库 调用封装好的连接数据库的函数
  // 定义操作数据库的语句
  const sql = "select * from user where username=? and password=?";
  // 数据库占位符的数组
  const arr = [username, password];
  //调用函数，操作数据库
  SqlConnect(sql, arr, (result) => {
    // console.log(result);
    // [返回的结果是数组所以可以。length
    //     RowDataPacket {
    //       id: 4,
    //       username: 'cheng',
    //       password: '123',
    //       status: '0'
    //     }
    //   ]

    if (result.length > 0) {
      // 设置token
      const token = jwt.sign(
        // 调用一个方法 要加密的东西
        {
          username: username,
          password: password,
        },
        // 加密的方式秘钥
        config.jwtSecret
      );
      // 返回给前端的数据
      res.send({
        status: 200,
        token: token,
        data: result,
      });
    } else {
      res.send({
        status: 500,
        msg: "用户名或密码错误",
      });
    }
  });
});
// 注册接口 登录和注册为了安全都是post
router.post("/register", (req, res) => {
  // 接收post提交过来的参数
  const username = req.body.username;
  const password = req.body.password;
  //    操作数据库 调用封装好的连接数据库的函数
  // 定义操作数据库的语句
  const sql = "insert into user values (null,?,?)";
  // 数据库占位符的数组
  const arr = [username, password];
  //调用函数，操作数据库
  SqlConnect(sql, arr, (result) => {
    // console.log(result);
    // [返回的结果是数组所以可以。length
    //     RowDataPacket {
    //       id: 4,
    //       username: 'cheng',
    //       password: '123',
    //       status: '0'
    //     }
    //   ]

    if (result.affectedRows > 0) {
      // 返回给前端的数据
      res.send({
        status: 200,
        msg: "注册成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "注册失败",
      });
    }
  });
});
/**
 * 查询商品的接口 函数
 * 请求方式get请求
 * 参数：page  ?page=2
 * get 请求可以在浏览器中直接测试接口
 * http://localhost:3003/api/selectprodutbypage?page=2
 */
router.get("/selectprodutbypage", (req, res) => {
  // get请求获取前端传过来的路径里的参数，第一次没有页码，默认唯一。
  const page = url.parse(req.url, true).query.page || 1;
  // sql语句  降序 每次查询10条  偏移量
  const sql =
    "select * from project order by id  limit 10 offset " + (page - 1) * 10;
  // 调用操作数据库的函数，执行SQL语句 参数 ，结果
  SqlConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: {
          result,
        },
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});
// 数据的总条数
router.get("/total", (req, res) => {
  const sql = "select count(*) from project where id";
  SqlConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({ status: 500, msg: "查询失败" });
    }
  });
});
// 商品删除接口
router.get("/deleteproductById", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "delete from project where id=?";

  const arr = [id];
  SqlConnect(sql, arr, (result) => {
    // 删除商品，返回的结果是影响行数
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        success: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});
// 商品类目选择接口   和后台协商好 开发的时候没有后台 为了联合调试。
router.get("/selectproducttypebyid", (req, res) => {
  const id = url.parse(req.url, true).query.id || 1;
  const sql = "select * from category where id=?";
  var arr = [id];
  SqlConnect(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});
// 图片上传接口  需要第三方放的依赖，文件的上传下载 multer，cnpm i multer -S
// 第三方依赖 cors跨域处理 cnpm i cors -S 图片上传不走前台配置的代理 ，它需要的是图片后台的完整 路径。

var storage = multer.diskStorage({
  // 指定图片上传路径
  destination: function (req, file, cd) {
    cd(null, "./upload/");
  },
  // 图片的名称 当前时间+文件名
  filename: function (req, file, cd) {
    cd(null, Date.now() + "-" + file.originalname);
  },
});
// 文件读取的方案
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = "./upload/";
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), function (req, res, next) {
  var file = req.file;
  console.log("文件类型：%s", file.mimetype);
  console.log("原始文件名：%s", file.originalname);
  console.log("文件大小：%s", file.size);
  console.log("文件保存路径：%s", file.path);
  res.json({ res_code: "0", name: file.originalname, url: file.path });
});
// 添加商品的接口 把获取到的数据通过接口添加到数据库中
router.get("/addproducts", (req, res) => {
  /**
   * 获取参数
   */
  var title = url.parse(req.url, true).query.title || "";
  var cid = url.parse(req.url, true).query.cid || "";
  var sellPoint = url.parse(req.url, true).query.sellPoint || "";
  var price = url.parse(req.url, true).query.price || "";
  var num = url.parse(req.url, true).query.num || "";
  var desc = url.parse(req.url, true).query.desc || "";
  var image = url.parse(req.url, true).query.image || "";

  const sql = "insert into project values (null,?,?,?,?,?,?,?)";
  var arr = [title, image, sellPoint, price, cid, num, desc];
  SqlConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});
// 预更新接口 更新之前先获取数据信息 根据前端传过来的id获取数据
router.get("/preUpdatebyid", (req, res) => {
  var id = url.parse(req.url, true).query.id;
  const sql = "select * from project where id=?";
  SqlConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: result[0],
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无无数据",
      });
    }
  });
});

// 更新数据接口
router.get("/updateTproductbyid", (req, res) => {
  var id = url.parse(req.url, true).query.id;

  var title = url.parse(req.url, true).query.title || "";
  var sellPoint = url.parse(req.url, true).query.sellPoint || "";
  var price = url.parse(req.url, true).query.price || "";
  var num = url.parse(req.url, true).query.num || "";
  var sql = "update project set title=?,sellPoint=?,price=?,num=?where id=?";
  var arr = [title, sellPoint, price, num, id];
  SqlConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败",
      });
    }
  });
});
// 规格参数查询接口
router.get("/selectItemParamAll", (req, res) => {
  const page = url.parse(req.url, true).query.page || 1;
  const sql =
    "select * from params order by id limit 10 offset " + (page - 1) * 10;
  SqlConnect(sql, [page], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});
// 删除规格参数
router.get("/paramsdeletebyid", (req, res) => {
  var id = url.parse(req.url, true).query.id;
  const sql = "delete from params where id=?";
  const arr = [id];
  SqlConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});
// 规格参数添加
router.get("/insertParams", (req, res) => {
  const itemCatId = url.parse(req.url, true).query.itemCatId;
  const paramData = url.parse(req.url, true).query.paramData;
  const sql = "insert into params values (null,?,?)";
  SqlConnect(sql, [itemCatId, paramData], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});
// 分类 导航 数据的获取接口
router.get("/selectNavtreebyid", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from content where id=?";
    SqlConnect(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data:result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 广告导航子分类添加接口
router.get("/insertContentCategory", (req, res) => {
  const pid = url.parse(req.url, true).query.pid;
  const name = url.parse(req.url, true).query.name;
  const currentId = Math.floor(Math.random() * 10000)
  const sql = "insert into content values (?,?,?)"
  SqlConnect(sql, [pid, name, currentId], result => {
      if (result.affectedRows > 0) {
          res.send({
              status: 200,
              msg: "添加成功"
          })
      } else {
          res.send({
              status: 500,
              msg: "添加失败"
          })
      }
  })
})
// 广告导航子分类的删除
router.get("/deleteContentCategoryById", (req, res) => {
  const pid = url.parse(req.url, true).query.id;
  const sql = "delete from content where pid=?"
  SqlConnect(sql, [pid], result => {
      if (result.affectedRows > 0) {
          res.send({
              status: 200,
              msg: "删除成功"
          })
      } else {
          res.send({
              status: 500,
              msg: "删除失败"
          })
      }
  })
})
/**
 *  内容分类管理 修改子导航
 */
 router.get("/updateContentCategory", (req, res) => {
  const pid = url.parse(req.url, true).query.id;
  const name = url.parse(req.url, true).query.name;
  const sql = "update content set name=? where pid=?"
  SqlConnect(sql, [name, pid], result => {
      if (result.affectedRows > 0) {
          res.send({
              status: 200,
              msg: "修改成功"
          })
      } else {
          res.send({
              status: 500,
              msg: "修改失败"
          })
      }
  })
})
// 查询广告信息 内容
router.get("/electxinxiById", (req, res) => {
    const pid = url.parse(req.url, true).query.id;
    const sql = "select * from contentinfo where pid=?"
    SqlConnect(sql, [pid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data:result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 添加广告信息 内容
router.get("/insertxixiContent",(req,res) =>{
  const pid = url.parse(req.url, true).query.id;
  const name = url.parse(req.url, true).query.name;
  const word= url.parse(req.url, true).query.word;
  
  const sql = "insert into contentinfo values(null,?,?,?)";
  SqlConnect(sql,[name,pid,word],result =>{
      if (result.affectedRows > 0) {
          res.send({
              status: 200,
              msg: "添加成功"
          })
      } else {
          res.send({
              status: 500,
              msg: "添加失败"
          })
      }
  })
})
// 删除广告信息 内容
router.get("/deletexinxiByIds",(req,res) =>{
  const id = url.parse(req.url, true).query.id;
  const sql = "delete from contentinfo where id=?"
  SqlConnect(sql,[id],result =>{
      if (result.affectedRows > 0) {
          res.send({
              status: 200,
              msg: "删除成功"
          })
      } else {
          res.send({
              status: 500,
              msg: "删除失败"
          })
      }
  })
})
// 导出
module.exports = router;
