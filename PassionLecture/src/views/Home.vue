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
    <section class="hero-section">
      <h2 class="page-title">Les meilleurs ouvrages pour les<br />fans de l'ETML</h2>

      <RouterLink :to="{ name: 'GetBooks' }" class="btn-view-library">
        Voir bibliothèque
      </RouterLink>

      <ul class="books-grid">
        <li class="book-item" v-for="(book, index) in books" :key="index">
          <RouterLink v-if="index <  5" :to="{ name: 'BookDetails', params: { id: book.id } }" class="book-card">
            <div class="book-thumbnail"></div>
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
      </ul>
    </section>
  </main>
</template>
