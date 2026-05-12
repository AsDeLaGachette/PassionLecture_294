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
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()

    const genre = await Genre.create(data)

    return response.created(genre)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const genre = await Genre.query()
          .where('id', params.id)
          .firstOrFail()
        return genre
  }

   /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const genre = await Genre.findOrFail(params.id)
    genre.merge(data)
    return genre.save()
  }

  /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
      const genre = await Genre.query().where('id', params.id).firstOrFail()
  
      await genre.delete()
      return response.noContent()
    }
}
