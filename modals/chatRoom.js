var mongoose = require('mongoose');
const schema = mongoose.Schema;
var chatRoomSchema = new schema({
    userId:{type: schema.Types.ObjectId, ref:'User'},
    otherId:{type: schema.Types.ObjectId, ref:'User'},
    chatRoom:{type:String, default: null},
    chatType:{type:String},   // 1 for private chat 2 for group chat
});
var Room= mongoose.model('ChatRoom',chatRoomSchema,'ChatRoom');

module.exports = Room;

