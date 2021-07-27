import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import TestProvider from '../../components/TestProvider';

import Albums from './index';

test('renders albums page', async () => {
  const { getByTestId, getByText } = render(
    <TestProvider>
      <Albums />
    </TestProvider>
  );

  await waitForElementToBeRemoved(getByText('Loading albums'));
  expect(getByTestId('albums')).toBeInTheDocument();
});

test('renders album list', async () => {
  const { getAllByTestId } = render(
    <TestProvider>
      <Albums />
    </TestProvider>
  );

  await waitFor(() => expect(getAllByTestId('album')));
});
