<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="navbar">
        <div class="nav-left">
            <router-link class="home-icon" :to="{ name: 'Home' }">🏠</router-link>
        </div>
        <div class="nav-center">
            <h1 class="logo">LectureTif</h1>
        </div>
        <div class="nav-right">
            <router-link class="nav-icon" :to="{ name: 'MyBooks' }">📚</router-link>
            <router-link class="nav-icon" :to="{ name: 'Signup' }">👤</router-link>
        </div>
    </nav>
</template>