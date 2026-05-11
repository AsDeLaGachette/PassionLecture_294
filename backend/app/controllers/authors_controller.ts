import Author from '#models/author'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const response = await Author.all()
    return response
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}
}