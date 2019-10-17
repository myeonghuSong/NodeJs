const express = require('express');
const mysql = require('mysql');
const router = express.Router();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'smh811',
    database: 'practice'
})

connection.connect();

router.post('/form', (req, res) => {
    res.render('email.ejs', {'email': req.body.email})
})

router.post('/ajax', (req, res) => {
    let email = req.body.email;
    let responseData = {};

    let query = connection.query('select name from jsman where email="'+ email + '"', function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            responseData.result = "ok";
            responseData.name = rows[0].name;
        } else {
            responseData.result = "fail";
            responseData.name = '';
        }
        res.json(responseData);
    })
})

module.exports = router;