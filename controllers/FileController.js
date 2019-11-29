const fs = require('fs');
const minioClient = require('../utils/hMinio')

class FileController {

    async uplaod(ctx, next) {
        let file = ctx.request.files.file;
        let reader = fs.createReadStream(file.path);
        let ext = file.name.split('.').pop();
        let fileName = new Date().getTime() + '.' + ext

        let isExist = await minioClient.bucketExists('movie')
        
        if (!isExist) {
            let createResult = await minioClient.makeBucket('movie','cn-north-1')
        }

        var metaData = {
            'Content-Type': 'image/jpeg',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }

        let upResult = await minioClient.putObject('movie', fileName, reader, metaData);
        
        if (upResult) {
            
        }

        ctx.body = {
            code: 200,
            msg: 'OK',
            data: "imgUrl"
        }
    }

}

module.exports = new FileController();