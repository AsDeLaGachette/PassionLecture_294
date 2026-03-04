<script setup>
import { ref, watch } from 'vue'
import BookService from '@/services/BookService'

const props = defineProps(['book'])
const nextImages = ref([])

watch(
  () => props.book,
  async (newBook) => {
    if (!newBook?.id) return

    nextImages.value = []
    const currentId = newBook.id

    for (let i = 1; i <= 3; i++) {
      const id = currentId + i
      const res = await BookService.getBook(id)
      if (res.data?.img) {
        nextImages.value.push(res.data.img)
        if (nextImages.value.length >= 3) return
      }
    }

    let fallbackId = 1
    while (nextImages.value.length < 3) {
      const res = await BookService.getBook(fallbackId)
      if (res.data?.img) {
        nextImages.value.push(res.data.img)
      }
      fallbackId++
    }
  },
  { immediate: true },
)
</script>

<template>
  <main class="container detail-container">
    <div class="detail-layout">
      <div class="detail-left">
        <img class="book-cover-large" :src="book?.img" alt="" />
        <div class="small-thumbnails">
          <img
            v-for="(imgUrl, index) in nextImages"
            :key="index"
            class="small-thumb"
            :src="imgUrl"
            alt=""
          />
        </div>
      </div>

      <div class="detail-right">
        <div class="info-card">
          <h2>{{ book?.title }}</h2>
          <div class="detail-rating">
            <span class="star-filled">★</span>
            <span class="star-filled">★</span>
            <span class="star-filled">★</span>
            <span class="star-filled">★</span>
            <span class="star-empty">☆</span>
            <span class="rating-text">4.0/5</span>
          </div>
          <div class="quality-section">
            <div class="quality-item info-grid">
              <div class="info-row">
                <span class="info-label">Auteur:</span>
                <span class="info-value">{{ book?.author.firstname }} {{ book?.author.lastname }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Nombre de pages:</span>
                <span class="info-value"> {{ book?.nbrPage }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Catégorie:</span>
                <span class="info-value"> {{ book?.genre }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Année d'édition:</span>
                <span class="info-value"> {{ book?.year }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Éditeur:</span>
                <span class="info-value"> {{ book?.publisher }}</span>
              </div>
            </div>
            <div class="quality-item">
              <h3>Description</h3>
              <p>
                {{ book?.description }}
              </p>
            </div>
            <div class="quality-item full-width">
              <h3>Extrait</h3>
              <p class="excerpt-text">
                {{  book?.excerpt }}
              </p>
            </div>
          </div>

          <div class="reviews-section">
            <h3 class="reviews-title">Avis des lecteurs</h3>
            <div class="reviews-container">
              <div class="review-card">
                <div class="review-header">
                  <div class="review-author">
                    <strong>Jean Dupont</strong>
                  </div>
                  <div class="review-rating">
                    <span class="star-filled">★</span>
                    <span class="star-filled">★</span>
                    <span class="star-filled">★</span>
                    <span class="star-filled">★</span>
                    <span class="star-filled">★</span>
                  </div>
                </div>
                <h4 class="review-title">Excellent livre !</h4>
                <p class="review-text">
                  Un livre passionnant qui m'a tenu en haleine du début à la fin. Les personnages
                  sont bien développés et l'intrigue est captivante. Je le recommande vivement à
                  tous les amateurs du genre.
                </p>
              </div>
            </div>
          </div>
          <RouterLink :to="{ name: 'ReviewAdd' }" class="btn-add-review"
            >Ajouter un avis</RouterLink
          >
        </div>
      </div>
    </div>
  </main>
</template>
