const User = require('../modals/user');
const bcrypt = require('bcryptjs');

module.exports.getLogin = (req,res)=>{
  res.render('login');
}

module.exports.postLogin =  (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email }, function(err, user) {
      if(err){
        console.log(err);
      }
        if (user) {
            let passwordCompare = bcrypt.compareSync(password, user.password);
            if (passwordCompare) {
                req.session.userEmail = email;
                req.session.userId = user._id;
                res.redirect('/dashboard');
            } else if(user.isLogin){
              res.render('login',{message: "User already login."});
            } 
            else if(!passwordCompare) {
                res.render('login',{message: "Invalid password."});
            }
        }else{
          res.render('login',{message:"Invalid credentails."});
        }
    })

}
