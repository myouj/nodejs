const http = require('http');

const server = http.createServer(async (req, res) => {
    const url = req.url;
    if(url === '/setCookie'){
        const date = new Date();
        const expireHour = 6;
        date.setTime(date.getTime() + expireHour * 3600 * 1000);
        res.writeHead(200, {
            'Set-Cookie': `name=dyl;Expires=${date.toGMTString()}`
        });
        res.end("set cookie success");
    } else if (url === '/getCookie') {
        const cookies = {};
        req.headers.cookie && req.headers.cookie.split(';').forEach(cookie => {
            const keyMap = cookie.split('=');
            cookies[keyMap[0].trim()] = (keyMap[1] || '').trim();
        });
        res.writeHead(200, {
            'Content-Type': 'text/html;charset="utf-8"'
        });
        res.write(JSON.stringify(cookies));
        res.end();
    }
})

server.listen(8080, () => {
    console.log("Server start at 127.0.0.1:8080");
})