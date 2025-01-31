import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import App from '../../App';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
function StoreAppWrapper() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default StoreAppWrapper;
