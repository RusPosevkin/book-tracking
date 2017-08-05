import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Bookshelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    title: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read',
      none: 'Other'
    }
  }

  updateShelf = (shelf, book) => {
    BooksAPI.update(book, shelf);
  }

  render() {
    const filteredBooks = this.props.books.filter((book) => {
      return book.shelf === this.props.type;
    });

    if (!filteredBooks.length) {
      return null;
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.title[this.props.type]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">

                      {book.imageLinks && book.imageLinks.thumbnail ?
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                      : null}
                      <div className="book-shelf-changer">
                        <select onChange={(event) => this.updateShelf(event.target.value, book)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading" selected={book.shelf === 'currentlyReading'}>Currently Reading</option>
                          <option value="wantToRead" selected={book.shelf === 'wantToRead'}>Want to Read</option>
                          <option value="read" selected={book.shelf === 'read'}>Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors ? book.authors.map((author) => <p key={author}>{author}</p>) : null}</div>
                </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
};

export default Bookshelf;
