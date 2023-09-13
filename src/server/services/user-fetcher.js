import axios from 'axios'
import { USER_API } from './config/api-fetch-config.js'

/**
 * Fetches user data from the URL.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to the user data.
 * @throws {Error} If there is an error during the request.
 */
const getUsers = async function () {
  try {
    const response = await axios.get(USER_API.GET_USERS)

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error // Re-throw the error to propagate it
  }
}
