const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/setCookie', async (ctx) => {
    ctx.cookies.set('name', 'ma', {
        domain: 'localhost',
        path: '/',
        expires: new Date('2019-05-18'),
        httpOnly: false,
        overwrite: false
    })
    ctx.body = 'setCookies success';
});

router.get('/getCookie', async (ctx) => {
    ctx.body = ctx.cookies.get('name');
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080);

console.log("Server start at 127.0.0.1:8080");