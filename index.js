import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import './src/locale/i18n.config';
import store from 'src/redux/store';
import App from './App';
import {name as appName} from './app.json';

export const persister = persistStore(store);

LogBox.ignoreLogs(['Failed prop type']);

const RootApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
