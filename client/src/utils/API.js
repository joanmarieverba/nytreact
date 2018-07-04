import axios from "axios";

export default {
    // Gets all articles
    getArticles: function () {
        return axios.get("/api/articles");
    },
    // Gets the article with the given id
    getArticle: function (id) {
        return axios.get("/api/articles/" + id);
    },
    // Deletes the article with the given id
    deleteArticle: function (id) {
        return axios.delete("/api/articles/" + id);
    },
    // Saves a article to the database
    saveArticle: function (articleDataIndex) {
        console.log("we're here ", articleDataIndex);
        return axios.post("/api/article", articleDataIndex);
    }
};
