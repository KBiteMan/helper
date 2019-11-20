const router = require('koa-router')();
const homeCtr = require('../controllers/HomeController')

router.get('/api/home/banners', homeCtr.banners)
    .get('/api/home/recommend', homeCtr.recommend)
    .get('/api/home/newThings',homeCtr.newThings)
    .get('/api/home/movieList',homeCtr.movieList)

module.exports = router;