require('dotenv').config({ path: './config/dev.env' })
const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const passport = require('passport')
require('../passport')
const session = require('express-session')
const router = new express.Router()
const needle = require('needle');
const { 
    getRecentPost, 
    getHashtag, 
    getUserData, 
    getRules, 
    postRules,
    streamTweets
} = require('../twitter')

const token = process.env.TWITTER_BEARER_TOKEN; 

router.get('/app/twitter', async (req, res) => {
    try {
        res.render("twitter-home", { user: req.user, token: req.token })

    } catch (e) {
        res.send('Auth failed')
    }
})

router.get('/app/twitter/hashtag', async (req, res) => {
        var keyword = 'Twitter' 
        if (req.query.keyword) {
            keyword = req.query.keyword
        }
        const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'
        // Edit query parameters below
        const params = {
            'query': keyword, 
            'tweet.fields': '',
            'max_results': 10,
        } 
        try {
        const response = await needle('get', endpointUrl, params, { headers: {
            "authorization": `Bearer ${token}`
            }})
    
        if(response.statusCode === 200) {
            // console.log(response.body)
            res.send(response.body)
        } else {
            throw new Error (response.body.error.message)
        }
        } catch (e) {
            res.send(e)
        }
    })

router.get('/app/twitter/user', async (req, res) => {
    try {
        res.render("twitter-home", { user: req.user, token: req.token })

    } catch (e) {
        res.send('Auth failed')
    }
})

router.get('/app/twitter/tweets', async (req, res) => {
    try {
        const response = await getRecentPost()
        console.log(response)
        res.send(201).send( { data: response })

    } catch (e) {
        res.send('Auth failed')
    }
})

router.get('/app/twitter/api/rules', async (req, res) => {
    try {
        const response = await getRules()
        console.log(response)
        res.render("twitter-recent-post", { user: req.user, data: response })

    } catch (e) {
        res.send('Auth failed')
    }
})

router.post('/app/twitter/api/rules', async (req, res) => {
    try {
        const response = await postRules()
        res.render("twitter-recent-post", { user: req.user, data: response })

    } catch (e) {
        res.send('Auth failed')
    }
})

module.exports = router