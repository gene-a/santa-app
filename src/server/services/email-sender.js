import { nodemailer } from 'nodemailer'
import { wishRepo } from '../data-access/wish-repository'

// Saving my username and password to ethereal here
// Ideally this shouldn't be done but I wanted to tie it up to my project
// Username: lacy33@ethereal.email
// Password: 5UGSwZPhGh9Uys4BFy

// Mailer interval const
const intervalInMs = 15000

// Creating a transporter using Ethereal
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'lacy33@ethereal.email',
    pass: '5UGSwZPhGh9Uys4BFy',
  },
})

/**
 * Initializes an email sender that periodically sends emails for new wishes.
 *
 * @function
 * @param {number} intervalInMs - The interval in milliseconds between email sends.
 * @throws {Error} Throws an error if there is an issue initializing the email sender.
 */
const initEmailSender = function () {
  // Set up the interval
  setInterval(() => {
    const mailOptions = {
      from: 'do_not_reply@northpole.com',
      to: 'santa@northpole.com',
      subject: 'A new wish!',
      text: '',
    }

    wishes = wishRepo.getWishesMap()
    // Only get the ones that have not been sent yet
    const unsentWishes = Array.from(wishes).filter(
      ([key, value]) => !value.isSent
    )

    // Loop over all unsent wishes
    unsentWishes.forEach(([wishId, wish]) => {
      // Get the info we need for the text body which is:
      // Username
      // Address
      // The actual wish
      mailOptions.text = $`New wish for ${wish.user.username} who lives at ${wish.userAddress}. They are wishing for: ${wish.wish}`

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error)
        } else {
          wishRepo.setWishToSent(wishId)
          console.log('Email sent:', info.response)
        }
      })
    })
  }, intervalInMs)
}

export const emailSender = {
  initEmailSender: initEmailSender,
}
