import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {boardState: [0, 0, 0, 0, 0, 0, 0, 0, 0], turn: 1},
  reducers: {
    takeMove(state, action) {
      const counterPosition = action.payload;
      state.boardState[counterPosition] = state.turn;
      state.turn = state.turn === 2 ? 1 : 2;
    },
  },
});

export const { takeMove } = gameSlice.actions;
export default gameSlice.reducer;
