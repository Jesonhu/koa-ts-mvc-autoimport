import * as mysql from 'mysql';
import { Environment } from './environments';

;(<any>mysql).Promise = global.Promise;

// 当前对应环境的 `mysql` 配置.
const { user, password, host, port, database } = Environment.mysql;

// const mysqlPool = mysql.createPool({
//   connectionLimit: 10,
//   host: host,
//   port: port,
//   user: user,
//   password: password,
//   database: database
// });

// // @see https://www.npmjs.com/package/mysql
// export const Mysql = (query?: string) => {
//   return new Promise((resolve, reject) => {
//     mysqlPool.getConnection((err, connect) => {

//       if (err) {
//         reject(err);
//         throw err;                 // 连接失败
//       }

//       connect.query(query, (error, results, fields) => {

//         connect.release();      // 关闭连接

//         if (error) {
//           reject(error);
//           throw error;          // 处理数据库操作错误
//         }

//         resolve(results);       // 返回结果
//       });
//     });
//   });
// }


const mysqlConnection = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database
});

// @see https://www.npmjs.com/package/mysql
export const Mysql = (sqlBase: string, sqlParam?: Array<string>) => {
  return new Promise((resolve, reject) => {
    
    // @see Error: Cannot enqueue Handshake after already enqueuing a Handshake.
    // https://www.cnblogs.com/zaifeng0108/p/7224991.html
    // mysqlConnection.connect();
    
    mysqlConnection.query(sqlBase, sqlParam, (error, results: Array<any>) => {

      if (error) {
        reject(error);
        throw error;          // 处理数据库操作错误
      }

      resolve(results);       // 返回结果
    });
  });
}