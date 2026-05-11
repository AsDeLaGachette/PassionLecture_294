<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
import { getStarStatus } from '@/utils/starStatus'
import ReviewService from '@/services/ReviewService'

const router = useRouter()
const userBooks = ref([])
const bookIdToDelete = ref(null)
const allReviews = ref({})

onMounted(async () => {
  try {
  const response = await BookService.getBookFromUser()

  userBooks.value = response.data
  for (let book of userBooks.value) {
    const response = await ReviewService.getReviews(book.id)
    allReviews.value[book.id] = response.data
  }
  } catch (error) {
  if (error.response?.status === 401) {
       router.push('/login')
    }
  }
})

const openModal = (id) => {
  bookIdToDelete.value = id
  document.getElementById('deleteModal').classList.add('active')
}

const closeModal = () => {
  document.getElementById('deleteModal').classList.remove('active')
}

window.onclick = function (event) {
  const modal = document.getElementById('deleteModal')
  if (event.target == modal) {
    closeModal()
  }
}

const confirmDelete = async () => {
  try {
    await BookService.deleteBook(bookIdToDelete.value)

    userBooks.value = userBooks.value.filter((book) => book.id !== bookIdToDelete.value)

    closeModal()
  } catch (error) {
    console.error('Erreur suppression:', error)
  }
}
</script>

<template>
  <main class="container">
    <h2 class="page-title-small">Mes ouvrages</h2>
    <ul class="my-works-grid">
      <li v-for="book in userBooks" :key="book.id" class="book-item book-card">
        <div class="book-thumbnail">
          <div class="hover-buttons">
            <router-link :to="{ name: 'BookDetails', params: { id: book.id } }" class="btn-details"
              >Détails</router-link
            >
            <router-link :to="{ name: 'BookEdit', params: { id: book.id } }" class="btn-edit"
              >Modifier</router-link
            >
            <button class="btn-delete" @click="openModal(book.id)">Supprimer</button>
          </div>
          <img :src="`/api/books/${book.id}/cover`" alt="skibidi" />
        </div>
        <div class="book-info">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">{{ book.author?.firstname }} {{ book.author?.lastname }}</p>
          <div class="book-rating">
            <span v-for="n in 5" :key="n" :class="getStarStatus(n, allReviews[book.id])">
              ★
            </span>
          </div>
          <p class="book-meta">Vu le</p>
        </div>
      </li>
      <li class="library-item">
        <RouterLink :to="{ name: 'BookAdd' }" class="library-card add-card">
          <div class="library-thumbnail">
            <span class="add-icon">+</span>
            <span class="add-label">Ajouter</span>
          </div>
        </RouterLink>
      </li>
    </ul>

    <div class="modal-overlay" id="deleteModal">
      <div class="modal-content">
        <h3 class="modal-title">Confirmer la suppression</h3>
        <p class="modal-message">
          Es-tu sûr de vouloir supprimer cet ouvrage ? Cette action est irréversible.
        </p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="closeModal()">Annuler</button>
          <button class="btn-confirm-delete" @click="confirmDelete()">
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
