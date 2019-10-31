import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

document.addEventListener("DOMContentLoaded", function(){
  const { getState, dispatch } = store;

  const { socket } = getState();

  socket.on('update', ({ seats, onlineCount, remainingCount }) => {
    dispatch.seats.update(seats);
    dispatch.onlineCount.update(onlineCount);
    dispatch.remainingCount.update(remainingCount);
  });
  
  socket.on('update-customer-id', ({ customerId }) => dispatch.customerId.update(customerId));

  const wrapper = document.getElementById("rootWrapper");
  wrapper ? render(<Provider store={store}><App/></Provider>, wrapper) : false;
});
