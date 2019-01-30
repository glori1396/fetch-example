import React, { Component } from 'react';
import { connect } from 'react-redux';
import './main.css';
import Book from './Book.js'


class BooksList extends Component {

    constructor() {
        super();
        this.state = {
            books: []
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handletimestamp = this.handletimestamp.bind(this);
    }

    handletimestamp() {
        let token_timestamp = parseInt(sessionStorage.getItem("time"));
        let actual_timestamp = new Date();
        actual_timestamp = parseInt(actual_timestamp.getTime());
        console.log("TIMMMME: " + (actual_timestamp - token_timestamp))
        if ((actual_timestamp - token_timestamp) < 300000) {
            fetch(`http://10.28.6.4:8080/v2/user/renew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem("token")
                }
            }).then(function (response) {
                return response.json();
            }).then(function (myJson) {
                let date = new Date();
                sessionStorage.setItem("token", myJson.token);
                sessionStorage.setItem("time", date.getTime());
            })
        }
    }


    handleGetBooks = () => {
        this.handletimestamp();
        let me = this;
        fetch("http://10.28.6.4:8080/v2/book", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            me.setState({ books: myJson })
        })
    }

    componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            this.props.history.push('/')
        } else {
            this.handleGetBooks();
        }
    }


    handleRemove(id) {
        fetch(`http://10.28.6.4:8080/v2/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            }
        })
        let newBooks = [...this.state.books];
        let index = newBooks.findIndex(function (item, i) {
            return String(item.id) === id;
        });
        newBooks.splice(index, 1);
        this.setState({ books: newBooks })
    }

    render() {
        return (
            <section className="container" >
                <h1 className="container__title">All the Books</h1>
                {this.state.books.map(book => <Book key={book.id} id={book.id} match={this.props.match} onDelete={this.handleRemove} />)}
            </section >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customer: state.customer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
