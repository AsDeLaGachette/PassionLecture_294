<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header></Header>
    <main class="container">
        <section class="hero-section">
            <h2 class="page-title">Les meilleurs ouvrages pour les<br>fans de l'ETML</h2>
            
            <a href="#" class="btn-view-library">Voir bibliothèque</a>
            
            <div class="books-grid">
                <a href="detail.html" class="book-card">
                    <div class="book-thumbnail"></div>
                    <div class="book-info">
                        <h3 class="book-title">BiblioLectif</h3>
                        <p class="book-author">Auteur</p>
                        <div class="book-rating">
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-empty">☆</span>
                        </div>
                        <p class="book-meta">Vu le</p>
                    </div>
                </a>

                <a href="detail.html" class="book-card">
                    <div class="book-thumbnail"></div>
                    <div class="book-info">
                        <h3 class="book-title">BiblioLectif</h3>
                        <p class="book-author">Auteur</p>
                        <div class="book-rating">
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                        </div>
                        <p class="book-meta">Vu le</p>
                    </div>
                </a>

                <a href="detail.html" class="book-card">
                    <div class="book-thumbnail"></div>
                    <div class="book-info">
                        <h3 class="book-title">BiblioLectif</h3>
                        <p class="book-author">Auteur</p>
                        <div class="book-rating">
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-empty">☆</span>
                            <span class="star-empty">☆</span>
                        </div>
                        <p class="book-meta">Vu le</p>
                    </div>
                </a>

                <a href="detail.html" class="book-card">
                    <div class="book-thumbnail"></div>
                    <div class="book-info">
                        <h3 class="book-title">BiblioLectif</h3>
                        <p class="book-author">Auteur</p>
                        <div class="book-rating">
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-empty">☆</span>
                        </div>
                        <p class="book-meta">Vu le</p>
                    </div>
                </a>

                <a href="detail.html" class="book-card">
                    <div class="book-thumbnail"></div>
                    <div class="book-info">
                        <h3 class="book-title">BiblioLectif</h3>
                        <p class="book-author">Auteur</p>
                        <div class="book-rating">
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                            <span class="star-filled">★</span>
                        </div>
                        <p class="book-meta">Vu le</p>
                    </div>
                </a>
            </div>
        </section>
    </main>
    <Footer></Footer>

</template>