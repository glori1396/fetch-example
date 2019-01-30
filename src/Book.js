import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';


class Book extends Component {
    constructor() {
        super();
        this.state = {
            isClicked: false,
            name: "",
            author: ""
        }
        this.handletimestamp = this.handletimestamp.bind(this);
    }


    handletimestamp() {
        let token_timestamp = parseInt(sessionStorage.getItem("time"));
        let actual_timestamp = new Date();
        actual_timestamp = parseInt(actual_timestamp.getTime());
        console.log("TIMMMME: " + (actual_timestamp - token_timestamp))
        if ((actual_timestamp - token_timestamp) >= 120000) {
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


    handleIsClicked = () => {
        this.setState({ isClicked: !this.state.isClicked })
    }

    componentDidMount() {
        let me = this;
        me.handletimestamp();
        fetch(`http://10.28.6.4:8080/v2/book/${me.props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem("token")
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            me.setState({ name: myJson.name, author: myJson.author })
        })
    }


    handleShowDetails = () => {
        return (
            <div className="show_details">
                <p><strong>Author: </strong> {this.state.author}</p>
                <div className="show_container">
                    <button className="show_details__button"><Link to={`${this.props.match.url}/${this.props.id}`}>Edit</Link></button>
                    <button className="show_details__button" onClick={() => this.props.onDelete(this.props.id)}>Remove</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="book__container">
                <div className="book" onClick={this.handleIsClicked}>
                    <h3 className="book__title">{this.state.name}</h3>
                    <h5 className={this.state.isClicked ? "book__button clicked" : "book__button"}>▼</h5>
                </div>
                {this.state.isClicked ? this.handleShowDetails() : null}
            </div>
        );
    }
}


export default (Book);
