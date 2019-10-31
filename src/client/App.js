import React from 'react';
import { useStore } from 'react-redux';

import SeatingChart from './components/SeatingChart';
import OnlineCounter from './components/OnlineCounter';
import RemainingCounter from './components/RemainingCounter';

const App = () => {
  const store = useStore();

  return (
    <div className="container">
        <div className="text-center">
            <h1 className="mt-3">
              Real Time Seating Chart
            </h1>
            <h4 className="text-muted">
                using NodeJS, socket.io, React
            </h4>
        </div>
        <div className="d-flex justify-content-between mt-3 mb-3">
          <div>Customers online: <OnlineCounter /></div>
          <div>Seats remaining: <RemainingCounter /></div>
        </div>
        <SeatingChart store={store} />
        <p className="mt-3 text-muted">
          <small>Quickly zoom in and out using the mouse wheel</small>
        </p>
        <p className="mt-3 text-muted">
          <small>
            You see a grid of circles, representing stadium seats. You can select up to 10 seats from the grid. Other users visiting the app can see the seats update in real-time, as selections are made. If you exhaust your 10 seats, you have to click on your selected seats to deselect them. Others can't reserve a seat that's already selected.
          </small>
        </p>
    </div>
  );
};

export default App;