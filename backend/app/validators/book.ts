import vine from '@vinejs/vine'
const BookValidator = vine.compile(
  vine.object({
    year: vine.number().min(0).max(new Date().getFullYear()),
    publisher: vine.string().minLength(2).maxLength(255),
    excerpt: vine.string().minLength(2).maxLength(255),
    nbrPage: vine.number().min(1),
    description: vine.string().minLength(2).maxLength(255),
    title: vine.string().minLength(2).maxLength(255),
    cover: vine.file({ size: '67mb', extnames: ['jpg', 'jpeg', 'png', 'jfif', 'webp'] }).optional(),
    genreId: vine.number().exists(async (db, value) => {
      const genre = await db.from('genres').where('id', value).first()
      return !!genre
    }),
    authorId: vine.number().exists(async (db, value) => {
      const author = await db.from('authors').where('id', value).first()
      return !!author
    }),
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
  })
)
export { BookValidator }
