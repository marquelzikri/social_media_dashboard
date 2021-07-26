import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../store';

const TestProvider: FC = (props) => {
  return (
    <Provider store={store}>
      <Router>
        {props.children}
      </Router>
    </Provider>
  );
}

export default TestProvider;
