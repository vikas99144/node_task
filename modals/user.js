var mongoose = require('mongoose');
const schema = mongoose.Schema;
var userSchema = new schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String},
    address:{type:schema.Types.ObjectId, ref:'Address'}
});

var User = mongoose.model('User',userSchema,'User');

module.exports = User;

