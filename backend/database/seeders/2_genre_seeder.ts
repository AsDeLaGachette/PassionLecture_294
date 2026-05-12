import Genre from '#models/genre'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {

    await Genre.createMany([
      { 
        title: 'Roman'
      },
      { 
        title: 'Science-fiction'
      },
      { 
        title: 'Fantastique'
      },
      { 
        title: 'Policier'
      },
      { 
        title: 'Histoire'
      },
      { 
        title: 'Développement personnel'
      },
      { 
        title: 'Poésie'
      },
      { 
        title: 'Essai'
      },
      { 
        title: 'Enfant'
      },
      { 
        title: 'Bande dessinée'
      },
      { 
        title: 'Manga'
      },
      { 
        title: 'Cuisine'
      },
      { 
        title: 'Biographie'
      },
      { 
        title: 'Philosophie'
      },
      { 
        title: 'Art'
      },
      { 
        title: 'Musique'
      },
      { 
        title: 'Hentai'
      },
      { 
        title: 'Erotique'
      },
      { 
        title: 'Humour'
      },
      { 
        title: 'Aventure'
      },
      { 
        title: 'Thriller'
      },
      { 
        title: 'Romance'
      }
    ])
  }
}