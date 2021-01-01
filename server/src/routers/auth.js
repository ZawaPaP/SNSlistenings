const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const SNSCredentials = require('../models/sns-credentials')
const passport = require('passport')
require('../passport')
const session = require('express-session')
const router = new express.Router()
const auth = require('../middleware/auth')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')

const PROFILE_PAGE_URL = "http://localhost:8080/profile";

const sessionizeUser = user => {
    return { userId: user.id, username: user.username, userAvatar: user.avatar};
  }

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/'}),
   function (req,res){
        const sessionUser = sessionizeUser(req.user);
        req.session.user = sessionUser
        console.log(req.session)
        // const user = await User.findOne({ _id: sessionUser.userId })
        res.send(sessionUser);
        // res.redirect(PROFILE_PAGE_URL)
    }
);

router.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const sessionUser = sessionizeUser(user);
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    req.session.user = sessionUser
    res.send(sessionUser);
}
);

router.get('/auth/login', async(req, res) => {
  console.log('get auth login')
  console.log(req.session)
  const user = req.session.user
  // const snsData = await SNSCredentials.findOne({ twitterOauthToken: oauthToken })
  if(user) {
    const userData = await User.findOne({ _id: user.userId })
    res.send({ user, userData });
  // } else if (oauthToken && snsData) {
  //   console.log('ouathToken if')
  //     res.send({ user, userData });
  }else {
    console.log('get auth login failed')
    res.send({ user })
  }
})

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log('start get login success')
  // console.log(req.session)
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
  console.log('get login success failed')
});


router.get('/auth/logout',async (req, res) => {
    try {
        const user = req.session.user;
        if (user) {
          req.session.destroy(err => {
            if (err) throw (err);
            res.clearCookie(process.env.SESS_NAME);
            res.send(user);
            console.log("Logout success")
          });
        } else {
          throw new Error('Something went wrong');
        }
      } catch (err) {
        res.send(err);
      }
})

module.exports = router