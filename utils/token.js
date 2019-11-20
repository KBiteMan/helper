const jwt = require('jsonwebtoken');
const login = require('../model/Login')

const serect = 'zhangyu521521'

async function check(ctx, next) {
    let url = ctx.request.url;
    if (url == '/api/user/login'
        || url == '/api/user/registe') {
        await next();
    } else {
        let token = ctx.request.headers['token'];
        if (!token) {
            ctx.body = {
                code:500,
                msg:'请求参数错误',
                data:null
            }
            return;
        }
        let payload = await jwt.verify(token, serect);
        let { time, timeout } = payload;
        let date = new Date().getTime();
        let count = await login.countDocuments({'token':token});
        console.log(count);
        if (count != 1) {
            ctx.body = {
                code: 600,
                msg: 'token失效',
                data: null
            }
        }else{
            if (date - time <= timeout) {
                await next();
            } else {
                ctx.body = {
                    code: 600,
                    msg: 'token失效',
                    data: null
                }
            }
        }
        
    }
}

module.exports = check;