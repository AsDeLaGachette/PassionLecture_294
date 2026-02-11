<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <nav class="navbar">
        <div class="nav-left">
            <a href="index.html" class="home-icon">🏠</a>
        </div>
        <div class="nav-center">
            <h1 class="logo">LectureTif</h1>
        </div>
        <div class="nav-right">
            <a href="mes-ouvrages.html" class="nav-icon">📚</a>
            <a href="signup.html" class="nav-icon account-icon">👤</a>
        </div>
    </nav>

    <main class="container">
        <section class="hero-section">
            <h2 class="page-title">Les meilleurs ouvrages pour les<br>fans de l'ETML</h2>
            
            <a href="bibliotheque.html" class="btn-view-library">Voir bibliothèque</a>
            
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

    <footer class="footer">
        <!-- Footer content to be added -->
    </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
