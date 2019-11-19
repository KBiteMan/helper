const router = require('koa-router')();
const userCtr = require('../controllers/UserController')

router.post('/api/user/login', userCtr.login)
    .post('/api/user/registe',userCtr.registe)
    .post('/api/user/update',userCtr.updateUser)

module.exports = router;