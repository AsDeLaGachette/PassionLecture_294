<script setup>
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const bookId = props.id

const fullName = ref('');

const title = ref('')
const nbrPage = ref('')
const description = ref('')
const genre = ref('')
const year = ref('')
const publisher = ref('')
const excerpt = ref('')
const author_id = ref(null)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await BookService.getBook(bookId)
    title.value = response.data.title
    nbrPage.value = response.data.nbrPage
    fullName.value = `${response.data.author.firstname} ${response.data.author.lastname}`
    description.value = response.data.description
    genre.value = response.data.genre
    year.value = response.data.year
    publisher.value = response.data.publisher
    excerpt.value = response.data.excerpt
    author_id.value = response.data.author_id
  } catch (err) {
    console.error(err)
  }
})

const updateBook = async () => {
  try {

    const nameParts = fullName.value.trim().split(' ');
    const firstname = nameParts[0];
    const lastname = nameParts.slice(1).join(' ');

    const response = await BookService.getBook(bookId)
    const currentBook = response.data

    const updatedBook = {
      ...currentBook,
      title: title.value,
      nbrPage: nbrPage.value,
      author: {
      firstname: firstname,
      lastname: lastname
      },
      description: description.value,
      genre: genre.value,
      year: year.value,
      publisher: publisher.value,
      excerpt: excerpt.value,
      author_id: author_id.value,
    }

    await BookService.updateBook(bookId, updatedBook)
    router.push({ name: 'MyBooks' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main class="container">
    <h2 class="page-title-small">Modifier un ouvrage</h2>

    <div class="form-layout">
      <div class="form-left">
        <div class="upload-area">
          <div class="upload-box">
            <div class="upload-icon">📷</div>
          </div>
        </div>
      </div>

      <div class="form-right">
        <form class="edit-form" @submit.prevent="updateBook">
          <div class="form-row">
            <div class="form-group">
              <label>Titre</label>
              <input type="text" class="form-input" v-model="title" />
            </div>

            <div class="form-group">
              <label>Nombre de pages</label>
              <input type="number" class="form-input" v-model="nbrPage" />
            </div>

            <div class="form-group">
              <label>Auteur</label>
              <input type="text" class="form-input" v-model="fullName" />
            </div>
          </div>

          <div class="form-group full-width">
            <label>Description</label>
            <textarea class="form-textarea" rows="3" v-model="description"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Catégorie</label>
              <select class="form-select" v-model="genre">
                <option disabled value="">Sélectionner</option>
                <option>Roman</option>
                <option>Science-fiction</option>
                <option>Fantastique</option>
                <option>Policier</option>
                <option>Histoire</option>
                <option>Développement personnel</option>
                <option>Poésie</option>
                <option>Essai</option>
                <option>Enfant</option>
                <option>Bandes dessinées</option>
                <option>Manga</option>
              </select>
            </div>

            <div class="form-group">
              <label>Année d'édition</label>
              <input type="number" class="form-input" v-model="year" />
            </div>

            <div class="form-group">
              <label>Éditeur</label>
              <input type="text" class="form-input" v-model="publisher" />
            </div>
          </div>

          <div class="form-group full-width">
            <label>Extrait</label>
            <textarea class="form-textarea" rows="2" v-model="excerpt"></textarea>
          </div>
            <button type="submit" class="btn-submit">Enregistrer</button>
        </form>
      </div>
    </div>
  </main>
</template>
