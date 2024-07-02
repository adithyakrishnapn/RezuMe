var express = require('express');
var router = express.Router();
var registerDetails = require("../register/register-details");
const { response } = require('../app');
const session = require('express-session');

const VerifyLogin = function(req,res,next){
  if(req.session.loggedIn){
      res.redirect("/createpdf");
  }
  else{
      next()
  }
}

/* GET home page. */
router.get('/', VerifyLogin,function(req, res, next) {
  error = req.session.loginErr;
  let main = "active";
  let img = '/images/Amsterdam.png';
  res.render('index', { title: 'RezuME' , img, create: false ,main ,error});
});

router.post('/index',(req,res,next)=>{ 
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

router.get('/signup', (req,res)=>{
  let mailError = req.session.mailError;
  req.session.mailError = null;
  res.render('signup/signin', {mailError});
})

router.post('/signup', (req,res)=>{
  if(registerDetails.CheckInfo(req.body)){
    console.log("error");
    req.session.mailError = true;
    res.redirect('/signup');
  }else{
    registerDetails.addDetails(req.body).then((response)=>{
      console.log(response);
      res.redirect('/');
    })
  }
})

router.get('/about', (req,res)=>{
  res.render('about',{about:true});
})

module.exports = router;
