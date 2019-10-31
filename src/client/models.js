import { createSocket } from './utils';

export const seats = {
  state: [[]],
  reducers: {
    update(_, payload) {
      return payload;
    }
  },
  effects: (dispatch) => ({
    selectAsync(seatId, { socket, customerId }) {
      socket.emit("select-seat", { seatId, customerId });
    }
  })
}

export const socket = {
  state: createSocket()
};

export const customerId = {
  state: null,
  reducers: {
    update(_, customerId) {
      return customerId;
    }
  }
};

export const onlineCount = {
  state: 0,
  reducers: {
    update(_, onlineCount) {
      return onlineCount;
    }
  }
};

export const remainingCount = {
  state: -1,
  reducers: {
    update(_, remainingCount) {
      return remainingCount;
    }
  }
};

