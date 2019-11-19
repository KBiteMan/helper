const mongoos = require('../utils/db');
const Schema = mongoos.Schema;

let LoginSchema = new Schema({
    username: { type: String },
    userpsw: { type: String },
    token:{type:String}
});

module.exports = mongoos.model('Login', LoginSchema);