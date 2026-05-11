import fs from 'node:fs/promises'
import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
import { BookValidator } from '#validators/book'
export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const response = await Book.query().orderBy('title', 'asc')
    return response
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(BookValidator)
    const coverBuffer = await fs.readFile(data.cover.tmpPath!)
    const book = await Book.create({ ...data, cover: coverBuffer })
    return book
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('author')
      .firstOrFail()
    book.cover
    return book
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(BookValidator)
    const coverBuffer = await fs.readFile(data.cover.tmpPath!)

    const book = await Book.findOrFail(params.id)
    book.merge({ ...data, cover: coverBuffer })
    return book.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return book.delete()
  }

  /**
   * Get books from user
   */
  async getMyBooks({ auth, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized('skibidilatif')
    }

    const books = await user.related('books').query()

    return books
  }

  async getCover({ params, response }: HttpContext) {
  const book = await Book.query()
    .select('cover')
    .where('id', params.id)
    .firstOrFail()

  response.header('Content-Type', 'image/jpeg')
  response.header('Cache-Control', 'public, max-age=86400')

  return response.send(book.cover)
}
}