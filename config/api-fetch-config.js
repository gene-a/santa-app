// Storing Fetch API URLs in a config file for maintainability
const BASE_URL = 'https://raw.githubusercontent.com/alj-devops/santa-data'
const BASE_ROOT_PATH = 'master'

export const apiFetchConfig = {
  USER_API: {
    GET_USERS: `${BASE_URL}/${BASE_ROOT_PATH}/users.json`,
  },
  USER_PROFILE_API: {
    GET_USER_PROFILES: `${BASE_URL}/${BASE_ROOT_PATH}/userProfiles.json`,
  },
}
