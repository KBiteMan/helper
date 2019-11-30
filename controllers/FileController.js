const fs = require('fs');
const minioClient = require('../utils/hMinio')

class FileController {

    async uplaod(ctx, next) {
        let params = ctx.request.body
        console.log(params.path)
        if(!params.path){
            ctx.body ={
                code:500,
                msg:'请求参数有误',
                data:null
            }
            return
        }

        let file = ctx.request.files.file;
        let reader = fs.createReadStream(file.path);
        let ext = file.name.split('.').pop();
        let fileName = new Date().getTime() + '.' + ext

        let isExist = await minioClient.bucketExists(params.path)
        
        if (!isExist) {
            let createResult = await minioClient.makeBucket(params.path,'cn-north-1')
        }

        var metaData = {
            'Content-Type': 'image/jpeg',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }

        let upResult = await minioClient.putObject(params.path, fileName, reader, metaData);

        ctx.body = {
            code: 200,
            msg: 'OK',
            data: {
                url:'/'+params.path+'/'+fileName
            }
        }
    }

}

module.exports = new FileController();