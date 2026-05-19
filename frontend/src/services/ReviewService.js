import apiClient from './api'

export default {
  getReviews(bookId) {
    return apiClient.get(`/books/${bookId}/reviews`)
  },
  getReview(reviewId) {
    return apiClient.get(`/books/${bookId}/reviews/${reviewId}`)
  },
  addReview(bookId, review) {
    return apiClient.post(`/books/${bookId}/reviews`, review)
  },
  updateReview(bookId, reviewId, updatedReview) {
    return apiClient.put(`/books/${bookId}/reviews/${reviewId}`, updatedReview)
  },
  deleteReview(bookId, reviewId) {
    return apiClient.delete(`/books/${bookId}/reviews/${reviewId}`)
  },
}
