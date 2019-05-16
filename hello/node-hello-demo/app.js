/**
 * node创建一个http服务
 */
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset="utf-8"'
    });
    res.write('<h1>Hello World!</h1><h2>This is powered by NodeJS!</h2>');
    res.end();
});

server.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})