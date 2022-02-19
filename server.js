const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./passport')
const passport = require('passport')
const morgan = require('morgan')

const app = express()

const PORT = process.env.PORT || 3005

app.use(cors({
   credentials: true,
   origin: [process.env.CLIENT, 'http://localhost:3000', 'https://stark-oasis-90056.herokuapp.com']
}))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//auth
app.get('/auth',
   passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/callback',
   passport.authenticate('github', { failureRedirect: '/login' }),
   function (req, res) {
      res.redirect(process.env.CLIENT);
   });

app.listen(PORT, () => {
   console.log(`${PORT}`);
})