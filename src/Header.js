import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './main.css';

class Header extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        sessionStorage.removeItem("token", '')
        sessionStorage.removeItem("time", '')
    }

    render() {
        return (
            <div className="header">
                <nav className="navBar">
                    <h4>Welcome {this.props.customer}!</h4>
                    <ul className="navBar__menu">
                        <li><Link to='/home' className="navBar__menu__item">Books</Link></li>
                        <li><Link to='/home/add' className="navBar__menu__item">New Book</Link></li>
                    </ul>
                    <Link to='/' className="navBar__logout" onClick={this.handleLogout}>Logout</Link>
                </nav>
            </div>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        customer: state.customer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch({ type: 'LOGOUT' })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
