var express = require('express');
var router = express.Router();
var adminDetails = require("../register/admin-details");
var registerDetails = require("../register/register-details");
const session = require('express-session');


const VerifyLogin = function(req,res,next){
    if(req.session.loggedIn){
        next();
    }
    else{
        res.redirect("/admin");
    }
}

router.get('/', (req, res, next) => {
    let main = "active";
    error = req.session.loginErr;
    res.render('admin/adminlog', { title: 'admin', main, error ,ad:true });
});


router.get('/adminlog',VerifyLogin, (req, res, next) => {
    let main = "active";
    let admin = req.session.admin;
    console.log(admin);
    registerDetails.LoginInfo().then((products) => {
        res.render('admin/admin', { products, title: "admin", admin, main, ad:true });
    });

})

router.post('/adminlog', (req, res) => {
    console.log(req.body);
    adminDetails.adminLogin(req.body).then((products) => {
        if (products.status) {
            req.session.loggedIn = true;
            req.session.admin = products.admin;
            res.redirect('/admin/adminlog');
        }
        else {
            req.session.loginErr = true;
            res.redirect('/admin');
        }
    })
});

router.get('/logout',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;