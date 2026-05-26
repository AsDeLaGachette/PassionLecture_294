import fs from 'node:fs/promises'
import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
import { BookValidator } from '#validators/book'
import db from '@adonisjs/lucid/services/db'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const response = await Book.query().preload('author').preload('genre').orderBy('title', 'asc')
    return response
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(BookValidator)
    const coverBuffer = await fs.readFile(data.cover.tmpPath!)
    const book = await Book.create({ ...data, cover: coverBuffer })
    return response.created(book)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('author').preload('genre')
      .firstOrFail()
    book.cover
    return book
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(BookValidator)
    
    const book = await Book.findOrFail(params.id)
    
    if (data.cover) {
      const coverBuffer = await fs.readFile(data.cover.tmpPath!)
      book.merge({ ...data, cover: coverBuffer })
    } else {
      const { cover, ...dataWithoutCover } = data
      book.merge(dataWithoutCover)
    }
    
    return book.save()
  }

  /**
   * Delete record
   */
  async destroy({ params, response}: HttpContext) {
    const book = await Book.findOrFail(params.id)
    book.delete()
    return response.noContent() 
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
  const result = await db.from('books')
    .select('cover')
    .where('id', params.id)
    .first()

  if (!result?.cover) return response.notFound()

  response.header('Content-Type', 'image/jpeg')
  response.header('Cache-Control', 'no-store')

  return response.send(result.cover)
}
}