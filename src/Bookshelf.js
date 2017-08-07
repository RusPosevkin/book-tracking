import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import keyIndex from 'react-key-index';

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

  render() {
    const filteredBooks = this.props.books.filter((book) => {
      return this.props.type === 'none' ?
        book.shelf === this.props.type :
        this.props.filteredBooksIDs.indexOf(book.id) !== -1;
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
              <Book
                key={keyIndex([book], 1)[0].id}
                book={book}
                updateShelf={this.props.updateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
};

export default Bookshelf;
