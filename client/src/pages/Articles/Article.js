import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
//import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import axios from 'axios';
//const API = require("../../utils/API");

// const backgroundStyle = {

//     backgroundImage: 'url("news.jpg")',
//     width: '100%',
//     minHeight: '100%',
//     backgroundSize: "100%",
// };

//convert Date.now: var d = new Date().toISOString();

const btnStyle = {
    float: "right",
};

const textStyle = {
    color: "blue", 
};

const resultsLine = {
    display: "inline-block",
    border: "1px solid black",
    width: "100%",
    marginBottom: "5px",
}


class Article extends Component {
    state = {
        article: [],
        savedArticle: [],
        title: "",
        startYear: "",
        endYear: ""
    };

    componentDidMount() {

    };

    // response.docs[i].headline.main
    // response.docs[i].pub_date
    // response.docs[i].web_url
    // response.docs[i]._id


 //******** LOAD ARTICLE ***************////   
    loadArticle = () => {
        API.getArticles()
            .then(res => {
                console.log("res ", res);
               // this.setState({ savedArticle: res.data })
            }
            )
            .catch(err => console.log(err));
    };


    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticle())
            .catch(err => console.log(err));
    };

 //   app.post("/api/article/:id", function(req, res) {

    saveArticle = index => {
        const articleData = {
            title: this.state.article[index].headline.main,
            date: this.state.article[index].pub_date,
            url: this.state.article[index].web_url,
            saved: true,
            nytid: this.state.article[index]._id}
        API.saveArticle(articleData)
            .then(res => {
                this.loadArticle()
                console.log("save article ", res);
            })
            .catch(err => console.log(err));      
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
            axios.get(`https://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7743e049fd004ee1a7f2289b00f02b17&q=${this.state.title}&begin_date=${this.state.startYear}0101&end_date=${this.state.endYear}1231`)
            .then(res => {
                // const article = res.data;
                console.log("res.data ", res.data.response.docs);
                this.setState({ article: res.data.response.docs });
                console.log("article ", this.state.article);
                //this is correct
                //console.log("headline ", this.state.article.response.docs[0].headline.main);

                //put date in readable format
                // this.state.article.forEach((item) => {
                //     item.pub_date = item.pub_date.substring(0, 10);
                // })
  

        });
    };
  
    // response.docs[i].headline.main
    // response.docs[i].pub_date
    // response.docs[i].web_url
    // response.docs[i]._id

    render() {
        let displayArticles = this.state.article.map((eachItem, index) => 
            
            <div key={index} style={resultsLine}><a href={eachItem.web_url}><h5 style={textStyle} >{eachItem.headline.main}</h5></a>
                <h5 style={textStyle} >Date: {eachItem.pub_date.substring(0, 10)}</h5>
            <button style={btnStyle} onClick={() => this.saveArticle(index)}>SAVE</button></div>
            
        );

        let savedArticles = this.state.article.map((eachItem, index) =>
          
            <div key={eachItem._id} style={resultsLine}><a  href={eachItem.web_url}><h5 style={textStyle} >{eachItem.headline.main}</h5></a>
                <h5 style={textStyle} >Date Saved: {eachItem.pub_date.substring(0, 10)}</h5>
                <button style={btnStyle} onClick={() => this.deleteArticle(index)}>DELETE</button></div>

        );
        return (
   
            <Container fluid >
            {/* <div style={backgroundStyle} > */}
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>New York Times Article Scrubber</h1>
                            <h2>Search for and annotate articles of interest!</h2>
                        </Jumbotron>
                        <form>
                            Topic
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Topic (required)"
                            />
                            Start Year
                            <Input
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                name="startYear"
                                placeholder="Start Year (required)"
                            />
                            End Year
                            <Input
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                name="endYear"
                                placeholder="End Year (Required)"
                            />
                            <FormBtn
                                // disabled={!(this.state.author && this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Results</h1>
                        </Jumbotron>

                        {displayArticles}
                        {/* {displayArticles.length ? (
                   
                        ) : (
                                <h3>No Results to Display</h3>
                            )} */}

                        <Jumbotron>
                            <h1>Saved Articles</h1>
                        </Jumbotron>
                        {savedArticles}

                    </Col>
                </Row>
            {/* </div> */}
            </Container>
       
        );
    }
}

export default Article;
