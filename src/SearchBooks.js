import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';

class SearchBooks extends Component {
  state = {
    books: []
  }

  updateQuery = (query) => {
    BooksAPI.search(query, 10).then((books) => {
      this.setState({
        books: books.error ? [] : books
      });
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
            <Bookshelf
              type={this.props.shelfTypes[0]}
              books={this.state.books}
              filteredBooksIDs={this.props.shelves[this.props.shelfTypes[0]]}
              updateShelf={this.props.updateShelf}
            />
            <Bookshelf
              type={this.props.shelfTypes[1]}
              books={this.state.books}
              filteredBooksIDs={this.props.shelves[this.props.shelfTypes[1]]}
              updateShelf={this.props.updateShelf}
            />
            <Bookshelf
              type={this.props.shelfTypes[2]}
              books={this.state.books}
              filteredBooksIDs={this.props.shelves[this.props.shelfTypes[2]]}
              updateShelf={this.props.updateShelf}
            />
            <Bookshelf
              type="none"
              books={this.state.books}
              updateShelf={this.props.updateShelf}
            />
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
};

export default SearchBooks;
