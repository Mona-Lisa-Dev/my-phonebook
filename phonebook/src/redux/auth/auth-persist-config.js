import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'token', // имя ключа в локал сторейдже
  storage,
  whitelist: ['token'], // то, что нужно хранить в локал сторейдже
};

export default authPersistConfig;
