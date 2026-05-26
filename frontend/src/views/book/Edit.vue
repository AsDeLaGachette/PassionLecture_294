<script setup>
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
import { useRouter } from 'vue-router'
import AuthorService from '@/services/AuthorService'
import GenreService from '@/services/GenreService'

const props = defineProps(['id'])
const bookId = props.id

let img = ref('')

const title = ref('')
const nbrPage = ref('')
const description = ref('')
const genre = ref('')
const year = ref('')
const publisher = ref('')
const excerpt = ref('')
const author_id = ref('')
const user_id = ref('')
const cover = ref(null)
const coverPreview = ref(null)
const authors = ref([])
const genres = ref([])
const router = useRouter()

const handleCoverChange = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    cover.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      coverPreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

onMounted(async () => {
  try {
    const response = await BookService.getBook(bookId)
    const authorResponse = await AuthorService.getAuthors()
    const genreResponse = await GenreService.getGenres()
    authors.value = authorResponse.data
    genres.value = genreResponse.data

    img = response.data.img
    title.value = response.data.title
    nbrPage.value = response.data.nbrPage
    description.value = response.data.description
    genre.value = response.data.genre?.id || ''
    year.value = response.data.year
    publisher.value = response.data.publisher
    excerpt.value = response.data.excerpt
    author_id.value = response.data.authorId ? parseInt(response.data.authorId) : ''
    user_id.value = response.data.userId
  } catch (err) {
    console.error(err)
  }
})

const updateBook = async () => {
  try {
    let dataToSend
    if (cover.value) {
      const formData = new FormData()
      formData.append('title', title.value)
      formData.append('nbrPage', parseInt(nbrPage.value))
      formData.append('description', description.value)
      formData.append('genreId', parseInt(genre.value))
      formData.append('year', parseInt(year.value))
      formData.append('publisher', publisher.value)
      formData.append('excerpt', excerpt.value)
      formData.append('authorId', parseInt(author_id.value))
      formData.append('userId', parseInt(user_id.value))
      formData.append('cover', cover.value)
      
      dataToSend = formData
    } else {
      dataToSend = {
        title: title.value,
        nbrPage: parseInt(nbrPage.value),
        description: description.value,
        genreId: parseInt(genre.value),
        year: parseInt(year.value),
        publisher: publisher.value,
        excerpt: excerpt.value,
        authorId: parseInt(author_id.value),
        userId: parseInt(user_id.value),
      }
    }

    await BookService.updateBook(bookId, dataToSend)
    router.push({ name: 'MyBooks' })
  } catch (error) {
    console.error('Update error:', error)
    if (error.response?.data?.errors) {
      console.error('Validation errors:', error.response.data.errors)
      error.response.data.errors.forEach(err => {
        console.error(`Field: ${err.field}, Message: ${err.message}`)
      })
    }
  }
}
</script>

<template>
  <main class="container">
    <h2 class="page-title-small">Modifier un ouvrage</h2>

    <div class="form-layout">
      <div class="form-left">
        <div class="upload-area">
          <label for="cover-input" class="upload-box">
            <img
              v-if="coverPreview"
              :src="coverPreview"
              alt="Cover preview"
              class="cover-preview"
            />
            <img v-else :src="`/api/books/${bookId}/cover?t=${Date.now()}`" alt="Current cover"/>
          </label>
          <input
            id="cover-input"
            type="file"
            accept="image/*"
            @change="handleCoverChange"
            style="display: none"
          />
        </div>
      </div>

      <div class="form-right">
        <form class="edit-form" @submit.prevent="updateBook">
          <div class="form-row">
            <div class="form-group">
              <label>Titre</label>
              <input type="text" class="form-input" v-model="title" required="true"/>
            </div>

            <div class="form-group">
              <label>Nombre de pages</label>
              <input type="number" class="form-input" v-model="nbrPage" required="true"/>
            </div>

            <div class="form-group">
              <label>Auteur</label>
              <select class="form-select" v-model="author_id" required="true">
                <option disabled value="">Sélectionner</option>
                <option v-for="author in authors" :value="author.id">{{ author?.firstname }} {{ author?.lastname }}</option>
              </select>
            </div>
          </div>

          <div class="form-group full-width">
            <label>Description</label>
            <textarea class="form-textarea" rows="3" v-model="description"></textarea required="true">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Catégorie</label>
              <select class="form-select" v-model="genre" required="true">
                <option disabled value="">Sélectionner</option>
                <option v-for="g in genres" :value="g.id">{{ g.title }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Année d'édition</label>
              <input type="number" class="form-input" v-model="year" required="true"/>
            </div>

            <div class="form-group">
              <label>Éditeur</label>
              <input type="text" class="form-input" v-model="publisher" required="true"/>
            </div>
          </div>

          <div class="form-group full-width">
            <label>Extrait</label>
            <textarea class="form-textarea" rows="2" v-model="excerpt"></textarea required="true">
          </div>
            <button type="submit" class="btn-submit">Enregistrer</button>
        </form>
      </div>
    </div>
  </main>
</template>
