import React, { useState, useRef } from 'react';
import { Carousel, Button, message } from 'antd';
import './index.scss';
import bonusbase from './img/bonusbase.jpeg';
// import logo from '../../logo.svg';
import { setUserBonus, getBonusList } from '../../api/bonus';
import { useRequest } from '@umijs/hooks';
import { Typography } from 'antd';

const { Title } = Typography;

const contentStyle = {
  height: '180px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '20%',
};

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const backgroundStyle = {
  backgroundImage: `url(${bonusbase})`,
  backgroundSize: '100% 100%',
  width: '100vw',
  height: '100vh',
  // position: 'fixed',
};

export default function Bonus() {
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState(0);
  const [bonusNum, setBonusNum] = useState(4);

  const { data: bonusList, run: updateBonusList } = useRequest(async () => {
    const res = await getBonusList({});
    setBonusNum(res.data?.length || 0);
    return res.data;
  });

  const carouselref = useRef();

  const setBonusInterval = (start, end, interval) => {
    let i = start;
    return new Promise((resolve) => {
      let timer = setInterval(() => {
        if (i > start + end) {
          clearInterval(timer);
          resolve(i);
        } else {
          carouseGoNext(i);
          i++;
        }
      }, interval);
    });
  };

  const carouseGoNext = (page) => {
    const pageTo = page % bonusNum;

    carouselref.current.goTo(pageTo, true);
  };

  const startBonus = async () => {
    let i = 0;
    console.log('start');

    const next1 = await setBonusInterval(0, 10, 100);
    const next2 = await setBonusInterval(next1, 7, 120);
    const next3 = await setBonusInterval(next2, 6, 150);
    const next4 = await setBonusInterval(next3, 5, 170);
    const next5 = await setBonusInterval(next4, 4, 200);
    const next6 = await setBonusInterval(next5, 3, 240);
    const next7 = await setBonusInterval(next6, 2, 390);
    const next8 = await setBonusInterval(next7, 1, 450);

    setLoading(false);
    setGameState(2);
    console.log(next8 % bonusNum);

    const bonus = bonusList[(next8 % bonusNum) - 1];

    message.info(`获得${next8 % bonusNum}号奖品`);
    console.log(bonus);
    setUserBonus(bonus);
  };

  const onClick = () => {
    setLoading(true);
    setGameState(1);

    startBonus();
  };

  const onAfterChange = (current) => {
    // console.log(current);
  };

  return (
    <div className='base'>
      <div style={backgroundStyle}>
        <Carousel
          style={{
            paddingTop: 180,
            width: '80%',
            left: '50%',
            marginLeft: '-40%',
          }}
          ref={carouselref}
          afterChange={onAfterChange}
        >
          {bonusList &&
            bonusList.map((item) => {
              return (
                <div key={item.id}>
                  <div style={contentStyle}>
                    <Title level={3} style={{ paddingTop: 20 }}>
                      {item.name}
                    </Title>
                    <Title level={5}>{item.description}</Title>
                  </div>
                </div>
              );
            })}
        </Carousel>
        <div style={centerStyle}>
          <Button
            type='primary'
            loading={loading}
            onClick={onClick}
            style={{ marginTop: '15px' }}
          >
            {gameState == 0
              ? '开始抽奖'
              : gameState == 1
              ? '抽奖中'
              : '抽奖结束'}
          </Button>
        </div>
        {/* <img src={logo} className='App-logo' alt='logo' style={centerStyle} /> */}
      </div>
    </div>
  );
}
