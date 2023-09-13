import axios from 'axios'
import { USER_PROFILE_API } from './config/api-fetch-config.js'

/**
 * Fetches user profile data from the URL.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to the user profile data.
 * @throws {Error} If there is an error during the request.
 */
const getUserProfiles = async function () {
  try {
    const response = await axios.get(USER_PROFILE_API.GET_USER_PROFILES)

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error // Re-throw the error to propagate it
  }
}
