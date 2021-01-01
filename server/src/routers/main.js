const express = require('express')
require('../db/mongoose')
require('../passport')
const session = require('express-session')
const router = new express.Router()
const auth = require('../middleware/auth')
const flash = require('connect-flash')

router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: 'auto',
        },
    }),
);

router.get('/test', function(req, res, next) {
    res.json({ title: 'Express. Responded by  Node.' });
  });

router.get('/', (req, res) => {
    res.render("index", req.user)
})

// Copy chat app tutorial 
router.get('/about', (req, res) => {
    res.send('Under construction now')
})

router.get('/apps', (req, res) => {
    try{
        res.status(200).send('app service')
    }catch(e){
        res.redirect('/auth/login')
    }
})

router.get('/home', (req, res) => {
    res.redirect('https://startnorth.webflow.io/')
})

router.get('/completed', (req, res) => {
    res.send('Completed Registration!')
})

module.exports = router