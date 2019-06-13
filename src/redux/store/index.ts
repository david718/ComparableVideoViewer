import { combineReducers, compose, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxLogger from 'redux-logger';

import { rootReducer, RootState } from '../reducers';

const persistConfig = {
  storage,
  key: 'root'
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
  const middlewares: any[] = [reduxLogger];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  return createStore(persistedReducer, initialState, enhancer);
};

const store = configureStore();
const persistor = persistStore(store);

if (typeof module.hot !== 'undefined') {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').rootReducer));
}

export { store, persistor };
