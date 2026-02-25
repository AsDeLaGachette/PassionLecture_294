<script setup>
defineProps(["book"])
</script>

<template>
    <main class="container detail-container">
        <div class="detail-layout">
            <div class="detail-left">
                <div class="book-cover-large"></div>
                <div class="small-thumbnails">
                    <div class="small-thumb"></div>
                    <div class="small-thumb"></div>
                    <div class="small-thumb"></div>
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
                    <div class="info-text">
                        <p><strong>{{ book?.author.firstname }} {{ book?.author.lastname }}</strong></p>
                        <p>{{ book?.description }}</p>
                    </div>

                    <div class="quality-section">
                        <div class="quality-item">
                            <h3>Qualité 01</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis</p>
                        </div>
                        <div class="quality-item">
                            <h3>Qualité 02</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis</p>
                        </div>
                        <div class="quality-item">
                            <h3>Qualité 03</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis</p>
                        </div>
                        <div class="quality-item">
                            <h3>Qualité 04</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis</p>
                        </div>
                    </div>
                <RouterLink :to="{ name: 'ReviewAdd' } " class="btn-add-review">Ajouter un avis</RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>