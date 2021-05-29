const express = require('express')
const serverless = require('serverless-http')
const passport = require('passport')
const AtlassianStrategy = require('passport-atlassian-oauth2')
require('dotenv').config()

const authMiddleware = require('./middlewares/authMiddleware')

passport.use(new AtlassianStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  scope: 'offline_access read:jira-user',
}, (accessToken, refreshToken, profile, cb) => {
  // Profile should be stored to the database in real applications
  console.log(accessToken)
  cb(null, profile);
}));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

const app = express()
app.use(passport.initialize())

app.get('/auth/atlassian', passport.authenticate('atlassian'), (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Hello from Jira'
  })
})

app.get('/auth/atlassian/callback',
  passport.authenticate('atlassian', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/react-callback')
  })

app.get('/error', (req, res) => {
  res.redirect('/error')
})

// app.use(authMiddleware)

app.use('/', require('./routes/s3Routes'))

app.use((err, req, res, next) => {
  res.status(err.statusCode || 404).json({
    errMessage: err.message || '',
    error: err
  })
})

// app.listen(3001, (err) => {
//   if (err) { return console.log(`Error`, err) }
//   console.log('Listening on port 3001')
// })

module.exports.app = serverless(app);
