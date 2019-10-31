import React from 'react';
import { Provider } from 'react-redux';

import SeatingStage from './SeatingStage';
import SeatingMap from './SeatingMap';

const SeatingChart = ({
  store
}) => {
  return (
    <SeatingStage>
      <Provider store={store}>
        <SeatingMap />
      </Provider>
    </SeatingStage>
  );
};

export default SeatingChart;