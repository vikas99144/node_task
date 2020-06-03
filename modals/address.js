var mongoose = require('mongoose');
const schema = mongoose.Schema;
var userAddress = new schema({
    address:{type:String},
    colors: {
        type: Array,
        'default': ['red','green']
      }
});

var Address = mongoose.model('Address',userAddress,'Address');

module.exports = Address;

