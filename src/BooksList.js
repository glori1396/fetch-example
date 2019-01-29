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
    }

    handleGetBooks = () => {
        let me = this;
        fetch("http://10.28.6.4:8080/book", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'customer': this.props.customer
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            console.log("holiiiiiiiiiii")
            me.setState({ books: myJson })
        })
    }

    componentDidMount() {
        this.handleGetBooks();
    }


    handleRemove(id) {
        fetch(`http://10.28.6.4:8080/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'customer': sessionStorage.getItem("customer")
            }
        })
        console.log("aquiiiiiiiiii en delete")
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
