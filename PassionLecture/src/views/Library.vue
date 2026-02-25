<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BookService from '@/services/BookService';

const books = ref(null)

onMounted(() => {
  books.value = null
  BookService.getBooks()
  .then((response) => {
    books.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })
})
</script>

<template>
  <main class="container">
      <ul class="books-grid">
        <li class="book-item" v-for="book in books" :key="book.id">
          <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }" class="book-card">
            <div class="book-thumbnail"><img :src="book.img" alt=""></div>
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
          </RouterLink>
        </li>
        <div class="library-item">
          <RouterLink :to="{ name: 'BookAdd' }" class="library-card add-card">
            <div class="library-thumbnail">
              <span class="add-icon">+</span>
              <span class="add-label">Ajouter</span>
            </div>
          </RouterLink>
        </div>
      </ul>
  </main>
</template>
