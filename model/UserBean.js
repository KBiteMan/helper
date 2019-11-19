const mongoos = require('../utils/db');
const Schema = mongoos.Schema;

let UserSchema = new Schema({
    username: { type: String },
    userpsw: { type: String },
    nickname: { type: String },
    createData: { type: Date, default: Date.now }
});

module.exports = mongoos.model('User', UserSchema);