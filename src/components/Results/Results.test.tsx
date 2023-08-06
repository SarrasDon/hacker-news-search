import { Store } from '@reduxjs/toolkit';
import { act, cleanup, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RootState, setupStore, storiesApi } from '../../store';
import { mockStory } from '../../test/mocks/mockStory';
import { renderWithProviders } from '../../test/utils';
import { Results } from './Results';

describe('Results Component', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    //clear store before each test
    store = setupStore();
    cleanup();
  });

  afterEach(() => {
    // reset api after each test
    storiesApi.util.resetApiState();
  });

  it('Should render the loading state', () => {
    act(() => {
      renderWithProviders({
        ui: (
          <Results
            debouncedSearchTerm={'some term'}
            hasError={false}
            isLoading={true}
            isFetching={false}
            isSuccess={false}
          />
        ),
        store,
      });
    });

    expect(screen.getByText(/loading stories/i)).toBeInTheDocument();
  });

  it('Should render the error state', () => {
    act(() => {
      renderWithProviders({
        ui: (
          <Results
            debouncedSearchTerm={'some term'}
            hasError={true}
            isLoading={false}
            isFetching={false}
            isSuccess={false}
          />
        ),
        store,
      });
    });

    expect(
      screen.getByText(/error while fetching stories/i),
    ).toBeInTheDocument();
  });

  it('Should render the no stories message', () => {
    act(() => {
      renderWithProviders({
        ui: (
          <Results
            debouncedSearchTerm={'some term'}
            hasError={false}
            isLoading={false}
            isFetching={false}
            isSuccess={true}
          />
        ),
        store,
      });
    });

    expect(screen.getByText(/no stories/i)).toBeInTheDocument();
  });

  it('Should render the results', () => {
    act(() => {
      renderWithProviders({
        ui: (
          <Results
            debouncedSearchTerm={'javascript'}
            hasError={false}
            isLoading={false}
            isFetching={false}
            isSuccess={true}
            stories={[mockStory]}
          />
        ),
        store,
      });
    });

    expect(
      screen.getByText(
        (_, element) => element?.textContent === mockStory.title,
        { selector: 'li[class="result-item list-item hoverable"' },
      ),
    ).toBeInTheDocument();
  });
});
