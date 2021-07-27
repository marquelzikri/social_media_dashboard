import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import TestProvider from '../../components/TestProvider';

import Post from './index';

test('renders post page', () => {
  const { getByTestId } = render(
    <TestProvider>
      <Post />
    </TestProvider>
  );

  expect(getByTestId('post')).toBeInTheDocument();
});

test('renders comments of a post', async () => {
  const { getAllByTestId, getByText } = render(
    <TestProvider>
      <MemoryRouter initialEntries={['/post/1']}>
        <Route path="/post/:id">
          <Post />
        </Route>
      </MemoryRouter>
    </TestProvider>
  );

  await waitForElementToBeRemoved(getByText('Loading post detail'));
  await waitFor(() => expect(getAllByTestId('comment')));
});
