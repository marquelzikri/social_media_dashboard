import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Dashboard from './app/containers/Dashboard';

import Users from './app/pages/Users';

function App() {
  return (
    <div className="flex justify-center w-screen overflow-hidden bg-gray-100">
      <Router>
        <Dashboard>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </Dashboard>
      </Router>
    </div>
  );
}

export default App;
