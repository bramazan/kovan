import Header from './Header';
import Copyright from './Copyright';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Fragment } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const Root = () => (
  <Router>
    <Fragment>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Redirect to="/" />
      </Switch>
      <Copyright sx={{ mt: 5 }} />
    </Fragment>
  </Router>
);

function App() {
  return (
    <div className="App">
      <Root/>
    </div>
  );
}

export default App;
