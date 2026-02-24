import { ref } from 'vue';
import axios from 'axios';

const books = ref([]);
const authors = ref([]);
const loading = ref(false);

export function useLibrary() {
    
    const fetchData = async () => {
        if (books.value.length > 0) return;
        
        loading.value = true;
        try {
            const [booksRes, authorsRes] = await Promise.all([
                axios.get('http://localhost:3000/books'),
                axios.get('http://localhost:3000/authors')
            ]);
            books.value = booksRes.data;
            authors.value = authorsRes.data;
        } catch (error) {
            console.error("Erreur de chargement :", error);
        } finally {
            loading.value = false;
        }
    };

    const getAuthorName = (authorId) => {
        const author = authors.value.find(a => a.id === authorId);
        return author ? `${author.firstname} ${author.lastname}` : 'Auteur inconnu';
    };

    return {
        books,
        authors,
        loading,
        fetchData,
        getAuthorName
    };
}