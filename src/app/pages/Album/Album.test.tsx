import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import TestProvider from '../../components/TestProvider';

import Album from './index';

test('renders album page', () => {
  const { getByTestId } = render(
    <TestProvider>
      <Album />
    </TestProvider>
  );

  expect(getByTestId('album')).toBeInTheDocument();
});

test('renders photos of an album', async () => {
  const { getAllByTestId, getByText } = render(
    <TestProvider>
      <MemoryRouter initialEntries={['/albums/1']}>
        <Route path="/albums/:id">
          <Album />
        </Route>
      </MemoryRouter>
    </TestProvider>
  );

  await waitForElementToBeRemoved(getByText('Loading photos'));
  await waitFor(() => expect(getAllByTestId('photo')));
});
