// server.js

// init project
const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
const connect = require('connect')
const {
  santaController,
} = require('./src/server/controllers/santa-controller.js')
const { apiConfig } = require('./config/api-config.js')
const { emailSender } = require('./src/server/services/email-sender.js')

// Middleware
const connectApp = connect()
connectApp.use((req, res, next) => {
  console.log('Request URL:', req.url)
  next()
})
app.use(connectApp)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const loggerFormat =
  ':method :url :status :res[content-length] - :response-time ms'
app.use(morgan(loggerFormat))
app.use(express.static('public'))

app.post('/something/', async (request, response) => {
  console.log('something hit')
})

app.post(apiConfig.WISH_API.POST_WISH, async (request, response) => {
  try {
    const { user, userAddress, wish } = request.body
    const wishId = await santaController.postWish(user, userAddress, wish)

    // Send the generated wish ID as a response
    response.send({ wishId })
  } catch (e) {
    console.error('Failed to post wish:', e)
    response.status(500).json({ error: 'Failed to post wish' })
  }
})

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
  console.log(response.json(routes))
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)

  // Initialize the email sender
  emailSender.initEmailSender()
})
