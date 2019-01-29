import React, { Component } from 'react';
import { connect } from 'react-redux';
import './main.css';

class App extends Component {

    constructor() {
        super();
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    handleLogin(user) {
        this.props.onLogin(user);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value === '') {
            alert("Insert user.")
        } else {
            this.handleLogin(this.state.value)
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <header className="login">
                <div className="login__container">
                    <h1>LOGIN</h1>
                    <form onSubmit={this.handleSubmit} className="login__form">
                        <input className="login__input" type="text" value={this.state.value} onChange={this.handleChange} />
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
        onLogin: (customer) => {
            dispatch({ type: 'LOGIN', customer })
        },
        onLogout: () => {
            dispatch({ type: 'LOGOUT' })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
