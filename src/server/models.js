import { genInitialSeatsState } from './utils';
import { MAX_SELECTED_COUNT } from './constants';

export const seats = {
  state: genInitialSeatsState(),
  reducers: {
    selectBy(state, { seatId, selectedBy }) {
      return state.map(row => {
        return row.map(seat => {
          if (seat.id == seatId) {
            return { ...seat, selectedBy };
          }
  
          return seat;
        });
      });
    }
  },
  effects: (dispatch) => ({
    select({ seatId, customerId }, { customers, seats }) {
      const customer = customers.find(customer => customer.customerId == customerId);
      const seat = seats.map(row => row.find(seat => seat.id == seatId)).find(seat => seat);

      if (customer.selectedCount < MAX_SELECTED_COUNT && customer.selectedCount >= 0) {
        if (seat.selectedBy === null) {
          dispatch.customers.incrementSelectedCount({ customerId, by: 1 });
          dispatch.seats.selectBy({ seatId, selectedBy: customerId });
        }
      }

      if (customer.selectedCount <= MAX_SELECTED_COUNT && customer.selectedCount > 0) {
        if (seat.selectedBy == customerId) {
          dispatch.customers.incrementSelectedCount({ customerId, by: -1 });
          dispatch.seats.selectBy({ seatId, selectedBy: null });
        }
      }
    }
  })
}

export const customers = {
  state: [],
  reducers: {
    add(state, { customerId, socket }) {
      return [...state, { customerId, socket, selectedCount: 0 }];
    },
    update(state, {customerId, socket}) {
      return state.map(customer => {
        if (customer.customerId == customerId) {
          return { ...customer, socket };
        }

        return customer;
      })
    },
    incrementSelectedCount(state, { customerId, by }) {
      return state.map(customer => {
        if (customer.customerId == customerId) {
          let selectedCount = customer.selectedCount + by;
          selectedCount = selectedCount > 0 ? selectedCount : 0;
          
          return { ...customer, selectedCount };
        }

        return customer
      });
    },
  },
  effects: (dispatch) => ({
    addOrUpdateCustomer({ customerId, socket }, { customers }) {
      const customer = customers.find(customer => customer.customerId == customerId);

      customer ? 
        dispatch.customers.update({ customerId, socket }) : 
        dispatch.customers.add({ customerId, socket })
    }
  })
}