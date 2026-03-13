<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import BookService from '@/services/BookService'
import { getStarStatus } from '@/utils/starStatus'
import ReviewService from '@/services/ReviewService'

const books = ref([])
const allReviews = ref({})

const booksByCategory = computed(() => {
  const grouped = {}
  
  books.value.forEach(book => {
    const genre = book.genre || 'Non classé' 
    
    if (!grouped[genre]) {
      grouped[genre] = []
    }
    grouped[genre].push(book)
  })
  
  return grouped
})

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
    
    <section v-for="(categoryBooks, genre) in booksByCategory" :key="genre" class="category-section">
      
      <h2 class="category-title">{{ genre }}</h2>
      
      <ul class="books-grid">
        <li class="book-item" v-for="book in categoryBooks" :key="book.id">
          <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }" class="book-card">
            <div class="book-thumbnail">
              <img :src="book.img" alt=""/>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author.firstname }} {{ book.author.lastname }}</p>
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

    <div class="add-section" style="margin-top: 2rem;">
      <ul class="books-grid">
        <div class="library-item">
          <RouterLink :to="{ name: 'BookAdd' }" class="library-card add-card">
            <div class="library-thumbnail">
              <span class="add-icon">+</span>
              <span class="add-label">Ajouter</span>
            </div>
          </RouterLink>
        </div>
      </ul>
    </div>

  </main>
</template>