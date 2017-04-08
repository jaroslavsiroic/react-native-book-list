import { combineReducers } from 'redux';
import books_reducer from './books';

module.exports = combineReducers({
    books: books_reducer
});
