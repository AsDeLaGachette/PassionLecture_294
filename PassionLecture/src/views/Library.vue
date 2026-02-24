<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main class="container">
    <div class="library-grid">
      <div class="library-item">
        <RouterLink :to="{ name: 'BookDetails', params: { id: 1 } }" class="library-card">
          <div class="library-thumbnail"></div>
        </RouterLink>
        <div class="library-rating">
          <span class="star-filled">★</span>
          <span class="star-filled">★</span>
          <span class="star-filled">★</span>
          <span class="star-filled">★</span>
          <span class="star-empty">☆</span>
        </div>
      </div>

      <div class="library-item">
        <RouterLink :to="{ name: 'BookAdd' }" class="library-card add-card">
          <div class="library-thumbnail">
            <span class="add-icon">+</span>
            <span class="add-label">Ajouter</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>
