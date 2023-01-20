import React, { useEffect, useState } from 'react';
import './index.scss';
import FlipClock from '../../component/flipClock';

import backgroundImage from '../../image/background/spring.jpeg';
import fuGif from './img/fu.gif';

import { Button, Form, Badge, Typography } from 'antd';
import fireworks from 'react-fireworks';

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: '100% 100%',
  width: '100vw',
  height: '100vh',
  position: 'relative',
};

const beginDateStr = '2022-10-13 17:46:00';
const beginDate = new Date(beginDateStr);
const endDate = Date.now();
const new_days = parseInt((endDate - beginDate) / 1000 / (60 * 60 * 24));

export default function Home(props) {
  const { visible } = props;
  const [dayDiff, setDayDiff] = useState(new_days);
  const { Text } = Typography;

  const onFireWork = () => {
    fireworks.init('base_div', {
      frequency: 300,
      launch_speed: 5,
    });
    fireworks.start();

    const timer = setTimeout(() => {
      fireworks.stop();
      clearTimeout(timer);

      const remove_timer = setTimeout(() => {
        const fireworks_canvas = document.getElementById('fireworksField');
        fireworks_canvas.parentNode.removeChild(fireworks_canvas);
        clearTimeout(remove_timer);
      }, 15500);
    }, 3000);
  };

  return (
    <div
      style={{
        visibility: visible ? 'visible' : 'hidden',
        // height: '80vh',
      }}
      id='base_div'
    >
      <div style={backgroundStyle}>
        {/* <div>2022.10.13 16:46</div> */}
        <div
          style={{
            width: '70%',
            textAlign: 'center',
            marginLeft: '15%',
            marginBottom: '10px',
            paddingTop: '50px',
            lineHeight: '5',
          }}
        >
          <Text className='home_text' style={{ fontSize: '26px' }}>
            新年新气象
          </Text>
          <Text className='home_text' style={{ fontSize: '26px' }}>
            恭祝
          </Text>
          <Text className='home_text' style={{ fontSize: '24px' }}>
            邵珊公主
          </Text>
          <Text className='home_text'>所期皆所念</Text>
          <Text className='home_text'>所念皆所愿</Text>
          <Text className='home_text'>所愿皆所得</Text>
          <Text className='home_text'>所行化坦途</Text>
          <Text className='home_text'>所爱之人 皆相随相伴</Text>
          <Text className='home_text'>平安喜乐 顺遂无忧</Text>
          <Text className='home_text'>学有所成 优秀毕业</Text>
          <Text className='home_text'>胃口好 吃饭香</Text>
          <Text className='home_text'>不失眠 有活力</Text>
          {/* <Text className='home_text'>拥有一份好工作 年少有为</Text>
          <Text className='home_text'>领导对你好 同事智商人品都在线</Text> */}
          <Text className='home_text'>很荣幸在这个宇宙中与您结识</Text>
          <Text
            className='home_text'
            style={{
              fontSize: '28px',
              fontFamily: 'Microsoft yahei',
              color: '#FFD39B',
              fontWeight: 'normal',
              fontFamily: 'xingkai',
            }}
          >
            第 {dayDiff} 天
          </Text>
        </div>
        <div>
          <FlipClock onDayChange={setDayDiff} />
        </div>
        <div>
          <img
            src={fuGif}
            style={{
              width: '50px',
              position: 'absolute',
              right: '5px',
              bottom: '10px',
            }}
            onClick={onFireWork}
          ></img>
        </div>
      </div>
    </div>
  );
}
