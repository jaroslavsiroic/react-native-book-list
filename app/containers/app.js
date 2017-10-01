import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import Swiper from './Swiper';
import List from './List';

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);
const AppNavigation = TabNavigator({
  Swiper: { screen: Swiper },
  Home: { screen: List },
});
// begin periodically persisting the store
persistStore(store, {blacklist: ['communication'], storage: AsyncStorage});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
