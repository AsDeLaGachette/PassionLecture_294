import Author from '#models/author'
import Book from '#models/book'
import Genre from '#models/genre'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class extends BaseSeeder {
  async run() {
    const authors = await Author.all()
    const genres = await Genre.all()
    // temp
    const image1 = Buffer.from(await readFile(join(__dirname, 'assets/capprev.png')))
    const image2 = Buffer.from(await readFile(join(__dirname, 'assets/wolvermine.jpg')))
    const image3 = Buffer.from(await readFile(join(__dirname, 'assets/montagnelangue.jpg')))
    const image4 = Buffer.from(await readFile(join(__dirname, 'assets/supergoon.jpg')))
    
    await Book.createMany([
      {
        id: 1,
        title: 'Capitaine Préverenges',
        year: 2026,
        authorId: authors[0].id,
        genreId: genres[0].id,
        userId: 1,
        publisher: 'Skibidi Tif',
        excerpt: "Capitain dave tu est trop fort oh mon dieu. S'exclama Tif",
        nbrPage: 67,
        description: 'Suivez les aventures de Capitaine Préverenges',
        cover: image1,
      },
      {
        id: 2,
        title: 'Wolvermine #1',
        year: 2026,
        authorId: authors[1].id,
        genreId: genres[1].id,
        userId: 1,
        publisher: 'Skibidi Tif',
        excerpt: 'Tif lives matter',
        nbrPage: 67,
        description: '',
        cover: image2,
      },
      {
        id: 3,
        title: 'Montagnes des langues',
        year: 2025,
        authorId: authors[2].id,
        genreId: genres[2].id,
        userId: 1,
        publisher: 'Skibidi Tif',
        excerpt: 'Tif lives matter',
        nbrPage: 67,
        description: '',
        cover: image3,
      },
      {
        id: 4,
        title: 'Supergoon #1',
        year: 2026,
        authorId: authors[0].id,
        genreId: genres[0].id,
        userId: 3,
        publisher: 'Skibidi Tif',
        excerpt: 'Tif lives matter',
        nbrPage: 67,
        description: '',
        cover: image4,
      },
      {
        id: 5,
        title: 'Latif',
        year: 1999,
        authorId: authors[0].id,
        genreId: genres[0].id,
        userId: 1,
        publisher: 'Latif Latif',
        excerpt: 'Latif Latif Latif Latif Latif Latif Latif Latif Latif Latif Latif Latif',
        nbrPage: 67,
        description: 'Latif Latif Latif Latif Latif',
        cover: image4,
      },
      {
        id: 6,
        title: 'Arrivée de sehnan',
        year: 465,
        authorId: authors[3].id,
        genreId: genres[3].id,
        userId: 1,
        publisher: 'Latif Krasniqi',
        excerpt: "I'am SEHNAN !!! s'éxprima le grand Sehnan.",
        nbrPage: 165,
        description: "L'arrivée de Sehnan au pouvoir décris par nos meilleurs historiens.",
        cover: image4,
      },
      {
        id: 7,
        title: 'SpiderPhile',
        year: 2006,
        authorId: authors[4].id,
        genreId: genres[4].id,
        userId: 1,
        publisher: 'Latif Krasniqi',
        excerpt: "J'arrive ! Patientez quelque seconde... Je code un programme C# afin de mettre fin à ce monstre ! ",
        nbrPage: 67,
        description: 'Découvrez les aventures de SpiderPhile dans la ville de Lausanne city !',
        cover: image4,
      },
    ])
  }
}