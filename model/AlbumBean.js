/**
 * 歌单
 */
const mongoos = require('../utils/db');
const Schema = mongoos.Schema;

let AlbumSchema = new Schema({
    cover:{type:String},
    palyTimes:{type:Number},
    title:{type:String},
    albumKind:{type:String},
    createTime:{type:Date}
});

module.exports = mongoos.model('albumCover', AlbumSchema);