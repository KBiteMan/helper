
const mongoos = require('../utils/db');
const Schema = mongoos.Schema;

let HomeSchema = new Schema({
    imgUrl:{type:String},
    type:{type:String},
    typeId:{type:Number}
});

module.exports = mongoos.model('homeHeader', HomeSchema);