const router = require('koa-router')();
const publishCtr = require('../controllers/PublishController')

router.post('/api/publish/movie', publishCtr.movie)
    .post('/api/publish/discuss',publishCtr.discuss)

module.exports = router;