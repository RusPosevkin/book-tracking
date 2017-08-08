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
              type={this.props.shelfTypes[0]}
              books={this.props.books}
              filteredBooksIDs={this.props.shelves[this.props.shelfTypes[0]]}
              updateShelf={this.props.updateShelf}
            />
            <Bookshelf
              type={this.props.shelfTypes[1]}
              books={this.props.books}
              filteredBooksIDs={this.props.shelves[this.props.shelfTypes[1]]}
              updateShelf={this.props.updateShelf}
            />
            <Bookshelf
              type={this.props.shelfTypes[2]}
              books={this.props.books}
              filteredBooksIDs={this.props.shelves[this.props.shelfTypes[2]]}
              updateShelf={this.props.updateShelf}
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
