import React, { useState, useRef } from 'react';
import { Carousel, Button, message } from 'antd';
import './index.scss';
import backgroundImage from '../../image/background/spring.jpeg';

// import logo from '../../logo.svg';
import {
  setUserBonus,
  getBonusList,
  getUserBonusNum,
  setUserBonusNum,
} from '../../api/bonus';
import { useRequest } from '@umijs/hooks';
import { Typography } from 'antd';

const { Title } = Typography;

const contentStyle = {
  height: '180px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  // background: '#364d81',
  borderRadius: '20%',
};

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: '100% 100%',
  width: '100vw',
  height: '100vh',
};

export default function Bonus(props) {
  const { visible } = props;
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState(0);
  const [bonusNum, setBonusNum] = useState(4);

  const { data: bonusList, run: updateBonusList } = useRequest(async () => {
    const res = await getBonusList({});
    setBonusNum(res.data?.length || 0);
    return res.data;
  });

  const { data: userBonusNum, run: updateUserBonusNum } = useRequest(
    async () => {
      const res = await getUserBonusNum();
      return res.data?.bonusNum;
    }
  );

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
    const startNum = Math.floor(Math.random() * 3);
    // console.log((10 + 7 + 6 + 5 + 3 + 3 + 2 + 1 + startNum) % bonusNum);

    const next1 = await setBonusInterval(0, 10 + startNum, 100);
    const next2 = await setBonusInterval(next1, 7, 120);
    const next3 = await setBonusInterval(next2, 6, 150);
    const next4 = await setBonusInterval(next3, 5, 170);
    const next5 = await setBonusInterval(next4, 4, 200);
    const next6 = await setBonusInterval(next5, 3, 240);
    const next7 = await setBonusInterval(next6, 2, 390);
    const next8 = await setBonusInterval(next7, 1, 450);

    setLoading(false);
    setGameState(2);

    const bonus = bonusList[(next8 % bonusNum) - 1];

    message.info(`获得${next8 % bonusNum}号奖品`);
    setUserBonus(bonus);
  };

  const onClick = async () => {
    const newNum = userBonusNum - 1;
    const updateRes = await setUserBonusNum({ bonusNum: newNum });
    updateUserBonusNum();
    setLoading(true);
    setGameState(1);

    startBonus();
  };

  return (
    <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <div style={backgroundStyle}>
        <Carousel
          style={{
            paddingTop: 180,
            width: '80%',
            left: '50%',
            marginLeft: '-40%',
          }}
          ref={carouselref}
        >
          {bonusList &&
            bonusList.map((item) => {
              return (
                <div key={item.id}>
                  <div style={contentStyle}>
                    <Title
                      level={3}
                      style={{ paddingTop: 20, color: '#FFD700' }}
                    >
                      {item.name}
                    </Title>
                    <Title level={5} style={{ color: '#FFFACD' }}>
                      {item.description}
                    </Title>
                  </div>
                </div>
              );
            })}
        </Carousel>
        <div style={centerStyle}>
          <Button
            type='primary'
            // disabled={!userBonusNum}
            loading={loading}
            onClick={onClick}
            style={{
              marginTop: '15px',
              backgroundColor: 'red',
              width: '100px',
            }}
          >
            <span style={{ color: '#FFFACD' }}>
              {gameState == 0
                ? `开始抽奖(${userBonusNum ?? ''})`
                : gameState == 1
                ? '抽奖中'
                : !userBonusNum
                ? '抽奖结束'
                : `开始抽奖(${userBonusNum ?? ''})`}
            </span>
          </Button>
        </div>
        {/* <img src={logo} className='App-logo' alt='logo' style={centerStyle} /> */}
      </div>
    </div>
  );
}
