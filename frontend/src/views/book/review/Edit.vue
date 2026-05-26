<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ReviewService from '@/services/ReviewService'

const props = defineProps(['reviewId', 'bookId'])
const router = useRouter()

const title = ref('')
const rating = ref(0)
const comment = ref('')

onMounted(async () => {
  try {
    const response = await ReviewService.getReview(props.bookId, props.reviewId)
    title.value = response.data.title
    rating.value = response.data.rating
    comment.value = response.data.comment
  } catch (err) {
    console.error(err.response?.data)
  }
})

const updateReview = async () => {
  try {
    const updatedReview = {
      bookId: Number(props.bookId),
      userId: 1,
      title: title.value,
      rating: rating.value,
      comment: comment.value,
    }
    await ReviewService.updateReview(props.bookId, props.reviewId, updatedReview)
    router.push({ name: 'BookDetails', params: { id: props.bookId } })
  } catch (error) {
    console.error('Error updating review:', error.response?.data)
  }
}
</script>
<template>
  <main class="container">
    <h2 class="page-title-small">Ajouter un avis</h2>

    <div class="review-container">
      <form class="review-form" @submit.prevent="updateReview">
        <div class="form-group">
          <label>Titre</label>
          <input v-model="title" type="text" class="form-input" placeholder="Titre" required="true"/>
        </div>

        <div class="form-group">
          <label>Commentaire</label>
          <textarea v-model="comment" class="form-textarea" rows="6" placeholder="Écrivez votre avis..."></textarea required="true">
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
        <button type="submit" class="btn-submit">Enregistrer</button>
      </form>
    </div>
  </main>
</template>
