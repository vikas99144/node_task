const mongoose = require('mongoose');
const User = require('../modals/user');
const bcrypt = require('bcryptjs');

module.exports.getSignup = (req,res)=>{
  res.render('signup');
}

module.exports.postSignup = (req, res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password,8);
    if (username == '' || email == '' || password == '') {
        res.render('signup',{message:"Please fill required field"});   
      }else{
        User.findOne({email:email}).exec((err,user)=>{
            if(user){
                    console.log("User already exists. Try another email");
                    res.render('signup',{message:"User already exists. Try another email"});
            }else{
                let newUser = new User();
                newUser.username = username;
                newUser.email = email;
                newUser.password = password;
                newUser.save((err) => {
                    if (err) {
                        console.log("Data is not saved in database.")
                        res.render('signup',{message:"Data is not saved in database."});
                    } else {
                      console.log("Data saved successfully.");
                        res.render('signup',{message: "Data saved successfully."});
                    }
                })

            }
        })
      }

}
