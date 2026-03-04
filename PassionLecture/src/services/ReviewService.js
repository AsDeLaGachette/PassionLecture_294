import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getReviews(bookId) {
    return apiClient.get(`/reviews?book_id=${bookId}`)
  },
  getReview(bookId, reviewId) {
    return apiClient.get(`/books/${bookId}/reviews/${reviewId}`)
  },
  addReview(review) {
    return apiClient.post(`/reviews`, review)
  },
  updateReview(bookId, reviewId) {
    return apiClient.put(`/books/${bookId}/reviews/${reviewId}`)
  },
  deleteReview(bookId, reviewId) {
    return apiClient.delete(`/books/${bookId}/reviews/${reviewId}`)
  },
}
