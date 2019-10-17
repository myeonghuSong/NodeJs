const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
 
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(session({
    secret: 'madsong',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);

app.set('view engine', 'ejs');



app.listen(3000, ()=>{
    console.log('start! expresss server on 3000 port')
});