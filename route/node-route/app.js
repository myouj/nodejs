/**
 * node 实现路由转发
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer(async (req, res) => {
    const url = req.url;
    let page = '404.html';
    switch (url) {
        case '/':
            page = 'index.html';
            break;
        case '/index':
            page = 'index.html';
            break;
        case '/hello':
            page = 'hello-world.html';
            break;
        default:
            page = '404.html';
            break;
    }
    res.writeHead(200, {
        'Content-Type': 'text/html;charset="utf-8"'
    });
    const data = await render(page);
    res.write(data);
    res.end();
})

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

app.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
});
