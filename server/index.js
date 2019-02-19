const express = require('express')
require('dotenv').config()
const {json} = require('body-parser')
const session = require('express-session')
const app = express()
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swagCt = require('./controllers/swag_controller')
const authCt = require('./controllers/auth_controller')
const cartCt = require('./controllers/cart_controller')
const searchCt = require('./controllers/search_controller')

app.use(json())
app.use(session({
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge:1000*60*60*24
    }
}))
app.use(checkForSession)

app.get('/api/swag',swagCt.read)
app.get('/api/user',authCt.getUser)
app.post('/api/login',authCt.login)
app.post('/api/register',authCt.register)
app.post('/api/signout',authCt.signout)

app.post('/api/cart',cartCt.add)
app.post('/api/cart/checkout', cartCt.checkout)
app.delete('/api/cart', cartCt.delete)

app.get('/api/search', searchCt.search)


app.listen(SERVER_PORT, ()=> console.log("Working - Port 3k!"))
