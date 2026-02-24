<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
    <main class="container">
        <h2 class="page-title-small">Ajouter un ouvrage</h2>
        
        <div class="form-layout">
            <div class="form-left">
                <div class="upload-area">
                    <div class="upload-box">
                        <div class="upload-icon">📷</div>
                    </div>
                </div>
            </div>

            <div class="form-right">
                <form class="edit-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Titre</label>
                            <input type="text" class="form-input" placeholder="Titre">
                        </div>
                        
                        <div class="form-group">
                            <label>Nombre de pages</label>
                            <input type="number" class="form-input" placeholder="250">
                        </div>
                        
                        <div class="form-group">
                            <label>Auteur</label>
                            <input type="text" class="form-input" placeholder="Auteur">
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label>Resume</label>
                        <textarea class="form-textarea" rows="3" placeholder="Résumé du livre..."></textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Catégorie</label>
                            <select class="form-select">
                                <option>Sélectionner</option>
                                <option>Fiction</option>
                                <option>Non-fiction</option>
                                <option>Technique</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Année d'édition</label>
                            <input type="number" class="form-input" placeholder="2024">
                        </div>
                        
                        <div class="form-group">
                            <label>Éditeur</label>
                            <input type="text" class="form-input" placeholder="Éditeur">
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label>Extrait</label>
                        <textarea class="form-textarea" rows="2" placeholder="Extrait du livre..."></textarea>
                    </div>

                    <button type="submit" class="btn-submit">Ajouter</button>
                </form>
            </div>
        </div>
    </main>
</template>