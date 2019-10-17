const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'smh811',
    database: 'practice'
})

connection.connect();

router.get('/', (req, res) => {
    let msg;
    let errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'message' : msg});
})

passport.serializeUser((user, done) => {
    console.log('passport session save: ', user);
    done(null, user.id);
})

passport.deserializeUser( (id, done) => {
    console.log('passport get id: ', id);
    done(null, id);
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        let query = connection.query('select * from jsman where email=?', [email], (err, rows)=>{
            if(err) return done(err);
            if(rows.length) {
               return done(null, {'email': email, 'id': rows[0].id});
            } else {
                return done(null, false, {'message' : 'your email is not found ..'});
            }
        })
    }
))

router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);

        req.logIn(user, (err) => {
            if(err) return next(err);
            return res.json(user);
        })
    })(req, res, next);
}
)

module.exports = router;