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
    // select(state, { seatId, customerId }) {
    //   return state.map(row => {
    //     return row.map(seat => {
    //       if (seat.id == seatId) {
    //         if (seat.selectedBy === null) {
    //           return { ...seat, selectedBy: customerId };
    //         } else if (seat.selectedBy == customerId) {
    //           return { ...seat, selectedBy: null };
    //         }
    //       }
  
    //       return seat;
    //     });
    //   });
    // }
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
    addCustomer(state, { customerId, socket }) {
      return [...state, { customerId, socket, selectedCount: 0 }];
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
  }
}