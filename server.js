// server.js

// init project
import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import { join } from 'path'
import { santaController } from './src/server/controllers/santa-controller.js'
import { apiConfig } from './config/api-config.js'
import { emailSender } from './src/server/services/email-sender.js'

// Starting up express
const app = express()

// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(express.static('public'))

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
  response.sendFile(join(__dirname, 'dist', 'index.html'))
  console.log(response.json(routes))
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)

  // Initialize the email sender
  emailSender.initEmailSender()
})
