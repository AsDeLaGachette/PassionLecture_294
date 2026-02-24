<script setup>
import Footer from '@/components/Footer.vue'
</script>

<template>
    <main class="container">
        <h2 class="page-title-small">Mes ouvrages</h2>
        <div class="my-works-grid">
            <div class="my-work-card-wrapper">
                <a class="my-work-card">
                    <div class="my-work-thumbnail"></div>
                </a>
                <div class="hover-buttons">
                    <RouterLink :to="{ name: 'BookDetails', params: { id: 1 } }" class="btn-details">Détails</RouterLink>
                    <RouterLink :to="{ name: 'BookEdit', params: { id: 1 } }" class="btn-edit">Modifier</RouterLink>
                    <button class="btn-delete">Supprimer</button>
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