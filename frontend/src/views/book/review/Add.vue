<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewService from '@/services/ReviewService'

const title = ref('')
const rating = ref(0)
const comment = ref('')
const router = useRouter()
const bookId = useRoute().params.bookId

const submitReview = async () => {
  try {
    const newReview = {
      bookId: Number(bookId),
      title: title.value,
      rating: rating.value,
      comment: comment.value,
    }
    await ReviewService.addReview(bookId, newReview)
    router.push({ name: 'BookDetails', params: { bookId } })
  } catch (error) {
    console.error('Error creating review:', error.response?.data)
  }
}
</script>
<template>
  <main class="container">
    <h2 class="page-title-small">Ajouter un avis</h2>

    <div class="review-container">
      <form class="review-form" @submit.prevent="submitReview">
        <div class="form-group">
          <label>Titre</label>
          <input v-model="title" type="text" class="form-input" placeholder="Titre" required="true"/>
        </div>

        <div class="form-group">
          <label>Commentaire</label>
          <textarea v-model="comment" class="form-textarea" rows="6" placeholder="Écrivez votre avis..." required="true"></textarea>
        </div>

        <div class="form-group">
          <label>Note</label>
          <div class="rating-stars">
            <span
              v-for="number in 5"
              :key="number"
              class="star"
              :class="{ active: number <= rating }"
              @click="rating = number"
            >
              {{ number <= rating ? '★' : '☆' }}
            </span>
          </div>
        </div>
        <button type="submit" class="btn-submit">Publier l'avis</button>
      </form>
    </div>
  </main>
</template>
