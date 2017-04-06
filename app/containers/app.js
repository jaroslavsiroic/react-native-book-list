import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import Homepage from './Homepage';
import BookView from './BookView';
import AddBook from './AddBook';

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

// begin periodically persisting the store
persistStore(store, {storage: AsyncStorage})

const AppNavigation = StackNavigator({
  Home: { screen: Homepage },
  BookView: { screen: BookView },
  AddBook: { screen: AddBook }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
