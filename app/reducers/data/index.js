import { combineReducers } from 'redux';
import image_reducer from './images';

module.exports = combineReducers({
    images: image_reducer
});
