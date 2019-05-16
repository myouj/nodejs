/**
 * 数据库连接池
 */
const mysql = require('mysql2/promise');

// 配置连接池
const pool = mysql.createPool({
    user: 'root',
    password: '123456',
    host: '127.0.0.1',
    pool: 3306,
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;