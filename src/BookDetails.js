import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';


class BookDetails extends Component {
    constructor() {
        super();

        this.state = {
            name: 'No title',
            author: 'No Author'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeAuthor(event) {
        this.setState({ author: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name === '' || this.state.author === '') {
            alert("Insert info.")
        } else {
            this.handleUpdate()
            this.props.history.push('/home');
        }
    }

    handleUpdate() {
        let me = this;
        fetch(`http://10.28.6.4:8080/book/${me.props.match.params.idBook}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'customer': sessionStorage.getItem("customer")
            },
            body: JSON.stringify(me.state)
        })
    }

    componentDidMount() {
        let me = this;
        fetch(`http://10.28.6.4:8080/book/${me.props.match.params.idBook}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'customer': sessionStorage.getItem("customer")
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            me.setState({ name: myJson.name, author: myJson.author })
        })
    }

    render() {
        return (
            <div className="details">
                <div className="modal">
                    <div className="modal__header">
                        <h2>Book Details</h2>
                        <Link to='/home'>X</Link>
                    </div>
                    <form onSubmit={this.handleSubmit} className="modal__form">
                        <label>Name </label>
                        <input className="form__input" type="text" value={this.state.name} onChange={this.handleChangeName} />
                        <label>Author </label>
                        <input className="form__input" type="text" value={this.state.author} onChange={this.handleChangeAuthor} />
                        <input className="form__button" type="submit" value="Save" />
                    </form>
                </div>
            </div>
        );
    }
}


export default (BookDetails);
