const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup_controller');
const loginController = require('../controllers/login_controller');
const fileUpload = require('../utils/upload');

const passport = require('passport');
router.use(passport.initialize());
router.use(passport.session()); 

router.get('/',signupController.getSignup);

router.post('/signup',fileUpload.single('image'),signupController.postSignup);

router.get('/usersWithPopulate', signupController.usersWitPopulate);

router.get('/withWaterfall', signupController.withWaterfall);

router.get('/withParallel', signupController.withParallel);
router.get('/searchColor', signupController.searchColor);
router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);

// console.log("====");
module.exports = router;