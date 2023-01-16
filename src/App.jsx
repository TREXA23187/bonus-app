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
import { useState } from 'react';
import { useRequest } from '@umijs/hooks';

import Home from './page/home';
import Bonus from './page/bonus';

import { getBonusList } from './api/bonus';

import LoginModal from './component/LoginModal';

const App = () => {
  const [visible, setVisible] = useState(false);

  const { data: bonusList, run: updateBonusList } = useRequest(async () => {
    const res = await getBonusList({});
    if (res.code == 0) {
      setVisible(true);
    }
    return res.data;
  }, []);

  return (
    <>
      <LoginModal
        visible={visible}
        onClose={() => setVisible(false)}
      ></LoginModal>
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Redirect to='/home' />} />
          <Route path='/home' component={Home} />
          <Route path='/bonus' component={Bonus} />
          {/* <Route component={DefaultLayout} /> */}
        </Switch>
      </Router>
    </>
  );
};

export default App;
