import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              type="currentlyReading"
              books={this.props.books}
            />
            <Bookshelf
              type="wantToRead"
              books={this.props.books}
            />
            <Bookshelf
              type="read"
              books={this.props.books}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
};

export default ListBooks;
