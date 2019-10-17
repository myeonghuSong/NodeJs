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
    res.render('join.ejs', {'message' : msg});
})

passport.serializeUser((user, done) => {
    console.log('passport session save: ', user);
    done(null, user.id);
})

passport.deserializeUser( (id, done) => {
    console.log('passport get id: ', id);
    done(null, id);
})

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        let query = connection.query('select * from jsman where email=?', [email], (err, rows)=>{
            if(err) done(err);

            if(rows.length) {
                console.log('existed user');
                return done(null, false, {message : 'your email is already used'});
            } else {
                let sql = {email: email, password: password};
                let query = connection.query('insert into jsman set ?', sql, (err, rows) => {
                    if(err) throw err;
                    return done(null, {'email': email, 'id': rows.insertId});
                })
            }
        })
    }
))

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true })
)

// router.post('/', (req, res) => {
//     let body = req.body;
//     let email = body.email;
//     let name = body.name;
//     let password = body.password;

//     let sql = {email: email, name: name, password: password};
//     let query = connection.query('insert into jsman set ?', sql, (err, rows) => {
//         if(err) throw err;
//         res.render('welcome.ejs', {'name': name, 'id': rows.insertId})
//     })
// })

module.exports = router;