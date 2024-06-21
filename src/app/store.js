import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/OnlineState/state';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },

});