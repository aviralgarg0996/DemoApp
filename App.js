/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import { Provider } from 'react-redux' 
import HomeScreen from './containers/HomeScreen';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
    <HomeScreen />
  </Provider>
  );
};

export default App;
