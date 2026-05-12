import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async login({ request, response }: HttpContext) {
    // Validation du nom d'utilisateur et mot de passe
    const { email, password } = await request.validateUsing(loginValidator)
    // Vérification qu'un utilisateur existe avec ce nom d'utilisateur et ce mot de passe
    const user = await User.verifyCredentials(email, password)
    // Génération d'un token OAT
    const token = await User.accessTokens.create(user)
    // Retourne le token et les infos utilisateurs
    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  /**
   * Display form to create a new record
   */
  async register({ request, response }: HttpContext) {
    // Validation des données utilisateurs
    const payload = await request.validateUsing(registerValidator)
    // Création de l'utilisateur
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)
    // Retourne les données utilisateurs
    return response.created({
      user,
      token: token,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async logout({ auth, response }: HttpContext) {
    // Récupère l'utilisateur connecté/authentifié
    const user = auth.getUserOrFail()
    // Récupère le token de l'utilisateur connecté
    const token = auth.user?.currentAccessToken.identifier
    // Si le token n'existe pas, retourne une erreur HTTP 400
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    // Supprime le token
    await User.accessTokens.delete(user, token)
    // Confirme à l'utilisateur que le logout est un succès
    return response.ok({ message: 'Logged out' })
  }
  async me({ auth, response }: HttpContext) {
    // Récupère l'utilisateur connecté/authentifié
    const user = auth.getUserOrFail()
    // Retourne les informations de l'utilisateur
    return response.ok({ user })
  }
}
