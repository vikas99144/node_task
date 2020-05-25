var mongoose = require('mongoose');
const schema = mongoose.Schema;
var userSchema = new schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    isLogin:{type:String, default:false},
    isOnline:{type:String, default:false},
    socketId:{type:String}
});

var User = mongoose.model('User',userSchema,'User');

module.exports = User;

