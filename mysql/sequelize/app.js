const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const app = new Koa();
const router = new Router();

const sequelize = new Sequelize('test', 'root', '123456', {
    'dialect': 'mysql',
    'host': 'localhost',
    'port': 3306
});

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    }
},{
    tableName: 'tbl_user',
    freezeTableName: true
});

//mysql 访问数据库
router.get('/', async (ctx) => {
    const connection = await mysql.createConnection({
        user: 'root',
        password: '123456',
        host: '127.0.0.1',
        port: 3306,
        database: 'test'
    });
    const [data, fields] = await connection.execute('SELECT * FROM `tbl_user`');
    ctx.set('Content-Type', 'application/json;charset="utf-8"');
    ctx.body = data;
});

//sequelize 访问数据库
router.get('/sequelize', async (ctx) => {
    const data = await User.findAll();
    ctx.set('Content-Type', 'application/json;charset="utf-8"');
    ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})