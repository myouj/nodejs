/**
 * node 获取POST请求
 */
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer(async (req, res) => {
    const { url, method } = req;
    let data;
    if (url === '/' && method === 'GET') {
        //访问主页目录且为GET请求，渲染表单页面
        data = await render('index.html');
    } else if (url === '/' && method === 'POST') {
        //访问主目录且为POST请求，相应解析后的JSON格式表单数据
        data = await bodyParser(req);
    } else {
        //未知路由返回404页面
        data = await render('404.html');
    }
    res.writeHead(200, {
        'Content-Type': 'text/html;charset="utf-8"'
    });
    res.write(data);
    res.end();
});

//渲染页面模板
async function render(page) {
    const viewUrl = path.join(__dirname, `/view/${page}`);
    return new Promise((resolve, reject) => {
        fs.readFile(viewUrl, (err, data) => {
            if(err){
                return reject(`<h1>inner error! ${page}`);
            }
            return resolve(data);
        });
    });
}

//表单数据解析
function bodyParser(req){
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            req.addListener('data', (data) => {
                
                postData += data;
                //将数据用utf8格式解析, 字节转换会把 @ 变成 %40
                postData = decodeURIComponent(postData);
                console.log(postData);
            });
            req.addListener('end', () => {
                let parseData = parseToJOSN(postData);
                resolve(parseData);
            });
        } catch (error) {
            reject(error);
        }
    });
}

//将数据转化成JSON格式
function parseToJOSN(data){
    console.log(data);
    const result = {};
    let queryMaps = data.split('&');
    for (const queryMap of queryMaps){
        const [key, value] = queryMap.split('=');
        result[key] = value;
    }
    return JSON.stringify(result);
}

server.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
});
