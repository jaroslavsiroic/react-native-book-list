import { combineReducers } from 'redux';
import data_reducer from './data';
import communication_reducer from './communication';

module.exports = combineReducers({
  data: data_reducer,
  communication: communication_reducer
});
