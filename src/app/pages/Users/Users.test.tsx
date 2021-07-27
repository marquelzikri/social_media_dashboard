import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import TestProvider from '../../components/TestProvider';

import Users from './index';

test('renders users page', async () => {
  const { getByTestId, getByText } = render(
    <TestProvider>
      <Users />
    </TestProvider>
  );

  await waitForElementToBeRemoved(getByText('Loading users'));
  expect(getByTestId('users')).toBeInTheDocument();
});

test('renders user list', async () => {
  const { getAllByTestId } = render(
    <TestProvider>
      <Users />
    </TestProvider>
  );

  await waitFor(() => expect(getAllByTestId('user-card')));
});
