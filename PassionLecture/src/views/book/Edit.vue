<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <Header></Header>
     <main class="container">
        <h2 class="page-title-small">Modifier un ouvrage</h2>
        
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
                            <input type="text" class="form-input" value="BiblioLectif">
                        </div>
                        
                        <div class="form-group">
                            <label>Nombre de pages</label>
                            <input type="number" class="form-input" value="250">
                        </div>
                        
                        <div class="form-group">
                            <label>Auteur</label>
                            <input type="text" class="form-input" value="Exemple">
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label>Resume</label>
                        <textarea class="form-textarea" rows="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Catégorie</label>
                            <select class="form-select">
                                <option>Fiction</option>
                                <option>Non-fiction</option>
                                <option>Technique</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Année d'édition</label>
                            <input type="number" class="form-input" value="2024">
                        </div>
                        
                        <div class="form-group">
                            <label>Éditeur</label>
                            <input type="text" class="form-input" value="Phaïm">
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label>Extrait</label>
                        <textarea class="form-textarea" rows="2"></textarea>
                    </div>

                    <button type="submit" class="btn-submit">Enregistrer</button>
                </form>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>