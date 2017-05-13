const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require("../data");

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/", (req, res) => {
    if (!req.user) {
       return res.redirect('/account');
    }
    try {
            res.render('home/home');
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

module.exports = router;