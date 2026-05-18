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
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()

    const author = await Author.create(data)

    return response.created(author)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const author = await Author.query().where('id', params.id).firstOrFail()
    return author
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const author = await Author.findOrFail(params.id)
    author.merge(data)
    return author.save()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const author = await Author.query().where('id', params.id).firstOrFail()

    await author.delete()
    return response.noContent()
  }
}
