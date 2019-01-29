import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './Login';
import Root from './Root';
import * as serviceWorker from './serviceWorker';




function reducer(state = { customer: sessionStorage.getItem("customer") }, action) {
    switch (action.type) {
        case 'LOGIN':
            sessionStorage.setItem("customer", action.customer)
            return Object.assign(
                {},
                state, {
                    customer: action.customer
                });
        case 'LOGOUT':
            return Object.assign(
                {},
                state, {
                    customer: ''
                });
        default:
            return state;
    }
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Root>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/home" component={App} />
                    </Switch>
                </Root>
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
