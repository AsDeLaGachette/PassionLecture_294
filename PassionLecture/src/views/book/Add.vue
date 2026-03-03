<script setup>
import { ref } from 'vue'
import BookService from '@/services/BookService'
import { useRouter } from 'vue-router'

const title = ref('')
const nbrPage = ref('')
const authorName = ref('')
const description = ref('')
const genre = ref('')
const year = ref('')
const publisher = ref('')
const excerpt = ref('')
const user_id = 1
const author_id = ref(null)
const router = useRouter()

const submitBook = async () => {
  try {
    const nameParts = authorName.value.trim().split(' ')
    const firstname = nameParts[0]
    const lastname = nameParts.slice(1).join(' ')

    const newBook = {
      title: title.value,
      nbrPage: parseInt(nbrPage.value),
      author: {
        firstname: firstname,
        lastname: lastname
      },
      description: description.value,
      genre: genre.value,
      year: parseInt(year.value),
      publisher: publisher.value,
      excerpt: excerpt.value,
      author_id: author_id.value,
      user_id: user_id
    }

    await BookService.addBook(newBook)

    title.value = ''
    nbrPage.value = ''
    authorName.value = ''
    description.value = ''
    genre.value = ''
    year.value = ''
    publisher.value = ''
    excerpt.value = ''

    router.push({ name: 'MyBooks' })
  } catch (error) {
    console.error('Error creating book:', error)
  }
}
</script>

<template>
  <main class="container">
    <h2 class="page-title-small">Ajouter un ouvrage</h2>

    <div class="form-layout">
      <div class="form-left">
        <div class="upload-area">
          <div class="upload-box">
            <div class="upload-icon">📷</div>
          </div>
        </div>
      </div>

      <div class="form-right">
        <form class="edit-form" @submit.prevent="submitBook">
          <div class="form-row">
            <div class="form-group">
              <label>Titre</label>
              <input type="text" class="form-input" placeholder="Titre" v-model="title" />
            </div>

            <div class="form-group">
              <label>Nombre de pages</label>
              <input type="number" class="form-input" placeholder="250" v-model="nbrPage" />
            </div>

            <div class="form-group">
              <label>Auteur</label>
              <input type="text" class="form-input" placeholder="Prénom et Nom" v-model="authorName" />
            </div>
          </div>

          <div class="form-group full-width">
            <label>Resume</label>
            <textarea
              class="form-textarea"
              rows="3"
              placeholder="Résumé du livre..."
              v-model="description"
            ></textarea>
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
              <input type="number" class="form-input" placeholder="aaaa" v-model="year" />
            </div>

            <div class="form-group">
              <label>Éditeur</label>
              <input
                type="text"
                class="form-input"
                placeholder="Prénom et Nom"
                v-model="publisher"
              />
            </div>
          </div>

          <div class="form-group full-width">
            <label>Extrait</label>
            <textarea
              class="form-textarea"
              rows="2"
              placeholder="Extrait du livre..."
              v-model="excerpt"
            ></textarea>
          </div>
            <button type="submit" class="btn-submit">Ajouter</button>
        </form>
      </div>
    </div>
  </main>
</template>
