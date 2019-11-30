const router = require('koa-router')();
const fileCtr = require('../controllers/FileController');

router.post('/api/upload',fileCtr.uplaod)

module.exports = router;