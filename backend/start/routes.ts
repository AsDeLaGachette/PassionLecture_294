/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const AuthController = () => import('#controllers/auth_controller')
const GenresController = () => import('#controllers/genres_controller')

router
  .group(() => {
    router.resource('books', BooksController).apiOnly().use(['update', 'store', 'destroy'], middleware.auth())
    router.resource('genres', GenresController).apiOnly()
    router.resource('authors', AuthorsController).apiOnly()
    router.get('/me/books', [BooksController, 'getMyBooks']).use(middleware.auth())
    router.get('/books/:id/cover', [BooksController, 'getCover'])
    router
      .group(() => {
        router
          .resource('reviews', ReviewsController)
          .apiOnly()
          .use(['update', 'store', 'destroy'], middleware.auth())
      })
      .prefix('/books/:book_id')
      
    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout']).use(middleware.auth())
      })
      .prefix('user')
      router.get('/me', [AuthController, 'me']).use(middleware.auth())
  })
  .prefix('api')

router.get('swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})