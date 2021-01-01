const express = require('express')
const path = require('path')
const http = require("http");
const mongoose = require('./src/db/mongoose')
const passport = require('passport')
const session = require('express-session')
require('./src/passport')
const MongoStore = require('connect-mongo')(session);
const bodyParser = require("body-parser");
const flash = require('connect-flash')
const authRouter = require('./src/routers/auth')
const oauthRouter = require('./src/routers/oauth')
const mainRouter = require('./src/routers/main')
const twitterAppRouter = require('./src/routers/twitter')
const userRouter = require('./src/routers/users')
const User = require('./src/models/user')
const cors = require("cors");

// const socketIo = require("socket.io");


let port = process.env.PORT
const app = express()

// const server = http.createServer(app);
// const io = socketIo(server);

app.use(
    session({
        name: process.env.SESS_NAME,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore ({ 
            url: process.env.MONGODB_SESSION_URL,
        }),
        cookie: {
            secure: 'auto',
        },
    }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use(
    cors({
      origin: "http://localhost:8080", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );



const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use(authRouter)
apiRouter.use(oauthRouter)
apiRouter.use(mainRouter)
apiRouter.use(twitterAppRouter)
apiRouter.use(userRouter)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection succeed!');
})

// io.on("connection", async (socket) => {
//     try {
//       io.emit("connect", "Client connected");
//       const stream = streamTweets(io, token);
//     } catch (e) {
//       io.emit("authError", authMessage);
//     }
//   });

console.log("NODE_ENV is", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 8000;
}

app.listen(port, () => {
    console.log(`Server is up to ${port}`)
})
