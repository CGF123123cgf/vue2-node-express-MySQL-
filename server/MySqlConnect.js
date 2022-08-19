const mysql = require("mysql");

const sqlObj = {
  host: "127.0.0.1", //数据库的配置 主机
  user: "root", //用户名
  password: "admin123", //密码
  database: "shop", //要连接的数据库
};

// 连接数据库对象
const client = mysql.createConnection(sqlObj);
// 封装创建连接数据库的函数  暴露出去供别人使用
// arr是SQL语句的占位符的具体值
function SqlConnect(sql, arr, callback) {
    // result是执行数据库成功后回调的结果 
  client.query(sql, arr, (error, result) => {
    // 数据库语句执行成功失败
    if (error) {
      console.log(error);
      return;
    }
    //   数据库语句执行成功函数
    callback(result);
  });
}
//  暴露出去供别人使用
module.exports = SqlConnect
