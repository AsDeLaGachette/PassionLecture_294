<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
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
                    <router-link class="link-secondary" :to="{ name: 'Signup' }">Pas de compte ?</router-link>
                </div>

                <div class="auth-buttons">
                    <router-link class="btn-secondary" :to="{ name: 'Signup' }">S'inscrire</router-link>
                    <button type="submit" class="btn-primary">Se connecter</button>
                </div>
            </form>
        </div>
    </main>
</template>