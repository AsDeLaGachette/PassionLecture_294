import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  async store({ request }: HttpContext){
    
  }
}