const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_DEV_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    UseFindAndModify: false,
})

module.exports = mongoose
