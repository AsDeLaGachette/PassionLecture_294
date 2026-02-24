<template>
    <main class="container">
        <h2 class="page-title-small">Modifier un avis</h2>
        
        <div class="review-container">
            <form class="review-form">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-input" value="Jean Dupont">
                </div>

                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="form-input" value="Excellent livre !">
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-textarea" rows="6">Un livre passionnant qui m'a tenu en haleine du début à la fin. Les personnages sont bien développés et l'intrigue est captivante. Je le recommande vivement à tous les amateurs du genre.</textarea>
                </div>

                <div class="form-group">
                    <label>Note</label>
                    <div class="rating-stars">
                        <span class="star star-selected">★</span>
                        <span class="star star-selected">★</span>
                        <span class="star star-selected">★</span>
                        <span class="star star-selected">★</span>
                        <span class="star">☆</span>
                    </div>
                </div>

                <button type="submit" class="btn-submit">Enregistrer</button>
            </form>
        </div>
    </main>
</template>

<script setup>
// Ton futur code ici
</script>