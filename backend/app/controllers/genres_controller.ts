import Genre from '#models/genre'
import type { HttpContext } from '@adonisjs/core/http'

export default class GenresController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const response = await Genre.all()
    return response
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}
}
