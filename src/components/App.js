import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as BooksAPI from '../data/BooksAPI';
import '../css/App.css';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import Search from './Search';
import NotFound from './NotFound';

class BooksApp extends React.Component {
  state = { books: [] };

  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      // set shelf for new or updated book
      changedBook.shelf = shelf;
      // update state with changed book
      this.setState(prevState => ({
        books: prevState.books
          // remove updated book from array
          .filter(book => book.id !== changedBook.id)
          // add updated book to array
          .concat(changedBook)
      }));
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={
              <Search books={books} changeShelf={this.changeShelf} />
            }
          />
          <Route
            exact
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookList books={books} changeShelf={this.changeShelf} />
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
            }
          />
          <Route element={NotFound} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
