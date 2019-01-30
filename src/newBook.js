import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './main.css';


class newBook extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            author: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
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
            this.handleCreate()
            this.setState({ name: '', author: '' })
        }
    }

    handleCreate() {
        let me = this;
        me.handletimestamp();
        fetch(`http://10.28.6.4:8080/v2/book/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            },
            body: JSON.stringify(me.state)
        })
    }

    render() {
        return (
            <div className="details">
                <div className="modal">
                    <div className="modal__header">
                        <h2>New Book</h2>
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

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (book) => {
            dispatch({ type: 'ADD_BOOK', book })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(newBook);
