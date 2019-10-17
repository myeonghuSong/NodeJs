const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Hello Friends!');
    console.log('main js loaded ', req.user);
    let id = req.user;
    if(!id) res.render('login.ejs');
    // res.sendFile(path.join(__dirname, '../../public/main.html'));
    res.render('main.ejs', {'id': id});
});

module.exports = router;