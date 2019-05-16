/**
 * md5数据加密
 */
const crypto = require('crypto');

function md5(data){
    return crypto.createHash('md5').update(data).digest('hex');
}

function encrypt(data){
    return md5(data).substr(0, 30);
}

module.exports = encrypt;