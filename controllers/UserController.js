const jwt = require('jsonwebtoken');

const baseBean = require('../model/BaseBean')
const User = require('../model/UserBean')
const Login = require('../model/Login')

const serect = 'zhangyu521521'

class UserController {

    async login(ctx, next) {
        let params = ctx.request.body;
        let login = await Login.find({ 'username': params.username }).select('-__v');
        let user = await User.find({ 'username': params.username }).select('-__v').select('-userpsw');
        if (login.err) {
            baseBean.code = 500;
            baseBean.msg = '未知错误';
            baseBean.data = null;
        } else if (login.length == 0) {
            baseBean.code = 500;
            baseBean.msg = '该用户未注册';
            baseBean.data = null;
        } else {
            if (login[0].userpsw !== params.userpsw) {
                baseBean.code = 500;
                baseBean.msg = '密码错误';
                baseBean.data = null;
            } else {
                let payload = {
                    userNumber:params.username,
                    time:new Date().getTime(),
                    timeout:1000*60*60
                };
                let token = jwt.sign(payload,serect);
                console.log('token='+token);
                ctx.cookies.set('token',token,{signed:false,maxAge:1000*60*60})
                login[0].token = token
                await login[0].save();
                baseBean.code = 200;
                baseBean.msg = 'OK';
                baseBean.data = user[0];
            }
        }

        
        ctx.body = baseBean;
        await next()
        ctx.cookies.set('token',"",{signed:false,maxAge:0})

    }

    async registe(ctx, next) {
        let params = ctx.request.body;
        console.log(params);
        let count = await User.count({ 'username': params.username });

        if (count.err) {
            baseBean.code = 500;
            baseBean.data = null;
        } else if (count > 0) {
            baseBean.code = 500;
            baseBean.msg = "用户名已被使用，请重新注册"
            baseBean.data = null;
        } else {
            var login = new Login({
                username: params.username,
                userpsw: params.userpsw
            });
            var user = new User({
                username: params.username,
                userpsw: params.userpsw
            });
            let register = await user.save();
            let loginer = await login.save();
            if (register.err) {
                baseBean.code = 500;
                baseBean.data = null;
            } else {
                baseBean.data = register._id;
            }
        }

        ctx.body = baseBean;
    }

    async updateUser(ctx,next){
        let params = ctx.request.body;
        console.log(params);
        let user = await User.findById(params.uid).select('-__v').select('-userpsw');
        console.log(user);
        if (!user) {
            baseBean.code = 500;
            baseBean.msg = '用户不存在'
            baseBean.data = null;
        }else if(user.err){
            baseBean.code = 500;
            baseBean.msg = '未知错误'
            baseBean.data = user.err;
        }else{
            user.nickname = "禹哥哥"
            let newUser = await user.save();
            if (newUser.err) {
                baseBean.code = 500;
                baseBean.msg = '资料更新失败';
                baseBean.data = newUser;
            }else{
                baseBean.code = 200;
                baseBean.msg = '资料更新成功';
                baseBean.data = newUser;
            }
        }

        ctx.body = baseBean;
    }

}

module.exports = new UserController();