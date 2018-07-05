import axios from "axios";

export default {
    // Gets all articles
    getArticles: function () {
        return axios.get("/api/article");
    },
    // Gets the article with the given id
    getArticle: function (id) {
        return axios.get("/api/article/" + id);
    },
    // Deletes the article with the given id
    deleteArticle: function (id) {
        return axios.delete("/api/article/" + id);
    },
    // Saves a article to the database
    saveArticle: function (articleData) {
        console.log("API.js ", articleData);
        return axios.post("/api/article", articleData);
    }
};
