<script setup>
import { ref } from 'vue'
import { useRoute ,useRouter } from 'vue-router'
import ReviewService from '@/services/ReviewService'

const title = ref('')
const rating = ref(0)
const comment = ref('')
const date = ref('')
const router = useRouter()
const bookId = useRoute().params.id

const submitReview = async () => {
  try {
    const newReview = {
      book_id: Number(bookId),
      title: title.value,
      rating: rating.value,
      comment: comment.value,
      user_id: 1,
      date: new Date().toISOString().split('T')[0],
    }

    await ReviewService.addReview(newReview)

    title.value = ''
    rating.value = ''
    comment.value = ''
    date.value = ''

    router.push({ name: 'BookDetails', params: { id: bookId } })
  } catch (error) {
    console.error('Error creating review:', error)
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
          <input v-model="title" type="text" class="form-input" placeholder="Titre" />
        </div>

        <div class="form-group">
          <label>Commentaire</label>
          <textarea v-model="comment" class="form-textarea" rows="6" placeholder="Écrivez votre avis..."></textarea>
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
