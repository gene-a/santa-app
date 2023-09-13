import axios from 'axios'
import { apiFetchConfig } from '../../../config/api-fetch-config.js'

/**
 * Fetches user profile data from the URL.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the fetched JSON data.
 * @throws {Error} If there is an error during the request.
 */
const getUserProfiles = async function () {
  try {
    const response = await axios.get(
      apiFetchConfig.USER_PROFILE_API.GET_USER_PROFILES
    )

    if (response.status !== 200) {
      throw new Error(
        `HTTP error! Status: Couldn't read from JSON with status ${response.status}`
      )
    }

    return response.data
  } catch (e) {
    console.error('Error on getting user profiles:', e.message)
    throw e // Re-throw the error to propagate it
  }
}

/**
 * Retrieves a user by their unique identifier (UID) from the server.
 *
 * @async
 * @function
 * @param {string} uid - The unique identifier of the user to retrieve.
 * @returns {Promise<Object | null>} A promise that resolves to the user profile object if found, or null if not found.
 * @throws {Error} If there is an error during the retrieval process.
 * @see {@link User} The User object structure.
 */
const getUserProfileByUuid = async function (uid) {
  try {
    const getUserProfileResponse = await getUserProfiles()

    // Ideally we check by HTTP status code here != 200 or something
    if (!getUserProfileResponse) {
      throw new Error(`HTTP error! Status: Couldn't read from JSON`)
    }

    const userProfile = getUserProfileResponse.find(
      (item) => item.userUid === uid
    )

    // Return user profile or Null if not found
    return userProfile || null
  } catch (e) {
    console.error('Error getting user profile by uid:', e.message)
    throw e // Re-throw the error to propagate it
  }
}

export const userProfileFetcher = {
  getUserProfiles: getUserProfiles,
  getUserProfileByUuid: getUserProfileByUuid,
}
