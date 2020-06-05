const multer = require('multer');
const maxSize = 102;
// SET STORAGE
var storage = multer.diskStorage({
      
    destination: function (req, file, cb) {
      cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.' + file.mimetype.split('/')[1])
    }
  })

var upload = multer({ 
  storage: storage
}).single('image')


module.exports = upload;