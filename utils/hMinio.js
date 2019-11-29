const Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint:'10.144.1.1',
    port:9000,
    useSSL:false,
    accessKey:'bite_man',
    secretKey:'chenchen.199'
})

module.exports = minioClient