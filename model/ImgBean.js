/**
 * 图像相对路径
 */
const mongoos = require('../utils/db');
const Schema = mongoos.Schema;

let ImageSchema = new Schema({
    path:String
});

module.exports = mongoos.model('relativeImg', ImageSchema);