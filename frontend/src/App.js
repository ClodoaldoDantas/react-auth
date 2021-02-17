import React from 'react';
import Routes from './routes';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getPersistor } from '@rematch/persist';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={getPersistor()}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
