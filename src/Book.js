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
    }

    handleIsClicked = () => {
        this.setState({ isClicked: !this.state.isClicked })
    }

    componentDidMount() {
        let me = this;
        fetch(`http://10.28.6.4:8080/book/${me.props.id}`, {
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
                    <h5 className="book__button">{this.state.isClicked ? "▲" : "▼"}</h5>
                </div>
                {this.state.isClicked ? this.handleShowDetails() : null}
            </div>
        );
    }
}


export default (Book);
