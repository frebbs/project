const express = require('express');
const app = express();
const PORT = 8080;
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

const rootRouter = require('./router/rootRouter.js');
const membersRouter = require('./router/memberRouter.js');

app.use([
    express.json(),
    express.urlencoded({extended: true}),
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
      }),
    express.static('public')

]);


app.set('view engine', 'ejs');
app.use('/', rootRouter);
app.use('/members', membersRouter);


app.listen(PORT, () => {
    console.log(`Server Running`);
})
