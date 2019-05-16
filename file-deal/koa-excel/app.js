/**
 * 操作 Excel xlsx文件
 */
const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const excelDeal = require('./tools/exceldeal');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    // 设置文件路径
    const filePath = path.join(__dirname, './static/from.xlsx');
    const xlsxName = 'to.xlsx';
    const cols = [
        {
            caption: 'ID',
            type: 'string',
            width: 12
        },
        {
            caption: 'TEXT',
            type: 'string',
            width: 32
        }
    ];
    const rows = excelDeal.getDataFormExcel(filePath);
    const conf = { cols, rows };
    const stream = await excelDeal.writeDateToExcel(conf);
    ctx.res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    ctx.res.setHeader('Content-Disposition', 
        'attachment; filename=' + encodeURI(xlsxName));
    ctx.body = 'read success';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})