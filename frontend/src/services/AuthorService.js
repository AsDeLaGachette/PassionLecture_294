import apiClient from "./api"

export default {
  getAuthors() {
    return apiClient.get('/authors')
  }
}
