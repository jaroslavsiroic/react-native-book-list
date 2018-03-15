import { combineReducers } from 'redux';
import image_reducer from './image_cache';

module.exports = combineReducers({
    image_cache: image_reducer
});
