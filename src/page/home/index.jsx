import React, { useEffect, useState } from 'react';
import './index.scss';
import bonusbase from './img/spring.jpeg';
import FlipClock from '../../component/flipClock';

import { Button, Form, Input, Typography } from 'antd';

const backgroundStyle = {
  backgroundImage: `url(${bonusbase})`,
  backgroundSize: '100% 100%',
  width: '100vw',
  height: '100vh',
  position: 'relative',
};

const beginDateStr = '2022-10-13 16:46:00';
const beginDate = new Date(beginDateStr);
const endDate = Date.now();
const new_days = parseInt((endDate - beginDate) / 1000 / (60 * 60 * 24));

export default function Home() {
  const [dayDiff, setDayDiff] = useState(new_days);
  const { Text } = Typography;

  return (
    <>
      <div style={backgroundStyle}>
        {/* <div>2022.10.13 16:46</div> */}
        <div
          style={{
            width: '70%',
            textAlign: 'center',
            marginLeft: '15%',
            marginBottom: '10px',
            paddingTop: '60px',
            lineHeight: '5',
          }}
        >
          <Text className='home_text'>新的一年 恭祝</Text>
          <Text className='home_text'>邵珊小姐：</Text>
          <Text className='home_text'>学有所成 优秀毕业</Text>
          <Text className='home_text'>胃口好 吃饭香</Text>
          <Text className='home_text'>不失眠 有活力</Text>
          <Text className='home_text'>拥有一份好工作 年少有为</Text>
          <Text className='home_text'>领导对你好 同事智商人品都在线</Text>
          <Text className='home_text'>不怕困难 迎难而上</Text>
          <Text className='home_text'>没有跨不过去的坎</Text>
          <Text className='home_text'>很荣幸在这个宇宙中与你结识</Text>
          <Text
            className='home_text'
            type='danger'
            style={{ fontSize: '20px' }}
          >
            {dayDiff}天
          </Text>
        </div>
        <div>
          <FlipClock onDayChange={setDayDiff} />
        </div>
      </div>
    </>
  );
}
