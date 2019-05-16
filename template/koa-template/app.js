const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(async (ctx) => {
    const data = {
        title: 'hello',
        say: 'Hello World',
        powered: 'Koa ejs template'
    }
    await ctx.render('index', {
        data
    })
})

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})