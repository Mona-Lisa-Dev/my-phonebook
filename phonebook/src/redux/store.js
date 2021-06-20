import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import middleware from './middleware';
import authPersistConfig from './auth/auth-persist-config';
import contactsReducer from './contacts/contacts-reducer';
import authReducer from './auth/auth-reducer';

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
  },
  middleware,
  // devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
