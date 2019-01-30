import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './Login';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const handleAddToken = (user) => {
    fetch(`http://10.28.6.4:8080/v2/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(function (response) {
        return response.json();
    }).then(function (myJson) {
        let date = new Date();
        sessionStorage.setItem("token", myJson.token);
        sessionStorage.setItem("time", date.getTime());
    })
}

function reducer(state = { token: sessionStorage.getItem("token") }, action) {
    switch (action.type) {
        case 'ADD_TOKEN':
            handleAddToken(action.user);
            return Object.assign(
                {},
                state, {
                    token: sessionStorage.getItem("token")
                });
        case 'DELETE_TOKEN':
            return Object.assign(
                {},
                state, {
                    token: ''
                });
        case 'RENEW_TOKEN':
            //sessionStorage.setItem("token", "algo va aqui")
            return Object.assign(
                {},
                state, {
                    token: ''
                }
            )
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
