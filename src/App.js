import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import Bookshelf from './Bookshelf';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books);
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
                    type="currentlyReading"
                    books={this.state.books}
                  />
                  <Bookshelf
                    type="wantToRead"
                    books={this.state.books}
                  />
                  <Bookshelf
                    type="read"
                    books={this.state.books}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' component={SearchBooks}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
