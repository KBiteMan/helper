/**
 * 云村条目
 */
const mongoos = require('../utils/db');
const Schema = mongoos.Schema;

let SelectionSchema = new Schema({
    type: { type: String },
    cover: { type: String },
    playUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    describe: { type: String },
    playTimes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    likeNum: { type: Number, default: 0 },
    // song: {},
    eventChannal: { type: String },
    createTime: { type: Date, default: Date.now }
});

module.exports = mongoos.model('selection', SelectionSchema);