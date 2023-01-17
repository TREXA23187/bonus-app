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

import LoginModal from './component/LoginModal';
import { getUserInfo } from './api/user';

const App = () => {
  const [visible, setVisible] = useState(false);

  const { data: userInfo } = useRequest(async () => {
    const res = await getUserInfo();
    if (res.msg == 'NOTLOGIN') {
      setVisible(true);
    }
    return res.data?.bonusNum;
  });

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
