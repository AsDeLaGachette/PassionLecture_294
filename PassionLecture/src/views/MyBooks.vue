<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'

const userBooks = ref(null)
const userId = 1
const bookIdToDelete = ref(null)

onMounted(() => {
  userBooks.value = null
  BookService.getBookFromUser(userId)
    .then((response) => {
      userBooks.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

const openModal = (id) => {
    bookIdToDelete.value = id
  document.getElementById('deleteModal').classList.add('active')
}

const closeModal = () => {
  document.getElementById('deleteModal').classList.remove('active')
}

const confirmDelete = async () => {
  try {
    await BookService.deleteBook(bookIdToDelete.value)
    
    userBooks.value = userBooks.value.filter(b => b.id !== bookIdToDelete.value)
    
    closeModal()
  } catch (error) {
    console.error("Erreur suppression:", error)
  }
}
</script>

<template>
  <main class="container">
    <h2 class="page-title-small">Mes ouvrages</h2>
    <ul class="my-works-grid">
      <li v-for="book in userBooks" :key="book.id" class="my-work-card-wrapper">
        <a class="my-work-card">
          <div class="my-work-thumbnail"></div>
        </a>
        <div class="hover-buttons">
          <router-link :to="{ name: 'BookDetails', params: { id: book.id } }" class="btn-details"
            >Détails</router-link
          >
          <router-link :to="{ name: 'BookEdit', params: { id: book.id } }" class="btn-edit"
            >Modifier</router-link
          >
          <button class="btn-delete" @click="openModal(book.id)">Supprimer</button>
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
          <button class="btn-confirm-delete" @click="confirmDelete()">Supprimer définitivement</button>
        </div>
      </div>
    </div>
  </main>
</template>
