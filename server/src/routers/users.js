const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const passport = require('passport')
require('../passport')
const session = require('express-session')
const router = new express.Router()
const auth = require('../middleware/auth')
const fs = require('fs');
const path = require("path");

const sessionizeUser = user => {
    return { userId: user.id, username: user.username, avatar: user.avatar};
  }


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const defaultAvatarPath = '../images/defaultAvatar.png'
    if(!user.avatar) {
    user.avatar = fs.readFileSync(path.resolve(__dirname,defaultAvatarPath));
    user.avatar.contentType = 'image/png';
    await user.save()
    }
    try{
        await user.save()
        // const token = await user.generateAuthToken()
        const sessionUser = sessionizeUser(user);
        req.session.user = sessionUser;
        res.send(sessionUser);
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/profile',async (req, res) => {
        res.send({ user: req.user })
});

router.get("", ({ session: { user }}, res) => {
    res.send({ user });
  });


// router.patch('/users/profile/update', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['username', 'email', 'birthDate']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if(!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates'})
//     }
//     try {
//         updates.forEach((update)=> req.user[update] = req.body[update])
//         await req.user.save()
//         res.send(req.user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



module.exports = router