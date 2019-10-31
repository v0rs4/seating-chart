import React from 'react';
import { useSelector } from 'react-redux';

const OnlineCounter = () => {
  const onlineCount = useSelector(({ onlineCount }) => onlineCount);

  return (
    <>
      {onlineCount == 0 ? "Loading..." : onlineCount}
    </>
  );
};

export default OnlineCounter;