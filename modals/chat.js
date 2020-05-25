var mongoose = require('mongoose');
const schema = mongoose.Schema;
var chatSchema = new schema({
    userId:{type: schema.Types.ObjectId, ref:'User'},
    otherId:{type: schema.Types.ObjectId, ref:'User'},
    message:{type:String},
    chatType:{type:String},
    isRead:{type:String, default: false}
},{timestamps: true});

var Chat = mongoose.model('Chat',chatSchema,'Chat');

module.exports = Chat;

