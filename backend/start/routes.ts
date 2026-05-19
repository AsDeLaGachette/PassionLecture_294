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
import BooksController from '#controllers/books_controller'
import AuthorsController from '#controllers/authors_controller'
import ReviewsController from '#controllers/reviews_controller'
import AuthController from '#controllers/auth_controller'
import GenresController from '#controllers/genres_controller'

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
