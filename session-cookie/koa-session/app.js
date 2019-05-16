const Koa = require('koa');
const Router = require('koa-router');
const redisStore = require('koa-redis');
const session = require('koa-generic-session');
const router = new Router();
const app = new Koa();

app.keys = ['keys', 'keykeys'];
const cookie = {
    path: '',
    httpOnly: '',
    domain: '',
    path: '',
    expires: ''
};
const store = redisStore({
    host: '127.0.0.1',
    port: 6379
});
app.use(session({
    store: store,
    key: 'koa.sid',
    prefix: 'koa:sess:',
    cookie: cookie
}));

router.get('/getSession', async (ctx) => {
    const session = ctx.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = session.count;
});

router.get('/regenerateSession', async (ctx) => {
    ctx.regenerateSession();
    const session = ctx.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = session.count;
})

router.get('/destorySession', async (ctx) => {
    ctx.session = null;
    ctx.body = 0;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080);

console.log("Server start at 127.0.0.1:8080");