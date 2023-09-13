import axios from 'axios'
import { apiFetchConfig } from '../../../config/api-fetch-config.js'

/**
 * Fetches user data from the URL.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the fetched JSON data.
 * @throws {Error} If there is an error during the request.
 */
const getUsers = async function () {
  try {
    const response = await axios.get(apiFetchConfig.USER_API.GET_USERS)

    if (response.status !== 200) {
      throw new Error(
        `HTTP error! Status: Couldn't read from JSON with status ${response.status}`
      )
    }

    return response.data
  } catch (e) {
    console.error('Error getting users:', e.message)
    throw e // Re-throw the error to propagate it
  }
}

/**
 * Retrieves a user by their username from the server.
 *
 * @async
 * @function
 * @param {string} username - The username of the user.
 * @returns {Promise<Object | null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If there is an error during the retrieval process.
 * @see {@link User} The User object structure.
 */
const getUserByUsername = async function (username) {
  try {
    const getUsersResponse = await getUsers()

    if (!getUsersResponse) {
      throw new Error(`HTTP error! Status: Couldn't read from JSON`)
    }

    const user = getUsersResponse.find((item) => item.username === username)

    // Return user or Null if not found
    return user || null
  } catch (e) {
    console.error('Error getting user by username:', e.message)
    throw e // Re-throw the error to propagate it
  }
}

export const userFetcher = {
  getUsers: getUsers,
  getUserByUsername: getUserByUsername,
}
