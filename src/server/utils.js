export const genInitialSeatsState = () => Array.from({ length: 10 }).map((_, rowIndex) => Array.from({ length: 10 * 2 }).map((_, seatIndex) => ({
  id: `${rowIndex + 1}-${seatIndex + 1}`,
  selectedBy: null
})));