/**
 * node 获取GET请求
 */
const http = require('http');
const Url = require('url');

const server = http.createServer(async (req, res, next) => {
    const host = req.headers.host;
    const url = req.url;
    const data = Url.parse(host + url, true);
    const { search, query, pathname, path, href} = data;
    res.writeHead(200, {
        'Content-Type': 'text/html;charset="utf-8"'
    });
    res.write(JSON.stringify({ search, query, pathname, path, href}));
    res.end();
});

server.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})