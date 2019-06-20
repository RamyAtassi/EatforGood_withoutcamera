// Store/configureStore.js
import { createStore } from 'redux';
import allDataFromDB from './Reducer/allDataFromDB.reducer';
import data from './Reducer/data.reducer';
import foodSaved from './Reducer/foodSaved.reducer';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

export default createStore(
  persistCombineReducers(rootPersistConfig, { allDataFromDB, data, foodSaved }),
);
