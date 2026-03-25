import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { fetchFullOfferAction } from './api-actions';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    thunk: {
    extraArgument: api,
    },
    }),
});