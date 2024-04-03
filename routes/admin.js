var express = require('express');
var router = express.Router();
var registerDetails = require("../register/register-details");
const session = require('express-session');

router.get('/', (req, res, next) => {
    res.render('admin/adminlog', {title: 'admin' });
});


router.post('/adminlog', (req, res) => {
    console.log(req.body);
    registerDetails.LoginInfo().then((products) => {
        res.render('admin/admin',{products, title :"admin"});
    })
});

module.exports = router;