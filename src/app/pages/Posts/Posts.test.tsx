import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import TestProvider from '../../components/TestProvider';

import Posts from './index';

test('renders posts page', async () => {
  const { getByTestId } = render(
    <TestProvider>
      <Posts />
    </TestProvider>
  );

  expect(getByTestId('posts')).toBeInTheDocument();
});

test('renders post list', async () => {
  const { getAllByTestId, getByText } = render(
    <TestProvider>
      <Posts />
    </TestProvider>
  );

  await waitForElementToBeRemoved(getByText('Loading posts'));
  await waitFor(() => expect(getAllByTestId('post')));
});
