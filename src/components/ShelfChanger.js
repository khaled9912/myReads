import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };

  updateShelf = event =>
    this.props.changeShelf(this.props.book, event.target.value);

  render() {
    const { book, isSearch, books } = this.props;
    console.log(isSearch)
    // set current shelf to none as default
    let currentShelf = 'none';

    // if book is in current list, set current shelf to book.shelf
    for (let item of books) {
      if (item.id === book.id) {
        currentShelf = item.shelf;
        break;
      }
    }

    return (
      <div className="book-shelf-changer">
        <select onChange={this.updateShelf} defaultValue={currentShelf}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          {!isSearch&& (
          <option value="remove">Remove</option>
          )}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
