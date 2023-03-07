import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import logoImage from './image/logo/logo512.png';
import './App.scss';
import { useState } from 'react';
import { useRequest } from '@umijs/hooks';

import Home from './page/home';
import Bonus from './page/bonus';
import Test from './page/test';
import Chat from './page/chat';

import LoginModal from './component/LoginModal';
import { getUserInfo } from './api/user';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { data: userInfo } = useRequest(async () => {
    const res = await getUserInfo();
    if (res.msg == 'NOTLOGIN') {
      setVisible(true);
    } else {
      setShowContent(true);
    }
    return res.data?.bonusNum;
  });

  return (
    <>
      <LoginModal
        visible={visible}
        onClose={() => {
          setVisible(false);
          setShowContent(true);
        }}
      ></LoginModal>
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Redirect to='/chat' />} />
          <Route
            path='/home'
            render={() => <Home visible={showContent}></Home>}
          />
          <Route
            path='/bonus'
            render={() => <Bonus visible={showContent}></Bonus>}
          />
          <Route
            path='/chat'
            render={() => <Chat visible={showContent}></Chat>}
          />
          {/* <Route component={Test}></Route> */}
        </Switch>
      </Router>
      <img
        src={logoImage}
        style={{
          width: '110px',
          position: 'absolute',
          left: '-5%',
          bottom: '0',
        }}
      ></img>
    </>
  );
};

export default App;
