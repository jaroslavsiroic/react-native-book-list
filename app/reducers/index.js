import { combineReducers } from 'redux';
import data_reducer from './data';

module.exports = combineReducers({
  data: data_reducer
});
