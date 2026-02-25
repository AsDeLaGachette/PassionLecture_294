<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService';

const userBooks = ref(null)
const userId = 1

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
                    <RouterLink :to="{ name: 'BookDetails', params: { id: 1 } }" class="btn-details">Détails</RouterLink>
                    <RouterLink :to="{ name: 'BookEdit', params: { id: 1 } }" class="btn-edit">Modifier</RouterLink>
                    <button class="btn-delete">Supprimer</button>
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
    </main>
</template>