/**
 * koa实现路由转发
 */
const Koa = require('koa'),
    Router = require('koa-router'),
    render = require('./tools/render'),
    app = new Koa(),
    router = new Router();

app.use(async (ctx, next) => {
    await next();
    console.log(ctx.status);
    if(ctx.status == 404){
        ctx.set('Content-Type', 'text/html;charset="utf-8"');
        const data = await render('404.html');
        ctx.body = data;
    }
})

router.get('/', async (ctx) => {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await render('index.html');
    ctx.body = data;
})

router.get('/index', async (ctx) => {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await render('index.html');
    ctx.body = data;
})

router.get('/hello', async (ctx) => {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await render('hello-world.html');
    ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods);
app.listen(8080);
console.log("Server start at 127.0.0.1:8080");
