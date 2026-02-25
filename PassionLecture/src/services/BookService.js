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
  getBooks() {
    return apiClient.get('/books')
  },
  getBook(id){
    return apiClient.get(`/books/${id}`)
  },
  getBookFromUser(userId){
    return apiClient.get(`/user/${userId}/books`)
  },
  addBook(book){
    return apiClient.post('/books', book)
  },
  updateBook(id, book) {
  return apiClient.put(`/books/${id}`, book)
}
}
