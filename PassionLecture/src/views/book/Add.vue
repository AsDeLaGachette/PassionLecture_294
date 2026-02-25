<script setup>
import { ref } from 'vue'
import BookService from '@/services/BookService'
const title = ref('')
const nbrPage = ref('')
const author = ref('')
const resume = ref('')
const category = ref('') 
const year = ref('')
const publisher = ref('') 
const excerpt = ref('') 
const author_id = ref(null)
const submitBook = async () => {
  try {
    const newBook = {
      title: title.value,
      nbrPage: nbrPage.value,
      author: author.value,
      resume: resume.value,
      category: category.value,
      year: year.value,
      publisher: publisher.value,
      excerpt: excerpt.value,
      author_id: author_id.value,
    }

    await BookService.addBook(newBook)

    title.value = ''
    nbrPage.value = ''
    author.value = ''
    resume.value = ''
    category.value = ''
    year.value = ''
    publisher.value = ''
    excerpt.value = ''
    author_id.value = null
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
              <input type="text" class="form-input" placeholder="Prénom et Nom" v-model="author" />
            </div>
          </div>

          <div class="form-group full-width">
            <label>Resume</label>
            <textarea
              class="form-textarea"
              rows="3"
              placeholder="Résumé du livre..."
              v-model="resume"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Catégorie</label>
              <select class="form-select" v-model="category">
                <option disabled value="">Sélectionner</option>
                <option>Fiction</option>
                <option>Non-fiction</option>
                <option>Technique</option>
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
