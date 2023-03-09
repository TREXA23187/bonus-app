import React, { useEffect, useState } from 'react';
import { Image, Button } from 'antd';
import { timeDist, timeLine, wordCloud, snowGraph } from './img/img_path';
import './index.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import gifRank from './img/gif_rank.png';

export default function Chat(props) {
  const { visible } = props;

  const goHistoryPage = () => {
    window.location.href = 'http://shaoshanbonus.trexchen.com:3000/history';
  };
  return (
    <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='typora-export-content' style={{ marginBottom: '20px' }}>
          <Button type='link' onClick={goHistoryPage}>
            <span style={{ color: '#1677ff' }}>
              查看聊天记录(截止至2023.3.5)
              <ArrowRightOutlined />
            </span>
          </Button>
          <div id='write' className=''>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '20px',
                marginBottom: '20px',
              }}
            >
              分析结果
            </div>
            <div>
              <span>
                下图为一天24时中，发生过聊天的时间段占比分布图，可以看出主要集中在下午和晚上，而在早晨十点钟前则基本为0。
              </span>
            </div>
            <div>
              <Image src={timeDist} style={{ margin: 'auto' }} />
            </div>
            <div>
              <span>
                下图中可以明显的看出聊天的数据量随时间的变化而变化，消息数量呈波动的趋势。
              </span>
              <span>
                由于时间序列仅为两个月，数据量较少，整体的分析结果也受限于数据量。
              </span>
            </div>
            <div>
              <Image src={timeLine} style={{ margin: 'auto' }} />
            </div>
            <div>
              <span>下图为较粗略的统计了在聊天中出现的词语的词语的频率。</span>
            </div>
            <div>
              <span>
                本图的问题在于没有将一些没有意义的语气词连词等进行删除后再生成词云。
              </span>
            </div>
            <div>
              <Image src={wordCloud} style={{ margin: 'auto' }} />
            </div>
            <div>
              <span>
                下图为对所涉及到的语句分词后进行情感分析，大于0为很积极，0到-0.2为积极，小于-0.2则为消极。
              </span>
            </div>
            <div>
              <span>
                其中25401条消息中，有21777条消息为积极，3624条为消极。
              </span>
            </div>
            <div>
              <Image src={snowGraph} style={{ margin: 'auto' }} />
            </div>
            <div>
              <span>下图为各个表情出现的次数rank10。</span>
            </div>
            <div>
              <Image src={gifRank} style={{ margin: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
