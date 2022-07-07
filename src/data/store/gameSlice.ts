import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {boardState: [0, 0, 0, 0, 0, 0, 0, 0, 0], turn: 1, winner:true, winnerIs:0},
  reducers: {
    takeMove(state, action) {
      const counterPosition = action.payload;

      if (state.boardState[counterPosition] === 1 || state.boardState[counterPosition] === 2) {
        throw new Error('space occupied');
      }
      if (counterPosition > state.boardState.length) {
        throw new Error('counter placed outside board');
      }

      
      state.boardState[counterPosition] = state.turn;
      state.turn = state.turn === 2 ? 1 : 2;
    },
  },
});

export const { takeMove } = gameSlice.actions;
export default gameSlice.reducer;
