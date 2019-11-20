const koa = require('koa');
const Logger = require('koa-logger');
const koa_body = require('koa-body');
const moment = require('moment')();
const fileSource = require('koa-static');
const path = require('path');

const userRouter = require('./router/user');
const homeRouter = require('./router/home');
const baseRouter = require('./router/base');
const publishRouter = require('./router/publish');

const jwt = require('./utils/token');

const app = new koa();

//请求参数解析中间件
const bodyParser = koa_body({
    multipart:true,
    formidable:{
        maxFileSize:2*1024*1024
    }
});
app.use(bodyParser);

//token校验
app.use(jwt)

// 日志中间件
const logger = new Logger((str) => {
    console.log(moment.format('YYYY-MM-DD HH:mm:ss') + ":" + str);
});
app.use(logger);

//静态资源
const staticPath = './static';
app.use(fileSource(path.join(__dirname,staticPath)));

//路由配置
app.use(userRouter.routes());
app.use(homeRouter.routes());
app.use(baseRouter.routes());
app.use(publishRouter.routes());

app.listen(3000);

