const router = require('koa-router')();
const homeCtr = require('../controllers/HomeController')

router.get('/api/home/', homeCtr.home)

module.exports = router;