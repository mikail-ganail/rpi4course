// render-with-providers.tsx
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../store/reducer';
import type { InitialState } from '../store/reducer';

export function renderWithProviders(
  ui: ReactElement,
  preloadedState: InitialState
) {
  const store = configureStore({
    reducer,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
}