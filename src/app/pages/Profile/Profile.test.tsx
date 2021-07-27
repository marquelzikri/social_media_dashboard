import { render, waitFor, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import TestProvider from '../../components/TestProvider';

import Profile from './index';

test('renders profile page', () => {
  const { getByTestId } = render(
    <TestProvider>
      <Profile />
    </TestProvider>
  );

  expect(getByTestId('profile')).toBeInTheDocument();
});

test('renders a user card', () => {
  const { getByTestId } = render(
    <TestProvider>
      <Profile />
    </TestProvider>
  );

  expect(getByTestId('user-card')).toBeInTheDocument();
});

test('renders profile contents', async () => {
  const { getAllByTestId } = render(
    <TestProvider>
      <MemoryRouter initialEntries={['/users/1']}>
        <Route path="/users/:id">
          <Profile />
        </Route>
      </MemoryRouter>
    </TestProvider>
  );

  await waitFor(() => expect(getAllByTestId('profile-content')));
});

test("renders user's posts", async () => {
  const { getAllByTestId } = render(
    <TestProvider>
      <MemoryRouter initialEntries={['/users/1']}>
        <Route path="/users/:id">
          <Profile />
        </Route>
      </MemoryRouter>
    </TestProvider>
  );

  await waitFor(() => expect(getAllByTestId('post')));
});

test("renders user's albums", async () => {
  const { getByTestId } = render(
    <TestProvider>
      <MemoryRouter initialEntries={['/users/1']}>
        <Route path="/users/:id">
          <Profile />
        </Route>
      </MemoryRouter>
    </TestProvider>
  );

  fireEvent.click(getByTestId('tab-item-1'));
  setTimeout(async () => {
    await waitForElementToBeRemoved(getByTestId('user-posts'));

    await waitFor(() => expect(getByTestId('user-albums')));
  }, 5000);
});