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

router.get('/list', (req, res) => {
    res.render('movie.ejs');
})

// 1. /movie , GET
router.get('/', (req, res) => {
    let responseData = {};

    let query = connection.query('select title from movie', (err, rows) => {
        if(err) throw err;
        if(rows.length) {
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.ressult = 0;
        }
        res.json(responseData);
    })
});

//2. /movie , POST
router.post('/', (req, res) => {
    let title = req.body.title;
    let type = req.body.type;
    let grade = req.body.grade;
    let actor = req.body.actor;

    let sql = {title, type, grade, actor};
    let query = connection.query('insert into movie set ?', [sql], (err, rows) => {
        if(err) throw err;
        return res.json({'result' : 1});
    })
})


// 3. /movie:title , GET
router.get('/:title', (req, res) => {
    let title = req.params.title;

    let responseData = {};

    let query = connection.query('select * from movie where title= ?', [title], (err, rows) => {
        if(err) throw err;
        if(rows[0]) {
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.ressult = 0;
        }
        res.json(responseData);
    })
});

// 4. /movie:title , DELETE
router.delete('/:title', (req, res) => {
    let title = req.params.title;

    let responseData = {};

    let query = connection.query('delete from movie where title= ?', [title], (err, rows) => {
        if(err) throw err;
        if(rows.affectedRows > 0) {
            responseData.result = 1;
            responseData.data = title;
        } else {
            responseData.ressult = 0;
        }
        res.json(responseData);
    })
});

module.exports = router;