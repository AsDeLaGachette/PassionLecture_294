import apiClient from "./api"

export default {
  getReviews(bookId) {
    return apiClient.get(`/books/${bookId}/reviews`)
  },
  getReview(reviewId) {
    return apiClient.get(`/reviews/${reviewId}`)
  },
  addReview(review, bookId) { 
    return apiClient.post(`/books/${bookId}/reviews`, review)
  },
  updateReview(reviewId, updatedReview) {
    return apiClient.put(`reviews/${reviewId}`, updatedReview)
  },
  deleteReview(reviewId) {
    return apiClient.delete(`/reviews/${reviewId}`)
  },
}
