// server.js
// where your node app starts

// init project
const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
const { WISH_API } = require('./config/api-config.js')
const { postWish } = require('./src/server/controllers/santa-controller.js')

// Replaced deprecated body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Replaced deprecated morgan
const loggerFormat =
  ':method :url :status :res[content-length] - :response-time ms'
app.use(morgan(loggerFormat))

app.use(express.static('public'))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get(WISH_API.POST_WISH, (request, response) => {
  postWish(request)
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
