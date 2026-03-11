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
  getReview(reviewId) {
    return apiClient.get(`/reviews/${reviewId}`)
  },
  addReview(review) { 
    return apiClient.post(`/reviews`, review)
  },
  updateReview(reviewId, updatedReview) {
    return apiClient.put(`reviews/${reviewId}`, updatedReview)
  },
  deleteReview(reviewId) {
    return apiClient.delete(`/reviews/${reviewId}`)
  },
}
