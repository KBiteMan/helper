const type = process.env.npm_lifecycle_event

var data;
switch(type){
    case "dev":
        data = {
            db_ip:"mongodb://10.144.1.1:27017/helper",
            minio_ip:"10.144.1.1"
        }
    break;
    case "dev_home":
        data = {
            db_ip:"mongodb://192.168.199.126:27017/helper",
            minio_ip:"192.168.199.126"
        }
    break;
}

module.exports = data