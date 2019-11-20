const headerImgDb = require('../model/homeHeader')
const AblumBean = require('../model/AlbumBean')
const SelectionItem = require('../model/SelectionItem')

class HomeController {
    /**
     * 首页banner图
     * @param {*} ctx 
     * @param {*} next 
     */
    async banners(ctx, next) {
        let params = ctx.request.query;

        let bannerImg = await headerImgDb.find().select('-__v');
        if (bannerImg.err) {
            ctx.body = {
                code: 500,
                msg: 'OK',
                data: bannerImg.err
            }
        } else {
            ctx.body = {
                code: 200,
                msg: 'OK',
                data: {
                    banners: bannerImg
                }
            }
        }

    }

    /**
     * 首页推荐歌单
     * @param {*} ctx 
     * @param {*} next 
     */
    async recommend(ctx, next) {
        let params = ctx.request.query;

        // await new AblumBean({
        //     cover:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161551209,1764489825&fm=26&gp=0.jpg',
        //     palyTimes:0,
        //     title:'依然范特西',
        //     albumKind:'2001',
        //     createTime:'2019-01-03 11:22:33'
        // }).save()

        // await new AblumBean({
        //     cover:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574243930375&di=1c8ed333f8c079a35b0293c6c6480931&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2672908332%2C1610999514%26fm%3D214%26gp%3D0.jpg',
        //     palyTimes:0,
        //     title:'七里香',
        //     albumKind:'2001',
        //     createTime:'2017-01-03 11:22:33'
        // }).save()

        // await new AblumBean({
        //     cover:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574243888680&di=bba1c693ed2731bf8fe446c093009fd7&imgtype=0&src=http%3A%2F%2Fimage.haibao.cn%2Fstore%2Fwm%2Fpiccommon%2F1216%2F12166%2FD52581BCB898DDC2EBAECDB80E.jpg',
        //     palyTimes:0,
        //     title:'11月的首邦',
        //     albumKind:'2002',
        //     createTime:'2015-01-03 11:22:33'
        // }).save()

        // await new AblumBean({
        //     cover:'http://5b0988e595225.cdn.sohucs.com/images/20180614/362c47beb16943499a05fb694b670f39.jpeg',
        //     palyTimes:0,
        //     title:'JAY',
        //     albumKind:'2003',
        //     createTime:'2016-01-03 11:22:33'
        // }).save()

        // await new AblumBean({
        //     cover:'http://5b0988e595225.cdn.sohucs.com/images/20180614/c72fc0bb853a49a39268f58b815d7914.jpeg',
        //     palyTimes:0,
        //     title:'八度空间',
        //     albumKind:'2004',
        //     createTime:'2014-01-03 11:22:33'
        // }).save()

        // let a = await new AblumBean({
        //     cover:'http://5b0988e595225.cdn.sohucs.com/images/20180614/02e3f79da7554ba4aa55bea731faf929.jpeg',
        //     palyTimes:0,
        //     title:'叶惠美',
        //     albumKind:'2005',
        //     createTime:'2012-01-03 11:22:33'
        // }).save()

        // ctx.body = a

        let recommend = await AblumBean.find().select('-__v');

        if (recommend.err) {
            ctx.body = {
                code: 500,
                msg: 'OK',
                data: recommend.err
            }
        } else {
            ctx.body = {
                code: 200,
                msg: 'OK',
                data: recommend
            }
        }

    }

    /**
     * 新碟、新歌
     * @param {*} ctx 
     * @param {*} next 
     */
    async newThings(ctx, next) {
        let params = ctx.request.query;

        if (params.type == 1) {
            let newAlbum = await AblumBean.find()
                .sort({ 'createTime': -1 })
                .limit(3)
                .select('-__v');

            if (newAlbum.err) {
                ctx.body = {
                    code: 500,
                    msg: 'OK',
                    data: newAlbum.err
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: 'OK',
                    data: newAlbum
                }
            }
        } else {
            let newAlbum = await AblumBean.find()
                .sort({ 'createTime': 1 })
                .limit(3)
                .select('-__v');

            if (newAlbum.err) {
                ctx.body = {
                    code: 500,
                    msg: 'OK',
                    data: newAlbum.err
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: 'OK',
                    data: newAlbum
                }
            }
        }

    }

    /**
     * 获取云村精选列表
     * @param {*} ctx 
     * @param {*} next 
     */
    async movieList(ctx, next) {
        let params = ctx.request.query;

        if (params.type == 1) {
            let selectItem = await SelectionItem.find()
                .select('-__v');

            if (selectItem.err) {
                ctx.body = {
                    code: 500,
                    msg: 'OK',
                    data: selectItem.err
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: 'OK',
                    data: selectItem
                }
            }
        } else {
            let selectItem = await SelectionItem.find()
                .populate('author')
                .sort({ 'createTime': -1 })
                .select('-__v');

            if (selectItem.err) {
                ctx.body = {
                    code: 500,
                    msg: 'OK',
                    data: selectItem.err
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: 'OK',
                    data: selectItem
                }
            }
        }
    }
}

module.exports = new HomeController();