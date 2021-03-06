import React from 'react';
import './App.css';

import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";
import UserList from "./components/UserList";

export default function App() {

    const heading = "Welcome To Book Shop";
    const quote = "Good friends, good books, and a sleepy conscience: this is the ideal life";
    const footer = "Mark Twain";

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact
                                   component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                            <Route key="add " path="/add" exact component={Book}/>
                            <Route key="edit" path="/edit/:id" exact component={Book}/>
                            <Route path="/list" exact component={BookList}/>
                            <Route path="/users" exact component={UserList}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}