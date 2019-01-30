import React, { Component } from 'react';
import { connect } from 'react-redux';
import './main.css';

class App extends Component {

    constructor() {
        super();
        this.state = { username: '', password: '' };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.value === '') {
            alert("Insert user.")
        } else {
            this.props.onAddToken(this.state);
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <header className="login">
                <div className="login__container">
                    <h1>LOGIN</h1>
                    <form onSubmit={this.handleSubmit} className="login__form">
                        <input className="login__input" type="text" value={this.state.value} placeholder="Username" onChange={this.handleChangeUsername} />
                        <input className="login__input" type="password" value={this.state.value} placeholder="Password" onChange={this.handleChangePassword} />
                        <input className="login__button" type="submit" value="Enter" />
                    </form>
                </div>
            </header>
        );
    }
}


const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToken: (user) => {
            dispatch({ type: 'ADD_TOKEN', user })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
