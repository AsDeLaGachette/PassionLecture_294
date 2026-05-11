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
const cover = ref(null)
const coverPreview = ref(null)
const user_id = 1
const author_id = ref(null)
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
      cover: cover.value,
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
    cover.value = null
    coverPreview.value = null

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
          <label for="cover-input" class="upload-box">
            <img v-if="coverPreview" :src="coverPreview" alt="Cover preview" class="cover-preview" />
            <div v-else class="upload-icon-container">
              <div class="upload-icon">📷</div>
            </div>
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
        <form class="edit-form" @submit.prevent="submitBook">
          <div class="form-row">
            <div class="form-group">
              <label>Titre</label>
              <input type="text" class="form-input" placeholder="Titre" v-model="title" required="true"/>
            </div>

            <div class="form-group">
              <label>Nombre de pages</label>
              <input type="number" class="form-input" placeholder="250" v-model="nbrPage" required="true"/>
            </div>

            <div class="form-group">
              <label>Auteur</label>
              <input type="text" class="form-input" placeholder="Prénom et Nom" v-model="authorName" required="true"/>
            </div>
          </div>

          <div class="form-group full-width">
            <label>Resume</label>
            <textarea
              class="form-textarea"
              rows="3"
              placeholder="Résumé du livre..."
              v-model="description"
            ></textarea required="true">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Catégorie</label>
              <select class="form-select" v-model="genre" required="true">
                <option disabled value="">Sélectionner</option>
                <option value="1">Roman</option>
                <option value="2">Science-fiction</option>
                <option value="3">Fantastique</option>
                <option value="4">Policier</option>
                <option value="5">Histoire</option>
                <option value="6">Développement personnel</option>
                <option value="7">Poésie</option>
                <option value="8">Essai</option>
                <option value="9">Enfant</option>
                <option value="10">Bandes dessinées</option>
                <option value="11">Manga</option>
              </select>
            </div>

            <div class="form-group">
              <label>Année d'édition</label>
              <input type="number" class="form-input" placeholder="aaaa" v-model="year" required="true"/>
            </div>

            <div class="form-group">
              <label>Éditeur</label>
              <input
                type="text"
                class="form-input"
                placeholder="Prénom et Nom"
                v-model="publisher"
                required="true"
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
              required="true"
            ></textarea>
          </div>
            <button type="submit" class="btn-submit">Ajouter</button>
        </form>
      </div>
    </div>
  </main>
</template>
