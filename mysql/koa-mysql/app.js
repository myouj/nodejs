/**
 * 连接mysql数据库
 */
const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql2/promise');
const pool = require('./model/index');
const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    //配置数据量连接
    const connection = await mysql.createConnection({
        user: 'root',
        password: '123456',
        host: '127.0.0.1',
        port: 3306,
        database: 'test'
    });
    //执行查询语句
    const [data, fields] = await connection.execute('SELECT * FROM `tbl_user`');
    ctx.set('Content-Type', 'application/json;charset="utf-8"');
    ctx.body = data;
});

router.get('/getDataByPool', async (ctx) => {
    const [data, fields] = await pool.execute('SELECT * FROM `tbl_user`');
    ctx.set('Content-Type', 'application/json;charset="utf-8"');
    ctx.body = data;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})