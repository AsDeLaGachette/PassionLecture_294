import { GenreFactory } from '#database/factories/genre_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await GenreFactory.createMany(8)
  }
}