import type { Store } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { RootState } from '../store';

export const renderWithProviders = ({
  ui,
  store,
  renderOptions = {},
}: {
  ui: React.ReactElement;
  store: Store<RootState>;
  renderOptions?: Omit<RenderOptions, 'queries'>;
}) => {
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
