/**
 * koa创建一个http服务
 */
const Koa = require('koa');
const app = new Koa();
app.use((ctx) => {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    ctx.body = '<h1>Hello World!</h1><h2>This is powered by Koa!</h2>';
});
app.listen(8080);
console.log("Server start at 127.0.0.1:8080");