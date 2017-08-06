import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import Bookshelf from './Bookshelf';
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
      this.setState({shelves});
    });
  }

  // update shelf of concrete book with request to server
  // used on '/search' route
  // because user can add new books 
  updateShelfWithDataReload = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelves) => {
      this.getAllBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf
                    type={this.state.shelfTypes[0]}
                    books={this.state.books}
                    filteredBooksIDs={this.state.shelves[this.state.shelfTypes[0]]}
                    updateShelf={this.updateShelf}
                  />
                  <Bookshelf
                    type={this.state.shelfTypes[1]}
                    books={this.state.books}
                    filteredBooksIDs={this.state.shelves[this.state.shelfTypes[1]]}
                    updateShelf={this.updateShelf}
                  />
                  <Bookshelf
                    type={this.state.shelfTypes[2]}
                    books={this.state.books}
                    filteredBooksIDs={this.state.shelves[this.state.shelfTypes[2]]}
                    updateShelf={this.updateShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
          <Route exact path='/search' render={() => (
            <SearchBooks
              updateShelf={this.updateShelfWithDataReload}
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
