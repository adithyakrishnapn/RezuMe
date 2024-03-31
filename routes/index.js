var express = require('express');
var router = express.Router();
var registerDetails = require("../register/register-details");
const { response } = require('../app');
const session = require('express-session');



/* GET home page. */
router.get('/', function(req, res, next) {
  let main = "active";
  let img = '/images/Amsterdam.png';
  res.render('index', { title: 'RezuME' , img, create: false ,main});
});

router.post('/index',(req,res,next)=>{ 
  console.log(req.body);
  registerDetails.loginDetails(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/createpdf');
    }else{
      req.session.loginErr = true;
      res.redirect('/');
    }
  })
});

module.exports = router;
