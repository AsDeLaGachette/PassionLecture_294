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
            <li v-for="book in userBooks" :key="book.id" class="book-item book-card">
            <div class="book-thumbnail">
                <div class="hover-buttons">
                    <router-link :to="{ name: 'BookDetails', params: { id: book.id } }" class="btn-details">Détails</router-link>
                    <router-link :to="{ name: 'BookEdit', params: { id: book.id } }" class="btn-edit">Modifier</router-link>
                    <button class="btn-delete">Supprimer</button>
                </div><img :src="book.img" alt=""></div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author.firstname }} {{ book.author.lastname }}</p>
              <div class="book-rating">
                <span class="star-filled">★</span><span class="star-filled">★</span>
                <span class="star-filled">★</span><span class="star-filled">★</span>
                <span class="star-empty">☆</span>
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
    </main>
</template>