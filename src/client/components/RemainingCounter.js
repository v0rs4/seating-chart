import React from 'react';
import { useSelector } from 'react-redux';

const RemainingCounter = () => {
  const remainingCount = useSelector(({ remainingCount }) => remainingCount);

  return (
    <>
      {remainingCount == -1 ? "Loading..." : remainingCount}
    </>
  );
};

export default RemainingCounter;