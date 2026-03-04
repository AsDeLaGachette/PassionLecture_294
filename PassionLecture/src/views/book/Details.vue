<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BookService from '@/services/BookService'
import ReviewService from '@/services/ReviewService'

const route = useRoute()
const book = ref(null)
const reviews = ref([])
const nextImages = ref([])

async function loadBook(id) {
  const res = await BookService.getBook(id)
  const resReviews = await ReviewService.getReviews(id)
  reviews.value = resReviews.data
  book.value = res.data
  loadNextImages(id)
}

async function loadNextImages(currentId) {
  nextImages.value = []

  for (let i = 1; i <= 3; i++) {
    const id = Number(currentId) + i
    const res = await BookService.getBook(id)
    if (res.data?.img) {
      nextImages.value.push({ id: res.data.id, img: res.data.img })
      if (nextImages.value.length >= 3) return
    }
  }

  let fallback = 1
  while (nextImages.value.length < 3 && fallback < 100) {
    if (fallback !== Number(currentId)) {
      const res = await BookService.getBook(fallback)
      if (res.data?.img) {
        nextImages.value.push({ id: res.data.id, img: res.data.img })
      }
    }
    fallback++
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadBook(newId)
    }
  },
  { immediate: true },
)
</script>

<template>
  <main class="container detail-container">
    <div v-if="book" class="detail-layout">
      <div class="detail-left">
        <img class="book-cover-large" :src="book.img" alt="" />
        <div class="small-thumbnails">
          <RouterLink
            v-for="item in nextImages"
            :key="item.id"
            :to="{ name: 'BookDetails', params: { id: item.id } }"
            class="small-thumb-link"
          >
            <img class="small-thumb" :src="item.img" alt="" />
          </RouterLink>
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
                <span class="info-value"
                  >{{ book?.author.firstname }} {{ book?.author.lastname }}</span
                >
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
                {{ book?.excerpt }}
              </p>
            </div>
          </div>

          <div class="reviews-section">
            <h3 class="reviews-title">Avis des lecteurs</h3>
            <div class="reviews-container" v-for="review in reviews" :key="review.id">
              <div class="review-card">
                <div class="review-header">
                  <div class="review-author">
                    <strong> Latif </strong>
                  </div>
                  <div class="review-rating">
                    <span class="star-filled" v-for="n in review.rating" :key="'filled' + n"
                      >★</span
                    >
                    <span class="star-filled" v-for="n in 5 - review.rating" :key="'empty' + n"
                      >☆</span
                    >
                  </div>
                  <div class="review-buttons">
                    <RouterLink
                      :to="{ name: 'ReviewEdit', params: { id: review.id } }"
                      class="btn-review-edit"
                      >Modifier</RouterLink
                    >
                    <button class="btn-review-delete">Supprimer</button>
                  </div>
                </div>
                <h4 class="review-title">{{ review.title }}</h4>
                <p class="review-text">
                  {{ review.comment }}
                </p>
              </div>
            </div>
          </div>
          <RouterLink :to="{ name: 'ReviewAdd', params: { id: book.id } }" class="btn-add-review"
            >Ajouter un avis</RouterLink
          >
        </div>
      </div>
    </div>
  </main>
</template>
