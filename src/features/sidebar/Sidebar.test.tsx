import { render } from '@testing-library/react';

import Sidebar from './Sidebar';
import TestProvider from '../../app/components/TestProvider';

test('renders sidebar', () => {
  const { getByTestId } = render(
    <TestProvider>
      <Sidebar />
    </TestProvider>
  );

  expect(getByTestId('sidebar')).toBeInTheDocument();
});

test('renders sidebar items', () => {
  const { getAllByTestId } = render(
    <TestProvider>
      <Sidebar />
    </TestProvider>
  );

  expect(getAllByTestId('sidebar-item'));
});
