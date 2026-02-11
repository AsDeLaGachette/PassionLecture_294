<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <Header></Header>
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
                    <h2>BiblioLectif</h2>
                    <div class="detail-rating">
                        <span class="star-filled">★</span>
                        <span class="star-filled">★</span>
                        <span class="star-filled">★</span>
                        <span class="star-filled">★</span>
                        <span class="star-empty">☆</span>
                        <span class="rating-text">4.0/5</span>
                    </div>
                    <div class="info-text">
                        <p><strong>Lorem ipsum dolor sit amet</strong></p>
                        <p>Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        <p>Ut enim ad minim veniam quis nostrud exercitation ullamco laboris</p>
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

                    <a href="avis.html" class="btn-add-review">Ajouter un avis</a>
                </div>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>