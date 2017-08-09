import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfTypes: ['currentlyReading', 'wantToRead', 'read'],
    shelves: {}
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      const shelves = this.state.shelfTypes.reduce((data, state, index) => {
        data[state] = books.filter((book) => book.shelf === state).map((book) => book.id);
        return data;
      }, {});
      this.setState({ books, shelves })
    });
  }

  // update shelf of concrete book without request to server
  // used on '/' route
  // because all books already saved into the state
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelves) => {
      book.shelf = shelf;
      this.setState({shelves});
    });
  }

  // update shelf of concrete book with request to server
  // used on '/search' route
  // because user can add new books
  updateShelfWithDataReload = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelves) => {
      book.shelf = shelf;
      this.getAllBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <ListBooks
              updateShelf={this.updateShelf}
              books={this.state.books}
              shelves={this.state.shelves}
              shelfTypes={this.state.shelfTypes}
            />
          )}/>
          <Route exact path='/search' render={() => (
            <SearchBooks
              updateShelf={this.updateShelfWithDataReload}
              books={this.state.books}
              shelves={this.state.shelves}
              shelfTypes={this.state.shelfTypes}
            />
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
