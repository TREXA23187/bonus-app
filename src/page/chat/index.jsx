import React, { useEffect, useState } from 'react';

export default function Chat(props) {
  const { visible } = props;
  return <div style={{ visibility: visible ? 'visible' : 'hidden' }}>Chat</div>;
}
