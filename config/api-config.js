// Storing Fetch API URLs in a config file for maintainability
const BASE_PATH = `/api`
const API_VER = `/v1`

export const apiConfig = {
  WISH_API: {
    POST_WISH: `${BASE_PATH}${API_VER}/wish`,
  },
}
