import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />
import './App.scss';

import Home from './page/home';
import Bonus from './page/bonus';

const App = () => (
  <Router>
    <Switch>
      <Route path='/' exact render={() => <Redirect to='/home' />} />
      <Route path='/home' component={Home} />
      <Route path='/bonus' component={Bonus} />
      {/* <Route component={DefaultLayout} /> */}
    </Switch>
  </Router>
);

export default App;
