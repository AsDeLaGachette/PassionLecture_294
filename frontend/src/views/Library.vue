<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import BookService from '@/services/BookService'
import { getStarStatus } from '@/utils/starStatus'
import ReviewService from '@/services/ReviewService'

const books = ref([])
const allReviews = ref({})
const searchQuery = ref('')

const booksByCategory = computed(() => {
  const grouped = {}
  
  books.value.forEach(book => {
    if (searchQuery.value && !book.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return
    }
    
    const genre = book.genre?.title || 'Autre'
    
    if (!grouped[genre]) {
      grouped[genre] = []
    }
    grouped[genre].push(book)
  })
  
  return grouped
})

onMounted( async () => {
  try {
  const response = await BookService.getBooks()
  books.value = response.data
  for (let book of books.value) {
    const res = await ReviewService.getReviews(book.id)
    allReviews.value[book.id] = res.data
  }
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <main class="container">
    
    <div class="search-section" style="margin-bottom: 2rem;">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Rechercher un livre..."
        class="search-input"
        style="width: 100%; padding: 0.75rem; font-size: 1rem; border: 1px solid #ddd; border-radius: 0.5rem;"
      />
    </div>

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
    
    <section v-for="(categoryBooks, genre) in booksByCategory" :key="genre" class="category-section">
      
      <h2 class="category-title">{{ genre }}</h2>
      
      <ul class="books-grid" v-if="categoryBooks.length > 0">
        <li class="book-item" v-for="book in categoryBooks" :key="book.id">
          <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }" class="book-card">
            <div class="book-thumbnail">
              <img :src="`/api/books/${book.id}/cover`" alt=""/>
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
          </RouterLink>
        </li>
      </ul>
      
      <p v-else style="text-align: center; color: #999; padding: 2rem;">Aucun livre trouvé dans cette catégorie.</p>
      
    </section>

    <div v-if="Object.keys(booksByCategory).length === 0 && searchQuery" style="text-align: center; padding: 2rem;">
      <p style="color: #999; font-size: 1.1rem;">Aucun livre ne correspond à votre recherche.</p>
    </div>

  </main>
</template>