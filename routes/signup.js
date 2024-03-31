var express = require('express');
var router = express.Router();
var registerDetails = require("../register/register-details");
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  let main = "active";
  let img = '/images/Amsterdam.png';
  res.render('signup/signin', { title: 'RezuME' , img, create: false, main});
});

router.post('/signup',(req,res,next)=>{ 
  console.log(req.body);
  registerDetails.addDetails(req.body).then((result)=>{
    console.log("Account created / inserted")
    res.redirect('/');
  })

});

module.exports = router;
