import { addWish } from '../data-access/wish-repository.js'

/**
 * Posts a wish for a user.
 *
 * @param {string} user - The user for whom the wish is being posted.
 * @param {string} wish - The wish to be posted.
 * @returns {Promise<string>} A promise that resolves to the generated wish ID.
 * @throws {string} If there is an error creating the wish, a rejection with an error message is thrown.
 */
const postWish = function (user, wish) {
  return new Promise((resolve, reject) => {
    // Store data to in-memory repo
    const wishId = addWish(user, wish)

    if (wishId === null) {
      reject(`Failed to create wish for user:${user}`)
    }

    // If wish creation was successful we send back the generated UUID
    resolve(wishId)
  })
}

export const santaController = {
  postWish: postWish,
}
