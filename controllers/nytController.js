const db = require("../models");
const axios = require("axios");


//  https://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7743e049fd004ee1a7f2289b00f02b17&q=climate+change&begin_date=20180101&end_date=20180301

module.exports = {
    findAll: function (req, res) {
        const params = Object.assign(
            { api_key: "9b3adf57854f4a19b7b5782cdd6e427a" },
            req.query
        );
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
                params
            })
            .then(response => {
                db.Article
                    .find()
                    .then(dbArticles =>
                        response.data.response.docs.filter(article =>
                            dbArticles.every(
                                dbArticle => dbArticle._id.toString() !== article._id
                            )
                        )
                    )
                    .then(articles => res.json(articles))
                    .catch(err => res.status(422).json(err));
            });
    }
};


