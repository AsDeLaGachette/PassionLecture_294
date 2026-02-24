<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="container">
    <section class="hero-section">
      <h2 class="page-title">Les meilleurs ouvrages pour les<br>fans de l'ETML</h2>
      
      <RouterLink :to="{ name: 'GetBooks' }" class="btn-view-library">
        Voir bibliothèque
      </RouterLink>
      
      <div class="books-grid">
        <RouterLink :to="{ name: 'BookDetails', params: { id: 1 } }" class="book-card">
          <div class="book-thumbnail"></div>
          <div class="book-info">
            <h3 class="book-title">BiblioLectif</h3>
            <p class="book-author">Auteur</p>
            <div class="book-rating">
              <span class="star-filled">★</span>
              <span class="star-filled">★</span>
              <span class="star-filled">★</span>
              <span class="star-filled">★</span>
              <span class="star-empty">☆</span>
            </div>
            <p class="book-meta">Vu le</p>
          </div>
        </RouterLink>
        </div>
    </section>
  </main>
</template>