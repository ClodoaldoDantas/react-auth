import { init } from '@rematch/core';
import * as models from './models';

import createLoadingPlugin from '@rematch/loading';
import createPersistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';

const loadingPlugin = createLoadingPlugin();
const persistPlugin = createPersistPlugin({
  key: 'root',
  storage,
  whitelist: ['auth'],
});

const store = init({
  models,
  plugins: [loadingPlugin, persistPlugin],
});

export default store;
