const router = require('koa-router')();
const fileCtr = require('../controllers/FileController');

router.post('/api/uplaod',fileCtr.uplaod)

module.exports = router;