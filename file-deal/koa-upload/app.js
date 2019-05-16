/**
 * 图片上传
 */
const Koa = require('koa');
const multer = require('koa-multer');
const Router = require('koa-router');
const Views = require('koa-views');
const path = require('path');
const app = new Koa();
const router = new Router();

// 配置页面路径和页面文件格式
app.use(Views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

router.get('/', async (ctx, next) => {
    await ctx.render('index', { title: 'upload'});
})

//配置保存信息
const storage = multer.diskStorage({
    // 设置保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/upload');
    },
    // 设置文件名称
    filename: function (req, file, cb){
        const fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

const upload = multer({
    storage: storage
});

router.post('/upload', upload.single('file'), async (ctx, next) => {
    const file = ctx.req.file;
    ctx.body = file;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})