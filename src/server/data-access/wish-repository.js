// Using uuid for creating distinct IDs for each wish
import { v4 } from 'uuid'

// For simplicity, we use a Map to create a store of wishes
const wishesMap = new Map()

/**
 * Creates a new wish object with the provided user and wish details.
 * Internal function used for the addWish function that inserts into the repo.
 *
 * @param {string} user - The user making the wish.
 * @param {string} userAddress - The user's address
 * @param {string} wish - The wish content.
 * @returns {Object} - The created wish object.
 */
const createWish = function (user, wish) {
  return {
    user: user,
    userAddress: userAddress,
    wish: wish,
    isSent: false,
    timeSentUtc: new Date(0).toISOString(), // Minimum date for new wishes
  }
}

/**
 * Adds a new wish to the wishes map.
 *
 * @param {string} user - The user making the wish.
 * @param {string} userAddress - The user's address
 * @param {string} wish - The wish content.
 * @returns {string|null} - The ID of the added wish or null if the addition fails.
 */
const addWish = function (user, userAddress, wish) {
  const wishId = undefined
  try {
    wishId = v4()
    wishesMap.set(wishId, createWish(user, userAddress, wish))
  } catch (e) {
    // Log the message and return undefined to the client
    console.error(`Failed to create wish for user ${user}`)
  }
  return wishId // Return the generated wish ID
}

/**
 * Retrieves a wish from the wishes map by its ID.
 *
 * @param {string} id - The ID of the wish to retrieve.
 * @returns {Object|null} - The retrieved wish object or null if retrieval fails.
 */
const getWish = function (id) {
  const wish = undefined
  try {
    wish = wishesMap.get(id)
  } catch (e) {
    // Log the message and return undefined to the client
    console.error(`Failed to get wish with id${id}`)
  }
  return wish
}

/**
 * Retrieves all wishes as a Map
 *
 * @returns {Object|null} - The retrieved wishes map
 */
const getWishesMap = function () {
  return wishesMap
}

/**
 * Sets a wish to "sent" by updating the boolean flag to true.
 * Sent time in UTC is also updated to when the function was triggered.
 * @param {string} id - The ID of the wish to update.
 */
const setWishToSent = function (id) {
  const wish = getWish(id)
  if (wish) {
    wish.isSent = true
    wish.timeSentUtc = new Date().toISOString()

    // Update the wish in the map
    wishesMap.set(id, wish)
  }
}

export const wishRepo = {
  getWish: getWish,
  getWishesMap: getWishesMap,
  addWish: addWish,
  setWishToSent: setWishToSent,
}
