const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const snsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    }, 
    provider: {
        type: String,
        trim: true,
        lowercase: true,
    },
    avatar: {
    },
    twitterOauthToken: {
        type: String,
    },
    twitterOauthTokenSecret: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
},{
    timestamps: true
})

snsSchema.statics.findByCredentials = async (id) => {
    const user = await SNSCredentials.findOne({ id })
    if(!user) {
        return null
    }
        return user
}

const SNSCredentials = mongoose.model('SNSCredentials', snsSchema)

module.exports = SNSCredentials