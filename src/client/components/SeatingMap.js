import React from 'react';
import { useSelector } from 'react-redux';
import { Group, Rect } from 'react-konva';
import Seat from './Seat';

const SEAT_SIZE = 2;
const SEAT_DISTANCE = SEAT_SIZE * 4;

const SeatingMap = ({
  x,
  y
}) => {
  const seats = useSelector(({ seats }) => seats);

  const width = seats[0].length * SEAT_DISTANCE;
  const height = seats.length * SEAT_DISTANCE;

  return (
    <Group x={x} y={y}>
      <Rect
        width={width}
        height={height}
        fill="white"
        strokeWidth={1}
        stroke="lightgrey"
        cornerRadius={5}
      />
      <Group x={SEAT_SIZE * 2} y={SEAT_SIZE * 2}>
        {
          seats.map((row, rowIndex) => {
            return row.map((seat, seatIndex) => {
              return (
                <Seat
                  seat={seat}
                  x={seatIndex * SEAT_DISTANCE}
                  y={rowIndex * SEAT_DISTANCE}
                  radius={SEAT_SIZE}
                  key={`${rowIndex}-${seatIndex}`}
                />
              );
            });
          })
        }
      </Group>
    </Group>
  );
};

export default SeatingMap;