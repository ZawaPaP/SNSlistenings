const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const SNSCredentials = require('../models/sns-credentials')
const passport = require('passport')
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
require('../passport')
const session = require('express-session')
const router = new express.Router()


router.get('/connect/twitter',
  passport.authorize(
      'twitter-authz', 
      { failureRedirect: '/oauth/failed' }
      )
);

router.get('/connect/twitter/callback',
    passport.authorize(
        'twitter-authz',
        { failureRedirect: '/oauth/failed' }
    ),
  function(req, res) {
    var user = req.user;
    var account = req.account;
    console.log(req)
    res.render("profile", { user: account })
  }
);


router.get('/oauth/failed', async (req, res) => {
    res.send("Oauth failed")
})

module.exports = router