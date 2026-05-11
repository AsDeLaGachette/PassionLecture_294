<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import BookService from '@/services/BookService'
import ReviewService from '@/services/ReviewService'
import { getStarStatus } from '@/utils/starStatus'

const books = ref([])
const allReviews = ref({})

onMounted( async () => {

  const response = await BookService.getBooks()
  books.value = response.data

  for (let book of books.value) {
    const res = await ReviewService.getReviews(book.id)
    allReviews.value[book.id] = res.data
  }
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
          <RouterLink
            v-if="index < 5 && book.id"
            :to="{ name: 'BookDetails', params: { id: book.id } }"
            class="book-card"
          >
            <div class="book-thumbnail"><img :src="`/api/books/${book.id}/cover`" alt="skibidi" /></div>
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
          </RouterLink>
        </li>
      </ul>
    </section>
  </main>
</template>
