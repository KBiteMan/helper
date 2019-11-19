const headerImg = require('../model/homeHeader')

class HomeController{
    async home(ctx,next){
        let params = ctx.request.body;

        new headerImg({
            imgUrl:'1574135748560.jpg',
            type:'精选',
            typeId:''
        })

        ctx.body={
            code:200
        }
    }

    async addHeader(ctx,next){
        let params = ctx.request.body;
        new headerImg(params)
    }
}

module.exports = new HomeController();