import apiClient from "./api"

export default {
    getGenres(){
        return apiClient.get('/genres')
    }
}