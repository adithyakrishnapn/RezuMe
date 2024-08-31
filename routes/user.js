const express = require('express');
const router = express.Router();
const registerDetails = require("../register/register-details");
const session = require('express-session');

// Middleware to verify if the user is already logged in
const VerifyLogin = function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect("/createpdf");
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', VerifyLogin, function (req, res, next) {
  const error = req.session.loginErr;
  req.session.loginErr = null; // Clear error after displaying it
  const main = "active";
  const img = '/images/Amsterdam.png';
  res.render('index', { title: 'RezuME', img, create: false, main, error });
});

/* POST login - handle user login */
router.post('/index', (req, res, next) => {
  registerDetails.loginDetails(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/createpdf');
    } else {
      req.session.loginErr = "Invalid username or password"; // Set error message
      res.redirect('/');
    }
  }).catch((error) => {
    console.error('Login Error:', error);
    req.session.loginErr = "Something went wrong. Please try again.";
    res.redirect('/');
  });
});

/* GET signup page */
router.get('/signup', (req, res) => {
  const mailError = req.session.mailError;
  req.session.mailError = null; // Clear error after displaying it
  res.render('signup/signin', { mailError });
});

/* POST signup - handle user registration */
router.post('/signup', (req, res) => {
  // Check if the user already exists in the database
  registerDetails.CheckInfo(req.body.Mail).then((exists) => { 
    if (exists) {
      req.session.mailError = "Email already exists. Please use a different email.";
      res.redirect('/signup');
    } else {
      // Proceed to register the user if they don't exist
      registerDetails.addDetails(req.body).then((userId) => { // Updated to use the returned user ID
        req.session.loggedIn = true;
        req.session.user = { Mail: req.body.Mail, id: userId }; // Set user details in session
        res.redirect('/');
      }).catch((error) => {
        console.error('Signup Error:', error);
        req.session.mailError = "Registration failed. Please try again.";
        res.redirect('/signup');
      });
    }
  }).catch((error) => {
    console.error('Check Info Error:', error);
    req.session.mailError = "Error checking user information.";
    res.redirect('/signup');
  });
});


/* GET about page */
router.get('/about', (req, res) => {
  res.render('about', { about: true });
});

module.exports = router;
