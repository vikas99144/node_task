const mongoose = require('mongoose');
const User = require('../modals/user');
const Address = require('../modals/address');
const async = require('async');
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports.getSignup = (req,res)=>{
  res.render('signup');
}

module.exports.postSignup = (req, res)=>{
    let address = req.body.address;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password,8);
     if(req.file.size < 1024 ){
      fs.unlinkSync(req.file.path); 
      res.render('signup',{message:"File size must be less than 1MB"}); 
     }
    else if(req.file.mimetype.split('/')[1] !== 'jpg' && req.file.mimetype.split('/')[1] !== 'png'){
      fs.unlinkSync(req.file.path); 
      res.render('signup',{message:"Please upload only jpg and png file"});
     }
    else if (address == '' || email == '' || password == '') {
        res.render('signup',{message:"Please fill required field"});   
      }else{
        let image = req.file.filename;
        User.findOne({email:email}).exec((err,user)=>{
            if(user){
                    console.log("User already exists. Try another email");
                    res.render('signup',{message:"User already exists. Try another email"});
            }else{
                let newUser = new User();
                newUser.email = email;
                newUser.password = password;
                newUser.image = image;
                newUser.save((err) => {
                    if (err) {
                        console.log("Data is not saved in database.")
                        res.render('signup',{message:"Data is not saved in database."});
                    } else {
                      console.log("Data saved successfully.");
                        (async()=>{
                          var newAddress = new Address();
                          newAddress.address = address;
                         var addressData =  await newAddress.save();
                         await User.findOneAndUpdate({email:email},{address: mongoose.Types.ObjectId(addressData._id)})
                        })()
                        res.render('signup',{message: "Data saved successfully."});
                    }
                })

            }
        })
      }

}


module.exports.usersWitPopulate = (req,res)=>{
    User.find({}).populate('address').exec((err,users)=>{
      if(err){
        res.json({
          status: 500,
          message: 'Internal error'
        })
      }else{
        res.json({
          status: 200,
          message:' All users',
          data: users
        })
      }
    })
}



module.exports.withWaterfall = (re, res) => {
  async.waterfall([
    function (callback) {
      callback(null, 'Task 1', 'Task 2');
    },
    function (arg1, arg2, callback) {

      User.find({}).exec((err, users) => {
        if (err) {
          callback(err, null);
        } else {
          users.arg3 = arg1 + ' and ' + arg2;
          callback(null, users);
        }
      })

    },
    function (arg1, callback) {
      callback(null, arg1);
    }
  ], function (err, result) {
    if(err){
      res.json({
        status: 500,
        message: 'Internal Error'
      })
    }else{
      res.json({
        status: 200,
        message: 'Data',
        data: result
      })
    }
  });
}


module.exports.withParallel = (re, res) => {
  async.parallel([
    function (callback) {
      setTimeout(function () {
        console.log('Task One');
        callback(null, 1);
      }, 200);
    },
    function (callback) {
      setTimeout(function () {
        console.log('Task Two');
        callback(null, 2);
      }, 100);
    },
    function (callback) {
      setTimeout(function () {
        console.log('Task Three');
        callback(null, 3);
      }, 100);
    }
  ],
    function (err, results) {
      if (err) {
        res.json({
          status: 500,
          message: 'Internal error'
        })
      } else {
        res.json({
          status: 200,
          message: 'Data',
          data: results
        })
      }

    });

}

module.exports.searchColor = (req, res) => {
  var colorname = req.query.color;
  Address.find({ colors: { $in: [colorname] } }).exec((err, data) => {
    if (err) {
      res.json({
        status: 500,
        message: 'Internal error'
      })
    } else {
      console.log("==in seatch color ==", data);
      if (data.length > 0) {
        res.json({
          status: 200,
          message: 'found',
        })
      } else {
        res.json({
          status: 404,
          message: 'not found',
        })
      }
    }
  })
}