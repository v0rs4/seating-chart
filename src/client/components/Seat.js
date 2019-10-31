import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Circle } from 'react-konva';

// TODO
const SEAT_SIZE = 3;

const getColor = ({ isBooked, isSelected }) => {
  if (isSelected) {
    return "#004e96";
  } else if (isBooked) {
    return "#94d8ff";
  } else {
    return "#b8b8b8";
  }
}

const Seat = ({
  seat,
  ...shapeProps
}) => {
  const dispatch = useDispatch();
  const customerId = useSelector(({ customerId }) => customerId);
  
  const selectSeat = useCallback(() => dispatch.seats.selectAsync(seat.id), [dispatch]);

  const status = {
    isSelected: seat.selectedBy === customerId,
    get isBooked() {
      return seat.selectedBy !== null && !this.isSelected
    }
  }
  
  const onMouseEnter = useCallback(e => {
    const container = e.target.getStage().container();
    if (status.isBooked) {
      container.style.cursor = "not-allowed";
    } else {
      container.style.cursor = "pointer";
    }
  });
  
  const onMouseLeave = useCallback(e => {
    const container = e.target.getStage().container();
    container.style.cursor = "";
  });

  const fillColor = getColor(status);

  return (
    <Circle
      radius={SEAT_SIZE} 
      strokeWidth={1}
      fill={fillColor}
      onClick={selectSeat}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...shapeProps} />
  );
}
 
export default Seat;