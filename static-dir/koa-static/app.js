const Koa = require('koa');
const path = require('path');
const staticServer = require('koa-static');
const app = new Koa();
const staticPath = './public';
app.use(staticServer(path.join(__dirname, staticPath)));
app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})