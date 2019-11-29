const Selection = require('../model/SelectionItem');

class PublishController {

    /**
     * 发布视频相关条目
     * @param {*} ctx 
     * @param {*} next 
     */
    async movie(ctx, next) {
        let params = ctx.request.body;
        console.log(params);

        let item = await new Selection(params).save();
        if (item.err) {
            ctx.body = {
                code:500,
                msg:"未知错误",
                data:item.err
            }
        } else {
            ctx.body = {
                code:200,
                msg:'发布成功',
                data:item
            }
        }
    }

    /**
     * 评论
     * @param {*} ctx 
     * @param {*} next 
     */
    async discuss(ctx, next) {

    }
}

module.exports = new PublishController();