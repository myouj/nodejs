const Koa = require('koa');
const Router = require('koa-router');
const Sequelize = require('sequelize');

const app = new Koa();
const router = new Router();

const sequelize = new Sequelize('test', 'root', '123456', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
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
    tableName: 'tbl_user'
});

router.get('/', async (ctx) => {
    let data;
    User.findAll().then((user) => {
        data = user;
        console.log(data); 
        
    });
    ctx.set('Content-Type', 'application/json;charset="utf-8"');
    ctx.body = data;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})