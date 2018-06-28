import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Article extends Component {
    state = {
        article: [],
        title: "",
        startYear: "",
        endYear: ""
    };

    componentDidMount() {
        this.loadarticle();
    }

    loadArticle = () => {
        API.getarticle()
            .then(res =>
                this.setState({ article: res.data, title: "", startYear: "", endYear: "" })
            )
            .catch(err => console.log(err));
    };

    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadarticle())
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
        if (this.state.title && this.state.startYear && this.state.endYear) {
            API.saveArticle({
                title: this.state.title,
                date: this.state.startYear,
                url: this.state.endYear
            })
                .then(res => this.loadArticle())
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>New York Times Article Scrubber</h1>
                            <h2>Search for and annotate articles of interest!</h2>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <Input
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                name="author"
                                placeholder="Author (required)"
                            />
                            <TextArea
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                name="synopsis"
                                placeholder="Synopsis (Optional)"
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
                        {this.state.article.length ? (
                            <List>
                                {this.state.article.map(article => (
                                    <ListItem key={article._id}>
                                        <Link to={"/article/" + article._id}>
                                            <strong>
                                                {article.title} 
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deletearticle(article._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default article;
