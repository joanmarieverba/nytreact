import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import axios from 'axios';

// const backgroundStyle = {

//     backgroundImage: 'url("news.jpg")',
//     width: '100%',
//     minHeight: '100%',
//     backgroundSize: "100%",
// };


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

 //******** LOAD ARTICLE ***************////   
    loadArticle = () => {
        console.log("this.loadArticle called");
        API.getArticles()
            .then(res => {
                console.log("load article res ", res.data);
                this.setState({ savedArticle: res.data });
                console.log("savedArticle ", this.state.savedArticle)
            })
            .catch(err => console.log(err));
    };


    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticle())
            .catch(err => console.log(err));
    };

    saveArticle = index => {
        const articleData = {
            title: this.state.article[index].headline.main,
       //     date: this.state.article[index].pub_date,
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

        });
    };
  

    render() {
        let displayArticles = this.state.article.map((eachItem, index) => 
            
            <div key={index} style={resultsLine}><a href={eachItem.web_url}><h5 style={textStyle} >{eachItem.headline.main}</h5></a>
                <h5 style={textStyle} >Date: {eachItem.pub_date.substring(0, 10)}</h5>
            <button style={btnStyle} onClick={() => this.saveArticle(index)}>SAVE</button></div>
            
        );

        let savedArticles = this.state.savedArticle.map((eachItem, index) =>
  
            <div key={eachItem._id} style={resultsLine}><a  href={eachItem.url}><h5 style={textStyle} >{eachItem.title}</h5></a>
                <h5 style={textStyle} >Date Saved: {eachItem.date.substring(0, 10)}</h5>
                <button style={btnStyle} onClick={() => this.deleteArticle(eachItem._id)}>DELETE</button></div>

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




// exports default class MyComponent extends React.Component {
//     render() {
//         return (
//             const dateToFormat = '1976-04-19T12:59-0500';
//             <Moment> { dateToFormat }</Moment >
//         );
//     }
// }
