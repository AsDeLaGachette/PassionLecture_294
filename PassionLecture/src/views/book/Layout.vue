<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import BookService from '@/services/BookService';

const { id } = defineProps(["id"])

const book = ref(null)

onMounted(() => {
  BookService.getBook(id)
  .then((response) => {
    book.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })
})
</script>
<template>
    <router-view :book="book" />
</template>