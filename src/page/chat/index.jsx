import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import { timeDist } from './img/img_path';
import { html } from './data/chat.js';

export default function Chat(props) {
  const { visible } = props;
  return (
    <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Image
          width={200}
          // height={615}
          src={timeDist}
        /> */}
        return (
        <iframe
          title='resg'
          srcDoc={html}
          style={{ width: '100%', border: '0px', height: '1100px' }}
          sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
          scrolling='auto'
        />
        );
      </div>
    </div>
  );
}
