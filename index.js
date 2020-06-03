require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const passport = require('passport');
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session')
const morgan = require('morgan');
const port = process.env.PORT ||5000;

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }))
app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/db');
require('./config/passport')(passport);
require('./controllers/socket_controller')(io);
const route = require('./routes/route');
app.use('/',route);
http.listen(port,(err)=>{
  if(err){
     console.log("There is error to run the server");
    }else{
        console.log("App is listening on port", port);
    }
})
