<template>
    <main class="container">
        <h2 class="page-title-small">Ajouter un avis</h2>
        
        <div class="review-container">
            <form class="review-form">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-input" placeholder="Votre nom">
                </div>

                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="form-input" placeholder="Titre de l'avis">
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-textarea" rows="6" placeholder="Écrivez votre avis..."></textarea>
                </div>

                <div class="form-group">
                    <label>Note</label>
                    <div class="rating-stars">
                        <span class="star">☆</span>
                        <span class="star">☆</span>
                        <span class="star">☆</span>
                        <span class="star">☆</span>
                        <span class="star">☆</span>
                    </div>
                </div>

                <button type="submit" class="btn-submit">Publier l'avis</button>
            </form>
        </div>
    </main>
</template>

<script setup>
// Ton futur code ici
</script>