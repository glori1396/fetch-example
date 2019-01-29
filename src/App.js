import React, { Component } from 'react';
import './main.css';
import { Route, Switch } from 'react-router-dom';

import Header from './Header.js';
import BooksList from './BooksList.js';
import BookDetails from './BookDetails.js'
import newBook from './newBook.js'

class App extends Component {

  render() {
    return (
      <section>
        <Header />
        <Switch>
          <Route exact path={`${this.props.match.url}/`} component={BooksList} />
          <Route exact path={`${this.props.match.url}/add`} component={newBook} />
          <Route path={`${this.props.match.url}/:idBook`} component={BookDetails} />

        </Switch>
      </section>
    );
  }
}


export default (App);
