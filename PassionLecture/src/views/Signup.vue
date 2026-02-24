<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
     <main class="container auth-container">
        <div class="auth-card">
            <h2 class="auth-title">S'inscrire</h2>
            
            <form class="auth-form">
                <div class="form-row-auth">
                    <div class="nameForm form-group">
                        <label>Nom</label>
                        <input type="text" class="form-input" placeholder="Exemple">
                    </div>
                    
                    <div class="nameForm form-group">
                        <label>Prénom</label>
                        <input type="text" class="form-input" placeholder="Latif">
                    </div>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" placeholder="Exemple123@eduvaud.ch">
                </div>

                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" class="form-input" placeholder="••••••••••••••••">
                </div>

                <div class="auth-links">
                    <router-link class="link-secondary" :to="{ name: 'Login' }">Déjà un compte ?</router-link>
                </div>

                <div class="auth-buttons">
                    <router-link class="btn-secondary" :to="{ name: 'Login' }">Connexion</router-link>
                    <button type="submit" class="btn-primary">S'inscrire</button>
                </div>
            </form>
        </div>
    </main>
</template>