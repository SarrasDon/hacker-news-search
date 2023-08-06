import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { expect } from 'vitest';
import { mockApiResponse } from './test/mocks/apiResponse';

expect.extend(matchers);

export const server = setupServer(
  rest.get(`https://hn.algolia.com/api/v1/search`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockApiResponse));
  }),
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
