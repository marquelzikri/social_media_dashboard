import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Dashboard from './app/containers/Dashboard';

import Album from './app/pages/Album/index';
import Post from './app/pages/Post/index';
import Profile from './app/pages/Profile';
import Users from './app/pages/Users';

function App() {
  return (
    <div className="flex justify-center w-screen overflow-hidden bg-gray-100">
      <Router>
        <Dashboard>
          <Switch>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route path="/users/:id">
              <Profile />
            </Route>
            <Route path="/posts/:id">
              <Post />
            </Route>
            <Route path="/albums/:id">
              <Album />
            </Route>
          </Switch>
        </Dashboard>
      </Router>
    </div>
  );
}

export default App;
