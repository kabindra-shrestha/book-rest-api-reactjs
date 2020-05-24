import React, {Component} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import UtilsToast from "./UtilsToast";
import axios from "axios";

export default class Book extends Component {

    initialState = {
        id: '', title: '', author: '', coverPhotoURL: '', isbnNumber: '', price: '', language: '', genre: ''
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages: [],
            show: false
        };
        this.bookChange = this.bookChange.bind(this)
        this.submitBook = this.submitBook.bind(this)
    }

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if (bookId) {
            this.findBookById(bookId);
        }
        this.findAllLanguages();
        this.findAllGenres();
    };

    findAllLanguages = () => {
        axios.get("/rest/books/languages")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    languages: [{value: '', display: 'Select Language'}]
                        .concat(data.map(language => {
                            return {value: language, display: language}
                        }))
                });
            });
    };

    findAllGenres = () => {
        axios.get("/rest/books/genres")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    genres: [{value: '', display: 'Select Genre'}]
                        .concat(data.map(genre => {
                            return {value: genre, display: genre}
                        }))
                });
            });
    };

    /*findBookById = (bookId) => {
        axios.get("/rest/books/" + bookId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        author: response.data.author,
                        coverPhotoURL: response.data.coverPhotoURL,
                        isbnNumber: response.data.isbnNumber,
                        price: response.data.price,
                        language: response.data.language,
                        genre: response.data.genre
                    })
                }
            }).catch((error) => {
            console.error("Error - " + error)
        });
    };*/

    findBookById = (bookId) => {
        fetch("/rest/books/" + bookId)
            .then(response => response.json())
            .then((book) => {
                if (book) {
                    this.setState({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        coverPhotoURL: book.coverPhotoURL,
                        isbnNumber: book.isbnNumber,
                        price: book.price,
                        language: book.language,
                        genre: book.genre
                    })
                }
            }).catch((error) => {
            console.error("Error - " + error)
        });
    };

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    /*submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        axios.post("/rest/books", book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };*/

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("/rest/books", {
            method: 'POST',
            body: JSON.stringify(book),
            headers
        }).then(response => response.json())
            .then((book) => {
                if (book) {
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };

    /*updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        axios.put("/rest/books", book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "put"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };*/

    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("/rest/books", {
            method: 'PUT',
            body: JSON.stringify(book),
            headers
        }).then(response => response.json())
            .then((book) => {
                if (book) {
                    this.setState({"show": true, "method": "put"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <UtilsToast show={this.state.show}
                                message={this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."}
                                type={"success"}/>
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Book" : "Add New Book"}
                    </Card.Header>
                    <Form id="bookFormId" onSubmit={this.state.id ? this.updateBook : this.submitBook}
                          onReset={this.resetBook}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text" name="title"
                                        value={title}
                                        onChange={this.bookChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Book Title"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text" name="author"
                                        value={author}
                                        onChange={this.bookChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Book Author"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text" name="coverPhotoURL"
                                        value={coverPhotoURL}
                                        onChange={this.bookChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Book Cover Photo URL"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text" name="isbnNumber"
                                        value={isbnNumber}
                                        onChange={this.bookChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Book ISBN Number"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text" name="price"
                                        value={price}
                                        onChange={this.bookChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Book Price"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control
                                        required as="select"
                                        custom onChange={this.bookChange}
                                        name="language" value={language}
                                        className="bg-dark text-white">
                                        {this.state.languages.map(language =>
                                            <option key={language.value} value={language.value}>
                                                {language.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        required as="select"
                                        custom onChange={this.bookChange}
                                        name="genre" value={genre}
                                        className="bg-dark text-white">
                                        {this.state.genres.map(genre =>
                                            <option key={genre.value} value={genre.value}>
                                                {genre.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Book List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}