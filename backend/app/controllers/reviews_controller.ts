import Book from '#models/book'
import Review from '#models/review'
import { ReviewValidator } from '#validators/review'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReviewsController {
  /**
   * Display a list of resource
   */
  async index({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.book_id)

    await book.load('reviews', (query) => {
      query.preload('user')
    })
    return response.ok(book.reviews)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response, auth }: HttpContext) {
    const data = await request.validateUsing(ReviewValidator)

    const user = auth.user!

    const review = await Review.create({
      ...data,
      bookId: Number(params.book_id),
      userId: user.id,
    })

    return response.created(review)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const review = await Review.query().where('id', params.id).firstOrFail()
    return response.ok(review)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(ReviewValidator)

    const review = await Review.query().where('id', params.id).firstOrFail()
    review.merge(data)
    await review.save()
    return response.ok(review)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const comment = await Review.query().where('id', params.id).firstOrFail()

    await comment.delete()
    return response.noContent()
  }
}
