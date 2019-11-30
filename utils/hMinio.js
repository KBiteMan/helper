const Minio = require('minio')
const env = require('../config/setting')

var minioClient = new Minio.Client({
    endPoint:env.minio_ip,
    port:9000,
    useSSL:false,
    accessKey:'bite_man',
    secretKey:'chenchen.199'
})

module.exports = minioClient