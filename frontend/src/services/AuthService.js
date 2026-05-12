import apiClient from './api'


export default {
  async register(data) {
    const res = await apiClient.post(`/user/register`, data)
    localStorage.setItem('auth_token', res.data.token.token)
    return res.data
  },

  async login(credentials) {
    const res = await apiClient.post(`/user/login`, credentials)
    localStorage.setItem('auth_token', res.data.token.token)
    return res.data
  },

  logout() {
    apiClient.post(`/user/logout`)
    localStorage.removeItem('auth_token')
  },

  getCurrentUser() {
    return apiClient.get('/me')
  },
}
