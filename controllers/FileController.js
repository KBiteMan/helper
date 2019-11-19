const fs = require('fs');

class FileController {

    async uplaod(ctx, next) {
        console.log(ctx.request);
        console.log('-----------------------------');
        console.log(ctx.request.files);
        let file = ctx.request.files.file;
        let reader = fs.createReadStream(file.path);
        let ext = file.name.split('.').pop();
        let fileName = new Date().getTime() +'.'+ ext
        let upStream = fs.createWriteStream(`./static/${fileName}`);
        reader.pipe(upStream);

        ctx.body = {
            code: 200,
            msg: 'OK',
            data: fileName
        }
    }

}

module.exports = new FileController();