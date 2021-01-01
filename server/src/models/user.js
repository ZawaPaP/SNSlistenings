const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require("path");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (!validator.isLength(value,{min: 6,max: undefined}))
            {
                throw new Error('Password must longer than 6')
            } else if (validator.contains(value, 'password', {ignoreCase: true})){
                throw new Error ('Password cannot contain phrase of password')
            }
        }
    }, 
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    birthDate: {
        type: Date
    },
    tel: {
        type: Number,
        trim: true,
    },
    country: {
        type: String,
        default: "JP",
    },
    tokens: [{
        token: {
            type: String,
            require: true,
        }
    }],
    avatar: {
        type: Buffer, 
    }
},{
    timestamps: true
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.email
    delete userObject.password
    delete userObject.tokens
    return userObject
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_TOKEN, {expiresIn: '1 days' })

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User