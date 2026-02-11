<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <Header></Header>
    <main class="container auth-container">
        <div class="auth-card">
            <h2 class="auth-title">Connexion</h2>
            
            <form class="auth-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" placeholder="Exemple123@eduvaud.ch">
                </div>

                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" class="form-input" placeholder="••••••••••••••••">
                </div>

                <div class="auth-links">
                    <a href="signup.html" class="link-secondary">Pas de compte ?</a>
                </div>

                <div class="auth-buttons">
                    <button type="button" class="btn-secondary">S'inscrire</button>
                    <button type="submit" class="btn-primary">Se connecter</button>
                </div>
            </form>
        </div>
    </main>
    <Footer></Footer>
</template>